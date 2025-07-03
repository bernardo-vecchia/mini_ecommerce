'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio de email (você pode implementar a lógica real aqui)
    setTimeout(() => {
      setMensagem('Se este e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Capybara Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-200 rounded-full mb-4">
            <span className="text-6xl">🤔</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Esqueceu sua senha?</h1>
          <p className="text-blue-600">Não se preocupe, a Capybara vai te ajudar! 🦫</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-200">
          {!mensagem ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-800 font-semibold mb-2">
                  📧 Digite seu e-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-blue-50"
                />
                <p className="text-sm text-blue-600 mt-2">
                  Enviaremos instruções para redefinir sua senha
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🐾 Enviando...' : '📨 Enviar instruções'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📧</div>
              <div className="bg-green-100 border-2 border-green-300 text-green-700 p-4 rounded-lg">
                ✅ {mensagem}
              </div>
              <p className="text-blue-600 text-sm">
                Verifique sua caixa de entrada e spam
              </p>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <Link 
              href="/login" 
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Voltar para o login
            </Link>
            
            <div className="border-t border-blue-200 pt-4">
              <p className="text-blue-700 mb-2">Ainda não tem uma conta?</p>
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
        <div className="mt-6 text-center text-blue-600 text-sm">
          💡 Você sabia? As capivaras têm uma memória excelente!
        </div>
      </div>
    </div>
  );
}