"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import {
  Header,
  Hero,
  Testimonials,
  PainPoints,
  FiveFLoop,
  VideoSection,
  Credentials,
  Evidence,
  Pricing,
  Demographics,
  Timetable,
  Location,
  FAQ,
  Enrollment,
  Contact,
  Footer,
  StickyConversionBar,
} from "@/components/landing";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {/* 1. Hero - The Vision */}
          <Hero />

          {/* 2. Testimonials - Social Proof (Wall of Excellence) */}
          <Testimonials />

          {/* 3. Pain Points - The Diagnosis (External vs Internal) */}
          <PainPoints />

          {/* 4. The Solution - 5F Holistic Intelligence Cycle */}
          <FiveFLoop />

          {/* 5. Video - See the 5F in Action */}
          <VideoSection />

          {/* 6. Credentials - Dr. Ricky's Background */}
          <Credentials />

          {/* 7. Evidence - Case Studies */}
          <Evidence />

          {/* 8. Pricing - Courses & Pricing */}
          <Pricing />

          {/* 9. Demographics - The Cohort */}
          <Demographics />

          {/* 10. Timetable - The Schedule */}
          <Timetable />

          {/* 11. Location - The Campus */}
          <Location />

          {/* 12. FAQ - Handle Objections */}
          <FAQ />

          {/* 13. Enrollment Process - The Funnel */}
          <Enrollment />

          {/* 14. Contact - The Action */}
          <Contact />
        </main>
        <Footer />

        {/* Mobile Sticky Conversion Bar */}
        <StickyConversionBar />
      </div>
    </LanguageProvider>
  );
}
