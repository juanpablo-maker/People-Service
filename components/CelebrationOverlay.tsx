'use client';

import type { CelebrationParticle } from '@/lib/celebration';

export function CelebrationOverlay({ particles }: { particles: CelebrationParticle[] | null }) {
  if (!particles?.length) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute text-2xl sm:text-3xl celebration-particle"
            style={{
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
              '--delay': `${p.delay}ms`,
            } as React.CSSProperties}
          >
            {p.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
