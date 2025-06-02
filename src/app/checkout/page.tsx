'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Reemplaza con tu Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Reemplaza con tu Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Reemplaza con tu Public Key

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    detallesAdicionales: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar el contenido del correo
      const emailContent = {
        to_email: formData.email,
        to_name: formData.nombre,
        order_details: items.map(item => 
          `${item.name} (${item.size}, ${item.color}) x ${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`
        ).join('\n'),
        total_amount: total.toLocaleString(),
        shipping_address: `${formData.direccion}, ${formData.ciudad}, ${formData.codigoPostal}`,
        phone: formData.telefono,
        additional_notes: formData.detallesAdicionales || 'Ninguno'
      };

      // Enviar el correo usando EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailContent,
        EMAILJS_PUBLIC_KEY
      );

      alert('¡Gracias por tu compra! Te hemos enviado un correo con los detalles de tu pedido.');
      router.push('/');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.20))] py-8">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <button 
          onClick={() => router.push('/catalogo')}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
        >
          Ver catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.20))] py-8">
      <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Detalles del Pedido</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumen del Carrito</h2>
          {items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between py-2 border-b border-zinc-700">
              <span>{item.name} ({item.size}, {item.color}) x {item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-2">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block mb-2">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="direccion" className="block mb-2">Dirección de entrega *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              required
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ciudad" className="block mb-2">Ciudad *</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                required
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="codigoPostal" className="block mb-2">Código Postal *</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                required
                value={formData.codigoPostal}
                onChange={handleChange}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="detallesAdicionales" className="block mb-2">Detalles adicionales</label>
            <textarea
              id="detallesAdicionales"
              name="detallesAdicionales"
              value={formData.detallesAdicionales}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-red-500 focus:outline-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </form>
      </div>
    </div>
  );
} 