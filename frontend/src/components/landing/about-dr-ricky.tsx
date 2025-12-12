"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Play, ExternalLink } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeIn,
  Stagger,
  StaggerItem,
} from "./animations";

const YOUTUBE_VIDEO_ID = "3CCxbjoAhLg";

export function AboutDrRicky() {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.about.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.about.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Photo placeholder + Story */}
          <FadeInLeft className="space-y-6">
            {/* Photo Placeholder */}
            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl">👨‍🏫</span>
                </div>
                <p className="text-sm">
                  {language === "zh" ? "曲博士照片" : "Dr. Ricky's Photo"}
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {t.about.story}
              </p>
              <p className="text-foreground leading-relaxed">
                {t.about.approach}
              </p>
            </div>
          </FadeInLeft>

          {/* Right: Credentials + Philosophy */}
          <Stagger className="space-y-6">
            {/* Credentials Card */}
            <StaggerItem>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    {language === "zh" ? "资历背景" : "Credentials"}
                  </h3>
                  <ul className="space-y-3">
                    {t.about.credentials.map((credential, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{credential}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Philosophy Card */}
            <StaggerItem>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    {t.about.philosophy.title}
                  </h3>
                  <ul className="space-y-3">
                    {t.about.philosophy.points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Video Section */}
        <FadeInUp className="mt-12">
          <h3 className="text-lg font-semibold text-center mb-6">
            {t.about.watchVideo}
          </h3>
          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                  title="Dr. Ricky explains his teaching approach"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </FadeIn>
            <div className="mt-3 text-center">
              <a
                href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{language === "zh" ? "在YouTube中打开" : "Open in YouTube"}</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
