// Builds the edit from the voice and writes audio/mix.wav + timeline.js for "03 Vengaayam".
//   node make-audio.js      (needs ffmpeg on PATH or FFMPEG=...; inputs: vo/script.json, vo/vo.mp3, vo/alignment.json)
// The voice is one ElevenLabs take with character timestamps (vo/tts.mjs). Every script segment that names a
// shot cuts to that shot just before its first word; captions get each word's real start/end.
// Music: a light self-made pluck bed (D major, 112 BPM) that ducks under the voice. Effects sit on shot-local times.
'use strict';
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const SR = 44100, TAU = Math.PI * 2, FF = process.env.FFMPEG || 'ffmpeg';
const VO_AT = 0.12, PRE_CUT = 0.06, TAIL = 0.5;
const TEMPO = +(process.env.TEMPO || 1.1);   // 1.1x, Vasanth's pick for ep 03 (Eleven v4 web-app take); pitch-preserving, timings scale with it

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
const wordAt = (name, sub) => { const c = cuts.find(c => c.name === name); const w = words.find(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub)); return w ? w.t0 : c.t0; };
const shotAt = t => (cuts.find(c => t >= c.t0 && t < c.t1) || cuts[cuts.length - 1]).name;
// film-craft §5.2: the music stops dead on the pivot word (the matchstick strikes) and stays out until the tears answer has landed
const STRIKE = wordAt('gas', 'உரசுது'), HOOK_REVEAL = 0.9;   // HOOK_REVEAL: the sad close-up pulls back to show the onion
const ANSWER_END = segT[segments.findIndex(s => s.shot === 'tears')][1];
const STOP0 = STRIKE, STOP1 = ANSWER_END + 0.15;
// v2 (§2.2): a new framing at least every ~1.8 s. Reframe glides start on a word, chosen here once and written to
// timeline.js, so film.js (the move) and the whoosh below read the same times. Hook tracks the scooter, card is a
// still graphic and loop must land on hook's frame 0, so they get none.
const REFRAMES = [];
for (const c of cuts) {
  if (c.name === 'hook') continue;   // the hook has its own action; every other shot gets reframes
  const from = c.t0 + 0.6, to = c.t1 - 0.5, ws = words.filter(w => w.t0 > from && w.t0 < to);
  let last = c.t0;
  for (;;) {
    const target = last + 1.3, ok = ws.filter(w => w.t0 >= last + 0.9 && Math.abs(w.t0 - target) <= 0.5);   // ep 03: a new framing about every 1.3 s (Vasanth: the camera felt still)
    if (!ok.length) break;
    const w = ok.reduce((a, b) => Math.abs(b.t0 - target) < Math.abs(a.t0 - target) ? b : a);
    REFRAMES.push({ shot: c.name, t: +(w.t0 - 2 / 30).toFixed(3) }); last = w.t0;
  }
}

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
// music states (§5.4): hook full, explain light, tension (pedal + ticks), stop (silence), payoff, end
const level = t => { if (t < HOOK_REVEAL || (t >= STOP0 && t < STOP1)) return 0; const n = shotAt(t); return ({ hook: 1, proof: 0.8, foreshadow: 0.8, knife: 0.6, joke: 0.85, rehook: 0.45, cells: 0.45, sharp: 0.8, twist: 1 })[n] ?? 0.8; };   // no bed under the sad open: the violin owns it
const drums = t => { const n = shotAt(t); return !(['knife', 'rehook', 'cells'].includes(n) || (t >= STOP0 && t < STOP1)); };
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

