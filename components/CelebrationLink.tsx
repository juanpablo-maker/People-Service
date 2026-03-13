'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { createCelebrationParticles } from '@/lib/celebration';
import { CelebrationOverlay } from '@/components/CelebrationOverlay';

export function CelebrationLink({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const router = useRouter();
  const [particles, setParticles] = useState<ReturnType<typeof createCelebrationParticles> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setParticles(createCelebrationParticles());
      setTimeout(() => {
        setParticles(null);
        router.push(href);
      }, 1300);
    },
    [href, router]
  );

  return (
    <>
      <a href={href} className={className} onClick={handleClick} {...rest}>
        {children}
      </a>
      <CelebrationOverlay particles={particles} />
    </>
  );
}
