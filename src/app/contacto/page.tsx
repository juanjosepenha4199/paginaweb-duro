'use client';

import React, { useState } from 'react';
import ThreeColumnLayout from '@/components/ThreeColumnLayout';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_xhsskxq';
const EMAILJS_TEMPLATE_ID = 'template_3qk52vs';
const EMAILJS_PUBLIC_KEY = 'QzP43e3sALNx_gPmz';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <ThreeColumnLayout
      articleContent={
        <div className="min-h-screen-minus-header-footer">
          <div className="max-w-4xl mx-auto">
            {/* Sección Principal con Imagen y Texto */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              {/* Imagen */}
              <div className="md:w-1/2">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/contactanos.png"
                    alt="DURO Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-6 text-white">Contacto</h1>
                <p className="text-lg text-zinc-300 mb-4">
                  Somos una empresa especializada en camisetas estampadas de alta calidad, 
                  comprometidos con el diseño único y la satisfacción de nuestros clientes.
                </p>
                <p className="text-lg text-zinc-300">
                  Si tienes alguna inquietud sobre nuestros productos, pedidos personalizados 
                  o cualquier otra consulta, no dudes en contactarnos.
                </p>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="bg-zinc-900 p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-zinc-400 mb-2">Nombre</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 text-base px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-zinc-400 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 text-base px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-base font-medium text-zinc-400 mb-2">Mensaje</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4} 
                    className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 text-base px-4 py-3"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                {status === 'success' && (
                  <p className="text-green-500 text-center mt-4">
                    ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-500 text-center mt-4">
                    Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                  </p>
                )}
              </form>
            </div>

            {/* Información de Contacto (más pequeña) */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+573506256597" className="text-lg text-white hover:text-red-500 transition-colors">
                  +57 350 625 6597
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
} 