{ const d = STOP0 - at('rehook', 0); add(at('rehook', 0), d, x => Math.sin(TAU * midi(38) * x) * Math.min(1, x / 0.3) * Math.min(1, (d - x) / 0.012), 0, 0.1); }   // tension pedal from the mystery question, cut dead at the stop
// the stop: a 12 ms fade on everything that rings over STOP0 (no click), silence until STOP1
{ const a = Math.round(STOP0 * SR), b = Math.min(N, Math.round(STOP1 * SR)), f = Math.round(0.012 * SR); for (let i = a; i < b; i++) { const k = i < a + f ? 1 - (i - a) / f : 0; L[i] *= k; R[i] *= k; } }
// the return: a tonic "button" chord (D major) right after the answer lands
for (const m of [50, 62, 66, 69, 74]) add(STOP1, 1.4, x => (Math.sin(TAU * midi(m) * x) + 0.3 * Math.sin(TAU * 2 * midi(m) * x)) * Math.min(1, x / 0.005) * Math.exp(-x * 2.6), (m - 64) / 20, 0.07);
// composed ending (§5.12): tonic chord on the last word, nothing after it, ring out
{ const tl = words[words.length - 1].t0, d = DUR - tl; for (const m of [50, 57, 62, 66]) add(tl, d, x => Math.sin(TAU * midi(m) * x) * Math.min(1, x / 0.01) * Math.exp(-x * 1.5) * Math.min(1, (d - x) / 0.2), 0, 0.06); }
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
// ---- ep 03 effects: each one is caused by something on screen, timed from the voice's word times ----
const tick = (t0, f, g = 0.1, pan = 0) => add(t0, 0.09, x => Math.sin(TAU * f * x) * Math.exp(-x * 45), pan, g);
const thud = t0 => { add(t0, 0.35, x => Math.sin(TAU * (70 * x + 1.2 * (1 - Math.exp(-x * 14)))) * Math.exp(-x * 8), 0, 0.5); add(t0, 0.2, x => Math.sin(TAU * 190 * x) * Math.exp(-x * 16), 0, 0.24); };
const chop = (t0, g = 0.22, pan = 0.15) => { add(t0, 0.09, x => Math.sin(TAU * (180 * x + 0.8 * (1 - Math.exp(-x * 60)))) * Math.exp(-x * 45), pan, g); addBuf(t0, env(hp(noise(0.03), 0.4), x => Math.exp(-x * 160)), pan, g * 0.6); };   // knife on the board
const sniff = (t0, g = 0.12) => addBuf(t0, env(lp(hp(noise(0.22), 0.25), x => 0.05 + 0.4 * (x / 0.22)), (x, l) => Math.sin(Math.PI * x / l) * (x / l)), 0, g);
const violin = (t0, notes) => notes.forEach(([m, o, d]) => add(t0 + o, d, x => { const f = midi(m) * (1 + 0.006 * Math.sin(TAU * 5.5 * x) * Math.min(1, x / 0.15)); let v = 0; for (let k = 1; k <= 7; k++) v += Math.sin(TAU * k * f * x) / k; return v * Math.min(1, x / 0.08) * Math.min(1, (d - x) / 0.1); }, -0.1, 0.05));
const clonk = t0 => { for (const [f, gg] of [[1250, 0.1], [1890, 0.06], [2710, 0.04]]) add(t0, 0.5, x => Math.sin(TAU * f * x) * Math.exp(-x * 9), 0.2, gg); addBuf(t0, env(hp(noise(0.01), 0.5), x => Math.exp(-x * 400)), 0.2, 0.12); };   // knife taps the helmet
const strike = t0 => { addBuf(t0, env(hp(noise(0.12), 0.35), (x, l) => Math.min(1, x / 0.01) * Math.exp(-x * 22)), 0, 0.45); addBuf(t0 + 0.08, env(lp(noise(0.6), x => 0.05 + 0.25 * Math.exp(-x * 4)), x => Math.min(1, x / 0.03) * Math.exp(-x * 5)), 0, 0.35); };   // matchstick scratch + catch
const hiss = (t0, d) => addBuf(t0, env(hp(noise(d), 0.35), (x, l) => Math.min(1, x / (l * 0.6)) * Math.min(1, (l - x) / 0.2)), -0.2, 0.08);   // the gas rising
const swish = (t0, d = 0.7) => addBuf(t0, env(lp(noise(d), x => 0.03 + 0.12 * Math.sin(Math.PI * x / d)), (x, l) => Math.sin(Math.PI * x / l)), 0.1, 0.3);   // tears washing across the eye
const crunch = (t0, n = 7) => { for (let i = 0; i < n; i++) addBuf(t0 + i * 0.045 + rng() * 0.02, env(hp(noise(0.03), 0.3), x => Math.exp(-x * 120)), -0.4, 0.16); };   // blunt knife crushing
const shing = t0 => add(t0, 0.6, x => (Math.sin(TAU * 2637 * x) + 0.4 * Math.sin(TAU * 3951 * x)) * Math.min(1, x / 0.004) * Math.exp(-x * 7), 0.4, 0.06);   // sharp knife: one clean slice
const allWords = (name, sub) => { const c = shot(name); return words.filter(w => w.t0 >= c.t0 - 0.01 && w.t0 < c.t1 && w.w.includes(sub)).map(w => w.t0); };
const onGrid = (t, step) => Math.ceil(t / step - 1e-9) * step;
whoosh(0, 0.5, 0, 0.5);                                                    // the fixed "question" whoosh opens every Short
violin(0.05, [[69, 0, 0.42], [65, 0.42, 0.5]]); sniff(0.3); sniff(0.62, 0.1);   // the sad open: is he heartbroken?
huh(HOOK_REVEAL - 0.05);                                                   // ...no, it's an onion
[1.25, 1.62, 1.99, 2.36].forEach((t, i) => chop(t, 0.16, i % 2 ? 0.25 : 0.05));   // he keeps chopping, crying
{ const t = wordAt('hook', 'எதுவுமே') - 2 / 30; pop(t, 520); thud(t + 0.02); }   // the stamp: nothing inside
{ const t = wordAt('proof', 'பாருங்க'); tick(t, 1500, 0.08); tick(t + 0.22, 1500, 0.08); }   // two dry blinks
bell(wordAt('proof', 'வராது') - 2 / 30, 1047, 0.07);                       // not a drop
bell(wordAt('foreshadow', 'அழ') - 2 / 30, 1319, 0.06, 0.2);
{ const t1 = wordAt('knife', 'செகண்ட்ல') - 2 / 30; for (let t = at('knife', 0.15); t < t1 - 0.15; t += 0.36) tick(t, 1150, 0.09, 0.1); chop(t1, 0.3, 0); }   // slow-motion ticks, then the blade lands
[0.35, 0.75, 1.15].forEach(o => chop(at('joke', o), 0.15)); clonk(wordAt('joke', 'helmet') + 0.1); sniff(wordAt('joke', 'கண்ணீர்'), 0.12);   // helmet on, still crying
whoosh(at('rehook', -0.05), 0.35);                                        // into the onion
for (let t = onGrid(at('rehook', 0.5), B); t < STOP0 - 0.3; t += B) knock(t, 0);   // ticking towards the strike, on the music's grid
pop(wordAt('cells', 'தீக்குச்சி') - 2 / 30, 640); pop(wordAt('cells', 'தீப்பெட்டி') - 2 / 30, 820);   // the two rooms
addBuf(STOP0 - 0.7, env(lp(noise(0.7), x => 0.02 + 0.3 * (x / 0.7)), (x, l) => Math.pow(x / l, 2)), 0, 0.2);   // riser into the strike
snap(wordAt('gas', 'வெட்டும்போது'));                                       // the blade breaks the walls
strike(STRIKE - 1 / 30);                                                   // the matchstick strikes: the one real hit
hiss(wordAt('gas', 'gas') - 0.1, 1.6);                                    // the gas rises to the eyes
{ const t = wordAt('tears', 'தூசுன்னு'); [0, 0.09, 0.2].forEach((o, i) => tick(t + o, 2600 + i * 300, 0.05, i % 2 ? 0.3 : -0.3)); }   // dust specks land
swish(wordAt('tears', 'கழுவி') - 0.15, 0.8);                             // the wash
boom(ANSWER_END + 0.02); add(ANSWER_END + 0.02, 0.25, x => Math.sin(TAU * 220 * x) * Math.exp(-x * 14), 0, 0.16);   // the hit lands after the answer, never on it (§5.1)
whoosh(at('sharp', -0.05), 0.35); crunch(at('sharp', 0.35)); shing(wordAt('sharp', 'கூர்மையா'));   // blunt crushes, sharp slices
whoosh(at('twist', -0.05), 0.35); huh(wordAt('twist', 'மொக்கை') - 0.05); [0.5, 0.9].forEach(o => pop(wordAt('twist', 'மொக்கை') + o, 1100));   // he glares; the knife sweats
// a soft whoosh on every reframe glide (§5.8): peak ~80 ms after the move starts, 0.5 s long, alternating pan
// Whooshes only where the PLACE changes (kitchen -> inside the onion -> knives -> kitchen) plus the opening one: 4 in the film.
// A whoosh on every camera reframe and every cut gave 22 in 41 s; Vasanth heard it as repetitive (2026-11-14).
const SL = L, SR_ = R;   // effects stem

