import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            {/* Using the actual logo file */}
            <Image src="/slogan.png" alt="DURO Logo" width={40} height={40} />
            <span className="text-2xl font-extrabold tracking-widest">DURO</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/catalogo" className="hover:text-red-500">Catálogo</Link></li>
            <li><Link href="/sobre-duro" className="hover:text-red-500">Sobre DURO</Link></li>
            <li><Link href="/contacto" className="hover:text-red-500">Contacto</Link></li>
            <li><Link href="/carrito" className="hover:text-red-500">Carrito</Link></li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
      </div>
    </header>
  );
} 