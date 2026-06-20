"use client";

import React, { useState, memo, useCallback } from "react";
import type { UIEvent } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useBooking } from "@/context/BookingContext";
import { useCart } from "@/context/CartContext";
import ProductModal from "../shared/ProductModal";
import { useCarousel } from "@/hooks/useCarousel";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  stock: number;
}

const PRODUCTS: Product[] = [
  { id: "p1", name: "Revitalizing Shampoo", description: "Limpieza profunda y brillo extremo con extractos botánicos de alta gama.", price: "25€", image: "/assets/product-shampoo.png", category: "Care", stock: 12 },
  { id: "p2", name: "Repair Mask", description: "Tratamiento intensivo para reconstruir la fibra capilar desde el interior.", price: "35€", image: "/assets/product-mask.png", category: "Treatment", stock: 0 },
  { id: "p3", name: "Elixir Oil", description: "Aceite ligero que aporta sedosidad y control absoluto del frizz.", price: "28€", image: "/assets/product-oil.png", category: "Finish", stock: 3 },
  { id: "p4", name: "Intensive Serum", description: "Concentrado de vitaminas para una protección y sellado de puntas impecable.", price: "32€", image: "/assets/product-serum.png", category: "Protection", stock: 15 },
  { id: "p5", name: "Texturizing Spray", description: "Define ondas y aporta volumen con un acabado natural y ligero.", price: "22€", image: "/assets/product-spray.png", category: "Style", stock: 8 },
  { id: "p6", name: "Scalp Ritual", description: "Tratamiento detox para oxigenar y revitalizar el cuero cabelludo.", price: "40€", image: "/assets/product-scalp.png", category: "Detox", stock: 1 }
];

const PRODUCTS_ROW_1 = [...PRODUCTS];
const PRODUCTS_ROW_2 = [...PRODUCTS].reverse();