// ---------- 3b. ambience bed (§5.5): always on, one per place, crossfaded at the cuts ----------
L = new Float32Array(N); R = new Float32Array(N);
const PLACE = Object.fromEntries(cuts.map(c => [c.name, 'room']));   // one place: indoors. A quiet room tone under everything
{
  // three continuous beds, each a pure noise texture; gains follow the current place with a 0.2 s crossfade
  const sea = lp(noise(DUR), 0.05), town = hp(lp(noise(DUR), 0.12), 0.01), room = lp(noise(DUR), 0.02);
  const placeGain = (name, t) => { const c = cuts.find(c => t >= c.t0 - 0.1 && t < c.t1 + 0.1 && PLACE[c.name] === name); if (!c) return 0; return Math.min(1, (t - c.t0 + 0.1) / 0.2, (c.t1 + 0.1 - t) / 0.2); };
  for (let i = 0; i < N; i++) {
    const t = i / SR, gs = placeGain('sea', t), gt = placeGain('town', t), gr = placeGain('room', t);
    const swell = 0.55 + 0.45 * Math.sin(TAU * t / 6.5) * Math.sin(TAU * t / 2.3);   // slow waves
    const v = sea[i] * gs * swell * 1.6 + town[i] * gt * 0.8 + room[i] * gr * 1.4;
    L[i] += v; R[i] += v * 0.92;
  }
  // a few far birds over the town, and small gulls over the sea
  for (const c of cuts) {
    const p = PLACE[c.name]; if (p === 'room') continue;
    for (let t = c.t0 + 0.3 + rng() * 0.6; t < c.t1 - 0.2; t += 0.9 + rng() * 1.4) {
      const f = p === 'sea' ? 1400 + rng() * 300 : 2600 + rng() * 900, d = 0.12 + rng() * 0.1, pan = rng() * 1.4 - 0.7;
      add(t, d, x => Math.sin(TAU * (f * x - 0.3 * f * x * x / d)) * Math.sin(Math.PI * x / d), pan, 0.05);
    }
  }
}
const AL = L, AR = R;

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
// v2 (§5.6, 5.10): every stem measured on its own and set relative to the voice. Music 12 LU under (10-14 LU,
// Vasanth's choice for older listeners), effects 11 LU under, ambience 28 LU under.
const VOICE_LUFS = -14, MUSIC_LUFS = -26, SFX_LUFS = -25, AMB_LUFS = -42;
// v2 (§5.7): duck the music from word times, not from the audio: -3.5 dB, attack 70 ms, release 450 ms,
// word gaps under 0.3 s merged, plus a further -2.5 dB ride under each sentence-final word
const spans = [];
for (const w of words) { const l = spans[spans.length - 1]; if (l && w.t0 - l[1] < 0.3) l[1] = w.t1; else spans.push([w.t0, w.t1]); }
const finals = segT.map(([, b]) => b);
const DK = new Float32Array(N);
{ let gdb = 0, si = 0; const att = 1 - Math.exp(-1 / (0.07 * SR)), rel = 1 - Math.exp(-1 / (0.45 * SR));
  for (let i = 0; i < N; i++) {
    const t = i / SR; while (si < spans.length && spans[si][1] < t) si++;
    const inW = si < spans.length && t >= spans[si][0];
    const fin = finals.some(b => t > b - 0.35 && t < b);
    const target = (inW ? -3.5 : 0) + (fin ? -2.5 : 0);
    gdb += (target - gdb) * (target < gdb ? att : rel); DK[i] = Math.pow(10, gdb / 20);
  } }
