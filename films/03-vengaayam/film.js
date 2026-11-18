// 03 - Vengaayam: why cutting an onion makes you cry (episode file: Tamil-YT-Short/episodes/03-vengaayam.md)
// A vertical Short (1080x1920, 30 fps) in the PAPER CUT-OUT look (kit/style-sheet.md §3d): flat paper shapes in layers,
// soft indigo shadows, light boiling grain. VideoHub contract: window.renderOut(t) draws second t synchronously as a
// pure function of t; window.READY once fonts are in; window.VH_SCENES lists the shots; window.VH_BOXES for layout-check.
(function () {
  'use strict';
  const TL = window.TIMELINE;   // written by make-audio.js from the voice: shot cuts, word times, reframe times
  if (!TL) throw new Error('timeline.js missing: run node make-audio.js');
  const W = 1080, H = 1920, DUR = TL.dur, CXS = 504;   // CXS: centre of the Shorts safe box (x 90-918)
  const mainCtx = document.getElementById('c').getContext('2d');
  let g = mainCtx;
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c.getContext('2d'); };
  const bufB = mk(), bufK = mk();
  const C = { tur: '#E3A72F', kol: '#F7F3EA', red: '#B23A2E', leaf: '#4C8C3A', ind: '#1F2A44', skin: '#8A5230', skinD: '#6E3F22', hair: '#16110E', paper: '#F3EADB', teal: '#2C6E7C',
    wall: '#F3E2C4', tile: '#E7CFA6', top: '#C08A57', wood: '#A8743F', woodD: '#8C5E31', board: '#D9B27A',
    on: '#8E3B5E', onL: '#B5617F', ring1: '#F6E9F0', ring2: '#E8C6D6', flesh: '#F2D6E2', cellW: '#D9A6BC',
    steel: '#C9CED6', steelD: '#8F96A3', handle: '#5A3A28', tear: '#7EC3E6', gas: '#9BC27A', gasL: '#C3DE9E', helm: '#2E5EA8', grille: '#9AA3AF', stick: '#E2C08D', box: '#8C5A34', boxD: '#4E3020' };
  const TA = '"Nirmala UI", "Latha", "Noto Sans Tamil", sans-serif', EN = '"Segoe UI", system-ui, sans-serif';

  // ---------- small helpers (pure) ----------
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = x => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const out3 = x => 1 - Math.pow(1 - clamp(x), 3);
  const back = x => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const glide = x => { x = clamp(x); return x * x * x * (x * (6 * x - 15) + 10); };
  const rnd = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const twos = s => Math.floor(s * 12) / 12;   // paper puppets move in small steps (12 a second); the camera stays smooth
  function wordS(name, sub, dflt, nth = 0) {   // shot-local time of a caption word, 2 frames early (film-craft §2.11)
    const c = TL.shots.find(x => x.name === name); if (!c) return dflt;
    const w = (TL.words || []).filter(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub))[nth];
    return w ? w.t0 - c.t0 - 2 / 30 : dflt;
  }

  // ---------- layout guard (kit/tools/layout-check.cjs reads window.VH_BOXES) ----------
  // ZONES (1080x1920): series tag y 150-206 far top-left | cards centred at y 380 | picture subject y 460-1250 | captions y 1320-1460.
  let BOXES = [];
  function claim(kind, name, x, y, w, h) { const m = g.getTransform(), P = [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([px, py]) => [m.a * px + m.c * py + m.e, m.b * px + m.d * py + m.f]);
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]); BOXES.push({ kind, name, x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }); }

  // ---------- paper primitives (shot space is 540x960, drawn at 2x) ----------
  function path(s) { g.beginPath();
    if (s[0] === 'c') g.arc(s[1], s[2], Math.max(0.01, s[3]), 0, 7);
    else if (s[0] === 'e') g.ellipse(s[1], s[2], Math.max(0.01, s[3]), Math.max(0.01, s[4]), s[5] || 0, 0, 7);
    else if (s[0] === 'r') g.roundRect(s[1], s[2], s[3], s[4], s[5]);
    else if (s[0] === 'p') { s[1].forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); }
    else if (s[0] === 'l') { const p = s[1]; g.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) g.lineTo(p[i][0], p[i][1]); } }
  function paper(s, col, lw, sh = 1) {   // one piece of cut paper: flat colour, soft indigo-tinted shadow on the layer below
    g.save(); if (sh > 0) { g.shadowColor = `rgba(31,42,68,${0.3 * sh})`; g.shadowBlur = 18; g.shadowOffsetX = 6; g.shadowOffsetY = 12; }
    path(s); if (lw) { g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); } else { g.fillStyle = col; g.fill(); } g.restore(); }
  const strip = (pts, w, col, sh = 1) => paper(['l', pts], col, w, sh);
  function spark(x, y, r, col, rot = 0) { if (r <= 0.5) return; const pts = []; for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4, rr = i % 2 ? r * 0.38 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } paper(['p', pts], col, 0, 0.5); }
  function txt(t, x, y, sz, fill, wt = 800, font = TA) { g.font = `${wt} ${sz}px ${font}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = fill; g.fillText(t, x, y); }
  const alpha = (a, fn) => { if (a <= 0) return; g.save(); g.globalAlpha *= clamp(a); fn(); g.restore(); };
  const GRAIN = (() => { const c = mk(), id = c.createImageData(W, H), d = id.data; for (let i = 0; i < d.length; i += 4) { const v = 128 + (rnd(i * 0.37) - 0.5) * 70; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; } c.putImageData(id, 0, 0); return c.canvas; })();
  let CAM = { pk: 1, fx: 252, fy: 450 };
  function far(fn) {   // parallax: the background pushes in only 40 % as much as the front, so the camera reads as moving through depth
    const k = (1 + (CAM.pk - 1) * 0.4) / CAM.pk; g.save(); g.translate(CAM.fx, CAM.fy); g.scale(k, k); g.translate(-CAM.fx, -CAM.fy); fn(); g.restore(); }
  const bgFill = col => { g.fillStyle = col; g.fillRect(-200, -200, 940, 1360); };

  // ---------- Mani's face (redesigned 2026-11-18: thicker brows carry the emotion, 8 moods, tears) ----------
  // mood: neutral | smile | shock | sus | down | cry | meh | glare ; look -1..1 ; blink 0..1 ; tears 0..1 ; t = film time (continuous drops)
  function face(x, y, r, o = {}) {
    const mood = o.mood || 'neutral', look = o.look || 0, bl = o.blink || 0;
    if (o.claim !== false) claim('key', 'face', x - r * 1.05, y - r * 0.8, r * 2.1, r * 1.65);
    paper(['e', x - r * 0.98, y + r * 0.05, r * 0.17, r * 0.24], C.skinD, 0, 0.4); paper(['e', x + r * 0.98, y + r * 0.05, r * 0.17, r * 0.24], C.skinD, 0, 0.4);
    paper(['c', x, y, r], C.skin);
    paper(['p', [[x - r * 1.02, y - r * 0.3], [x - r * 0.9, y - r * 0.95], [x, y - r * 1.2], [x + r * 0.9, y - r * 0.95], [x + r * 1.02, y - r * 0.3], [x + r * 0.55, y - r * 0.62], [x - r * 0.2, y - r * 0.5], [x - r * 0.7, y - r * 0.6]]], C.hair, 0, 0.6);
    const ex = r * 0.36, ey = y - r * 0.02;
    for (const sx of [-1, 1]) {
      const cx = x + sx * ex;
      if (mood === 'cry' || bl > 0.5) strip([[cx - r * 0.17, ey + (mood === 'cry' ? -r * 0.02 : 0)], [cx, ey + (mood === 'cry' ? r * 0.06 : 0.02 * r)], [cx + r * 0.17, ey + (mood === 'cry' ? -r * 0.02 : 0)]], r * 0.07, C.hair, 0);   // squeezed shut
      else {
        const ew = mood === 'shock' ? 0.26 : mood === 'smile' ? 0.2 : 0.22, lid = mood === 'meh' ? 0.5 : mood === 'glare' ? 0.42 : 0;
        paper(['c', cx, ey, r * ew], C.kol, 0, 0.3); paper(['c', cx + look * r * 0.08, ey + (mood === 'down' ? r * 0.09 : 0), r * 0.1], C.hair, 0, 0);
        if (lid) { g.save(); path(['c', cx, ey, r * ew + 1]); g.clip(); g.fillStyle = C.skin; g.fillRect(cx - r * 0.3, ey - r * 0.3, r * 0.6, r * (0.3 - ew + 2 * ew * lid)); g.restore(); }
      }
      // brows: [inner, outer] heights (higher = more raised); thick paper strips
      const B = { neutral: [0.36, 0.34], smile: [0.42, 0.38], shock: [0.52, 0.48], sus: sx < 0 ? [0.3, 0.28] : [0.46, 0.4], down: [0.34, 0.32], cry: [0.5, 0.3], meh: [0.3, 0.3], glare: [0.24, 0.4] }[mood] || [0.36, 0.34];
      strip([[cx - sx * r * 0.04 * -1 - sx * r * 0.0, y - r * B[0]], [cx + sx * r * 0.2, y - r * B[1]]].map(([px, py], i) => i === 0 ? [x + sx * r * 0.16, py] : [x + sx * r * 0.56, py]), r * 0.13, C.hair, 0);
    }
    if (mood === 'shock') paper(['e', x, y + r * 0.62, r * 0.17, r * 0.2], '#2A0E0C', 0, 0);
    else if (mood === 'cry') { paper(['e', x, y + r * 0.6, r * 0.3, r * 0.2], '#2A0E0C', 0, 0); paper(['e', x, y + r * 0.7, r * 0.16, r * 0.08], '#C25B57', 0, 0); }   // a wail
    else if (mood === 'smile') { g.save(); g.beginPath(); g.moveTo(x - r * 0.3, y + r * 0.52); g.quadraticCurveTo(x, y + r * 0.86, x + r * 0.3, y + r * 0.52); g.closePath(); g.fillStyle = '#2A0E0C'; g.fill(); g.fillStyle = C.kol; g.fillRect(x - r * 0.2, y + r * 0.53, r * 0.4, r * 0.08); g.restore(); }
    else if (mood === 'glare') strip([[x - r * 0.18, y + r * 0.62], [x, y + r * 0.56], [x + r * 0.18, y + r * 0.62]], r * 0.08, '#2A0E0C', 0);
    else strip([[x - r * 0.16, y + r * 0.6], [x + r * 0.16, y + r * (mood === 'sus' ? 0.54 : 0.58)]], r * 0.08, '#2A0E0C', 0);
    const tr = o.tears || 0;
    if (tr > 0) for (const sx of [-1, 1]) {   // tear streams down the cheeks, drops falling continuously (not on twos)
      const sx0 = x + sx * r * 0.52; alpha(0.85 * tr, () => strip([[sx0, ey + r * 0.08], [sx0 + sx * r * 0.06, y + r * 0.45], [sx0 + sx * r * 0.02, y + r * 0.82 * tr]], r * 0.11, C.tear, 0));
      for (let k = 0; k < 2; k++) { const ph = ((o.t || 0) * 1.6 + k * 0.5 + (sx > 0 ? 0.25 : 0)) % 1; alpha(tr * (1 - ph), () => paper(['e', sx0 + sx * r * 0.02, y + r * (0.9 + ph * 1.1), r * 0.06, r * 0.09], C.tear, 0, 0)); }
    }
  }
  function helmet(x, y, r) {   // a Chennai-yellow cricket helmet with a lion crest (CSK fan style, drawn by us; no team name or official badge); grille over the face
    paper(['p', [[x - r * 1.12, y - r * 0.15], [x - r * 1.05, y - r * 0.9], [x, y - r * 1.32], [x + r * 1.05, y - r * 0.9], [x + r * 1.12, y - r * 0.15], [x + r * 0.95, y - r * 0.32], [x - r * 0.95, y - r * 0.32]]], '#F9CD05');
    strip([[x - r * 0.9, y - r * 0.62], [x + r * 0.9, y - r * 0.62]], r * 0.1, '#1D3E8A', 0);   // navy band
    strip([[x - r * 1.0, y - r * 0.32], [x + r * 1.12, y - r * 0.4]], r * 0.12, '#1D3E8A', 0.5);
    { const ex = x, ey = y - r * 0.9, er = r * 0.3;   // a lion crest (our own paper lion, CSK style; not a copy of the team's badge)
      paper(['c', ex, ey, er], '#1D3E8A', 0, 0.4);
      const mane = []; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? er * 0.62 : er * 0.86; mane.push([ex + Math.cos(a) * rr, ey + Math.sin(a) * rr]); } paper(['p', mane], '#E08A1E', 0, 0);
      paper(['c', ex, ey + er * 0.04, er * 0.48], '#F9CD05', 0, 0); for (const sx of [-1, 1]) { paper(['c', ex + sx * er * 0.36, ey - er * 0.36, er * 0.14], '#F9CD05', 0, 0); paper(['c', ex + sx * er * 0.17, ey - er * 0.06, er * 0.07], C.hair, 0, 0); }
      paper(['p', [[ex - er * 0.11, ey + er * 0.12], [ex + er * 0.11, ey + er * 0.12], [ex, ey + er * 0.26]]], '#7A3E10', 0, 0); }
    for (const yy of [0.12, 0.38, 0.62]) strip([[x - r * 0.78, y + r * yy], [x + r * 0.78, y + r * yy]], r * 0.07, C.grille, 0.3);
    for (const xx of [-0.4, 0, 0.4]) strip([[x + r * xx, y - r * 0.3], [x + r * xx * 0.9, y + r * 0.78]], r * 0.07, C.grille, 0.3);
  }
  // ---------- onion, knife ----------
  function onion(x, y, r, o = {}) {   // whole onion, side view
    paper(['p', [[x - r * 0.12, y - r * 0.9], [x, y - r * 1.25], [x + r * 0.12, y - r * 0.9]]], C.onL, 0, 0.5);
    paper(['e', x, y, r, r * 0.92], C.on);
    for (const k of [-0.55, 0, 0.55]) strip([[x + r * k * 0.6, y - r * 0.82], [x + r * k, y], [x + r * k * 0.6, y + r * 0.82]], r * 0.07, C.onL, 0);
    for (let i = -2; i <= 2; i++) strip([[x + i * r * 0.08, y + r * 0.9], [x + i * r * 0.13, y + r * 1.08]], r * 0.035, '#D8C7A8', 0);
  }
  function onionHalf(x, y, rx, ry, o = {}) {   // the cut face, rings
    paper(['e', x, y, rx, ry], C.on);
    for (let i = 0; i < 6; i++) { const k = 0.9 - i * 0.15; paper(['e', x, y + ry * 0.04 * i, rx * k, ry * k], i % 2 ? C.ring2 : C.ring1, 0, i ? 0 : 0.4); }
  }
  function knife(x, y, ang, len, o = {}) {   // handle at (x, y), blade along ang
    g.save(); g.translate(x, y); g.rotate(ang);
    paper(['r', -len * 0.42, -len * 0.07, len * 0.42, len * 0.14, len * 0.05], C.handle);
    for (const k of [-0.3, -0.14]) paper(['c', len * k, 0, len * 0.022], '#D9C6A0', 0, 0);
    const bl = o.dull ? '#A9AEB6' : C.steel;
    paper(['p', [[0, -len * 0.1], [len * 0.95, -len * 0.06], [len, len * 0.02], [len * 0.9, len * 0.12], [0, len * 0.12]]], bl);
    if (o.dull) for (let i = 0; i < 4; i++) paper(['p', [[len * (0.2 + i * 0.18), len * 0.12], [len * (0.24 + i * 0.18), len * 0.07], [len * (0.28 + i * 0.18), len * 0.12]]], C.wall, 0, 0);   // nicks
    else strip([[len * 0.08, -len * 0.04], [len * 0.85, -len * 0.02]], len * 0.025, '#FFFFFF', 0);   // shine
    if (o.eyes) { for (const k of [0.45, 0.62]) { paper(['c', len * k, len * 0.0, len * 0.055], C.kol, 0, 0); paper(['c', len * k - len * 0.02, len * 0.01, len * 0.025], C.hair, 0, 0); } }
    g.restore();
  }
  // ---------- Mani at the kitchen counter (upper body; origin = counter top under him) ----------
  // o: mood, look, blink, tears, t, chop 0..1 (knife hand up), hold 0..1 (whole onion up to his eye), shrug 0..1, raise 0..1 (knife up by his face), helmet, knifeEyes
  function cook(x, y, k, o = {}) {
    g.save(); g.translate(x, y); g.scale(k, k);
    paper(['r', -95, -175, 190, 220, 70], C.tur);
    paper(['r', -18, -205, 36, 44, 12], C.skinD, 0, 0.4);
    const L = (u, v, w) => [lerp(u[0], v[0], w), lerp(u[1], v[1], w)], sh = o.shrug || 0, hold = o.hold || 0, rz = o.raise || 0;
    // left arm (screen left): steadies the onion, or lifts the whole onion to the eye, or shrugs
    let hL = L([-58, -24], [-66, -232], ease(hold)); hL = L(hL, [-150, -118], sh); const eL = L([-118, -70], [-128, -150], Math.max(hold, sh));
    strip([[-74, -140], eL, hL], 30, C.skin);
    const front = [];
    if (hold > 0) front.push(() => onion(hL[0] + 22, hL[1] - 20, 26));
    front.push(() => paper(['c', hL[0], hL[1], 17], C.skin, 0, 0.5));
    // right arm: the knife hand chops, or raises the knife by his face
    const up = o.chop || 0; let hR = [92, lerp(-26, -92, up)]; hR = L(hR, [122, -214], ease(rz)); const eR = L([126, -64], [168, -110], ease(rz));
    strip([[74, -140], eR, hR], 30, C.skin);
    const kn = () => knife(hR[0] - 4, hR[1] + 2, rz > 0.5 ? -1.42 : 2.9 - up * 0.25, rz > 0.5 ? 140 : 92, { dull: !!o.dullKnife, eyes: !!o.knifeEyes });
    if (rz > 0.5) front.push(kn); else kn();
    front.push(() => paper(['c', hR[0], hR[1], 17], C.skin, 0, 0.5));
    face(0, -290, 80, o);
    if (o.helmet) helmet(0, -290, 80);
    front.forEach(f => f());
    g.restore();
  }
  function kitchen(o = {}) { far(() => kitchenWall(o)); }
  function kitchenWall(o = {}) {   // the wall; counter() goes on top of Mani
    bgFill(C.wall);
    for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) paper(['r', -20 + c * 66 + (r % 2) * 33, 330 + r * 40, 60, 34, 6], C.tile, 0, 0);   // tiles
    paper(['r', 400, 120, 120, 14, 4], C.woodD, 0, 0.6); for (let i = 0; i < 3; i++) paper(['r', 410 + i * 36, 70, 28, 50, 8], [C.red, C.tur, C.leaf][i], 0, 0.6);   // a shelf of masala jars
  }
  function counter(n = 7) {
    paper(['r', -60, 596, 660, 26, 0], C.top); paper(['r', -60, 622, 660, 400, 0], C.wood);
    strip([[40, 700], [500, 700]], 4, C.woodD, 0); strip([[270, 622], [270, 1000]], 4, C.woodD, 0);
    board(260, 588, 260); onionHalf(212, 572, 34, 18); pieces(322, 580, n);
  }
  function board(x, y, w) { paper(['r', x - w / 2, y - 12, w, 22, 10], C.board); }
  function pieces(x, y, n) { for (let i = 0; i < n; i++) paper(['e', x + (rnd(i) - 0.5) * 60, y + (rnd(i + 9) - 0.5) * 6, 9, 5, rnd(i + 3)], i % 2 ? C.ring2 : C.ring1, 0, 0.3); }

  // ---------- inside the onion: cells with a matchstick room and a matchbox room ----------
  const GRID = (() => { const out = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) out.push({ x: 61 + c * 144, y: 336 + r * 114, w: 130, h: 104, i: r * 3 + c }); return out; })();
  // o: stick 0..1, box 0..1, broken(i) -> 0..1, strike(i) -> 0..1, t
  function cells(o = {}) {
    claim('key', 'cells', 56, 330, 428, 226);
    for (const c of GRID) {
      const br = o.broken ? o.broken(c.i) : 0, st = o.strike ? o.strike(c.i) : 0, mx = c.x + c.w / 2;
      paper(['r', c.x, c.y, c.w, c.h, 18], '#FBEFF4', 0, 0.7); paper(['r', c.x, c.y, c.w, c.h, 18], C.cellW, 7, 0);
      if (br < 1) alpha(1 - br, () => strip([[mx, c.y + 6], [mx, c.y + c.h - 6]], 6, C.cellW, 0));   // the wall between the rooms
      if (br > 0) { for (const [dy, s] of [[-1, -1], [1, 1]]) strip([[mx + s * 16 * br, c.y + c.h / 2 + dy * 18 - dy * 10 * br], [mx + s * 26 * br, c.y + c.h / 2 + dy * 44]], 5, C.cellW, 0); }   // broken halves
      const ks = back(o.stick === undefined ? 1 : o.stick - c.i * 0.04), kb = back(o.box === undefined ? 1 : o.box - c.i * 0.04);
      const dt = o.dots === undefined ? 0 : back(o.dots - c.i * 0.4) * (o.pulse || 1), jig = twos(o.t || 0);   // pop in one cell after another
      if (dt > 0) { const js = (k) => Math.sin(jig * 9 + c.i * 1.7 + k) * 3;   // the two chemicals, before they become the matchstick and the box
        if (ks < 0.5) paper(['c', c.x + 34 + js(0), c.y + c.h * 0.52 + js(1), 13 * dt * (1 - ks * 2)], '#C2417A', 0, 0.4);
        if (kb < 0.5) paper(['c', c.x + c.w * 0.74 + js(2), c.y + c.h * 0.52 + js(3), 13 * dt * (1 - kb * 2)], C.tur, 0, 0.4); }
      if (o.wallFlash > 0 && br < 1) alpha(o.wallFlash, () => strip([[mx, c.y + 4], [mx, c.y + c.h - 4]], 12, C.red, 0));
      const slide = out3(st) * 34;
      if (ks > 0) { g.save(); g.translate(c.x + 40 + slide, c.y + c.h * 0.55); g.scale(ks, ks); g.rotate(-0.35 + st * 0.2); strip([[-26, 0], [18, 0]], 7, C.stick, 0.4); paper(['e', 22, 0, 9, 7], C.red, 0, 0.4); g.restore(); }
      if (kb > 0) { g.save(); g.translate(c.x + c.w * 0.74, c.y + c.h * 0.55); g.scale(kb, kb); paper(['r', -24, -20, 48, 40, 5], C.box, 0, 0.5); paper(['r', -24, -20, 9, 40, 3], C.boxD, 0, 0); g.restore(); }
      if (st > 0.6) { const f = (st - 0.6) / 0.4, q = twos(o.t || 0); spark(mx + 2, c.y + c.h * 0.48, 16 * back(f) * (0.85 + 0.15 * Math.sin(q * 20 + c.i)), C.tur, q * 3 + c.i); paper(['e', mx + 2, c.y + c.h * 0.4 - 6 * f, 6, 11 * f], '#F28C28', 0, 0); }
    }
  }
  function wisp(x, y, r, a) { alpha(a, () => { paper(['c', x, y, r], C.gas, 0, 0.2); paper(['c', x + r * 0.5, y - r * 0.4, r * 0.7], C.gasL, 0, 0); paper(['c', x - r * 0.6, y - r * 0.2, r * 0.6], C.gas, 0, 0); }); }
  // a big eye: sclera, iris, lid; o: squint 0..1, look, specks [[x,y]...] (eye space), wash 0..1 (tear wave across), drop 0..1
  function eye(x, y, rx, ry, o = {}) {
    const sq = o.squint || 0, ry2 = ry * (1 - 0.45 * sq);
    paper(['e', x, y, rx * 1.12, ry * 1.5], C.skin, 0, 0.6);
    g.save(); g.beginPath(); g.moveTo(x - rx, y); g.quadraticCurveTo(x, y - ry2 * 2, x + rx, y); g.quadraticCurveTo(x, y + ry2 * 2, x - rx, y); g.closePath(); g.fillStyle = '#FBF6EE'; g.fill(); g.clip();
    const lx = x + (o.look || 0) * rx * 0.2;
    paper(['c', lx, y, ry * 0.78], '#6B4226', 0, 0); paper(['c', lx, y, ry * 0.36], C.hair, 0, 0); paper(['c', lx + ry * 0.22, y - ry * 0.24, ry * 0.12], '#FFFFFF', 0, 0);
    (o.specks || []).forEach(([sx, sy, sr]) => paper(['c', x + sx * rx, y + sy * ry, sr], C.gas, 0, 0));
    if (o.wash > 0) alpha(0.55, () => { const wx = lerp(x - rx * 1.6, x + rx * 1.6, o.wash); paper(['e', wx, y, rx * 0.55, ry * 1.4], C.tear, 0, 0); });
    g.restore();
    strip([[x - rx, y], [x - rx * 0.5, y - ry2 * 0.98], [x, y - ry2 * 1.0], [x + rx * 0.5, y - ry2 * 0.98], [x + rx, y]], ry * 0.14, C.hair, 0);   // upper lid line
    for (let i = 0; i < 6; i++) { const u = 0.2 + i * 0.12, px = lerp(x - rx, x + rx, u), py = y - ry2 * (1 - Math.pow(2 * u - 1, 2)) * 0.98; strip([[px, py], [px + (u - 0.5) * 20, py - ry * 0.32]], ry * 0.07, C.hair, 0); }
    if (o.brow !== false) strip([[x - rx * 0.9, y - ry * 1.62], [x + rx * 0.85, y - ry * 1.78]], ry * 0.24, C.hair, 0.4);   // brow
    if (o.drop > 0) {   // a tear wells along the lower lid, then a big drop rolls down the cheek (kept well inside the frame)
      const d = o.drop, well = clamp(d / 0.35), roll = clamp((d - 0.3) / 0.7);
      alpha(0.9, () => strip([[x - rx * 0.55, y + ry * 0.62], [x, y + ry * 0.98], [x + rx * 0.55, y + ry * 0.62]], ry * 0.16 * well, C.tear, 0));
      const dx = x + rx * 0.32, dy = y + ry * 0.92 + ease(roll) * ry * 2.2, r = ry * (0.16 + 0.08 * well);
      paper(['p', [[dx, dy - r * 2.1], [dx + r, dy], [dx, dy + r], [dx - r, dy]]], C.tear, 0, 0.5); paper(['c', dx, dy, r], C.tear, 0, 0); paper(['e', dx - r * 0.35, dy - r * 0.3, r * 0.22, r * 0.32], '#DFF3FB', 0, 0);
    }
  }

  // ---------- shots (s = seconds into the shot, d = its length) ----------
  function hook(s, d) {   // the sad close-up... it's an onion
    const q = twos(s), z0 = 1.62 + 0.12 * clamp(s / 0.7), z = lerp(z0, 1, glide((s - 0.7) / 0.5));   // creeping in on the sob, then the pull-back
    const cx = 270, cy = lerp(420 + 290 * 0 , 306, 0), fx = 270, fy = 306;   // face centre in shot space at z = 1
    g.save(); g.translate(cx, lerp(420, fy, clamp((z0 - z) / (z0 - 1)))); g.scale(z, z); g.translate(-fx, -fy);
    kitchen();
    const chopping = s > 1.1 ? 0.5 + 0.5 * Math.sin((q - 1.1) * Math.PI * 2 * 2.7) : 0;
    cook(270, 596, 1, { mood: 'cry', tears: 1, t: s, chop: chopping }); counter(7);
    g.restore();
    alpha(0.28 * (1 - glide((s - 0.7) / 0.5)), () => { g.fillStyle = '#2B3A66'; g.fillRect(-60, -60, 660, 1080); });   // sad blue grade until the reveal
  }
  function proof(s, d) {   // he holds a whole onion at his eye: nothing; shrug
    kitchen();
    const q = twos(s), b0 = wordS('proof', 'பாருங்க', d * 0.4), sh = wordS('proof', 'வராது', d * 0.75);
    const blink = [b0, b0 + 0.22].some(t0 => s >= t0 && s < t0 + 0.12) ? 1 : 0;
    cook(270, 596, 1, { mood: q > sh ? 'meh' : 'neutral', look: -0.6, blink, hold: clamp((q - 0.15) / 0.5), shrug: 0, t: s }); counter(7);
  }
  function foreshadow(s, d) {   // close on his face: an eyebrow up, then a grin at us
    far(() => { bgFill(C.wall); for (let c = 0; c < 9; c++) paper(['r', -20 + c * 66, 700, 60, 34, 6], C.tile, 0, 0); });
    paper(['r', 110, 690, 320, 400, 130], C.tur); paper(['r', 232, 600, 76, 110, 24], C.skinD, 0, 0.4);
    const q = twos(s), sm = wordS('foreshadow', 'மாட்டீங்க', d * 0.6);
    g.save(); g.translate(0, Math.sin(q * 7) * 4); g.rotate(Math.sin(q * 3.5) * 0.02); face(270, 470, 150, { mood: q > sm ? 'smile' : 'sus', look: 0.2 + Math.sin(q * 2.5) * 0.3 }); g.restore();
  }
  function knifeShot(s, d) {   // slow motion: the blade comes down; it touches on "செகண்ட்ல"
    far(() => { bgFill(C.wall); for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) paper(['r', -20 + c * 66 + (r % 2) * 33, 380 + r * 40, 60, 34, 6], C.tile, 0, 0); });
    paper(['r', -60, 640, 660, 30, 0], C.top); paper(['r', -60, 670, 660, 400, 0], C.wood);
    board(270, 630, 420); onion(270, 520, 104);
    const tk = wordS('knife', 'செகண்ட்ல', d * 0.45), k = ease(s / Math.max(0.3, tk)), cut = clamp((s - tk) / 0.5);
    const ky = lerp(170, 404, k) + out3(cut) * 40;
    alpha(0.35 * (1 - cut), () => { for (const dx of [-60, 0, 60]) strip([[300 + dx, ky - 150], [300 + dx, ky - 60]], 4, C.steelD, 0); });   // slow-motion streaks
    knife(470, ky - 6, Math.PI + 0.04 + 0.025 * Math.sin(s * 5), 300, {});   // a slight live tremble in slow motion
    if (cut > 0) for (let i = 0; i < 6; i++) { const a = cut * (0.6 + rnd(i) * 0.6), ang = -Math.PI / 2 + (rnd(i + 4) - 0.5) * 2.2; paper(['c', 270 + Math.cos(ang) * 120 * a, 420 + Math.sin(ang) * 90 * a + a * a * 60, 5 * (1 - cut * 0.5)], C.ring2, 0, 0.2); }   // tiny droplets
  }
  function joke(s, d) {   // helmet on... still crying
    kitchen();
    const q = twos(s);
    cook(270, 596, 1, { mood: 'cry', tears: 1, t: s, chop: 0.5 + 0.5 * Math.sin(q * Math.PI * 2 * 2.5), helmet: true }); counter(9);
  }
  function rehook(s, d) {   // push into the cut face: what happens in that second?
    bgFill('#3A2A3E'); const k = lerp(1, 1.22, s / d);
    g.save(); g.translate(270, 470); g.scale(k, k); onionHalf(0, 0, 220, 190); g.restore();
    alpha(0.35, () => { const gr = g.createRadialGradient(270, 470, 120, 270, 470, 520); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(20,10,25,1)'); g.fillStyle = gr; g.fillRect(-60, -60, 660, 1080); });
  }
  function cellsShot(s, d) {   // inside: two things kept in separate rooms, like a matchstick and its box
    far(() => { bgFill(C.flesh); for (let i = 0; i < 5; i++) paper(['e', 270, 470, 300 - i * 30, 360 - i * 36], i % 2 ? '#EFCADB' : '#F5DDE8', 0, 0); });
    const ts = wordS('cells', 'தீக்குச்சி', d * 0.6), tb = wordS('cells', 'தீப்பெட்டி', d * 0.75), t2 = wordS('cells', 'ரெண்டு', d * 0.2), tw = wordS('cells', 'தனித்தனியா', d * 0.4);
    const open = back(s / 0.45), pan = lerp(-12, 12, ease(s / d));   // the grid drifts across as we look into it
    g.save(); g.translate(270 + pan, 470); g.scale(open, open); g.translate(-270, -470);
    const fl = s > tw ? Math.max(0, 1 - (s - tw) / 0.5) * (0.6 + 0.4 * Math.sin((s - tw) * 30)) : 0;   // the walls flash on "separate"
    const pulse = 1 + 0.35 * Math.max(0, 1 - Math.abs(s - t2) / 0.3);   // the dots pop in from the start; they swell on "ரெண்டு"
    cells({ dots: (s - 0.4) / 0.3, pulse, wallFlash: fl, stick: (s - ts) / 0.3 + 0.12, box: (s - tb) / 0.3 + 0.12, t: s }); g.restore();
  }
  const STRIKE_S = wordS('gas', 'உரசுது', 1.4), CUT_S = wordS('gas', 'வெட்டும்போது', 0.1);
  function gas(s, d) {   // the blade breaks the walls, the matchsticks strike, gas rises straight to the eye
    far(() => { bgFill(C.flesh); for (let i = 0; i < 5; i++) paper(['e', 270, 470, 300 - i * 30, 360 - i * 36], i % 2 ? '#EFCADB' : '#F5DDE8', 0, 0); });
    const by = lerp(300, 660, clamp((s - CUT_S) / 0.5));
    cells({ broken: i => clamp((by - (GRID[i].y + GRID[i].h / 2)) / 30), strike: i => clamp((s - STRIKE_S - (i % 3) * 0.05) / 0.35), t: s });
    if (s > CUT_S - 0.1 && s < CUT_S + 0.8) knife(560, by - 20, Math.PI - 0.08, 520, {});
    const tg = wordS('gas', 'gas', d * 0.5), te = wordS('gas', 'கண்ணுக்கு', d * 0.8);
    for (let i = 0; i < 14; i++) { const a = s - STRIKE_S - 0.25 - i * 0.09; if (a < 0) continue; const u = clamp(a / 1.4), c = GRID[i % 6];
      wisp(lerp(c.x + c.w / 2, 270 + (i % 3 - 1) * 40, out3(u)) + Math.sin(s * 3 + i) * 8, lerp(c.y + 40, 262, u), 12 + u * 14, (1 - u * 0.6) * clamp(a / 0.2)); }
    if (s > tg - 0.3) { alpha(out3((s - tg + 0.3) / 0.4), () => eye(270, 230, 120, 52, { squint: clamp((s - te) / 0.3), look: 0 })); claim('key', 'eye', 150, 175, 240, 110); }   // fades in, no slide (stays clear of the series tag)
  }
  function tears(s, d) {   // the eye takes it for dust, and washes it out
    bgFill(C.skin); const td = wordS('tears', 'தூசுன்னு', d * 0.25), tw = wordS('tears', 'கழுவி', d * 0.5), tt = wordS('tears', 'கண்ணீர்', d * 0.85);
    const sp = [[-0.5, -0.2, 9], [-0.15, 0.35, 7], [0.25, -0.3, 8], [0.55, 0.15, 6]].map(([x, y, r], i) => { const a = clamp((s - td - i * 0.08) / 0.15), wash = clamp((s - tw) / 0.7); return [x + Math.max(0, wash * 2.4 - (x + 1)), y, r * a]; }).filter(p => p[2] > 0.5 && p[0] < 1.05);
    eye(270, 430, 180, 92, { brow: false, squint: clamp((s - td) / 0.25) * (1 - clamp((s - tw - 0.6) / 0.4)) * 0.6, specks: sp, wash: clamp((s - tw) / 0.7), drop: clamp((s - tt + 0.15) / 0.9), look: Math.sin(s * 1.3) * 0.3 });
    claim('key', 'big eye', 70, 350, 400, 200);
  }
  function onionSplit(x, y, r, sep) {   // a whole onion cut in two; the halves part by sep
    for (const side of [-1, 1]) { g.save(); g.translate(side * sep, 0); g.beginPath(); g.rect(side < 0 ? x - r * 1.3 : x, y - r * 1.4, r * 1.3, r * 2.8); g.clip(); onion(x, y, r); g.restore(); }   // move first, then clip, so each half travels whole
    if (sep > 0.5) for (const side of [-1, 1]) { const cx = x + side * sep; paper(['e', cx - side * 1, y + 4, Math.max(1, sep * 0.35), r * 0.86], C.ring1, 0, 0); }   // the clean white faces
  }
  function sharp(s, d) {   // blunt: saws and crushes, juice sprays, a big cloud. sharp: one clean stroke, the halves part, a wisp
    far(() => bgFill(C.wall)); strip([[270, 270], [270, 700]], 4, C.tile, 0);
    paper(['r', -60, 600, 660, 24, 0], C.top); paper(['r', -60, 624, 660, 400, 0], C.wood);
    // left: the blunt knife saws back and forth and presses; the onion squashes; bits and juice fly out; gas billows
    const saw = Math.sin(s * 11) * 14, press = clamp(s / 0.6), squash = 1 - 0.1 * press - 0.02 * Math.abs(Math.sin(s * 11));
    g.save(); g.translate(160, 590); g.scale(1 + (1 - squash) * 0.6, squash); onion(0, -66, 64); g.restore();
    knife(70 + saw, lerp(458, 488, press), -0.05, 150, { dull: true });   // handle on the far left, blade over the onion
    for (let i = 0; i < 14; i++) { const a = ((s * 0.9 + rnd(i)) % 0.7) / 0.7, ang = Math.PI + (rnd(i + 3) * 0.9 + 0.05) * (i % 2 ? 1 : -1) * 0 + (i % 2 ? -0.5 - rnd(i) * 0.9 : -2.6 + rnd(i) * 0.9);
      if (s < 0.4) continue; paper(['e', 160 + Math.cos(ang) * 110 * a, 490 + Math.sin(ang) * 70 * a + a * a * 90, 6 * (1 - a * 0.5), 4, rnd(i)], i % 3 ? C.ring2 : C.tear, 0, 0.2); }
    for (let i = 0; i < 10; i++) { const a = clamp((s - 0.35 - i * 0.08) / 1.3); wisp(160 + (rnd(i + 5) - 0.5) * 110 + Math.sin(s * 2.2 + i) * 8, 452 - a * 110, 12 + a * 20, 0.85 * clamp(a * 4)); }
    // right: one smooth stroke down through the onion, the halves part, only a small wisp
    const cut = ease(clamp((s - 0.2) / 0.7)), sep = 10 * out3(clamp((s - 0.9) / 0.4));
    onionSplit(380, 526, 64, sep);
    knife(458, lerp(408, 506, cut), Math.PI - 0.03, 120, {});   // handle on the far right, inside the frame
    if (s > 1.0) wisp(380 + Math.sin(s * 2) * 4, 438 - clamp((s - 1.0) / 1.4) * 50, 9, 0.7);
    for (const [x, t, col] of [[178, 'மொக்கை', C.red], [350, 'கூர்மை', C.leaf]]) {   // the pill fits its word
      g.save(); g.font = `800 22px ${TA}`; const w = g.measureText(t).width + 30; claim('label', t, x - w / 2, 282, w, 40); paper(['r', x - w / 2, 282, w, 40, 20], col, 0, 0.5); txt(t, x, 303, 22, C.kol, 800); g.restore(); }
  }
  function twist(s, d) {   // he glares at his old blunt knife; the knife sweats
    kitchen();
    const q = twos(s), tm = wordS('twist', 'மொக்கை', d * 0.6);
    cook(270, 596, 1, { mood: q > tm - 0.2 ? 'glare' : 'sus', look: 0.9, raise: clamp((q - 0.1) / 0.4), dullKnife: true, knifeEyes: q > tm - 0.2 }); counter(9);
    for (let i = 0; i < 3; i++) { const a = s - tm - 0.3 - i * 0.35; if (a < 0) continue; const f = (a % 1.05) / 1.05; paper(['e', 412 + i * 9, 250 + f * 110, 5, 8], C.tear, 0, 0.2); }   // sweat drops off the knife
  }

  // ---------- screen-space graphics (1080 space, never moved by the camera) ----------
  const TAG = 'உடம்பு #2';   // series + episode number (Vasanth, 2026-11-18)
  const CARD_Y = 364;
  function card(t, y, sz, k, col = C.kol, ink = C.ind) {   // a paper label that pops in
    if (k <= 0) return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `800 ${sz}px ${TA}`; const tw = g.measureText(t).width + 90;
    k = Math.min(k, 1.02); g.translate(CXS, y); g.scale(k, k); claim('label', t, -tw / 2, -sz * 0.95, tw, sz * 1.9); paper(['r', -tw / 2, -sz * 0.95, tw, sz * 1.9, 30], col); txt(t, 0, 4, sz, ink); g.restore(); }
  function card2(lines, y, sz, k, col = C.kol, ink = C.ind) {   // two lines
    if (k <= 0) return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `800 ${sz}px ${TA}`; const tw = Math.max(...lines.map(l => g.measureText(l).width)) + 80, th = sz * 2.9;
    k = Math.min(k, 1.02); g.translate(CXS, y); g.scale(k, k); claim('label', lines.join(' '), -tw / 2, -th / 2, tw, th); paper(['r', -tw / 2, -th / 2, tw, th, 30], col); txt(lines[0], 0, -sz * 0.62, sz, ink); txt(lines[1], 0, sz * 0.7, sz, ink); g.restore(); }
  const pop = (s, t0, dur = 0.3) => back((s - t0) / dur);
  function overlays(sh, s, d) {
    const n = sh.name;
    if (n === 'hook') { const tn = wordS('hook', 'எதுவுமே', d * 0.7); if (s < tn) card2(['வெங்காயம் வெட்டுனா', 'ஏன் கண்ணுல தண்ணி? 🧅'], CARD_Y, 46, pop(s, 0, 0.25)); else card('உள்ள எதுவும் இல்ல!', CARD_Y, 58, pop(s, tn), C.red, C.kol); }   // one slot: the question, then the stamp
    if (n === 'proof') card('முழு வெங்காயம் = 0 😐', CARD_Y, 50, pop(s, wordS('proof', 'வராது', d * 0.75)));
    if (n === 'rehook') card('?', CARD_Y, 96, pop(s, wordS('rehook', 'என்ன', d * 0.6)), C.red, C.kol);
    if (n === 'cells') card('தீக்குச்சி + தீப்பெட்டி', CARD_Y, 50, pop(s, wordS('cells', 'தீக்குச்சி', d * 0.6)));
    if (n === 'tears') card('கண்ணு = auto wash 💧', CARD_Y, 50, pop(s, wordS('tears', 'கழுவி', d * 0.5)));
    if (n === 'sharp') card('கூர்மை 🔪 = கம்மி gas', CARD_Y, 50, pop(s, wordS('sharp', 'கூர்மையா', d * 0.2)), C.leaf, C.kol);
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `800 40px ${TA}`; const tw = g.measureText(TAG).width + 56; claim("tag", "series tag", 48, 146, tw, 68); paper(["r", 48, 146, tw, 68, 34], C.red, 0, 0.6); txt(TAG, 48 + tw / 2, 182, 40, C.kol, 800); g.restore();   // series name + episode number, on all film
  }

  // ---------- shot list ----------
  const DRAW = { hook, proof, foreshadow, knife: knifeShot, joke, rehook, cells: cellsShot, gas, tears, sharp, twist };
  const SHOTS = TL.shots.map((c, k) => ({ name: c.name, t0: c.t0, t1: c.t1, draw: DRAW[c.name], n: k + 1 }));
  window.VH_SCENES = SHOTS.map(sh => ({ name: `${sh.n} ${sh.name}`, t0: sh.t0, t1: sh.t1 }));
  const GS = SHOTS.find(x => x.name === 'gas'), KICKS = GS ? [[GS.t0 + STRIKE_S + 2 / 30, 1]] : [];   // the one real hit: the matchsticks strike
  const PUNCH = new Set(['twist']);

  // ---------- kinetic Tamil captions: 2-4 word phrases timed to speech, the spoken word in turmeric ----------
  const CAP_SIZE = 66, CAP_Y = 1390, CAP_MAX = 780, CAP_MIN = 54;
  const CHUNKS = (() => {
    const out = [], ws = TL.words || []; g.font = `800 ${CAP_SIZE}px ${TA}`;
    const fits = (arr, sz = CAP_SIZE) => { g.font = `800 ${sz}px ${TA}`; return g.measureText(arr.map(x => x.w).join(' ')).width <= CAP_MAX; };
    let cur = []; const flush = () => { if (cur.length) out.push({ words: cur }); cur = []; };
    ws.forEach(w => { const prev = cur[cur.length - 1]; if (prev && (prev.seg !== w.seg || cur.length >= 4 || !fits(cur.concat(w)))) flush(); cur.push(w); if (/[,.?!…]$/.test(w.w) && cur.length >= 2) flush(); });
    flush();
    for (let i = 0; i < out.length; i++) {   // no lone words: merge into a neighbour in the same line when it fits
      if (out[i].words.length !== 1) continue; const w = out[i].words[0], p = out[i - 1], n = out[i + 1];
      if (p && p.words[0].seg === w.seg && p.words.length < 4 && fits(p.words.concat(w), CAP_MIN)) { p.words.push(w); out.splice(i--, 1); }
      else if (n && n.words[0].seg === w.seg && n.words.length < 4 && fits([w].concat(n.words), CAP_MIN)) { n.words.unshift(w); out.splice(i--, 1); } }
    out.forEach(c => { let sz = CAP_SIZE; while (sz > CAP_MIN && !fits(c.words, sz)) sz -= 2; c.size = sz; });
    out.forEach((c, i) => { c.t0 = c.words[0].t0 - 0.05; const nx = out[i + 1]; c.t1 = nx ? Math.min(nx.words[0].t0 - 0.05, c.words[c.words.length - 1].t1 + 0.6) : c.words[c.words.length - 1].t1 + 0.4; });
    return out;
  })();
  window.VH_CAPTIONS = CHUNKS;
  function captions(t) {
    const c = CHUNKS.find(c => t >= c.t0 && t < c.t1); if (!c) return;
    g.save(); g.font = `800 ${c.size}px ${TA}`; g.textBaseline = 'middle'; g.textAlign = 'left'; g.lineJoin = 'round';
    const sp = g.measureText(' ').width, widths = c.words.map(w => g.measureText(w.w).width), total = widths.reduce((a, b) => a + b, 0) + sp * (c.words.length - 1);
    const pk = 1 + 0.05 * (1 - out3((t - c.t0) / 0.12)); g.translate(CXS, CAP_Y); g.scale(pk, pk); claim('caption', 'caption', -total / 2 - 8, -c.size * 0.62, total + 16, c.size * 1.24);
    let x = -total / 2;
    c.words.forEach((w, i) => { const nextT = c.words[i + 1] ? c.words[i + 1].t0 : c.t1, on = t >= w.t0 - 0.03 && t < nextT;
      g.strokeStyle = '#0B0B10'; g.lineWidth = 13; g.strokeText(w.w, x, 0); g.fillStyle = on ? C.tur : C.kol; g.fillText(w.w, x, 0); x += widths[i] + sp; });
    g.restore();
  }

  // ---------- camera: every shot keeps pushing in; reframes on word times; the picture is drawn at 2x ----------
  const RF_STEPS = [[40, -30, 0.045], [-56, 24, 0.04], [34, 40, 0.045], [-36, -26, 0.04]], RF = {};
  const CALM = new Set(['cells', 'gas', 'tears', 'sharp', 'hook', 'proof', 'joke', 'twist']);   // labels or a face under the card: half the reframe travel
  const PUSH = { gas: 0.5, sharp: 0.3, cells: 0.7 };   // the base push-in, scaled per shot
  const FOCUS_Y = { hook: 612, proof: 612, joke: 612, twist: 612, foreshadow: 940, cells: 880, gas: 760 };   // push towards the face, so it does not climb into the card
  (TL.reframes || []).forEach(r => { (RF[r.shot] = RF[r.shot] || []).push(r.t); });
  function drawInto(ctx, sh, s) {
    const old = g; g = ctx; g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.clearRect(0, 0, W, H);
    const d = sh.t1 - sh.t0, cm = CALM.has(sh.name) ? 0.75 : 1.2, rate = Math.min(0.13, 0.42 / d) * (PUSH[sh.name] ?? 1), x = Math.max(0, s), e = 0.25, fy = FOCUS_Y[sh.name] ?? 900;
    let pk = 1.03 + rate * (x < e ? x * x / (2 * e) : x - e / 2), dx = 0, dy = 0;
    (RF[sh.name] || []).forEach((t, k) => { const m = glide((sh.t0 + s - t) / 0.6), st = RF_STEPS[k % RF_STEPS.length]; dx += st[0] * m * cm; dy += st[1] * m * cm; pk += st[2] * m * cm; });
    const T = sh.t0 + s; dx += Math.sin(T * 1.1) * 10 + Math.sin(T * 2.3) * 5; dy += Math.cos(T * 0.9) * 9; pk += 0.008 * Math.sin(T * 1.7);   // handheld drift
    const mx = CXS * (pk - 1), Mx = (W - CXS) * (pk - 1), my = fy * (pk - 1), My = (H - fy) * (pk - 1);
    g.setTransform(pk, 0, 0, pk, CXS * (1 - pk) + clamp(dx, -Mx, mx), fy * (1 - pk) + clamp(dy, -My, my)); g.scale(2, 2);
    CAM = { pk, fx: CXS / 2, fy: fy / 2 }; sh.draw(s, d);
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
    const j = Math.floor((sh.t0 + s) * 12);   // paper grain that "boils" 12 times a second, like hand-shot paper
    g.save(); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = 0.5; g.drawImage(GRAIN, -Math.floor(rnd(j) * 40), -Math.floor(rnd(j + 7) * 40), W + 40, H + 40); g.restore();
    overlays(sh, s, d);
    g = old;
  }

  // ---------- the contract ----------
  window.renderOut = function (t) {
    BOXES = [];
    t = clamp(+t || 0, 0, DUR);
    let i = SHOTS.findIndex(sh => t >= sh.t0 && t < sh.t1); if (i < 0) i = SHOTS.length - 1;
    const sh = SHOTS[i], s = t - sh.t0, m = mainCtx;
    if (i > 0 && PUNCH.has(sh.name) && s < 0.18) {   // zoom punch on the one beat cut, into the twist
      drawInto(bufB, sh, s); const k = 1 + 0.07 * (1 - out3(s / 0.18));
      m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, W, H); m.drawImage(bufB.canvas, W / 2 - W * k / 2, H / 2 - H * k / 2, W * k, H * k);
    } else drawInto(m, sh, s);
    g = m; g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
    const kn = KICKS.map(([k0, gain]) => [Math.floor((t - k0) * 30 + 1e-6), gain]).find(([n]) => n >= 0 && n < 7);   // impact kick, 7 frames
    if (kn) { const [n, gain] = kn, sg = n % 2 ? -1 : 1, dd = Math.pow(1 - n / 7, 1.5), dx = 4.5 * gain * dd * sg;
      bufK.setTransform(1, 0, 0, 1, 0, 0); bufK.clearRect(0, 0, W, H); bufK.drawImage(m.canvas, 0, 0);
      m.save(); m.clearRect(0, 0, W, H); m.translate(W / 2 + dx, H / 2 + dx * 0.6); m.rotate(0.2 * Math.PI / 180 * dd * sg); m.scale(1.01, 1.01); m.drawImage(bufK.canvas, -W / 2, -H / 2); m.restore(); }
    captions(t);
  };

  window.VH_BOXES = t => { window.renderOut(t); return BOXES.map(b => ({ ...b })); };
  window.renderOut(0);
  const fonts = document.fonts && document.fonts.load ? Promise.all([document.fonts.load(`800 100px ${TA}`, 'தமிழ்'), document.fonts.load(`600 46px ${EN}`, 'gas')]) : Promise.resolve();
  fonts.catch(() => {}).then(() => { window.renderOut(0); window.READY = true; });
})();
