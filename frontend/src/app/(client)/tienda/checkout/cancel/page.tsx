"use client";

import React from "react";
import { m } from "framer-motion";
import { XCircle, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-40">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Cancel Icon */}
        <m.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto w-28 h-28 bg-orange-500/10 border-2 border-orange-500/30 rounded-full flex items-center justify-center mb-8"
        >
          <XCircle size={48} className="text-orange-400" />
        </m.div>

        {/* Title */}
        <m.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4"
        >
          Pago Cancelado
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-lg font-light mb-10 max-w-sm mx-auto"
        >
          No te preocupes, tu carrito sigue intacto. Puedes volver e intentarlo de nuevo cuando quieras.
        </m.p>

        {/* Info Card */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 text-left"
        >
          <h3 className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">¿Necesitas ayuda?</h3>
          <ul className="space-y-3 text-white/50 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
              <span>Si hubo un problema con el pago, contacta con nosotros por teléfono.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
              <span>También puedes reservar para recoger en salón sin pago online.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
              <span>Aceptamos Visa, MasterCard, American Express y Google/Apple Pay.</span>
            </li>
          </ul>
        </m.div>

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
            <RefreshCw size={16} />
            Volver a la Tienda
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+34968154346"
            className="bg-white/5 border border-white/10 text-white/60 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
          >
            Llamar al Salón
          </a>
        </m.div>
      </m.div>
    </main>
  );
}
