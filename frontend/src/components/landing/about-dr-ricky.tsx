"use client";

import { useLanguage } from "@/lib/i18n/context";
import { GraduationCap, Briefcase, Globe, Users, Trophy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const credentialIcons = [GraduationCap, Briefcase, Globe, Users];

export function AboutDrRicky() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-prestige bg-background">
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
            {t.about.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Narrative Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif italic">
            {t.about.narrative}
          </p>
        </motion.div>

        {/* Credential Timeline */}
        <motion.div
          className="mb-20"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={`font-serif text-2xl font-bold text-foreground text-center mb-10 ${language === "zh" ? "font-serif-cn" : ""}`}>
            {t.about.credentials.title}
          </h3>

          {/* Vertical Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {t.about.credentials.items.map((item, index) => {
                const Icon = credentialIcons[index];
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    className={`relative flex items-center gap-4 md:gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ml-16 md:ml-0 ${isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                      <div className="card-prestige p-6 inline-block">
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                    {/* Icon (hidden on mobile, shown on desktop) */}
                    <div className={`hidden md:flex flex-1 ${isEven ? "justify-start pl-8" : "justify-end pr-8"}`}>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Twins Feature - Gold Border Bento Box */}
        <motion.div
          className="card-gold-border p-8 md:p-10 max-w-4xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image placeholder for twins */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted flex items-center justify-center shrink-0 border-4 border-accent/20">
              <Trophy className="h-16 w-16 text-accent" strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className={`font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
                {t.about.twins.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.twins.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
