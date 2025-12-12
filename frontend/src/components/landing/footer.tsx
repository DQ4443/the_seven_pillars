"use client";

import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="py-8 border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <p className="font-semibold">
              {language === "zh" ? "曲博士教育" : "Dr Ricky's Education"}
            </p>
            <p className="text-sm opacity-80">{t.footer.tagline}</p>
          </div>

          {/* Copyright */}
          <p className="text-sm opacity-80">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
