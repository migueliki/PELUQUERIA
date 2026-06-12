"use client";

import React from "react";
import { m } from "framer-motion";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import { fadeInUp } from "@/lib/animations";

export default function BlogPage() {
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
              Baskuñana <span className="text-white/20 italic">Blog</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Tu espacio de belleza en Cartagena. Consejos de expertos, últimas tendencias en color y noticias exclusivas de nuestro salón.
            </p>
          </m.div>
        </div>
      </section>

      <BlogSection />

      {/* Opinions / Testimonials Section */}
      <div className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Vuestra <span className="text-white/20 italic">Voz</span></h2>
          <p className="text-white/40 mt-4 text-xl">Lo que dicen nuestros clientes en el blog.</p>
        </div>
        <TestimonialSection />
      </div>

    </div>
  );
}
