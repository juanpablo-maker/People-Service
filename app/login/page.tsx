'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePrototype } from '@/context/PrototypeContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = usePrototype();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login: any email/password works
    login(email || 'usuario@ejemplo.com');
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Entra y reserva en minutos
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Pago seguro. Precio claro antes de confirmar.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 py-3.5 font-medium text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Continuar
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-gray-500">
          Tus datos están seguros. Protegemos tu información.
        </p>
        <p className="mt-1 text-center text-xs text-gray-400">
          Prototipo: cualquier email y contraseña te llevan al panel.
        </p>
      </div>
    </div>
  );
}
