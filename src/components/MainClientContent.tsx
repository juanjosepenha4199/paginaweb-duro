'use client';

import React from "react";
import { mockProducts } from "@/data/products";
import dynamic from 'next/dynamic';
import Image from 'next/image';

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

export default function MainClientContent() {
  // Filter products for the homepage featured section
  const featuredProductIds = [1, 4, 5, 2, 3, 6];
  const featuredProducts = mockProducts.filter(product => featuredProductIds.includes(product.id));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans">
      {/* Featured Products */}
      <section className="w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Camisetas Destacadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
      </section>

      {/* Social Media Feed */}
      <section className="w-full bg-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Síguenos en Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/legorobin.png"
                  alt="DURO Instagram Post"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="w-full max-w-7xl px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold mb-2">Pago Seguro</h3>
          </div>
          <div>
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold mb-2">Envío Garantizado</h3>
          </div>
          <div>
            <div className="text-4xl mb-4">💯</div>
            <h3 className="font-bold mb-2">Calidad Premium</h3>
          </div>
          <div>
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="font-bold mb-2">Devolución Fácil</h3>
          </div>
        </div>
      </section>
    </div>
  );
} 