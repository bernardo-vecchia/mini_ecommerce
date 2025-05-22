'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(res => setProdutos(res.data))
      .catch(() => setErro('Erro ao carregar produtos.'));
  }, []);

  const handleDetalhes = (id) => {
    router.push(`/produto/${id}`);
  };

  const handleAdicionarCarrinho = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Faça login para adicionar ao carrinho.');
      router.push('/login');
      return;
    }
    try {
      await axios.post(
        `http://localhost:8000/api/cart/add_product/`,
        { product_id: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Produto adicionado ao carrinho!');
    } catch {
      alert('Erro ao adicionar ao carrinho.');
    }
  };

  const handleComprarAgora = (id) => {
    handleAdicionarCarrinho(id);
    router.push('/checkout');
  };

  return (
    <div>
      <h1>Notebooks à venda</h1>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      <ul>
        {produtos.map(produto => (
          <li key={produto.id} style={{ marginBottom: '16px' }}>
            <strong>{produto.name}</strong> - R$ {produto.price}
            <br />
            <button onClick={() => handleDetalhes(produto.id)}>Ver detalhes</button>{' '}
            <button onClick={() => handleAdicionarCarrinho(produto.id)}>Adicionar ao carrinho</button>{' '}
            <button onClick={() => handleComprarAgora(produto.id)}>Comprar agora</button>
          </li>
        ))}
      </ul>
    </div>
  );
}