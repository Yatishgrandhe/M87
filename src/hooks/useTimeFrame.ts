import { useEffect, useRef } from 'react';

export function useTimeFrame(frameCount: number, durationMs: number) {
  const frameIndexRef = useRef(0);

  useEffect(() => {
    if (frameCount <= 0 || durationMs <= 0) return;

    const startMs = performance.now();
    let animationFrameId = 0;

    const updateFrame = (now: number) => {
      const elapsedMs = (now - startMs) % durationMs;
      const progress = elapsedMs / durationMs;

      frameIndexRef.current = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );

      animationFrameId = window.requestAnimationFrame(updateFrame);
    };

    animationFrameId = window.requestAnimationFrame(updateFrame);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [durationMs, frameCount]);

  return frameIndexRef;
}
