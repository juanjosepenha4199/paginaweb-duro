'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {/* Using the actual logo file */}
            <Image src="/slogan.png" alt="DURO Logo" width={40} height={40} />
            <span className="text-2xl font-extrabold tracking-widest">DURO</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/catalogo" className="hover:text-red-500 transition-colors">Catálogo</Link></li>
            <li><Link href="/contacto" className="hover:text-red-500 transition-colors">Contacto</Link></li>
            <li>
              <Link href="/carrito" id="cart-header-btn" className="hover:text-red-500 transition-colors relative">
                Carrito
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
      </div>
    </header>
  );
} 