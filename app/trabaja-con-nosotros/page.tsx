import Image from 'next/image';

const FORM_OFFICE_URL = 'https://forms.office.com/r/qvPV2CtsYb';
const RECEPTOR_EMAIL = 'thumano@peolesas.com';

const HISTORIA_IMAGEN = '/images/trabaja-con-nosotros-historia.png';

const BENEFICIOS = [
  'Horarios que se adaptan a tu vida y compromisos.',
  'Pago puntual y condiciones claras desde el primer día.',
  'Trabajo en equipos estables y ambientes respetuosos.',
  'Oportunidad de crecer dentro de la empresa.',
  'Formación y apoyo para hacer bien tu trabajo.',
];

export default function TrabajaConNosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Trabaja con nosotros
          </h1>
          <p className="mt-4 text-center text-gray-600">
            Completa el formulario con tus datos y adjunta tu hoja de vida (CV). Toda la información será recibida en{' '}
            <a href={`mailto:${RECEPTOR_EMAIL}`} className="font-medium text-emerald-600 hover:text-emerald-700 underline">
              {RECEPTOR_EMAIL}
            </a>
            .
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={FORM_OFFICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-emerald-700 hover:shadow-soft-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto sm:inline-flex"
            >
              Abrir formulario y adjuntar CV
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Historias de éxito */}
      <section className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Historias de éxito
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Conoce cómo es trabajar con nosotros
          </p>

          <div className="mt-12 flex flex-col gap-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-soft sm:p-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="shrink-0 lg:w-2/5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-200 shadow-md">
                <Image
                  src={HISTORIA_IMAGEN}
                  alt="Colaboradora de People realizando labores de aseo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-gray-700">
                Nuestra gente hace la diferencia
              </p>
            </div>

            <div className="lg:w-3/5">
              <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Los beneficios de trabajar en People
              </h3>
              <ul className="mt-6 space-y-4">
                {BENEFICIOS.map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-600 italic">
                “En People me siento respetada y valorada. Tengo horarios que me permiten estar con mi familia y un ingreso estable.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
