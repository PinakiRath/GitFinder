import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   MatrixBackground — Subtle ambient canvas
   3 particle depth layers + sparse binary digits + minimal rain columns
   All animation state lives in plain refs — zero React re-renders in the loop.
───────────────────────────────────────────────────────────────────────────── */

const NEON = '#00FF41';
const NEON_DIM = '#00CC33';
const CYAN = '#00E5FF';
const BG = '#0A0E14';

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const BITS = ['0', '1'];
const bit = () => BITS[Math.floor(Math.random() * 2)];

// ── Layer configs ─────────────────────────────────────────────────────────────
// Layer 1 — deep background: tiny, very faint, barely moving
// Layer 2 — mid: slightly brighter, moderate drift
// Layer 3 — foreground accents: rare, brightest, occasional cyan
const LAYERS = [
    { count: 14, rMin: 0.8, rMax: 1.4, sMin: 0.08, sMax: 0.18, oMin: 0.08, oMax: 0.18, blur: 3, cyan: 0.00 },
    { count: 8, rMin: 1.2, rMax: 2.0, sMin: 0.12, sMax: 0.28, oMin: 0.12, oMax: 0.26, blur: 5, cyan: 0.05 },
    { count: 3, rMin: 1.6, rMax: 2.6, sMin: 0.10, sMax: 0.22, oMin: 0.15, oMax: 0.30, blur: 6, cyan: 0.30 },
];

// ── Factories ─────────────────────────────────────────────────────────────────
const makeParticle = (w, h, layer) => ({
    x: rand(0, w),
    y: rand(0, h),
    r: rand(layer.rMin, layer.rMax),
    speed: rand(layer.sMin, layer.sMax),
    opacity: rand(layer.oMin, layer.oMax),
    blur: layer.blur,
    pulse: rand(0, Math.PI * 2),
    color: Math.random() < layer.cyan ? CYAN : NEON,
});

const makeBinary = (w, h) => ({
    x: rand(0, w),
    y: rand(-h * 0.3, h),
    char: bit(),
    speed: rand(0.10, 0.32),
    opacity: rand(0.04, 0.13),
    flipAt: randInt(90, 240),   // frames between character flips
    frame: 0,
});

const makeRain = (w, h) => ({
    x: randInt(0, Math.floor(w / 16)) * 16,
    y: rand(-h * 0.6, -30),
    speed: rand(0.30, 0.70),
    length: randInt(3, 7),
    opacity: rand(0.04, 0.09),
    chars: Array.from({ length: 10 }, bit),
    gap: 14,
});

// ── Component ─────────────────────────────────────────────────────────────────
const MatrixBackground = () => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = 0, H = 0;
        let particles = [];   // all 3 layers flattened
        let binaries = [];
        let rain = [];
        let frame = 0;

        const init = () => {
            // Build particles across all depth layers
            particles = LAYERS.flatMap(layer =>
                Array.from({ length: layer.count }, () => makeParticle(W, H, layer))
            );
            // max 15 binary digits — sparse coverage
            binaries = Array.from({ length: 15 }, () => makeBinary(W, H));
            // max 6 rain columns
            rain = Array.from({ length: 6 }, () => makeRain(W, H));
        };

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            init();
        };

        // ── Draw: particles ───────────────────────────────────────────────────
        const drawParticles = () => {
            for (const p of particles) {
                p.pulse += 0.025;
                const breathe = 0.8 + 0.2 * Math.sin(p.pulse);

                ctx.save();
                ctx.globalAlpha = p.opacity * breathe;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = p.blur;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                p.y -= p.speed;
                if (p.y < -4) {
                    p.y = H + 4;
                    p.x = rand(0, W);
                }
            }
        };

        // ── Draw: binary digits ───────────────────────────────────────────────
        const drawBinaries = () => {
            ctx.font = '11px "JetBrains Mono", monospace';
            for (const b of binaries) {
                b.frame++;
                if (b.frame >= b.flipAt) {
                    b.char = bit();
                    b.frame = 0;
                    b.flipAt = randInt(90, 240);
                }
                ctx.save();
                ctx.globalAlpha = b.opacity;
                ctx.fillStyle = NEON_DIM;
                ctx.fillText(b.char, b.x, b.y);
                ctx.restore();

                b.y -= b.speed;
                if (b.y < -16) {
                    b.y = H + 16;
                    b.x = rand(0, W);
                    b.opacity = rand(0.04, 0.13);
                }
            }
        };

        // ── Draw: rain columns ────────────────────────────────────────────────
        const drawRain = () => {
            ctx.font = '10px "JetBrains Mono", monospace';
            for (const col of rain) {
                for (let i = 0; i < col.length; i++) {
                    const fade = 1 - i / col.length;
                    const alpha = col.opacity * fade * (i === 0 ? 2 : 1);
                    ctx.save();
                    ctx.globalAlpha = Math.min(alpha, 0.20);
                    ctx.fillStyle = i === 0 ? `${CYAN}` : NEON_DIM;
                    if (i === 0) { ctx.shadowColor = CYAN; ctx.shadowBlur = 4; }
                    ctx.fillText(col.chars[i % col.chars.length], col.x, col.y + i * col.gap);
                    ctx.restore();
                }

                col.y += col.speed;
                // Occasionally mutate a character in the stream
                if (frame % 12 === 0) col.chars[randInt(0, col.chars.length - 1)] = bit();
                // Wrap when bottom of column exits screen
                if (col.y - col.length * col.gap > H) {
                    col.y = rand(-H * 0.5, -40);
                    col.x = randInt(0, Math.floor(W / 16)) * 16;
                    col.opacity = rand(0.04, 0.09);
                }
            }
        };

        // ── RAF loop ──────────────────────────────────────────────────────────
        const draw = () => {
            frame++;

            // Dark semi-transparent wipe — creates the trailing fade effect
            // Higher alpha = shorter trail (less noisy)
            ctx.fillStyle = BG;
            ctx.globalAlpha = 0.30;   // was 0.18 — faster fade = cleaner look
            ctx.fillRect(0, 0, W, H);
            ctx.globalAlpha = 1;

            drawRain();
            drawBinaries();
            drawParticles();

            rafRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    );
};

export default MatrixBackground;
