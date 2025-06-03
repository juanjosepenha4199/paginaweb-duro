'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicCart = dynamic(() => import('@/components/Cart'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-xl bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl shadow-soft text-white flex items-center justify-center min-h-[300px]">
      Cargando Carrito...
    </div>
  ),
});

export default function CarritoPage() {
  return (
    <div className="container-custom py-12 min-h-screen-minus-header-footer flex justify-center">
      <DynamicCart />
    </div>
  );
} 