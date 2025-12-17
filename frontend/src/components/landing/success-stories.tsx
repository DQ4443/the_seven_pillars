"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function SuccessStories() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="success" className="section-prestige bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
            {t.success.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.success.subtitle}
          </p>
        </motion.div>

        {/* Masonry Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.success.testimonials.map((testimonial, index) => {
            // Vary card heights for masonry effect
            const heights = ["min-h-[280px]", "min-h-[320px]", "min-h-[260px]"];
            const heightClass = heights[index % heights.length];

            return (
              <motion.div
                key={index}
                className={`card-prestige p-6 md:p-8 ${heightClass} flex flex-col`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Tag */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {testimonial.tag}
                  </span>
                </div>

                {/* Highlight - Gold text */}
                <h3 className="text-xl font-bold text-accent mb-4">
                  {testimonial.highlight}
                </h3>

                {/* Quote */}
                <div className="flex-1">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" strokeWidth={1} />
                    <blockquote className="text-muted-foreground leading-relaxed pl-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
