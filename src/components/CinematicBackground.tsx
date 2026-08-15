import { useEffect, useRef } from 'react';

/**
 * Scroll-controlled cinematic background.
 *
 * Plays the frame sequence (airplane window → clouds → Denali) on a single
 * fixed canvas, mapped 1:1 to the page's vertical scroll position. The canvas
 * sits behind all site content (z-index 0) and never captures pointer events.
 *
 * Frames are discovered automatically from `public/frames/manifest.json`, which
 * is generated from the directory listing — no filename pattern is assumed.
 *
 * Loading: the first frames are fetched immediately, the rest progressively in
 * batches. Only a small rolling window around the scroll position is decoded,
 * keeping memory bounded. Rendering never blocks on a decode: the previous
 * frame stays on screen until the next one is actually ready.
 */

const DECODE_BEHIND = 3;  // decoded window behind the target frame
const DECODE_AHEAD = 10;  // decoded window ahead of the target frame
const PRELOAD_FIRST = 8;  // frames fetched immediately on mount
const PRELOAD_BATCH = 24; // frames fetched per progressive-load tick
const MAX_DECODE_RETRIES = 3;
const FALLBACK_FRAME_COUNT = 273; // only used if the manifest cannot be fetched

// Slow continuous Ken Burns drift so the background feels alive even when the
// visitor is not scrolling. It is a gentle zoom/pan applied on top of the
// scroll-selected frame — the scroll mapping stays direct and untouched.
const DRIFT_CYCLE = 70;   // seconds for one full drift cycle
const DRIFT_ZOOM = 0.05;  // max extra zoom beyond object-fit cover
const DRIFT_PAN_X = 0.03; // max horizontal pan (fraction of the crop slack)
const DRIFT_PAN_Y = 0.02; // max vertical pan (fraction of the crop slack)

