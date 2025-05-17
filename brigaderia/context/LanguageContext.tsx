"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    setLanguage(storedLang ?? "pt");
  }, []);

  function changeLanguage(lang: string) {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }

  if (!language) {
    // Enquanto não tem o language definido, não renderiza os filhos
    return null; // ou um loader, se quiser
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
