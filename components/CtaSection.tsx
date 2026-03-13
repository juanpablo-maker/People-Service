import { CelebrationLink } from '@/components/CelebrationLink';

export function CtaSection() {
  return (
    <section className="border-t border-emerald-100 bg-emerald-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20" aria-label="Llamado a la acción">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          ¿Listo para agendar nuestro servicio?
        </h2>
        <p className="mt-3 text-base text-gray-600 sm:text-lg">
          Cuéntanos tu espacio y te enviamos una propuesta sin compromiso.
        </p>
        <CelebrationLink
          href="/contacto"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Solicitar servicio
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </CelebrationLink>
      </div>
    </section>
  );
}
