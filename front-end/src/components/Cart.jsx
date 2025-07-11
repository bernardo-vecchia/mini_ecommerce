'use client';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

export default function Cart() {
  const { isOpen, closeCart } = useCart();

  // Fecha ao clicar fora
  useEffect(() => {
    const handleOutside = (e) => {
      const cart = document.getElementById('cart-panel');
      if (cart && !cart.contains(e.target)) {
        closeCart();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, closeCart]);
}
