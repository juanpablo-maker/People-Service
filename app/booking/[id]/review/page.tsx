'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { usePrototype } from '@/context/PrototypeContext';
import { RatingStars } from '@/components/RatingStars';

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn, getBooking, addReview, reviews } = usePrototype();
  const id = params.id as string;
  const booking = getBooking(id);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isLoggedIn) {
    router.replace('/login');
    return null;
  }

  const alreadyReviewed = reviews.some((r) => r.bookingId === id);

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

  if (booking.status !== 'completed') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gray-500">Solo puedes valorar reservas completadas.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-accent hover:underline">
          Volver al panel
        </Link>
      </div>
    );
  }

  if (alreadyReviewed || submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <p className="text-gray-900 font-medium">Gracias por tu valoración.</p>
        <p className="mt-1 text-gray-600">
          Tu valoración se ha guardado (prototipo: actualización visual en el perfil del profesional).
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Volver al panel
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) return;
    addReview({
      bookingId: id,
      professionalId: booking.professionalId,
      rating,
      comment: comment.trim() || '',
      customerName: 'Tú', // mock
    });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10">
      <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
        ← Panel
      </Link>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h1 className="text-xl font-semibold text-gray-900">Dejar una valoración</h1>
        <p className="mt-1 text-sm text-gray-600">
          ¿Cómo fue la limpieza con {booking.professionalName}?
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Valoración</label>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={`rounded p-1 text-2xl transition-colors ${
                    n <= rating ? 'text-amber-400' : 'text-gray-200 hover:text-gray-300'
                  }`}
                  aria-label={`${n} estrellas`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comentario (opcional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={1000}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Cuenta tu experiencia..."
            />
          </div>
          <button
            type="submit"
            disabled={rating < 1}
            className="w-full rounded-xl bg-gray-900 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Enviar valoración
          </button>
        </form>
      </div>
    </div>
  );
}
