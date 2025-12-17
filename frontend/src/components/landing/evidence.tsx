"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TrendingUp, Trophy, Rocket } from "lucide-react";

interface CaseStudy {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export function Evidence() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      id: "turnaround",
      icon: TrendingUp,
      title: language === "zh" ? "逆袭故事" : "The Turnaround",
      subtitle: language === "zh" ? "从不及格到A+" : "From failing to A+",
      description:
        language === "zh"
          ? "一位学生在入学时数学成绩不及格，通过5F方法论，在一个学期内实现了显著进步。"
          : "A student who was failing math upon enrollment achieved remarkable improvement within one semester through the 5F methodology.",
      highlight: language === "zh" ? "成绩提升案例" : "Grade improvement case",
    },
    {
      id: "vce",
      icon: Trophy,
      title: language === "zh" ? "VCE高分案例" : "The VCE Crusher",
      subtitle: language === "zh" ? "高ATAR成绩详情" : "High ATAR result details",
      description:
        language === "zh"
          ? "我们的学生在VCE考试中取得了优异成绩，多名学生进入医学、法律等顶尖专业。"
          : "Our students have achieved excellent VCE results, with multiple students entering top programs in medicine, law, and more.",
      highlight: language === "zh" ? "VCE成功案例" : "VCE success story",
    },
    {
      id: "accelerated",
      icon: Rocket,
      title: language === "zh" ? "超前学习者" : "The Early Starter",
      subtitle:
        language === "zh"
          ? "9年级学生掌握11年级化学"
          : "Year 9 mastering Year 11 Chemistry",
      description:
        language === "zh"
          ? "通过我们的加速课程，年轻学生能够提前掌握高年级内容，为VCE做好充分准备。"
          : "Through our accelerated program, younger students can master advanced content early, fully preparing for VCE.",
      highlight: language === "zh" ? "加速学习案例" : "Accelerated learning case",
    },
  ];

  const ActiveIcon = caseStudies[activeCase].icon;

  return (
    <section id="evidence" className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
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
            {language === "zh" ? "成功案例" : "The Case Studies"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "具体的学业成果"
              : "Concrete academic outcomes"}
          </p>
        </motion.div>

        {/* Mobile: Tabbed Interface */}
        <div className="md:hidden max-w-lg mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-4">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCase(index)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg border transition-all touch-target ${
                  activeCase === index
                    ? "border-accent bg-white shadow-prestige-md"
                    : "border-border bg-white/50 hover:border-accent/50"
                }`}
              >
                <study.icon
                  className={`w-4 h-4 ${
                    activeCase === index ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    activeCase === index ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Active Case Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="card-prestige p-5 bg-white"
            >
              {/* Icon & Badge Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <ActiveIcon className="w-5 h-5 text-accent" />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-medium bg-primary/10 text-primary rounded-full">
                  {caseStudies[activeCase].highlight}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`font-serif text-lg font-bold text-foreground mb-1 ${
                  language === "zh" ? "font-serif-cn" : ""
                }`}
              >
                {caseStudies[activeCase].title}
              </h3>

              {/* Subtitle */}
              <p className="text-accent font-medium text-sm mb-3">
                {caseStudies[activeCase].subtitle}
              </p>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-sm">
                {caseStudies[activeCase].description}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-[11px] text-muted-foreground/60">
                  {language === "zh"
                    ? "详细案例即将更新"
                    : "Detailed case coming soon"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeCase === index ? "bg-accent" : "bg-primary/20"
                }`}
                aria-label={`View case ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="card-prestige p-6 lg:p-8 bg-white h-full flex flex-col"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <study.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Highlight Badge */}
              <span className="inline-block self-start px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                {study.highlight}
              </span>

              {/* Title */}
              <h3
                className={`font-serif text-xl font-bold text-foreground mb-2 ${
                  language === "zh" ? "font-serif-cn" : ""
                }`}
              >
                {study.title}
              </h3>

              {/* Subtitle */}
              <p className="text-accent font-medium text-sm mb-4">
                {study.subtitle}
              </p>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed flex-grow">
                {study.description}
              </p>

              {/* Placeholder for future details */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground/60">
                  {language === "zh"
                    ? "详细案例即将更新"
                    : "Detailed case coming soon"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
