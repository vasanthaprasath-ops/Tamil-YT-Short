// Shortens long pauses in a voice take without re-recording (kit/film-craft.md §1.8: pauses over 0.25 s add up to
// <= 1.0 s per 40 s). Uses the character alignment: any space/punctuation span longer than the cap is cut down to
// it from its middle, with a 10 ms crossfade; one think-pause after a "?" may stay up to 0.45 s. All character times
// after a cut shift with it, so captions and shot cuts stay in sync.
//   node vo/tighten.mjs <take.mp3> <take.json>     -> writes vo/vo.mp3 + vo/alignment.json
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url)), FF = process.env.FFMPEG || 'ffmpeg', SR = 44100;
const [mp3, js] = process.argv.slice(2);
const al = JSON.parse(fs.readFileSync(js, 'utf8'));
const CAP = 0.22, THINK = 0.45, XF = Math.round(0.01 * SR);
const raw = execFileSync(FF, ['-v', 'error', '-i', mp3, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
const x = new Float32Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));

const cuts = [];   // [start s, end s) removed
let thinkUsed = false;
for (let i = 0; i < al.chars.length; i++) {
  if (!/[\s.,!?…]/.test(al.chars[i])) continue;
  const a = al.t0[i], b = al.t1[i], d = b - a, prevQ = al.chars.slice(Math.max(0, i - 2), i + 1).includes('?');
  const cap = prevQ && !thinkUsed ? THINK : CAP;
  if (prevQ && !thinkUsed && d > CAP) thinkUsed = true;
  if (d > cap + 0.02) { const mid = (a + b) / 2, cut = d - cap; cuts.push([mid - cut / 2, mid + cut / 2]); }
}
// merge overlapping cuts (several punctuation chars can share one silence)
cuts.sort((p, q) => p[0] - q[0]);
const m = []; for (const c of cuts) { const l = m[m.length - 1]; if (l && c[0] <= l[1]) l[1] = Math.max(l[1], c[1]); else m.push([...c]); }

// rebuild audio with short crossfades at each joint
const out = []; let pos = 0;
for (const [a, b] of m) {
  const ia = Math.round(a * SR), ib = Math.round(b * SR);
  out.push(x.subarray(pos, ia)); pos = ib;
}
out.push(x.subarray(pos));
const total = out.reduce((s, p) => s + p.length, 0), y = new Float32Array(total);
let o = 0;
out.forEach((p, k) => {
  y.set(p, o);
  if (k > 0) for (let i = 0; i < XF && o + i < total; i++) { const g = i / XF; y[o + i] *= g; if (o - XF + i >= 0) y[o - XF + i] *= 1 - g * 0.0; }
  o += p.length;
});
// shift character times
const shift = t => { let s = 0; for (const [a, b] of m) { if (t >= b) s += b - a; else if (t > a) s += t - a; } return t - s; };
al.t0 = al.t0.map(shift); al.t1 = al.t1.map(shift);
const tmp = path.join(dir, 'tight.f32'); fs.writeFileSync(tmp, Buffer.from(y.buffer));
execFileSync(FF, ['-v', 'error', '-y', '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', tmp, '-b:a', '192k', path.join(dir, 'vo.mp3')]);
fs.unlinkSync(tmp);
fs.writeFileSync(path.join(dir, 'alignment.json'), JSON.stringify(al));
const removed = m.reduce((s, [a, b]) => s + b - a, 0);
console.log(`tightened ${path.basename(mp3)}: ${m.length} pauses shortened, ${removed.toFixed(2)} s removed, speech now ${al.t1[al.t1.length - 1].toFixed(2)} s`);
