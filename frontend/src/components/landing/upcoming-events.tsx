"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  Stagger,
  StaggerItem,
  CardHover,
  TapScale,
  MorphingBlob,
  ShimmerEffect,
} from "./animations";
import { motion, useReducedMotion } from "framer-motion";

export function UpcomingEvents() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Accent colors for cards - botanical palette
  const accentColors = [
    "bg-primary/10 text-primary",
    "bg-accent/10 text-accent",
    "bg-secondary text-secondary-foreground",
  ];

  const borderAccents = [
    "border-t-primary",
    "border-t-accent",
    "border-t-secondary",
  ];

  return (
    <section id="events" className="section-botanical bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-50">
        <MorphingBlob className="w-full h-full" color="secondary" />
      </div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <Sparkles className="h-5 w-5 text-accent/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.events.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.events.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        {/* Events Grid */}
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.events.placeholder.map((event, index) => (
            <StaggerItem key={index}>
              <CardHover className={`h-full ${index === 1 ? "md:translate-y-8" : ""}`}>
                <motion.div
                  className={`card-botanical h-full flex flex-col border-t-4 ${borderAccents[index]} transition-shadow duration-300 hover:shadow-botanical-lg`}
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                >
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Date badge */}
                    <div className="mb-4">
                      <motion.span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${accentColors[index]}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          animate={shouldReduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <Calendar className="h-4 w-4" strokeWidth={1.5} />
                        </motion.div>
                        {event.date}
                      </motion.span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      {event.description}
                    </p>

                    {/* CTA Button with shimmer */}
                    <TapScale>
                      <ShimmerEffect>
                        <button
                          onClick={scrollToContact}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-transparent border border-primary text-primary text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-primary-foreground group"
                        >
                          {t.events.registerButton}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                        </button>
                      </ShimmerEffect>
                    </TapScale>
                  </div>
                </motion.div>
              </CardHover>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
