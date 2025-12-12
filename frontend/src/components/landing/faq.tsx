"use client";

import { useLanguage } from "@/lib/i18n/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
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
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.faq.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                    className="border rounded-lg px-4 bg-card shadow-sm"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-start space-x-3">
                        <HelpCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground pr-4">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-8 text-muted-foreground">
                      {item.answer}
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
