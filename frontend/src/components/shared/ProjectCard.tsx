"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onViewProject?: (project: Project) => void;
}

const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  return (
    <div className="col-span-1 h-full">
      <m.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{ scale: 1.03 }}
        className="relative group overflow-hidden rounded-lg bg-brand-dark border border-white/5 transition-shadow hover:shadow-2xl hover:shadow-white/5 h-full cursor-pointer"
        onClick={() => onViewProject?.(project)}
      >
        <div className="relative h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-2xl font-bold tracking-tight text-white mb-1">{project.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-4">{project.description}</p>
            </div>
            
            <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500 opacity-0 group-hover:opacity-100">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProject?.(project);
                }}
                className="w-full bg-white text-black py-3 rounded-md text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors uppercase tracking-[0.2em]"
              >
                Ver Proyecto <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default ProjectCard;
