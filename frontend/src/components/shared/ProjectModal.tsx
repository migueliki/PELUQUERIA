"use client";

import React from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { X, Clock, Banknote, Scissors, Calendar } from "lucide-react";
import { Project } from "@/types";
import { useBooking } from "@/context/BookingContext";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { openBooking } = useBooking();
  
  // Bloquear scroll cuando el modal está abierto
  useScrollLock(isOpen);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  const handleBookingClick = () => {
    onClose();
    openBooking(project.title);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 lg:p-20">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-[85vh] bg-brand-dark rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] will-change-transform"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Image Column */}
            <div className="w-full md:w-[45%] h-[40%] md:h-auto relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent md:hidden" />
            </div>

            {/* Details Column */}
            <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-between">
              <div className="mb-6">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                  {project.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed font-light">
                  {project.details?.fullDescription || project.description}
                </p>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Tiempo</p>
                    <p className="text-white text-sm font-medium">{project.details?.time || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Banknote size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Inversión</p>
                    <p className="text-white text-sm font-medium">{project.details?.cost || "Consultar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Scissors size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Pelo</p>
                    <p className="text-white text-sm font-medium">{project.details?.hairType || "Cualquiera"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Mantenimiento</p>
                    <p className="text-white text-sm font-medium">{project.details?.duration || "Variable"}</p>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">Productos Utilizados</p>
                <div className="flex flex-wrap gap-2">
                  {project.details?.products.slice(0, 4).map((product, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-white/70 font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button 
                onClick={handleBookingClick}
                className="w-full bg-white text-black py-5 rounded-2xl font-bold text-base hover:scale-[1.02] transition-transform shadow-xl shadow-white/5"
              >
                Reservar este Estilo
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
