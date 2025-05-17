"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

import Image from "next/image";

type Language = {
  code: "pt" | "en";
  label: string;
  flagUrl: string;
};

const languages: Language[] = [
  {
    code: "pt",
    label: "Português (Portugal)",
    flagUrl: "https://flagcdn.com/w40/pt.png",
  },
  {
    code: "en",
    label: "English (UK)",
    flagUrl: "https://flagcdn.com/w40/gb.png",
  },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = languages.find((l) => l.code === language) ?? languages[0];

  function toggleDropdown() {
    setOpen((prev) => !prev);
  }

  const router = useRouter();

  async function selectLanguage(lang: Language) {
    await fetch("/api/set-language", {
      method: "POST",
      body: JSON.stringify({ language: lang.code }), // use lang.code dinâmico
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLanguage(lang.code);
    setOpen(false);
    router.refresh();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-[#96654A] rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer select-none"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma"
        type="button"
      >
        <Image
          src={selected.flagUrl}
          alt={selected.label}
          width={24}
          height={18}
          className="rounded-sm"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 mt-2 w-60 bg-[#96654A] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={selected.code === lang.code}
              tabIndex={0}
              onClick={() => selectLanguage(lang)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  selectLanguage(lang);
                }
              }}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-[#7a4f35] whitespace-nowrap ${
                selected.code === lang.code ? "font-bold" : ""
              }`}
            >
              <Image
                src={lang.flagUrl}
                alt={lang.label}
                width={24}
                height={18}
                className="rounded-sm"
              />
              <span className="text-white">{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
