import Image from 'next/image';
import Link from 'next/link';

export interface PremiumServiceItem {
  anchorId: string;
  title: string;
  description: string;
  /** Emoji o símbolo visual junto al título (catálogo premium). */
  icon?: string;
}

export interface PremiumServicesSectionProps {
  image: { src: string; alt: string };
  items: readonly PremiumServiceItem[];
  /** Solo un bloque editorial debería usar priority (p. ej. premium sobre el pliegue). */
  imagePriority?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Sección editorial premium: imagen grande + lista vertical de servicios (sin cards pesadas).
 * Desktop: imagen izquierda + CTA debajo de la imagen · lista derecha. Móvil: imagen, CTA y lista.
 */
export function PremiumServicesSection({
  image,
  items,
  imagePriority = false,
  ctaLabel = 'Solicitar cotización',
  ctaHref = '/contacto',
}: PremiumServicesSectionProps) {
  const cta = (
    <Link
      href={ctaHref}
      className="group/cta inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:min-h-[56px] md:text-lg sm:w-fit"
    >
      <span>{ctaLabel}</span>
      <span
        className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1"
        aria-hidden
      >
        →
      </span>
    </Link>
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-stretch">
      {/* Columna imagen + CTA debajo (misma columna en desktop) */}
      <div className="order-1 flex flex-col lg:order-none">
        <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-gray-200/80 shadow-md shadow-gray-900/5 ring-1 ring-black/[0.06] lg:mx-0 lg:max-w-none">
          <div className="relative aspect-square w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 42vw, min(100vw - 2rem, 32rem)"
              className="object-cover object-center"
              priority={imagePriority}
            />
          </div>
        </div>
        <div className="mt-6 flex w-full max-w-lg justify-center sm:mt-7 lg:mx-0 lg:mt-8 lg:max-w-none lg:justify-start">
          {cta}
        </div>
      </div>

      {/* Lista editorial con iconos y jerarquía */}
      <div className="order-2 flex min-w-0 flex-col justify-center lg:order-none">
        <ul className="space-y-0" role="list">
          {items.map((item, index) => (
            <li
              key={item.anchorId}
              id={item.anchorId}
              tabIndex={-1}
              className={[
                'scroll-mt-[4.75rem] sm:scroll-mt-24 md:scroll-mt-28',
                'relative py-7 first:pt-0 last:pb-0 sm:py-8',
                index > 0 ? 'border-t border-gray-200/90' : '',
              ].join(' ')}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {item.icon ? (
                  <span
                    className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-white text-[1.35rem] shadow-[inset_0_0_0_1px_rgba(16,185,129,0.14),0_1px_2px_rgba(15,23,42,0.04)] sm:mt-1.5 sm:h-14 sm:w-14 sm:text-[1.5rem] md:text-2xl lg:mt-2 lg:h-16 lg:w-16 lg:text-[1.75rem]"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-prose text-base leading-relaxed text-gray-600 md:mt-3 md:text-lg md:leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
