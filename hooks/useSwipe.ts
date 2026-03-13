'use client';

import { useCallback, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 50;

export function useSwipe(totalSteps: number, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const touchStart = useRef(0);

  const goTo = useCallback(
    (i: number) => setIndex((prev) => Math.max(0, Math.min(totalSteps - 1, i))),
    [totalSteps]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const delta = touchStart.current - endX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta > 0) setIndex((prev) => Math.min(totalSteps - 1, prev + 1));
      else setIndex((prev) => Math.max(0, prev - 1));
    },
    [totalSteps]
  );

  return { index, goTo, onTouchStart, onTouchEnd };
}
