"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function FAQ() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-prestige bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
            {t.faq.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-prestige border-none overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-5 data-[state=open]:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle
                        className="h-4 w-4 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-semibold text-foreground pr-4 text-left">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="text-muted-foreground leading-relaxed pl-12">
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
