"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Users,
  Monitor,
  Video,
  BookOpen,
  ChevronDown,
  Star,
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface CourseCategory {
  id: string;
  label: string;
  isHighlighted?: boolean;
  courses?: string[];
}

export function Pricing() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const features: Feature[] = [
    {
      icon: Users,
      title: language === "zh" ? "小班制" : "Small Classes",
      description:
        language === "zh"
          ? "每个孩子都会被挑战到。"
          : "Every child will be challenged.",
    },
    {
      icon: Monitor,
      title: language === "zh" ? "双模式教学" : "Dual Mode",
      description:
        language === "zh"
          ? "实体课（Scoresby）或 Zoom 网课。"
          : "Onsite (Scoresby) or Zoom online.",
    },
    {
      icon: Video,
      title: language === "zh" ? "课程录像" : "Recorded Classes",
      description:
        language === "zh"
          ? "生病或学校活动不会错过课程。"
          : "Never miss a class due to illness or school events.",
    },
    {
      icon: BookOpen,
      title: language === "zh" ? "独家教材免费" : "Free Materials",
      description:
        language === "zh"
          ? "Cambridge ICE-EM + 名校习题集。"
          : "Cambridge ICE-EM + elite school problem sets.",
    },
  ];

  const courseCategories: CourseCategory[] = [
    {
      id: "year6",
      label: language === "zh" ? "6年级" : "Year 6",
      courses: [
        language === "zh" ? "数学基础强化" : "Math Foundations",
        language === "zh" ? "科学入门" : "Science Introduction",
      ],
    },
    {
      id: "year7-9",
      label: language === "zh" ? "7-9年级" : "Years 7-9",
      courses: [
        language === "zh" ? "数学强化班" : "Math Intensive",
        language === "zh" ? "科学强化班" : "Science Intensive",
        language === "zh" ? "化学大师班" : "Chemistry Masterclass",
      ],
    },
    {
      id: "pre-vce",
      label: language === "zh" ? "Pre-VCE 抢跑计划（9-10年级）" : "Pre-VCE Head Start (Years 9-10)",
      isHighlighted: true,
      courses: [
        language === "zh" ? "Pre-VCE 数学方法" : "Pre-VCE Methods",
        language === "zh" ? "Pre-VCE 化学" : "Pre-VCE Chemistry",
        language === "zh" ? "Pre-VCE 物理" : "Pre-VCE Physics",
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-background">
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
            {language === "zh" ? "课程与价格" : "Courses & Pricing"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh" ? "我们的产品" : "Our Programs"}
          </p>
        </motion.div>

        {/* Main Content - Mobile: Stacked, Desktop: Side by side */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Side - Features & Courses (3 cols on desktop) */}
            <div className="lg:col-span-3 space-y-5 sm:space-y-6">
              {/* Features Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="card-prestige p-3 sm:p-4 bg-white"
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm sm:text-base">
                          {feature.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Course Categories - Accordion */}
              <div>
                <h3 className="font-medium text-foreground mb-3 text-sm sm:text-base">
                  {language === "zh" ? "课程列表" : "Course Catalog"}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {courseCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      className={`card-prestige overflow-hidden bg-white ${
                        category.isHighlighted ? "border-accent" : ""
                      }`}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-3 sm:p-4 text-left touch-target"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {category.isHighlighted && (
                            <Star className="w-4 h-4 text-accent fill-accent" />
                          )}
                          <span
                            className={`font-medium text-sm sm:text-base ${
                              category.isHighlighted
                                ? "text-accent"
                                : "text-foreground"
                            }`}
                          >
                            {category.label}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform ${
                            expandedCategory === category.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedCategory === category.id && category.courses && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                              <div className="border-t border-border pt-3 space-y-2">
                                {category.courses.map((course, courseIndex) => (
                                  <div
                                    key={courseIndex}
                                    className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                                    {course}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Pricing Card (2 cols on desktop) */}
            <motion.div
              className="lg:col-span-2"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-prestige p-5 sm:p-6 md:p-8 bg-white sticky top-24">
                {/* Price */}
                <div className="text-center mb-5 sm:mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                      $50
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl text-foreground">
                      {language === "zh" ? "澳币" : "AUD"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base mt-1">
                    / {language === "zh" ? "每节课" : "per class"}
                  </p>
                </div>

                {/* Returning Student Badge */}
                <div className="flex justify-center mb-5 sm:mb-6">
                  <span className="px-4 py-1.5 bg-accent/10 text-accent text-xs sm:text-sm font-medium rounded-full">
                    {language === "zh" ? "老学员优惠价" : "Returning student rate"}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="text-center text-muted-foreground text-xs sm:text-sm mb-5 sm:mb-6">
                  <p>
                    {language === "zh"
                      ? "按学期付款。教材费：$0。"
                      : "Pay by term. Materials: $0."}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="btn-gold w-full text-center touch-target"
                >
                  {language === "zh" ? "预约诊断" : "Book Diagnostic"}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
