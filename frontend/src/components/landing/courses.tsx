"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Users, Monitor, Video, BookOpen, ChevronDown, Star } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const featureIcons = [Users, Monitor, Video, BookOpen];

export function Courses() {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const toggleCourse = (index: number) => {
    setExpandedCourse(expandedCourse === index ? null : index);
  };

  return (
    <section id="courses" className="section-prestige bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
            {t.courses.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.courses.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Features & Course List */}
          <div className="space-y-10">
            {/* Feature List */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {t.courses.features.map((feature, index) => {
                  const Icon = featureIcons[index];
                  return (
                    <div key={index} className="card-prestige p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Course Accordion */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={`font-serif text-xl font-bold text-foreground mb-4 ${language === "zh" ? "font-serif-cn" : ""}`}>
                {language === "zh" ? "课程列表" : "Course List"}
              </h3>
              <div className="space-y-3">
                {t.courses.courseList.map((course, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border overflow-hidden transition-colors ${
                      course.highlight
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <button
                      onClick={() => toggleCourse(index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        {course.highlight && (
                          <Star className="h-5 w-5 text-accent" fill="currentColor" />
                        )}
                        <span className={`font-semibold ${course.highlight ? "text-accent" : "text-foreground"}`}>
                          {course.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedCourse === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedCourse === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                              {course.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Pricing Card */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-prestige p-8 md:p-10 text-center">
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-bold text-foreground">
                  {t.courses.pricing.price}
                </span>
                <span className="text-xl text-muted-foreground ml-2">
                  {t.courses.pricing.period}
                </span>
              </div>

              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                {t.courses.pricing.note}
              </div>

              <p className="text-muted-foreground mb-8">
                {t.courses.pricing.subtext}
              </p>

              <button
                onClick={() => {
                  const element = document.querySelector("#admissions");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full btn-gold py-4"
              >
                {t.nav.bookDiagnostic}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
