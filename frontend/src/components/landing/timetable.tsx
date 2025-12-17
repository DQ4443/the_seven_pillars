"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Monitor } from "lucide-react";

interface ClassSession {
  subject: string;
  time: string;
  location: "onsite" | "hybrid";
  isAccelerated?: boolean;
}

interface TimetableData {
  weekday: ClassSession[];
  weekend: ClassSession[];
}

type YearLevel = "year9" | "year10" | "vce12" | "vce34";

export function Timetable() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<YearLevel>("year9");

  const tabs: { id: YearLevel; label: string }[] = [
    { id: "year9", label: language === "zh" ? "9年级" : "Year 9" },
    { id: "year10", label: language === "zh" ? "10年级" : "Year 10" },
    { id: "vce12", label: "VCE Unit 1/2" },
    { id: "vce34", label: "VCE Unit 3/4" },
  ];

  // Placeholder timetable data
  const timetableData: Record<YearLevel, TimetableData> = {
    year9: {
      weekday: [
        {
          subject: language === "zh" ? "化学大师班 (曲博士)" : "Chemistry Masterclass (Dr. Ricky)",
          time: "4:30 PM - 6:00 PM",
          location: "hybrid",
        },
      ],
      weekend: [
        {
          subject: language === "zh" ? "数学强化班" : "Math Intensive",
          time: "10:00 AM - 11:30 AM",
          location: "onsite",
        },
      ],
    },
    year10: {
      weekday: [
        {
          subject: language === "zh" ? "Pre-VCE 化学" : "Pre-VCE Chemistry",
          time: "5:00 PM - 6:30 PM",
          location: "hybrid",
          isAccelerated: true,
        },
      ],
      weekend: [
        {
          subject: language === "zh" ? "Pre-VCE 中数" : "Pre-VCE Methods",
          time: "2:00 PM - 3:30 PM",
          location: "hybrid",
          isAccelerated: true,
        },
      ],
    },
    vce12: {
      weekday: [
        {
          subject: language === "zh" ? "VCE 化学 Unit 1/2" : "VCE Chemistry Unit 1/2",
          time: "5:30 PM - 7:00 PM",
          location: "hybrid",
        },
      ],
      weekend: [
        {
          subject: language === "zh" ? "VCE 中数 Unit 1/2" : "VCE Methods Unit 1/2",
          time: "1:00 PM - 2:30 PM",
          location: "hybrid",
        },
      ],
    },
    vce34: {
      weekday: [
        {
          subject: language === "zh" ? "VCE 化学 Unit 3/4" : "VCE Chemistry Unit 3/4",
          time: "6:00 PM - 7:30 PM",
          location: "hybrid",
        },
      ],
      weekend: [
        {
          subject: language === "zh" ? "VCE 中数 Unit 3/4" : "VCE Methods Unit 3/4",
          time: "3:00 PM - 4:30 PM",
          location: "hybrid",
        },
      ],
    },
  };

  const currentData = timetableData[activeTab];

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
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "选择适合您孩子的课程时间"
              : "Find the right class time for your child"}
          </p>
        </motion.div>

        {/* Tabs - Horizontal scroll on mobile */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base touch-target shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-foreground hover:bg-muted active:bg-muted border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timetable Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="card-prestige overflow-hidden bg-white">
              {/* Weekday Row */}
              <div className="border-b border-border">
                <div className="bg-muted/50 px-4 sm:px-6 py-2.5 sm:py-3">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    {language === "zh" ? "工作日" : "Weekday"}
                  </h4>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {currentData.weekday.map((session, index) => (
                    <ClassCard key={index} session={session} language={language} />
                  ))}
                </div>
              </div>

              {/* Weekend Row */}
              <div>
                <div className="bg-muted/50 px-4 sm:px-6 py-2.5 sm:py-3">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    {language === "zh" ? "周末" : "Weekend"}
                  </h4>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {currentData.weekend.map((session, index) => (
                    <ClassCard key={index} session={session} language={language} />
                  ))}
                </div>
              </div>
            </div>

            {/* Note about accelerated pathway */}
            {(activeTab === "year10" || activeTab === "year9") && (
              <motion.p
                className="text-center mt-4 sm:mt-6 text-xs sm:text-sm px-2"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-accent font-medium">
                  {language === "zh" ? "加速课程" : "Accelerated Pathway"}:
                </span>{" "}
                <span className="text-muted-foreground">
                  {language === "zh"
                    ? "在10年级完成 Unit 1/2，获得 ATAR 战略优势"
                    : "Complete Unit 1/2 in Year 10 for ATAR strategic advantage"}
                </span>
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Placeholder Note */}
        <p className="text-center text-muted-foreground/60 text-xs sm:text-sm mt-4 sm:mt-6 md:mt-8">
          {language === "zh"
            ? "* 课程时间为占位符，实际时间请联系我们确认"
            : "* Class times are placeholders, contact us to confirm actual schedule"}
        </p>
      </div>
    </section>
  );
}

function ClassCard({
  session,
  language,
}: {
  session: ClassSession;
  language: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg ${
        session.isAccelerated
          ? "bg-accent/5 border border-accent"
          : "bg-muted/30"
      }`}
    >
      <div className="flex-1">
        <h5 className="font-medium text-foreground text-sm sm:text-base flex flex-wrap items-center gap-2">
          {session.subject}
          {session.isAccelerated && (
            <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-accent text-white rounded-full">
              {language === "zh" ? "加速" : "Accelerated"}
            </span>
          )}
        </h5>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {session.time}
        </span>
        <span className="flex items-center gap-1">
          {session.location === "onsite" ? (
            <>
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {language === "zh" ? "实体课" : "Onsite"}
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {language === "zh" ? "线上/线下" : "Hybrid"}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
