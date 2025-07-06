'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const phoneNumber = '573506256597';
const defaultMessage = '¡Hola! Estoy interesad@ en recibir más información sobre sus productos. ¿Podrían ayudarme, por favor?';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const handleSend = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage(defaultMessage);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Abrir chat de WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end px-4 py-8 bg-black bg-opacity-40" onClick={() => setIsOpen(false)}>
          <div
            className="w-80 bg-white rounded-lg shadow-xl p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 text-xl"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-4">
              <FaWhatsapp className="text-green-500 text-2xl" />
              <span className="font-bold text-lg text-zinc-800">Chatea con nosotros</span>
            </div>
            <p className="text-zinc-700 mb-2 text-sm">Escríbenos por WhatsApp y te responderemos lo antes posible.</p>
            <textarea
              className="w-full border border-zinc-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-zinc-800"
              rows={3}
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              Enviar a WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton; 