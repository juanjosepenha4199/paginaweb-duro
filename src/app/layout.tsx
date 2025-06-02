import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
// Removed unused imports for Link and Image as they are now in Header/Footer components
// import Link from "next/link";
// import Image from "next/image";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DURO - Tienda de camisetas urbanas",
  description: "Tienda online de camisetas urbanas con estilo minimalista.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          {/* Contenedor principal - ahora sin opacidad */}
          <div className="relative w-full flex-grow flex justify-center">
            {/* Div para la imagen de fondo con opacidad */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
              style={{ backgroundImage: 'url(/legobatman.png)', opacity: 0.1 }}
            ></div>

            <div className="w-full max-w-screen-xl relative z-10">
              
              <main className="w-full mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
