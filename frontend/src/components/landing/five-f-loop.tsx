"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import {
  Zap,
  Aperture,
  Hammer,
  Microscope,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FSegment {
  id: string;
  title: string;
  titleZh: string;
  concept: string;
  conceptZh: string;
  detail: string;
  detailZh: string;
  icon: React.ElementType;
}

export function FiveFLoop() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const segments: FSegment[] = [
    {
      id: "fuel",
      title: "FUEL",
      titleZh: "FUEL",
      concept: "Intrinsic Drive",
      conceptZh: "内驱力",
      detail:
        "We replace 'pressure' with the dopamine rush of solving high-level problems.",
      detailZh:
        "建立「低焦虑、高挑战」的课堂氛围。当孩子感到被尊重而非被评判时，大脑才会对新知识敞开。",
      icon: Zap,
    },
    {
      id: "flow",
      title: "FLOW",
      titleZh: "FLOW",
      concept: "Deep Focus",
      conceptZh: "心流",
      detail:
        "No passive listening. We use Cognitive Conflict to keep the brain in the 'Deep Work' zone.",
      detailZh:
        "拒绝「被动听讲」。通过认知冲突激活大脑，让孩子进入「心流」状态，成为课堂的主体。",
      icon: Aperture,
    },
    {
      id: "forge",
      title: "FORGE",
      titleZh: "FORGE",
      concept: "Deliberate Practice",
      conceptZh: "锻造",
      detail: "Homework is not a chore. It is the memory-encoding process.",
      detailZh:
        "作业不是为了「交差」，而是「记忆巩固」的关键。家长是项目合伙人，而非监工。",
      icon: Hammer,
    },
    {
      id: "feedback",
      title: "FEEDBACK",
      titleZh: "FEEDBACK",
      concept: "Precision Diagnosis",
      conceptZh: "诊断",
      detail: "School teachers mark 'Wrong'. We diagnose 'Why'.",
      detailZh:
        "AI只能给出「答案」，名师给出「诊断」。我们提供专家级反馈，指出思维盲区。",
      icon: Microscope,
    },
    {
      id: "fix",
      title: "FIX",
      titleZh: "FIX",
      concept: "Meta-Cognition",
      conceptZh: "修正",
      detail:
        "Growth Mindset. Turning every error into a permanent logic upgrade.",
      detailZh:
        "从「我数学不好」转变为「我只是暂时卡住了」，培养成长型思维与元认知能力。",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="five-f-loop" className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {language === "zh"
              ? "5F 全人智力成长闭环"
              : "The 5F Holistic Intelligence Cycle"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "我们将5F重新定义为五个心理学维度的提升"
              : "Five psychological dimensions that transform learning"}
          </p>
        </motion.div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="flex items-stretch gap-2">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.id}
                className="flex items-stretch"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Card */}
                <Card className="flex-1 w-48 border-2 hover:border-accent/50 transition-colors">
                  <CardContent className="p-5 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                      <segment.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-lg text-foreground mb-1">
                      {language === "zh" ? segment.titleZh : segment.title}
                    </h3>

                    {/* Concept */}
                    <p className="text-sm font-medium text-accent mb-3">
                      {language === "zh" ? segment.conceptZh : segment.concept}
                    </p>

                    {/* Detail */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {language === "zh" ? segment.detailZh : segment.detail}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow (except last) */}
                {index < segments.length - 1 && (
                  <div className="flex items-center px-2">
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Cycle indicator */}
          <motion.div
            className="flex justify-center mt-8"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
              <svg
                className="w-5 h-5 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span className="text-sm font-medium text-foreground">
                {language === "zh" ? "持续循环，螺旋上升" : "Continuous cycle of improvement"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet: Vertical Flow */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            {/* Cards */}
            <div className="space-y-4">
              {segments.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  className="relative"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="ml-12 border-2">
                    <CardContent className="p-4 sm:p-5">
                      {/* Header row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div>
                          <h3
                            className={`font-serif font-bold text-base sm:text-lg text-foreground ${
                              language === "zh" ? "font-serif-cn" : ""
                            }`}
                          >
                            {language === "zh" ? segment.titleZh : segment.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-accent">
                            {language === "zh" ? segment.conceptZh : segment.concept}
                          </p>
                        </div>
                      </div>

                      {/* Detail */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === "zh" ? segment.detailZh : segment.detail}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Icon on the line */}
                  <div className="absolute left-0 top-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                    <segment.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Arrow down (except last) */}
                  {index < segments.length - 1 && (
                    <div className="absolute left-[22px] -bottom-2 z-10">
                      <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Cycle back arrow at bottom */}
            <motion.div
              className="mt-6 ml-12"
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <svg
                  className="w-4 h-4 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {language === "zh" ? "持续循环" : "Repeat cycle"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
