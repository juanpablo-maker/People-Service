import Link from 'next/link';
import { SERVICE_TYPE_LABELS } from '@/lib/mockData';

const BASE_SERVICES = [
  { id: 'home', label: SERVICE_TYPE_LABELS.home, description: 'Aseo general: pisos, cocina, baños y habitaciones. Se prioriza el aseo de acuerdo a tu necesidad' },
  { id: 'office', label: SERVICE_TYPE_LABELS.office, description: 'Aseo a tu espacio de trabajo: pisos, mobiliario, polvo. Ordenados para que tu equipo esté cómodo' },
];

const PREMIUM_SERVICES = [
  {
    id: 'deep',
    label: SERVICE_TYPE_LABELS.deep,
    description: 'Se limpia una zona especifica como: cocina, baños o pisos; para limpiar a detalle cajos, mobiliario, desinfectar y organizar el espacio',
    icon: '✨',
    accent: 'emerald',
  },
  {
    id: 'move_in_out',
    label: SERVICE_TYPE_LABELS.move_in_out,
    description: 'Entrada o salida de vivienda: limpieza completa antes de mudarte o al dejar el inmueble.',
    icon: '📦',
    accent: 'emerald',
  },
  {
    id: 'emergency',
    label: 'Atención urgente',
    description: 'Reserva con menos de 24 horas de antelación. Tarifa adicional según disponibilidad.',
    icon: '⚡',
    accent: 'amber',
  },
  {
    id: 'ironing_closet',
    label: 'Planchado y organización de ropa en closet',
    description: 'Planchado de prendas y orden del armario: doblado, colgado y organización por tipo o temporada para que encuentres todo fácil.',
    icon: '👔',
    accent: 'emerald',
  },
];

const ESPECIALIZADOS_SERVICES = [
  {
    id: 'aseo_mensual',
    label: 'Servicio de Aseo para Hogar u Oficina (Mensual)',
    description:
      'Contamos con personal confiable y capacitado para el cuidado de tu hogar u oficina. Puedes contratar el servicio de forma mensual, tiempo completo o medio tiempo. Incluye limpieza general, organización y mantenimiento, garantizando bienestar y cumplimiento de seguridad social.',
    icon: '🧼',
  },
  {
    id: 'todero',
    label: 'Servicio de Todero (Mantenimiento General)',
    description:
      'Atendemos arreglos y mantenimientos básicos en tu hogar o propiedad horizontal. Incluye reparaciones menores, instalaciones, pintura básica y apoyo en distintas tareas para mantener tus espacios en óptimas condiciones.',
    icon: '🔧',
  },
  {
    id: 'jardineria',
    label: 'Servicio de Jardinería',
    description:
      'Cuidado y mantenimiento de zonas verdes. Incluye corte de césped, poda, limpieza y mantenimiento general, asegurando espacios agradables, organizados y bien conservados.',
    icon: '🌿',
  },
  {
    id: 'cuidado',
    label: 'Servicio de Cuidado de Niños y Adulto Mayor',
    description:
      'Personal confiable para el cuidado en el hogar. Brindamos acompañamiento, apoyo en actividades diarias y supervisión con responsabilidad y calidez humana, adaptándonos a tus necesidades.',
    icon: '👶',
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Todos nuestros servicios
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-600">
          Elige el tipo de limpieza que necesitas. Precio claro antes de confirmar.
        </p>
      </div>

      {/* Servicios base */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          Servicios base
        </h2>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Incluidos en toda reserva. Elige el tipo de espacio que quieres limpiar.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {BASE_SERVICES.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft transition-all hover:shadow-soft-md hover:border-gray-200"
            >
              <h3 className="font-semibold text-gray-900">{s.label}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Servicios premium */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </span>
          Servicios premium
        </h2>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Para necesidades más completas o con menos tiempo de anticipación.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {PREMIUM_SERVICES.map((s) => (
            <article
              key={s.id}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md sm:p-7 ${
                s.accent === 'amber'
                  ? 'border-amber-200/80 hover:border-amber-300'
                  : 'border-emerald-200/80 hover:border-emerald-300'
              }`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${
                  s.accent === 'amber' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                }`}
                aria-hidden
              />
              <div className="flex gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                    s.accent === 'amber' ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}
                  aria-hidden
                >
                  {s.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{s.label}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Servicios especializados y empresariales */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 21h16.5M4.5 3h15M5 3v18m14-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          </span>
          Servicios Especializados y Empresariales
        </h2>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Soluciones más completas para necesidades continuas, mantenimiento y cuidado especializado.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {ESPECIALIZADOS_SERVICES.map((s) => (
            <article
              key={s.id}
              className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-emerald-300 sm:p-7"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"
                aria-hidden
              />
              <div className="flex gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl"
                  aria-hidden
                >
                  {s.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{s.label}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3.5 text-base font-medium text-white shadow-soft transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Solicitar información
        </Link>
        <p className="text-sm text-gray-500">Pago seguro · Precio claro antes de confirmar</p>
      </div>
    </div>
  );
}
