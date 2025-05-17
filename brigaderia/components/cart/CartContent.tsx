// components/products/ProductContent.tsx
"use client";
import { useTranslations } from "@/hooks/useTranslations";

export default function CartContent() {
  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">{t.my_cart}</h1>
      <p>{t.my_cart_description}</p>
    </main>
  );
}
