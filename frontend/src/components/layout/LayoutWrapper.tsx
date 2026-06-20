"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/shared/BookingModal";
import CustomCursor from "@/components/cursor/CustomCursor";
import Image from "next/image";
import { useEffect } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-mode");
    } else {
      document.body.classList.remove("admin-mode");
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <main className="h-full w-full">{children}</main>;
  }

  return (
    <>
      {/* Persistent Background Image (Only for client pages) */}
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

      <CustomCursor />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
