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

  // Desktop grid data
  const days = [
    { key: "mon", en: "MON", zh: "星期一" },
    { key: "tue", en: "TUE", zh: "星期二" },
    { key: "wed", en: "WED", zh: "星期三" },
    { key: "thu", en: "THU", zh: "星期四" },
    { key: "fri", en: "FRI", zh: "星期五" },
  ];

  const schedule = [
    {
      time: "4:15-5:45 PM",
      mon: { subject: "Y8 Maths", subjectZh: "8年级数学", type: "math" as const },
      tue: { subject: "Y9 Maths", subjectZh: "9年级数学", type: "math" as const },
      wed: { subject: "Pre-VCE Methods", subjectZh: "Pre-VCE 中数 1&2", type: "math" as const },
      thu: { subject: "Y8 Maths", subjectZh: "8年级数学", type: "math" as const },
      fri: { subject: "Y6 Maths", subjectZh: "6年级数学", type: "math" as const },
    },
    {
      time: "5:45-7:15 PM",
      mon: { subject: "Pre-VCE Chemistry", subjectZh: "Pre-VCE 化学", type: "science" as const },
      tue: { subject: "Y10 Maths", subjectZh: "10年级数学", type: "math" as const },
      wed: { subject: "Y7 Maths", subjectZh: "7年级数学", type: "math" as const },
      thu: { subject: "Y9 Maths", subjectZh: "9年级数学", type: "math" as const },
      fri: null,
    },
    {
      time: "7:15-8:45 PM",
      mon: { subject: "Y10 Maths", subjectZh: "10年级数学", type: "math" as const },
      tue: { subject: "Y8-9 Science", subjectZh: "8-9年级科学", type: "science" as const },
      wed: null,
      thu: { subject: "Pre-VCE Methods", subjectZh: "Pre-VCE 中数 1&2", type: "math" as const },
      fri: null,
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

        {/* Mobile View - Tabs by year level */}
        <div className="md:hidden">
          {/* Year level tabs - fits on screen */}
          <div className="flex gap-2 mb-4 justify-center flex-wrap">
            {yearLevels.map((year) => (
              <button
                key={year.id}
                onClick={() => setActiveTab(year.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === year.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-foreground border border-border"
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
              <Card>
                <CardContent className="p-4 space-y-4">
                  {/* Math Classes */}
                  {mathClasses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm text-foreground">
                          {language === "zh" ? "数学" : "Maths"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {mathClasses.map((cls, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10"
                          >
                            <span className="font-medium text-sm text-foreground">
                              {language === "zh" ? cls.dayZh : cls.day}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {cls.time}
                            </span>
                          </div>
                        ))}
                      </div>
                      {mathClasses.length > 1 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {language === "zh" ? "* 每周选其中一个时间" : "* Choose one session per week"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Science Classes */}
                  {scienceClasses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-accent" />
                        <span className="font-medium text-sm text-foreground">
                          {language === "zh"
                            ? activeTab === "prevce" ? "化学" : "科学"
                            : activeTab === "prevce" ? "Chemistry" : "Science"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {scienceClasses.map((cls, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20"
                          >
                            <span className="font-medium text-sm text-foreground">
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
        </div>

        {/* Desktop View - Grid table */}
        <motion.div
          className="hidden md:block max-w-5xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-3 text-left font-medium text-sm w-28"></th>
                      {days.map((day) => (
                        <th key={day.key} className="p-3 text-center font-medium text-sm">
                          <div>{day.en}</div>
                          <div className="text-xs opacity-80">({day.zh})</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((slot, rowIdx) => (
                      <tr key={rowIdx} className="border-t border-border">
                        <td className="p-3 text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {slot.time}
                        </td>
                        {days.map((day) => {
                          const classData = slot[day.key as keyof typeof slot] as { subject: string; subjectZh: string; type: "math" | "science" } | null;
                          return (
                            <td key={day.key} className="p-2">
                              {classData ? (
                                <div
                                  className={`p-2 rounded-lg border text-center ${
                                    classData.type === "math"
                                      ? "bg-primary/5 border-primary/10"
                                      : "bg-accent/5 border-accent/20"
                                  }`}
                                >
                                  <p className="font-medium text-sm text-foreground">{classData.subject}</p>
                                  <p className="text-xs text-muted-foreground">({classData.subjectZh})</p>
                                </div>
                              ) : (
                                <div className="p-2 text-center text-muted-foreground/40">—</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
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
