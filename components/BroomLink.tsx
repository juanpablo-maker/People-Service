'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const BROOM_EMOJI = '🧹';
const PARTICLE_COUNT = 24;

function createBroomParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angleDeg = (360 / PARTICLE_COUNT) * i + Math.random() * 20;
    const angleRad = (angleDeg * Math.PI) / 180;
    const distance = 100 + Math.random() * 160;
    return {
      id: i,
      emoji: BROOM_EMOJI,
      delay: Math.random() * 100,
      x: Math.cos(angleRad) * distance,
      y: Math.sin(angleRad) * distance,
    };
  });
}

export function BroomLink({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const router = useRouter();
  const [particles, setParticles] = useState<ReturnType<typeof createBroomParticles> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setParticles(createBroomParticles());
      setTimeout(() => {
        setParticles(null);
        router.push(href);
      }, 1200);
    },
    [href, router]
  );

  return (
    <>
      <Link href={href} className={className} onClick={handleClick} {...rest}>
        {children}
      </Link>
      {particles && (
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
      )}
    </>
  );
}
