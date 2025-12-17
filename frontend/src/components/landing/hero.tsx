"use client";

import { useLanguage } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Gold Thread SVG Animation Component (desktop only)
function GoldThread() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5B358" stopOpacity="0" />
          <stop offset="50%" stopColor="#C5B358" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C5B358" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,300 Q200,200 400,300 T800,300"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,350 Q200,450 400,350 T800,350"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Hero() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToTestimonials = () => {
    const element = document.querySelector("#testimonials");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToEnrollment = () => {
    const element = document.querySelector("#enrollment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mobile-First: Full gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-[#1a4066]" />

      {/* Desktop: Split layout overlay */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 bg-white" />

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-3xl pointer-events-none" />

      {/* Desktop: Image side with Gold Thread */}
      <div className="hidden lg:flex absolute inset-y-0 left-0 w-1/2 items-center justify-center">
        <div className="relative w-full h-full">
          {/* Placeholder for image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/40">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-5xl">📸</span>
              </div>
              <p className="text-sm">Premium classroom photo</p>
            </div>
          </div>
          {!shouldReduceMotion && <GoldThread />}
        </div>
      </div>

      {/* Content - Mobile centered, Desktop right-aligned */}
      <div className="relative w-full min-h-screen flex items-center">
        <div className="w-full lg:w-1/2 lg:ml-auto px-5 py-24 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Slogan - Larger on mobile for impact */}
            <motion.h1
              className={`font-serif text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 leading-[1.2] text-balance ${
                language === "zh" ? "font-serif-cn" : ""
              } text-white lg:text-foreground`}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.hero.headline}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed text-white/85 lg:text-muted-foreground"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t.hero.subheadline}
            </motion.p>

            {/* CTA Button - Hidden on mobile (sticky bar handles it) */}
            <motion.div
              className="hidden md:block"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={scrollToEnrollment}
                className="btn-gold text-base px-8 py-4 font-serif"
              >
                {t.hero.cta}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Scroll indicator - positioned for mobile safe area */}
      <motion.button
        onClick={scrollToTestimonials}
        className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/60 lg:text-primary/60 hover:text-white lg:hover:text-primary transition-colors duration-300 z-10 touch-target"
        aria-label="Scroll down"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {shouldReduceMotion ? (
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        ) : (
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
        )}
      </motion.button>
    </section>
  );
}
