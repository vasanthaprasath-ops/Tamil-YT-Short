// Builds the edit from the voice and writes audio/mix.wav + timeline.js for "02 Pondy grid".
//   node make-audio.js      (needs ffmpeg on PATH or FFMPEG=...; inputs: vo/script.json, vo/vo.mp3, vo/alignment.json)
// The voice is one ElevenLabs take with character timestamps (vo/tts.mjs). Every script segment that names a
// shot cuts to that shot just before its first word; captions get each word's real start/end.
// Music: a light self-made pluck bed (D major, 112 BPM) that ducks under the voice. Effects sit on shot-local times.
'use strict';
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const SR = 44100, TAU = Math.PI * 2, FF = process.env.FFMPEG || 'ffmpeg';
const VO_AT = 0.12, PRE_CUT = 0.06, TAIL = 0.5;
const TEMPO = +(process.env.TEMPO || 1.08);   // pitch-preserving speed-up of the take (ffmpeg atempo); timings scale with it   // voice starts 0.12 s in; cuts land 60 ms before a line

// ---------- 1. voice + alignment -> timeline ----------
const { segments } = JSON.parse(fs.readFileSync(path.join(__dirname, 'vo', 'script.json'), 'utf8'));
const al = JSON.parse(fs.readFileSync(path.join(__dirname, 'vo', 'alignment.json'), 'utf8'));
al.t0 = al.t0.map(x => x / TEMPO); al.t1 = al.t1.map(x => x / TEMPO);
const spoken = segments.map(s => s.say || s.text).join(' ');
if (spoken !== al.text) { console.error('vo/script.json changed since the voice was made: run `node vo/tts.mjs` first'); process.exit(1); }
const segT = [], words = [];
let pos = 0;
segments.forEach((sg, k) => {
  const say = sg.say || sg.text, st = pos, en = pos + say.length - 1;
  pos = en + 2;
  const t0 = al.t0[st] + VO_AT, t1 = al.t1[en] + VO_AT;
  segT.push([+t0.toFixed(3), +t1.toFixed(3)]);
  const cap = sg.text.split(' ');
  if (!sg.say) {   // real per-word times from the alignment
    let p = st;
    for (const w of cap) { const a = p, b = p + w.length - 1; words.push({ w, t0: +(al.t0[a] + VO_AT).toFixed(3), t1: +(al.t1[b] + VO_AT).toFixed(3), seg: k }); p = b + 2; }
  } else {         // caption differs from speech (e.g. digits): spread the caption words over the segment
    const n = cap.reduce((s, w) => s + w.length, 0); let acc = 0;
    for (const w of cap) { const a = t0 + (t1 - t0) * acc / n; acc += w.length; words.push({ w, t0: +a.toFixed(3), t1: +(t0 + (t1 - t0) * acc / n).toFixed(3), seg: k }); }
  }
});
const cuts = [];
segments.forEach((sg, k) => { if (sg.shot) cuts.push({ name: sg.shot, t0: k === 0 ? 0 : +(segT[k][0] - PRE_CUT).toFixed(3) }); });
const DUR = +(segT[segT.length - 1][1] + TAIL).toFixed(3);
cuts.forEach((c, i) => { c.t1 = i + 1 < cuts.length ? cuts[i + 1].t0 : DUR; });
const N = Math.round(SR * DUR);
const shot = name => cuts.find(c => c.name === name);
const at = (name, s) => shot(name).t0 + s;
const sdur = name => shot(name).t1 - shot(name).t0;
const REVEAL = (words.find(w => w.w.includes('Dutch') && w.t0 >= cuts.find(c => c.name === 'twist').t0) || { t0: 0 }).t0;
const wordAt = (name, sub) => { const c = cuts.find(c => c.name === name); const w = words.find(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub)); return w ? w.t0 : c.t0; };
const shotAt = t => (cuts.find(c => t >= c.t0 && t < c.t1) || cuts[cuts.length - 1]).name;

