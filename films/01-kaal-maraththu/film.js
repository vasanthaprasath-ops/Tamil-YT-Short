// 01 - Kaal maraththu: why the needle-prick is a good sign (episode file: Tamil-YT-Short/episodes/01-kaal-maraththu.md)
// A vertical Short (1080x1920, 30 fps) drawn in code in the clean PAPER CUT-OUT look: flat paper shapes in layers,
// soft shadows, light grain, no outlines. VideoHub contract: window.renderOut(t) draws second t synchronously as a
// pure function of t; window.READY once fonts are in; window.VH_SCENES lists the shots.
(function () {
  'use strict';
  const TL = window.TIMELINE;   // written by make-audio.js from the voice: shot cuts, word times, reframe times
  if (!TL) throw new Error('timeline.js missing: run node make-audio.js');
  const W = 1080, H = 1920, DUR = TL.dur, CXS = 504;   // CXS: centre of the Shorts safe box (x 90-918)
  const mainCtx = document.getElementById('c').getContext('2d');
  let g = mainCtx;
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c.getContext('2d'); };
  const bufB = mk(), bufK = mk();
  const C = { tur: '#E3A72F', kol: '#F7F3EA', red: '#B23A2E', leaf: '#4C8C3A', ind: '#1F2A44', skin: '#8A5230', skinD: '#6E3F22', hair: '#16110E', trou: '#6E6E73', paper: '#F3EADB', teal: '#2C6E7C', flesh: '#C9745A', dull: '#B9A98C' };
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
  const mix = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), x = p(a), y = p(b); return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], k))).join(',')})`; };
  function wordS(name, sub, dflt, nth = 0) {   // shot-local time of a caption word, 2 frames early (film-craft §2.11)
    const c = TL.shots.find(x => x.name === name); if (!c) return dflt;
    const w = (TL.words || []).filter(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub))[nth];
    return w ? w.t0 - c.t0 - 2 / 30 : dflt;
  }

  // ---------- layout guard ----------
  // Every label, caption and important picture element reports its box in screen pixels. kit/tools/layout-check.cjs
  // reads them through window.VH_BOXES(t) and fails the film if two overlap or one leaves the frame.
  // kinds: 'label' (screen text), 'caption', 'key' (must be fully readable: a face, the ✗, the brain), 'prop' (arrow...).
  // ZONES (1080x1920): series tag y 150-206, far top-left (as high as phone app bars allow) | labels y 340-650 | picture subject y 660-1150 | captions y 1230-1370.
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
  const GRAIN = (() => { const c = mk(), id = c.createImageData(W, H), d = id.data; for (let i = 0; i < d.length; i += 4) { const v = 128 + (rnd(i * 0.37) - 0.5) * 70; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; } c.putImageData(id, 0, 0); return c.canvas; })();

  // ---------- Mani, a paper puppet (540 space; origin = between his feet) ----------
  function face(x, y, r, mood, look = 0) {
    paper(['e', x - r * 0.98, y + r * 0.05, r * 0.17, r * 0.24], C.skinD, 0, 0.4); paper(['e', x + r * 0.98, y + r * 0.05, r * 0.17, r * 0.24], C.skinD, 0, 0.4);
    paper(['c', x, y, r], C.skin);
    paper(['p', [[x - r * 1.02, y - r * 0.3], [x - r * 0.9, y - r * 0.95], [x, y - r * 1.2], [x + r * 0.9, y - r * 0.95], [x + r * 1.02, y - r * 0.3], [x + r * 0.55, y - r * 0.62], [x - r * 0.2, y - r * 0.5], [x - r * 0.7, y - r * 0.6]]], C.hair, 0, 0.6);
    const ew = mood === 'shock' ? 0.27 : mood === 'smile' ? 0.2 : 0.22, dx = look * r * 0.08, dy = mood === 'down' ? r * 0.09 : 0;
    for (const sx of [-1, 1]) { paper(['c', x + sx * r * 0.36, y - r * 0.02, r * ew], C.kol, 0, 0.3); paper(['c', x + sx * r * 0.36 + dx, y + dy, r * 0.1], C.hair, 0, 0); }
    const up = mood === 'shock' ? 0.5 : mood === 'smile' ? 0.42 : 0.36, tilt = mood === 'sus' ? 0.2 : 0.08;
    strip([[x - r * 0.58, y - r * (up - 0.08)], [x - r * 0.2, y - r * up]], r * 0.11, C.hair, 0); strip([[x + r * 0.2, y - r * up], [x + r * 0.58, y - r * (up - tilt)]], r * 0.11, C.hair, 0);
    strip([[x - r * 0.32, y + r * 0.42], [x, y + r * 0.34], [x + r * 0.32, y + r * 0.42]], r * 0.1, C.hair, 0);
    if (mood === 'shock') paper(['e', x, y + r * 0.66, r * 0.17, r * 0.2], '#2A0E0C', 0, 0);
    else if (mood === 'smile') { g.save(); g.beginPath(); g.moveTo(x - r * 0.3, y + r * 0.56); g.quadraticCurveTo(x, y + r * 0.9, x + r * 0.3, y + r * 0.56); g.closePath(); g.fillStyle = '#2A0E0C'; g.fill(); g.fillStyle = C.kol; g.fillRect(x - r * 0.2, y + r * 0.57, r * 0.4, r * 0.08); g.restore(); }
    else strip([[x - r * 0.16, y + r * 0.63], [x + r * 0.16, y + r * 0.6]], r * 0.08, '#2A0E0C', 0);
  }
  // o: buckle 0..1 (numb leg folds), arms 0..1 (thrown up), pat 0..1 (right hand to the numb leg), mood, look, lean (rad), grey 0..1 (numb leg colour)
  function mani(x, y, k, o = {}) {
    const b = o.buckle || 0, a = o.arms || 0, p = o.pat || 0, L = (u, v, w) => [lerp(u[0], v[0], w), lerp(u[1], v[1], w)];
    g.save(); g.translate(x, y); g.scale(k, k); g.rotate(o.lean || 0);
    paper(['e', 0, 6, 120, 16], 'rgba(31,42,68,0.22)', 0, 0);
    strip([[14, -260], [28, -130], [20, -14]], 44, C.trou); paper(['e', 34, -2, 34, 14], '#3A2A22');
    const kn = L([-26, -130], [-80, -160], b), ft = L([-30, -14], [-38, -60], b), legCol = mix(C.trou, '#9A9AA2', o.grey || 0);
    strip([[-22, -260], kn, ft], 44, legCol); paper(['e', ft[0] - 12, ft[1] + 12, 34, 14, b * 0.5], '#3A2A22');
    paper(['r', -66, -460, 132, 220, 56], C.tur);
    const eL = L([-66, -340], [-114, -350], a), hL = L([-62, -270], [-138, -400], a);
    strip([[-52, -410], eL, hL], 30, C.skin);
    const eR0 = L([66, -340], [122, -380], a), hR0 = L([62, -270], [154, -428], a), eR = L(eR0, [40, -330], p), hR = L(hR0, [-34, -230], p);
    strip([[52, -410], eR, hR], 30, C.skin);
    paper(['r', -18, -500, 36, 50, 12], C.skinD, 0, 0.4);
    face(0, -560, 78, o.mood || 'neutral', o.look || 0); claim('key', 'face', -84, -648, 168, 172);
    g.restore();
  }

  // ---------- the leg, opened in paper layers (540 space) ----------
  const NERVE = [[348, 800], [352, 540], [372, 430], [330, 372], [70, 392], [74, 300]];   // foot ... knee (pinch) ... brain
  const NLEN = (() => { const a = [0]; for (let i = 1; i < NERVE.length; i++) a.push(a[i - 1] + Math.hypot(NERVE[i][0] - NERVE[i - 1][0], NERVE[i][1] - NERVE[i - 1][1])); return a; })();
  const U_PINCH = NLEN[2] / NLEN[5];
  function along(u) { const d = clamp(u) * NLEN[5]; let i = 1; while (i < 5 && NLEN[i] < d) i++; const k = (d - NLEN[i - 1]) / (NLEN[i] - NLEN[i - 1]); return [lerp(NERVE[i - 1][0], NERVE[i][0], k), lerp(NERVE[i - 1][1], NERVE[i][1], k)]; }
  function nervePart(u0, u1, col, w = 14) { if (u1 - u0 < 0.005) return; const pts = [along(u0)]; for (let i = 1; i < 5; i++) { const u = NLEN[i] / NLEN[5]; if (u > u0 && u < u1) pts.push(NERVE[i]); } pts.push(along(u1)); strip(pts, w, col, 0.6); }
  // o: lit (0..1 how far the nerve glows, from the foot), pinch 0..1, dots [u...], grey 0..1, vessel 0..1 (how thin), q (brain "?" alpha), sparks [[u, r, col]]
  function leg(o = {}) {
    const grey = o.grey || 0, pinch = o.pinch || 0;
    paper(['p', [[40, 330], [330, 300], [420, 330], [450, 420], [420, 520], [390, 760], [440, 800], [430, 850], [300, 850], [290, 800], [300, 520], [250, 440], [40, 450]]], mix(C.skin, '#8E8780', grey * 0.7));
    paper(['p', [[70, 360], [320, 334], [392, 356], [414, 420], [390, 520], [366, 760], [330, 800], [326, 520], [272, 414], [70, 420]]], mix(C.flesh, '#B3A9A2', grey * 0.7));
    if (o.vessel !== undefined) strip([[322, 790], [326, 540], [344, 446]], lerp(18, 4, o.vessel), C.red, 0.5);
    const lit = o.lit === undefined ? 1 : o.lit, stopAt = pinch > 0.5 ? Math.min(lit, U_PINCH) : lit;
    nervePart(0, 1, C.dull); nervePart(0, stopAt, C.tur);
    (o.dots || []).forEach(u => { const p = along(u); paper(['c', p[0], p[1], 9], C.kol, 0, 0.4); });
    if (!o.closeUp) claim('key', 'brain', 18, 206, 112, 90); paper(['e', 74, 250, 58, 46], '#E9A7A0'); strip([[40, 250], [74, 232], [108, 252]], 5, C.flesh, 0); strip([[52, 270], [78, 258], [100, 274]], 5, C.flesh, 0);   // the brain
    if (o.q > 0) { claim('key', 'brain ?', 54, 148, 40, 56); g.save(); g.globalAlpha = clamp(o.q); txt('?', 74, 176, 56, C.red, 900, EN); g.restore(); }
    if (pinch > 0) { const dy = (1 - out3(pinch)) * -340;   // the weight comes down on the knee
      if (!o.closeUp) claim('prop', 'weight arrow', 328, 190 + dy, 144, 206); paper(['p', [[360, 190 + dy], [440, 190 + dy], [440, 316 + dy], [472, 316 + dy], [400, 396 + dy], [328, 316 + dy], [360, 316 + dy]]], C.ind); if (!o.noLabel) txt('weight', 400, 246 + dy, 22, C.kol, 700, EN);   // inside the frame (note #1); tip stops above the ✗ (note #2)
      if (pinch > 0.85) { const k = back((pinch - 0.85) / 0.15); claim('key', 'cross', 372, 412, 56, 56); paper(['c', 400, 440, 30 * k], C.red, 0, 0.5); strip([[400 - 14 * k, 440 - 14 * k], [400 + 14 * k, 440 + 14 * k]], 8, C.kol, 0); strip([[400 + 14 * k, 440 - 14 * k], [400 - 14 * k, 440 + 14 * k]], 8, C.kol, 0); } }
    (o.sparks || []).forEach(([u, r, col, rot]) => { const p = along(u); spark(p[0], p[1], r, col, rot || 0); });
  }
  const bgFill = col => { g.fillStyle = col; g.fillRect(-60, -60, 660, 1080); };

  // ---------- the wedding hall (shots hook, joke, mystery, twist) ----------
  function hall() {
    bgFill('#F6E7C8'); paper(['r', -60, 250, 660, 60, 0], '#E9CF9E', 0, 0.5);
    for (let i = 0; i < 7; i++) paper(['p', [[-16 + i * 92, 250], [30 + i * 92, 310], [76 + i * 92, 250]]], i % 2 ? C.red : C.tur, 0, 0.5);
    paper(['r', -60, 700, 660, 400, 0], '#DDBB8C');
    for (let i = 0; i < 3; i++) { const x = 330 + i * 96, y = 800 + i * 34; paper(['e', x, y, 62, 26, -0.08], C.leaf); strip([[x - 54, y + 4], [x + 54, y - 4]], 3, '#7FBC4E', 0); paper(['c', x - 14, y - 4, 12], C.kol, 0, 0.4); paper(['c', x + 16, y + 2, 7], C.tur, 0, 0.4); }
  }
  const PRICKS = [[-112, -180, 20, C.red], [-142, -114, 14, C.tur], [-86, -92, 12, C.red], [-124, -220, 11, C.tur], [-58, -130, 10, C.kol], [-150, -60, 12, C.kol]];
  function pricks(x, y, k, s, t0, n = 6) { PRICKS.slice(0, n).forEach(([dx, dy, r, col], i) => { const a = s - t0 - i * 0.09; if (a < 0) return; const pulse = 0.75 + 0.25 * Math.sin(twos(s) * 9 + i * 2); spark(x + dx * k, y + dy * k, r * k * back(a / 0.2) * pulse, col, twos(s) * 0.8 + i); }); }

  // ---------- shots (s = seconds into the shot, d = its length) ----------
  function hook(s, d) {
    hall(); const q = twos(s), up = out3(q / 0.45), wob = Math.sin(q * 11) * 0.03 * clamp(1 - (q - 0.5) / 1.2), good = wordS('hook', 'நல்ல', d * 0.8);
    mani(206, 836 + (1 - up) * 90, 0.8, { buckle: ease((q - 0.25) / 0.3), arms: ease((q - 0.3) / 0.3), mood: s > good ? 'smile' : 'shock', lean: wob - 0.04, grey: 0.6 });
    pricks(206, 836, 0.8, s, wordS('hook', 'ஊசி', 1.1));
  }
  function foreshadow(s, d) {   // close on his face: he looks down at the leg, then up at us
    bgFill('#F6E7C8'); paper(['r', -60, 640, 660, 400, 0], '#DDBB8C'); const q = twos(s), upAt = d * 0.55;
    paper(['r', 110, 600, 320, 500, 130], C.tur); paper(['r', 232, 520, 76, 110, 24], C.skinD, 0, 0.4);
    face(270, 400, 170, q > upAt ? 'smile' : 'down', q > upAt ? 0 : -0.4);
  }
  function wire(s, d) {   // one wire from the foot to the brain; messages run along it
    bgFill(C.paper); const q = twos(s), lit = ease((s - 0.3) / 1.1), dots = [];
    if (lit >= 1) for (let i = 0; i < 5; i++) dots.push(((q * 0.42 + i / 5) % 1));
    g.save(); g.translate(69, 196); g.scale(0.8, 0.8); leg({ lit, dots }); g.restore();
  }
  function press(s, d) {
    bgFill(C.paper); const q = twos(s), p = clamp((s - (wordS('press', 'அமுக்குது', d * 0.7) - 0.35)) / 0.45), dots = [];
    for (let i = 0; i < 5; i++) { const u = (q * 0.42 + i / 5) % 1; if (p < 0.9 || u < U_PINCH - 0.02) dots.push(u); }
    g.save(); g.translate(69, 196); g.scale(0.8, 0.8); leg({ pinch: p, dots }); g.restore();
  }
  function blood(s, d) {   // close on the pinch: the vessel beside the nerve squeezes thin
    bgFill(C.paper); const k = lerp(1.5, 1.72, s / d);
    g.save(); g.translate(270, 480); g.scale(k, k); g.translate(-372, -500);
    leg({ pinch: 1, vessel: ease((s - 0.2) / 1.0), dots: [0.1, 0.19, 0.27], noLabel: true, closeUp: true });   // a close-up: the brain and the arrow's top are meant to be out of frame g.restore();
  }
  function stop(s, d) {
    bgFill(C.paper); const q = twos(s), no = wordS('stop', 'போகாது', d * 0.4), numb = wordS('stop', 'அதான்', d * 0.6), dots = [];
    for (let i = 0; i < 6; i++) dots.push(Math.min(U_PINCH - 0.03 - i * 0.045, q * 0.35 - i * 0.07));
    g.save(); g.translate(69, 196); g.scale(0.8, 0.8); leg({ pinch: 1, dots: dots.filter(u => u > 0), q: (s - no) / 0.2, grey: ease((s - numb) / 0.5), noLabel: true }); g.restore();
  }
  function joke(s, d) {   // he pinches the numb leg twice, feels nothing, and eyes it with suspicion
    hall(); const q = twos(s), dt = wordS('joke', 'doubt', d * 0.75), pin = Math.max(0, Math.sin(clamp((q - 0.2) / 0.6) * Math.PI * 2)) ;
    mani(230, 836, 0.8, { pat: 0.75 + 0.25 * pin, mood: q > dt ? 'sus' : 'down', look: q > dt ? 0 : -0.5, lean: -0.05, grey: 0.6, buckle: 0.15 });
    if (s > dt) { const k = back((s - dt) / 0.25); g.save(); g.translate(140, 610); g.rotate(-0.15); g.scale(k, k); claim('prop', '? bubble', -46, -46, 92, 92); paper(['c', 0, 0, 46], C.kol); txt('?', 0, 4, 64, C.red, 900, EN); g.restore(); }
  }
  function mystery(s, d) {   // he stands; the first prickle hits; freeze on the question
    hall(); const q = twos(s);
    mani(206, 836, 0.8, { buckle: 0.5, arms: ease((q - 0.1) / 0.25), mood: 'shock', lean: -0.04, grey: 0.4 });
    pricks(206, 836, 0.8, s, 0.25, 3);
  }
  function phone(s, d) {   // no tower... then the signal is back and every held message lands at once
    bgFill(C.teal); const q = twos(s), sig = wordS('analogy', 'Signal', d * 0.4), pour = wordS('analogy', 'message', d * 0.6);   // the messages start pouring when he says 'message', not on the last word
    g.save(); g.translate(0, -40);
    claim('key', 'phone signal', 96, 356, 166, 140); paper(['r', 64, 290, 230, 420, 34], C.ind); paper(['r', 82, 330, 194, 340, 16], C.kol, 0, 0.3);
    for (let i = 0; i < 4; i++) { const on = s > sig + i * 0.16; paper(['r', 104 + i * 26, 400 - i * 13, 17, 24 + i * 13, 5], on ? C.leaf : '#C9CDD3', 0, 0.3); }
    if (s < sig) { const k = back(clamp(s / 0.25)); paper(['c', 226, 386, 24 * k], C.red, 0, 0.4); strip([[214, 374], [238, 398]], 6, C.kol, 0); strip([[238, 374], [214, 398]], 6, C.kol, 0); txt('No tower', 179, 470, 26, C.ind, 700, EN); }
    else { const k = back((s - sig) / 0.25); g.save(); g.translate(179, 470); g.scale(k, k); txt('Signal ✓', 0, 0, 28, C.leaf, 800, EN); g.restore(); }
    for (let i = 0; i < 7; i++) { const a = q - pour - i * 0.2; if (a < 0) continue;   // the messages pour out
      const k = out3(a / 0.3), x = lerp(180, 250 + (i % 4) * 54 + rnd(i) * 20, k), y = lerp(520, 380 + i * 56 + rnd(i + 3) * 16, k), w = (110 - (i % 3) * 14) * lerp(0.4, 1, k), col = i % 2 ? '#62A64C' : C.kol;
      paper(['r', x, y, w, 44, 22], col); paper(['p', [[x + 10, y + 38], [x + 2, y + 58], [x + 30, y + 42]]], col, 0, 0.3); strip([[x + 20, y + 22], [x + w - 22, y + 22]], 5, i % 2 ? C.kol : '#9FB7BE', 0); }
    g.restore();
  }
  const DINGS = [0, 1, 2].map(i => wordS('reveal', 'டிங்', 0.3 + i * 0.35, i));
  function reveal(s, d) {   // the same burst inside the leg: one spray of sparks per "ding"
    bgFill(C.teal); const q = twos(s), sp = [];
    DINGS.forEach((t0, j) => { if (s < t0) return; for (let i = 0; i < 4; i++) { const a = s - t0 - i * 0.03, u = 0.06 + ((j * 4 + i) * 0.079) % 0.9; sp.push([u, (14 + (i % 3) * 5) * back(a / 0.18) * (0.8 + 0.2 * Math.sin(q * 10 + i)), [C.kol, C.tur, C.red][(i + j) % 3], q + i]); } });
    g.save(); g.translate(69, 196); g.scale(0.8, 0.8); leg({ lit: 1, sparks: sp }); g.restore();
  }
  function twist(s, d) {   // he pats the leg, smiles and walks off: it is back
    hall(); const q = twos(s), walk = clamp((q - d * 0.5) / (d * 0.5)), step = Math.sin(q * 9) * 0.5 + 0.5;
    mani(206 + walk * 150, 836, 0.8, { pat: walk > 0 ? 0 : 0.75 + 0.25 * Math.max(0, Math.sin(q * 10)), mood: 'smile', lean: walk > 0 ? 0.05 : -0.03, buckle: walk > 0 ? step * 0.25 : 0, arms: 0 });
    pricks(206, 836, 0.8, s, -1, Math.max(0, Math.round(4 * (1 - s / (d * 0.4)))));
  }

  // ---------- screen-space graphics (1080 space, never moved by the camera) ----------
  function card(t, y, sz, k, col = C.kol, ink = C.ind, w = 0) {   // a paper label that pops in
    if (k <= 0) return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = `800 ${sz}px ${TA}`; const tw = Math.max(w, g.measureText(t).width + 90);
    g.translate(CXS, y); g.scale(k, k); claim('label', t, -tw / 2, -sz * 0.95, tw, sz * 1.9); paper(['r', -tw / 2, -sz * 0.95, tw, sz * 1.9, 30], col); txt(t, 0, 4, sz, ink); g.restore(); }
  const pop = (s, t0, dur = 0.3) => back((s - t0) / dur);
  function overlays(sh, s, d) {
    const n = sh.name;
    if (n === 'hook') { const gd = wordS('hook', 'நல்ல', d * 0.8); if (s < gd) card('ஊசி குத்துதா?', 410, 76, pop(s, wordS('hook', 'ஊசி', 1) - 0.1)); else card('நல்ல sign!', 410, 88, pop(s, gd), C.tur); }   // one slot: the worry, then the good news
    if (n === 'wire') card('நரம்பு = wire', 410, 80, pop(s, wordS('wire', 'நரம்புன்னு', d * 0.6)));
    if (n === 'stop') { card('Signal ✗', 410, 80, pop(s, wordS('stop', 'போகாது', d * 0.4)), C.ind, C.kol); }
    if (n === 'mystery') card('ஏன்?', 420, 110, pop(s, wordS('mystery', 'ஏன்', d * 0.5)), C.red, C.kol);
    if (n === 'reveal') { const k = DINGS.filter(t0 => s >= t0).length; if (k) card(['டிங்!', 'டிங் டிங்!', 'டிங் டிங் டிங்!'][k - 1], 410, 88, 0.9 + 0.1 * pop(s, DINGS[k - 1], 0.18), C.tur); }
    if (n === 'twist') {   // the doctor line as a card (never spoken), no channel-name or Subscribe tag (Vasanth, 2026-11-14)
      const c0 = wordS('twist', 'கால்', d * 0.55), k = pop(s, c0, 0.35);
      if (k > 0) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(CXS, 430); g.scale(k, k); claim('label', 'doctor card', -372, -84, 744, 168); paper(['r', -372, -84, 744, 168, 30], C.kol); txt('சில நிமிஷத்துல சரியாகும்.', 0, -32, 44, C.ind); txt('அடிக்கடி வந்தா doctor-அ பாருங்க.', 0, 36, 36, C.red, 700); g.restore(); }
    }
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); claim('tag', 'series tag', 48, 150, 246, 56); paper(['r', 48, 150, 246, 56, 28], C.red, 0, 0.6); txt('உடம்பு series', 171, 179, 30, C.kol, 700); g.restore();   // series tag, on all film
  }

  // ---------- shot list ----------
  const DRAW = { hook, foreshadow, wire, press, blood, stop, joke, mystery, analogy: phone, reveal, twist };
  const SHOTS = TL.shots.map((c, k) => ({ name: c.name, t0: c.t0, t1: c.t1, draw: DRAW[c.name], n: k + 1 }));
  window.VH_SCENES = SHOTS.map(sh => ({ name: `${sh.n} ${sh.name}`, t0: sh.t0, t1: sh.t1 }));
  const REV = SHOTS.find(x => x.name === 'reveal'), KICKS = REV ? [[REV.t0 + DINGS[0], 1]] : [];   // the one real hit: the first ding
  const PUNCH = new Set(['reveal']);

  // ---------- kinetic Tamil captions: 2-4 word phrases timed to speech, the spoken word in turmeric ----------
  const CAP_SIZE = 66, CAP_Y = 1300, CAP_MAX = 780, CAP_MIN = 54;
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
  const CALM = new Set(['wire', 'press', 'stop', 'reveal']);   // diagrams with labels above them: half the camera travel
  (TL.reframes || []).forEach(r => { (RF[r.shot] = RF[r.shot] || []).push(r.t); });
  function drawInto(ctx, sh, s) {
    const old = g; g = ctx; g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.clearRect(0, 0, W, H);
    const d = sh.t1 - sh.t0, cm = CALM.has(sh.name) ? 0.5 : 1, rate = Math.min(0.1, 0.3 / d), x = Math.max(0, s), e = 0.25; let pk = 1.03 + rate * (x < e ? x * x / (2 * e) : x - e / 2), dx = 0, dy = 0;
    (RF[sh.name] || []).forEach((t, k) => { const m = glide((sh.t0 + s - t) / 0.6), st = RF_STEPS[k % RF_STEPS.length]; dx += st[0] * m * cm; dy += st[1] * m * cm; pk += st[2] * m * cm; });
    const mx = CXS * (pk - 1), Mx = (W - CXS) * (pk - 1), my = 900 * (pk - 1), My = (H - 900) * (pk - 1);
    g.setTransform(pk, 0, 0, pk, CXS * (1 - pk) + clamp(dx, -Mx, mx), 900 * (1 - pk) + clamp(dy, -My, my)); g.scale(2, 2);
    sh.draw(s, d);
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
    if (i > 0 && PUNCH.has(sh.name) && s < 0.18) {   // zoom punch on the one beat cut, into the reveal
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
  const fonts = document.fonts && document.fonts.load ? Promise.all([document.fonts.load(`800 100px ${TA}`, 'தமிழ்'), document.fonts.load(`600 46px ${EN}`, 'Signal')]) : Promise.resolve();
  fonts.catch(() => {}).then(() => { window.renderOut(0); window.READY = true; });
})();
