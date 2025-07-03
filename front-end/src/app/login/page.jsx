'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Capybara Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-amber-200 rounded-full mb-4">
            <span className="text-6xl">🐾</span>
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Bem-vindo de volta!</h1>
          <p className="text-amber-600">A Capybara está esperando você 🦫</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-amber-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-800 font-semibold mb-2">
                📧 E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors bg-amber-50"
              />
            </div>

            <div>
              <label className="block text-amber-800 font-semibold mb-2">
                🔒 Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors bg-amber-50"
              />
            </div>

            {erro && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 p-3 rounded-lg text-center">
                ❌ {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🐾 Entrando...' : '🚀 Entrar'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <Link 
              href="/forgot-password" 
              className="block text-amber-600 hover:text-amber-800 transition-colors"
            >
              🤔 Esqueceu sua senha?
            </Link>
            
            <div className="border-t border-amber-200 pt-4">
              <p className="text-amber-700 mb-2">Ainda não tem uma conta?</p>
              <Link 
                href="/register"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
              >
                🌟 Criar conta
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Capybara Facts */}
        <div className="mt-6 text-center text-amber-600 text-sm">
          💡 Você sabia? As capivaras são os maiores roedores do mundo!
        </div>
      </div>
    </div>
  );
}