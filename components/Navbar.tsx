'use client';

import Link from 'next/link';
import { CelebrationLink } from '@/components/CelebrationLink';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-200 ${
        scrolled ? 'border-gray-200 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 sm:h-16">
        <Link
          href="/"
          className="shrink-0 touch-manipulation flex items-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg"
          aria-label="People & Service - Inicio"
        >
          <span className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            People <span className="text-emerald-600">&</span> Service
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/quienes-somos"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
          >
            Quiénes somos
          </Link>
          <Link
            href="/servicios"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
          >
            Servicios
          </Link>
          <Link
            href="/trabaja-con-nosotros"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
          >
            Trabaja con nosotros
          </Link>
          <CelebrationLink
            href="/contacto"
            className="min-h-[44px] flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
          >
            Contacto
          </CelebrationLink>
        </nav>
      </div>
    </header>
  );
}
