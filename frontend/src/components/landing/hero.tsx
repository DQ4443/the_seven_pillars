"use client";

import { useLanguage } from "@/lib/i18n/context";
import { ChevronDown, Leaf, BookOpen, GraduationCap, PenTool, Calculator, Lightbulb, Star } from "lucide-react";
import { HeroEntrance, HeroItem, TapScale, FloatingElement, MorphingBlob, ShimmerEffect } from "./animations";
import { motion, useReducedMotion } from "framer-motion";

// Floating educational icons configuration
const floatingIcons = [
  { Icon: BookOpen, className: "top-[15%] left-[8%] md:left-[12%]", delay: 0, duration: 7, yOffset: 15 },
  { Icon: GraduationCap, className: "top-[25%] right-[10%] md:right-[15%]", delay: 0.5, duration: 8, yOffset: 20 },
  { Icon: PenTool, className: "top-[60%] left-[5%] md:left-[10%]", delay: 1, duration: 6, yOffset: 12 },
  { Icon: Calculator, className: "bottom-[25%] right-[8%] md:right-[12%]", delay: 1.5, duration: 7.5, yOffset: 18 },
  { Icon: Lightbulb, className: "top-[45%] right-[5%] md:right-[8%]", delay: 2, duration: 6.5, yOffset: 14 },
  { Icon: Star, className: "bottom-[35%] left-[12%] md:left-[18%]", delay: 0.8, duration: 8.5, yOffset: 16 },
];

// Pre-defined particle positions to avoid hydration mismatch (no Math.random during render)
const particlePositions = [
  { left: 12, top: 8, duration: 5.2, delay: 0.3 },
  { left: 28, top: 15, duration: 6.1, delay: 1.2 },
  { left: 45, top: 22, duration: 4.8, delay: 0.7 },
  { left: 67, top: 10, duration: 5.9, delay: 1.8 },
  { left: 82, top: 18, duration: 4.5, delay: 0.5 },
  { left: 8, top: 35, duration: 6.3, delay: 1.0 },
  { left: 35, top: 42, duration: 5.1, delay: 0.2 },
  { left: 55, top: 38, duration: 7.0, delay: 1.5 },
  { left: 78, top: 45, duration: 4.7, delay: 0.9 },
  { left: 92, top: 32, duration: 5.8, delay: 1.3 },
  { left: 15, top: 58, duration: 6.5, delay: 0.4 },
  { left: 38, top: 65, duration: 4.9, delay: 1.1 },
  { left: 62, top: 72, duration: 5.4, delay: 0.6 },
  { left: 85, top: 62, duration: 6.2, delay: 1.7 },
  { left: 5, top: 78, duration: 5.0, delay: 0.8 },
  { left: 25, top: 85, duration: 6.8, delay: 1.4 },
  { left: 48, top: 88, duration: 4.6, delay: 0.1 },
  { left: 72, top: 82, duration: 5.7, delay: 1.6 },
  { left: 88, top: 75, duration: 6.0, delay: 0.0 },
  { left: 50, top: 50, duration: 5.5, delay: 1.9 },
];

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-primary/5"
          animate={shouldReduceMotion ? {} : {
            background: [
              "linear-gradient(135deg, rgba(220,207,194,0.2) 0%, rgba(249,248,244,1) 50%, rgba(140,154,132,0.05) 100%)",
              "linear-gradient(135deg, rgba(140,154,132,0.1) 0%, rgba(249,248,244,1) 50%, rgba(194,123,102,0.08) 100%)",
              "linear-gradient(135deg, rgba(220,207,194,0.2) 0%, rgba(249,248,244,1) 50%, rgba(140,154,132,0.05) 100%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Morphing blob decorations */}
      <MorphingBlob className="absolute top-10 left-0 w-72 h-72 md:w-96 md:h-96 -translate-x-1/2" color="primary" />
      <MorphingBlob className="absolute bottom-20 right-0 w-80 h-80 md:w-[28rem] md:h-[28rem] translate-x-1/3" color="accent" />
      <MorphingBlob className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 opacity-50" color="secondary" />

      {/* Floating educational icons - hidden on very small screens for performance */}
      <div className="hidden sm:block">
        {floatingIcons.map(({ Icon, className, delay, duration, yOffset }, index) => (
          <FloatingElement
            key={index}
            className={`absolute ${className} pointer-events-none`}
            delay={delay}
            duration={duration}
            yOffset={yOffset}
            xOffset={index % 2 === 0 ? 5 : -5}
          >
            <div className="p-3 md:p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-botanical">
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary/70" strokeWidth={1.5} />
            </div>
          </FloatingElement>
        ))}
      </div>

      {/* Animated particles/dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!shouldReduceMotion && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <HeroEntrance className="max-w-4xl mx-auto text-center">
          {/* Small decorative element with animated lines */}
          <HeroItem>
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                className="h-px w-12 bg-primary/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ originX: 1 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                <Leaf className="h-5 w-5 text-primary/60" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                className="h-px w-12 bg-primary/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ originX: 0 }}
              />
            </div>
          </HeroItem>

          {/* Hook Quote - Elegant serif italic */}
          <HeroItem>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-muted-foreground italic mb-8 leading-relaxed text-balance">
              {t.hero.hook}
            </blockquote>
          </HeroItem>

          {/* Main Statement - Bold serif headline */}
          <HeroItem>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mb-12 leading-tight text-balance">
              {t.hero.statement}
            </h1>
          </HeroItem>

          {/* CTA Button - Botanical pill style with shimmer */}
          <HeroItem>
            <TapScale>
              <ShimmerEffect>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 bg-foreground text-background text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90 hover:shadow-botanical-lg active:scale-[0.98]"
                >
                  {t.hero.cta}
                </button>
              </ShimmerEffect>
            </TapScale>
          </HeroItem>
        </HeroEntrance>
      </div>

      {/* Scroll indicator */}
      {shouldReduceMotion ? (
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        </button>
      ) : (
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-colors duration-300"
          aria-label="Scroll down"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
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
