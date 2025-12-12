"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  Stagger,
  StaggerItem,
} from "./animations";

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="section-botanical bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <MessageCircle
              className="h-5 w-5 text-primary/60"
              strokeWidth={1.5}
            />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.faq.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.faq.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Stagger>
            <Accordion type="single" collapsible className="space-y-4">
              {t.faq.items.map((item, index) => (
                <StaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="card-botanical border-none px-0 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left hover:no-underline px-6 py-5 [&[data-state=open]]:bg-muted/50 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <HelpCircle
                            className="h-4 w-4 text-primary"
                            strokeWidth={1.5}
                          />
                        </div>
                        <span className="font-serif text-lg font-medium text-foreground pr-4 text-left">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-4">
                      <div className="text-base text-muted-foreground leading-relaxed pl-4">
                        {item.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
