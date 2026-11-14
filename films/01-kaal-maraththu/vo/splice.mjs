// Joins the opening of one take to the rest of another when only the first lines of the script changed, so a new
// hook doesn't need a whole new take. Cuts at a sentence end in A and a sentence start in B; levels A to B (RMS);
// keeps a short gap; rebuilds the alignment so captions and shot cuts stay exact.
//   node vo/splice.mjs <A.mp3> <A.json> <nSentencesFromA> <B.mp3> <B.json> <first word of B's part>
//   -> vo/vo.mp3 + vo/alignment.json (text must then equal vo/script.json, which make-audio.js checks)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url)), FF = process.env.FFMPEG || 'ffmpeg', SR = 44100;
const [aMp3, aJs, nA, bMp3, bJs, bWord] = process.argv.slice(2);
const dec = f => { const r = execFileSync(FF, ['-v', 'error', '-i', f, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 }); return new Float32Array(r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength)); };
const A = JSON.parse(fs.readFileSync(aJs, 'utf8')), B = JSON.parse(fs.readFileSync(bJs, 'utf8'));
const ends = []; for (let i = 0; i < A.chars.length; i++) if (/[.!?]/.test(A.chars[i]) && (A.chars[i + 1] === ' ' || i === A.chars.length - 1)) ends.push(i);
const ia = ends[+nA - 1];
const bText = B.chars.join(''), ib = bText.indexOf(bWord);
if (ia === undefined || ib < 0) { console.error('cut point not found'); process.exit(1); }
const xa = dec(aMp3), xb = dec(bMp3);
const aEnd = A.t1[ia] + 0.12, bStart = Math.max(0, B.t0[ib] - 0.04), GAP = 0.1;
const pa = xa.subarray(0, Math.round(aEnd * SR)), pb = xb.subarray(Math.round(bStart * SR));
const rms = p => Math.sqrt(p.reduce((s, v) => s + v * v, 0) / Math.max(1, p.length));
const k = rms(pb) / Math.max(1e-9, rms(pa));
const y = new Float32Array(pa.length + Math.round(GAP * SR) + pb.length);
pa.forEach((v, i) => { y[i] = v * k * Math.min(1, (pa.length - i) / 441); });
const off = pa.length + Math.round(GAP * SR);
pb.forEach((v, i) => { y[off + i] = v * Math.min(1, i / 441); });
const shiftB = off / SR - bStart;
const chars = A.chars.slice(0, ia + 1).concat([' '], B.chars.slice(ib));
const t0 = A.t0.slice(0, ia + 1).concat([A.t1[ia]], B.t0.slice(ib).map(t => t + shiftB));
const t1 = A.t1.slice(0, ia + 1).concat([B.t0[ib] + shiftB], B.t1.slice(ib).map(t => t + shiftB));
const tmp = path.join(dir, 'splice.f32'); fs.writeFileSync(tmp, Buffer.from(y.buffer));
execFileSync(FF, ['-v', 'error', '-y', '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', tmp, '-b:a', '192k', path.join(dir, 'vo.mp3')]);
fs.unlinkSync(tmp);
fs.writeFileSync(path.join(dir, 'alignment.json'), JSON.stringify({ model: A.model, voice: A.voice, text: chars.join(''), chars, t0, t1, spliced: [path.basename(aMp3), path.basename(bMp3)] }));
console.log(`spliced: ${A.t1[ia].toFixed(2)} s of ${path.basename(aMp3)} + ${path.basename(bMp3)} from "${bWord}" (level x${k.toFixed(2)}); speech ${t1[t1.length - 1].toFixed(2)} s`);
