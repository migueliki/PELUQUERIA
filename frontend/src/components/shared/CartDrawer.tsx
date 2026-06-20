"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2, CreditCard } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { fetchApi } from "@/services/api";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount, isCartOpen, closeCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useScrollLock(isCartOpen);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const checkoutItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image.startsWith("http")
          ? item.image
          : `${window.location.origin}${item.image}`,
      }));

      const response = await fetchApi<{ url: string }>("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ items: checkoutItems }),
      });

      if (response.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.url;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al procesar el pago. Inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[401] bg-brand-dark/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col will-change-transform"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Tu Carrito</h2>
                  <p className="text-white/40 text-xs font-medium">
                    {itemCount} {itemCount === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 mb-6">
                      <ShoppingBag size={48} className="text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white/40 mb-2">Carrito Vacío</h3>
                    <p className="text-white/20 text-sm max-w-[250px]">
                      Explora nuestra tienda y añade productos premium para tu cabello.
                    </p>
                  </m.div>
                ) : (
                  items.map((item) => (
                    <m.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="group bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/[0.07] transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-brand-gray/30">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-bold text-white truncate pr-2">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-white/20 hover:text-red-400 transition-colors p-1 -m-1 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
                            {item.category}
                          </span>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-white font-black text-sm">
                              {(item.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer — Total & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="text-white/30 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Vaciar carrito
                </button>

                {/* Total */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Total</p>
                    <p className="text-3xl font-black text-white tracking-tight">
                      {total.toFixed(2)}€
                    </p>
                  </div>
                  <p className="text-white/20 text-[10px] uppercase tracking-widest">
                    IVA incluido
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <m.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                  >
                    {error}
                  </m.p>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 shadow-2xl group bg-white text-black hover:bg-brand-accent shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Proceder al Pago
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-white/20 text-[10px] uppercase tracking-[0.15em]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>Pago seguro con Stripe</span>
                </div>
              </div>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
