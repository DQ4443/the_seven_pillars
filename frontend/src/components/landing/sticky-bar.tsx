"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WECHAT_ID = "DrRickyEdu"; // Replace with actual WeChat ID

export function StickyConversionBar() {
  const { language } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleWeChatClick = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = WECHAT_ID;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleBookDiagnostic = () => {
    const element = document.querySelector("#admissions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[1000] bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          >
            {language === "zh" ? "微信ID已复制!" : "WeChat ID Copied!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky bar - only visible on mobile */}
      <div className="sticky-conversion-bar">
        <button
          onClick={handleWeChatClick}
          className="btn-wechat"
          aria-label={language === "zh" ? "复制微信ID" : "Copy WeChat ID"}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{language === "zh" ? "微信" : "WeChat"}</span>
        </button>
        <button
          onClick={handleBookDiagnostic}
          className="btn-cta"
          aria-label={language === "zh" ? "预约诊断" : "Book Diagnostic"}
        >
          <span>{language === "zh" ? "预约诊断" : "Book Diagnostic"}</span>
        </button>
      </div>
    </>
  );
}
