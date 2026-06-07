const FRAME_PREFIX = '/frames/';
const FRAME_PAD_DIGITS = 2;
const TOTAL_FRAMES = 50;

export const FRAME_COUNT = TOTAL_FRAMES;

/** Full sequence plays once in 3 seconds, then holds on the last frame. */
export const HERO_SEQUENCE_DURATION_MS = 3000;

const frameElements: (HTMLImageElement | null)[] = Array.from(
  { length: FRAME_COUNT },
  () => null
);

let loadStarted = false;
let firstFramePromise: Promise<void> | null = null;

export function getFrameSrc(index: number) {
  const safeIndex = Math.min(Math.max(index, 0), FRAME_COUNT - 1);
  const frameNumber = safeIndex + 1;
  const paddedFrame = String(frameNumber).padStart(FRAME_PAD_DIGITS, '0');

  return `${FRAME_PREFIX}${paddedFrame}.png`;
}

function isDrawable(img: HTMLImageElement | null) {
  return Boolean(img?.complete && img.naturalWidth > 0);
}

function loadFrame(index: number): Promise<void> {
  if (isDrawable(frameElements[index])) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    if (index === 0) {
      img.fetchPriority = 'high';
    }

    frameElements[index] = img;

    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = getFrameSrc(index);
  });
}

/** Begin loading immediately; frame 0 is prioritized, then the rest in parallel. */
export function startFrameLoading() {
  if (loadStarted) return;
  loadStarted = true;

  if (!firstFramePromise) {
    firstFramePromise = loadFrame(0).then(() => {
      for (let index = 1; index < FRAME_COUNT; index += 1) {
        void loadFrame(index);
      }
    });
  }
}

export function waitForFirstFrame() {
  startFrameLoading();
  return firstFramePromise ?? Promise.resolve();
}

/** Nearest loaded frame at or before `index` (falls back forward if needed). */
export function getDrawableFrame(index: number): HTMLImageElement | null {
  const safeIndex = Math.min(Math.max(index, 0), FRAME_COUNT - 1);

  for (let cursor = safeIndex; cursor >= 0; cursor -= 1) {
    const candidate = frameElements[cursor];
    if (isDrawable(candidate)) {
      return candidate;
    }
  }

  for (let cursor = safeIndex + 1; cursor < FRAME_COUNT; cursor += 1) {
    const candidate = frameElements[cursor];
    if (isDrawable(candidate)) {
      return candidate;
    }
  }

  return null;
}
