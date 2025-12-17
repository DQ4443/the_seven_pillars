"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useReducedMotion } from "framer-motion";

export function FAQ() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-5 sm:px-8 max-w-3xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {t.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">{t.faq.subtitle}</p>
        </motion.div>

        {/* FAQ Accordion - Clean design with thin grey lines */}
        <motion.div
          className="bg-white rounded-xl shadow-prestige"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="divide-y divide-border">
            {t.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline px-4 sm:px-6 py-4 sm:py-5 hover:bg-muted/30 active:bg-muted/30 transition-colors duration-200 touch-target">
                  <span
                    className={`font-medium text-foreground pr-4 text-left text-sm sm:text-base ${
                      language === "zh" ? "font-serif-cn" : ""
                    }`}
                  >
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <div className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
