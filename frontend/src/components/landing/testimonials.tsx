"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Testimonial {
  tag: string;
  highlight: string;
  quote: string;
}

function TestimonialCard({
  testimonial,
  index,
  language,
}: {
  testimonial: Testimonial;
  index: number;
  language: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-center"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="card-prestige p-5 sm:p-6 md:p-8 h-full bg-white">
        {/* Quote Icon */}
        <div className="mb-3 sm:mb-4">
          <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent/40" />
        </div>

        {/* Tag */}
        <span className="inline-block px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-primary/10 text-primary rounded-full mb-3 sm:mb-4">
          {testimonial.tag}
        </span>

        {/* Highlight */}
        <h3
          className={`font-serif text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3 ${
            language === "zh" ? "font-serif-cn" : ""
          }`}
        >
          &ldquo;{testimonial.highlight}&rdquo;
        </h3>

        {/* Quote */}
        <p className="text-muted-foreground leading-relaxed text-sm">
          {testimonial.quote}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScrollButtons);
      return () => scrollEl.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 px-5"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {t.success.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t.success.subtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Buttons - Desktop only */}
          <button
            onClick={() => scroll("left")}
            className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-prestige-md border border-border transition-all ${
              canScrollLeft
                ? "opacity-100 hover:shadow-prestige-lg"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-prestige-md border border-border transition-all ${
              canScrollRight
                ? "opacity-100 hover:shadow-prestige-lg"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Horizontal Scroll Container - Full bleed on mobile */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-8 md:px-12 -webkit-overflow-scrolling-touch"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {t.success.testimonials.map(
              (testimonial: Testimonial, index: number) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  language={language}
                />
              )
            )}
            {/* Spacer for last card visibility */}
            <div className="flex-shrink-0 w-1 sm:w-4" />
          </div>

          {/* Gradient Fades - Desktop only */}
          <div className="hidden md:block absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
          <div className="hidden md:block absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
        </div>

        {/* Scroll indicator dots for mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {t.success.testimonials.map((_: Testimonial, index: number) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
