import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/cursor/CustomCursor";
import { BookingProvider } from "@/context/BookingContext";
import { CartProvider } from "@/context/CartContext";
import BookingModal from "@/components/shared/BookingModal";
import CartDrawer from "@/components/shared/CartDrawer";
import MotionProvider from "@/components/providers/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baskuñana Peluqueros | Estilo & Vanguardia en Cartagena",
  description: "Descubre la experiencia Baskuñana: expertos en coloración, cortes de autor y tratamientos premium en Cartagena.",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-brand-black text-white relative">
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="/assets/hero-bg.png"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover blur-md opacity-70 scale-105"
          />
        </div>

        <MotionProvider>
          <CartProvider>
            <BookingProvider>
              <CustomCursor />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <BookingModal />
              <CartDrawer />
            </BookingProvider>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
