"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Globe, Leaf, X } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const navItems = [
  { key: "about", href: "#about" },
  { key: "success", href: "#success" },
  { key: "timetable", href: "#timetable" },
  { key: "events", href: "#events" },
  { key: "faq", href: "#faq" },
  { key: "location", href: "#location" },
  { key: "contact", href: "#contact" },
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
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-18 items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
              <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-lg font-semibold text-foreground">
              {language === "zh" ? "曲博士教育" : "Dr Ricky's Education"}
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
              <span>{language === "zh" ? "EN" : "中文"}</span>
            </button>

            {/* CTA Button - Desktop */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden md:inline-flex items-center justify-center rounded-full px-6 py-2.5 bg-foreground text-background text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90 hover:shadow-botanical-md"
            >
              {t.nav.registerInterest}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-2 rounded-full hover:bg-muted transition-colors duration-300">
                  <Menu className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] p-0 bg-background border-l border-border"
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
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-lg font-semibold text-foreground">
                        {language === "zh" ? "曲博士教育" : "Dr Ricky's"}
                      </span>
                    </div>
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
                          className="flex items-center py-4 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-2xl transition-all duration-300"
                        >
                          {t.nav[item.key as keyof typeof t.nav]}
                        </a>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-border space-y-4">
                    {/* Language Toggle */}
                    <button
                      onClick={toggleLanguage}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors duration-300"
                    >
                      <Globe className="h-4 w-4" strokeWidth={1.5} />
                      {language === "zh" ? "Switch to English" : "切换到中文"}
                    </button>

                    {/* CTA Button */}
                    <button
                      onClick={() => scrollToSection("#contact")}
                      className="w-full py-4 rounded-full bg-foreground text-background text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90"
                    >
                      {t.nav.registerInterest}
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
