import { useEffect, useRef } from 'react';

export function usePlayOnceFrame(
  frameCount: number,
  durationMs: number,
  active: boolean
) {
  const frameIndexRef = useRef(0);

  useEffect(() => {
    if (!active || frameCount <= 0 || durationMs <= 0) return;

    frameIndexRef.current = 0;
    const startMs = performance.now();
    let animationFrameId = 0;

    const updateFrame = (now: number) => {
      const elapsedMs = now - startMs;
      const progress = Math.min(1, elapsedMs / durationMs);

      frameIndexRef.current = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(updateFrame);
      }
    };

    animationFrameId = window.requestAnimationFrame(updateFrame);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [active, durationMs, frameCount]);

  return frameIndexRef;
}