const MANIFEST_URL = 'frames/manifest.json';

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let cancelled = false;
    let rafId = 0;
    let driftRafId = 0;
    let files: string[] = [];

    // Current Ken Burns drift (kept up to date by the idle animation loop;
    // draw() always uses the freshest values).
    const currentDrift = { zoom: 1, panX: 0, panY: 0 };

    // 0 = not requested, 1 = decoding, 2 = decoded, 255 = failed
    const decoded = new Uint8Array(FALLBACK_FRAME_COUNT);
    const decodeAttempts = new Uint8Array(FALLBACK_FRAME_COUNT);
    const imgs: (HTMLImageElement | undefined)[] = new Array(FALLBACK_FRAME_COUNT);
    const state = { current: -1, requested: 0, ticking: false };

    // The scroll animation plays by default on every device. Appending `?static`
    // to the URL forces a static frame 1 instead (for environments that want a
    // reduced-motion experience).
    const forceStatic = new URLSearchParams(window.location.search).has('static');
    const reduceMotion = forceStatic;

    /* ---------- image creation ---------- */

    function frameUrl(i: number) {
      return `frames/${files[i]}`;
    }

    function ensureImage(i: number): HTMLImageElement | undefined {
      if (i < 0 || i >= imgs.length) return undefined;
      if (imgs[i]) return imgs[i];
      const img = new Image();
      img.decoding = 'async';
      img.onerror = () => {
        decoded[i] = 255; // cannot be decoded; never draw this frame
      };
      img.src = frameUrl(i);
      imgs[i] = img;
      return img;
    }

    /* ---------- decode window ---------- */

    function needDecode(i: number) {
      if (i < 0 || i >= imgs.length) return;
      if (decoded[i] === 2 || decoded[i] === 255) return;
      const img = ensureImage(i);
      if (!img) return;

      // Already fully loaded — mark decoded so draw() can render it without
      // waiting on a decode() promise (prevents any permanent hold).
      if (img.complete && img.naturalWidth > 0) {
        decoded[i] = 2;
        if (state.requested === i) draw();
        return;
      }
      if (decoded[i] === 1) return; // a decode is already in flight

      decoded[i] = 1;
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          decoded[i] = 2;
          if (state.requested === i) draw();
        })
        .catch(() => {
          if (cancelled) return;
          decoded[i] = 0;
          if (decodeAttempts[i] < MAX_DECODE_RETRIES) {
            decodeAttempts[i]++;
            setTimeout(() => {
              if (!cancelled) needDecode(i);
            }, 150);
          } else {
            decoded[i] = 255;
          }
        });
    }

    /* ---------- rendering ---------- */

    // Ken Burns drift at a given time in seconds. A slow sine-based cycle keeps
    // the camera breathing without ever breaking the object-fit: cover fill.
    function driftAt(t: number) {
      const p = (((t % DRIFT_CYCLE) + DRIFT_CYCLE) % DRIFT_CYCLE) / DRIFT_CYCLE;
      const a = 2 * Math.PI * p;
      return {
        zoom: 1 + DRIFT_ZOOM * (0.5 - 0.5 * Math.cos(a)),
        panX: DRIFT_PAN_X * Math.sin(a),
        panY: DRIFT_PAN_Y * Math.cos(a),
      };
    }

    function draw() {
      const i = state.requested;
      const img = imgs[i];
      if (!img) return;
      if (decoded[i] !== 2) {
        // Fallback: bytes are in hand and the image is complete — decode
        // synchronously rather than holding the previous frame forever.
        if (img.complete && img.naturalWidth > 0) {
          decoded[i] = 2;
        } else {
          return; // hold the previous frame until the next is ready
        }
      }
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      // object-fit: cover — scale to fill, centered, no distortion.
      const scale = Math.max(cw / iw, ch / ih) * currentDrift.zoom;
      const sw = cw / scale;
      const sh = ch / scale;

      // Base centered crop, then a slow pan within the slack left by the zoom.
      let sx = (iw - sw) / 2 + (iw - sw) * currentDrift.panX;
      let sy = (ih - sh) / 2 + (ih - sh) * currentDrift.panY;
      sx = Math.max(0, Math.min(iw - sw, sx));
      sy = Math.max(0, Math.min(ih - sh, sy));

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      state.current = i;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (state.current >= 0) draw();
    }

    /* ---------- scroll mapping (direct: scroll position = frame) ---------- */

    function update() {
      state.ticking = false;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const i = Math.min(imgs.length - 1, Math.max(0, Math.round(progress * (imgs.length - 1))));

      state.requested = i;

      // Keep a small decoded window around the target so drawing is immediate
      // in both scroll directions.
      for (let k = i - DECODE_BEHIND; k <= i + DECODE_AHEAD; k++) needDecode(k);

      draw();
    }

    function onScroll() {
      if (!state.ticking) {
        state.ticking = true;
        rafId = requestAnimationFrame(update);
      }
    }

    /* ---------- idle life: continuous Ken Burns drift ---------- */

    function driftLoop(now: number) {
      if (cancelled) return;
      const d = driftAt(now / 1000);
      // Redraw only when the drift has moved a visible amount — sub-pixel
      // steps make the slow zoom look smooth while keeping idle cost tiny.
      if (
        Math.abs(d.zoom - currentDrift.zoom) > 2e-5 ||
        Math.abs(d.panX - currentDrift.panX) > 2e-5 ||
        Math.abs(d.panY - currentDrift.panY) > 2e-5
      ) {
        currentDrift.zoom = d.zoom;
        currentDrift.panX = d.panX;
        currentDrift.panY = d.panY;
        draw();
      }
      driftRafId = requestAnimationFrame(driftLoop);
    }

    /* ---------- boot ---------- */

    resize();

    // Paint the base color immediately so there is never a white flash.
    ctx.fillStyle = '#030508';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function startAnimation(manifest: string[]) {
      if (cancelled || manifest.length === 0) return;
      files = manifest;

      if (reduceMotion) {
        // Static background: show frame 1 (airplane window) and stop there.
        needDecode(0);
        return;
      }

      // Progressive preload: first frames immediately, the rest in batches so
      // the page never waits for the full sequence before becoming usable.
      for (let i = 0; i < Math.min(PRELOAD_FIRST, files.length); i++) ensureImage(i);
      let next = PRELOAD_FIRST;
      const pump = () => {
        if (cancelled || next >= files.length) return;
        const to = Math.min(next + PRELOAD_BATCH, files.length);
        for (let i = next; i < to; i++) ensureImage(i);
        next = to;
        setTimeout(pump, 30);
      };
      setTimeout(pump, 120);

      needDecode(0);
      for (let k = 1; k <= DECODE_AHEAD; k++) needDecode(k);
      update();
    }

    fetch(MANIFEST_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('manifest failed'))))
      .then(startAnimation)
      .catch(() => {});

    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
      driftRafId = requestAnimationFrame(driftLoop);
    }
    window.addEventListener('resize', resize);

    // Expose a tiny read-only handle for verification (no UI).
    (window as unknown as Record<string, unknown>).__cinematicState = {
      get current() { return state.current + 1; },
      get requested() { return state.requested + 1; },
      get progress() {
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - window.innerHeight;
        return maxScroll > 0 ? window.scrollY / maxScroll : 0;
      },
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(driftRafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      imgs.length = 0; // release image references
      if ((window as unknown as Record<string, unknown>).__cinematicState) {
        delete (window as unknown as Record<string, unknown>).__cinematicState;
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030508]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
