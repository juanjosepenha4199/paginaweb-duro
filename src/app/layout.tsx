import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
// Removed unused imports for Link and Image as they are now in Header/Footer components
// import Link from "next/link";
// import Image from "next/image";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-sans antialiased bg-black text-white flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="w-full mx-auto px-4 py-8 pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
