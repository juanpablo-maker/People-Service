'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePrototype } from '@/context/PrototypeContext';

export default function PerfilPage() {
  const router = useRouter();
  const { isLoggedIn, userName, logout } = usePrototype();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) router.replace('/login');
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Mi perfil
      </h1>
      <p className="mt-1 text-gray-600">
        Configuración de tu cuenta
      </p>

      <div className="mt-8 space-y-4">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Cuenta
          </h2>
          <p className="mt-2 text-gray-900">Usuario: <span className="font-medium">{userName}</span></p>
          <p className="mt-1 text-sm text-gray-500">
            Prototipo: los datos no se guardan en servidor.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Opciones
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Ir al panel
              </Link>
            </li>
            <li>
              <Link
                href="/professionals"
                className="block rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Ver profesionales
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Cerrar sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Salir de tu cuenta en este dispositivo.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cerrar sesión
          </button>
        </section>
      </div>
    </div>
  );
}
