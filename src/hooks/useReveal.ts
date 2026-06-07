'use client';

import { useEffect, useRef } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  visibleClassName?: string;
}

export function useReveal<T extends HTMLElement>({
  threshold = 0.18,
  rootMargin = '0px 0px -12% 0px',
  visibleClassName = 'is-visible',
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        element.classList.add(visibleClassName);
        observer.unobserve(element);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, visibleClassName]);

  return ref;
}
