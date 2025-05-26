'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isCartOpen, toggleCart, closeCart } = useCart();
  const [openDropdown, setOpenDropdown] = useState(null);
  const cartRef = useRef();

  const handleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  // Fechar o carrinho clicando fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  const categories = [
    {
      label: 'Computadores',
      id: 'computadores',
      items: ['Computador Gamer', 'Workstation'],
    },
    {
      label: 'Notebooks',
      id: 'notebooks',
      items: ['Notebook Gamer', 'Notebook Estudante'],
    },
    {
      label: 'Periféricos',
      id: 'perifericos',
      items: ['Teclado', 'Mouse', 'Headset'],
    },
    {
      label: 'Acessórios',
      id: 'acessorios',
      items: ['Capa', 'Carregador'],
    },
    {
      label: 'Vestuário',
      id: 'vestuario',
      items: ['Moletom'],
    },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black text-white px-8 py-4 flex justify-center items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center mr-12">
        <Link href="/">
          <span title="Home">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="40" rx="20" ry="12" fill="#A0522D" />
              <ellipse cx="32" cy="24" rx="14" ry="10" fill="#A0522D" />
              <circle cx="27" cy="22" r="1.5" fill="black" />
              <circle cx="37" cy="22" r="1.5" fill="black" />
              <ellipse cx="32" cy="28" rx="3" ry="1.5" fill="white" />
              <ellipse cx="22" cy="18" rx="1.5" ry="3" fill="#A0522D" />
              <ellipse cx="42" cy="18" rx="1.5" ry="3" fill="#A0522D" />
            </svg>

          </span>
        </Link>
      </div>

      {/* Links e Dropdowns */}
      <div className="flex items-center space-x-10 font-serif text-sm">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => handleDropdown(category.id)}
            onMouseLeave={() => handleDropdown(null)}
          >
            <button className="hover:underline">{category.label}</button>

            <div
              className={`absolute top-10 left-0 bg-white text-black shadow-lg rounded w-64 transition-all duration-200 ease-in-out ${openDropdown === category.id
                ? 'opacity-100 scale-100 visible'
                : 'opacity-0 scale-95 invisible'
                }`}
            >
              <div className="p-4">
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link href="#">
                        <span className="hover:text-blue-600">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Carrinho */}
        <div className="relative">
          <button
            onClick={toggleCart}
            className="hover:underline flex items-center"
            title="Carrinho"
          >
            <svg width="50" height="50" viewBox="0 0 64 64" fill="none">
              {/* Carrinho */}
              <rect x="10" y="30" width="44" height="16" rx="3" fill="#444" stroke="#222" strokeWidth="2" />
              <circle cx="18" cy="50" r="4" fill="#888" stroke="#222" strokeWidth="1" />
              <circle cx="46" cy="50" r="4" fill="#888" stroke="#222" strokeWidth="1" />

              {/* Capivara dentro do carrinho */}
              <ellipse cx="32" cy="30" rx="12" ry="8" fill="#A0522D" />
              <ellipse cx="32" cy="20" rx="8" ry="6" fill="#A0522D" />
              <circle cx="29" cy="18" r="1.5" fill="black" />
              <circle cx="35" cy="18" r="1.5" fill="black" />
              <ellipse cx="32" cy="24" rx="3" ry="1.5" fill="white" />
              <ellipse cx="26" cy="16" rx="1.2" ry="2" fill="#A0522D" />
              <ellipse cx="38" cy="16" rx="1.2" ry="2" fill="#A0522D" />
            </svg>
          </button>

          {/* Slide do carrinho */}
          <div
            ref={cartRef}
            className={`fixed top-0 right-0 h-full bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
              } w-80`}
          >
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>
              <div className="space-y-3 flex-1 overflow-y-auto">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Capibara Gamer</span>
                  <span className="text-lg font-bold">R$ 4.500,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Capibara Estudante</span>
                  <span className="text-lg font-bold">R$ 2.500,00</span>
                </div>
                <p className="text-sm text-gray-600">Seu carrinho está vazio.</p>
              </div>

              <button
                onClick={closeCart}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
