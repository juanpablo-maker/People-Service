'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePrototype } from '@/context/PrototypeContext';
import { Timeline } from '@/components/Timeline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function BookingTrackPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn, getBooking, updateBookingStatus } = usePrototype();
  const id = params.id as string;
  const booking = getBooking(id);

  if (!isLoggedIn) {
    router.replace('/login');
    return null;
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gray-500">Reserva no encontrada.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-accent hover:underline">
          Volver al panel
        </Link>
      </div>
    );
  }

  const isCompleted = booking.status === 'completed';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
        ← Panel
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
        Seguimiento de reserva
      </h1>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <p className="font-medium text-gray-900">{booking.professionalName}</p>
        <p className="mt-1 text-sm text-gray-600">{booking.address}</p>
        <p className="mt-1 text-sm text-gray-500">
          {format(new Date(booking.dateTime), "d MMM yyyy, HH:mm", { locale: es })}
        </p>
        <p className="mt-2 text-sm font-medium text-gray-900">
          ${booking.totalPrice.toLocaleString('es-CO')} COP · {booking.serviceType}
        </p>
        <div className="mt-6">
          <Timeline currentStatus={booking.status} showDescriptions />
        </div>
        {isCompleted && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-gray-900 py-3 text-center font-medium text-white hover:bg-gray-800"
            >
              Ir al panel
            </Link>
          </div>
        )}
        {/* Prototype: simulate status progression */}
        {!isCompleted && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Prototipo — Simular cambio de estado
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {booking.status === 'pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => updateBookingStatus(booking.id, 'accepted')}
                    className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Rechazar / Cancelar
                  </button>
                </>
              )}
              {booking.status === 'accepted' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(booking.id, 'in_progress')}
                  className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
                >
                  Iniciar servicio
                </button>
              )}
              {booking.status === 'in_progress' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                  className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
                >
                  Marcar completado
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
