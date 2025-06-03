'use client';

import dynamic from 'next/dynamic';
import { mockProducts } from "@/data/products";
import React from 'react';
import ThreeColumnLayout from '@/components/ThreeColumnLayout';

const DynamicProductCard = dynamic(() => import('@/components/ProductCard'), {
  ssr: false,
  loading: () => (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center shadow-md">
      <div className="w-40 h-40 bg-zinc-800 rounded mb-4 flex items-center justify-center">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockProducts.map((product) => (
              <DynamicProductCard 
                key={product.id} 
                id={product.id} 
                name={product.name}
                price={product.price}
                image={product.image}
                hoverImage={product.hoverImage}
              />
            ))}
          </div>
        </>
      }
    />
  );
} 