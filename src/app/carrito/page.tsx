'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
            <svg 
              className="w-16 h-16 text-zinc-600 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-lg text-zinc-300 mb-8">
              Explora nuestro catálogo y encuentra los productos que te gusten.
            </p>
            <button 
              onClick={() => router.push('/catalogo')}
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
            >
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Productos */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-6 py-6 border-b border-zinc-700 last:border-b-0">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      fill
                      sizes="(max-width: 96px) 100vw, 96px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-zinc-400 mb-2">Talla: {item.size}</p>
                    <p className="text-zinc-400 mb-2">Color: {item.color}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-zinc-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="px-3 py-1 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-sm text-zinc-400">{formatCurrency(item.price)} c/u</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Envío</span>
                  <span>Calculado al finalizar</span>
                </div>
                <div className="border-t border-zinc-700 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors mt-6"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 