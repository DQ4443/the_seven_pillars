"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Smile,
  Target,
  CheckCircle,
  MessageSquare,
  Wrench,
  ChevronDown,
} from "lucide-react";

interface FSegment {
  id: string;
  title: string;
  concept: string;
  detail: string;
  icon: React.ElementType;
  color: string;
}

export function FiveFLoop() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const segments: FSegment[] = [
    {
      id: "fun",
      title: language === "zh" ? "乐趣 (FUN)" : "FUN",
      concept: language === "zh" ? "心理安全感" : "Psychological Safety",
      detail:
        language === "zh"
          ? "我们用好奇心取代批判。当大脑感到安全时，它就会打开。我们不批评努力，只奖励进步。"
          : "We replace judgment with curiosity. When the brain feels safe, it opens. We don't criticize effort; we only reward progress.",
      icon: Smile,
      color: "#C5A059",
    },
    {
      id: "focus",
      title: language === "zh" ? "专注 (FOCUS)" : "FOCUS",
      concept: language === "zh" ? "心流状态" : "Flow State",
      detail:
        language === "zh"
          ? "没有被动听讲。我们使用'认知冲突'来触发心流状态。学生成为推导的中心。"
          : "No passive listening. We use 'Cognitive Conflict' to trigger a Flow State. The student becomes the center of the derivation.",
      icon: Target,
      color: "#0E2A47",
    },
    {
      id: "finish",
      title: language === "zh" ? "完成 (FINISH)" : "FINISH",
      concept: language === "zh" ? "执行功能" : "Executive Function",
      detail:
        language === "zh"
          ? "作业不是任务，而是记忆编码项目。我们训练大脑进行计划、启动和监控（执行功能）。"
          : "Homework isn't a task; it's a memory encoding project. We train the brain to Plan, Initiate, and Monitor (Executive Function).",
      icon: CheckCircle,
      color: "#C5A059",
    },
    {
      id: "feedback",
      title: language === "zh" ? "反馈 (FEEDBACK)" : "FEEDBACK",
      concept: language === "zh" ? "形成性评估" : "Formative Assessment",
      detail:
        language === "zh"
          ? "AI给答案。我们给诊断。我们识别导致错误的具体'逻辑缺口'。"
          : "AI gives answers. We give diagnosis. We identify the specific 'logic gap' that caused the error.",
      icon: MessageSquare,
      color: "#0E2A47",
    },
    {
      id: "fix",
      title: language === "zh" ? "修正 (FIX)" : "FIX",
      concept: language === "zh" ? "成长心态" : "Growth Mindset",
      detail:
        language === "zh"
          ? "思考关于思考的事。将'我不擅长这个'转变为'我需要调试这一步'。错误变成升级。"
          : "Thinking about thinking. Transforming 'I'm bad at this' into 'I need to debug this step.' Errors become upgrades.",
      icon: Wrench,
      color: "#C5A059",
    },
  ];

  const toggleSegment = (id: string) => {
    setActiveSegment(activeSegment === id ? null : id);
  };

  return (
    <section id="five-f-loop" className="py-12 sm:py-16 md:py-24 bg-muted/30">
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
              ? "5F 全人智能循环"
              : "The 5F Holistic Intelligence Cycle"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "不是线性流程，而是良性飞轮"
              : "Not a linear process, but a virtuous flywheel"}
          </p>
        </motion.div>

        {/* Mobile: Accordion List */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleSegment(segment.id)}
                  className={`w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border transition-all touch-target ${
                    activeSegment === segment.id
                      ? "border-accent bg-white shadow-prestige-md"
                      : "border-border bg-white hover:border-accent/50"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: segment.color }}
                  >
                    <segment.icon className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left min-w-0">
                    <h4
                      className={`font-serif font-bold text-foreground text-sm sm:text-base ${
                        language === "zh" ? "font-serif-cn" : ""
                      }`}
                    >
                      {segment.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {segment.concept}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: activeSegment === segment.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {activeSegment === segment.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2">
                        <div
                          className="border-l-2 pl-4"
                          style={{ borderColor: segment.color }}
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {segment.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* 5F Badge */}
          <motion.div
            className="flex justify-center mt-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center shadow-prestige-lg">
              <span className="text-white font-serif font-bold text-lg sm:text-xl">
                5F
              </span>
            </div>
          </motion.div>

          <p className="text-center text-muted-foreground/70 text-sm mt-4">
            {language === "zh"
              ? "点击每个阶段了解详情"
              : "Tap each stage to learn more"}
          </p>
        </div>
      </div>
    </section>
  );
}
