"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Building2, Globe, Users, Trophy } from "lucide-react";

interface Credential {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  side: "left" | "right";
}

export function Credentials() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const credentials: Credential[] = [
    {
      id: "phd",
      icon: GraduationCap,
      title:
        language === "zh"
          ? "中国协和医科大学 & 清华大学医学博士"
          : "MD/PhD, Peking Union Medical College & Tsinghua University",
      subtitle: language === "zh" ? "医学研究" : "Medical Research",
      side: "left",
    },
    {
      id: "postdoc",
      icon: Building2,
      title:
        language === "zh"
          ? "美国 Henry Ford Hospital 博士后"
          : "Postdoctoral Fellow, Henry Ford Hospital USA",
      subtitle: language === "zh" ? "深造研究" : "Advanced Research",
      side: "right",
    },
    {
      id: "kyoto",
      icon: Globe,
      title:
        language === "zh"
          ? "日本京都大学医学部 研究员"
          : "Research Fellow, Kyoto University School of Medicine",
      subtitle: language === "zh" ? "国际经验" : "International Experience",
      side: "left",
    },
    {
      id: "parent",
      icon: Users,
      title:
        language === "zh"
          ? "两个孩子的父亲"
          : "Father of Two Children",
      subtitle: language === "zh" ? "Berkeley & 硅谷" : "Berkeley & Silicon Valley",
      side: "right",
    },
  ];

  return (
    <section id="credentials" className="py-12 sm:py-16 md:py-24 bg-muted/30">
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
            {language === "zh"
              ? '"Over-Qualified"? 不，这是对教育的降维打击'
              : '"Over-Qualified"? No, This is Educational Excellence'}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh" ? "科学家走进课堂" : "A Scientist in the Classroom"}
          </p>
        </motion.div>

        {/* Intro Quote */}
        <motion.div
          className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <blockquote
            className={`text-center text-base sm:text-lg md:text-xl text-foreground/80 italic ${
              language === "zh" ? "font-serif-cn" : "font-serif"
            }`}
          >
            {language === "zh"
              ? "为什么一位医学科学家要教8年级的科学课？因为塑造一个年轻的心灵，比研发一种新药更复杂，也更有意义。"
              : "Why would a medical scientist teach Year 8 science? Because shaping a young mind is more complex than developing a new drug—and far more meaningful."}
          </blockquote>
        </motion.div>

        {/* Credentials Timeline */}
        <div className="max-w-3xl mx-auto">
          <motion.h3
            className={`text-center font-serif font-bold text-foreground mb-6 sm:mb-8 text-base sm:text-lg ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {language === "zh" ? "资历背景" : "Credentials"}
          </motion.h3>

          {/* Mobile: Simple stacked layout */}
          <div className="md:hidden space-y-3 sm:space-y-4">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.id}
                className="flex items-start gap-3 sm:gap-4"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-border flex items-center justify-center shadow-sm shrink-0">
                  <credential.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-foreground text-sm sm:text-base leading-snug">
                    {credential.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {credential.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Alternating timeline */}
          <div className="hidden md:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-8">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential.id}
                  className={`relative flex items-center ${
                    credential.side === "left" ? "justify-start" : "justify-end"
                  }`}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : {
                          opacity: 0,
                          x: credential.side === "left" ? -30 : 30,
                        }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-white shadow-sm z-10" />

                  {/* Icon (opposite side of card) */}
                  {credential.side === "left" && (
                    <div className="absolute left-1/2 ml-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <credential.icon className="w-5 h-5 text-primary/50" />
                    </div>
                  )}
                  {credential.side === "right" && (
                    <div className="absolute right-1/2 mr-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <credential.icon className="w-5 h-5 text-primary/50" />
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={`w-[calc(50%-3rem)] card-prestige p-4 bg-white ${
                      credential.side === "left" ? "mr-auto text-right" : "ml-auto text-left"
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm leading-snug">
                      {credential.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {credential.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Case Highlight */}
        <motion.div
          className="max-w-3xl mx-auto mt-8 sm:mt-10 md:mt-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="card-prestige p-5 sm:p-6 md:p-8 bg-white border-l-4 border-accent">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
              <div>
                <h4
                  className={`font-serif font-bold text-foreground text-base sm:text-lg mb-2 ${
                    language === "zh" ? "font-serif-cn" : ""
                  }`}
                >
                  {language === "zh"
                    ? "成功案例 / 教育蓝图"
                    : "Success Story / Educational Blueprint"}
                </h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {language === "zh"
                    ? "我不只是研究教育理论。我把我的科学背景应用到了我自己的孩子身上。他们去了伯克利和硅谷。现在，我用同样严谨的方法论来教您的孩子。"
                    : "I don't just study educational theory. I applied my scientific background to my own children. They went to Berkeley and Silicon Valley. Now, I use the same rigorous methodology to teach your children."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
