import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/banner.png"
          alt="DURO Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">Camisetas con flow y diseño único</h1>
        <p className="text-xl md:text-2xl mb-8 text-zinc-200">Camisetas no aptas para gente suave.</p>
        <Link 
          href="/catalogo" 
          className="inline-block bg-red-600 hover:bg-yellow-400 text-black font-bold py-4 px-12 rounded-full text-xl transition-colors transform hover:scale-105"
        >
          Echa un vistazo a nuestro catalogo
        </Link>
      </div>
    </section>
  );
} 