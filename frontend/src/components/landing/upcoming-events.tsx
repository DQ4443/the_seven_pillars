"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  Stagger,
  StaggerItem,
  CardHover,
  TapScale,
} from "./animations";

export function UpcomingEvents() {
  const { language, t } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.events.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.events.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        {/* Events Grid */}
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.events.placeholder.map((event, index) => (
            <StaggerItem key={index}>
              <CardHover className="h-full">
                <Card className="relative overflow-hidden h-full flex flex-col">
                  {/* Accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      index === 0
                        ? "bg-accent"
                        : index === 1
                        ? "bg-secondary"
                        : "bg-primary"
                    }`}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={index === 2 ? "default" : "secondary"}
                        className={index === 2 ? "bg-accent" : ""}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-1">{event.description}</p>
                    <TapScale>
                      <Button
                        variant="outline"
                        className="w-full group"
                        onClick={scrollToContact}
                      >
                        {t.events.registerButton}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </TapScale>
                  </CardContent>
                </Card>
              </CardHover>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
