'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/cart/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setItens(res.data.items))
      .catch(() => setErro('Erro ao carregar o carrinho.'));
  }, []);

  return (
    <div>
      <h2>Carrinho</h2>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      <ul>
        {itens.map(item => (
          <li key={item.id}>
            {item.product.name} - {item.quantity} x R$ {item.product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}