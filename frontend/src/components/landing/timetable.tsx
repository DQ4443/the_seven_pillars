"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calculator, FlaskConical } from "lucide-react";

interface ClassInfo {
  subject: string;
  subjectZh: string;
  day: string;
  dayZh: string;
  time: string;
  type: "math" | "science";
}

interface YearData {
  id: string;
  label: string;
  labelZh: string;
  classes: ClassInfo[];
}

export function Timetable() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("y6");

  const yearLevels: YearData[] = [
    {
      id: "y6",
      label: "Year 6",
      labelZh: "6年级",
      classes: [
        { subject: "Maths", subjectZh: "数学", day: "FRI", dayZh: "周五", time: "4:15-5:45 PM", type: "math" },
      ],
    },
    {
      id: "y7",
      label: "Year 7",
      labelZh: "7年级",
      classes: [
        { subject: "Maths", subjectZh: "数学", day: "WED", dayZh: "周三", time: "5:45-7:15 PM", type: "math" },
      ],
    },
    {
      id: "y8",
      label: "Year 8",
      labelZh: "8年级",
      classes: [
        { subject: "Maths", subjectZh: "数学", day: "MON", dayZh: "周一", time: "4:15-5:45 PM", type: "math" },
        { subject: "Maths", subjectZh: "数学", day: "THU", dayZh: "周四", time: "4:15-5:45 PM", type: "math" },
        { subject: "Science", subjectZh: "科学", day: "TUE", dayZh: "周二", time: "7:15-8:45 PM", type: "science" },
      ],
    },
    {
      id: "y9",
      label: "Year 9",
      labelZh: "9年级",
      classes: [
        { subject: "Maths", subjectZh: "数学", day: "TUE", dayZh: "周二", time: "4:15-5:45 PM", type: "math" },
        { subject: "Maths", subjectZh: "数学", day: "THU", dayZh: "周四", time: "5:45-7:15 PM", type: "math" },
        { subject: "Science", subjectZh: "科学", day: "TUE", dayZh: "周二", time: "7:15-8:45 PM", type: "science" },
      ],
    },
    {
      id: "y10",
      label: "Year 10",
      labelZh: "10年级",
      classes: [
        { subject: "Maths", subjectZh: "数学", day: "TUE", dayZh: "周二", time: "5:45-7:15 PM", type: "math" },
        { subject: "Maths", subjectZh: "数学", day: "MON", dayZh: "周一", time: "7:15-8:45 PM", type: "math" },
      ],
    },
    {
      id: "prevce",
      label: "Pre-VCE",
      labelZh: "Pre-VCE",
      classes: [
        { subject: "Methods", subjectZh: "中数 1&2", day: "WED", dayZh: "周三", time: "4:15-5:45 PM", type: "math" },
        { subject: "Methods", subjectZh: "中数 1&2", day: "THU", dayZh: "周四", time: "7:15-8:45 PM", type: "math" },
        { subject: "Chemistry", subjectZh: "化学", day: "MON", dayZh: "周一", time: "5:45-7:15 PM", type: "science" },
      ],
    },
  ];

  const activeYear = yearLevels.find((y) => y.id === activeTab);

  // Group classes by type for display
  const mathClasses = activeYear?.classes.filter((c) => c.type === "math") || [];
  const scienceClasses = activeYear?.classes.filter((c) => c.type === "science") || [];

  return (
    <section id="timetable" className="py-12 sm:py-16 md:py-24 bg-muted/30">
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
            {language === "zh" ? "课程时间表" : "Class Schedule"}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {language === "zh"
              ? "2026 Term 1 (1月27日 - 4月2日，共10周)"
              : "2026 Term 1 (Jan 27 - Apr 2, 10 weeks)"}
          </Badge>
        </motion.div>

        {/* Unified Tab View for Mobile and Desktop */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Year level tabs */}
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {yearLevels.map((year) => (
              <button
                key={year.id}
                onClick={() => setActiveTab(year.id)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === year.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white text-foreground border border-border hover:border-primary/50"
                }`}
              >
                {language === "zh" ? year.labelZh : year.label}
              </button>
            ))}
          </div>

          {/* Selected year classes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-2">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  {/* Math Classes */}
                  {mathClasses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Calculator className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">
                          {language === "zh" ? "数学" : "Maths"}
                        </span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {mathClasses.map((cls, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/10"
                          >
                            <div>
                              <span className="font-medium text-sm sm:text-base text-foreground">
                                {language === "zh" ? cls.dayZh : cls.day}
                              </span>
                              {cls.subject !== "Maths" && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {language === "zh" ? cls.subjectZh : cls.subject}
                                </p>
                              )}
                            </div>
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {cls.time}
                            </span>
                          </div>
                        ))}
                      </div>
                      {mathClasses.length > 1 && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <span className="text-accent">*</span>
                          {language === "zh" ? "每周选其中一个时间" : "Choose one session per week"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Science Classes */}
                  {scienceClasses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <FlaskConical className="w-4 h-4 text-accent" />
                        </div>
                        <span className="font-medium text-foreground">
                          {language === "zh"
                            ? activeTab === "prevce" ? "化学" : "科学"
                            : activeTab === "prevce" ? "Chemistry" : "Science"}
                        </span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {scienceClasses.map((cls, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-accent/5 border border-accent/20"
                          >
                            <span className="font-medium text-sm sm:text-base text-foreground">
                              {language === "zh" ? cls.dayZh : cls.day}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {cls.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 rounded bg-primary/10 border border-primary/20" />
              <span>{language === "zh" ? "数学" : "Maths"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 rounded bg-accent/10 border border-accent/20" />
              <span>{language === "zh" ? "科学" : "Science"}</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Note */}
        <p className="text-center text-muted-foreground text-xs sm:text-sm mt-6">
          {language === "zh"
            ? "如需了解更多课程信息，请联系我们"
            : "Contact us for more information about classes"}
        </p>
      </div>
    </section>
  );
}
