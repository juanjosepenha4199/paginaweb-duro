'use client';

import { useRouter } from 'next/navigation';

export default function FinalizacionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <svg 
              className="w-16 h-16 text-green-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <h1 className="text-3xl font-bold mb-4">¡Compra Finalizada con Éxito!</h1>
            <p className="text-lg text-zinc-300 mb-6">
              Gracias por tu compra. Nos pondremos en contacto contigo pronto para coordinar el envío.
            </p>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
} 