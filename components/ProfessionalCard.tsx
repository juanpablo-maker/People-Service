'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RatingStars } from './RatingStars';
import type { MockProfessional } from '@/lib/mockData';

interface ProfessionalCardProps {
  professional: MockProfessional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const badgeLabel =
    professional.badge === 'top_rated'
      ? 'Top valorado'
      : professional.badge === 'new'
        ? 'Nuevo'
        : null;

  return (
    <Link href={`/professionals/${professional.id}`} className="block">
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-soft-md">
        <div className="relative aspect-[4/3] bg-gray-100">
          {professional.imageUrl ? (
            <Image
              src={professional.imageUrl}
              alt={professional.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl font-medium text-gray-300">
              {professional.name.charAt(0)}
            </div>
          )}
          {badgeLabel && (
            <span className="absolute right-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-0.5 text-xs font-medium text-white">
              {badgeLabel}
            </span>
          )}
          {professional.emergencyAvailable && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm">
              <span className="text-accent">✓</span>
              Atención urgente
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900">{professional.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <RatingStars rating={professional.rating} showValue size="sm" />
            <span className="text-xs text-gray-500">
              ({professional.totalReviews} valoraciones)
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {professional.yearsExperience} años de experiencia
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-900">
            {professional.basePricePerHour.toLocaleString('es-CO')} COP/h
          </p>
        </div>
      </article>
    </Link>
  );
}
