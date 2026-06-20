"use client";

import React, { useState, useCallback } from "react";
import { m } from "framer-motion";
import ProjectCard from "../shared/ProjectCard";
import ProjectModal from "../shared/ProjectModal";
import { Project } from "@/types";
import { staggerContainer } from "@/lib/animations";

const PROJECTS: Project[] = [
  { id: "1", title: "Balayage Vainilla", description: "Técnica de degradado suave con matices arena y brillo efecto espejo.", image: "/assets/hair-1.jpg", category: "Coloración Premium", link: "#", details: { fullDescription: "Nuestro Balayage Vainilla es una técnica artesanal que busca iluminar el rostro de forma natural. Utilizamos degradados suaves que no dejan marcas de crecimiento, permitiendo una transición perfecta entre tu base natural y las puntas iluminadas.", products: ["Wella Professionals", "Olaplex", "Shinefinity"], time: "3.5 - 4 horas", cost: "Desde 145€", hairType: "Bases castañas y rubias", duration: "4 - 6 meses" } },
  { id: "2", title: "Corte Modern Fade", description: "Contornos limpios y degradado impecable para un look urbano.", image: "/assets/modern_fade.png", category: "Gentleman Style", link: "#", details: { fullDescription: "El Modern Fade combina la precisión de la barbería clásica con las tendencias actuales. Realizamos un degradado milimétrico desde la base hasta la parte superior, rematando con un peinado texturizado que aporta volumen y carácter.", products: ["American Crew", "Reuzel Fiber", "Morgan's Pomade"], time: "45 - 60 min", cost: "28€", hairType: "Pelo corto / media densidad", duration: "2 - 3 semanas" } },
  { id: "3", title: "Ondas Naturales", description: "Movimiento y volumen orgánico con acabado de salón.", image: "/assets/hair-4.png", category: "Styling & Finish", link: "#", details: { fullDescription: "Creamos ondas con caída natural que aportan movimiento sin endurecer el cabello. Es el estilo perfecto para quienes buscan un look arreglado pero informal, resaltando el brillo y la salud de la melena.", products: ["GHD Curve", "Moroccanoil Luminous Hairspray", "Dry Texture Spray"], time: "30 - 45 min", cost: "Desde 25€", hairType: "Cualquier longitud", duration: "24 - 48 horas" } },
  { id: "4", title: "Recogido Editorial", description: "Estilismo de alta costura diseñado para novias y eventos exclusivos.", image: "/assets/hair-6.png", category: "Bridal & Events", link: "#", details: { fullDescription: "Nuestros recogidos editoriales se inspiran en las pasarelas de moda. Estructuras elegantes y duraderas que se adaptan a tu vestido y personalidad. Incluimos una asesoría previa para asegurar que el resultado sea impecable.", products: ["Sebastian Professional", "Schwarzkopf OSIS", "L'Oréal Elnett"], time: "1.5 - 2 horas", cost: "Desde 65€", hairType: "Media melena / Largo", duration: "Todo el evento" } },
  { id: "5", title: "Melena Infinita", description: "Brillo sedoso y textura ligera para melenas largas.", image: "/assets/hair-3.png", category: "Health & Treatment", link: "#", details: { fullDescription: "Tratamiento intensivo de hidratación y pulido de cutícula. Ideal para melenas que han perdido el brillo o se enredan con facilidad. El resultado es un cabello suave como la seda y visualmente más largo y sano.", products: ["Kérastase Chronologiste", "Fusio Dose", "Elixir Ultime"], time: "1 hora", cost: "Desde 50€", hairType: "Cabello largo / castigado", duration: "3 - 4 semanas" } },
  { id: "6", title: "Curly Power", description: "Definición extrema y nutrición para rizos con personalidad propia.", image: "/assets/hair-5.png", category: "Metodo Curly", link: "#", details: { fullDescription: "Expertos en el cuidado del rizo. Realizamos cortes en seco respetando el patrón natural del cabello y aplicamos técnicas de definición (finger coiling, pulsing) para conseguir rizos elásticos y sin frizz.", products: ["Shea Moisture", "Cantú Beauty", "Bouclème"], time: "1.5 - 2 horas", cost: "Desde 45€", hairType: "Rizos 2A a 4C", duration: "Hasta el siguiente lavado" } }
];

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  return (
    <section id="projects" className="py-20 bg-transparent scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Galería de Estilos</h2>
          <p className="text-white/40 mt-4 text-xl">Una muestra de nuestro arte en Cartagena</p>
        </div>
        
        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className="md:row-span-2">
              <ProjectCard project={project} onViewProject={handleViewProject} />
            </div>
          ))}
        </m.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default ProjectGrid;

