"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const navItems = [
  { key: "about", href: "#about" },
  { key: "success", href: "#success" },
  { key: "courses", href: "#courses" },
  { key: "admissions", href: "#admissions" },
  { key: "faq", href: "#faq" },
] as const;

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Text-based Serif */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group"
          >
            <span className="font-serif text-lg md:text-xl font-bold text-primary">
              {language === "zh" ? "曲博士教育" : "Dr. Ricky's Education"}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle - Simple text link */}
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {language === "zh" ? "EN" : "中文"}
            </button>

            {/* CTA Button - Desktop Only (Gold) */}
            <button
              onClick={() => scrollToSection("#admissions")}
              className="hidden md:inline-flex btn-gold"
            >
              {t.nav.bookDiagnostic}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors duration-200">
                  <Menu className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[350px] p-0 bg-background border-l border-border"
                aria-describedby={undefined}
              >
                <VisuallyHidden.Root>
                  <SheetTitle>
                    {language === "zh" ? "导航菜单" : "Navigation Menu"}
                  </SheetTitle>
                </VisuallyHidden.Root>

                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <span className="font-serif text-lg font-bold text-primary">
                      {language === "zh" ? "曲博士教育" : "Dr. Ricky's"}
                    </span>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <a
                          key={item.key}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          className="flex items-center py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200"
                        >
                          {t.nav[item.key as keyof typeof t.nav]}
                        </a>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-border space-y-3">
                    {/* Language Toggle */}
                    <button
                      onClick={toggleLanguage}
                      className="w-full py-3 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      {language === "zh" ? "Switch to English" : "切换到中文"}
                    </button>

                    {/* CTA Button */}
                    <button
                      onClick={() => scrollToSection("#admissions")}
                      className="w-full btn-gold py-3"
                    >
                      {t.nav.bookDiagnostic}
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
