"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="video" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Video Container */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Video Wrapper with rounded corners */}
          <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-primary shadow-prestige-lg sm:shadow-prestige-xl">
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-[#1a4066]">
              {/* Decorative pattern - smaller on mobile */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>
            </div>

            {/* Play Button Overlay - touch-friendly size */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-lg hover:bg-accent/90 active:bg-accent/80 transition-colors touch-target"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play video"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5 sm:ml-1" fill="white" />
              </motion.button>
            </div>

            {/* Placeholder Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white/60 text-xs sm:text-sm text-center">
                {language === "zh" ? "视频占位符" : "Video placeholder"}
              </p>
            </div>
          </div>

          {/* Caption */}
          <p
            className={`text-center text-muted-foreground mt-4 sm:mt-6 text-sm sm:text-base md:text-lg ${
              language === "zh" ? "font-serif-cn" : "font-serif"
            }`}
          >
            {language === "zh"
              ? "观看5F循环在课堂中的实际应用"
              : "See the 5F Cycle in Action inside the Classroom"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
