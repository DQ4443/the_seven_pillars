"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Trophy, Quote, Star } from "lucide-react";
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
  MorphingBlob,
  PulseGlow,
} from "./animations";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function SuccessStories() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={sectionRef} id="success" className="section-botanical bg-muted/30 relative overflow-hidden">
      {/* Parallax background decorations */}
      <motion.div
        className="absolute top-20 right-0 w-72 h-72 pointer-events-none translate-x-1/2"
        style={{ y: shouldReduceMotion ? 0 : blobY1 }}
      >
        <MorphingBlob className="w-full h-full" color="accent" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-0 w-80 h-80 pointer-events-none -translate-x-1/2"
        style={{ y: shouldReduceMotion ? 0 : blobY2 }}
      >
        <MorphingBlob className="w-full h-full" color="primary" />
      </motion.div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <Star className="h-5 w-5 text-accent/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.success.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.success.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        {/* Twins Story - Featured Card */}
        <ScaleIn>
          <div className="max-w-4xl mx-auto mb-20">
            <motion.div
              className="card-botanical p-8 md:p-10 bg-card border border-accent/20"
              whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-8">
                <PulseGlow duration={3}>
                  <motion.div
                    className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Trophy className="h-7 w-7 text-accent" strokeWidth={1.5} />
                  </motion.div>
                </PulseGlow>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
                    {t.success.twinsStory.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.success.twinsStory.description}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-6">
                  {t.success.twinsStory.timeline.map((item, index) => (
                    <TimelineItem key={index} index={index}>
                      <div className="flex items-start gap-4 relative">
                        <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-card z-10" />
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full mb-2">
                            {item.year}
                          </span>
                          <p className="text-foreground leading-relaxed">{item.achievement}</p>
                        </div>
                      </div>
                    </TimelineItem>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </ScaleIn>

        {/* Testimonials */}
        <FadeInUp>
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-12">
              {t.success.testimonialTitle}
            </h3>
            <Stagger className="grid md:grid-cols-3 gap-8">
              {t.success.testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <CardHover className={`h-full ${index === 1 ? "md:translate-y-8" : ""}`}>
                    <motion.div
                      className="card-botanical h-full p-8 relative group transition-shadow duration-300 hover:shadow-botanical-lg"
                      whileHover={shouldReduceMotion ? {} : { borderColor: "rgba(140, 154, 132, 0.3)" }}
                    >
                      <motion.div
                        initial={{ scale: 1, opacity: 0.1 }}
                        whileHover={{ scale: 1.2, opacity: 0.2 }}
                        className="absolute top-6 right-6"
                      >
                        <Quote className="h-8 w-8 text-primary" strokeWidth={1} />
                      </motion.div>
                      <blockquote className="font-serif text-lg text-foreground mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-sm font-medium text-foreground">
                            {testimonial.author.charAt(0)}
                          </span>
                        </motion.div>
                        <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                          {testimonial.author}
                        </p>
                      </div>
                    </motion.div>
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
