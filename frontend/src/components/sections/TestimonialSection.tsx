"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { fadeInUp, staggerContainer, spinOnScroll } from "@/lib/animations";
import { TESTIMONIALS } from "@/data/testimonials";
import { Testimonial } from "@/types";
import { useBooking } from "@/context/BookingContext";

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-transparent overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 mb-20 text-center">
        <m.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-white/40 font-bold tracking-widest text-xs uppercase mb-6"
        >
          <div className="w-8 h-[1px] bg-white/40" />
          Testimonios
        </m.div>
        
        <m.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-6xl md:text-[8rem] font-bold tracking-tighter text-white leading-none"
        >
          Lo que dicen <br /> de nosotros
        </m.h2>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="relative flex overflow-x-hidden">
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 15, 
            ease: "linear" 
          }}
          className="flex gap-8 py-10 px-4"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
            <div key={`${testimonial.id}-${idx}`} className="w-[450px] shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <m.div
    variants={spinOnScroll}
    initial="initial"
    animate="animate"
    whileHover={{ scale: 1.05, rotateY: 0, transition: { duration: 0.3 } }}
    className="glass-dark p-10 rounded-[3rem] border border-white/5 flex flex-col gap-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] group relative overflow-hidden"
  >
    <div className="flex items-center gap-5">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white transition-colors">
        <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
      </div>
      <div>
        <h4 className="text-xl font-bold tracking-tight text-white">{testimonial.name}</h4>
        <p className="text-sm text-white/40 font-medium tracking-wide uppercase">{testimonial.company}</p>
      </div>
    </div>
    
    <div className="relative">
      <span className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif">&quot;</span>
      <p className="text-lg text-white/80 leading-relaxed font-medium whitespace-normal break-words">
        {testimonial.content}
      </p>
    </div>

    <div className="flex items-center gap-4">
      <span className="text-xl font-bold text-white/90">{testimonial.rating.toFixed(1)}</span>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const fill = Math.max(0, Math.min(1, testimonial.rating - i));
          return (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Background (Dark) Star */}
              <Star size={18} className="fill-white/10 text-white/20" />
              
              {/* Foreground (White) Star with Clip */}
              {fill > 0 && (
                <div 
                   className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star size={18} className="fill-white text-white" />
                </div>
              )}
            </m.div>
          );
        })}
      </div>
    </div>
  </m.div>
);

export default TestimonialSection;
