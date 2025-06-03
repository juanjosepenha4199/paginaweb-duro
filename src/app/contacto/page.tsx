'use client';

import React from 'react';
import ThreeColumnLayout from '@/components/ThreeColumnLayout';

export default function ContactoPage() {
  return (
    <ThreeColumnLayout
      articleContent={
        <div className="min-h-screen-minus-header-footer">
          <h1 className="text-3xl font-bold mb-8 text-white text-center">Contacto</h1>
          
          <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-lg shadow-lg text-white">
            <p className="text-zinc-400 mb-6 text-center">
              ¿Tienes alguna pregunta o comentario? ¡Envíanos un mensaje!
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center text-zinc-400 text-sm">
            <p>También puedes contactarnos por:</p>
            <p className="mt-2">Email: <a href="mailto:info@duro.com" className="text-red-500 hover:underline">info@duro.com</a></p>
            <p>Teléfono: <a href="tel:+1234567890" className="text-red-500 hover:underline">+123 456 7890</a></p>
          </div>
        </div>
      }
    />
  );
} 