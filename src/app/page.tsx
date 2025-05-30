'use client';

import { Suspense } from 'react';
import { CartProvider } from "@/context/CartContext";
import dynamic from 'next/dynamic';

const MainClientContent = dynamic(() => import('../components/MainClientContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Cargando...
    </div>
  ),
});

export default function Home() {
  return (
    <CartProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Cargando...
        </div>
      }>
        <MainClientContent />
      </Suspense>
    </CartProvider>
  );
}
