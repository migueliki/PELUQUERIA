"use client";

import React from "react";
import { m } from "framer-motion";
import TeamSection from "@/components/sections/TeamSection";
import { useBooking } from "@/context/BookingContext";
import { fadeInUp } from "@/lib/animations";

export default function EquipoPage() {
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
              Nuestros <span className="text-white/20 italic">Artistas</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Un equipo de apasionados por la belleza y el cuidado personal, comprometidos con la formación continua y la excelencia en cada servicio.
            </p>
          </m.div>
        </div>
      </section>

      <TeamSection />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto text-center">
          <m.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="glass-dark p-16 rounded-[4rem] border border-white/10"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8">
              Ponte en manos de expertos
            </h2>
            <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto font-light">
              Elige a tu estilista favorito y reserva tu momento de relax en el salón.
            </p>
            <button 
              onClick={() => openBooking()}
              className="bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Reservar con el Equipo
            </button>
          </m.div>
        </div>
      </section>
    </main>
  );
}
