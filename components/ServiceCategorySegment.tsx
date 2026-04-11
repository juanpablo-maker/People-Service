import type { ReactNode } from 'react';

const TONE_CLASS = {
  white: 'bg-white',
  muted: 'bg-[#F9FAFB]',
} as const;

export type ServiceCategorySegmentTone = keyof typeof TONE_CLASS;

const SECTION_PAD = {
  /** Espaciado estándar entre segmentos. */
  default: 'py-10 sm:py-14 md:py-16 lg:py-20',
  /** Menos padding superior justo después del intro de /servicios (flujo más continuo). */
  tightAfterIntro:
    'pt-5 pb-10 sm:pt-6 sm:pb-14 md:pt-7 md:pb-16 lg:pt-8 lg:pb-20',
  /** Tras otro bloque completo: menos aire antes del título de categoría. */
  compactTop:
    'pt-6 pb-10 sm:pt-7 sm:pb-14 md:pt-8 md:pb-16 lg:pt-9 lg:pb-20',
} as const;

export function ServiceCategorySegment({
  tone,
  ariaLabelledBy,
  children,
  sectionPadding = 'default',
}: {
  tone: ServiceCategorySegmentTone;
  ariaLabelledBy: string;
  children: ReactNode;
  /** `tightAfterIntro`: reduce solo el padding top para acercar el primer bloque al hero. */
  sectionPadding?: keyof typeof SECTION_PAD;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledBy}
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${TONE_CLASS[tone]} ${SECTION_PAD[sectionPadding]}`}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Encabezado de categoría (icono + título + intro) con un solo separador inferior. */
export function ServiceCategoryHeader({
  id,
  title,
  description,
  icon,
  compact,
}: {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  /** Encabezado más denso (menos margen e interior). */
  compact?: boolean;
}) {
  return (
    <header
      className={
        compact ? 'mb-4 sm:mb-5 md:mb-6' : 'mb-6 sm:mb-8 md:mb-10'
      }
    >
      <div
        className={`flex flex-col border-b border-gray-200/80 sm:flex-row sm:items-start ${
          compact
            ? 'gap-2 pb-3 sm:gap-3 sm:pb-3.5'
            : 'gap-3 pb-4 sm:gap-4'
        }`}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)] sm:h-8 sm:w-8"
          aria-hidden
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id={id}
            className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-3 md:text-lg md:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
