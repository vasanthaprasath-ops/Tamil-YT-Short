// 02 - Pondy streets: why a chess board? (episode file: D:\Personal\Health\Records\episodes\02-pondy-grid.md)
// A 44-second vertical Short (1080x1920, 30 fps) drawn entirely in code in a soft "clay toy-town" look.
// VideoHub contract: window.renderOut(t) draws second t synchronously, as a pure function of t;
// window.READY once fonts are in; window.VH_SCENES lists the 11 shots of the script.
(function () {
  'use strict';
  // timeline.js (written by make-audio.js) stretches the shots to the voice-over; without it, the original 44 s cut
  // timeline.js is written by make-audio.js from the voice: shot cuts and per-word caption timing
  const TL = window.TIMELINE;
  if (!TL) throw new Error('timeline.js missing: run node make-audio.js');
  const W = 1080, H = 1920, DUR = TL.dur;
  const CXS = 504;   // centre of the Shorts safe box (x 90-918): text never runs under the app's side buttons
  const mainCtx = document.getElementById('c').getContext('2d');
  let g = mainCtx;   // every drawing helper draws on g; transitions point g at an off-screen buffer for a moment
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c.getContext('2d'); };
  const bufA = mk(), bufB = mk(), bufF = mk();

  // ---------- palette (episode style sheet v2) ----------
  const P = {
    tur: '#E3A72F', kol: '#F7F3EA', red: '#B23A2E', leaf: '#4C8C3A', ind: '#1F2A44',
    skin: '#7A4A2E', hair: '#16110E', shirt: '#E3A72F', trou: '#6E6E73', scoot: '#F0C23B',   // v2: shirt = style-sheet canon
  };
  // v2 (kit/film-craft.md §4.5): shade mixes toward night indigo, never black; skin keeps a warm shadow
  const SKINS = new Set(['#7A4A2E', '#E8B894', '#C98E6A', '#F0C9A8', '#8B5A3C']);
  let OUTLINING = false;   // true while a character is drawn for outline: drop shadows off (§4.8)
  const TA = '"Nirmala UI", "Latha", "Noto Sans Tamil", sans-serif';
  const EN = '"Segoe UI", system-ui, sans-serif';

  // ---------- small helpers (pure) ----------
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const out3 = x => 1 - Math.pow(1 - clamp(x), 3);
  const in2 = x => clamp(x) * clamp(x);
  const back = x => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const rnd = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const win = (s, a, b, f = 0.15) => clamp((s - a) / f) * (1 - clamp((s - (b - f)) / f));
  function kf(s, keys) {   // eased keyframes [[time, value], ...]
    if (s <= keys[0][0]) return keys[0][1];
    for (let i = 0; i < keys.length - 1; i++) {
      const [a, va] = keys[i], [b, vb] = keys[i + 1];
      if (s <= b) return lerp(va, vb, ease((s - a) / (b - a)));
    }
    return keys[keys.length - 1][1];
  }
  function shade(hex, k) {   // k > 0 towards white, k < 0 towards night indigo (skin: towards warm brown)
    const n = parseInt(hex.slice(1), 16), c = [n >> 16 & 255, n >> 8 & 255, n & 255], a = Math.abs(k);
    const m = k > 0 ? [255, 255, 255] : SKINS.has(hex.toUpperCase()) ? [62, 38, 20] : [31, 42, 68];
    return `rgb(${c.map((v, i) => Math.round(v + (m[i] - v) * a)).join(',')})`;
  }
  // camera helpers (§2): near-linear push, smootherstep glide, impact kick
  const glide = x => { x = clamp(x); return x * x * x * (x * (6 * x - 15) + 10); };
  // blinks (§3.2): per character, seeded gaps 0.5-2.3 s, 4 frames half/shut/shut/half; a pure function of t
  const BLINKS = {};
  function lidAt(id, t) {
    if (!BLINKS[id]) { const a = [], h = k => rnd(id * 97.3 + k * 13.1); let tt = 0.4 + h(0) * 1.5; for (let k = 1; tt < 120; k++) { a.push(tt); tt += 0.5 + h(k) * 1.8; } BLINKS[id] = a; }
    for (const b of BLINKS[id]) { const f = Math.floor((t - b) * 30); if (f >= 0 && f < 4) return [0.5, 0.08, 0.08, 0.5][f]; if (b > t) break; }
    return 1;
  }

  // ---------- drawing primitives ----------
  function rr(x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
  function circ(x, y, r) { g.beginPath(); g.arc(x, y, Math.max(0.01, r), 0, Math.PI * 2); }
  function ell(x, y, rx, ry, rot = 0) { g.beginPath(); g.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rot, 0, Math.PI * 2); }
  function soft(on = true, blur = 16, oy = 7, a = 0.28) {
    if (on && !OUTLINING) { g.shadowColor = `rgba(31,42,68,${a})`; g.shadowBlur = blur; g.shadowOffsetX = oy * 0.6; g.shadowOffsetY = oy; }   // key light upper-left (§4.6)
    else { g.shadowColor = 'rgba(0,0,0,0)'; g.shadowBlur = 0; g.shadowOffsetY = 0; }
  }
  function clayFill(col, y0, y1, lift = 0.2, drop = 0.18) {   // the "clay" look: light top, darker bottom
    const gr = g.createLinearGradient(0, y0, 0, y1);
    gr.addColorStop(0, shade(col, lift)); gr.addColorStop(1, shade(col, -drop));
    g.fillStyle = gr; g.fill();
  }

  // ---------- simple 3D projection for the eye-level shots ----------
  const P3 = (cam, X, Y, Z) => [cam.cx + X * cam.f / Z, cam.hy + (cam.h - Y) * cam.f / Z];
  function quad(cam, pts, fill) {
    g.beginPath();
    pts.forEach((p, i) => { const q = P3(cam, p[0], p[1], p[2]); if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); });
    g.closePath(); g.fillStyle = fill; g.fill();
  }
  const wallRect = (cam, X, z0, z1, y0, y1, fill) => quad(cam, [[X, y0, z0], [X, y1, z0], [X, y1, z1], [X, y0, z1]], fill);
  const zRect = (cam, Z, x0, x1, y0, y1, fill) => quad(cam, [[x0, y0, Z], [x1, y0, Z], [x1, y1, Z], [x0, y1, Z]], fill);

  // ---------- text ----------
  // lines = [[ [text, colour], ... ], ...]; big outlined "sticker" text, auto-shrinks to fit
  function title(lines, x, y, size, a, sc = 1) {
    if (a <= 0) return;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);   // v2: titles are screen-locked, so the camera push never moves them out of the safe box
    g.globalAlpha = clamp(a); g.translate(x, y); g.scale(sc, sc);
    g.textBaseline = 'middle'; g.textAlign = 'left'; g.lineJoin = 'round';
    lines.forEach((segs, i) => {
      let sz = size; const font = z => `800 ${z}px ${TA}`; g.font = font(sz);
      const width = () => segs.reduce((w, [tx]) => w + g.measureText(tx).width, 0);
      while (width() > 800 && sz > 36) { sz -= 4; g.font = font(sz); }
      const yy = i * size * 1.2, x0 = -width() / 2;
      for (const pass of [0, 1]) {
        let cx = x0;
        for (const [tx, col] of segs) {
          if (pass === 0) { soft(true, 22, 10, 0.4); g.strokeStyle = P.ind; g.lineWidth = sz * 0.22; g.strokeText(tx, cx, yy); soft(false); }
          else { g.fillStyle = col; g.fillText(tx, cx, yy); }
          cx += g.measureText(tx).width;
        }
      }
    });
    g.restore();
  }
  // one line of sticker text followed by a drawn icon, centred as a group
  function titleIcon(text, y, size, a, sc, iconW, drawIcon) {
    if (a <= 0) return;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = clamp(a); g.translate(CXS, y); g.scale(sc, sc);
    g.font = `800 ${size}px ${TA}`;
    { const tw0 = g.measureText(text).width; if (tw0 + 34 + iconW > 800) { size = Math.floor(size * (800 - 34 - iconW) / tw0); g.font = `800 ${size}px ${TA}`; } } g.textBaseline = 'middle'; g.textAlign = 'left'; g.lineJoin = 'round';
    const tw = g.measureText(text).width, gap = 34, x0 = -(tw + gap + iconW) / 2;
    soft(true, 22, 10, 0.4); g.strokeStyle = P.ind; g.lineWidth = size * 0.22; g.strokeText(text, x0, 0); soft(false);
    g.fillStyle = P.kol; g.fillText(text, x0, 0);
    drawIcon(x0 + tw + gap, 0);
    g.restore();
  }
  const pop = (s, start, dur = 0.35) => ({ a: clamp((s - start) / (dur * 0.4)), sc: lerp(0.6, 1, back((s - start) / dur)) });
  function wrap(txt, maxW) {
    const out = []; let cur = '';
    for (const w of txt.split(' ')) { const tr = cur ? cur + ' ' + w : w; if (g.measureText(tr).width > maxW && cur) { out.push(cur); cur = w; } else cur = tr; }
    if (cur) out.push(cur);
    return out;
  }

  // ---------- flags and icons ----------
  function flag(x, y, w, h, kind, t = 0, amp = 0) {   // 'fr' = blue/white/red vertical, 'nl' = orange/white/blue horizontal
    const cols = kind === 'fr' ? ['#2F5DA8', '#F7F3EA', '#C8323A'] : ['#E8772E', '#F7F3EA', '#2F5DA8'];
    const off = px => Math.sin((px - x) / w * Math.PI * 1.6 - t * 7) * amp * ((px - x) / w);
    soft(true, 10, 5, 0.3); g.fillStyle = 'rgba(0,0,0,0.001)'; g.fillRect(x, y, w, h); soft(false);
    for (let i = 0; i < 3; i++) {
      let xa = x, xb = x + w, ya = y, yb = y + h;
      if (kind === 'fr') { xa = x + i * w / 3; xb = x + (i + 1) * w / 3 + 0.6; } else { ya = y + i * h / 3; yb = y + (i + 1) * h / 3 + 0.6; }
      g.beginPath();
      for (let j = 0; j <= 8; j++) { const px = lerp(xa, xb, j / 8); if (j) g.lineTo(px, ya + off(px)); else g.moveTo(px, ya + off(px)); }
      for (let j = 8; j >= 0; j--) { const px = lerp(xa, xb, j / 8); g.lineTo(px, yb + off(px)); }
      g.closePath(); g.fillStyle = cols[i]; g.fill();
    }
  }
  function flagIcon(kind, t) {   // a flag on a little pole, for titles
    return (x, y) => {
      g.strokeStyle = P.ind; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 6, y + 55); g.lineTo(x + 6, y - 55); g.stroke();
      g.strokeStyle = '#D9C9A8'; g.lineWidth = 6; g.stroke();
      g.save(); g.strokeStyle = P.ind; g.lineWidth = 10; g.lineJoin = 'round'; g.strokeRect(x + 10, y - 52, 100, 66); g.restore();
      flag(x + 10, y - 52, 100, 66, kind, t, 5);
    };
  }
  function checkIcon(x, y, k) {
    g.lineCap = 'round'; g.lineJoin = 'round';
    for (const [c, lw] of [[P.ind, 26], ['#5DBB4E', 15]]) {
      g.strokeStyle = c; g.lineWidth = lw; g.beginPath();
      g.moveTo(x, y); g.lineTo(x + 26 * k, y + 26 * k);
      if (k > 0.5) g.lineTo(x + 26 + 44 * (k - 0.5) * 2, y + 26 - 60 * (k - 0.5) * 2);
      g.stroke();
    }
  }

  // ---------- characters ----------
  function head(x, y, r, look, expr, t, id = 0) {
    const fx = x + look * r * 0.32;
    g.save();
    soft(true, 18, 8);
    g.fillStyle = shade(P.skin, -0.08);
    ell(x - r * 0.95 + look * r * 0.18, y + r * 0.06, r * 0.2, r * 0.27); g.fill();
    ell(x + r * 0.95 + look * r * 0.18, y + r * 0.06, r * 0.2, r * 0.27); g.fill();
    circ(x, y, r);
    const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r * 1.05);
    gr.addColorStop(0, shade(P.skin, 0.22)); gr.addColorStop(1, shade(P.skin, -0.1));   // v2: edge darkening -0.20 -> -0.10 (§3.5)
    g.fillStyle = gr; g.fill();
    soft(false);
    g.fillStyle = 'rgba(255,214,170,0.2)'; ell(x - r * 0.42, y - r * 0.38, r * 0.3, r * 0.2, -0.5); g.fill();   // small warm highlight, not diffuse light
    // hair: a cap clipped to the head, a side-parted swoop and some volume on top
    g.fillStyle = P.hair;
    g.save(); circ(x, y, r * 1.03); g.clip();
    ell(x + look * r * 0.08, y - r * 0.86, r * 1.2, r * 0.6); g.fill();
    ell(x - r * 0.42 + look * r * 0.1, y - r * 0.5, r * 0.5, r * 0.26, -0.45); g.fill();
    g.fillRect(x - r * 1.05, y - r * 0.6, r * 0.2, r * 0.55); g.fillRect(x + r * 0.85, y - r * 0.6, r * 0.2, r * 0.55);
    g.restore();
    ell(x + look * r * 0.05, y - r * 0.86, r * 0.95, r * 0.26); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = r * 0.04; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - r * 0.3 + look * r * 0.1, y - r * 1.12); g.quadraticCurveTo(x - r * 0.36, y - r * 0.85, x - r * 0.28 + look * r * 0.1, y - r * 0.62); g.stroke();
    // eyes (v2, §3.2/3.5/3.8): almond whites, 0.27 W apart, per-character seeded 4-frame blinks
    const blink = lidAt(id, t), ey = y - r * 0.02, ex = r * 0.27, pd = look * r * 0.04;
    for (const sx of [-1, 1]) {
      g.save(); ell(fx + sx * ex, ey, r * 0.16, r * 0.13 * blink); g.fillStyle = '#F7F3EA'; g.fill(); g.clip();
      g.fillStyle = '#1A1210'; ell(fx + sx * ex + pd, ey + r * 0.01, r * 0.085, r * 0.1); g.fill();
      if (blink === 1) { g.fillStyle = 'rgba(255,255,255,0.9)'; circ(fx + sx * ex + pd + r * 0.03, ey - r * 0.03, r * 0.03); g.fill(); }
      g.restore();
      if (blink < 1) { g.strokeStyle = '#1A0E0C'; g.lineWidth = r * 0.035; g.beginPath(); g.moveTo(fx + sx * ex - r * 0.16, ey); g.lineTo(fx + sx * ex + r * 0.16, ey); g.stroke(); }
    }
    // brows (v2, §3.6): near-black, tapered 0.05 W -> 0.025 W, 0.17 W long; they carry the emotion
    g.fillStyle = '#16110E';
    for (const sx of [-1, 1]) {
      const raise = expr === 'confused' && sx === 1 ? r * 0.13 : (expr === 'smile' || expr === 'big') ? r * 0.06 : 0;
      const tilt = expr === 'confused' && sx === -1 ? r * 0.06 : 0;
      const ix = fx + sx * (ex - r * 0.17), ox = fx + sx * (ex + r * 0.17), iy = ey - r * 0.27 - raise + tilt, oy = ey - r * 0.25 - raise - tilt, my = ey - r * 0.34 - raise;
      g.beginPath();
      g.moveTo(ix, iy - r * 0.05); g.quadraticCurveTo(fx + sx * ex, my - r * 0.04, ox, oy - r * 0.025);
      g.lineTo(ox, oy + r * 0.025); g.quadraticCurveTo(fx + sx * ex, my + r * 0.06, ix, iy + r * 0.05); g.closePath(); g.fill();
    }
    // nose, moustache, mouth
    g.fillStyle = shade(P.skin, -0.18); ell(fx + look * r * 0.06, y + r * 0.2, r * 0.11, r * 0.09); g.fill();
    g.strokeStyle = P.hair; g.lineWidth = r * 0.065;
    g.beginPath(); g.moveTo(fx - r * 0.24, y + r * 0.39); g.quadraticCurveTo(fx, y + r * 0.3, fx + r * 0.24, y + r * 0.39); g.stroke();
    if (expr === 'smile' || expr === 'big') {
      const d = expr === 'big' ? 0.86 : 0.7;
      g.beginPath(); g.moveTo(fx - r * 0.27, y + r * 0.47); g.quadraticCurveTo(fx, y + r * d, fx + r * 0.27, y + r * 0.47); g.closePath();
      g.fillStyle = '#5A1E1A'; g.fill();
      g.save(); g.clip(); g.fillStyle = '#FFF8EE'; g.fillRect(fx - r * 0.3, y + r * 0.45, r * 0.6, r * 0.09); g.restore();
      g.fillStyle = 'rgba(230,120,110,0.18)'; for (const sx of [-1, 1]) { circ(fx + sx * r * 0.5, y + r * 0.32, r * 0.16); g.fill(); }
    } else if (expr === 'confused') {
      g.fillStyle = '#2A0E0C'; ell(fx + r * 0.06, y + r * 0.57, r * 0.07, r * 0.09); g.fill();
    } else {
      g.strokeStyle = '#1A0E0C'; g.lineWidth = r * 0.1; g.lineCap = 'round'; g.beginPath(); g.moveTo(fx - r * 0.13, y + r * 0.56); g.lineTo(fx + r * 0.13, y + r * 0.55); g.stroke();   // v2: near-black closed mouth (§3.5)
    }
    g.restore();
  }

  // standing body, feet at (x, y); about 210 units tall below the neck
  function body(x, y, k, o, t) {
    g.save(); g.translate(x, y); g.scale(k, k);
    if (!OUTLINING) { soft(false); g.fillStyle = 'rgba(31,42,68,0.3)'; ell(0, 2, 64, 11); g.fill(); }   // contact blob (§4.7); drawn outside the outline pass
    soft(true, 12, 6);
    for (const sx of [-1, 1]) { rr(sx * 19 - 12, -112, 24, 110, 10); clayFill(o.trou, -112, 0); }
    g.fillStyle = '#3A2A22'; for (const sx of [-1, 1]) { ell(sx * 21, -5, 18, 9); g.fill(); }
    const sway = 0;   // v2: still unless acting (§3.1); was an always-on sine sway
    for (const sx of [-1, 1]) {
      g.save(); g.translate(sx * 40, -182); g.rotate(-sx * (0.13 + sway));
      rr(-9, 0, 18, 72, 9); clayFill(o.skin, 0, 72);
      circ(0, 76, 11); g.fillStyle = shade(o.skin, -0.06); g.fill();
      if (o.watch && sx === 1) { soft(false); g.fillStyle = '#16161A'; rr(-10, 54, 20, 9, 3); g.fill(); g.fillStyle = '#C9CDD3'; circ(0, 58.5, 3.6); g.fill(); soft(true, 12, 6); }
      g.restore();
    }
    rr(-45, -198, 90, 96, 24); clayFill(o.shirt, -198, -102);
    for (const sx of [-1, 1]) { ell(sx * 42, -180, 17, 21, sx * 0.25); clayFill(o.shirt, -200, -160); }
    soft(false);
    g.fillStyle = shade(o.shirt, -0.22); g.beginPath(); g.moveTo(-17, -198); g.lineTo(0, -176); g.lineTo(17, -198); g.closePath(); g.fill();
    g.fillStyle = shade(o.shirt, 0.35); for (let i = 0; i < 3; i++) { circ(0, -166 + i * 20, 2.6); g.fill(); }
    g.fillStyle = shade(o.skin, -0.12); rr(-10, -210, 20, 16, 6); g.fill();
    g.restore();
  }
  function maniStand(x, y, k, look, expr, t) {
    body(x, y, k, { shirt: P.shirt, trou: P.trou, skin: P.skin, watch: true }, t);
    head(x, y - 240 * k, 36 * k, look, expr, t);
  }
  function touristHead(x, y, r, o, t) {
    const yy = y + Math.max(0, Math.sin(t * 4.2 + o.ph)) * r * 0.2;
    g.save();
    soft(true, 16, 7); circ(x, yy, r);
    const gr = g.createRadialGradient(x - r * 0.35, yy - r * 0.4, r * 0.1, x, yy, r * 1.05);
    gr.addColorStop(0, shade(o.skin, 0.2)); gr.addColorStop(1, shade(o.skin, -0.18)); g.fillStyle = gr; g.fill(); soft(false);
    g.strokeStyle = '#4A1C18'; g.lineWidth = r * 0.08; g.lineCap = 'round';
    g.beginPath(); g.arc(x, yy + r * 0.28, r * 0.3, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
    g.fillStyle = '#15171C';
    rr(x - r * 0.64, yy - r * 0.2, r * 0.56, r * 0.32, r * 0.12); g.fill(); rr(x + r * 0.08, yy - r * 0.2, r * 0.56, r * 0.32, r * 0.12); g.fill();
    g.fillRect(x - r * 0.1, yy - r * 0.12, r * 0.2, r * 0.06);
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x - r * 0.5, yy - r * 0.15, r * 0.14, r * 0.06); g.fillRect(x + r * 0.22, yy - r * 0.15, r * 0.14, r * 0.06);
    soft(true, 10, 5);
    g.fillStyle = o.hat; ell(x, yy - r * 0.55, r * 1.5, r * 0.32); g.fill();
    rr(x - r * 0.7, yy - r * 1.25, r * 1.4, r * 0.8, r * 0.35); clayFill(o.hat, yy - r * 1.25, yy - r * 0.45);
    soft(false); g.fillStyle = o.band; g.fillRect(x - r * 0.7, yy - r * 0.68, r * 1.4, r * 0.14);
    g.restore();
  }

  function wheel(cx, cy, r, ang) {
    g.fillStyle = '#26242A'; circ(cx, cy, r); g.fill();
    g.fillStyle = '#BFC3C9'; circ(cx, cy, r * 0.55); g.fill();
    g.strokeStyle = '#8E939B'; g.lineWidth = 5;
    for (let i = 0; i < 3; i++) { const a = ang + i * Math.PI * 2 / 3; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5); g.stroke(); }
    g.fillStyle = '#5B5F66'; circ(cx, cy, r * 0.15); g.fill();
  }
  // side-view scooter facing right; (x, y) = ground under its middle; rider = {look, expr}
  function scooter(x, y, k, lean, rider, t) {
    g.save(); g.translate(x, y); g.rotate(lean); g.scale(k, k);
    soft(false); g.fillStyle = 'rgba(30,20,20,0.28)'; ell(0, 2, 215, 18); g.fill();
    const spin = x / (48 * k);
    wheel(-140, -48, 48, spin); wheel(150, -48, 48, spin);
    soft(true, 14, 7);
    ell(-122, -118, 102, 58); clayFill(P.scoot, -176, -60);
    rr(-60, -96, 175, 30, 12); clayFill('#D9AA2A', -96, -66);
    g.beginPath(); g.moveTo(92, -66); g.lineTo(130, -66); g.lineTo(160, -246); g.quadraticCurveTo(150, -266, 128, -262); g.lineTo(106, -250); g.closePath();
    clayFill(P.scoot, -266, -66);
    g.beginPath(); g.arc(150, -48, 60, Math.PI * 1.05, Math.PI * 1.95); g.lineWidth = 18; g.strokeStyle = P.scoot; g.stroke();
    soft(false);
    rr(-205, -192, 170, 28, 14); clayFill('#5A3A2A', -192, -164);
    g.strokeStyle = '#3A3A40'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(140, -255); g.lineTo(128, -300); g.stroke();
    rr(92, -316, 84, 18, 9); g.fillStyle = '#3A3A40'; g.fill();
    g.fillStyle = P.kol; circ(160, -266, 18); g.fill(); g.fillStyle = 'rgba(255,240,200,0.7)'; circ(156, -270, 8); g.fill();
    g.fillStyle = P.red; rr(-228, -128, 16, 22, 6); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.35)'; rr(-180, -150, 110, 7, 4); g.fill();
    if (rider) {
      g.lineCap = 'round';
      soft(true, 10, 5);
      g.save(); g.translate(-115, -205); g.rotate(0.1); rr(-48, -160, 96, 170, 40); clayFill(P.shirt, -160, 10); g.restore();
      g.strokeStyle = P.trou; g.lineWidth = 40; g.beginPath(); g.moveTo(-120, -206); g.lineTo(5, -212); g.stroke();
      g.lineWidth = 34; g.beginPath(); g.moveTo(5, -212); g.lineTo(28, -102); g.stroke();
      g.fillStyle = '#3A2A22'; ell(44, -92, 30, 14); g.fill();
      g.fillStyle = shade(P.skin, -0.12); rr(-112, -392, 26, 34, 8); g.fill();
      ell(-82, -336, 30, 26, 0.3); clayFill(P.shirt, -362, -310);
      g.strokeStyle = P.skin; g.lineWidth = 26; g.beginPath(); g.moveTo(-62, -326); g.lineTo(100, -308); g.stroke();
      g.fillStyle = shade(P.skin, -0.05); circ(112, -307, 17); g.fill();
      soft(false);
      head(-98, -424, 52, rider.look, rider.expr, t);
    }
    g.restore();
  }

  // ---------- eye-level street (shots 1 and 11) ----------
  const STREET = (() => {
    const out = { L: [], R: [] };
    for (const [arr, side] of [[out.L, -1], [out.R, 1]]) {
      let z = 2.5, i = 0;
      while (z < 76) {
        const len = 5.5 + rnd(i * 7 + side * 3) * 4;
        arr.push({ z0: z, z1: z + len, h: 6.9 + rnd(i * 5 + side) * 2.6, col: ['#EFC25A', '#F4EEE2', '#E9B9A4', '#F2D58A'][Math.floor(rnd(i * 11 + side * 13) * 4)], bou: rnd(i * 3 + side * 17) > 0.45, door: rnd(i * 13 + side) > 0.4, i: i + (side > 0 ? 100 : 0) });
        z += len; i++;
      }
    }
    return out;
  })();
  function bougainvillea(cam, X, y, z, len, id) {
    for (const leaf of [true, false]) {
      for (let i = 0; i < 10; i++) {
        const pz = z + rnd(id * 31 + i) * len * 0.45, py = y - rnd(id * 17 + i) * 1.6 + (leaf ? 0.2 : 0), p = P3(cam, X, py, pz), r = (leaf ? 0.45 : 0.32) * cam.f / pz;
        g.fillStyle = leaf ? (i % 2 ? '#3F7A32' : '#4C8C3A') : ['#D94C8A', '#E86AA0', '#C73A78'][i % 3];
        circ(p[0], p[1], r); g.fill();
      }
    }
  }
  function frenchHouseSide(cam, X, hs) {
    const { z0, z1, h, col } = hs, side = Math.sign(X), wallCol = side < 0 ? col : shade(col, -0.1);
    wallRect(cam, X, z0, z1, 0, h, wallCol);
    wallRect(cam, X, z0, z1, 0, 0.6, shade(col, -0.22));
    wallRect(cam, X, z0, z1, h - 0.55, h - 0.3, '#FBF8F1');
    wallRect(cam, X, z0, z1, 3.35, 3.55, 'rgba(255,255,255,0.7)');
    wallRect(cam, X, z0, z0 + 0.18, 0, h, shade(col, -0.25));
    const len = z1 - z0, n = Math.max(1, Math.floor(len / 2.5));
    for (let k = 0; k < n; k++) {
      const zc = z0 + len * (k + 0.5) / n;
      for (const yb of [1.0, 4.0]) {
        if (yb === 1.0 && k === 0 && hs.door) {
          wallRect(cam, X, zc - 0.6, zc + 0.6, 0, 2.6, '#FBF8F1'); wallRect(cam, X, zc - 0.48, zc + 0.48, 0, 2.5, '#2F5A6B');
        } else {
          wallRect(cam, X, zc - 0.5, zc + 0.5, yb - 0.1, yb + 2.0, '#FBF8F1');
          wallRect(cam, X, zc - 0.4, zc + 0.4, yb, yb + 1.9, '#3B4D68');
          wallRect(cam, X, zc - 0.88, zc - 0.52, yb, yb + 1.9, '#3F7F8C');
          wallRect(cam, X, zc + 0.52, zc + 0.88, yb, yb + 1.9, '#3F7F8C');
        }
      }
    }
    if (hs.bou) bougainvillea(cam, X - side * 0.2, h - 0.8, z0 + len * 0.25, len, hs.i);
  }
  function street(cx) {
    const cam = { cx, hy: 860, h: 1.5, f: 1000 };
    const sk = g.createLinearGradient(0, 0, 0, cam.hy); sk.addColorStop(0, '#86BEDD'); sk.addColorStop(1, '#F5DEB2');
    g.fillStyle = sk; g.fillRect(0, 0, W, cam.hy + 1);
    g.fillStyle = '#CBB898'; g.fillRect(0, cam.hy, W, H - cam.hy);
    zRect(cam, 78, -8, 8, 0, 9, '#F1E7D3');
    for (let k = -2; k <= 2; k++) for (const yb of [1, 4]) zRect(cam, 77.9, k * 2.6 - 0.45, k * 2.6 + 0.45, yb, yb + 1.9, '#3B4D68');
    quad(cam, [[-3.6, 0, 1], [3.6, 0, 1], [3.6, 0, 78], [-3.6, 0, 78]], '#C4B091');
    quad(cam, [[-0.6, 0.001, 1], [0.6, 0.001, 1], [0.6, 0.001, 78], [-0.6, 0.001, 78]], 'rgba(255,255,255,0.08)');
    for (const sd of [-1, 1]) {
      quad(cam, [[sd * 3.6, 0.12, 1], [sd * 4.5, 0.12, 1], [sd * 4.5, 0.12, 78], [sd * 3.6, 0.12, 78]], '#E2D4B8');
      quad(cam, [[sd * 3.6, 0, 1], [sd * 3.6, 0.12, 1], [sd * 3.6, 0.12, 78], [sd * 3.6, 0, 78]], '#B9A584');
    }
    for (const [arr, X] of [[STREET.L, -4.5], [STREET.R, 4.5]]) for (let i = arr.length - 1; i >= 0; i--) frenchHouseSide(cam, X, arr[i]);
    for (const z of [34, 14]) for (const sd of [-1, 1]) {   // street lamps
      const a = P3(cam, sd * 4.1, 0.12, z), b = P3(cam, sd * 4.1, 4.8, z), sc = cam.f / z;
      g.strokeStyle = '#2C2C34'; g.lineWidth = 0.13 * sc; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
      g.fillStyle = '#FFE9B0'; circ(b[0], b[1] - 0.15 * sc, 0.25 * sc); g.fill();
    }
  }

  // ---------- top-down toy town (shots 2, 7) ----------
  const TOWN = { x0: 40, y0: 140, bw: 150, bh: 150, st: 36, cols: 5, rows: 9, seaX: 975 };
  const SCOOT = { x: 394, y: 1052 };          // a street crossing (between columns 1|2 and rows 4|5)
  const CANAL_X = 580;                         // the street between column 2 (Tamil side) and column 3 (French side)
  function town(t, o = {}) {
    g.fillStyle = '#D8C9AC'; g.fillRect(-600, -600, TOWN.seaX + 600, H + 1200);
    const sg = g.createLinearGradient(TOWN.seaX, 0, TOWN.seaX + 500, 0); sg.addColorStop(0, '#5FB3C9'); sg.addColorStop(1, '#2C6E96');
    g.fillStyle = sg; g.fillRect(TOWN.seaX - 10, -600, 900, H + 1200);
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 3;
    for (let j = 0; j < 6; j++) {
      const ph = ((t * 0.25 + j / 6) % 1);
      g.globalAlpha = 1 - ph; g.beginPath();
      for (let y = -600; y <= H + 600; y += 30) { const xx = TOWN.seaX + 20 + ph * 160 + Math.sin(y / 70 + j * 2) * 6; if (y === -600) g.moveTo(xx, y); else g.lineTo(xx, y); }
      g.stroke();
    }
    g.globalAlpha = 1;
    g.fillStyle = '#EBD7A8'; g.beginPath(); g.moveTo(TOWN.seaX - 30, -600);
    for (let y = -600; y <= H + 600; y += 40) g.lineTo(TOWN.seaX + 10 + Math.sin(y / 90 + t * 0.8) * 6, y);
    g.lineTo(TOWN.seaX - 30, H + 600); g.closePath(); g.fill();
    for (let c = 0; c < TOWN.cols; c++) for (let r = 0; r < TOWN.rows; r++) {
      const bx = TOWN.x0 + c * (TOWN.bw + TOWN.st), by = TOWN.y0 + r * (TOWN.bh + TOWN.st), tamil = c < 3, id = c * 20 + r;
      g.fillStyle = 'rgba(60,40,30,0.25)'; rr(bx + 5, by + 7, TOWN.bw, TOWN.bh, 14); g.fill();
      g.fillStyle = tamil ? '#E6D3B4' : '#EDE3CF'; rr(bx, by, TOWN.bw, TOWN.bh, 14); g.fill();
      for (let q = 0; q < 4; q++) {
        const hx = bx + 6 + (q % 2) * 72, hy = by + 6 + Math.floor(q / 2) * 72, hw = 66, hh = 66, sd = rnd(id * 4 + q);
        g.fillStyle = 'rgba(50,30,20,0.3)'; rr(hx + 4, hy + 6, hw, hh, 8); g.fill();
        if (tamil) {
          const col = sd < 0.5 ? '#C0623B' : '#B4553A';
          rr(hx, hy, hw, hh, 8); clayFill(col, hy, hy + hh, 0.15, 0.15);
          g.strokeStyle = shade(col, -0.3); g.lineWidth = 2.5; g.beginPath(); g.moveTo(hx + 8, hy + hh / 2); g.lineTo(hx + hw - 8, hy + hh / 2); g.stroke();
          g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 1.5;
          for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(hx + i * hw / 6, hy + 5); g.lineTo(hx + i * hw / 6, hy + hh - 5); g.stroke(); }
        } else {
          const col = ['#F0C65A', '#F4EEE2', '#F2D58A', '#EBD9C4'][Math.floor(sd * 4)];
          rr(hx, hy, hw, hh, 6); clayFill(col, hy, hy + hh, 0.12, 0.12);
          g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 3; rr(hx + 5, hy + 5, hw - 10, hh - 10, 4); g.stroke();
          if (sd > 0.55) for (let i = 0; i < 5; i++) { g.fillStyle = i % 2 ? '#D94C8A' : '#4C8C3A'; circ(hx + 8 + rnd(id + i) * 18, hy + 8 + rnd(id * 3 + i) * 18, 7); g.fill(); }
        }
      }
      if (rnd(id + 99) > 0.6) { g.fillStyle = 'rgba(30,50,20,0.3)'; circ(bx + 79, by + 81, 22); g.fill(); g.fillStyle = '#4C8C3A'; circ(bx + 75, by + 75, 22); g.fill(); g.fillStyle = '#62A64C'; circ(bx + 69, by + 69, 10); g.fill(); }
      if (o.checker > 0 && (c + r) % 2 === 0) { g.fillStyle = `rgba(31,42,68,${0.42 * o.checker})`; rr(bx, by, TOWN.bw, TOWN.bh, 14); g.fill(); }
    }
    if (o.canal > 0) canal(t, o.canal);
  }
  function canal(t, p) {
    const yTop = 100, yBot = 1806, yEnd = lerp(yTop, yBot, clamp(p * 1.25)), hw = 17;
    g.fillStyle = '#7A5A3A'; g.fillRect(CANAL_X - hw - 5, yTop, hw * 2 + 10, yEnd - yTop);
    const wg = g.createLinearGradient(CANAL_X - hw, 0, CANAL_X + hw, 0); wg.addColorStop(0, '#2E6F99'); wg.addColorStop(0.5, '#4FA6CF'); wg.addColorStop(1, '#2E6F99');
    g.fillStyle = wg; g.fillRect(CANAL_X - hw, yTop, hw * 2, yEnd - yTop);
    const q = clamp((p - 0.8) / 0.2), xEnd = lerp(CANAL_X, TOWN.seaX + 20, q);
    if (q > 0) { g.fillStyle = '#7A5A3A'; g.fillRect(CANAL_X - hw - 5, 1785, xEnd - CANAL_X + hw + 5, 2 * hw + 10); g.fillStyle = '#4FA6CF'; g.fillRect(CANAL_X - hw, 1790, xEnd - CANAL_X + hw, 2 * hw); }
    if (p < 0.8) for (let i = 0; i < 6; i++) { g.fillStyle = '#8B6B48'; circ(CANAL_X + (rnd(i + Math.floor(t * 12)) - 0.5) * 60, yEnd + rnd(i * 3 + Math.floor(t * 12)) * 30, 5 + rnd(i) * 5); g.fill(); }
    g.strokeStyle = 'rgba(255,255,255,0.65)'; g.lineWidth = 4; g.lineCap = 'round';
    for (let y = yTop + ((t * 170) % 60); y < yEnd - 10; y += 60) { g.beginPath(); g.moveTo(CANAL_X, y); g.lineTo(CANAL_X, y + 18); g.stroke(); }
    if (q > 0) for (let x = CANAL_X + ((t * 170) % 60); x < xEnd - 10; x += 60) { g.beginPath(); g.moveTo(x, 1805); g.lineTo(x + 18, 1805); g.stroke(); }
  }
  function topScooter(x, y) {
    g.fillStyle = 'rgba(40,25,20,0.3)'; rr(x - 13, y - 4, 30, 14, 6); g.fill();
    g.fillStyle = P.scoot; rr(x - 16, y - 8, 32, 16, 7); g.fill();
    g.fillStyle = P.shirt; ell(x - 3, y, 7, 9); g.fill();
    g.fillStyle = P.hair; circ(x - 2, y, 5); g.fill();
  }
  // v2 tilt-shift (§4.4): the top-down town reads as a clay miniature. Sharp band around the subject, 12 px blur
  // outside, feathered. Works in screen space on whatever g is drawing into.
  const bufS = mk();
  function tiltShift(y0, y1) {
    const c = g.canvas, fe = 0.12 * H;
    bufS.setTransform(1, 0, 0, 1, 0, 0); bufS.globalCompositeOperation = 'source-over'; bufS.clearRect(0, 0, W, H);
    bufS.filter = 'blur(12px)'; bufS.drawImage(c, 0, 0); bufS.filter = 'none';
    const m = bufS.createLinearGradient(0, 0, 0, H);
    m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(Math.max(0, y0 - fe / H), 'rgba(0,0,0,1)'); m.addColorStop(y0, 'rgba(0,0,0,0)');
    m.addColorStop(y1, 'rgba(0,0,0,0)'); m.addColorStop(Math.min(1, y1 + fe / H), 'rgba(0,0,0,1)'); m.addColorStop(1, 'rgba(0,0,0,1)');
    bufS.globalCompositeOperation = 'destination-in'; bufS.fillStyle = m; bufS.fillRect(0, 0, W, H); bufS.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(bufS.canvas, 0, 0); g.restore();
  }
  function cam2d(cx, cy, sc, rot) { g.translate(W / 2, H / 2); g.rotate(rot); g.scale(sc, sc); g.translate(-cx, -cy); }

  // ---------- old map on a table (shots 5, 6) ----------
  const MAP = { x: 110, y: 470, w: 860, h: 880 };
  const GX = MAP.x + 60, GY = MAP.y + 80, GW = 540, GH = 720;
  const GRID = (() => {
    const s = [];
    for (let j = 0; j <= 6; j++) s.push([GX, GY + j * GH / 6, GX + GW, GY + j * GH / 6]);
    for (let i = 0; i <= 5; i++) s.push([GX + i * GW / 5, GY, GX + i * GW / 5, GY + GH]);
    return s;
  })();
  function table() {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#5A3820'); gr.addColorStop(1, '#3E2614');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(255,220,170,0.06)'; g.lineWidth = 3;
    for (let i = 0; i < 26; i++) { const y = rnd(i) * H; g.beginPath(); for (let x = 0; x <= W; x += 60) { const yy = y + Math.sin(x / 170 + i) * 10; if (x) g.lineTo(x, yy); else g.moveTo(x, yy); } g.stroke(); }
    const L = g.createRadialGradient(540, 820, 60, 540, 900, 1150); L.addColorStop(0, 'rgba(255,200,120,0.22)'); L.addColorStop(1, 'rgba(0,0,0,0.4)');
    g.fillStyle = L; g.fillRect(0, 0, W, H);
    // props: ink pot + quill, brass dividers
    soft(true, 18, 9, 0.45);
    ell(190, 1720, 70, 30); g.fillStyle = '#1D1A22'; g.fill(); rr(140, 1640, 100, 80, 26); clayFill('#2A2632', 1640, 1720);
    soft(false); g.fillStyle = '#0E0C12'; ell(190, 1645, 32, 10); g.fill();
    g.strokeStyle = '#EDE4D0'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(200, 1640); g.quadraticCurveTo(250, 1500, 330, 1430); g.stroke();
    g.fillStyle = 'rgba(237,228,208,0.85)'; ell(300, 1470, 16, 60, 0.75); g.fill();
    g.strokeStyle = '#C9A24A'; g.lineWidth = 9; g.beginPath(); g.moveTo(880, 1520); g.lineTo(820, 1760); g.moveTo(880, 1520); g.lineTo(950, 1750); g.stroke();
    g.fillStyle = '#C9A24A'; circ(880, 1520, 14); g.fill();
  }
  function builder(x, y, t, ph) {
    const bob = Math.abs(Math.sin(t * 9 + ph)) * 4;
    g.save(); g.translate(x, y - bob);
    soft(true, 6, 3, 0.35);
    g.fillStyle = P.tur; rr(-7, -22, 14, 18, 5); g.fill();
    g.fillStyle = '#8A5A3C'; circ(0, -28, 6); g.fill();
    soft(false);
    g.fillStyle = P.red; ell(0, -32, 7, 3.5); g.fill();
    g.strokeStyle = '#5A3A24'; g.lineWidth = 3; g.save(); g.translate(6, -16); g.rotate(-0.6 + Math.sin(t * 14 + ph) * 0.7); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -16); g.stroke(); g.fillStyle = '#555'; g.fillRect(-4, -19, 8, 5); g.restore();
    g.restore();
  }
  function ship(x, y, k, kind, t) {
    g.save(); g.translate(x, y + Math.sin(t * 2.2) * 4 * k); g.rotate(Math.sin(t * 1.8) * 0.05); g.scale(k, k);
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 3;
    for (let i = 1; i <= 3; i++) { g.globalAlpha = 0.6 - i * 0.15; g.beginPath(); g.moveTo(-30 - i * 10, -40 - i * 26); g.lineTo(0, -12); g.lineTo(30 + i * 10, -40 - i * 26); g.stroke(); }
    g.globalAlpha = 1;
    soft(true, 10, 6, 0.35);
    g.beginPath(); g.moveTo(-62, 0); g.lineTo(62, 0); g.quadraticCurveTo(54, 26, 30, 30); g.lineTo(-38, 30); g.quadraticCurveTo(-60, 22, -62, 0); g.closePath();
    clayFill('#7A4A28', 0, 30);
    soft(false); g.fillStyle = P.tur; g.fillRect(-54, 7, 108, 5);
    g.strokeStyle = '#4A2E1A'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -150); g.stroke();
    soft(true, 8, 4, 0.25);
    g.beginPath(); g.moveTo(-36, -100); g.quadraticCurveTo(0, -112, 36, -100); g.quadraticCurveTo(46, -74, 34, -48); g.quadraticCurveTo(0, -40, -34, -48); g.quadraticCurveTo(-46, -74, -36, -100); g.closePath();
    clayFill(P.kol, -110, -40, 0.05, 0.12);
    g.beginPath(); g.moveTo(-24, -138); g.quadraticCurveTo(0, -146, 24, -138); g.quadraticCurveTo(30, -122, 22, -108); g.quadraticCurveTo(0, -103, -22, -108); g.quadraticCurveTo(-30, -122, -24, -138); g.closePath();
    clayFill(P.kol, -146, -103, 0.05, 0.12);
    soft(false);
    flag(2, -170, 40, 24, kind, t, 3);
    g.restore();
  }
  // the map: p = unrolled fraction, ink = grid lines drawn, roads = streets laid by the builders
  function oldMap(s, p, ink, roads) {
    g.save(); g.beginPath(); g.rect(MAP.x - 40, MAP.y - 40, MAP.w * p + 40, MAP.h + 80); g.clip();
    soft(true, 34, 16, 0.5); rr(MAP.x, MAP.y, MAP.w, MAP.h, 10);
    const pg = g.createLinearGradient(MAP.x, MAP.y, MAP.x + MAP.w, MAP.y + MAP.h); pg.addColorStop(0, '#EFE1BD'); pg.addColorStop(1, '#D6BF8C');
    g.fillStyle = pg; g.fill(); soft(false);
    for (let i = 0; i < 7; i++) { const st = g.createRadialGradient(0, 0, 0, 0, 0, 1); st.addColorStop(0, 'rgba(140,100,50,0.13)'); st.addColorStop(1, 'rgba(140,100,50,0)'); g.save(); g.translate(MAP.x + rnd(i + 5) * MAP.w, MAP.y + rnd(i + 9) * MAP.h); g.scale(60 + rnd(i) * 90, 60 + rnd(i) * 90); g.fillStyle = st; circ(0, 0, 1); g.fill(); g.restore(); }
    const cx0 = MAP.x + 650;
    g.beginPath(); g.moveTo(cx0, MAP.y + 30);
    for (let y = MAP.y + 30; y <= MAP.y + MAP.h - 30; y += 20) g.lineTo(cx0 + Math.sin(y / 55) * 10 + Math.sin(y / 23) * 4, y);
    g.lineTo(MAP.x + MAP.w - 30, MAP.y + MAP.h - 30); g.lineTo(MAP.x + MAP.w - 30, MAP.y + 30); g.closePath();
    g.fillStyle = 'rgba(70,130,160,0.35)'; g.fill();
    g.strokeStyle = '#6B4A2E'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx0, MAP.y + 30);
    for (let y = MAP.y + 30; y <= MAP.y + MAP.h - 30; y += 20) g.lineTo(cx0 + Math.sin(y / 55) * 10 + Math.sin(y / 23) * 4, y);
    g.stroke();
    g.strokeStyle = 'rgba(60,90,110,0.45)'; g.lineWidth = 2;
    for (let i = 0; i < 14; i++) { const x = cx0 + 40 + rnd(i + 3) * 120, y = MAP.y + 60 + rnd(i + 8) * (MAP.h - 120); g.beginPath(); g.moveTo(x - 10, y); g.quadraticCurveTo(x - 5, y - 5, x, y); g.quadraticCurveTo(x + 5, y + 5, x + 10, y); g.stroke(); }
    g.strokeStyle = '#6B4A2E'; g.lineWidth = 4; g.strokeRect(MAP.x + 18, MAP.y + 18, MAP.w - 36, MAP.h - 36);
    g.lineWidth = 1.5; g.strokeRect(MAP.x + 28, MAP.y + 28, MAP.w - 56, MAP.h - 56);
    // compass rose in the sea corner
    g.save(); g.translate(MAP.x + 770, MAP.y + MAP.h - 110); g.strokeStyle = '#6B4A2E'; g.fillStyle = '#7A5534'; g.lineWidth = 2;
    circ(0, 0, 34); g.stroke();
    for (let i = 0; i < 4; i++) { g.rotate(Math.PI / 2); g.beginPath(); g.moveTo(0, -46); g.lineTo(8, 0); g.lineTo(-8, 0); g.closePath(); g.fill(); }
    g.restore();
    // ink grid lines
    g.strokeStyle = '#5B3B22'; g.lineWidth = 3; g.lineCap = 'round';
    GRID.forEach((sg, n) => {
      const f = clamp((ink * 15 - n) / 2.5); if (f <= 0) return;
      g.beginPath(); g.moveTo(sg[0], sg[1]); g.lineTo(lerp(sg[0], sg[2], f), lerp(sg[1], sg[3], f)); g.stroke();
    });
    // streets laid along the lines
    if (roads > 0) {
      const heads = [];
      GRID.forEach((sg, n) => {
        const f = clamp((roads * 11.35 - n * 0.75) / 1.6); if (f <= 0) return;
        const ex = lerp(sg[0], sg[2], f), ey = lerp(sg[1], sg[3], f);
        soft(true, 8, 4, 0.35); g.strokeStyle = '#EFE3C6'; g.lineWidth = 20; g.beginPath(); g.moveTo(sg[0], sg[1]); g.lineTo(ex, ey); g.stroke(); soft(false);
        g.strokeStyle = 'rgba(120,90,60,0.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(sg[0], sg[1]); g.lineTo(ex, ey); g.stroke();
        if (f < 1) heads.push([ex, ey, n]);
      });
      heads.forEach(([x, y, n]) => builder(x, y + 4, s, n));
    }
    g.restore();
    // the paper roll at the unrolled edge
    const xr = MAP.x + MAP.w * p;
    soft(true, 18, 8, 0.45);
    rr(xr - 24, MAP.y - 14, 48, MAP.h + 28, 24);
    const cg = g.createLinearGradient(xr - 24, 0, xr + 24, 0); cg.addColorStop(0, '#BFA572'); cg.addColorStop(0.45, '#F2E4C2'); cg.addColorStop(1, '#A88D5C');
    g.fillStyle = cg; g.fill(); soft(false);
  }

  // ---------- shots ----------
  function ribbon(s, snap) {
    const pts = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([lerp(-120, 1200, u), 600 + Math.sin(u * Math.PI * 2.2 + s * 2.6) * 70 * (1 + snap) + Math.sin(u * 9 + s * 4) * 12]); }
    g.save();
    if (snap > 0) { g.translate(540, 600); g.rotate(-snap * 0.5); g.translate(-540 + snap * 1400, -600 - snap * 900); }
    g.lineCap = 'round'; g.lineJoin = 'round';
    ['#2F5DA8', '#F7F3EA', '#C8323A'].forEach((c, j) => {
      if (j === 0) soft(true, 14, 10, 0.3); else soft(false);
      g.strokeStyle = c; g.lineWidth = 21; g.beginPath();
      pts.forEach((p, i) => { if (i) g.lineTo(p[0], p[1] + (j - 1) * 19); else g.moveTo(p[0], p[1] + (j - 1) * 19); });
      g.stroke();
    });
    g.restore();
  }
  const TOURISTS = [
    { x: 175, shirt: '#4C8C3A', hat: '#F3E2B5', band: P.red, skin: '#E8B894', ph: 0 },
    { x: 410, shirt: '#B23A2E', hat: '#F7F3EA', band: '#2F5DA8', skin: '#C98E6A', ph: 0.9 },
    { x: 660, shirt: '#2F5DA8', hat: '#E3A72F', band: P.ind, skin: '#F0C9A8', ph: 1.7 },
    { x: 900, shirt: '#E3A72F', hat: '#F3E2B5', band: P.leaf, skin: '#8B5A3C', ph: 2.4 },
  ];
  // v2 outline (§4.8): draw the characters off-screen with drop shadows off, stamp a tinted copy 8 times around
  // (2.2x thicker on the bottom/shadow side), then the characters on top. px is screen pixels, not scaled by zoom.
  const bufO = mk(), bufT = mk(), bufK = mk();
  function outlined(px, drawFn) {
    const old = g, tr = g.getTransform();
    bufO.setTransform(1, 0, 0, 1, 0, 0); bufO.clearRect(0, 0, W, H); bufO.setTransform(tr); bufO.globalAlpha = 1; bufO.filter = 'none';
    g = bufO; OUTLINING = true; soft(false); drawFn(); OUTLINING = false; g = old;
    bufO.setTransform(1, 0, 0, 1, 0, 0);
    bufT.setTransform(1, 0, 0, 1, 0, 0); bufT.globalCompositeOperation = 'source-over'; bufT.clearRect(0, 0, W, H); bufT.drawImage(bufO.canvas, 0, 0);
    bufT.globalCompositeOperation = 'source-in'; bufT.fillStyle = '#2A1A14'; bufT.fillRect(0, 0, W, H); bufT.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'none';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, dy = Math.sin(a) * px; g.drawImage(bufT.canvas, Math.cos(a) * px, dy > 0 ? dy * 2.2 : dy); }
    g.drawImage(bufO.canvas, 0, 0);
    g.restore();
  }
  function shot3(s, opt = {}) {
    const pk = 1 + 0.06 * clamp(s / 3);
    g.save(); g.translate(W / 2, H * 0.55); g.scale(pk, pk); g.translate(-W / 2, -H * 0.55);
    g.filter = 'blur(8px)';   // v2: background blur behind the characters (§4.1); characters stay sharp
    const sk = g.createLinearGradient(0, 0, 0, 760); sk.addColorStop(0, '#7FBFE0'); sk.addColorStop(1, '#F7E3B8');
    g.fillStyle = sk; g.fillRect(-100, -100, W + 200, 870);
    const sea = g.createLinearGradient(0, 760, 0, 1060); sea.addColorStop(0, '#4D9AC0'); sea.addColorStop(1, '#2F6F96');
    g.fillStyle = sea; g.fillRect(-100, 760, W + 200, 300);
    g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 3;
    for (let i = 0; i < 14; i++) { const y = 780 + i * 20, x0 = ((rnd(i) * W + s * 40 * (1 + i * 0.1)) % (W + 300)) - 150; g.beginPath(); g.moveTo(x0, y); g.quadraticCurveTo(x0 + 40, y - 6, x0 + 80 + i * 6, y); g.stroke(); }
    g.fillStyle = '#D9C7A5'; g.fillRect(-100, 1060, W + 200, H);
    g.strokeStyle = 'rgba(120,95,60,0.25)'; g.lineWidth = 2;
    for (let i = 0; i < 9; i++) { const y = 1100 + i * i * 9; g.beginPath(); g.moveTo(-100, y); g.lineTo(W + 100, y); g.stroke(); }
    soft(true, 10, 6, 0.3);
    for (let x = -60; x < W + 100; x += 90) { rr(x, 960, 16, 110, 6); clayFill('#EFE6D2', 960, 1070); }
    rr(-100, 950, W + 200, 22, 10); clayFill('#F4EDDE', 950, 972);
    soft(false);
    g.filter = 'none';
    TOURISTS.forEach(p => { g.fillStyle = 'rgba(31,42,68,0.3)'; ell(p.x, 1383, 64 * 1.45, 11 * 1.45); g.fill(); });
    outlined(4, () => TOURISTS.forEach(p => {
      body(p.x, 1380, 1.45, { shirt: p.shirt, trou: '#E6DCC8', skin: p.skin, ph: p.ph }, s);
      touristHead(p.x, 1380 - 240 * 1.45, 36 * 1.45, p, s);
    }));
    g.restore();
    if (!opt.noRibbon) ribbon(s, 0);
    if (!opt.noText) { const pp = pop(s, 0.3); titleIcon('French?', 300, 128, pp.a, pp.sc, 110, flagIcon('fr', s)); }
  }
  function shot4(s) {
    const old = g; g = bufF; g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.clearRect(0, 0, W, H);
    shot3(2.95, { noRibbon: true, noText: true });
    g = old;
    const punch = 1 + 0.05 * (1 - out3(s / 0.3));
    g.save(); g.translate(W / 2, H / 2); g.scale(punch, punch); g.translate(-W / 2, -H / 2);
    g.filter = 'grayscale(0.85) contrast(1.15) brightness(0.9)'; g.drawImage(bufF.canvas, 0, 0); g.filter = 'none';
    g.restore();
    const sn = in2((s - 0.1) / 0.55);
    if (sn < 1) ribbon(2.95 + s * 0.3, sn);
    const fl = 1 - clamp(s / 0.22);
    if (fl > 0) { g.fillStyle = `rgba(255,255,255,${fl * 0.85})`; g.fillRect(0, 0, W, H); }
    const k = back((s - 0.35) / 0.35);
    if (k > 0) {
      g.save(); g.translate(CXS, 380); g.rotate(-0.07); g.scale(k, k);
      g.font = `800 96px ${TA}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const bw = Math.min(820, g.measureText('முழு உண்மை இல்ல!').width + 120);
      soft(true, 24, 12, 0.4); g.fillStyle = P.red; rr(-bw / 2, -100, bw, 200, 44); g.fill(); soft(false);
      g.strokeStyle = P.kol; g.lineWidth = 8; rr(-bw / 2 + 18, -82, bw - 36, 164, 32); g.stroke();
      g.fillStyle = P.kol; g.fillText('முழு உண்மை இல்ல!', 0, 6, 700);
      g.restore();
    }
  }
  function rain(s, a) {
    if (a <= 0) return;
    g.save(); g.strokeStyle = `rgba(220,235,255,${0.5 * a})`; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath();
    for (let i = 0; i < 170; i++) {
      const sp = 1500 + rnd(i + 7) * 700, y = ((rnd(i + 3) * (H + 200) + s * sp) % (H + 200)) - 100, x = rnd(i) * (W + 300) - 50 - y * 0.15;
      g.moveTo(x, y); g.lineTo(x - 10, y + 48);
    }
    g.stroke(); g.restore();
  }
  // ---------- shot 8: the canal, Tamil town on the left, French town on the right ----------
  const CAM8 = { cx: 540, hy: 800, h: 1.6, f: 1100 };
  const CANALST = (() => {
    const L = [], R = []; let z = 6, i = 0;
    while (z < 70) { const len = 5 + rnd(i * 3 + 0.5) * 3.5; L.push({ z0: z, z1: z + len, h: 4.0 + rnd(i * 7 + 1) * 0.6, col: ['#F1E9DA', '#E9D6A8', '#D9E2E4', '#EBD1B9'][Math.floor(rnd(i * 5 + 2) * 4)], i }); z += len; i++; }
    z = 6; i = 0;
    while (z < 70) { const len = 5.5 + rnd(i * 9 + 0.7) * 3.5; R.push({ z0: z, z1: z + len, h: 7.0 + rnd(i * 4 + 3) * 2, col: ['#EFC25A', '#F4EEE2', '#F2D58A', '#EFC25A'][Math.floor(rnd(i * 6 + 4) * 4)], bou: rnd(i * 8 + 5) > 0.4, door: true, i: i + 200 }); z += len; i++; }
    return { L, R };
  })();
  function kolamGround(cam, X, z) {
    const p = P3(cam, X, 0.02, z), sc = cam.f / z;
    g.save(); g.translate(p[0], p[1]); g.scale(1, 0.3);
    g.strokeStyle = 'rgba(250,248,240,0.9)'; g.fillStyle = 'rgba(250,248,240,0.95)'; g.lineWidth = 0.05 * sc;
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { circ(a * 0.22 * sc, b * 0.22 * sc, 0.035 * sc); g.fill(); }
    circ(0, 0, 0.42 * sc); g.stroke();
    for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + Math.PI / 4; circ(Math.cos(an) * 0.42 * sc, Math.sin(an) * 0.42 * sc, 0.12 * sc); g.stroke(); }
    g.restore();
  }
  // canal half-width CX, house fronts at HX (both sides)
  const CX = 2.2, HX = 3.7;
  function tamilHouseSide(cam, hs) {
    const X = -HX, { z0, z1, h, col } = hs, zc = (z0 + z1) / 2, TE = X + 0.8, PX = X + 0.95, RX = X + 1.15;
    quad(cam, [[X, h, z0], [X - 1.6, h + 1.5, z0], [X - 1.6, h + 1.5, z1], [X, h, z1]], '#9E4A31');
    wallRect(cam, X, z0, z1, 0, h, col);
    wallRect(cam, X, z0, z0 + 0.15, 0, h, shade(col, -0.2));
    wallRect(cam, X, zc - 0.6, zc + 0.6, 0.7, 2.9, '#E8DCC4'); wallRect(cam, X, zc - 0.48, zc + 0.48, 0.7, 2.8, '#5B3A24');
    for (const wz of [z0 + 1.0, z1 - 1.0]) wallRect(cam, X, wz - 0.35, wz + 0.35, 1.4, 2.4, '#2E3A4E');
    quad(cam, [[X, 0.7, z0 + 0.2], [TE, 0.7, z0 + 0.2], [TE, 0.7, z1 - 0.2], [X, 0.7, z1 - 0.2]], '#E0D2B6');
    wallRect(cam, TE, z0 + 0.2, z1 - 0.2, 0, 0.7, '#B8A687');
    wallRect(cam, TE, z0 + 0.2, z1 - 0.2, 0, 0.18, P.red);
    for (const pz of [z0 + 0.6, zc - 1.2, zc + 1.2, z1 - 0.6]) wallRect(cam, PX, pz - 0.1, pz + 0.1, 0.7, 3.55, '#6E4326');
    quad(cam, [[X, h - 0.1, z0], [RX, 3.4, z0], [RX, 3.4, z1], [X, h - 0.1, z1]], '#B9573A');
    g.strokeStyle = 'rgba(80,30,15,0.35)';
    for (let z = z0 + 0.4; z < z1; z += 0.45) { const a = P3(cam, X, h - 0.1, z), b = P3(cam, RX, 3.4, z); g.lineWidth = Math.max(1, 0.04 * cam.f / z); g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); }
    quad(cam, [[RX, 3.4, z0], [RX + 0.05, 3.25, z0], [RX + 0.05, 3.25, z1], [RX, 3.4, z1]], '#8A3F27');
    kolamGround(cam, -CX - 0.4, zc);
  }
  function shot8(s, lookKeys, expr) {
    const cam = CAM8, t = s + 27;
    const sk = g.createLinearGradient(0, 0, 0, cam.hy); sk.addColorStop(0, '#9CC9E4'); sk.addColorStop(1, '#F7D9A6');
    g.fillStyle = sk; g.fillRect(0, 0, W, cam.hy);
    g.fillStyle = '#4D9AC0'; g.fillRect(0, cam.hy - 10, W, 14);
    g.fillStyle = '#D3C2A2'; g.fillRect(0, cam.hy + 4, W, H);
    const wg = g.createLinearGradient(0, cam.hy, 0, H); wg.addColorStop(0, '#5AA6C8'); wg.addColorStop(1, '#2F6F96');
    quad(cam, [[-CX, -0.5, 1.2], [CX, -0.5, 1.2], [CX, -0.5, 80], [-CX, -0.5, 80]], wg);
    g.strokeStyle = 'rgba(255,255,255,0.4)'; g.lineCap = 'round';
    for (let i = 0; i < 46; i++) {
      const z = 2 + rnd(i + 3) * 60, x = (rnd(i + 11) * 2 - 1) * (CX - 0.5) + Math.sin(t * 1.5 + i) * 0.2, a = P3(cam, x - 0.3, -0.5, z), b = P3(cam, x + 0.3, -0.5, z);
      g.lineWidth = Math.max(1, 0.07 * cam.f / z); g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
    }
    for (const X of [-CX, CX]) quad(cam, [[X, 0, 1.2], [X, -0.5, 1.2], [X, -0.5, 80], [X, 0, 80]], '#A3937A');
    for (let i = CANALST.L.length - 1; i >= 0; i--) tamilHouseSide(cam, CANALST.L[i]);
    for (let i = CANALST.R.length - 1; i >= 0; i--) frenchHouseSide(cam, HX, CANALST.R[i]);
    // the bridge: back railing, deck, Mani, front face with its arch
    for (let x = -2.7; x <= 2.71; x += 0.675) zRect(cam, 4.6, x - 0.06, x + 0.06, 0.3, 1.22, '#E7DDC6');
    zRect(cam, 4.6, -2.85, 2.85, 1.18, 1.32, '#F2EADA');
    quad(cam, [[-2.9, 0.3, 3.3], [2.9, 0.3, 3.3], [2.9, 0.3, 4.7], [-2.9, 0.3, 4.7]], '#C9B48E');
    const look = kf(s, lookKeys);
    const feet = P3(cam, 0, 0.3, 4.0);
    maniStand(feet[0], feet[1], (1.7 * cam.f / 4.0) / 274, look, expr, t);
    zRect(cam, 3.3, -2.9, 2.9, -0.6, 0.3, '#B19C78');
    const ac = P3(cam, 0, -0.6, 3.3), sc = cam.f / 3.3;
    g.fillStyle = '#244656'; g.beginPath(); g.ellipse(ac[0], ac[1], 1.7 * sc, 0.55 * sc, 0, Math.PI, 2 * Math.PI); g.fill();
  }

  // ---------- shot 9: close-up, the phone map ----------
  function miniMap(x, y, w, h, s) {
    g.fillStyle = '#EADFC6'; g.fillRect(x, y, w, h);
    g.fillStyle = '#5FA8C8'; g.fillRect(x + w * 0.84, y, w * 0.16, h);
    const cols = 4, rows = 8, bw = w * 0.84 / cols, bh = h / rows;
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { g.fillStyle = c < 2 ? '#D9A486' : '#F0D58A'; rr(x + c * bw + 6, y + r * bh + 6, bw - 12, bh - 12, 6); g.fill(); }
    const cx = x + 2 * bw, pulse = 0.5 + 0.5 * Math.sin(s * 5);
    g.strokeStyle = `rgba(79,166,207,${0.35 + 0.3 * pulse})`; g.lineWidth = 22; g.beginPath(); g.moveTo(cx, y); g.lineTo(cx, y + h); g.stroke();
    g.strokeStyle = '#2F7FB0'; g.lineWidth = 10; g.stroke();
    const py = y + h * 0.45 - Math.abs(Math.sin(s * 4)) * 14;
    g.fillStyle = P.red; g.beginPath(); g.arc(cx, py - 22, 16, Math.PI, 0); g.lineTo(cx, py); g.closePath(); g.fill();
    g.fillStyle = P.kol; circ(cx, py - 22, 6); g.fill();
  }
  function shot9(s) {
    const pk = 1 + 0.08 * ease(s / 4);
    g.save(); g.translate(W / 2, H * 0.5); g.scale(pk, pk); g.translate(-W / 2, -H * 0.5);
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#A8D0E6'); bg.addColorStop(0.55, '#F2D6A2'); bg.addColorStop(1, '#5A9EC0');
    g.fillStyle = bg; g.fillRect(-60, -60, W + 120, H + 120);
    for (let i = 0; i < 9; i++) {   // out-of-focus town behind him
      const x = rnd(i + 21) * W, y = 500 + rnd(i + 31) * 900, r = 120 + rnd(i + 41) * 160, col = ['rgba(239,194,90,0.5)', 'rgba(185,87,58,0.45)', 'rgba(247,243,234,0.5)', 'rgba(76,140,58,0.35)'][i % 4];
      const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    const bob = Math.sin(s * 2.2) * 6;
    soft(true, 30, 14, 0.35);
    rr(110, 1150 + bob, 720, 900, 200); clayFill(P.shirt, 1150, 2000);
    soft(false);
    g.fillStyle = shade(P.shirt, -0.22); g.beginPath(); g.moveTo(380, 1160 + bob); g.lineTo(470, 1290 + bob); g.lineTo(560, 1160 + bob); g.closePath(); g.fill();
    g.fillStyle = shade(P.skin, -0.12); rr(405, 1000 + bob, 130, 180, 50); g.fill();
    head(470, 830 + bob, 190, 0.2, 'big', s + 33);
    // phone rises into view
    const up = (1 - out3(s / 0.55)) * 700;
    g.save(); g.translate(790, 960 + up + bob); g.rotate(-0.06); g.scale(0.86, 0.86);
    g.strokeStyle = P.skin; g.lineWidth = 80; g.lineCap = 'round'; g.beginPath(); g.moveTo(40, 620); g.lineTo(-10, 300); g.stroke();
    g.fillStyle = '#16161A'; rr(-50, 380, 80, 30, 8); g.fill();   // watch on his left wrist
    soft(true, 24, 12, 0.4); rr(-150, -270, 300, 540, 38); g.fillStyle = '#1C1D22'; g.fill(); soft(false);
    g.save(); rr(-136, -252, 272, 504, 28); g.clip(); miniMap(-136, -252, 272, 504, s); g.restore();
    g.fillStyle = shade(P.skin, 0.05); ell(-150, 150, 40, 70, 0.2); g.fill(); ell(-10, 280, 95, 70); g.fill();
    g.restore();
    g.restore();
  }

  // ---------- v2 shots: each cut lands on the voice (timeline.js); every shot keeps moving ----------
  const HOOK_TITLE = [[['திட்டுங்க', P.kol]], [['Dutch-அ!', P.tur]]];   // v10 hook (locked with Vasanth 2026-11-14)   // v9b: hook A (Vasanth's pick, 2026-11-14)
  // Mani's scooter route through the grid streets (street centres: x 208/394/580/766, y 308 + 186k)
  const ROUTE = [[394, 1560], [394, 1238], [766, 1238], [766, 866], [208, 866], [208, 494], [580, 494]];
  function routeAt(d) {
    for (let i = 0; i < ROUTE.length - 1; i++) {
      const [x0, y0] = ROUTE[i], [x1, y1] = ROUTE[i + 1], len = Math.hypot(x1 - x0, y1 - y0);
      if (d <= len || i === ROUTE.length - 2) { const k = clamp(d / len); return { x: lerp(x0, x1, k), y: lerp(y0, y1, k), ang: Math.atan2(y1 - y0, x1 - x0) }; }
      d -= len;
    }
  }
  function topScooterR(x, y, ang, s) {   // top-down scooter pointing along ang, with a little speed trail
    g.save(); g.translate(x, y); g.rotate(ang); g.scale(2.4, 2.4);
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 3; g.lineCap = 'round';
    for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-24 - i * 4, (i - 1) * 7); g.lineTo(-54 - i * 10 - Math.sin(s * 20 + i) * 6, (i - 1) * 7); g.stroke(); }
    g.fillStyle = 'rgba(40,25,20,0.3)'; rr(-13, -4, 30, 14, 6); g.fill();
    g.fillStyle = P.scoot; rr(-16, -8, 32, 16, 7); g.fill();
    g.fillStyle = P.shirt; ell(-3, 0, 7, 9); g.fill();
    g.fillStyle = P.hair; circ(-2, 0, 5); g.fill();
    g.restore();
  }
  const HOOK_SPEED = 480, HOOK_SCALE = 2.1, HOOK_DY = 110;
  function hookCam(d) { const c = routeAt(Math.max(0, d - 70)); return [c.x, c.y + HOOK_DY]; }
  function hook(s) {
    const d = s * HOOK_SPEED, p = routeAt(d), [cx, cy] = hookCam(d);
    g.save(); cam2d(cx, cy, HOOK_SCALE, 0); town(s); topScooterR(p.x, p.y, p.ang, s); g.restore();   // v2: no continuous roll (§2.7)
    tiltShift(0.27, 0.5);   // the scooter sits at about y 0.38
    // dizzy question marks circling him
    const sx = W / 2 + (p.x - cx) * HOOK_SCALE, sy = H / 2 + (p.y - cy) * HOOK_SCALE;
    g.font = `900 46px ${EN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    for (let i = 0; i < 3; i++) {
      const a = s * 4 + i * Math.PI * 2 / 3, x = sx + Math.cos(a) * 70, y = sy - 40 + Math.sin(a) * 26, k = clamp((s - 0.4 - i * 0.15) / 0.2);
      if (k <= 0) continue;
      g.globalAlpha = k; g.strokeStyle = P.kol; g.lineWidth = 9; g.strokeText('?', x, y); g.fillStyle = P.red; g.fillText('?', x, y);
    }
    g.globalAlpha = 1;
    title(HOOK_TITLE, CXS, 300, 100, 1, 1);
  }
  function lost(s) {
    const e = ease(s / 0.25);   // whip: the next street slides in, and it is identical
    if (e < 1) {
      g.save(); g.beginPath(); g.rect(0, 0, W * (1 - e), H); g.clip(); street(540 - e * W); g.restore();
      g.save(); g.beginPath(); g.rect(W * (1 - e), 0, W * e + 1, H); g.clip(); street(540 + W * (1 - e)); g.restore();
    } else street(540);
    const look = kf(s, [[0, 0.4], [0.35, -1], [0.8, -1], [1.0, 1], [1.4, 1], [1.6, 0]]);
    const pk = 1 + 0.05 * ease(s / 2);
    g.save(); g.translate(470, 1380); g.scale(pk, pk); g.translate(-470, -1380);
    scooter(470, 1380, 1.15, 0, { look, expr: 'confused' }, s);
    g.restore();
    const q = back((s - 0.6) / 0.3);
    if (q > 0) {
      g.save(); g.translate(440, 740); g.rotate(Math.sin(s * 9) * 0.12); g.scale(q, q);
      g.font = `900 170px ${EN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
      soft(true, 16, 8, 0.35); g.strokeStyle = P.kol; g.lineWidth = 22; g.strokeText('?', 0, 0); soft(false);
      g.fillStyle = P.red; g.fillText('?', 0, 0); g.restore();
    }
    title(HOOK_TITLE, CXS, 300, 100, 1, 1);
  }
  function tourists(s) { shot3(s); }
  function twist(s) { shot4(s); }
  function mapCam(k, fx, fy) { g.translate(W / 2, H / 2); g.scale(k, k); g.translate(-lerp(W / 2, fx, (k - 1) / 0.6), -lerp(H / 2, fy, (k - 1) / 0.6)); }
  function dutch(s, d) {
    table();
    const un = out3(s / 0.6);
    g.save(); mapCam(1 + 0.05 * ease(s / d), W / 2, H / 2);
    oldMap(s, un, clamp((s - 0.7) / (d - 0.7)) * 0.45, 0);
    g.save(); g.beginPath(); g.rect(MAP.x, MAP.y, MAP.w * un, MAP.h); g.clip();
    ship(MAP.x + 770, lerp(MAP.y - 140, MAP.y + 470, out3((s - 0.3) / (d - 0.5))), 1.25, 'nl', s);
    g.restore(); g.restore();
    const pp = pop(s, 0.35);
    titleIcon('1693 · Dutch', 300, 112, pp.a, pp.sc, 110, flagIcon('nl', s));
  }
  function mapzoom(s, d) {
    table();
    const k = 1 + 0.6 * ease(s / (d * 0.8));
    g.save(); mapCam(k, GX + GW / 2, GY + GH / 2);
    oldMap(s + 5, 1, lerp(0.45, 1, clamp(s / (d * 0.6))), 0);
    // the straight lines glow: this is the reveal
    const gl = win(s, d * 0.35, d, 0.4) * (0.6 + 0.4 * Math.sin(s * 6));
    if (gl > 0) {
      g.save(); g.strokeStyle = `rgba(227,167,47,${0.85 * gl})`; g.lineWidth = 7; g.lineCap = 'round'; g.shadowColor = 'rgba(255,190,80,0.9)'; g.shadowBlur = 18;
      GRID.forEach(sg => { g.beginPath(); g.moveTo(sg[0], sg[1]); g.lineTo(sg[2], sg[3]); g.stroke(); });
      g.restore();
    }
    g.save(); g.beginPath(); g.rect(MAP.x, MAP.y, MAP.w, MAP.h); g.clip();
    ship(MAP.x + 770, MAP.y + 470 + s * 12, 1.25, 'nl', s + 5);
    g.restore(); g.restore();
  }
  function french(s, d) {
    table();
    g.save(); mapCam(1 + 0.04 * ease(s / d), W / 2, H / 2);
    oldMap(s + 9, 1, 1, clamp((s - 0.6) / (d - 1.0)));
    g.save(); g.beginPath(); g.rect(MAP.x, MAP.y, MAP.w, MAP.h); g.clip();
    if (s < 0.9) ship(MAP.x + 770, lerp(MAP.y + 520, MAP.y + MAP.h + 220, in2(s / 0.8)), 1.25, 'nl', s + 9);
    if (s > 0.25) ship(MAP.x + 770, lerp(MAP.y - 160, MAP.y + 330, out3((s - 0.3) / 1.6)), 1.25, 'fr', s);
    g.restore(); g.restore();
    const pp = pop(s, 0.4);
    titleIcon('French', 300, 116, pp.a, pp.sc, 230, (x, y) => { flagIcon('fr', s)(x, y); checkIcon(x + 140, y - 4, clamp((s - 0.7) / 0.35)); });
  }
  function canalShot(s, d) {
    g.save(); cam2d(W / 2, H / 2, lerp(1.08, 1, ease(s / d)), 0);
    town(s + 21, { canal: ease((s - 0.15) / (d * 0.65)) });
    g.restore();
    const dark = win(s, 0.05, d, 0.5);
    g.fillStyle = `rgba(31,42,68,${0.25 * dark})`; g.fillRect(0, 0, W, H);
    rain(s, dark);
    const pp = pop(s, 0.35);
    titleIcon('கால்வாய்', 300, 120, pp.a, pp.sc, 120, waveIcon(s));
  }
  function waveIcon(s) {
    return (x, y) => {
      g.lineCap = 'round';
      for (const [c, lw] of [[P.ind, 22], ['#5FB3E0', 11]]) for (let j = 0; j < 3; j++) {
        g.strokeStyle = c; g.lineWidth = lw; g.beginPath();
        for (let i = 0; i <= 10; i++) { const xx = x + i * 11, yy = y - 34 + j * 32 + Math.sin(i * 0.9 + s * 5) * 7; if (i) g.lineTo(xx, yy); else g.moveTo(xx, yy); }
        g.stroke();
      }
    };
  }
  function split(s, d) {
    const pk = 1 + 0.06 * ease(s / d);
    g.save(); g.translate(W / 2, 1000); g.scale(pk, pk); g.translate(-W / 2, -1000);
    shot8(s, [[0, 0], [0.3, -1], [1.2, -1], [1.5, 1], [2.4, 1], [2.7, 0]], s > 2.6 ? 'smile' : 'neutral');
    g.restore();
  }
  function sides(s, d) {
    g.save(); cam2d(W / 2, H / 2, lerp(1.02, 1.0, ease(s / d)), 0);
    town(s + 30, { canal: 1 });
    const fr = clamp((s - 0.25) / 0.3), ta = clamp((s - 1.5) / 0.3);
    g.fillStyle = `rgba(227,167,47,${0.3 * fr})`; g.fillRect(600, -200, 900, H + 400);
    g.fillStyle = `rgba(178,58,46,${0.28 * ta})`; g.fillRect(-300, -200, 860, H + 400);
    const pulse = 0.6 + 0.4 * Math.sin(s * 7);
    g.save(); g.strokeStyle = `rgba(120,200,255,${0.9 * pulse})`; g.lineWidth = 14; g.shadowColor = 'rgba(120,200,255,0.9)'; g.shadowBlur = 24;
    g.beginPath(); g.moveTo(CANAL_X, 100); g.lineTo(CANAL_X, 1806); g.stroke(); g.restore();
    g.restore();
    const pr = pop(s, 0.25), pl = pop(s, 1.5);
    title([[['French ஊர்', P.tur]]], 760, 330, 76, pr.a, pr.sc);
    title([[['தமிழ் ஊர்', P.kol]]], 270, 330, 76, pl.a, pl.sc);
    arrowMark(760, 430, 1, pr.a); arrowMark(270, 430, -1, pl.a);
  }
  function arrowMark(x, y, dir, a) {
    if (a <= 0) return;
    g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round';
    for (const [c, lw] of [[P.ind, 26], [P.kol, 13]]) { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); g.moveTo(x - dir * 55, y); g.lineTo(x + dir * 55, y); g.moveTo(x + dir * 27, y - 28); g.lineTo(x + dir * 55, y); g.lineTo(x + dir * 27, y + 28); g.stroke(); }
    g.restore();
  }
  function phone(s) { shot9(s); }
  const KOLAM = (() => {
    const x0 = 80, y0 = 170, dd = 46, nx = 20, ny = 34, x1 = x0 + nx * dd, y1 = y0 + ny * dd, pts = [];
    for (let i = 0; i <= nx; i++) pts.push([x0 + i * dd, y0]);
    for (let j = 1; j <= ny; j++) pts.push([x1, y0 + j * dd]);
    for (let i = nx - 1; i >= 0; i--) pts.push([x0 + i * dd, y1]);
    for (let j = ny - 1; j >= 1; j--) pts.push([x0, y0 + j * dd]);
    pts.push(pts[0]);
    return { pts, x0, y0, x1, y1 };
  })();
  function kolamBorder(p01, fk) {
    const pts = KOLAM.pts, n = pts.length - 1, p = p01 * n;
    g.fillStyle = 'rgba(247,243,234,0.8)'; pts.forEach(q => { circ(q[0], q[1], 3.5); g.fill(); });
    g.strokeStyle = P.kol; g.lineWidth = 3.5; g.lineCap = 'round';
    for (let i = 0; i < Math.min(n, Math.ceil(p)); i++) {
      const a = pts[i], b = pts[i + 1], f = clamp(p - i), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dir = Math.atan2(b[1] - a[1], b[0] - a[0]);
      for (const strand of [0, 1]) { const ccw = (i + strand) % 2 === 0, st = dir + Math.PI; g.beginPath(); g.arc(mx, my, 23, st, ccw ? st - Math.PI * f : st + Math.PI * f, ccw); g.stroke(); }
    }
    if (fk <= 0) return;
    for (const [cx, cy] of [[KOLAM.x0 + 80, KOLAM.y0 + 80], [KOLAM.x1 - 80, KOLAM.y0 + 80], [KOLAM.x0 + 80, KOLAM.y1 - 80], [KOLAM.x1 - 80, KOLAM.y1 - 80]]) {
      g.save(); g.translate(cx, cy); g.scale(fk, fk); g.strokeStyle = P.tur; g.lineWidth = 3.5;
      for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); ell(0, -26, 9, 20); g.stroke(); }
      g.fillStyle = P.tur; circ(0, 0, 6); g.fill(); g.restore();
    }
  }
  // ---------- v7 shots (script v7: one question, foreshadow, but/therefore, twist, loop) ----------
  // shot-local time of the first caption word in a shot that contains `sub` (falls back to `dflt`)
  function wordS(name, sub, dflt) {
    const c = TL.shots.find(x => x.name === name); if (!c) return dflt;
    const w = (TL.words || []).find(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub));
    return w ? w.t0 - c.t0 - 2 / 30 : dflt;   // v2: reactions start 2 frames before their word (§2.11)
  }
  function parchment(x, y, w, h) {
    soft(true, 34, 16, 0.5); rr(x, y, w, h, 10);
    const pg = g.createLinearGradient(x, y, x + w, y + h); pg.addColorStop(0, '#EFE1BD'); pg.addColorStop(1, '#D6BF8C');
    g.fillStyle = pg; g.fill(); soft(false);
    g.strokeStyle = '#6B4A2E'; g.lineWidth = 4; g.strokeRect(x + 16, y + 16, w - 32, h - 32);
  }
  // foreshadow: the town turns into the map it was born on; the map's maker is hidden, and "French" gets crossed out
  function foreshadow(s, d) {
    const b = wordS('foreshadow', 'அந்த', d * 0.55), m = ease(s / 0.9);
    g.save(); cam2d(W / 2, H / 2, lerp(1.25, 1.0, m), 0); town(s + 3); g.restore();
    g.globalAlpha = m; table(); g.globalAlpha = 1;
    g.save(); g.globalAlpha = m; g.translate(0, (1 - m) * 200);
    const k = 1 + 0.06 * ease((s - b) / 1.2);
    g.translate(W / 2, 900); g.scale(k, k); g.translate(-W / 2, -900);
    oldMap(s, 1, clamp(s / 1.4), 0);
    // the maker's seal at the map corner: a big "?" wax seal
    const sp = back((s - 0.5) / 0.4);
    if (sp > 0) {
      g.save(); g.translate(MAP.x + 150, MAP.y + MAP.h - 120); g.scale(sp, sp);
      soft(true, 12, 6, 0.4); circ(0, 0, 62); clayFill(P.red, -62, 62); soft(false);
      g.font = `900 80px ${EN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = P.kol; g.fillText('?', 0, 4);
      g.restore();
    }
    g.restore();
    const pp = pop(s, 0.25);
    title([[['map வரைஞ்சது யாரு?', P.kol]]], CXS, 300, 92, pp.a, pp.sc);
    // "French இல்ல": the French flag appears beside the seal and gets a red cross
    const no = wordS('foreshadow', 'இல்ல', d - 0.6), fa = clamp((s - (no - 0.7)) / 0.25);   // flag shows, crossed on "French இல்ல"
    if (fa > 0) {
      g.save(); g.globalAlpha = fa; g.translate(CXS, 880); g.scale(1.7, 1.7);
      soft(true, 20, 10, 0.4); g.fillStyle = 'rgba(0,0,0,0.001)'; g.fillRect(-70, -45, 140, 90); soft(false);
      flag(-70, -45, 140, 90, 'fr', s, 4);
      const x = back((s - no) / 0.25);
      if (x > 0) { g.scale(x, x); g.lineCap = 'round'; for (const [c, lw] of [[P.kol, 30], [P.red, 18]]) { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); g.moveTo(-80, -60); g.lineTo(80, 60); g.moveTo(80, -60); g.lineTo(-80, 60); g.stroke(); } }
      g.restore();
    }
  }
  // contrast: a temple town grows in rings over years (left); Pondy is ruled straight on paper (right)
  function templeTown(cx, cy, s) {
    g.fillStyle = '#D8C9AC'; g.fillRect(cx - 600, 0, 1200, H);
    g.save(); g.translate(cx, cy); g.scale(1.3, 1.3); g.translate(-cx, -cy);
    for (let r = 4; r >= 1; r--) {   // ring streets appear one after another, slightly wobbly: grown, not drawn
      const k = clamp((s - (r - 1) * 0.45) / 0.5); if (k <= 0) continue;
      const half = 40 + r * 52;
      g.save(); g.globalAlpha = k;
      for (let q = 0; q < 26 * r; q++) {   // houses along the ring, jittered
        const a = q / (26 * r) * Math.PI * 2, rx = half + 22 + rnd(q + r * 50) * 12;
        const x = cx + Math.max(-1, Math.min(1, Math.cos(a) * 1.4)) * rx, y = cy + Math.max(-1, Math.min(1, Math.sin(a) * 1.4)) * rx;
        g.fillStyle = rnd(q * 3 + r) > 0.5 ? '#C0623B' : '#B4553A'; rr(x - 9, y - 9, 18 + rnd(q) * 6, 18 + rnd(q + 1) * 6, 4); g.fill();
      }
      g.strokeStyle = '#EFE3C6'; g.lineWidth = 10; g.lineJoin = 'round';
      g.beginPath();
      for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, w = 1 + Math.sin(a * 3 + r) * 0.04; const x = cx + Math.max(-1, Math.min(1, Math.cos(a) * 1.4)) * half * w, y = cy + Math.max(-1, Math.min(1, Math.sin(a) * 1.4)) * half * w; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
      g.stroke(); g.restore();
    }
    // the temple at the centre: stacked squares, seen from above
    soft(true, 10, 5, 0.35);
    for (const [sz, c] of [[60, '#B23A2E'], [42, '#E3A72F'], [26, '#F7F3EA'], [12, '#E3A72F']]) { rr(cx - sz, cy - sz, sz * 2, sz * 2, 6); g.fillStyle = c; g.fill(); }
    soft(false); g.restore();
  }
  function rulerTown(x0, y0, w, h, p, s) {
    parchment(x0, y0, w, h);
    g.strokeStyle = '#5B3B22'; g.lineWidth = 4; g.lineCap = 'round';
    const n = 6;
    for (let i = 0; i < n * 2; i++) {
      const f = clamp(p * n * 2 - i); if (f <= 0) break;
      const vert = i % 2 === 0, j = Math.floor(i / 2) + 1;
      g.beginPath();
      if (vert) { const x = x0 + j * w / (n + 1); g.moveTo(x, y0 + 40); g.lineTo(x, y0 + 40 + (h - 80) * f); }
      else { const y = y0 + j * h / (n + 1); g.moveTo(x0 + 40, y); g.lineTo(x0 + 40 + (w - 80) * f, y); }
      g.stroke();
    }
  }
  function contrast(s, d) {
    const but = wordS('contrast', 'ஆனா', d * 0.65), split = 1 - ease((s - but) / 0.5);   // on "ஆனா" the ruled side takes over
    const lw = W / 2 * split;
    g.fillStyle = P.ind; g.fillRect(0, 0, W, H);
    if (lw > 2) { g.save(); g.beginPath(); g.rect(0, 0, lw, H); g.clip(); templeTown(lw / 2, 900, s); g.restore(); }
    g.save(); g.beginPath(); g.rect(lw, 0, W - lw, H); g.clip();
    table(); rulerTown(lw + 40, 460, W - lw - 80, 900, clamp((s - 0.3) / (d - 0.6)), s);
    g.restore();
    if (lw > 2) { g.fillStyle = P.kol; g.fillRect(lw - 3, 0, 6, H); }
  }
  // ruler: a big wooden ruler sweeps across the map; each straight line it leaves sprouts houses
  function ruler(s, d) {
    table();
    const k = 1 + 0.05 * ease(s / d);
    g.save(); g.translate(W / 2, 900); g.scale(k, k); g.translate(-W / 2, -900);
    parchment(MAP.x, MAP.y, MAP.w, MAP.h);
    const N = 6, per = (d - 0.6) / N;
    for (let i = 0; i < N; i++) {
      const t0 = 0.2 + i * per, f = clamp((s - t0) / (per * 0.7)); if (f <= 0) continue;
      const vert = i % 2 === 1, j = Math.floor(i / 2) + 1;
      const x = MAP.x + j * MAP.w / 4, y = MAP.y + j * MAP.h / 4;
      g.strokeStyle = '#5B3B22'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
      if (vert) { g.moveTo(x, MAP.y + 40); g.lineTo(x, MAP.y + 40 + (MAP.h - 80) * f); } else { g.moveTo(MAP.x + 40, y); g.lineTo(MAP.x + 40 + (MAP.w - 80) * f, y); }
      g.stroke();
      // houses pop along the finished line
      const hk = clamp((s - t0 - per * 0.6) / 0.4);
      for (let q = 0; q < 7; q++) {
        const u = (q + 0.5) / 7, pk = back(hk * 1.6 - q * 0.08); if (pk <= 0) continue;
        const hx = vert ? x + 24 : MAP.x + 40 + (MAP.w - 80) * u, hy = vert ? MAP.y + 40 + (MAP.h - 80) * u : y + 24;
        g.save(); g.translate(hx, hy); g.scale(pk, pk); g.fillStyle = (i + q) % 3 ? '#EFC25A' : '#C0623B'; rr(-13, -13, 26, 26, 5); g.fill(); g.restore();
      }
      // the ruler itself sits on the line being drawn
      if (f < 1) {
        g.save(); soft(true, 16, 8, 0.4);
        if (vert) { rr(x - 70, MAP.y + 10, 56, MAP.h - 20, 8); } else { rr(MAP.x + 10, y - 70, MAP.w - 20, 56, 8); }
        clayFill('#C89B5B', vert ? MAP.y : y - 70, vert ? MAP.y + MAP.h : y - 14); soft(false);
        g.strokeStyle = 'rgba(70,40,20,0.55)'; g.lineWidth = 2;
        for (let m = 0; m < 30; m++) { g.beginPath(); if (vert) { const yy = MAP.y + 30 + m * (MAP.h - 60) / 30; g.moveTo(x - 14, yy); g.lineTo(x - 14 - (m % 5 ? 12 : 24), yy); } else { const xx = MAP.x + 30 + m * (MAP.w - 60) / 30; g.moveTo(xx, y - 14); g.lineTo(xx, y - 14 - (m % 5 ? 12 : 24)); } g.stroke(); }
        // pencil tip at the moving end
        const px = vert ? x : MAP.x + 40 + (MAP.w - 80) * f, py = vert ? MAP.y + 40 + (MAP.h - 80) * f : y;
        g.save(); g.translate(px, py); g.rotate(-0.7); g.fillStyle = P.tur; g.fillRect(-8, -130, 16, 110); g.fillStyle = '#F2D6A2'; g.beginPath(); g.moveTo(-8, -20); g.lineTo(8, -20); g.lineTo(0, 0); g.closePath(); g.fill(); g.restore();
        g.restore();
      }
    }
    g.restore();
  }
  // guess: everyone says French. Three tags drop in over the nodding tourists; "French?" glows when it is said
  function guess(s, d) {
    shot3(s, { noText: true });
    const fr = wordS('guess', 'French', d * 0.7);
    const tags = [['French?', P.tur], ['British?', P.kol], ['???', P.kol]];
    tags.forEach(([txt, col], i) => {
      const k = back((s - 0.1 - i * 0.25) / 0.3); if (k <= 0) return;
      const y = 330 + i * 125, glow = i === 0 ? win(s, fr - 0.1, d, 0.15) : 0;
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(CXS, y); g.scale(k * (1 + 0.08 * glow), k * (1 + 0.08 * glow)); g.rotate((i - 1) * 0.04);
      g.font = `800 76px ${TA}`; const w = g.measureText(txt).width + 70;
      soft(true, 18, 8, 0.35); rr(-w / 2, -52, w, 104, 30); g.fillStyle = glow > 0 ? `rgba(227,167,47,${0.95})` : P.ind; g.fill(); soft(false);
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = glow > 0 ? P.ind : col; g.fillText(txt, 0, 4);
      g.restore();
    });
  }
  // twist: a ship with its flag hidden under a "?" patch; on "Dutch" the patch rips off
  function shipCovered(x, y, k, t, rip) {
    ship(x, y, k, 'nl', t);
    if (rip >= 1) return;
    g.save(); g.translate(x, y + Math.sin(t * 2.2) * 4 * k); g.rotate(Math.sin(t * 1.8) * 0.05); g.scale(k, k);
    g.translate(22 + rip * 160, -158 - rip * 220); g.rotate(rip * 2.2); g.globalAlpha = 1 - rip;
    soft(true, 6, 3, 0.4); rr(-26, -18, 52, 36, 6); g.fillStyle = P.ind; g.fill(); soft(false);
    g.font = `900 30px ${EN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = P.tur; g.fillText('?', 0, 2);
    g.restore();
  }
  function twist7(s, d) {
    const rv = wordS('twist', 'Dutch', d * 0.75), rip = clamp((s - rv) / 0.35);
    table();
    const zoom = 1 + 0.25 * ease((s - rv + 0.6) / 0.6);
    g.save(); g.translate(MAP.x + 770, MAP.y + 420); g.scale(zoom, zoom); g.translate(-(MAP.x + 770), -(MAP.y + 420));
    oldMap(s + 2, 1, 1, 0);
    g.save(); g.beginPath(); g.rect(MAP.x, MAP.y, MAP.w, MAP.h); g.clip();
    shipCovered(MAP.x + 770, lerp(MAP.y - 120, MAP.y + 420, out3(s / (rv * 0.9))), 1.35, s, rip);
    g.restore(); g.restore();
    const flash = 1 - clamp((s - rv) / 0.25);
    if (s >= rv && flash > 0) { g.fillStyle = `rgba(255,255,255,${0.6 * flash})`; g.fillRect(0, 0, W, H); }
    const pp = pop(s, rv + 0.05, 0.4);
    titleIcon('Dutch!', 300, 132, pp.a, pp.sc, 110, flagIcon('nl', s));
    const yr = pop(s, wordS('twist', '1693', rv + 1.5), 0.35);   // v9: the year is said after "Dutch", so it lands under it
    title([[['1693', P.tur]]], CXS, 450, 96, yr.a, yr.sc);
  }
  function card7(s, d) {
    g.fillStyle = P.ind; g.fillRect(0, 0, W, H);
    const rg = g.createRadialGradient(W / 2, H * 0.42, 100, W / 2, H * 0.42, 1000); rg.addColorStop(0, 'rgba(60,80,130,0.55)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = rg; g.fillRect(0, 0, W, H);
    kolamBorder(clamp(s / 0.9), back((s - 0.2) / 0.4));
    // note #1: the card was one line high up with an empty middle. Now a centred two-step card:
    // [mini map + Dutch flag] "Plan: Dutch"  ->  [mini town + French flag] "கட்டினது: French"
    // v9: the card carries the kolam analogy ("புள்ளி வெச்சது Dutch. கோலம் போட்டது French."), not a recap
    const a1 = wordS('card', 'புள்ளி', d * 0.35), b = wordS('card', 'போட்டது', d * 0.6);
    const head = pop(s, 0.0, 0.3);
    title([[['கோலம் மாதிரி!', P.tur]]], CXS, 560, 64, head.a, head.sc);
    cardPanel(790, back((s - a1) / 0.35), 'nl', 'புள்ளி வெச்சது', 'Dutch', mapIcon, s);
    const ar = clamp((s - b + 0.25) / 0.25);
    g.save(); g.globalAlpha = 0.35 + 0.65 * ar; g.translate(CXS, 1035 + Math.sin(s * 6) * 4); g.strokeStyle = P.tur; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round';   // arrow from step 1 to step 2
    g.beginPath(); g.moveTo(0, -40); g.lineTo(0, 30); g.moveTo(-26, 6); g.lineTo(0, 32); g.lineTo(26, 6); g.stroke(); g.restore();
    const k2 = back((s - b) / 0.35);
    if (k2 < 1) {   // until step 2 is said: a faint dashed placeholder with a "?" (keeps the frame full and teases the answer)
      const a = clamp(s / 0.3) * (1 - clamp((s - b) / 0.15));
      g.save(); g.globalAlpha = a; g.setLineDash([18, 14]); g.strokeStyle = 'rgba(247,243,234,0.45)'; g.lineWidth = 4; rr(CXS - 400, 1280 - 125, 800, 250, 34); g.stroke(); g.setLineDash([]);
      g.font = `900 120px ${EN}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(247,243,234,0.45)'; g.fillText('?', CXS, 1286); g.restore();
    }
    cardPanel(1280, k2, 'fr', 'கோலம் போட்டது', 'French', townIcon, s);
  }
  function cardPanel(cy, k, kind, label, word, icon, s) {
    if (k <= 0) return;
    const w = 800, h = 250, x0 = CXS - w / 2, y0 = cy - h / 2;
    g.save(); g.translate(CXS, cy); const br = k * (1 + 0.008 * Math.sin(s * 3)); g.scale(br, br); g.translate(-CXS, -cy);
    soft(true, 24, 10, 0.4); rr(x0, y0, w, h, 34); g.fillStyle = 'rgba(247,243,234,0.07)'; g.fill(); soft(false);
    g.strokeStyle = 'rgba(227,167,47,0.85)'; g.lineWidth = 4; rr(x0, y0, w, h, 34); g.stroke();
    icon(x0 + 40, y0 + 35, 180);   // 180x180 icon on the left
    g.save(); g.translate(x0 + 175, y0 + 30); flag(0, 0, 66, 44, kind, s, 3); g.restore();   // flag pinned to the icon's corner
    g.textAlign = 'left'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    g.font = `700 54px ${TA}`; g.fillStyle = P.kol; g.fillText(label, x0 + 270, cy - 48);
    g.font = `800 112px ${TA}`; g.strokeStyle = P.ind; g.lineWidth = 16; g.strokeText(word, x0 + 266, cy + 40); g.fillStyle = P.tur; g.fillText(word, x0 + 266, cy + 40);
    g.restore();
  }
  function mapIcon(x, y, sz) {   // a little ruled map
    soft(true, 10, 5, 0.35); rr(x, y, sz, sz, 10); clayFill('#E8D5A8', y, y + sz, 0.1, 0.12); soft(false);
    g.strokeStyle = '#6B4A2E'; g.lineWidth = 3;
    for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(x + i * sz / 5, y + 16); g.lineTo(x + i * sz / 5, y + sz - 16); g.stroke(); g.beginPath(); g.moveTo(x + 16, y + i * sz / 5); g.lineTo(x + sz - 16, y + i * sz / 5); g.stroke(); }
  }
  function townIcon(x, y, sz) {   // the same grid, now built: little houses in the blocks
    soft(true, 10, 5, 0.35); rr(x, y, sz, sz, 10); clayFill('#D8C9AC', y, y + sz, 0.1, 0.12); soft(false);
    const c = sz / 4;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { rr(x + 10 + i * c, y + 10 + j * c, c - 14, c - 14, 5); g.fillStyle = (i + j) % 3 ? '#EFC25A' : '#C0623B'; g.fill(); }
  }
  // loop: the camera comes down onto the corner from frame 1 and lands exactly on hook()'s first frame
  function loop7(s, d) {
    const k = ease(s / d), py = ROUTE[0][1] + (1 - k) * 260;
    g.save(); cam2d(ROUTE[0][0], py + HOOK_DY, lerp(3.2, HOOK_SCALE, k), 0);
    town(s - d); topScooterR(ROUTE[0][0], py, -Math.PI / 2, s - d);
    g.restore();
    tiltShift(0.27, 0.5);   // same band as hook, so the loop still lands on hook's frame 0
    title(HOOK_TITLE, CXS, 300, 100, clamp((s - (d - 0.35)) / 0.3), 1);
  }

  // ---------- shot list (also VideoHub's scene lane) ----------
  const DRAW = { hook, foreshadow, contrast, ruler, guess, twist: twist7, french, card: card7, loop: loop7 };
  // v2: one whip per film (§2.8): contrast is now a plain cut, guess keeps the whip
  const TIN = { foreshadow: 'cut', contrast: 'cut', ruler: 'cut', guess: 'whip', twist: 'cut', french: 'cut', card: 'fade', loop: 'cut' };
  const PUNCH = new Set(['twist']);              // zoom punch-in only on the beat cut into the reveal (§2.10)
  const NO_PUSH = new Set(['card', 'loop']);     // card is a planned still graphic; loop must land exactly on hook's frame 0
  const VIGNETTE = new Set(['hook', 'guess', 'loop']);   // day/town shots; table shots keep their own lamp pool (§4.13)
  const SHOTS = TL.shots.map((c, k) => ({ name: c.name, t0: c.t0, t1: c.t1, draw: DRAW[c.name], tin: TIN[c.name] || 'cut', n: k + 1 }));
  window.VH_SCENES = SHOTS.map(sh => ({ name: `${sh.n} ${sh.name}`, t0: sh.t0, t1: sh.t1 }));
  // the one real hit: the "?" patch rips off on "Dutch" (same word time twist7 uses)
  const TWIST = SHOTS.find(x => x.name === 'twist');
  const KICKS = TWIST ? [[TWIST.t0 + wordS('twist', 'Dutch', (TWIST.t1 - TWIST.t0) * 0.75), 1]] : [];

  // ---------- kinetic Tamil captions: 2-4 word phrases timed to speech (playbook), the spoken word lit in turmeric ----------
  const CAP_SIZE = 66, CAP_Y = 1300, CAP_MAX = 780;
  const CHUNKS = (() => {
    const out = [], ws = TL.words || [];
    g.font = `800 ${CAP_SIZE}px ${TA}`;
    const fits = arr => g.measureText(arr.map(x => x.w).join(' ')).width <= CAP_MAX;
    let cur = [];
    const flush = () => { if (cur.length) out.push({ words: cur }); cur = []; };
    ws.forEach(w => {
      const prev = cur[cur.length - 1];
      if (prev && (prev.seg !== w.seg || cur.length >= 4 || !fits(cur.concat(w)))) flush();
      cur.push(w);
      if (/[,.?!…]$/.test(w.w) && cur.length >= 2) flush();
    });
    flush();
    // no lone words: merge a 1-word phrase into its neighbour in the same line, shrinking that phrase to >= CAP_MIN px if needed
    const CAP_MIN = 54;
    const fitsSmall = arr => { g.font = `800 ${CAP_MIN}px ${TA}`; const ok = g.measureText(arr.map(x => x.w).join(' ')).width <= CAP_MAX; g.font = `800 ${CAP_SIZE}px ${TA}`; return ok; };
    for (let i = 0; i < out.length; i++) {
      if (out[i].words.length !== 1) continue;
      const w = out[i].words[0], p = out[i - 1], n = out[i + 1];
      if (p && p.words[0].seg === w.seg && p.words.length < 4 && fitsSmall(p.words.concat(w))) { p.words.push(w); out.splice(i--, 1); }
      else if (n && n.words[0].seg === w.seg && n.words.length < 4 && fitsSmall([w].concat(n.words))) { n.words.unshift(w); out.splice(i--, 1); }
      else if (p && p.words[0].seg === w.seg && p.words.length >= 3 && fitsSmall([p.words[p.words.length - 1], w])) out[i].words.unshift(p.words.pop());   // borrow: 3+1 becomes 2+2
    }
    out.forEach(c => {   // each phrase gets the largest size (66 down to 54 px) that fits the safe box
      let sz = CAP_SIZE; g.font = `800 ${sz}px ${TA}`;
      while (sz > CAP_MIN && g.measureText(c.words.map(x => x.w).join(' ')).width > CAP_MAX) { sz -= 2; g.font = `800 ${sz}px ${TA}`; }
      c.size = sz;
    });
    out.forEach((c, i) => { c.t0 = c.words[0].t0 - 0.05; const nx = out[i + 1]; c.t1 = nx ? Math.min(nx.words[0].t0 - 0.05, c.words[c.words.length - 1].t1 + 0.6) : c.words[c.words.length - 1].t1 + 0.4; });
    return out;
  })();
  window.VH_CAPTIONS = CHUNKS;   // for inspection only
  function captions(t, shotName) {
    if (shotName === 'card') return;
    const c = CHUNKS.find(c => t >= c.t0 && t < c.t1); if (!c) return;
    g.save(); g.font = `800 ${c.size}px ${TA}`; g.textBaseline = 'middle'; g.textAlign = 'left'; g.lineJoin = 'round';
    const sp = g.measureText(' ').width, widths = c.words.map(w => g.measureText(w.w).width);
    const total = widths.reduce((a, b) => a + b, 0) + sp * (c.words.length - 1);
    const pk = 1 + 0.12 * (1 - out3((t - c.t0) / 0.12));
    g.translate(CXS, CAP_Y); g.scale(pk, pk);
    let x = -total / 2;
    c.words.forEach((w, i) => {
      const nextT = c.words[i + 1] ? c.words[i + 1].t0 : c.t1, on = t >= w.t0 - 0.03 && t < nextT;
      g.strokeStyle = '#0B0B10'; g.lineWidth = 13; g.strokeText(w.w, x, 0);
      g.fillStyle = on ? P.tur : P.kol; g.fillText(w.w, x, 0);
      x += widths[i] + sp;
    });
    g.restore();
  }

  // v2 camera push (§2.1-2.3): every shot keeps pushing in, near-linear, 0.15-0.25 %/frame, capped at +20 % per shot
  function pushAt(sh, s) {
    if (NO_PUSH.has(sh.name)) return 1;
    const rate = Math.min(0.075, 0.2 / (sh.t1 - sh.t0));
    const x = Math.max(0, s), e = 0.25;   // 0.25 s ease-in only at the start, never eased to a stop
    return 1 + rate * (x < e ? x * x / (2 * e) : x - e / 2);
  }
  // v2 reframes (§2.2, §2.5): on word times from timeline.js, glide 0.6 s (smootherstep) to a new framing; the moves
  // add up within a shot and are clamped so the frame edge never shows
  const RF_STEPS = [[46, -34, 0.05], [-64, 26, 0.045], [38, 44, 0.05], [-40, -28, 0.04]];
  const RF = {};
  (TL.reframes || []).forEach(r => { (RF[r.shot] = RF[r.shot] || []).push(r.t); });
  // roll moves (§2.7): 1-2 per film, 3°, glided over 0.8 s on an emphasis word, held to the end of the shot
  const ROLLS = [['foreshadow', 'இல்ல', 3], ['twist', 'Dutch', -2.5]];
  function frameAt(sh, s) {
    let dx = 0, dy = 0, dz = 0, rot = 0;
    (RF[sh.name] || []).forEach((t, k) => { const e = glide((sh.t0 + s - t) / 0.6), st = RF_STEPS[k % RF_STEPS.length]; dx += st[0] * e; dy += st[1] * e; dz += st[2] * e; });
    for (const [name, sub, deg] of ROLLS) if (name === sh.name) { const w = wordS(name, sub, -1); if (w >= 0) rot += deg * glide((s - w) / 0.8); }
    return { dx, dy, dz, rot: rot * Math.PI / 180 };
  }
  function drawInto(ctx, sh, s) {
    const old = g; g = ctx;
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; soft(false); g.clearRect(0, 0, W, H);
    const f = frameAt(sh, s), r = Math.abs(f.rot);
    const pk = pushAt(sh, s) * (1 + f.dz) * (Math.cos(r) + (H / W) * Math.sin(r));   // rolls overscale to hide corners
    const mx = CXS * (pk - 1), Mx = (W - CXS) * (pk - 1), my = 900 * (pk - 1), My = (H - 900) * (pk - 1);
    const dx = clamp(f.dx, -Mx, mx), dy = clamp(f.dy, -My, my);
    g.setTransform(1, 0, 0, 1, CXS + dx, 900 + dy); g.rotate(f.rot); g.scale(pk, pk); g.translate(-CXS, -900);   // push around the action centre
    sh.draw(s, sh.t1 - sh.t0);
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; soft(false);
    g = old;
  }

  // ---------- the contract ----------
  window.renderOut = function (t) {
    t = clamp(+t || 0, 0, DUR);
    let i = SHOTS.findIndex(sh => t >= sh.t0 && t < sh.t1); if (i < 0) i = SHOTS.length - 1;
    const sh = SHOTS[i], s = t - sh.t0, m = mainCtx;
    const D = sh.tin === 'whip' ? 0.5 : sh.tin === 'fade' ? 0.25 : 0;   // v2 whip: 15 f, smootherstep, peak ~135 px/f (§2.8)
    if (i > 0 && D > 0 && s < D) {
      const pv = SHOTS[i - 1], ps = t - pv.t0, k = ease(s / D);
      if (sh.tin === 'fade') {
        drawInto(m, pv, ps); drawInto(bufB, sh, s);
        m.globalAlpha = k; m.drawImage(bufB.canvas, 0, 0); m.globalAlpha = 1;
      } else {
        drawInto(bufA, pv, ps); drawInto(bufB, sh, s);
        m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, W, H);
        // real motion blur: the pair drawn 10 times across half a frame of motion, exact running average
        for (let j = 0; j < 10; j++) {
          const kk = glide((s - (j / 9) * 0.5 / 30) / D);
          m.globalAlpha = 1 / (j + 1);
          m.drawImage(bufA.canvas, -kk * W, 0); m.drawImage(bufB.canvas, W - kk * W, 0);
        }
        m.globalAlpha = 1;
      }
    } else if (i > 0 && PUNCH.has(sh.name) && s < 0.18) {   // punch-in on the one beat cut
      drawInto(bufB, sh, s);
      const k = 1 + 0.07 * (1 - out3(s / 0.18));
      m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, W, H);
      m.drawImage(bufB.canvas, W / 2 - W * k / 2, H / 2 - H * k / 2, W * k, H * k);
    } else drawInto(m, sh, s);
    g = m; g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; soft(false);
    // impact kick on the reveal (§2.9): 7 frames, offset flips sign every frame, 1 % overscale hides the edge
    const kn = KICKS.map(([k0, gain]) => [Math.floor((t - k0) * 30 + 1e-6), gain]).find(([n]) => n >= 0 && n < 7);
    if (kn) {
      const [n, gain] = kn, sg = n % 2 ? -1 : 1, d = Math.pow(1 - n / 7, 1.5), dx = 4.5 * gain * d * sg, rot = 0.2 * Math.PI / 180 * d * sg;
      bufK.setTransform(1, 0, 0, 1, 0, 0); bufK.clearRect(0, 0, W, H); bufK.drawImage(m.canvas, 0, 0);
      m.save(); m.clearRect(0, 0, W, H); m.translate(W / 2 + dx, H / 2 + dx * 0.6); m.rotate(rot); m.scale(1.01, 1.01); m.drawImage(bufK.canvas, -W / 2, -H / 2); m.restore();
    }
    if (VIGNETTE.has(sh.name)) {   // light indigo vignette under the captions: corners about 0.86 of centre
      const v = m.createRadialGradient(W / 2, H * 0.48, H * 0.3, W / 2, H * 0.48, H * 0.62);
      v.addColorStop(0, 'rgba(31,42,68,0)'); v.addColorStop(1, 'rgba(31,42,68,0.22)');
      m.fillStyle = v; m.fillRect(0, 0, W, H);
    }
    captions(t, sh.name);
  };

  window.renderOut(0);
  const fonts = document.fonts && document.fonts.load ? Promise.all([document.fonts.load(`800 100px ${TA}`, 'தமிழ்'), document.fonts.load(`600 46px ${EN}`, 'Pondy')]) : Promise.resolve();
  fonts.catch(() => {}).then(() => { window.renderOut(0); window.READY = true; });
})();
