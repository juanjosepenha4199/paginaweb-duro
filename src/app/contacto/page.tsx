'use client';

import { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_xhsskxq';
const EMAILJS_TEMPLATE_ID = 'template_3qk52vs'; // Template para la empresa
const EMAILJS_PUBLIC_KEY = 'QzP43e3sALNx_gPmz';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Enviar correo a la empresa
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
          sender_info: `${formData.name} (${formData.email})` // Información del remitente formateada
        },
        EMAILJS_PUBLIC_KEY
      );



      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error sending email:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left side - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/contact-image.jpg"
              alt="DURO Contact"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-6">Contacta con DURO</h1>
            <p className="text-lg text-zinc-300 mb-4">
              En DURO, nos apasiona crear camisetas que reflejen tu estilo único y tu personalidad. 
              Estamos aquí para escucharte y ayudarte con cualquier duda o sugerencia que tengas.
            </p>
            <p className="text-lg text-zinc-300">
              Nuestro equipo está comprometido con brindarte la mejor experiencia posible. 
              Ya sea que necesites ayuda con tu pedido, tengas una pregunta sobre nuestros productos 
              o quieras compartir tus ideas, estamos aquí para ti.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">¿Tienes algo que decirnos?</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {status === 'success' && (
              <p className="text-green-500 text-center">
                ¡Gracias por tu mensaje! Te responderemos pronto.
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-500 text-center">
                Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 