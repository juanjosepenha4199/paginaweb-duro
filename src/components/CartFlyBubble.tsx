import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface CartFlyBubbleProps {
  isVisible: boolean;
}

const CartFlyBubble: React.FC<CartFlyBubbleProps> = ({ isVisible }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && bubbleRef.current) {
      const cartBtn = document.getElementById('cart-header-btn');
      if (cartBtn) {
        const cartRect = cartBtn.getBoundingClientRect();
        const bubbleRect = bubbleRef.current.getBoundingClientRect();
        
        // Use CSS transform for better performance
        bubbleRef.current.style.transform = `translate(${cartRect.left - bubbleRect.left}px, ${cartRect.top - bubbleRect.top}px)`;
        
        // Hide after animation
        const timeoutId = setTimeout(() => {
          if (bubbleRef.current) {
            bubbleRef.current.style.display = 'none';
          }
        }, 3000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={bubbleRef} 
      className="fixed z-50 pointer-events-none transition-transform duration-3000 ease-in-out"
      style={{ transform: 'translate(0, 0)' }}
    >
      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
        <Image 
          src="/slogan.png" 
          alt="Bubble" 
          width={24} 
          height={24}
          priority={true}
        />
      </div>
    </div>
  );
};

export default React.memo(CartFlyBubble); 