// ---------- helpers ----------
let L = new Float32Array(N), R = new Float32Array(N);
let seed = 20261113;
const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const midi = m => 440 * Math.pow(2, (m - 69) / 12);
function add(t0, dur, fn, pan = 0, gain = 1) {
  const o = Math.round(t0 * SR), a = Math.max(0, o), b = Math.min(N, Math.round((t0 + dur) * SR));
  const gl = Math.cos((pan + 1) * Math.PI / 4) * gain, gr = Math.sin((pan + 1) * Math.PI / 4) * gain;
  for (let i = a; i < b; i++) { const v = fn((i - o) / SR); L[i] += v * gl; R[i] += v * gr; }
}
function addBuf(t0, buf, pan = 0, gain = 1) {
  const a = Math.round(t0 * SR), gl = Math.cos((pan + 1) * Math.PI / 4) * gain, gr = Math.sin((pan + 1) * Math.PI / 4) * gain;
  for (let i = 0; i < buf.length && a + i < N; i++) if (a + i >= 0) { L[a + i] += buf[i] * gl; R[a + i] += buf[i] * gr; }
}
function noise(d) { const o = new Float32Array(Math.max(1, Math.round(d * SR))); for (let i = 0; i < o.length; i++) o[i] = rng() * 2 - 1; return o; }
function lp(buf, k) { let y = 0; for (let i = 0; i < buf.length; i++) { const c = typeof k === 'function' ? k(i / SR) : k; y += (buf[i] - y) * c; buf[i] = y; } return buf; }
function hp(buf, k) { let y = 0; for (let i = 0; i < buf.length; i++) { y += (buf[i] - y) * k; buf[i] = buf[i] - y; } return buf; }
function env(buf, fn) { for (let i = 0; i < buf.length; i++) buf[i] *= fn(i / SR, buf.length / SR); return buf; }
function pluck(f, d, decay = 0.995) {
  const n = Math.round(d * SR), out = new Float32Array(n), p = Math.max(2, Math.round(SR / f)), dl = new Float32Array(p);
  let l = 0; for (let i = 0; i < p; i++) { l = l * 0.55 + (rng() * 2 - 1) * 0.45; dl[i] = l; }
  let idx = 0;
  for (let i = 0; i < n; i++) { const j = (idx + 1) % p; const y = 0.5 * (dl[idx] + dl[j]) * decay; out[i] = dl[idx]; dl[idx] = y; idx = j; }
  const fade = Math.round(0.03 * SR); for (let i = 0; i < fade && i < n; i++) out[n - 1 - i] *= i / fade;
  return out;
}

// ---------- 2. music bed ----------
const B = 60 / 112;
const PROG = [[50, [62, 66, 69, 74]], [47, [59, 62, 66, 71]], [43, [55, 59, 62, 67]], [45, [57, 61, 64, 69]]];   // D Bm G A
const level = t => { const n = shotAt(t); if (n === 'twist') return t < REVEAL ? 0.25 : 1; return ({ guess: 0.6, card: 0.8, hook: 0.85, loop: 0.85 })[n] ?? 1; };
const drums = t => { const n = shotAt(t); return !(['guess', 'card'].includes(n) || (n === 'twist' && t < REVEAL)); };
const PAT = [0, 2, 1, 3, 2, 1, 3, 2];
for (let beat = 0; beat * B < DUR; beat++) {
  const t = beat * B, [root, ch] = PROG[Math.floor(beat / 4) % 4];
  for (let e = 0; e < 2; e++) {
    const te = t + e * B / 2, lv = level(te); if (lv === 0) continue;
    addBuf(te, pluck(midi(ch[PAT[(beat * 2 + e) % 8]] + ((beat % 8 === 7 && e === 1) ? 12 : 0)), 0.7), (((beat * 2 + e) % 3) - 1) * 0.4, 0.16 * lv);
  }
  const lv = level(t); if (lv === 0) continue;
  if (beat % 2 === 0) {
    const f = midi(root - 12);
    add(t, B * 1.8, x => (Math.sin(TAU * f * x) + 0.25 * Math.sin(TAU * 2 * f * x)) * Math.min(1, x / 0.01) * Math.exp(-x * 1.8), 0, 0.2 * lv);
    if (drums(t)) add(t, 0.3, x => Math.sin(TAU * (48 * x + 2 * (1 - Math.exp(-30 * x)))) * Math.exp(-x * 10), 0, 0.42);
  }
  if (drums(t)) addBuf(t + B / 2, env(hp(noise(0.05), 0.5), x => Math.exp(-x * 80)), 0.3, 0.06);
}
{ const d = sdur('card') + 0.2; for (const m of [62, 66, 69]) add(at('card', 0), d, x => Math.sin(TAU * midi(m) * x) * Math.min(1, x / 0.4) * Math.min(1, (d - x) / 0.5), (m - 66) / 6, 0.05); }
{ const d = REVEAL - at('guess', 0); add(at('guess', 0), d, x => Math.sin(TAU * midi(38) * x) * Math.min(1, x / 0.3) * Math.min(1, (d - x) / 0.1), 0, 0.1); }   // suspense drone up to the reveal
const ML = L, MR = R; L = new Float32Array(N); R = new Float32Array(N);   // from here on: effects