const MLd = new Float32Array(N), MRd = new Float32Array(N);
for (let i = 0; i < N; i++) { MLd[i] = ML[i] * DK[i]; MRd[i] = MR[i] * DK[i]; }
const vI = lufs(VL, VL), mIu = lufs(MLd, MRd), sI = lufs(SL, SR_), aI = lufs(AL, AR);
const G = (target, have) => Math.pow(10, (target - have) / 20);
const vg = G(VOICE_LUFS, vI), mg = G(MUSIC_LUFS, mIu), sg = G(SFX_LUFS, sI), ag = G(AMB_LUFS, aI);
// ambience rises to about 20 LU under the voice in music-free gaps (the stop), so silence is never empty
const ambRise = t => (t >= STOP0 && t < STOP1) ? Math.pow(10, 8 / 20) : 1;
for (let i = 0; i < N; i++) { const ar = ag * ambRise(i / SR); L[i] = MLd[i] * mg + SL[i] * sg + AL[i] * ar + VL[i] * vg; R[i] = MRd[i] * mg + SR_[i] * sg + AR[i] * ar + VL[i] * vg; }
// v2 (§5.14): look-ahead gain limiter instead of an always-on tanh clipper: 5 ms look-ahead, 80 ms release
{ const ceil = 0.84, la = Math.round(0.005 * SR), relK = 1 - Math.exp(-1 / (0.08 * SR)), need = new Float32Array(N);
  for (let i = 0; i < N; i++) { const p = Math.max(Math.abs(L[i]), Math.abs(R[i])); need[i] = p > ceil ? ceil / p : 1; }
  // minimum over the look-ahead window (monotonic deque), then attack instantly / release smoothly
  const q = new Int32Array(N + 1); let qh = 0, qt = 0, gl = 1;
  for (let i = 0; i < N + la; i++) {
    if (i < N) { while (qt > qh && need[q[qt - 1]] >= need[i]) qt--; q[qt++] = i; }
    const o = i - la; if (o < 0) continue;
    while (q[qh] < o) qh++;
    const want = need[q[qh]]; gl = want < gl ? want : gl + (want - gl) * relK;
    const f = Math.min(1, (N - o) / (SR * 0.12));   // short fade at the very end
    L[o] *= gl * f; R[o] *= gl * f;
  } }
