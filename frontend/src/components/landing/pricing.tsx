"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Monitor, Video, BookOpen, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: Users,
      text: language === "zh" ? "5-8人小班，最多10人" : "5-8 students per class, max 10",
    },
    {
      icon: Monitor,
      text: language === "zh" ? "实体课或 Zoom 网课" : "In-person or Zoom online",
    },
    {
      icon: Video,
      text: language === "zh" ? "缺课提供录像" : "Class recordings for absences",
    },
    {
      icon: BookOpen,
      text: language === "zh" ? "教材完全免费" : "Materials completely free",
    },
  ];

  const included = [
    language === "zh" ? "每周1.5小时课程" : "1.5-hour weekly class",
    language === "zh" ? "作业反馈" : "Homework feedback",
    language === "zh" ? "缺课录像" : "Absence recordings",
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {language === "zh" ? "课程与价格" : "Courses & Pricing"}
          </h2>
        </motion.div>

        {/* Mobile-first: Single column, stacks naturally */}
        <div className="max-w-lg mx-auto">
          {/* Pricing Card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              {/* Price Header */}
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <Badge variant="secondary" className="mb-3">
                  {language === "zh" ? "2026年 Term 1" : "2026 Term 1"}
                </Badge>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-bold">$600</span>
                  <span className="text-lg opacity-80">+ GST</span>
                </div>
                <p className="text-sm opacity-80 mt-1">
                  {language === "zh" ? "每学期" : "per term"}
                </p>
              </div>

              <CardContent className="p-5 sm:p-6">
                {/* What's Included */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-3">
                    {language === "zh" ? "包括" : "Includes"}
                  </p>
                  <ul className="space-y-2">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="border-t pt-5 space-y-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <feature.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild className="w-full mt-6" size="lg">
                  <a href="#contact">
                    {language === "zh" ? "预约诊断" : "Book Diagnostic"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
