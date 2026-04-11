import Link from 'next/link';
import type { ServiceValueProp } from '@/lib/servicesCatalog';

function BenefitRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-snug text-gray-700">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100"
        aria-hidden
      >
        <svg className="h-2.5 w-2.5 text-emerald-600" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4l2.5 2.5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function DefaultHomeLeadIcon() {
  return (
    <span
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"
      aria-hidden
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </span>
  );
}

export interface ServiceCardV2Props {
  anchorId: string;
  title: string;
  valueProp: ServiceValueProp;
  /** Si no se pasa, se usa icono de hogar (variante base). */
  leadIcon?: React.ReactNode;
}

export function ServiceCardV2({ anchorId, title, valueProp, leadIcon }: ServiceCardV2Props) {
  const href = valueProp.ctaHref ?? '/contacto';
  const [line1, line2] = valueProp.descriptionLines;

  return (
    <article
      id={anchorId}
      tabIndex={-1}
      className="group/card scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-soft-md"
    >
      <div className="flex flex-col">
        {leadIcon ?? <DefaultHomeLeadIcon />}
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm leading-relaxed text-gray-800">{line1}</p>
          <p className="text-sm leading-relaxed text-gray-600">{line2}</p>
        </div>
        <ul className="mt-4 space-y-2.5 sm:space-y-2" role="list">
          {valueProp.benefits.map((text, i) => (
            <BenefitRow key={`${anchorId}-b-${i}`}>{text}</BenefitRow>
          ))}
        </ul>
        <div className="mt-5 border-t border-gray-100 pt-4">
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-md"
          >
            <span className="border-b border-transparent pb-px transition-[border-color] group-hover/cta:border-emerald-600">
              {valueProp.ctaLabel}
            </span>
            <span
              className="inline-block transition-transform duration-200 group-hover/cta:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
