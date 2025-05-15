"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"; // Adicionando o ícone do carrinho

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems] = useState(2); // Exemplo de quantidade de itens no carrinho. Aqui você pode substituir pelo valor real.

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Menu lateral */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 z-50 h-full transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 bg-[#96654A] pt-25`}
      >
        <nav className="flex flex-col space-y-4 px-4 py-8">
          <Link
            href="/products"
            className="text-white hover:text-white text-2xl font-medium"
            onClick={closeMenu}
          >
            Produtos
          </Link>
          <Link
            href="/cart"
            className="text-white hover:text-white text-2xl font-medium"
            onClick={closeMenu}
          >
            Carrinho
          </Link>
          <Link
            href="/about-us"
            className="text-white hover:text-white text-2xl font-medium"
            onClick={closeMenu}
          >
            Contato
          </Link>
          <Link
            href="/frequently-questions"
            className="text-white hover:text-white text-2xl font-medium"
            onClick={closeMenu}
          >
            Perguntas Frequentes
          </Link>
          <Link
            href="/store"
            className="text-white hover:text-white text-2xl font-medium"
            onClick={closeMenu}
          >
            Loja
          </Link>
        </nav>
      </div>

      {/* Barra de navegação */}
      <header className="bg-[#96654A] shadow sticky top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <button
            onClick={toggleMenu}
            aria-label="Abrir menu"
            className="text-white cursor-pointer"
          >
            {menuOpen ? (
              <XMarkIcon className="h-12 w-12" />
            ) : (
              <Bars3Icon className="h-12 w-12" />
            )}
          </button>

          <Image
            src="/images/logo-without-bg.svg"
            alt="Logo"
            width={300}
            height={40}
          />

          {/* Ícone do carrinho com contador */}
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="h-8 w-8 text-white" />
            {cartItems > 0 && (
              <span className="absolute top-4 left-4 inline-block px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartItems}
              </span>
            )}
          </Link>
        </nav>
      </header>
    </>
  );
}
