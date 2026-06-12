"use client";

import React from "react";
import { m } from "framer-motion";
import ProjectGrid from "@/components/sections/ProjectGrid";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import { useBooking } from "@/context/BookingContext";
import { fadeInUp } from "@/lib/animations";

export default function GaleriaPage() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              Nuestra <span className="text-white/20 italic">Galería</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Explora una selección de nuestros trabajos más recientes. Desde cambios de color radicales hasta cortes clásicos con un toque moderno.
            </p>
          </m.div>
        </div>
      </section>

      <ProjectGrid />
      
      <div className="py-20">
        <BeforeAfterSection />
      </div>

    </main>
  );
}
