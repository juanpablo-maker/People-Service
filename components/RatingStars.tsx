'use client';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };

export function RatingStars({
  rating,
  max = 5,
  size = 'md',
  showValue = false,
  className = '',
}: RatingStarsProps) {
  const clamped = Math.min(max, Math.max(0, rating));
  const full = Math.floor(clamped);
  const half = clamped - full >= 0.5 ? 1 : 0;
  const empty = max - full - half;
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Valoración: ${clamped.toFixed(1)} de ${max}`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f-${i}`} className={`${s} text-amber-400`} aria-hidden>★</span>
      ))}
      {half > 0 && (
        <span className={`relative inline-block ${s}`} aria-hidden>
          <span className="text-gray-200">★</span>
          <span className="absolute left-0 top-0 overflow-hidden text-amber-400" style={{ width: '50%' }}>★</span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e-${i}`} className={`${s} text-gray-200`} aria-hidden>★</span>
      ))}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-gray-600">
          {clamped.toFixed(1)}
        </span>
      )}
    </div>
  );
}
