'use client';

import dynamic from 'next/dynamic';
import { mockProducts } from "@/data/products";
import React from 'react';
import ThreeColumnLayout from '@/components/ThreeColumnLayout';

const DynamicProductCard = dynamic(() => import('@/components/ProductCard'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center">
      <div className="w-64 h-96 bg-zinc-800 rounded mb-4 flex items-center justify-center">
        <span className="text-zinc-500">Cargando Imagen...</span>
      </div>
      <div className="h-6 bg-zinc-800 w-3/4 rounded mb-2"></div>
      <div className="h-4 bg-red-700 w-1/4 rounded"></div>
    </div>
  ),
});

export default function CatalogoPage() {
  return (
    <ThreeColumnLayout
      articleContent={
        <>
          <h1 className="text-3xl font-bold mb-8 text-white text-center">Nuestro Catálogo</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div key={product.id} className="border-2 border-zinc-700 rounded-xl p-4 bg-black max-w-xl w-full mx-auto">
                <DynamicProductCard 
                  id={product.id} 
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  hoverImage={product.hoverImage}
                />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
} 