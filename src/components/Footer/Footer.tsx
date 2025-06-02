import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-red-500">Inicio</Link>
          <Link href="/catalogo" className="hover:text-red-500">Catálogo</Link>
          <Link href="/contacto" className="hover:text-red-500">Contacto</Link>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Social Media Placeholders */}
          <a href="#" className="hover:text-red-500">Facebook</a>
          <a href="#" className="hover:text-red-500">Instagram</a>
        </div>
        <div className="mt-8 text-zinc-400">
          <h3 className="text-lg font-semibold mb-2">Sobre DURO</h3>
          <p>DURO es una tienda de camisetas urbanas con diseños únicos y de alta calidad. Nuestra misión es ofrecer ropa con flow que te haga destacar.</p>
        </div>
        <p className="mt-4">&copy; 2025 DURO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
} 