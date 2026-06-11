"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSFORMATIONS = [
  {
    id: 1,
    before: "/assets/about-me.png",
    after: "/assets/hair-6.png",
    title: "Cambio de Look Radical"
  },
  {
    id: 2,
    before: "/assets/hair-1.png",
    after: "/assets/hair-5.png",
    title: "Iluminación Balayage"
  },
  {
    id: 3,
    before: "/assets/hair-2.png",
    after: "/assets/hair-3.png",
    title: "Corte y Estilo"
  }
];

const BeforeAfterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTransform = () => {
    setCurrentIndex((prev) => (prev + 1) % TRANSFORMATIONS.length);
    setSliderPosition(50);
  };

  const prevTransform = () => {
    setCurrentIndex((prev) => (prev - 1 + TRANSFORMATIONS.length) % TRANSFORMATIONS.length);
    setSliderPosition(50);
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-white/40 font-bold tracking-widest text-xs uppercase mb-6"
          >
            <div className="w-8 h-0.5 bg-white/40" />
            Transformaciones
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold tracking-tighter text-white"
          >
            El Arte del <span className="italic text-white/30">Cambio</span>
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto group">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTransform}
            className="absolute -left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all z-30 hidden lg:flex"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={nextTransform}
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all z-30 hidden lg:flex"
          >
            <ChevronRight size={32} />
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/9] rounded-[3rem] overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={onTouchMove}
          >
            {/* After Image */}
            <div className="absolute inset-0">
              <Image
                src={TRANSFORMATIONS[currentIndex].after}
                alt="After"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest">
                Después
              </div>
            </div>

            {/* Before Image */}
            <div 
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={TRANSFORMATIONS[currentIndex].before}
                alt="Before"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute top-8 left-8 bg-white px-4 py-2 rounded-full text-xs font-bold text-black uppercase tracking-widest">
                Antes
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex gap-1.5">
                  <div className="w-1 h-4 bg-black/20 rounded-full" />
                  <div className="w-1 h-6 bg-black rounded-full" />
                  <div className="w-1 h-4 bg-black/20 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <button onClick={prevTransform} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><ChevronLeft /></button>
            <button onClick={nextTransform} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><ChevronRight /></button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">{TRANSFORMATIONS[currentIndex].title}</h3>
          <p className="text-white/40 text-lg font-light">
            Desliza el controlador para ver la magia de nuestras técnicas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
