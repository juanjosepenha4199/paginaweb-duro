import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/">Inicio</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Social Media Placeholders */}
          <a href="#">Instagram</a>
        </div>
        <p className="mt-4">&copy; 2025 DURO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
} 