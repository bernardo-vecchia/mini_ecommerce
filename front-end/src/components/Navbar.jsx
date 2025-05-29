'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

export default function Navbar() {
  const { isCartOpen, toggleCart, closeCart } = useCart();
  const { isSearchOpen, toggleSearch, closeSearch } = useSearch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const cartRef = useRef(null);
  const searchRef = useRef(null);

  const handleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  // Fechar carrinho clicando fora ou saindo com mouse
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, closeSearch]);

  const categories = [
    { label: 'Computadores', id: 'computadores', items: ['Computador Gamer Capybara', 'Computador Estudante Capybara', 'Computador Workstation Capybara'] },
    { label: 'Notebooks', id: 'notebooks', items: ['Notebook Gamer Capybara', 'Notebook Estudante Capybara'] },
    { label: 'Periféricos', id: 'perifericos', items: ['Teclado', 'Mouse', 'Headset'] },
    { label: 'Cadeiras', id: 'cadeira', items: ['Cadeira Gamer Capybara', 'Cadeira Escritório Capybara'] },
    { label: 'Acessórios', id: 'acessorios', items: ['Capa', 'Carregador'] },
    { label: 'Vestuário', id: 'vestuario', items: ['Moletom'] },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black text-white px-4 py-1 shadow-md">
        <div className="flex items-center justify-between w-full">

          {/* Esquerda: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span title="Home">
                <img src="/banner_home.png" alt="Capibara Logo" className="h-8 w-8" />
              </span>
            </Link>
          </div>

          {/* Centro: Categorias */}
          <div className="flex-grow flex justify-center space-x-8 font-serif text-sm">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleDropdown(category.id)}
                onMouseLeave={() => handleDropdown(null)}
              >
                <button className="hover:underline">{category.label}</button>
                <div
                  className={`absolute top-5 left-0 bg-black text-white shadow-lg rounded w-64 transition-all duration-200 ease-in-out ${openDropdown === category.id
                    ? 'opacity-100 scale-100 visible'
                    : 'opacity-0 scale-95 invisible'
                    }`}
                >
                  <div className="p-2">
                    <ul className="space-y-1">
                      {category.items.map((item) => (
                        <li key={item}>
                          <Link href="#ACRESCENTAR LOGIN AQUI">
                            <span className="hover:text-blue-600">{item}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Direita: Busca e Carrinho */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="hover:underline flex items-center"
              title="Busca"
            >
              <img src="/banner_search.png" alt="Busca" className="h-8 w-8" />
            </button>
            <button
              onClick={toggleCart}
              className="hover:underline flex items-center"
              title="Carrinho"
            >
              <img src="/banner_cart.png" alt="Carrinho" className="h-8 w-8" />
            </button>
          </div>

        </div>
      </nav>


      {/* Modal Busca */}
      {isSearchOpen && (
        <div
          ref={searchRef}
          onMouseLeave={closeSearch}
          className="fixed top-9 left-0 right-0 bg-black shadow-xl rounded-md mx-auto z-50 p-6 max-full"
        >
          <h2 className="text-white text-xl font-bold mb-4">O que a Capybara pode buscar para você?</h2>
          <input
            type="text"
            placeholder="Digite aqui..."
            className="w-full p-2 rounded bg-white text-black mb-4"
          />
          <p className="text-white text-sm p-2">
            Olhe o que ela achou...
          </p>
        </div>
      )}

      {/* Fundo escuro e desfocado */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}

      {/* Modal Carrinho (Largura completa) */}
      {isCartOpen && (
        <div
          ref={cartRef}
          onMouseLeave={closeCart}
          className="fixed top-9 left-0 right-0 bg-black shadow-xl rounded-md mx-auto z-50 p-6 max-full"
        >
          <h2 className="text-white text-xl font-bold mb-4">Sua sacola está vazia.</h2>
          <p className="text-white text-sm mb-6">
            <Link href="/login" className="text-blue-600 underline hover:text-blue-800">
              Inicie sessão
            </Link>{' '}
            para ver se você tem itens salvos.
          </p>
          <div>
            <h3 className="font-semibold mb-3 text-white">Meu perfil</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-center gap-2">
                <img src="/icon_order.png" alt="Pedidos" className="h-7 w-7" />
                <span>Pedidos</span>
              </li>
              <li className="flex items-center gap-2">
                <img src="/icon_fav.png" alt="Itens salvos" className="h-7 w-7" />
                <span>Itens salvos</span>
              </li>
              <li className="flex items-center gap-2">
                <span><img src="/icon_account.png" alt="Conta" className="h-7 w-7" /></span>
                <span>Conta</span>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <img src="/icon_login.png" alt="Login" className="h-7 w-7" />
                </span>
                <span>Entrar</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
