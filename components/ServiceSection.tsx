import Image from 'next/image';
import Link from 'next/link';

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed text-gray-700 md:text-lg md:leading-relaxed">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 md:mt-1 md:h-6 md:w-6"
        aria-hidden
      >
        <svg className="h-2.5 w-2.5 text-emerald-600 md:h-3 md:w-3" viewBox="0 0 10 8" fill="none">
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

export interface ServiceSectionProps {
  anchorId: string;
  title: string;
  descriptionLines: readonly [string, string];
  bullets: readonly string[];
  image: { src: string; alt: string };
  /** false: contenido izquierda, imagen derecha. true: zig-zag (imagen izquierda). */
  reverse?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  /** Primera sección sobre el pliegue: prioriza carga de imagen. */
  imagePriority?: boolean;
  /**
   * `cover` (default): recorta para llenar el marco panorámico.
   * `contain`: encaja la imagen completa (p. ej. retrato 1:1) sin recortar a la figura.
   */
  imageFit?: 'cover' | 'contain';
}

export function ServiceSection({
  anchorId,
  title,
  descriptionLines,
  bullets,
  image,
  reverse = false,
  ctaLabel = 'Solicitar cotización',
  ctaHref = '/contacto',
  imagePriority = false,
  imageFit = 'cover',
}: ServiceSectionProps) {
  const [line1, line2] = descriptionLines;

  /** Desktop zig-zag; por debajo de md: siempre texto y luego imagen. */
  const contentOrder = reverse ? 'md:order-2' : 'md:order-1';
  const imageOrder = reverse ? 'md:order-1' : 'md:order-2';

  return (
    <article
      id={anchorId}
      tabIndex={-1}
      className="scroll-mt-[4.75rem] motion-safe:animate-fade-in sm:scroll-mt-24 md:scroll-mt-28"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-11">
        <div className={`order-1 flex min-w-0 flex-col justify-center ${contentOrder}`}>
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl">
            {title}
          </h3>
          <div className="mt-3 max-w-prose space-y-3 sm:mt-4">
            <p className="text-base leading-relaxed text-gray-800 md:text-lg md:leading-relaxed">
              {line1}
            </p>
            <p className="text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed">
              {line2}
            </p>
          </div>
          <ul className="mt-5 max-w-prose space-y-3 sm:mt-6 md:space-y-3.5" role="list">
            {bullets.map((text, i) => (
              <CheckBullet key={`${anchorId}-b-${i}`}>{text}</CheckBullet>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className="group/cta mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:mt-7 md:text-lg md:min-h-[56px] sm:w-fit"
          >
            <span>{ctaLabel}</span>
            <span
              className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>

        {/* Móvil: siempre después del contenido (orden 2); altura contenida */}
        <div
          className={`order-2 w-full md:min-h-0 ${imageOrder} ${imageFit === 'contain' ? 'md:self-center' : ''}`}
        >
          <div
            className={
              imageFit === 'contain'
                ? 'group/img relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-sm'
                : 'group/img relative aspect-[5/3] w-full max-h-[13.75rem] overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-sm sm:max-h-[15rem] md:aspect-auto md:max-h-none md:h-full md:min-h-[240px] lg:min-h-[260px]'
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={imagePriority}
              sizes="(min-width: 768px) 45vw, 100vw"
              className={
                imageFit === 'contain'
                  ? 'object-contain object-center transition-transform duration-500 ease-out group-hover/img:scale-[1.02]'
                  : 'object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]'
              }
            />
          </div>
        </div>
      </div>
    </article>
  );
}
