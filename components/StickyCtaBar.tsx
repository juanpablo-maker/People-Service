'use client';

import { CelebrationLink } from '@/components/CelebrationLink';
import { useEffect, useState } from 'react';

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200/90 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      role="banner"
      aria-label="Contactar"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-700">
          <span className="font-semibold text-emerald-700">People</span>
          <span className="text-gray-400 mx-1.5">·</span>
          ¿Necesitas limpieza profesional?
        </p>
        <CelebrationLink
          href="/contacto"
          className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Contactar
        </CelebrationLink>
      </div>
    </div>
  );
}
