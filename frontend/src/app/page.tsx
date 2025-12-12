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

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
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
