'use client';

import Cart from "@/components/Cart";

export default function CarritoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.20))] py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
      <Cart />
    </div>
  );
} 