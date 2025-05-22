'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Produto({ params }) {
  const { id } = params;
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => setProduto(res.data))
      .catch(() => setErro('Produto não encontrado.'));
  }, [id]);

  if (erro) return <p style={{color: 'red'}}>{erro}</p>;
  if (!produto) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{produto.name}</h2>
      <p>Preço: R$ {produto.price}</p>
      <p>{produto.description}</p>
      {produto.image && (
        <img src={`http://localhost:8000${produto.image}`} alt={produto.name} width={200} />
      )}
    </div>
  );
}