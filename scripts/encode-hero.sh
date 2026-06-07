#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRAMES="$ROOT/public/frames"
OUT="$ROOT/public"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi

if ! ls "$FRAMES"/[0-9][0-9].png >/dev/null 2>&1; then
  echo "Place numbered frames (01.png … 50.png) in $FRAMES"
  exit 1
fi

ffmpeg -y -start_number 1 -framerate 50/3 -i "$FRAMES/%02d.png" -frames:v 50 \
  -c:v libvpx-vp9 -b:v 1.5M -pix_fmt yuv420p -an "$OUT/hero.webm"

ffmpeg -y -start_number 1 -framerate 50/3 -i "$FRAMES/%02d.png" -frames:v 50 \
  -c:v libx264 -crf 24 -preset fast -pix_fmt yuv420p -movflags +faststart -an "$OUT/hero.mp4"

if command -v cwebp >/dev/null 2>&1; then
  cwebp -q 82 "$FRAMES/01.png" -o "$OUT/hero-poster.webp"
  cwebp -q 80 "$FRAMES/25.png" -o "$OUT/accretion-thumb.webp"
fi

echo "Encoded hero assets in $OUT"
