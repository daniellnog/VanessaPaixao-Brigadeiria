"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="text-center text-sm py-6">
      © {year} Brigaderia da Vanessa. Todos os direitos reservados.
    </footer>
  );
}
