import Image from 'next/image';
import { BroomLink } from '@/components/BroomLink';

export default function QuienesSomosPage() {
  const benefits = [
    {
      title: 'Experiencia y trayectoria',
      emoji: '🏆',
      text: 'Contamos con experiencia en la prestación de servicios de aseo y apoyo para empresas y propiedad horizontal, lo que nos permite garantizar procesos organizados, personal capacitado y resultados consistentes.',
    },
    {
      title: 'Personal confiable y verificado',
      emoji: '✅',
      text: 'Nuestro equipo pasa por procesos de selección y validación que incluyen referencias laborales, evaluaciones y verificación de antecedentes, asegurando personal responsable y de confianza.',
    },
    {
      title: 'Cumplimiento legal y laboral',
      emoji: '⚖️',
      text: 'Todos nuestros colaboradores cuentan con afiliación completa a seguridad social, cumpliendo con la normativa laboral vigente en Colombia. Esto brinda tranquilidad tanto a nuestros trabajadores como a nuestros clientes.',
    },
    {
      title: 'Flexibilidad en los servicios',
      emoji: '🔄',
      text: 'Nos adaptamos a las necesidades de cada cliente. Puedes agendar servicios en diferentes modalidades, según el tiempo o la frecuencia que requieras.',
    },
    {
      title: 'Precios accesibles y competitivos',
      emoji: '💰',
      text: 'Ofrecemos tarifas competitivas sin comprometer la calidad del servicio, permitiendo que empresas y copropiedades accedan a personal confiable y formalizado.',
    },
    {
      title: 'Acompañamiento y seguimiento',
      emoji: '🤝',
      text: 'Realizamos seguimiento a nuestros servicios para garantizar el cumplimiento de las actividades y la satisfacción de nuestros clientes.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Identidad y compromiso — arriba, mensaje claro y llamativo */}
      <section className="border-b border-emerald-200/60 bg-gradient-to-b from-emerald-50/90 to-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8" aria-label="Quiénes somos">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-200/80 bg-white/90 px-6 py-8 shadow-[0_4px_24px_rgba(5,150,105,0.08)] sm:flex-row sm:gap-8 sm:px-8 sm:py-10">
            <div
              className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2 sm:justify-start"
              aria-hidden
            >
              <Image
                src="/images/people-service-logo.png"
                alt=""
                width={500}
                height={500}
                className="h-auto max-h-28 w-auto max-w-[200px] object-contain object-center sm:max-h-32 sm:max-w-[240px]"
                sizes="(max-width: 640px) 200px, 240px"
                priority
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                People & Service
              </h1>
              <p className="mt-1 text-base font-medium text-emerald-700">
                Cuidamos tu espacio con responsabilidad
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Estamos comprometidos con el cuidado del medio ambiente y la naturaleza. Nuestro símbolo —un árbol con raíces— refleja la conexión y armonía entre el entorno, la naturaleza y las personas. Brindamos limpieza profesional con conciencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Título sección */}
      <section className="border-t border-gray-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Nuestra misión y enfoque
          </h2>
        </div>
      </section>

      {/* Contenido principal Quiénes somos */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="rounded-xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50/80 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-gray-700 leading-relaxed">
              Nuestro objeto principal es brindar un servicio transparente, confiable y de alta calidad, orientado a suplir las necesidades de nuestros clientes en administración de propiedades, servicios generales, limpieza, aseo y servicios de mantenimiento.
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-emerald-400 bg-gradient-to-r from-gray-50 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-gray-700 leading-relaxed">
              Ofrecemos soluciones integrales que permiten optimizar estas actividades en empresas, industrias, edificios y oficinas, a través de procesos eficientes de selección, capacitación y supervisión del personal, con énfasis en limpieza integral, relaciones humanas y servicio al cliente.
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-emerald-600 bg-gradient-to-r from-emerald-50/60 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-gray-700 leading-relaxed">
              Contamos con más de 15 años de experiencia, lo que nos respalda en la prestación de un servicio responsable, oportuno y de calidad, haciéndonos una empresa competitiva y confiable en el mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            ¿Por qué contratar nuestros servicios?
          </h2>
          <p className="mt-3 text-center text-gray-600">
            En People & Service SAS ofrecemos soluciones confiables en servicios de aseo y apoyo operativo, con un enfoque en la calidad, el cumplimiento y la tranquilidad de nuestros clientes.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {benefits.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xl" aria-hidden>
                  {item.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contacto y redes sociales */}
      <section className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Contáctanos
          </h2>
          <p className="mt-3 text-gray-600">
            Escríbenos por WhatsApp o síguenos en redes sociales.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://wa.me/573115146225"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp: 311 514 6225
            </a>
            <a
              href="https://www.facebook.com/sgsstytalentohumano/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/people_and_service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @people_and_service
            </a>
          </div>
          <p className="mt-8">
            <BroomLink href="/contacto" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              Ir al formulario de contacto →
            </BroomLink>
          </p>
        </div>
      </section>
    </div>
  );
}
