'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from '@/context/CartContext';
import { useMemo } from 'react';

export default function Header() {
  const { items } = useCart();
  
  const totalItems = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image 
              src="/slogan.png" 
              alt="DURO Logo" 
              width={40} 
              height={40}
              priority={true}
            />
            <span>DURO</span>
          </div>
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/catalogo">Catálogo</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li>
              <Link href="/carrito" id="cart-header-btn" className="relative">
                Carrito
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 