"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2"
          >
            <span className="text-lg font-bold text-primary">
              {language === "zh" ? "曲博士教育" : "Dr Ricky's Education"}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === "zh" ? "EN" : "中文"}</span>
            </Button>

            {/* CTA Button - Desktop */}
            <Button
              className="hidden md:inline-flex bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => scrollToSection("#contact")}
            >
              {t.nav.registerInterest}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-6"
                aria-describedby={undefined}
              >
                <VisuallyHidden.Root>
                  <SheetTitle>
                    {language === "zh" ? "导航菜单" : "Navigation Menu"}
                  </SheetTitle>
                </VisuallyHidden.Root>

                {/* Header */}
                <div className="mb-8 pt-2">
                  <span className="text-xl font-bold text-primary">
                    {language === "zh" ? "曲博士教育" : "Dr Ricky's Education"}
                  </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-2 rounded-md"
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </a>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="mt-8 pt-4 border-t border-border">
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    size="lg"
                    onClick={() => scrollToSection("#contact")}
                  >
                    {t.nav.registerInterest}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
