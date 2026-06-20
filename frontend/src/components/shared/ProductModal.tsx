"use client";

import React, { memo, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, HelpCircle, ArrowRight, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  benefits?: string[];
  usage?: string;
  stock: number;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (product: Product) => void;
}

const ProductModal = ({ product, isOpen, onClose, onReserve }: ProductModalProps) => {
  // Bloquear scroll cuando el modal está abierto
  useScrollLock(isOpen);
  const { addItem, justAdded } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!product || product.stock === 0) return;

    const priceNum = parseFloat(product.price.replace("€", "").replace(",", "."));
    addItem({
      id: product.id,
      name: product.name,
      price: priceNum,
      image: product.image,
      category: product.category,
    });

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }, [product, addItem]);

  if (!product) return null;

  const isJustAdded = addedFeedback || justAdded === product.id;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm" />
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] z-[301] bg-brand-dark/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto custom-scrollbar will-change-transform"
          >
            <div className="relative p-8 pt-20">
              <button onClick={onClose} className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white">
                <X size={24} />
              </button>

              <div className="space-y-8">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-brand-gray/20">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="bg-brand-accent text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-4xl font-bold tracking-tighter text-white">{product.name}</h2>
                    <span className="text-brand-accent text-3xl font-black">{product.price}</span>
                  </div>
                  <p className="text-white/60 text-lg font-light leading-relaxed">{product.description}</p>
                   
                   <div className="mt-4 flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? (product.stock < 5 ? 'bg-orange-500 animate-pulse' : 'bg-green-500') : 'bg-red-500'}`} />
                     <span className={`text-xs font-bold uppercase tracking-widest ${product.stock > 0 ? (product.stock < 5 ? 'text-orange-500' : 'text-white/40') : 'text-red-500'}`}>
                       {product.stock > 0 
                         ? (product.stock < 5 ? `¡Últimas ${product.stock} unidades!` : 'En Stock') 
                         : 'Agotado Temporalmente'}
                     </span>
                   </div>
                 </div>

                <div className="grid grid-cols-1 gap-6">
                  <DetailCard icon={ShieldCheck} title="Beneficios">
                    <ul className="space-y-2">
                      {(product.benefits || ["Fórmula Profesional", "Sin Parabenos", "Protección Térmica"]).map((b, i) => (
                        <li key={i} className="text-white/40 text-sm flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-brand-accent" /> {b}
                        </li>
                      ))}
                    </ul>
                  </DetailCard>

                  <DetailCard icon={HelpCircle} title="Modo de Empleo">
                    <p className="text-white/40 text-sm leading-relaxed">
                      {product.usage || "Aplicar sobre el cabello húmedo realizando un suave masaje. Dejar actuar 2-3 minutos y aclarar con abundante agua."}
                    </p>
                  </DetailCard>
                </div>

                <div className="pt-8 sticky bottom-0 pb-8 space-y-3">
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl group ${
                      product.stock === 0
                        ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                        : isJustAdded
                          ? 'bg-green-500 text-white shadow-green-500/20'
                          : 'bg-white text-black hover:bg-brand-accent shadow-white/5'
                    }`}
                  >
                    {product.stock === 0 ? (
                      'Sin Existencias'
                    ) : isJustAdded ? (
                      <>
                        <Check size={20} />
                        ¡Añadido al Carrito!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Añadir al Carrito
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Reserve in Salon Button */}
                  {product.stock > 0 && (
                    <button
                      onClick={() => onReserve(product)}
                      className="w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                    >
                      Recoger en Salón
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  <p className="text-center text-white/20 text-[10px] mt-2 uppercase tracking-[0.2em] font-medium">
                    Pago seguro con Stripe · Envío a toda España
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DetailCard = memo(({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
    <div className="flex items-center gap-3 mb-3 text-brand-accent">
      <Icon size={20} />
      <h4 className="font-bold uppercase tracking-widest text-xs">{title}</h4>
    </div>
    {children}
  </div>
));

DetailCard.displayName = "DetailCard";

export default ProductModal;

