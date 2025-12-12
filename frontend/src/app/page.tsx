"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import {
  Header,
  Hero,
  AboutDrRicky,
  SuccessStories,
  Timetable,
  UpcomingEvents,
  FAQ,
  Location,
  Contact,
  Footer,
} from "@/components/landing";

// Paper grain texture overlay - critical for botanical design
function PaperGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PaperGrainOverlay />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Hero />
          <AboutDrRicky />
          <SuccessStories />
          <Timetable />
          <UpcomingEvents />
          <FAQ />
          <Location />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
