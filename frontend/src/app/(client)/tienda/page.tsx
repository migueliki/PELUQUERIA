"use client";

import React from "react";
import { motion } from "framer-motion";
import ServicesSection from "@/components/sections/ServicesSection";
import { useBooking } from "@/context/BookingContext";
import { fadeInUp } from "@/lib/animations";
import { ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function TiendaPage() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              Shop <span className="text-white/20 italic">Premium</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Productos de alta gama seleccionados por nuestros expertos para mantener la salud y el brillo de tu cabello entre visitas al salón.
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
    </main>
  );
}