const ProductCard = memo(({ product, onClick, onAddToCart, isAdded }: { product: Product, onClick: () => void, onAddToCart: (e: React.MouseEvent) => void, isAdded: boolean }) => (
  <m.div 
    variants={fadeInUp} 
    className={`group relative h-full cursor-pointer transition-all duration-500 ${product.stock === 0 ? 'opacity-60 grayscale-[0.8]' : ''}`} 
    onClick={onClick}
  >
    <div className="relative aspect-square rounded-lg overflow-hidden bg-brand-gray/50 border border-white/5 mb-6">
      <Image 
        src={product.image} 
        alt={product.name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={product.id === "p1"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 gap-3">
        {product.stock > 0 && (
          <button
            onClick={onAddToCart}
            className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-sm ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            {isAdded ? <><Check size={16} /> ¡Añadido!</> : <><ShoppingCart size={16} /> Añadir al Carrito</>}
          </button>
        )}
        <button className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {product.stock > 0 ? 'Ver Detalles' : 'Ver Producto'} <ArrowRight size={18} />
        </button>
      </div>
      <div className="absolute top-6 left-6">
        {product.stock === 0 ? (
          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Agotado</span>
        ) : product.stock < 5 ? (
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">¡Últimas {product.stock}!</span>
        ) : null}
      </div>
      <div className="absolute top-6 right-6">
        <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10">{product.category}</span>
      </div>
    </div>
      <div className="px-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-xl font-bold tracking-tight transition-colors ${product.stock === 0 ? 'text-white/40' : 'text-white'}`}>{product.name}</h3>
        <span className={`font-black text-lg ${product.stock === 0 ? 'text-white/20' : 'text-brand-accent'}`}>{product.price}</span>
      </div>
      <p className="text-white/40 text-sm font-light leading-relaxed">{product.description}</p>
    </div>
  </m.div>
));

ProductCard.displayName = "ProductCard";

const ServicesSection = () => {
  const { openBooking } = useBooking();
  const { addItem, justAdded } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carousel1 = useCarousel();
  const carousel2 = useCarousel();
  const setFirstCarouselRef = useCallback((node: HTMLDivElement | null) => {
    carousel1.setContainerRef(node);
  }, [carousel1]);
  const handleFirstCarouselScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    carousel1.handleScroll(event);
  }, [carousel1]);
  const setSecondCarouselRef = useCallback((node: HTMLDivElement | null) => {
    carousel2.setContainerRef(node);
  }, [carousel2]);
  const handleSecondCarouselScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    carousel2.handleScroll(event);
  }, [carousel2]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    const priceNum = parseFloat(product.price.replace("€", "").replace(",", "."));
    addItem({
      id: product.id,
      name: product.name,
      price: priceNum,
      image: product.image,
      category: product.category,
    });
  }, [addItem]);

  const handleReserve = useCallback((product: Product) => {
    setIsModalOpen(false);
    openBooking(`Recogida de Producto: ${product.name}`);
  }, [openBooking]);

  return (
    <section id="services" className="py-10 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-end justify-between mb-12">
          <div className="lg:w-1/2">
            <m.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold mb-8 w-fit text-white/40">
              <ShoppingBag size={14} />
              <span className="tracking-widest uppercase">Tienda Baskuñana</span>
            </m.div>
            <m.h2 variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 leading-[0.9] text-white">
              Cuidado <br /> de Autor
            </m.h2>
            <m.p variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-lg text-white/50 max-w-xl font-light leading-relaxed">
              Lleva la experiencia del salón a tu casa con nuestra selección exclusiva de productos premium.
            </m.p>
          </div>

          <div className="flex gap-4 mb-4">
            <CarouselButton direction="left" onClick={() => carousel1.scroll("left")} disabled={!carousel1.canScrollLeft} />
            <CarouselButton direction="right" onClick={() => carousel1.scroll("right")} disabled={!carousel1.canScrollRight} />
          </div>
        </div>

        {/* First Row */}
        <div ref={setFirstCarouselRef} onScroll={handleFirstCarouselScroll} className="flex gap-8 overflow-x-auto scrollbar-hide pb-16 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {PRODUCTS_ROW_1.map((product) => (
            <div key={product.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] shrink-0 snap-start">
              <ProductCard product={product} onClick={() => handleProductClick(product)} onAddToCart={(e) => handleAddToCart(e, product)} isAdded={justAdded === product.id} />
            </div>
          ))}
        </div>

        {/* Second Row Header */}
        <div className="flex items-center justify-between mt-12 mb-8">
           <h3 className="text-2xl font-bold text-white/30 uppercase tracking-[0.3em] text-xs">Colección Complementaria</h3>
           <div className="flex gap-4">
            <CarouselButton direction="left" onClick={() => carousel2.scroll("left")} disabled={!carousel2.canScrollLeft} />
            <CarouselButton direction="right" onClick={() => carousel2.scroll("right")} disabled={!carousel2.canScrollRight} />
          </div>
        </div>

        {/* Second Row */}
        <div ref={setSecondCarouselRef} onScroll={handleSecondCarouselScroll} className="flex gap-8 overflow-x-auto scrollbar-hide pb-12 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {PRODUCTS_ROW_2.map((product) => (
            <div key={product.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] shrink-0 snap-start">
              <ProductCard product={product} onClick={() => handleProductClick(product)} onAddToCart={(e) => handleAddToCart(e, product)} isAdded={justAdded === product.id} />
            </div>
          ))}
        </div>
      </div>


      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReserve={handleReserve} />
    </section>
  );
};

const CarouselButton = ({ direction, onClick, disabled }: { direction: "left" | "right", onClick: () => void, disabled: boolean }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button onClick={onClick} disabled={disabled} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${disabled ? "bg-white/10 text-white/20 cursor-not-allowed opacity-20" : "bg-white text-black hover:scale-110 cursor-pointer"}`}>
      <Icon size={32} strokeWidth={3} />
    </button>
  );
};

export default ServicesSection;
