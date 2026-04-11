'use client';

import Link from 'next/link';
import { CelebrationLink } from '@/components/CelebrationLink';
import { ServicesDesktopDropdown, ServicesMobileAccordion } from '@/components/ServicesNav';
import { useEffect, useId, useState } from 'react';

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileAccordionPrefix = useId().replace(/:/g, '');
  const mobilePanelId = `${mobileAccordionPrefix}-panel`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const navLinkClass =
    'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation';

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-200 ${
        scrolled ? 'border-gray-200 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className="mx-auto flex h-[3.25rem] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] min-w-0 shrink touch-manipulation items-center rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:shrink-0"
          aria-label="People & Service - Inicio"
        >
          <span className="truncate text-base font-semibold tracking-tight text-gray-900 sm:text-lg md:text-xl">
            People <span className="text-emerald-600">&</span> Service
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-1 lg:flex" aria-label="Principal">
          <ServicesDesktopDropdown />
          <Link href="/quienes-somos" className={navLinkClass}>
            Quiénes somos
          </Link>
          <Link href="/trabaja-con-nosotros" className={navLinkClass}>
            Trabaja con nosotros
          </Link>
          <CelebrationLink
            href="/contacto"
            className="min-h-[44px] flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
          >
            Contáctanos
          </CelebrationLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={mobilePanelId}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">{mobileOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[60] flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          id={mobilePanelId}
        >
          <button
            type="button"
            className="absolute inset-0 bg-gray-900/35 backdrop-blur-[1px]"
            aria-label="Cerrar menú"
            tabIndex={-1}
            onClick={closeMobile}
          />
          <div className="relative flex h-full w-[min(100%,22rem)] max-w-[min(100vw-1rem,22rem)] flex-col bg-white shadow-2xl ring-1 ring-black/5">
            <div className="flex min-h-[3.25rem] items-center justify-between border-b border-gray-100 px-3 py-2 sm:px-4 sm:py-3">
              <span className="text-sm font-semibold text-gray-900">Menú</span>
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Cerrar menú"
                onClick={closeMobile}
              >
                <CloseIcon />
              </button>
            </div>
            <nav
              className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 sm:px-4 sm:py-3"
              aria-label="Principal móvil"
            >
              <ServicesMobileAccordion idPrefix={mobileAccordionPrefix} onNavigate={closeMobile} />
              <Link
                href="/quienes-somos"
                className="flex min-h-[48px] items-center rounded-xl px-3 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                onClick={closeMobile}
              >
                Quiénes somos
              </Link>
              <Link
                href="/trabaja-con-nosotros"
                className="flex min-h-[48px] items-center rounded-xl px-3 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                onClick={closeMobile}
              >
                Trabaja con nosotros
              </Link>
              <div className="mt-3 px-0.5 sm:mt-4">
                <Link
                  href="/contacto"
                  className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  onClick={closeMobile}
                >
                  Contáctanos
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
