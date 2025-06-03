'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter();

  const handleQuantityUpdate = useCallback((id: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateQuantity(id, size, color, newQuantity);
  }, [updateQuantity]);

  const handleRemove = useCallback((id: number, size: string, color: string) => {
    removeFromCart(id, size, color);
  }, [removeFromCart]);

  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  if (items.length === 0) {
    return (
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
        <p className="text-zinc-400">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Tu Carrito</h2>

      {/* Resumen del Pedido en el Carrito */}
      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-700">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-zinc-400">
                  Talla: {item.size} | Color: {item.color}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity - 1)}
                    className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 text-white text-sm"
                  >
                    -
                  </button>
                  <span className="text-zinc-200">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity + 1)}
                    className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 text-white text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id, item.size, item.color)}
                    className="ml-2 text-red-500 hover:text-red-400 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total y Botón de Checkout */}
      <div className="pt-4 border-t border-zinc-700">
        <div className="flex justify-between font-bold mb-6">
          <p className="text-xl">Total del Carrito:</p>
          <p className="text-xl">{formatCurrency(total)}</p>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
} 