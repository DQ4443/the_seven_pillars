"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

function DonutChart({
  data,
  title,
}: {
  data: ChartData[];
  title: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // SVG circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offset for each segment
  let cumulativePercent = 0;

  return (
    <div className="flex flex-col items-center">
      {/* Chart Title */}
      <h4 className="font-serif font-bold text-foreground mb-3 sm:mb-4 text-center text-sm sm:text-base">
        {title}
      </h4>

      {/* SVG Donut - smaller on mobile */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const percent = item.value / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            // Offset to start from top (-25%) and account for previous segments
            const strokeDashoffset = circumference * (0.25 - cumulativePercent);

            cumulativePercent += percent;

            return (
              <motion.circle
                key={index}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              />
            );
          })}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-foreground">{total}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {item.label}: <span className="font-medium text-foreground">{item.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({
  data,
  title,
}: {
  data: ChartData[];
  title: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full">
      {/* Chart Title */}
      <h4 className="font-serif font-bold text-foreground mb-4 sm:mb-6 text-center text-sm sm:text-base">
        {title}
      </h4>

      {/* Bars */}
      <div className="space-y-3 sm:space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground">{item.value}%</span>
            </div>
            <div className="h-2.5 sm:h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={shouldReduceMotion ? { width: `${(item.value / maxValue) * 100}%` } : { width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Demographics() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const schoolData: ChartData[] = [
    {
      label: language === "zh" ? "私立学校" : "Private School",
      value: 40,
      color: "#0E2A47", // Oxford Blue
    },
    {
      label: language === "zh" ? "精英公校" : "Selective Entry",
      value: 40,
      color: "#C5A059", // Gold
    },
    {
      label: language === "zh" ? "优质公校" : "High-Performing Public",
      value: 20,
      color: "#8B9DC3", // Light blue-gray
    },
  ];

  const ambitionsData: ChartData[] = [
    {
      label: language === "zh" ? "医学/牙医" : "Medicine/Dentistry",
      value: 35,
      color: "#0E2A47",
    },
    {
      label: language === "zh" ? "法律" : "Law",
      value: 25,
      color: "#C5A059",
    },
    {
      label: language === "zh" ? "工程" : "Engineering",
      value: 25,
      color: "#8B9DC3",
    },
    {
      label: language === "zh" ? "科学研究" : "Science Research",
      value: 15,
      color: "#666666",
    },
  ];

  return (
    <section id="demographics" className="py-12 sm:py-16 md:py-24 bg-background">
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
            {language === "zh" ? "加入高成就者社区" : "Join a Community of High Achievers"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "您的孩子将与志同道合的优秀同伴一起学习"
              : "Your child will learn alongside motivated peers who normalize excellence"}
          </p>
        </motion.div>

        {/* Charts - Side by side on mobile too, but smaller */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-12 max-w-4xl mx-auto">
          {/* School Composition - Donut Chart */}
          <motion.div
            className="card-prestige p-4 sm:p-6 md:p-8 bg-white"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <DonutChart
              data={schoolData}
              title={language === "zh" ? "学校构成" : "School Composition"}
            />
          </motion.div>

          {/* Ambitions - Bar Chart */}
          <motion.div
            className="card-prestige p-4 sm:p-6 md:p-8 bg-white"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <BarChart
              data={ambitionsData}
              title={language === "zh" ? "职业志向" : "Career Ambitions"}
            />
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-muted-foreground/70 text-xs sm:text-sm mt-4 sm:mt-6 md:mt-8 max-w-xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {language === "zh"
            ? "* 数据为占位符，实际数据即将更新"
            : "* Data is placeholder, actual statistics coming soon"}
        </motion.p>
      </div>
    </section>
  );
}
