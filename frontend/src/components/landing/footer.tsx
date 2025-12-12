"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Leaf } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="py-12 md:py-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">
                {language === "zh" ? "曲博士教育" : "Dr Ricky's Education"}
              </span>
            </div>
            <p className="text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
        </div>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-border">
          <div className="h-px w-12 bg-border" />
          <Leaf className="h-4 w-4 text-primary/40" strokeWidth={1.5} />
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </footer>
  );
}
