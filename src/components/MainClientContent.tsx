'use client';

import React from "react";
import { mockProducts } from "@/data/products";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

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

      {/* Online Simulator */}
      <section className="w-full bg-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Diseña tu Camiseta</h2>
              <p className="text-zinc-400 mb-8">
                Prueba diferentes diseños, colores y estilos en tiempo real. 
                Nuestro simulador te permite ver exactamente cómo quedará tu camiseta.
              </p>
              <Link 
                href="/disenador" 
                className="inline-block bg-red-600 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-colors"
              >
                Probar Simulador
              </Link>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/simulator-preview.jpg"
                alt="Simulador de Diseño"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-zinc-900 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Cliente {index + 1}</h4>
                  <p className="text-zinc-400 text-sm">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
              <p className="text-zinc-300">
                "Increíble calidad y servicio. Las camisetas son exactamente como las vi en la web."
              </p>
            </div>
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
                  src={`/instagram-${index + 1}.jpg`}
                  alt={`Instagram Post ${index + 1}`}
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

      {/* Blog Preview */}
      <section className="w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Ideas Creativas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/blog-${index + 1}.jpg`}
                  alt={`Blog Post ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold mb-2">Tendencias de Estampado 2024</h3>
                <p className="text-zinc-400 mb-4">
                  Descubre las últimas tendencias en diseño de camisetas...
                </p>
                <Link 
                  href={`/blog/${index + 1}`}
                  className="text-red-500 hover:text-red-400 font-semibold"
                >
                  Leer más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 