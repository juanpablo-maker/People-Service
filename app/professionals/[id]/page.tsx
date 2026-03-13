'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_PROFESSIONALS } from '@/lib/mockData';
import { RatingStars } from '@/components/RatingStars';
import { usePrototype } from '@/context/PrototypeContext';

export default function ProfessionalProfilePage() {
  const params = useParams();
  const { reviews } = usePrototype();
  const id = params.id as string;
  const professional = MOCK_PROFESSIONALS.find((p) => p.id === id);

  if (!professional) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gray-500">Profesional no encontrado.</p>
        <Link href="/professionals" className="mt-4 inline-block text-accent hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  const reviewsForPro = reviews.filter((r) => r.professionalId === id);
  const allReviews = [...professional.reviews, ...reviewsForPro.map((r) => ({
    customerName: r.customerName,
    rating: r.rating,
    comment: r.comment,
    date: new Date().toISOString().slice(0, 10),
  }))];

  const displayRating = allReviews.length
    ? allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length
    : professional.rating;
  const displayReviewCount = allReviews.length || professional.totalReviews;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
            <div className="relative aspect-[21/9] bg-gray-100">
              {professional.imageUrl ? (
                <img
                  src={professional.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl font-medium text-gray-300">
                  {professional.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {professional.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <RatingStars rating={displayRating} showValue size="lg" />
                <span className="text-gray-500">{displayReviewCount} valoraciones</span>
                {professional.emergencyAvailable && (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    <span>✓</span> Atención urgente
                  </span>
                )}
              </div>
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Sobre mí
                </h2>
                <p className="mt-2 text-gray-700">{professional.bio}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {professional.yearsExperience} años de experiencia
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Servicios
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {professional.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {allReviews.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900">Valoraciones</h2>
                  <ul className="mt-4 space-y-4">
                    {allReviews.slice(0, 5).map((r, i) => (
                      <li key={i} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={r.rating} size="sm" />
                          <span className="text-sm font-medium text-gray-700">
                            {r.customerName}
                          </span>
                        </div>
                        {r.comment && (
                          <p className="mt-1 text-sm text-gray-600">{r.comment}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-gray-900">
                ${professional.basePricePerHour.toLocaleString('es-CO')}
              </span>
              <span className="text-gray-500"> COP/h</span>
            </div>
            {professional.emergencyAvailable && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <span className="text-accent">✓</span> Atención urgente (×{professional.emergencyMultiplier})
              </p>
            )}
            <Link
              href={`/booking?professionalId=${professional.id}`}
              className="mt-6 block w-full rounded-xl bg-gray-900 py-3.5 text-center font-medium text-white hover:bg-gray-800"
            >
              Reservar con este profesional
            </Link>
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                ¿Por qué elegir a este profesional?
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• {displayReviewCount} valoraciones</li>
                <li>• Valoración media {displayRating.toFixed(1)}/5</li>
                <li>• {professional.yearsExperience} años de experiencia</li>
                {professional.emergencyAvailable && (
                  <li>• Atención urgente disponible</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
