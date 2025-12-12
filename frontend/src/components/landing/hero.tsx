"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

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
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hook Quote */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-muted-foreground italic mb-10 leading-relaxed">
            {t.hero.hook}
          </blockquote>

          {/* Main Statement - the answer */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-12 leading-tight">
            {t.hero.statement}
          </h1>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
            onClick={scrollToContact}
          >
            {t.hero.cta}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
