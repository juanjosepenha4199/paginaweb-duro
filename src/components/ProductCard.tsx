'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { memo } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  hoverImage?: string;
}

const ProductCard = memo(function ProductCard({ id, name, price, image, hoverImage }: ProductCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center shadow-md">
      <div className="flex flex-col items-center w-full">
        <div className="w-40 h-40 bg-zinc-800 rounded mb-4 flex items-center justify-center overflow-hidden relative group">
          {image && (
            <NextImage 
              src={image}
              alt={name}
              width={160}
              height={160}
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
              loading="lazy"
            />
          )}
          {hoverImage && (
            <NextImage 
              src={hoverImage}
              alt={`${name} hover`}
              width={160}
              height={160}
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              loading="lazy"
            />
          )}
          {!image && !hoverImage && (
            <span className="text-zinc-500">Imagen</span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-center">{name}</h3>
        <span className="text-red-500 font-bold mb-4">${price.toLocaleString()}</span>
        
        <Link 
          href={`/catalogo/${id}`}
          className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-full text-center hover:bg-red-700 transition-colors"
        >
          Ver mejor el producto 🤝
        </Link>
      </div>
    </div>
  );
});

export default ProductCard; 