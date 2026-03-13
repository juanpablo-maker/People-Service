'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useSwipe } from '@/hooks/useSwipe';

export type TrustItem = {
  title: string;
  description: string;
  icon: 'shield' | 'star' | 'payment' | 'calendar';
};

function TrustIcon({ icon }: { icon: TrustItem['icon'] }) {
  if (icon === 'shield')
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    );
  if (icon === 'star')
    return (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
    );
  if (icon === 'payment')
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    );
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function TrustCard({ item }: { item: TrustItem }) {
  return (
    <article className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6 shadow-soft transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-md hover:border-emerald-200">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600" aria-hidden>
        <TrustIcon icon={item.icon} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
    </article>
  );
}

export function TrustSection({ items }: { items: TrustItem[] }) {
  const isMobile = useIsMobile();
  const swipe = useSwipe(items.length, 0);
  const current = items[swipe.index];

  if (isMobile) {
    return (
      <section className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Tranquilidad desde el primer contacto
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Todo lo que necesitas para la limpieza de tu espacio.
          </p>
          <div
            className="mt-8 touch-pan-y select-none"
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
            <div className="flex justify-center gap-2">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    swipe.index === i ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-300'
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <div key={swipe.index} className="mt-6 animate-fade-in">
              <TrustCard item={current} />
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">Desliza para ver más</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Tranquilidad desde el primer contacto
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
          Todo lo que necesitas para la limpieza de tu espacio.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <TrustCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
