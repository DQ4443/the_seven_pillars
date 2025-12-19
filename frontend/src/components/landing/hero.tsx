"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToEnrollment = () => {
    const element = document.querySelector("#enrollment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-primary overflow-hidden">
      {/* Subtle decorative elements - very understated */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />

        {/* Minimal accent glow - top right */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Subtle bottom accent */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Slogan - the hero */}
          <motion.h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={scrollToEnrollment}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 sm:px-10 py-4 rounded-lg font-medium text-base sm:text-lg transition-colors shadow-lg"
            >
              {t.hero.cta}
            </button>
          </motion.div>

          {/* Minimal decorative line below CTA */}
          <motion.div
            className="mt-16 sm:mt-20 flex justify-center"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <svg
              className="w-24 h-8 text-accent/40"
              viewBox="0 0 96 32"
              fill="none"
            >
              <path
                d="M0 16 L40 16 M56 16 L96 16"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="48" cy="16" r="4" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