const mI = lufs(L, R);
const gain = Math.min(Math.pow(10, (VOICE_LUFS - mI) / 20), 0.84 / Math.max(1e-6, peakOf(L, R)));   // final mix to -14 LUFS; sample peak <= -1.5 dBFS so the TRUE peak stays under -1 dBTP (earshot measured -0.8 at 0.89)
console.log(`loudness: voice ${vI.toFixed(1)} -> ${VOICE_LUFS}, music ${mIu.toFixed(1)} -> ${MUSIC_LUFS}, sfx ${sI.toFixed(1)} -> ${SFX_LUFS}, ambience ${aI.toFixed(1)} -> ${AMB_LUFS}, mix ${mI.toFixed(1)} LUFS before final gain x${gain.toFixed(2)}`);
console.log(`music stop: ${STOP0.toFixed(2)}-${STOP1.toFixed(2)} s (strike word at ${STRIKE.toFixed(2)} s)`);
const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) { data.writeInt16LE(Math.round(L[i] * gain * 32767), i * 4); data.writeInt16LE(Math.round(R[i] * gain * 32767), i * 4 + 2); }
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22);
h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
fs.mkdirSync(path.join(__dirname, 'audio'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'audio', 'mix.wav'), Buffer.concat([h, data]));
fs.writeFileSync(path.join(__dirname, 'timeline.js'),
  `// written by make-audio.js from the voice: shot cuts, each script segment's [start, end] and every caption word's timing (s)\n` +
  `window.TIMELINE = ${JSON.stringify({ dur: DUR, shots: cuts, segs: segT, words, reframes: REFRAMES })};\n`);
console.log(`timeline: ${DUR.toFixed(2)} s, ${cuts.length} shots: ${cuts.map(c => `${c.name} ${(c.t1 - c.t0).toFixed(1)}`).join(' | ')}`);
