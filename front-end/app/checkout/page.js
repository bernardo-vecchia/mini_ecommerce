'use client';
import { useState } from 'react';

export default function Checkout() {
  const [mensagem, setMensagem] = useState('');

  const finalizarCompra = () => {
    setMensagem('Compra finalizada! Obrigado pela preferência.');
    // Aqui você pode integrar com o backend para processar o pedido
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={finalizarCompra}>Finalizar Compra</button>
      {mensagem && <p style={{color: 'green'}}>{mensagem}</p>}
    </div>
  );
}