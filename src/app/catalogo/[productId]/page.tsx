'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { mockProducts, Product } from "@/data/products";
import CartFlyBubble from '@/components/CartFlyBubble';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.productId);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);
  const [bubbleAnim, setBubbleAnim] = useState(false);
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      const filteredSizes = foundProduct.sizes.filter(size => ['M', 'L'].includes(size));
      const filteredColors = foundProduct.colors.filter(color => ['Blanco', 'Negro'].includes(color));
      setProduct({
        ...foundProduct,
        sizes: filteredSizes,
        colors: filteredColors
      });
      setSelectedSize(filteredSizes[0] || null);
      setSelectedColor(filteredColors[0] || null);
      setMainImageIdx(0);
    } else {
      setError('Producto no encontrado');
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      setSuccessMessage('¡Producto agregado al carrito!');
      setBubbleAnim(true);
      setTimeout(() => {
        setSuccessMessage(null);
        setBubbleAnim(false);
      }, 3000);
    } else {
      setError('Por favor, selecciona talla y color.');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-white p-4">Cargando...</div>;
  }

  // Determinar imágenes a mostrar
  let images: string[] = [];
  if (product.images && product.images.length > 0) {
    images = product.images;
  } else if (product.image) {
    images = [product.image];
    if (product.hoverImage) images.push(product.hoverImage);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CartFlyBubble isVisible={bubbleAnim} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col items-center">
          {/* Imagen principal */}
          {images.length > 0 && (
            <div className="aspect-[3/4] w-full max-w-[520px] min-h-[693px] rounded-lg mb-4 overflow-hidden relative">
              <Image
                src={images[mainImageIdx]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setMainImageIdx(idx)}
                  className={`border-2 rounded-lg overflow-hidden focus:outline-none ${mainImageIdx === idx ? 'border-red-500' : 'border-transparent'}`}
                  style={{ width: 80, height: 106 }}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    width={80}
                    height={106}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          {product.description && <p className="text-lg text-zinc-300 mb-4">{product.description}</p>}
          <p className="text-2xl font-semibold text-red-500 mb-6">${product.price.toLocaleString()}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Talla:</h3>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    w-16 h-16 flex items-center justify-center rounded-md border-2 text-lg font-bold
                    ${selectedSize === size 
                      ? 'border-red-500 bg-red-600 text-white' 
                      : 'border-zinc-700 bg-zinc-900 text-white hover:border-red-500'}
                    transition-all duration-200
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`
                    w-16 h-16 flex items-center justify-center rounded-md border-2 text-sm font-bold
                    ${selectedColor === color 
                      ? 'border-red-500 bg-red-600 text-white' 
                      : 'border-zinc-700 bg-zinc-900 text-white hover:border-red-500'}
                    transition-all duration-200
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            ref={addToCartBtnRef}
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSize || !selectedColor}
          >
            Agregar al carrito
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
} 