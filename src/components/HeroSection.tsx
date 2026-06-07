'use client';

import { useEffect, useRef } from 'react';
import { createWebGLVideoRenderer } from '@/lib/webglVideoRenderer';

const HERO = {
  designation: 'M87*',
  subtitle: '55 million light years',
  headlineTop: 'Into the',
  headlineBottom: 'Singularity',
};

const HERO_VIDEO_WEBM = '/hero.webm';
const HERO_VIDEO_MP4 = '/hero.mp4';
const HERO_POSTER = '/hero-poster.webp';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const renderer = createWebGLVideoRenderer(canvas);
    if (!renderer) return;

    let animationFrameId = 0;
    let started = false;

    const paint = () => {
      if (video.readyState >= 2) {
        renderer.draw(video);
      }

      if (!video.paused && !video.ended) {
        animationFrameId = window.requestAnimationFrame(paint);
      }
    };

    const startPlayback = () => {
      if (started) return;
      started = true;

      video.currentTime = 0;
      void video.play().then(() => {
        animationFrameId = window.requestAnimationFrame(paint);
      });
    };

    const onLoaded = () => {
      renderer.draw(video);
      startPlayback();
    };

    const onEnded = () => {
      renderer.draw(video);
      window.cancelAnimationFrame(animationFrameId);
    };

    const onResize = () => {
      renderer.resize();
      if (video.readyState >= 2) {
        renderer.draw(video);
      }
    };

    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('ended', onEnded);
    window.addEventListener('resize', onResize);

    if (video.readyState >= 2) {
      onLoaded();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('ended', onEnded);
      window.removeEventListener('resize', onResize);
      video.pause();
      renderer.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Black hole intro animation"
    >
      <div className="hero-section__stage">
        <video
          ref={videoRef}
          className="hero-section__video"
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>

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
