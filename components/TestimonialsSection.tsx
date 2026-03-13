'use client';

import { useIsMobile } from '@/hooks/useIsMobile';

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
};

const CARD_WIDTH = 'min-w-[280px] sm:min-w-[320px]';

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <blockquote className={`flex-shrink-0 ${CARD_WIDTH} rounded-2xl border border-gray-200 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-soft-md hover:border-emerald-200 sm:p-6`}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700" aria-hidden>
          {t.author.charAt(0)}
        </span>
        <div className="flex gap-0.5 text-amber-400" aria-hidden>
          {Array.from({ length: 5 }).map((_, j) => (
            <span key={j}>★</span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed text-gray-700">
        &ldquo;{t.quote}&rdquo;
      </p>
      <footer className="mt-3 text-xs text-gray-500">— {t.author}, {t.role}</footer>
    </blockquote>
  );
}

type TestimonialsSectionProps = {
  testimonials: TestimonialItem[];
  embedded?: boolean;
};

export function TestimonialsSection({ testimonials, embedded = false }: TestimonialsSectionProps) {
  const isMobile = useIsMobile();

  const sectionContent = (
    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-left">
      Opiniones de nuestros clientes
    </h2>
  );

  const innerContent = (
    <>
      {sectionContent}
      <div className="mt-8 overflow-hidden" aria-label="Carrusel de opiniones">
        <div className="flex w-max animate-testimonial-scroll gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </>
  );

  const desktopInner = (
    <>
      {sectionContent}
      <div className="mt-8 overflow-hidden" aria-hidden>
        <div className="flex w-max animate-testimonial-scroll gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="h-full">
        {innerContent}
      </div>
    );
  }

  if (isMobile) {
    return (
      <section className="border-t border-gray-200 bg-gray-50/50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-md">
          {innerContent}
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gray-200 bg-gray-50/50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {desktopInner}
      </div>
    </section>
  );
}
