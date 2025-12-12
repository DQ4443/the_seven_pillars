"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Trophy, Briefcase, Quote } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  ScaleIn,
  Stagger,
  StaggerItem,
  TimelineItem,
  CardHover,
} from "./animations";

const timelineIcons = [GraduationCap, Award, Trophy, GraduationCap, Briefcase];

export function SuccessStories() {
  const { language, t } = useLanguage();

  return (
    <section id="success" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.success.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.success.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        {/* Twins Story - Featured Card */}
        <ScaleIn>
          <Card className="max-w-4xl mx-auto mb-16 border-2 border-secondary/30 bg-gradient-to-br from-background to-secondary/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">
                    {t.success.twinsStory.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.success.twinsStory.description}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line - hidden on mobile */}
                <div className="hidden md:block absolute left-[7px] top-8 bottom-8 w-0.5 bg-border" />

                <div className="space-y-4 md:space-y-6">
                  {t.success.twinsStory.timeline.map((item, index) => {
                    const Icon = timelineIcons[index];
                    return (
                      <TimelineItem key={index} index={index}>
                        <div className="flex items-start space-x-4">
                          <div className="shrink-0 w-4 h-4 mt-1 rounded-full bg-secondary border-2 border-background z-10" />
                          <div className="flex-1 pb-2">
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded mb-1">
                              {item.year}
                            </span>
                            <p className="text-foreground">{item.achievement}</p>
                          </div>
                        </div>
                      </TimelineItem>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>

        {/* Testimonials */}
        <FadeInUp>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-8">
              {t.success.testimonialTitle}
            </h3>
            <Stagger className="grid md:grid-cols-3 gap-6">
              {t.success.testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <CardHover>
                    <Card className="relative h-full">
                      <CardContent className="pt-8 pb-6">
                        <Quote className="absolute top-4 left-4 h-6 w-6 text-secondary/30" />
                        <blockquote className="text-foreground mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <p className="text-sm text-muted-foreground">
                          — {testimonial.author}
                        </p>
                      </CardContent>
                    </Card>
                  </CardHover>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
