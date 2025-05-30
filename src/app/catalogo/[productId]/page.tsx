'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { mockProducts, Product } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.productId);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find product from imported data
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0] || null); // Select first size by default
      setSelectedColor(foundProduct.colors[0] || null); // Select first color by default
    } else {
      setError('Producto no encontrado');
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      alert('Producto agregado al carrito!'); // Or a more sophisticated notification
    } else {
      setError('Por favor, selecciona talla y color.');
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {/* Display product image */}
          {product.image && (
            <Image 
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              objectFit="cover"
              className="rounded-lg"
            />
          )}
        </div>
        <div className="md:w-1/2 flex flex-col justify-center\">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-red-500 mb-6">${product.price.toLocaleString()}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Talla:</h3>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={
                    `px-4 py-2 rounded-md border 
                    ${selectedSize === size 
                      ? 'border-red-500 bg-red-600 text-black' 
                      : 'border-zinc-700 bg-zinc-900 text-white'}
                    hover:border-red-500`
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                   className={
                    `px-4 py-2 rounded-md border 
                    ${selectedColor === color 
                      ? 'border-red-500 bg-red-600 text-black' 
                      : 'border-zinc-700 bg-zinc-900 text-white'}
                    hover:border-red-500`
                  }
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSize || !selectedColor}
          >
            Agregar al carrito
          </button>

           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
} 