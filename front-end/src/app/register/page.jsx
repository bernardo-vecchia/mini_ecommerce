'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await axios.post('http://localhost:8000/api/auth/register/', {
        username: username,
        email: email,
        password: senha,
        first_name: firstName,
        last_name: lastName,
      });
      setSucesso('Cadastro realizado com sucesso! Faça login.');
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setSenha('');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setErro(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        'Erro ao cadastrar. Verifique os dados.'
      );
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        /><br />
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
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      {sucesso && <p style={{color: 'green'}}>{sucesso}</p>}
    </div>
  );
}