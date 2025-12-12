"use client";

import { useLanguage } from "@/lib/i18n/context";
import { MapPin, ExternalLink } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  FadeIn,
  TapScale,
} from "./animations";

const ADDRESS = "15 Rivette Street, Scoresby, VIC 3179";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.0693853267387!2d145.22769!3d-37.8988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63e4a0e0b0c0d%3A0x0!2s15%20Rivette%20St%2C%20Scoresby%20VIC%203179!5e0!3m2!1sen!2sau!4v1234567890";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function Location() {
  const { language, t } = useLanguage();

  return (
    <section id="location" className="section-botanical bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <MapPin className="h-5 w-5 text-primary/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.location.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.location.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <FadeInUp className="max-w-4xl mx-auto">
          <div className="card-botanical overflow-hidden">
            {/* Map - Arch shaped on top */}
            <FadeIn delay={0.15}>
              <div
                className="aspect-video w-full bg-muted overflow-hidden"
                style={{ borderRadius: "24px 24px 0 0" }}
              >
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dr Ricky's Education Location"
                  className="w-full h-full"
                />
              </div>
            </FadeIn>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-foreground">{ADDRESS}</p>
                    <p className="text-muted-foreground mt-1">
                      {t.location.servingAreas}
                    </p>
                  </div>
                </div>

                <TapScale>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-transparent border border-primary text-primary text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-primary-foreground shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    {t.location.openInMaps}
                  </a>
                </TapScale>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
