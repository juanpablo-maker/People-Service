'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePrototype } from '@/context/PrototypeContext';
import { Timeline } from '@/components/Timeline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, userName, bookings, reviews, addRecurringProfessional, recurringProfessionalIds } = usePrototype();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) router.replace('/login');
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  const upcoming = bookings.filter(
    (b) => b.status !== 'completed' && new Date(b.dateTime) >= new Date()
  );
  const previous = bookings.filter(
    (b) => b.status === 'completed' || new Date(b.dateTime) < new Date()
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Hola, {userName}
      </h1>
      <p className="mt-1 text-gray-600">
        Gestiona tus reservas y reserva nuevos servicios.
      </p>

      <div className="mt-8">
        <Link
          href="/professionals"
          className="inline-block rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-gray-800"
        >
          Reservar un nuevo servicio
        </Link>
      </div>

      {upcoming.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Próximas reservas</h2>
          <div className="mt-4 space-y-4">
            {upcoming.map((b) => (
              <article
                key={b.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{b.professionalName}</p>
                    <p className="mt-1 text-sm text-gray-600">{b.address}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {format(new Date(b.dateTime), "d MMM yyyy, HH:mm", { locale: es })}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${b.totalPrice.toLocaleString('es-CO')} COP · {b.serviceType}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                    {b.status === 'pending' && 'Pendiente'}
                    {b.status === 'accepted' && 'Aceptado'}
                    {b.status === 'in_progress' && 'En curso'}
                  </span>
                </div>
                <div className="mt-4">
                  <Timeline currentStatus={b.status} />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/booking/track/${b.id}`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Ver detalle
                  </Link>
                  <button
                    type="button"
                    onClick={() => addRecurringProfessional(b.professionalId)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {recurringProfessionalIds.includes(b.professionalId) ? '✓ Recurrente' : 'Hacer recurrente'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {previous.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Reservas anteriores</h2>
          <div className="mt-4 space-y-4">
            {previous.map((b) => (
              <article
                key={b.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{b.professionalName}</p>
                    <p className="mt-1 text-sm text-gray-600">{b.address}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {format(new Date(b.dateTime), "d MMM yyyy", { locale: es })}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${b.totalPrice.toLocaleString('es-CO')} COP
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                    Completado
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {b.status === 'completed' && !reviews.some((r) => r.bookingId === b.id) && (
                    <Link
                      href={`/booking/${b.id}/review`}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      Dejar valoración
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => addRecurringProfessional(b.professionalId)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {recurringProfessionalIds.includes(b.professionalId) ? '✓ Recurrente' : 'Hacer recurrente'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {bookings.length === 0 && (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">Aún no tienes reservas.</p>
          <Link
            href="/professionals"
            className="mt-4 inline-block rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Buscar profesional
          </Link>
        </div>
      )}
    </div>
  );
}
