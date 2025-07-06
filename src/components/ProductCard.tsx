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
  images?: string[];
}

const ProductCard = memo(function ProductCard({ id, name, price, image, hoverImage, images }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full">
        <Link href={`/catalogo/${id}`} className="w-full">
          <div className="aspect-[3/4] w-full max-w-[520px] rounded mb-4 flex items-center justify-center overflow-hidden relative group bg-transparent cursor-pointer">
            {images && images.length > 0 ? (
              <NextImage 
                src={images[0]}
                alt={name}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                loading="lazy"
              />
            ) : image && (
              <NextImage 
                src={image}
                alt={name}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                loading="lazy"
              />
            )}
            {hoverImage && !images && (
              <NextImage 
                src={hoverImage}
                alt={`${name} hover`}
                fill
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
              />
            )}
            {!image && (!images || images.length === 0) && !hoverImage && (
              <span className="text-zinc-500">Imagen</span>
            )}
          </div>
        </Link>
        <h3 className="font-semibold text-lg mb-2 text-center text-white">{name}</h3>
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