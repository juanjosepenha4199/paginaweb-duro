'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_xhsskxq';
const EMAILJS_TEMPLATE_ID = 'template_53xkcde';
const EMAILJS_PUBLIC_KEY = 'QzP43e3sALNx_gPmz';

// Tipos
interface CartItem {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Efecto para manejar la redirección después del éxito
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000); // Restablecer el tiempo de espera a 3 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [status, router]); // Dependencias: status y router

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Preparar los detalles del pedido como un array de strings usando items del contexto
      const orderDetailsArray = items.map((item: CartItem) => 
        `${item.name} - Talla: ${item.size} - Color: ${item.color} - Cantidad: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
      );

      // === Líneas de depuración temporales ===
      // console.log('Datos del formulario:', formData);
      // console.log('Items del carrito (desde contexto):', items);
      // console.log('Array orderDetails para EmailJS:', orderDetailsArray);
      // console.log('Total del pedido:', total);
      // console.log('Variables a enviar a EmailJS:', {
      //   from_name: formData.name,
      //   from_email: formData.email,
      //   subject: `Nuevo pedido de ${formData.name}`,
      //   reply_to: formData.email,
      //   sender_info: `${formData.name} (${formData.email})`,
      //   order_details: orderDetailsArray,
      //   total_amount: formatCurrency(total),
      //   shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
      //   phone_number: formData.phone
      // });
      // =====================================

      // Enviar correo a la empresa
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: `Nuevo pedido de ${formData.name}`,
          reply_to: formData.email,
          sender_info: `${formData.name} (${formData.email})`,
          order_details: orderDetailsArray, // Enviamos el array
          total_amount: formatCurrency(total), // Usamos el total del contexto
          shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
          phone_number: formData.phone
        },
        EMAILJS_PUBLIC_KEY
      );

      // Limpiar el carrito usando la función del contexto
      clearCart();
      
      setStatus('success');
      // La redirección ahora se maneja en el useEffect
    } catch (err) {
      console.error('Error sending email:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Finalizar Compra</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna Izquierda: Resumen del Pedido */}
          <div className="order-2 md:order-1">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
              <div className="space-y-4">
                {items.map((item: CartItem, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
                    <div className="flex items-center gap-4">
                      {/* Placeholder for product image if available */}
                      {/* <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded"/> */}
                      <div>
                        <p className="font-medium text-lg">{item.name}</p>
                        <p className="text-sm text-zinc-400">Talla: {item.size}, Color: {item.color}</p>
                        <p className="text-sm text-zinc-400">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-zinc-700">
                <p className="text-2xl font-bold">Total</p>
                <p className="text-2xl font-bold text-red-500">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Información */}
          <div className="order-1 md:order-2">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-6">Información de Envío</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-300">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-zinc-300">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2 text-zinc-300">Dirección</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2 text-zinc-300">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium mb-2 text-zinc-300">Código Postal</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 mt-6"
                >
                  {status === 'loading' ? 'Procesando...' : 'Confirmar Pedido'}
                </button>

                {status === 'success' && (
                  <p className="text-green-500 text-center mt-4">
                    Gracias por tu confianza, en un momento te contactaremos para continuar con el pedido.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-500 text-center mt-4">
                    Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 