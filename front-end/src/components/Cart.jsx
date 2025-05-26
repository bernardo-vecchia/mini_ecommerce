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

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-[100] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      id="cart-panel"
    >
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-4">Seu Carrinho</h2>
        <div className="flex-1">
          <div className="flex justify-between mb-3">
            <span>Capibara Gamer</span>
            <span>R$ 4.500,00</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Capibara Estudante</span>
            <span>R$ 2.500,00</span>
          </div>
          <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
        </div>
        <div className="mt-auto">
          <button
            onClick={closeCart}
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
