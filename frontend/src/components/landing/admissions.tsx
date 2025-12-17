"use client";

import { useLanguage } from "@/lib/i18n/context";
import { MessageCircle, Download, FileCheck, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const stepIcons = [MessageCircle, Download, FileCheck];

export function Admissions() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="admissions" className="section-prestige bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
            {t.admissions.title}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t.admissions.subtitle}
          </p>
        </motion.div>

        {/* Process Tracker - Horizontal Steps */}
        <motion.div
          className="mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {t.admissions.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isLast = index === t.admissions.steps.length - 1;

              return (
                <div key={index} className="flex items-center">
                  {/* Step */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border-2 border-primary-foreground/30 flex items-center justify-center mb-3">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm mb-2">
                      {step.number}
                    </div>
                    <span className="text-sm font-medium max-w-[120px]">
                      {step.title}
                    </span>
                  </div>

                  {/* Arrow between steps */}
                  {!isLast && (
                    <div className="hidden md:flex items-center px-6">
                      <ArrowRight className="h-6 w-6 text-primary-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Download Area */}
        <motion.div
          className="bg-primary-foreground/10 rounded-2xl p-8 md:p-10 text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Download className="h-12 w-12 mx-auto mb-6 text-accent" strokeWidth={1.5} />

          <button className="btn-gold text-base px-8 py-4 mb-6">
            {t.admissions.downloadButton}
          </button>

          <p className="text-sm text-primary-foreground/70 max-w-md mx-auto">
            {t.admissions.downloadNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
