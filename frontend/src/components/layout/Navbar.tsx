"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Scissors, Phone, ShoppingCart } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useCart } from "@/context/CartContext";
import { useScrollTo } from "@/hooks/useScrollTo";

const NAV_LINKS = [
  { href: "/", label: "Inicio", id: "top" },
  { href: "/galeria", label: "Galería" },
  { href: "/tienda", label: "Tienda" },
  { href: "/equipo", label: "Equipo" },
  { href: "/noticias", label: "Noticias" },
];

const Navbar = () => {
  const { openBooking } = useBooking();
  const { itemCount, openCart } = useCart();
  const { scrollToSection, pathname } = useScrollTo();

  const links = useMemo(() => NAV_LINKS.map(({ href, label, id }) => (
    <Link 
      key={href}
      href={href} 
      onClick={(e) => id && scrollToSection(e, id)} 
      className={`hover:text-white transition-all hover:scale-105 uppercase tracking-[0.15em] text-[15px] ${pathname === href ? "text-white font-black" : ""}`}
    >
      {label}
    </Link>
  )), [pathname, scrollToSection]);

  return (
    <m.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-dark m-4 rounded-full max-w-7xl mx-auto border border-white/10"
    >
      <Link 
        href="/" 
        onClick={(e) => scrollToSection(e, "top")}
        className="flex items-center gap-3 font-bold text-2xl tracking-tighter group"
      >
        <div className="bg-white text-black p-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
          <Scissors size={18} />
        </div>
        <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">Baskuñana</span>
      </Link>

      <div className="hidden md:flex items-center gap-10 font-bold text-white/50">
        {links}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <a 
          href="tel:+34968154346" 
          className="hidden lg:flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold"
        >
          <Phone size={16} />
          <span>+34 968 154 346</span>
        </a>

        {/* Cart Button */}
        <button
          onClick={openCart}
          className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white hover:scale-105"
          aria-label="Abrir carrito"
        >
          <ShoppingCart size={18} />
          <AnimatePresence>
            {itemCount > 0 && (
              <m.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </m.span>
            )}
          </AnimatePresence>
        </button>

        <button 
          onClick={() => openBooking()}
          className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] whitespace-nowrap"
        >
          Reserva Cita
        </button>
      </div>
    </m.nav>
  );
};

export default Navbar;

