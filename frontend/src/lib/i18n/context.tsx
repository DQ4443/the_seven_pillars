"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Language } from "./translations";

type TranslationValue = (typeof translations)[Language];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationValue;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh"); // Default to Chinese

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  const t = translations[language] as TranslationValue;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
