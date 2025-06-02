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
        const startX = bubbleRect.left;
        const startY = bubbleRect.top;
        const endX = cartRect.left;
        const endY = cartRect.top;

        bubbleRef.current.style.transition = 'transform 3s ease-in-out';
        bubbleRef.current.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;

        setTimeout(() => {
          if (bubbleRef.current) {
            bubbleRef.current.style.display = 'none';
          }
        }, 3000);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div ref={bubbleRef} className="fixed z-50 pointer-events-none">
      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
        <Image src="/slogan.png" alt="Bubble" width={24} height={24} />
      </div>
    </div>
  );
};

export default CartFlyBubble; 