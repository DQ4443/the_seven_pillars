"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <section id="location" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.location.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.location.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <FadeInUp className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Map */}
            <FadeIn delay={0.15}>
              <div className="aspect-video w-full bg-muted">
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

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{ADDRESS}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.location.servingAreas}
                    </p>
                  </div>
                </div>

                <TapScale>
                  <Button asChild variant="outline" className="shrink-0">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.location.openInMaps}
                    </a>
                  </Button>
                </TapScale>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </section>
  );
}
