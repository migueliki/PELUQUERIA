"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, Send as SendIcon } from "lucide-react";

// Custom Social Icons to avoid import issues
export const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface ShareMenuProps {
  className?: string;
  align?: "left" | "right";
  iconSize?: number;
}

const ShareMenu = ({ className = "", align = "left", iconSize = 24 }: ShareMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-3 transition-colors ${isOpen ? 'text-brand-accent' : 'text-white/40 hover:text-white'}`}
      >
        <Share2 size={iconSize} />
        <span className="text-sm font-bold uppercase tracking-widest hidden md:inline">Compartir</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute bottom-full mb-4 ${align === "left" ? "left-0" : "right-0"} bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-[60] min-w-[240px]`}
          >
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: SendIcon, color: 'hover:bg-green-500', label: 'WhatsApp' },
                { icon: InstagramIcon, color: 'hover:bg-pink-500', label: 'Instagram' },
                { icon: TwitterIcon, color: 'hover:bg-blue-400', label: 'Twitter' },
                { icon: FacebookIcon, color: 'hover:bg-blue-600', label: 'Facebook' },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={(e) => e.stopPropagation()}
                  className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white transition-all ${item.color}`}
                  title={item.label}
                >
                  <item.icon size={20} />
                </button>
              ))}
            </div>
            <button 
              onClick={handleCopyLink}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-3 px-4 flex items-center justify-between text-xs font-bold text-white transition-all"
            >
              <span className="flex items-center gap-2">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? '¡Copiado!' : 'Copiar enlace'}
              </span>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;
