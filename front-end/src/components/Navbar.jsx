'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const categories = [
    {
      label: 'Computadores',
      id: 'computadores',
      items: ['Computador Gamer Capibara', 'Computador Estudante Capibara', 'Computador Workstation Capibara'],
    },
    {
      label: 'Notebooks',
      id: 'notebooks',
      items: ['Notebook Gamer Capibara', 'Notebook Estudante Capibara', 'Notebook Workstation Capibara'],
    },
    {
      label: 'Periféricos',
      id: 'perifericos',
      items: [
        'Teclado', 'Mouse', 'Mousepad', 'Headset', 'Volantes',
        'Fone bluetooth', 'Microfone', 'Gabinetes', 'Pen Drive', 'Óculos'
      ],
    },
    {
      label: 'Acessórios',
      id: 'acessorios',
      items: ['Pulseira Smartwatch', 'Capa Celular', 'Capa Tablet', 'Carregador'],
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
            <svg width="50" height="50" viewBox="0 0 32 32" fill="none">
              <ellipse cx="16" cy="20" rx="12" ry="8" fill="#A0522D" />
              <ellipse cx="16" cy="12" rx="8" ry="6" fill="#A0522D" />
              <ellipse cx="13" cy="11" rx="1" ry="1.5" fill="#000" />
              <ellipse cx="19" cy="11" rx="1" ry="1.5" fill="#000" />
              <ellipse cx="16" cy="15" rx="2" ry="1" fill="#fff" />
              <ellipse cx="9" cy="10" rx="1" ry="2" fill="#A0522D" />
              <ellipse cx="23" cy="10" rx="1" ry="2" fill="#A0522D" />
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

            {/* Dropdown */}
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
        <Link href="/carrinho" className="hover:underline flex items-center" title="Carrinho">
          <svg width="60" height="60" viewBox="0 0 38 38" fill="none">
            <rect x="6" y="14" width="26" height="12" rx="3" fill="#444" stroke="#222" strokeWidth="2" />
            <circle cx="12" cy="28" r="3" fill="#888" stroke="#222" strokeWidth="1" />
            <circle cx="26" cy="28" r="3" fill="#888" stroke="#222" strokeWidth="1" />
            <ellipse cx="19" cy="20" rx="7" ry="4" fill="#A0522D" />
            <ellipse cx="16.5" cy="19" rx="1" ry="1.5" fill="#000" />
            <ellipse cx="21.5" cy="19" rx="1" ry="1.5" fill="#000" />
            <ellipse cx="19" cy="22" rx="2" ry="1" fill="#fff" />
            <ellipse cx="15" cy="17" rx="0.7" ry="1" fill="#A0522D" />
            <ellipse cx="23" cy="17" rx="0.7" ry="1" fill="#A0522D" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}