"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, FileText, ClipboardCheck, Award } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export function Enrollment() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const steps: Step[] = [
    {
      number: 1,
      title: language === "zh" ? "联系我们" : "Contact Us",
      description:
        language === "zh"
          ? "联系我们预约入学测试（微信或 WhatsApp）"
          : "Contact us for an Entrance Test (via WeChat or WhatsApp)",
      icon: MessageCircle,
    },
    {
      number: 2,
      title: language === "zh" ? "入学测试" : "Entrance Test",
      description:
        language === "zh"
          ? "完成入学测试后，返回给曲博士"
          : "Complete the Entrance Test and return it to Dr. Ricky",
      icon: FileText,
    },
    {
      number: 3,
      title: language === "zh" ? "评估报告" : "Assessment Report",
      description:
        language === "zh"
          ? "曲博士会给出全面详细的评估报告"
          : "Dr. Ricky provides a comprehensive detailed assessment report",
      icon: ClipboardCheck,
    },
    {
      number: 4,
      title: language === "zh" ? "电话约谈" : "Phone Consultation",
      description:
        language === "zh"
          ? "曲博士电话约谈入学细节"
          : "Dr. Ricky schedules a phone consultation to discuss enrollment details",
      icon: Award,
    },
  ];

  return (
    <section id="enrollment" className="py-12 sm:py-16 md:py-24 bg-background">
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
            {language === "zh" ? "入学流程" : "Enrollment Process"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "我们的入学是有选择性和结构化的"
              : "Entry is selective and structured"}
          </p>
        </motion.div>

        {/* Horizontal Stepper */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop: Horizontal */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-border" />
              <motion.div
                className="absolute top-12 left-0 h-0.5 bg-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />

              {/* Steps */}
              <div className="grid grid-cols-4 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="flex flex-col items-center text-center"
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {/* Circle with number */}
                    <div className="relative z-10 w-24 h-24 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-prestige">
                      <step.icon className="w-10 h-10 text-accent" />
                    </div>

                    {/* Step number */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-serif font-bold text-foreground mt-4 ${
                        language === "zh" ? "font-serif-cn" : ""
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mt-2 max-w-[180px]">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Compact Vertical */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

              {/* Steps */}
              <div className="space-y-5 sm:space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="relative flex gap-4 sm:gap-5"
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    {/* Circle with number */}
                    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-prestige shrink-0">
                      <span className="font-bold text-accent text-sm sm:text-base">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5 sm:pt-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        <h3
                          className={`font-serif font-bold text-foreground text-sm sm:text-base ${
                            language === "zh" ? "font-serif-cn" : ""
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
