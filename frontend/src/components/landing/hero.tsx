"use client";

import { useLanguage } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToAdmissions = () => {
    const element = document.querySelector("#admissions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - Oxford Blue with subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-[#1a4066]" />
      {/* Subtle decorative accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

      {/* Content */}
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Headline */}
          <motion.h1
            className={`font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight text-balance ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.headline}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTA Button - Desktop Only (Mobile uses Sticky Bar) */}
          <motion.div
            className="hidden md:block"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={scrollToAdmissions}
              className="btn-gold text-base px-8 py-4"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      {shouldReduceMotion ? (
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        </button>
      ) : (
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-300"
          aria-label="Scroll down"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
