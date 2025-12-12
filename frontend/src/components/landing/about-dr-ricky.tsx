"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  FadeInLeft,
  FadeIn,
  Stagger,
  StaggerItem,
  CardHover,
  MorphingBlob,
} from "./animations";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const YOUTUBE_VIDEO_ID = "3CCxbjoAhLg";

export function AboutDrRicky() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for background elements
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const photoY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="section-botanical bg-background relative overflow-hidden">
      {/* Parallax background decorations */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 pointer-events-none"
        style={{ y: shouldReduceMotion ? 0 : blobY1 }}
      >
        <MorphingBlob className="w-full h-full" color="primary" />
      </motion.div>
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 pointer-events-none"
        style={{ y: shouldReduceMotion ? 0 : blobY2 }}
      >
        <MorphingBlob className="w-full h-full" color="secondary" />
      </motion.div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <Sparkles className="h-5 w-5 text-primary/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.about.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.about.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Arch Photo + Story */}
          <FadeInLeft className="space-y-8">
            {/* Photo Placeholder - Arch Shape with Parallax */}
            <motion.div
              className="aspect-[3/4] bg-muted flex items-center justify-center border border-border overflow-hidden shadow-botanical-lg"
              style={{
                borderRadius: "200px 200px 24px 24px",
                y: shouldReduceMotion ? 0 : photoY,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center text-muted-foreground p-8">
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-4xl">👨‍🏫</span>
                </motion.div>
                <p className="text-sm font-medium">
                  {language === "zh" ? "曲博士照片" : "Dr. Ricky's Photo"}
                </p>
              </div>
            </motion.div>

            {/* Story */}
            <div className="space-y-5">
              <p className="text-foreground leading-relaxed text-lg">
                {t.about.story}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.approach}
              </p>
            </div>
          </FadeInLeft>

          {/* Right: Credentials + Philosophy */}
          <Stagger className="space-y-6 lg:pt-12">
            {/* Credentials Card */}
            <StaggerItem>
              <CardHover>
                <div className="card-botanical p-8 transition-shadow duration-300 hover:shadow-botanical-lg">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6">
                    {language === "zh" ? "资历背景" : "Credentials"}
                  </h3>
                  <ul className="space-y-4">
                    {t.about.credentials.map((credential, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, backgroundColor: "rgba(140, 154, 132, 0.3)" }}
                        >
                          <CheckCircle className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        </motion.div>
                        <span className="text-foreground">{credential}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardHover>
            </StaggerItem>

            {/* Philosophy Card */}
            <StaggerItem>
              <CardHover>
                <div className="card-botanical p-8 bg-muted transition-shadow duration-300 hover:shadow-botanical-lg">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6">
                    {t.about.philosophy.title}
                  </h3>
                  <ul className="space-y-4">
                    {t.about.philosophy.points.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, backgroundColor: "rgba(194, 123, 102, 0.3)" }}
                        >
                          <CheckCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
                        </motion.div>
                        <span className="text-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardHover>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Video Section */}
        <FadeInUp className="mt-20">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-8">
            {t.about.watchVideo}
          </h3>
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-botanical-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                  title="Dr. Ricky explains his teaching approach"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </FadeIn>
            <div className="mt-4 text-center">
              <a
                href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                <span>{language === "zh" ? "在YouTube中打开" : "Open in YouTube"}</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
