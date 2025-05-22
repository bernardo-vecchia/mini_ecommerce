'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const response = await axios.post('http://localhost:8000/api/auth/token/', {
        email: email,
        password: senha,
      });
      localStorage.setItem('token', response.data.access);
      alert('Login realizado com sucesso!');
      router.push('/');
    } catch (err) {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem conta? <a href="/cadastro">Cadastre-se</a>
      </p>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
    </div>
  );
}