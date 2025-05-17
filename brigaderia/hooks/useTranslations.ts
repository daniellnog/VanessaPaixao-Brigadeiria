// hooks/useTranslations.ts
import pt from "@/locales/pt-pt.json";
import en from "@/locales/en-uk.json";
import { useLanguage } from "@/context/LanguageContext";

type Language = "pt" | "en";

const translations: Record<Language, typeof pt> = {
  pt,
  en,
};

export function useTranslations() {
  const { language } = useLanguage();

  // Aqui garantimos que o language é um Language, para evitar erro do TS
  // Se não tiver certeza, faça um fallback:
  const lang = (language === "pt" || language === "en") ? language : "pt";

  return translations[lang];
}
