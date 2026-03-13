'use client';

import Link from 'next/link';

const BENEFITS = [
  {
    title: 'Mismo equipo, cada vez',
    description: 'Asignamos profesionales fijos a tu cuenta para que conozcan tu espacio y mantengan el estándar.',
    icon: 'team',
  },
  {
    title: 'Facturación simple',
    description: 'Una sola factura mensual, sin sorpresas. Planes recurrentes con precio cerrado.',
    icon: 'invoice',
  },
  {
    title: 'Horarios a tu medida',
    description: 'Limpieza antes de abrir, después de cerrar o en franjas que no interfieran con tu equipo.',
    icon: 'clock',
  },
  {
    title: 'Estándares verificados',
    description: 'Mismos profesionales verificados y valorados que en hogares. Calidad y confianza garantizadas.',
    icon: 'shield',
  },
];

const OFFER_TYPES = [
  {
    title: 'Oficinas',
    description: 'Limpieza diaria o semanal de escritorios, baños, zonas comunes y cocina.',
  },
  {
    title: 'Coworkings y espacios compartidos',
    description: 'Mantenimiento impecable para que miembros y visitas siempre encuentren el espacio listo.',
  },
  {
    title: 'Locales comerciales',
    description: 'Vitrinas, mostradores y trastienda. Antes o después del horario comercial.',
  },
  {
    title: 'Planes recurrentes',
    description: 'Descuento por compromiso mensual. Misma frecuencia, mismo equipo, menos gestión.',
  },
];

const STEPS = [
  { step: 1, title: 'Cuéntanos tu espacio', detail: 'Metros cuadrados, frecuencia y horarios preferidos.' },
  { step: 2, title: 'Recibe una propuesta', detail: 'Precio cerrado, sin compromiso, en menos de 24 h.' },
  { step: 3, title: 'Arrancamos', detail: 'Asignamos equipo y coordinamos la primera visita.' },
];

export default function EmpresasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Para empresas</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Limpieza profesional para tu empresa
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Oficinas, coworkings y locales. Planes recurrentes, facturación única y el mismo estándar de calidad que en hogares. Sin ataduras, con resultados.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#solicitar"
              className="w-full rounded-2xl bg-gray-900 px-8 py-3.5 text-center text-base font-medium text-white shadow-soft transition-shadow hover:bg-gray-800 hover:shadow-soft-md sm:w-auto"
            >
              Solicitar información
            </a>
            <Link
              href="/servicios"
              className="w-full rounded-2xl border border-gray-300 bg-white px-8 py-3.5 text-center text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Por qué elegir People para tu empresa
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Diseñamos la oferta para que ahorres tiempo y tengas un espacio impecable, sin gestionar proveedores.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent" aria-hidden>
                  {b.icon === 'team' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  )}
                  {b.icon === 'invoice' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )}
                  {b.icon === 'clock' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {b.icon === 'shield' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )}
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de oferta */}
      <section className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Qué podemos hacer por tu negocio
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Adaptamos frecuencia, horarios y alcance a lo que necesites.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {OFFER_TYPES.map((o) => (
              <article
                key={o.title}
                className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 transition-shadow hover:shadow-soft"
              >
                <h3 className="font-semibold text-gray-900">{o.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{o.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Cómo empezar
          </h2>
          <div className="mt-10 space-y-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial empresa */}
      <section className="border-t border-gray-200 bg-gray-100/60 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="text-lg font-medium text-gray-800 sm:text-xl">
              &ldquo;Llevamos seis meses con People en la oficina. Mismo equipo cada semana, facturación clara y cero dolores de cabeza. Lo recomiendo.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-gray-600">
              — Andrés M., <span className="text-gray-500">Director, startup tech</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Solicitar información */}
      <section id="solicitar" className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900">
            Solicitar información para mi empresa
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Deja tus datos y te enviamos una propuesta sin compromiso en menos de 24 horas.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Gracias. En este prototipo no se envían datos. En producción aquí se enviaría el formulario a ventas.');
            }}
          >
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
              <input
                id="empresa"
                type="text"
                name="empresa"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Ej. Mi Empresa S.A.S."
              />
            </div>
            <div>
              <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">Email o teléfono de contacto</label>
              <input
                id="contacto"
                type="text"
                name="contacto"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="correo@empresa.com o +57 300 123 4567"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">¿Qué necesitas? (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Ej. Oficina 200 m², limpieza 3 veces por semana, antes de las 8:00."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-medium text-white shadow-soft transition-shadow hover:bg-gray-800 hover:shadow-soft-md"
            >
              Enviar solicitud
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
