"use client";

import React, { memo, useCallback } from "react";
import type { UIEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useCarousel } from "@/hooks/useCarousel";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  experience: string;
  studies: string;
  image: string;
}

const TEAM: TeamMember[] = [
  { id: "1", name: "Elena Baskuñana", role: "Fundadora & Directora Creativa", description: "Visionaria del estilo con una pasión inquebrantable por la excelencia y el arte del visagismo.", experience: "20+ años transformando esencias.", studies: "Master en Colorimetría por L'Oréal Academy (París) y Especialización en Visagismo en Londres.", image: "/assets/team-elena.png" },
  { id: "2", name: "Marco Antonio", role: "Senior Stylist & Color Expert", description: "Maestro de las técnicas de iluminación y experto en crear cambios de look radicales pero saludables.", experience: "12 años en peluquería de vanguardia.", studies: "Graduado en la Academia Vidal Sassoon, experto en técnicas Balayage y Hair Contouring.", image: "/assets/team-marco.png" },
  { id: "3", name: "Sofía Martín", role: "Terapeuta Capilar & Estilista", description: "Especialista en la salud profunda del cabello y rituales de recuperación molecular.", experience: "8 años dedicada al cuidado integral.", studies: "Especialista en Tricología y tratamientos orgánicos de recuperación capilar de última generación.", image: "/assets/team-sofia.png" },
  { id: "4", name: "Ismael Ruiz", role: "Barber & Fade Specialist", description: "Precisión milimétrica y las últimas tendencias en degradados y estilismo masculino.", experience: "10 años dominando el arte de la barbería.", studies: "Especialista certificado en Barbería Clásica y Moderna por la Schorem Haarsnijder (Rotterdam).", image: "/assets/team-ismael.png" },
  { id: "5", name: "Lucía García", role: "Guest Experience Manager", description: "Asegurando que cada visita sea un viaje sensorial desde el primer momento que cruzas nuestra puerta.", experience: "6 años en hospitality de lujo.", studies: "Gestión de Centros de Estética y Protocolo de Atención al Cliente Premium.", image: "/assets/team-lucia.png" }
];

const TeamMemberCard = memo(({ member }: { member: TeamMember }) => (
  <motion.div variants={fadeInUp} className="group relative">
    <div className="relative aspect-square rounded-lg overflow-hidden bg-brand-gray/50 border border-white/5 mb-3 group-hover:border-brand-accent/30 transition-colors duration-500 shadow-2xl">
      <Image 
        src={member.image} 
        alt={member.name} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
            <Briefcase size={14} /> Experiencia
          </div>
          <p className="text-white font-medium italic">{member.experience}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
            <GraduationCap size={14} /> Formación
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{member.studies}</p>
        </div>
        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
          <Award className="text-brand-accent" size={20} />
          <span className="text-white font-bold text-xs uppercase tracking-[0.2em]">Especialista Senior</span>
        </div>
      </div>
    </div>
    <div className="px-6">
      <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-brand-accent transition-colors">{member.name}</h3>
      <p className="text-brand-accent font-bold text-xs uppercase tracking-widest mb-4 opacity-80">{member.role}</p>
      <p className="text-white/40 text-sm font-light leading-relaxed max-w-sm">{member.description}</p>
    </div>
  </motion.div>
));

TeamMemberCard.displayName = "TeamMemberCard";

const TeamSection = () => {
  const { setContainerRef, canScrollLeft, canScrollRight, scroll, handleScroll } = useCarousel();
  const handleTeamRef = useCallback((node: HTMLDivElement | null) => {
    setContainerRef(node);
  }, [setContainerRef]);
  const handleTeamScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    handleScroll(event);
  }, [handleScroll]);

  return (
    <section id="team" className="py-10 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
          <div className="text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 text-brand-accent font-bold tracking-[0.3em] text-xs uppercase mb-6">
              <div className="w-8 h-0.5 bg-brand-accent" /> Nuestro Equipo
            </motion.div>
            <motion.h2 variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none">
              Maestros <br /> del Estilo
            </motion.h2>
          </div>

          <div className="flex gap-4 mb-4">
            <CarouselButton direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
            <CarouselButton direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
          </div>
        </div>

        <div ref={handleTeamRef} onScroll={handleTeamScroll} className="flex gap-8 overflow-x-auto scrollbar-hide pb-12 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TEAM.map((member) => (
            <div key={member.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] shrink-0 snap-start">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CarouselButton = ({ direction, onClick, disabled }: { direction: "left" | "right", onClick: () => void, disabled: boolean }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button onClick={onClick} disabled={disabled} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${disabled ? "bg-white/10 text-white/20 cursor-not-allowed opacity-20" : "bg-white text-black hover:scale-110 cursor-pointer"}`} title={direction === "left" ? "Anterior" : "Siguiente"}>
      <Icon size={32} strokeWidth={3} />
    </button>
  );
};

export default TeamSection;
