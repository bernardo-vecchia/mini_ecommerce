'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);

    if (senha !== confirmSenha) {
      setErro('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/auth/register/', {
        username: username,
        email: email,
        password: senha,
        first_name: firstName,
        last_name: lastName,
      });
      setSucesso('Cadastro realizado com sucesso! Redirecionando para o login...');
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setSenha('');
      setConfirmSenha('');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setErro(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        'Erro ao cadastrar. Verifique os dados.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Capybara Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-emerald-200 rounded-full mb-4">
            <span className="text-6xl">🦫</span>
          </div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Junte-se à família!</h1>
          <p className="text-emerald-600">A Capybara quer te conhecer melhor 🌿</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  👤 Nome
                </label>
                <input
                  type="text"
                  placeholder="João"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  👥 Sobrenome
                </label>
                <input
                  type="text"
                  placeholder="Silva"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                🏷️ Nome de usuário
              </label>
              <input
                type="text"
                placeholder="capybara_lover"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                📧 E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                🔒 Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                🔐 Confirmar senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmSenha}
                onChange={e => setConfirmSenha(e.target.value)}
                required
                className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-emerald-50"
              />
            </div>

            {erro && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 p-3 rounded-lg text-center">
                ❌ {erro}
              </div>
            )}

            {sucesso && (
              <div className="bg-green-100 border-2 border-green-300 text-green-700 p-3 rounded-lg text-center">
                ✅ {sucesso}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🐾 Criando conta...' : '🌟 Criar conta'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="border-t border-emerald-200 pt-4">
              <p className="text-emerald-700 mb-2">Já tem uma conta?</p>
              <Link 
                href="/login"
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Fazer login
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Capybara Facts */}
        <div className="mt-6 text-center text-emerald-600 text-sm">
          💡 Você sabia? As capivaras são excelentes nadadoras!
        </div>
      </div>
    </div>
  );
}