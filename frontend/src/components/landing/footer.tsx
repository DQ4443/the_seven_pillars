"use client";

import { useLanguage } from "@/lib/i18n/context";
import { MapPin } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Logo */}
          <div>
            <span className="font-serif text-xl font-bold">
              {language === "zh" ? "曲博士教育" : "Dr. Ricky's Education"}
            </span>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-5 w-5 shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-primary-foreground/80">
                {t.footer.address}
              </span>
            </div>
          </div>

          {/* Service Area */}
          <div>
            <p className="text-sm text-primary-foreground/60">
              {language === "zh" ? "服务区域" : "Service Area"}
            </p>
            <p className="text-primary-foreground/80">
              {t.footer.serviceArea}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
