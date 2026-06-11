"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { MapPin, Phone, Link as LinkIcon, ArrowUp } from "lucide-react";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "../shared/ShareMenu";

const SOCIAL_LINKS = [
  { icon: InstagramIcon, href: "#" },
  { icon: FacebookIcon, href: "#" },
  { icon: TwitterIcon, href: "#" },
  { icon: LinkIcon, href: "#" },
];

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/galeria", label: "Galería" },
  { href: "/tienda", label: "Tienda" },
  { href: "/equipo", label: "Equipo" },
  { href: "/blog", label: "Blog" },
];

const SERVICES = ["Balayage", "Cortes", "Tratamientos"];

const Footer = () => {
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const socialIcons = useMemo(() => SOCIAL_LINKS.map(({ icon: Icon, href }, i) => (
    <a key={i} href={href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 cursor-pointer transition-colors">
      <Icon size={18} />
    </a>
  )), []);

  const navLinks = useMemo(() => NAV_LINKS.map(({ href, label }) => (
    <li key={href}>
      <Link href={href} className="text-white/40 font-light hover:text-white transition-colors">{label}</Link>
    </li>
  )), []);

  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center">
          <div className="lg:col-span-1 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-6 uppercase">
              Baskuñana<br />
              <span className="text-white/40 font-light">Peluqueros</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 font-light max-w-sm">
              Elevando el arte de la peluquería en el corazón de Cartagena. Especialistas en coloración de vanguardia y cortes de autor.
            </p>
            <div className="flex gap-4">
              {socialIcons}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contacto</h4>
            <ul className="space-y-6 flex flex-col items-center">
              <li className="flex items-center gap-4">
                <MapPin className="text-white/30" size={20} />
                <span className="text-white/60 font-light">Calle Mayor, 12, Cartagena</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-white/30" size={20} />
                <span className="text-white/60 font-light">+34 968 154 346</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navegación</h4>
            <ul className="space-y-4 flex flex-col items-center">
              {navLinks}
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Servicios</h4>
            <ul className="space-y-4 flex flex-col items-center">
              {SERVICES.map((s) => (
                <li key={s} className="text-white/40 font-light">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex justify-between items-center">
          <p className="text-white/20 text-sm font-light">© 2026 BASKUNANA PELUQUEROS</p>
          <button onClick={scrollToTop} className="text-white/20 hover:text-white flex items-center gap-2">
            Volver Arriba <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
