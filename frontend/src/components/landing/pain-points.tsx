"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { Unlink, Flame, ArrowDown, ArrowRight } from "lucide-react";

export function PainPoints() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const externalTrap = {
    title: language === "zh" ? "外部驱动陷阱" : "The External Trap",
    subtitle: language === "zh" ? "外部控制点" : "External Locus of Control",
    behaviors: [
      {
        label: language === "zh" ? "行为" : "Behavior",
        text:
          language === "zh"
            ? "依赖AI找答案。作业是负担。"
            : "Addicted to AI for answers. Homework is a chore.",
      },
      {
        label: language === "zh" ? "心态" : "Mindset",
        text:
          language === "zh"
            ? "成功靠运气。失败是'老师的问题'。"
            : "Success is luck. Failure is 'the teacher's fault'.",
      },
      {
        label: language === "zh" ? "结果" : "Result",
        text:
          language === "zh"
            ? "家长与孩子之间的'作业战争'。"
            : "The 'Homework War' between parent and child.",
      },
    ],
  };

  const internalEngine = {
    title: language === "zh" ? "内驱力引擎" : "The Internal Engine",
    subtitle: language === "zh" ? "曲博士的方法" : "Dr. Ricky's Way",
    behaviors: [
      {
        label: language === "zh" ? "行为" : "Behavior",
        text:
          language === "zh"
            ? "用逻辑推导答案。主动寻求挑战。"
            : "Uses logic to derive answers. Seeks challenges.",
      },
      {
        label: language === "zh" ? "心态" : "Mindset",
        text:
          language === "zh"
            ? "成功靠努力。失败是改进的数据。"
            : "Success is effort. Failure is data for improvement.",
      },
      {
        label: language === "zh" ? "结果" : "Result",
        text:
          language === "zh"
            ? "心理安全感与内在驱动力。"
            : "Psychological Safety & Intrinsic Drive.",
      },
    ],
  };

  return (
    <section id="pain-points" className="py-12 sm:py-16 md:py-24 bg-background">
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
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {language === "zh"
              ? "学习心理学：失败 vs 成功"
              : "The Psychology of Failure vs. Success"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "从'被动学习'到'主动探索'的转变"
              : "The shift from 'External Pressure' to 'Internal Drive'"}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-6">
            {/* External Trap Card */}
            <motion.div
              className="flex-1"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-prestige p-5 sm:p-6 bg-muted/50 border-muted h-full">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Unlink className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3
                        className={`font-serif text-base sm:text-lg font-bold text-muted-foreground ${
                          language === "zh" ? "font-serif-cn" : ""
                        }`}
                      >
                        {externalTrap.title}
                      </h3>
                      <span className="w-5 h-5 bg-muted-foreground/20 rounded-full flex items-center justify-center text-[10px] text-muted-foreground font-bold shrink-0">
                        ✗
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/70 mb-3">
                      {externalTrap.subtitle}
                    </p>
                  </div>
                </div>

                {/* Behaviors */}
                <div className="space-y-2.5 mt-4">
                  {externalTrap.behaviors.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-muted-foreground/30 pl-3"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        {item.label}
                      </span>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Arrow - Mobile: Down, Desktop: Right */}
            <motion.div
              className="flex justify-center items-center py-2 lg:py-0 lg:px-2"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center">
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-white lg:hidden" />
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white hidden lg:block" />
              </div>
            </motion.div>

            {/* Internal Engine Card */}
            <motion.div
              className="flex-1"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="card-gold-border p-5 sm:p-6 bg-white h-full">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3
                        className={`font-serif text-base sm:text-lg font-bold text-foreground ${
                          language === "zh" ? "font-serif-cn" : ""
                        }`}
                      >
                        {internalEngine.title}
                      </h3>
                      <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                        ✓
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-accent mb-3">
                      {internalEngine.subtitle}
                    </p>
                  </div>
                </div>

                {/* Behaviors */}
                <div className="space-y-2.5 mt-4">
                  {internalEngine.behaviors.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-accent pl-3"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent/70">
                        {item.label}
                      </span>
                      <p className="text-foreground text-sm mt-0.5">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
