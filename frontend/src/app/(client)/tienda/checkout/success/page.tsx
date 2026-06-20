"use client";

import React, { useEffect, useState, Suspense } from "react";
import { m } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchApi } from "@/services/api";
import { useCart } from "@/context/CartContext";

interface OrderData {
  id: number;
  status: string;
  total: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  customer_name: string | null;
  customer_email: string | null;
  created_at: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetchApi<OrderData>(`/api/order?session_id=${sessionId}`)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-40">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="relative mx-auto w-28 h-28 mb-8"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          {/* Confetti-like sparkles */}
          {[...Array(6)].map((_, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 15)],
                y: [0, -(20 + i * 10)],
              }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2"
            >
              <Sparkles size={12} className="text-green-400" />
            </m.div>
          ))}
        </m.div>

        {/* Title */}
        <m.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4"
        >
          ¡Pago Completado!
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-lg font-light mb-10 max-w-sm mx-auto"
        >
          Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación con los detalles.
        </m.p>

        {/* Order Details */}
        {loading ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-white/10 rounded w-1/2 mx-auto" />
            </div>
          </m.div>
        ) : order ? (
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 text-left"
          >
            <div className="flex items-center gap-3 mb-6 text-white/40">
              <Package size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">Resumen del Pedido #{order.id}</span>
            </div>

            <div className="space-y-3 mb-6">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <span className="text-white text-sm font-medium">{item.name}</span>
                    <span className="text-white/30 text-xs ml-2">x{item.quantity}</span>
                  </div>
                  <span className="text-white/60 text-sm font-bold">
                    {(item.price * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Total</span>
              <span className="text-white text-xl font-black">{parseFloat(order.total).toFixed(2)}€</span>
            </div>
          </m.div>
        ) : null}

        {/* Actions */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/tienda"
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 flex items-center justify-center gap-2 group"
          >
            Seguir Comprando
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/"
            className="bg-white/5 border border-white/10 text-white/60 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
          >
            Volver al Inicio
          </Link>
        </m.div>
      </m.div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-white/40 text-lg">Cargando...</div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
