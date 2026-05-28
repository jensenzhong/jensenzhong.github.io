"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Language = "zh" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full bg-white/70 p-0.5 shadow-sm ring-1 ring-[#ff9f43]/20 backdrop-blur">
      {(["zh", "en"] as const).map((item) => {
        const active = language === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            className={`h-7 min-w-9 rounded-full px-2.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-[#ff9f43] text-white shadow-sm"
                : "text-[#f2a85b] hover:text-[#c96a10]"
            }`}
            aria-pressed={active}
          >
            {item === "zh" ? "中" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
