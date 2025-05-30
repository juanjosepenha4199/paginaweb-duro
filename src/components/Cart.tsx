'use client';

import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="w-full bg-zinc-900 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
        <p className="text-zinc-400">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center justify-between border-b border-zinc-700 pb-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-zinc-400 text-sm">Talla: {item.size}, Color: {item.color}</p>
              <p className="text-red-500">${item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                className="ml-2 text-red-500 hover:text-red-400"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-zinc-700">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-colors">
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
} 