// ---------- 3. effects ----------
const whoosh = (t0, d = 0.4, pan = 0, g = 0.45) => addBuf(t0, env(lp(hp(noise(d), 0.05), x => 0.04 + 0.3 * Math.sin(Math.PI * x / d)), (x, l) => Math.sin(Math.PI * x / l)), pan, g);
const pop = (t0, f = 700) => add(t0, 0.12, x => Math.sin(TAU * (f * 0.55 * x + f * 0.45 * (1 - Math.exp(-x * 30)) / 30)) * Math.exp(-x * 30), 0, 0.22);
const boom = t0 => { add(t0, 0.8, x => Math.sin(TAU * (50 * x + 1.5 * (1 - Math.exp(-x * 12)))) * Math.exp(-x * 3), 0, 0.5); addBuf(t0, env(lp(noise(0.2), 0.08), x => Math.exp(-x * 25)), 0, 0.5); };
const snap = t0 => { addBuf(t0, env(hp(noise(0.02), 0.6), x => Math.exp(-x * 300)), 0.3, 0.5); whoosh(t0 + 0.02, 0.3, 0.6); };
const bell = (t0, f = 880, g = 0.14, pan = 0) => add(t0, 0.95, x => Math.min(1, (0.95 - x) / 0.25) * (Math.sin(TAU * f * x) + 0.5 * Math.sin(TAU * f * 2 * x) * Math.exp(-x * 2) + 0.3 * Math.sin(TAU * f * 2.76 * x) * Math.exp(-x * 3)) * Math.exp(-x * 1.8), pan, g);
const knock = (t0, pan) => { add(t0, 0.07, x => Math.sin(TAU * 820 * x) * Math.exp(-x * 70), pan, 0.16); addBuf(t0, env(hp(noise(0.01), 0.5), x => Math.exp(-x * 400)), pan, 0.1); };
const skid = (t0, pan) => addBuf(t0, env(lp(hp(noise(0.22), 0.3), 0.5), (x, l) => Math.sin(Math.PI * x / l)), pan, 0.12);
const horn = t0 => { for (const [o, d] of [[0, 0.12], [0.17, 0.16]]) add(t0 + o, d, x => (Math.sin(TAU * 415 * x) + 0.4 * Math.sin(TAU * 1245 * x) + Math.sin(TAU * 520 * x)) * Math.min(1, x / 0.01) * Math.min(1, (d - x) / 0.02), 0.1, 0.08); };
const huh = t0 => add(t0, 0.4, x => { const f = 620 - 300 * (x / 0.4); return (Math.sin(TAU * f * x) + 0.5 * Math.sin(TAU * f * 1.5 * x)) * Math.sin(Math.PI * x / 0.4); }, 0, 0.1);
const ping = t0 => { for (const [f, o] of [[1568, 0], [2093, 0.09]]) add(t0 + o, 0.5, x => Math.sin(TAU * f * x) * Math.exp(-x * 7), 0.2, 0.08); };
function rustle(t0, d) { const b = hp(noise(d), 0.2); let amp = 0; for (let i = 0; i < b.length; i++) { if (i % 1300 === 0) amp = rng() < 0.6 ? 0.3 + rng() * 0.7 : 0.05; b[i] *= amp; } lp(b, 0.35); env(b, (x, l) => Math.min(1, x / 0.08) * Math.min(1, (l - x) / 0.15)); addBuf(t0, b, -0.2, 0.3); }
function rain(t0, d) { addBuf(t0, env(lp(hp(noise(d), 0.08), 0.4), (x, l) => Math.min(1, x / 0.4) * Math.min(1, (l - x) / 0.5)), 0, 0.12); }
// the fixed "question" whoosh opens every Short
whoosh(0, 0.5, 0, 0.5); horn(0.25);
[0.6, 1.2, 1.8, 2.4].forEach((t, i) => skid(t, i % 2 ? 0.5 : -0.5));
whoosh(at('foreshadow', -0.05), 0.35); rustle(at('foreshadow', 0.05), 0.6);
{ const t = wordAt('foreshadow', 'இல்ல'); add(t, 0.28, x => Math.sign(Math.sin(TAU * 140 * x)) * 0.5 * Math.exp(-x * 6), 0, 0.12); pop(t + 0.05, 380); }   // wrong-answer buzz on 'French இல்ல'
whoosh(at('contrast', -0.05), 0.3); { const t = wordAt('contrast', 'ஆனா'); whoosh(t - 0.1, 0.3, 0.4); }
for (let k = 0; k < 6; k++) { const t = at('ruler', 0.3 + k * 0.55); addBuf(t, env(hp(noise(0.35), 0.35), (x, l) => Math.sin(Math.PI * x / l)), (k % 2 ? 0.3 : -0.3), 0.14); pop(t + 0.3, 900 + k * 60); }   // pencil strokes + houses
whoosh(at('guess', -0.05), 0.3); [0.1, 0.35, 0.6].forEach((o, i) => pop(at('guess', o), 600 + i * 150));
for (let t = at('guess', 0.9); t < REVEAL - 0.25; t += 0.5) knock(t, 0);   // clock ticking towards the reveal
addBuf(REVEAL - 0.9, env(lp(noise(0.9), x => 0.02 + 0.3 * (x / 0.9)), (x, l) => Math.pow(x / l, 2)), 0, 0.25);   // riser
snap(REVEAL); boom(REVEAL); bell(REVEAL + 0.05, 440, 0.12); pop(REVEAL + 0.08, 420);   // reveal sting
pop(at('french', 0.5), 760); bell(at('french', 0.3), 784, 0.08, 0.4);
for (let x = 0.9; x < sdur('french') - 0.3; x += 0.27) knock(at('french', x), Math.round(x / 0.27) % 2 ? 0.4 : -0.4);
whoosh(at('card', -0.1), 0.3); bell(at('card', 0.05), 587, 0.1); bell(wordAt('card', 'கட்டினது'), 880, 0.06);
whoosh(at('loop', 0), 0.45, 0, 0.35);

