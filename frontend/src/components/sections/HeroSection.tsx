"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useBooking } from "@/context/BookingContext";

const HeroSection = () => {
  const { openBooking } = useBooking();
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-6 text-center z-10"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="opacity-80 text-white uppercase tracking-widest">Peluquería de Autor & Estética Avanzada</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 max-w-6xl mx-auto leading-[0.85] text-white"
        >
          Redefiniendo <br />
          <span className="text-white/30 italic">tu esencia</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light"
        >
          En Baskuñana, fusionamos técnica artesanal con las últimas tendencias para crear estilos que hablan por ti. 
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openBooking()}
            className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-white/10 group"
          >
            Reservar Experiencia
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button 
            onClick={() => router.push('/galeria')}
            className="bg-transparent border border-white/10 hover:border-white/40 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-all text-center min-w-[240px]"
          >
            Nuestra Galería
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          className="mt-24 flex flex-col items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold"
        >
          <span>Explora el arte</span>
          <div className="w-0.5 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Brands / Partners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 px-6 hidden md:flex justify-center"
      >
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-20 grayscale hover:opacity-100 transition-all duration-700">
          {["L'ORÉAL", "KÉRASTASE", "GHĎ", "REDKEN", "OLAPLEX"].map((logo) => (
            <span key={logo} className="text-xl font-black tracking-widest">{logo}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
