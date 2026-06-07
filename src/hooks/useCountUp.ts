'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  end: number;
  start?: number;
  durationMs?: number;
  decimals?: number;
  threshold?: number;
}

export function useCountUp({
  end,
  start = 0.0,
  durationMs = 1800,
  decimals = 0,
  threshold = 0.35,
}: CountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const hasStartedRef = useRef(false);
  const [value, setValue] = useState(start);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStartedRef.current) return;

        hasStartedRef.current = true;
        const animationStart = performance.now();
        const distance = end - start;

        const tick = (nowMs: number) => {
          const progress = Math.min((nowMs - animationStart) / durationMs, 1.0);
          const eased = 1.0 - Math.pow(1.0 - progress, 4.0);
          const nextValue = start + distance * eased;

          setValue(Number(nextValue.toFixed(decimals)));

          if (progress < 1.0) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setValue(end);
          }
        };

        rafRef.current = requestAnimationFrame(tick);
        observer.unobserve(element);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [decimals, durationMs, end, start, threshold]);

  return { value, ref };
}
