'use client';

import React from "react";
import { mockProducts } from "@/data/products";
import dynamic from 'next/dynamic';
import Link from 'next/link';

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

export default function MainClientContent() {
  // Filter products for the homepage featured section
  const featuredProductIds = [1, 4, 5];
  const featuredProducts = mockProducts.filter(product => featuredProductIds.includes(product.id));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans">

      {/* Scrolling Text Section */}
      <div className="w-full overflow-hidden bg-red-600 py-2 mb-8">
        <div className="animate-scroll flex whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="inline-block mx-4 text-lg font-bold">
                ¡No se pierda esta increíble ropa!
              </span>
              <span className="inline-block mx-4 text-lg font-bold">
                ¡Esto sí es ropa de calidad!
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Banner with CTA */}
      <section className="w-full max-w-4xl flex flex-col items-center justify-center text-center py-12 px-4 bg-gradient-to-br from-black via-zinc-900 to-red-700 rounded-xl shadow-lg mb-12">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">Camisetas con flow y diseño único</h1>
        <p className="text-lg sm:text-xl mb-8 text-zinc-200">Camisetas no aptas para gente suave.</p>
        <Link href="/catalogo" className="inline-block bg-red-600 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-colors">Ver catálogo</Link>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-5xl px-4 mb-16" id="destacados">
        <h2 className="text-2xl font-bold mb-6 text-white">Las camisetas mas chimbas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <DynamicProductCard 
              key={product.id} 
              id={product.id} 
              name={product.id === 1 ? "Camiseta tu papá" : product.name} // Change name for ID 1
              price={product.price}
              image={product.image}
              hoverImage={product.hoverImage}
            />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full max-w-4xl px-4 mb-20">
        <h2 className="text-xl font-bold mb-4 text-white">¿Por qué comprar en DURO?</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div className="flex-1 bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🚚</span>
            <span className="font-semibold">Envío gratis</span>
            <span className="text-zinc-400 text-sm mt-1">En compras sobre $100.000</span>
          </div>
          <div className="flex-1 bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🔄</span>
            <span className="font-semibold">Cambios fáciles</span>
            <span className="text-zinc-400 text-sm mt-1">30 días para cambiar tu talla</span>
          </div>
          <div className="flex-1 bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💳</span>
            <span className="font-semibold">Pago seguro</span>
            <span className="text-zinc-400 text-sm mt-1">Tus datos siempre protegidos</span>
          </div>
        </div>
      </section>
    </div>
  );
} 