"use client";

import React from "react";
import { m } from "framer-motion";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
export default function NoticiasPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="pt-40 pb-10 px-6">
        <div className="container mx-auto">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              Noticias <span className="text-white/20 italic">&amp; Novedades</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Mantente al día con las últimas novedades de Baskuñana Peluqueros. Nuevos servicios, tendencias, consejos de expertos y todo lo que pasa en nuestro salón.
            </p>
          </m.div>
        </div>
      </section>

      <BlogSection />

      {/* Opinions / Testimonials Section */}
      <div className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Vuestra <span className="text-white/20 italic">Voz</span></h2>
          <p className="text-white/40 mt-4 text-xl">Lo que dicen nuestros clientes.</p>
        </div>
        <TestimonialSection />
      </div>

    </div>
  );
}

