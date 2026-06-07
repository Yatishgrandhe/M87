import { useEffect, useRef, type RefObject } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useScrollFrame(
  containerRef: RefObject<HTMLElement | null>,
  frameCount: number
) {
  const frameIndexRef = useRef(0);

  useEffect(() => {
    let animationFrameId = 0;

    const updateFrame = () => {
      const container = containerRef.current;

      if (container && frameCount > 0) {
        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        const rawProgress =
          totalScrollable <= 0 ? 0 : clamp(-rect.top / totalScrollable, 0, 1);
        // Slight ease-in so frames advance quickly once scrolling starts.
        const progress = Math.pow(rawProgress, 0.82);

        frameIndexRef.current = Math.round(progress * (frameCount - 1));
      }

      animationFrameId = window.requestAnimationFrame(updateFrame);
    };

    animationFrameId = window.requestAnimationFrame(updateFrame);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [containerRef, frameCount]);

  return frameIndexRef;
}
