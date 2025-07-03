'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosRes, categoriasRes] = await Promise.all([
          axios.get('http://localhost:8000/api/products/'),
          axios.get('http://localhost:8000/api/categories/')
        ]);
        
        setProdutos(produtosRes.data.results || produtosRes.data || []);
        setCategorias(categoriasRes.data.results || categoriasRes.data || []);
      } catch (error) {
        setErro('Erro ao carregar produtos');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-xl text-gray-600">A Capybara está carregando os produtos...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-red-600">{erro}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🦫 Produtos da Capybara Store
        </h1>

        {/* Categorias */}
        {categorias.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorias</h2>
            <div className="flex flex-wrap gap-4">
              {categorias.map((categoria) => (
                <span
                  key={categoria.id}
                  className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full border-2 border-amber-200"
                >
                  {categoria.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Produtos */}
        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <Link key={produto.id} href={`/product/${produto.id}`}>
                <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  {produto.image ? (
                    <img
                      src={`http://localhost:8000${produto.image}`}
                      alt={produto.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-6xl">🦫</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                      {produto.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {produto.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        R$ {produto.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Estoque: {produto.stock}
                      </span>
                    </div>
                    {produto.category && (
                      <div className="mt-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {produto.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🦫</div>
            <p className="text-xl text-gray-600">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}