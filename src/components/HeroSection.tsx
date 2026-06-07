'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FRAME_COUNT,
  getDrawableFrame,
  HERO_SEQUENCE_DURATION_MS,
  waitForFirstFrame,
} from '@/lib/frameLoader';
import { usePlayOnceFrame } from '@/hooks/usePlayOnceFrame';

const HERO = {
  designation: 'M87*',
  subtitle: '55 million light years',
  headlineTop: 'Into the',
  headlineBottom: 'Singularity',
};

function drawCoverFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageWidth = img.naturalWidth;
  const imageHeight = img.naturalHeight;

  if (imageWidth <= 0 || imageHeight <= 0) return;

  const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, width, height);
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const frameIndexRef = usePlayOnceFrame(
    FRAME_COUNT,
    HERO_SEQUENCE_DURATION_MS,
    canAnimate
  );

  useEffect(() => {
    let cancelled = false;

    waitForFirstFrame().then(() => {
      if (!cancelled) {
        setCanAnimate(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    let lastDrawnKey = '';
    let animationFrameId = 0;

    const paint = () => {
      resizeCanvas();

      const frameIndex = frameIndexRef.current;
      const frame = getDrawableFrame(frameIndex);
      const drawKey = frame ? `${frameIndex}:${frame.src}` : '';

      if (frame && drawKey !== lastDrawnKey) {
        drawCoverFit(ctx, frame, canvas);
        lastDrawnKey = drawKey;
      }

      animationFrameId = window.requestAnimationFrame(paint);
    };

    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(paint);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [frameIndexRef]);

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Black hole intro animation"
    >
      <div className="hero-section__stage">
        <canvas
          ref={canvasRef}
          className="hero-section__canvas"
          aria-hidden="true"
        />

        <div className="hero-section__glow" aria-hidden="true" />

        <div className="hero-section__vignette" aria-hidden="true" />

        <div className="hero-section__overlay">
          <div className="hero-section__meta">
            <p className="label">{HERO.designation}</p>
            <p className="hero-section__meta-sub">{HERO.subtitle}</p>
          </div>

          <div className="hero-section__headline">
            <h1 className="hero-section__title">
              {HERO.headlineTop}
              <br />
              <span className="hero-section__title-accent">{HERO.headlineBottom}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
