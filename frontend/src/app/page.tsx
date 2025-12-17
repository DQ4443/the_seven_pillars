"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import {
  Header,
  Hero,
  PainPoints,
  AboutDrRicky,
  SuccessStories,
  Courses,
  FAQ,
  Admissions,
  Footer,
  StickyConversionBar,
} from "@/components/landing";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {/* Page 1: HOME (The Hook) */}
          <Hero />
          <PainPoints />

          {/* Page 2: ABOUT (The Authority) */}
          <AboutDrRicky />

          {/* Page 3: SUCCESS STORIES (The Proof) */}
          <SuccessStories />

          {/* Page 4: COURSES & PRICING (The Product) */}
          <Courses />

          {/* FAQ Section */}
          <FAQ />

          {/* Page 5: ADMISSIONS (The Gate) */}
          <Admissions />
        </main>
        <Footer />

        {/* Mobile Sticky Conversion Bar */}
        <StickyConversionBar />
      </div>
    </LanguageProvider>
  );
}
