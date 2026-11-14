// Gives a rushed take breathing room without re-recording: makes sure every sentence end (. ! ?) is followed by at
// least MIN seconds of pause, and every "…" by at least DOTS seconds, by inserting silence. Character times shift
// with it, so captions and shot cuts stay in sync. The opposite of tighten.mjs.
//   node vo/breathe.mjs <take.mp3> <take.json> [--min 0.32] [--dots 0.4]   -> vo/vo.mp3 + vo/alignment.json
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url)), FF = process.env.FFMPEG || 'ffmpeg', SR = 44100;
const args = process.argv.slice(2), [mp3, js] = args;
const opt = (n, d) => args.includes(n) ? +args[args.indexOf(n) + 1] : d;
const MIN = opt('--min', 0.32), DOTS = opt('--dots', 0.4);
const al = JSON.parse(fs.readFileSync(js, 'utf8'));
const raw = execFileSync(FF, ['-v', 'error', '-i', mp3, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
const x = new Float32Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));

const adds = [];   // [time s, seconds of silence to insert]
for (let i = 0; i < al.chars.length - 1; i++) {
  const c = al.chars[i]; if (!/[.!?…]/.test(c) || al.chars[i + 1] !== ' ') continue;
  const want = c === '…' ? DOTS : MIN, gap = al.t0[i + 2] - al.t1[i - 0] + (al.t1[i + 1] - al.t0[i + 1]) * 0;   // gap from end of the mark to the next word
  const have = Math.max(0, al.t0[i + 2] - al.t1[i]);
  if (have < want - 0.02) adds.push([(al.t1[i] + al.t0[i + 2]) / 2, want - have]);
}
const parts = []; let pos = 0;
for (const [t, d] of adds) { const k = Math.round(t * SR); parts.push(x.subarray(pos, k), new Float32Array(Math.round(d * SR))); pos = k; }
parts.push(x.subarray(pos));
const y = new Float32Array(parts.reduce((s, p) => s + p.length, 0)); let o = 0; for (const p of parts) { y.set(p, o); o += p.length; }
const shift = t => t + adds.reduce((s, [at, d]) => s + (t > at ? d : 0), 0);
al.t0 = al.t0.map(shift); al.t1 = al.t1.map(shift);
const tmp = path.join(dir, 'breathe.f32'); fs.writeFileSync(tmp, Buffer.from(y.buffer));
execFileSync(FF, ['-v', 'error', '-y', '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', tmp, '-b:a', '192k', path.join(dir, 'vo.mp3')]);
fs.unlinkSync(tmp);
fs.writeFileSync(path.join(dir, 'alignment.json'), JSON.stringify(al));
console.log(`breathe: ${adds.length} pauses lengthened, ${adds.reduce((s, a) => s + a[1], 0).toFixed(2)} s added, speech now ${al.t1[al.t1.length - 1].toFixed(2)} s`);
