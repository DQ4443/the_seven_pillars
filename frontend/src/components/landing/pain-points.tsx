"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { HelpCircle, MessageCircle, Calculator, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [HelpCircle, Calculator, TrendingUp];

export function PainPoints() {
  const { language, t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section-prestige bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 2x2 Grid (3 cards on larger screens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.painPoints.items.map((item, index) => {
            const Icon = icons[index];
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                className="card-prestige overflow-hidden cursor-pointer"
                onClick={() => toggleCard(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  {/* Label */}
                  <h3 className={`font-serif text-lg font-bold text-foreground mb-2 ${language === "zh" ? "font-serif-cn" : ""}`}>
                    {item.label}
                  </h3>

                  {/* Reveal Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground text-sm leading-relaxed pt-2 border-t border-border">
                          {item.reveal}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tap hint when collapsed */}
                  {!isExpanded && (
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {language === "zh" ? "点击查看解决方案" : "Tap to see solution"}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
