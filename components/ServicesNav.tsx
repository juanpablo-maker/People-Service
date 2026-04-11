'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  SERVICE_CARD_HIGHLIGHT_CLASS,
  SERVICES_CATALOG,
  SERVICE_CATEGORY_NAV_LABELS,
  SERVICES_CATALOG_DROPDOWN_ORDER,
  type ServiceAnchorId,
} from '@/lib/servicesCatalog';

function serviceHref(anchorId: ServiceAnchorId) {
  return `/servicios#${anchorId}`;
}

/** En /servicios, next/link no siempre dispara hashchange; el hash nativo sí. */
export const ServiceNavLink = forwardRef<
  HTMLAnchorElement,
  {
    anchorId: ServiceAnchorId;
    className: string;
    children: React.ReactNode;
    onNavigate?: () => void;
  }
>(function ServiceNavLink({ anchorId, className, children, onNavigate }, ref) {
  const pathname = usePathname();
  const href = serviceHref(anchorId);

  if (pathname === '/servicios') {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.();
          window.location.hash = anchorId;
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} scroll={false} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
});

const ServiciosOverviewLink = forwardRef<
  HTMLAnchorElement,
  { className: string; children: React.ReactNode; onNavigate?: () => void }
>(function ServiciosOverviewLink({ className, children, onNavigate }, ref) {
  const pathname = usePathname();

  if (pathname === '/servicios') {
    return (
      <a
        ref={ref}
        href="/servicios"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.();
          document
            .querySelectorAll<HTMLElement>(`.${SERVICE_CARD_HIGHLIGHT_CLASS}`)
            .forEach((el) => el.classList.remove(SERVICE_CARD_HIGHLIGHT_CLASS));
          window.history.replaceState(null, '', '/servicios');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href="/servicios" scroll={false} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
});

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type CloseReason = 'navigate' | 'escape' | 'outside';

export function ServicesDesktopDropdown() {
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const cancelLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelLeave();
    leaveTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const handleOpen = () => {
    cancelLeave();
    setOpen(true);
  };

  const close = useCallback((reason: CloseReason) => {
    cancelLeave();
    setOpen(false);
    if (reason === 'escape' || reason === 'outside') {
      triggerRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        close('outside');
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close('escape');
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  useEffect(() => {
    return () => cancelLeave();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleOpen();
      }}
      onMouseLeave={() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) scheduleClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 touch-manipulation"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        id={`${menuId}-trigger`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!open) setOpen(true);
            requestAnimationFrame(() => firstItemRef.current?.focus());
          }
        }}
      >
        Servicios
        <ChevronDown open={open} />
      </button>

      <div
        id={menuId}
        role="navigation"
        aria-label="Listado de servicios"
        hidden={!open}
        className="absolute left-0 top-full z-50 pt-2"
      >
        <div className="w-[min(100vw-2rem,22rem)] rounded-2xl border border-gray-100/80 bg-white py-3 shadow-xl shadow-gray-900/10 ring-1 ring-black/5">
          <div className="border-b border-gray-100 px-4 pb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Servicios</p>
            <ServiciosOverviewLink
              ref={firstItemRef}
              className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              onNavigate={() => close('navigate')}
            >
              <svg
                className="h-4 w-4 shrink-0 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h10"
                />
              </svg>
              Ver todos los servicios
            </ServiciosOverviewLink>
          </div>

          <div className="max-h-[min(88vh,36rem)] overflow-y-auto overscroll-contain px-2 py-2 [scrollbar-gutter:stable]">
            {SERVICES_CATALOG_DROPDOWN_ORDER.map((slug) => {
              const cat = SERVICES_CATALOG.find((c) => c.id === slug);
              if (!cat) return null;
              return (
              <div key={cat.id} className="mb-3 last:mb-0">
                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  {SERVICE_CATEGORY_NAV_LABELS[cat.id]}
                </p>
                <ul className="space-y-0.5" role="list">
                  {cat.services.map((s) => (
                    <li key={s.anchorId}>
                      <ServiceNavLink
                        anchorId={s.anchorId}
                        className="group flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-emerald-50/90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                        onNavigate={() => close('navigate')}
                      >
                        {s.icon ? (
                          <span
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-base transition-colors group-hover:bg-white"
                            aria-hidden
                          >
                            {s.icon}
                          </span>
                        ) : (
                          <span
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 opacity-70 group-hover:opacity-100"
                            aria-hidden
                          />
                        )}
                        <span className="min-w-0 leading-snug">{s.label}</span>
                      </ServiceNavLink>
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesMobileAccordion({
  idPrefix,
  onNavigate,
}: {
  idPrefix: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `${idPrefix}-services-panel`;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        className="flex w-full min-h-[48px] items-center justify-between gap-3 rounded-xl px-1 py-2.5 text-left text-base font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
        aria-expanded={expanded}
        aria-controls={panelId}
        id={`${idPrefix}-services-trigger`}
        onClick={() => setExpanded((e) => !e)}
      >
        Servicios
        <ChevronDown open={expanded} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`${idPrefix}-services-trigger`}
        hidden={!expanded}
        className={expanded ? 'pb-2' : 'hidden'}
      >
        <ServiciosOverviewLink
          className="mb-3 flex min-h-[48px] items-center rounded-xl bg-emerald-50/80 px-3 py-3 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onNavigate={onNavigate}
        >
          Ver página de servicios
        </ServiciosOverviewLink>
        <div className="space-y-5">
          {SERVICES_CATALOG_DROPDOWN_ORDER.map((slug) => {
            const cat = SERVICES_CATALOG.find((c) => c.id === slug);
            if (!cat) return null;
            return (
            <div key={cat.id}>
              <p className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {SERVICE_CATEGORY_NAV_LABELS[cat.id]}
              </p>
              <ul className="space-y-0.5" role="list">
                {cat.services.map((s) => (
                  <li key={s.anchorId}>
                    <ServiceNavLink
                      anchorId={s.anchorId}
                      className="flex min-h-[48px] items-center rounded-lg px-3 py-2.5 text-sm leading-snug text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                      onNavigate={onNavigate}
                    >
                      {s.label}
                    </ServiceNavLink>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
