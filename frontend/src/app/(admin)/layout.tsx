import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../admin.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baskuñana | Panel de Control",
  description: "Administración privada de Baskuñana Peluqueros",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full`}>
      <body className="bg-black text-white min-h-full antialiased">
        <main className="h-full w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
