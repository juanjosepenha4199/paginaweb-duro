"use client";

import { useState } from "react";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductoDetalle(props: Props) {
  const { id: productId } = props.params;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Placeholder product data (in a real app, fetch based on productId)
  const product = {
    id: productId,
    name: "Camiseta Urban " + productId,
    price: 29990,
    description: "Camiseta urbana de alta calidad, perfecta para el día a día.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Rojo"]
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-red-500 font-bold mb-4">${product.price}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Talla</h2>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded ${selectedSize === size ? "bg-yellow-400 text-black" : "border-zinc-600"}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Color</h2>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`px-4 py-2 border rounded ${selectedColor === color ? "bg-yellow-400 text-black" : "border-zinc-600"}`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-red-600 transition-colors">
        Agregar al carrito
      </button>
    </div>
  );
} 