// ---------- 4. mix: voice on top, music ducks with a follower on the voice ----------
const vb = execFileSync(FF, ['-v', 'error', '-i', path.join(__dirname, 'vo', 'vo.mp3'), '-af', 'atempo=' + TEMPO, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
const VOs = new Float32Array(vb.buffer.slice(vb.byteOffset, vb.byteOffset + vb.byteLength));
const VL = new Float32Array(N), a0 = Math.round(VO_AT * SR);
for (let k = 0; k < VOs.length && a0 + k < N; k++) VL[a0 + k] = VOs[k];
const peakOf = (...bs) => bs.reduce((p, b) => { for (let i = 0; i < b.length; i++) p = Math.max(p, Math.abs(b[i])); return p; }, 0);
// Loudness by measurement (playbook: voice about -14 LUFS, bed about -25 to -30 LUFS under it; practitioner guidance).
const os = require('os'), { spawnSync } = require('child_process');
function wav(Lc, Rc) {
  const d = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) { d.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Lc[i])) * 32767), i * 4); d.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Rc[i])) * 32767), i * 4 + 2); }
  const hh = Buffer.alloc(44);
  hh.write('RIFF', 0); hh.writeUInt32LE(36 + d.length, 4); hh.write('WAVE', 8); hh.write('fmt ', 12); hh.writeUInt32LE(16, 16); hh.writeUInt16LE(1, 20); hh.writeUInt16LE(2, 22);
  hh.writeUInt32LE(SR, 24); hh.writeUInt32LE(SR * 4, 28); hh.writeUInt16LE(4, 32); hh.writeUInt16LE(16, 34); hh.write('data', 36); hh.writeUInt32LE(d.length, 40);
  return Buffer.concat([hh, d]);
}
function lufs(Lc, Rc) {   // integrated loudness (EBU R128) via ffmpeg
  const f = path.join(os.tmpdir(), 'pondy-stem-' + process.pid + '.wav'); fs.writeFileSync(f, wav(Lc, Rc));
  const r = spawnSync(FF, ['-hide_banner', '-nostats', '-i', f, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' }); fs.unlinkSync(f);
  const m = [...r.stderr.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].pop(); return m ? +m[1] : -70;
}
const VOICE_LUFS = -14, BED_LUFS = -27;
// bed = ducked music + effects (ducking follows the voice envelope)
const BL = new Float32Array(N), BR = new Float32Array(N), vp = 0.9 / Math.max(1e-6, peakOf(VL));
let e = 0; const att = 1 - Math.exp(-1 / (0.01 * SR)), rel = 1 - Math.exp(-1 / (0.35 * SR));
for (let i = 0; i < N; i++) {
  const x = Math.abs(VL[i] * vp); e += (x - e) * (x > e ? att : rel);
  const duck = 1 - 0.6 * Math.min(1, e / 0.08);
  BL[i] = ML[i] * duck + L[i] * 0.9; BR[i] = MR[i] * duck + R[i] * 0.9;
}
const vI = lufs(VL, VL), bI = lufs(BL, BR);
const vg = Math.pow(10, (VOICE_LUFS - vI) / 20), bg = Math.pow(10, (BED_LUFS - bI) / 20);
for (let i = 0; i < N; i++) { L[i] = BL[i] * bg + VL[i] * vg; R[i] = BR[i] * bg + VL[i] * vg; }
// soft limiter to keep peaks under about -1 dBFS, plus a short fade at the very end
for (let i = 0; i < N; i++) { const f = Math.min(1, (N - i) / (SR * 0.12)); L[i] = 0.89 * Math.tanh(L[i] * f / 0.89); R[i] = 0.89 * Math.tanh(R[i] * f / 0.89); }
const mI = lufs(L, R);
const gain = Math.min(Math.pow(10, (VOICE_LUFS - mI) / 20), 0.89 / Math.max(1e-6, peakOf(L, R)));   // final mix to -14 LUFS, peak <= -1 dBFS
console.log(`loudness: voice stem ${vI.toFixed(1)} -> ${VOICE_LUFS}, bed stem ${bI.toFixed(1)} -> ${BED_LUFS}, mix ${mI.toFixed(1)} LUFS before final gain x${gain.toFixed(2)}`);
const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) { data.writeInt16LE(Math.round(L[i] * gain * 32767), i * 4); data.writeInt16LE(Math.round(R[i] * gain * 32767), i * 4 + 2); }
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22);
h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
fs.mkdirSync(path.join(__dirname, 'audio'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'audio', 'mix.wav'), Buffer.concat([h, data]));
fs.writeFileSync(path.join(__dirname, 'timeline.js'),
  `// written by make-audio.js from the voice: shot cuts, each script segment's [start, end] and every caption word's timing (s)\n` +
  `window.TIMELINE = ${JSON.stringify({ dur: DUR, shots: cuts, segs: segT, words })};\n`);
console.log(`timeline: ${DUR.toFixed(2)} s, ${cuts.length} shots: ${cuts.map(c => `${c.name} ${(c.t1 - c.t0).toFixed(1)}`).join(' | ')}`);
