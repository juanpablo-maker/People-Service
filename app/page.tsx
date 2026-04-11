import Link from 'next/link';
import { HowItWorks } from '@/components/HowItWorks';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CtaSection } from '@/components/CtaSection';
import { TRUST_ITEMS } from '@/lib/trustItems';

// URL del video del hero (YouTube, Vimeo o directo). Por defecto: video local en public.
const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? '/video%20landing%20inicial.mp4';

const TESTIMONIALS = [
  {
    quote: 'Llevamos seis meses con People. Mismo equipo cada semana, facturación clara y cero dolores de cabeza. Lo recomiendo.',
    author: 'Andrés M.',
    role: 'Director',
  },
  {
    quote: 'Muy profesionales y puntuales. La oficina queda impecable y la facturación mensual nos simplifica todo.',
    author: 'María G.',
    role: 'Gerente de operaciones',
  },
  {
    quote: 'Contratamos el servicio para el coworking. Los usuarios están contentos y nosotros también. Muy buena comunicación.',
    author: 'Carlos R.',
    role: 'Socio fundador',
  },
  {
    quote: 'Por fin un proveedor serio. Precio cerrado, mismo equipo y respuesta rápida cuando hemos necesitado cambios.',
    author: 'Laura S.',
    role: 'Administración',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero + Cómo funciona: izquierda = Hero, derecha = HowItWorks */}
      <section className="relative overflow-hidden border-b border-emerald-100 bg-emerald-50/40 px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pt-10" aria-label="Presentación y cómo funciona">
        <div className="mx-auto max-w-6xl">
          {/* Grid de 2 columnas en desktop: texto y video, espaciado más orgánico */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
            {/* Columna izquierda: texto del hero */}
            <div className="hero-pattern min-w-0 text-center lg:text-left">
              <p className="text-sm font-medium uppercase tracking-widest text-emerald-600" aria-hidden>
                Profesionales verificados
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-[2.75rem]">
                Limpieza de confianza,{' '}
                <span className="text-emerald-600">cuando lo necesites</span>
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg max-w-xl">
                Cuidamos la limpieza de tu casa, apartamento, oficina o cualquier espacio. Profesionales verificados y un servicio en el que puedes confiar.
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start">
                <Link
                  href="/servicios"
                  className="w-full sm:w-auto rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Ver servicios
                </Link>
                <Link
                  href="/contacto"
                  className="w-full sm:w-auto rounded-xl border-2 border-emerald-600 bg-white px-5 py-3 text-center text-sm font-medium text-emerald-600 transition-all hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Solicita tu Servicio
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-500">Precio claro antes de confirmar</p>
            </div>
            {/* Columna derecha: video contenido en su celda, centrado en la mitad derecha */}
            <div className="flex justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-md aspect-[100/99] lg:max-w-lg">
                {HERO_VIDEO_URL ? (
                  HERO_VIDEO_URL.includes('youtube.com') || HERO_VIDEO_URL.includes('youtu.be') ? (
                    <iframe
                      src={HERO_VIDEO_URL.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                      title="Video People & Service"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : HERO_VIDEO_URL.includes('vimeo.com') ? (
                    <iframe
                      src={HERO_VIDEO_URL.replace('vimeo.com/', 'player.vimeo.com/video/')}
                      title="Video People & Service"
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={HERO_VIDEO_URL}
                      className="h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Video presentación People & Service"
                    />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                    <p className="text-center text-sm px-4">Añade NEXT_PUBLIC_HERO_VIDEO_URL para mostrar el video</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona y beneficios lado a lado */}
      <section className="border-t border-gray-200 bg-gray-50/50 px-4 py-4 sm:px-6 sm:py-6 lg:py-8" aria-label="Cómo funciona y beneficios">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:items-stretch lg:gap-6">
            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-soft sm:p-5">
              <HowItWorks embedded />
            </div>
            <div className="flex min-h-0 flex-col rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/40 to-white p-4 shadow-soft sm:p-5 ring-1 ring-emerald-100/50">
              <h3 className="text-lg font-semibold text-gray-900">Por qué elegirnos como servicio de limpieza</h3>
              <ul className="mt-3 flex flex-1 flex-col gap-2 sm:gap-3" role="list">
                {TRUST_ITEMS.map((item) => (
                  <li key={item.title} className="flex gap-3 rounded-xl border border-emerald-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md hover:ring-2 hover:ring-emerald-100">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600" aria-hidden>
                      {item.icon === 'shield' && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                      )}
                      {item.icon === 'payment' && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                      )}
                      {item.icon === 'calendar' && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      )}
                      {item.icon === 'clock' && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Opiniones de clientes, encima del CTA */}
      <section className="border-t border-gray-200 bg-gray-50/50 px-4 py-10 sm:px-6 sm:py-12" aria-label="Opiniones de nuestros clientes">
        <div className="mx-auto max-w-6xl">
          <TestimonialsSection testimonials={TESTIMONIALS} embedded />
        </div>
      </section>

      {/* CTA al final */}
      <CtaSection />
    </div>
  );
}
