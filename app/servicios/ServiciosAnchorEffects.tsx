'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { isServiceAnchorId, SERVICE_CARD_HIGHLIGHT_CLASS } from '@/lib/servicesCatalog';

const HIGHLIGHT_MS = 2600;
const HIGHLIGHT_CLASS = SERVICE_CARD_HIGHLIGHT_CLASS;

function clearAllHighlights() {
  document.querySelectorAll<HTMLElement>(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS);
  });
}

/**
 * Smooth scroll to hash target, navbar offset via scroll-margin on cards (globals + Tailwind).
 * Applies a temporary highlight class for ~2.5s.
 */
export function ServiciosAnchorEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/servicios') return;

    let highlightTimer: ReturnType<typeof setTimeout> | undefined;

    const apply = () => {
      const raw = window.location.hash.replace(/^#/, '');
      clearAllHighlights();
      if (highlightTimer) {
        clearTimeout(highlightTimer);
        highlightTimer = undefined;
      }

      if (!raw || !isServiceAnchorId(raw)) return;

      const el = document.getElementById(raw);
      if (!el) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add(HIGHLIGHT_CLASS);
          highlightTimer = setTimeout(() => {
            el.classList.remove(HIGHLIGHT_CLASS);
            highlightTimer = undefined;
          }, HIGHLIGHT_MS);
        });
      });
    };

    apply();
    window.addEventListener('hashchange', apply);
    return () => {
      window.removeEventListener('hashchange', apply);
      if (highlightTimer) clearTimeout(highlightTimer);
      clearAllHighlights();
    };
  }, [pathname]);

  return null;
}
