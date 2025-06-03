'use client';

import { useState } from 'react';
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/products";
import SearchBar from '@/components/SearchBar';

export default function Catalogo() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Obtener colores y tallas únicas
  const uniqueColors = Array.from(new Set(mockProducts.flatMap(p => p.colors)));
  const uniqueSizes = Array.from(new Set(mockProducts.flatMap(p => p.sizes)));

  // Filtrar productos
  const filteredProducts = mockProducts.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesColors = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
    const matchesSizes = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
    
    return matchesPrice && matchesColors && matchesSizes;
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Productos</h1>
      
      {/* Filtros */}
      <div className="max-w-6xl mx-auto mb-8 space-y-6">
        {/* Barra de búsqueda mejorada */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>

        {/* Filtros de precio */}
        <div className="flex items-center gap-4 justify-center">
          <span>Precio:</span>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-48"
          />
          <span>${priceRange[1].toLocaleString()}</span>
        </div>

        {/* Filtros de color */}
        <div className="flex flex-wrap gap-2 justify-center">
          {uniqueColors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColors(prev => 
                prev.includes(color) 
                  ? prev.filter(c => c !== color)
                  : [...prev, color]
              )}
              className={`px-3 py-1 rounded-full border-2 transition-colors ${
                selectedColors.includes(color)
                  ? 'border-red-500 bg-red-600 text-white'
                  : 'border-zinc-700 hover:border-red-500'
              }`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Filtros de talla */}
        <div className="flex flex-wrap gap-2 justify-center">
          {uniqueSizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSizes(prev => 
                prev.includes(size)
                  ? prev.filter(s => s !== size)
                  : [...prev, size]
              )}
              className={`px-3 py-1 rounded-full border-2 transition-colors ${
                selectedSizes.includes(size)
                  ? 'border-red-500 bg-red-600 text-white'
                  : 'border-zinc-700 hover:border-red-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} 
            name={product.name} 
            price={product.price}
            image={product.image}
            hoverImage={product.hoverImage}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-zinc-500 mt-8">No se encontraron productos que coincidan con tu búsqueda.</p>
      )}
    </div>
  );
} 