// Word timings for a take made in the ElevenLabs web app (no timestamps): finds the pauses with ffmpeg, matches
// them to the script's sentence ends (dynamic programming on syllable share vs time share), then spreads each
// sentence's words over its speech by syllable count. Writes alignment.json in the same shape tts.mjs writes.
//   node vo/align-from-silence.cjs <take.mp3>      (ffmpeg on PATH; reads vo/script.json)
// shortcut: word times inside a sentence are proportional, about +-0.15 s; use ElevenLabs forced alignment if captions drift.
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const take = process.argv[2], dir = __dirname;
const { segments } = JSON.parse(fs.readFileSync(path.join(dir, 'script.json'), 'utf8'));
const text = segments.map(s => s.say || s.text).join(' ');
const syl = s => { let n = 0; for (const w of (s.match(/[஀-௿]+/g) || [])) for (let i = 0; i < w.length; i++) { const c = w.charCodeAt(i); if (c >= 0x0B85 && c <= 0x0BB9 && w.charCodeAt(i + 1) !== 0x0BCD) n++; }
  for (const w of (s.match(/[A-Za-z]+/g) || [])) n += Math.max(1, (w.toLowerCase().replace(/e$/, '').match(/[aeiouy]+/g) || []).length); return Math.max(n, 1); };
// sentence units: [start, end] char index, ending at ? ! . … followed by a space or the end
const units = []; let st = 0;
for (let i = 0; i < text.length; i++) if ('?!.…'.includes(text[i]) && (i + 1 === text.length || text[i + 1] === ' ')) { units.push([st, i]); st = i + 2; }
if (st < text.length) units.push([st, text.length - 1]);
// speech chunks between silences
const r = spawnSync('ffmpeg', ['-hide_banner', '-i', take, '-af', 'silencedetect=n=-38dB:d=0.18', '-f', 'null', '-'], { encoding: 'utf8' });
const dur = +((r.stderr.match(/Duration: (\d+):(\d+):([\d.]+)/) || []).slice(1).reduce((a, x, i) => a + x * [3600, 60, 1][i], 0));
const ss = [...r.stderr.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]), se = [...r.stderr.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
const chunks = []; let t = 0;
for (let k = 0; k < ss.length; k++) { if (ss[k] > t + 0.05) chunks.push([t, ss[k]]); t = se[k] ?? dur; }
if (dur > t + 0.05) chunks.push([t, dur]);
const U = units.length, C = chunks.length;
if (C < U) { console.error(`only ${C} speech chunks for ${U} sentences: lower the silence threshold`); process.exit(1); }
// DP: every sentence takes >= 1 consecutive chunks; cost = squared gap between the sentence's syllable share and its time share
const us = units.map(([a, b]) => syl(text.slice(a, b + 1))), uTot = us.reduce((a, b) => a + b, 0);
const cd = chunks.map(([a, b]) => b - a), cTot = cd.reduce((a, b) => a + b, 0);
const INF = 1e9, best = Array.from({ length: U + 1 }, () => new Array(C + 1).fill(INF)), from = Array.from({ length: U + 1 }, () => new Array(C + 1).fill(-1));
best[0][0] = 0;
for (let u = 1; u <= U; u++) for (let c = u; c <= C - (U - u); c++) for (let p = u - 1; p < c; p++) {
  if (best[u - 1][p] >= INF) continue; let d = 0; for (let k = p; k < c; k++) d += cd[k];
  const cost = best[u - 1][p] + (d / cTot - us[u - 1] / uTot) ** 2 + (c - p - 1) * 0.0004;   // small cost per extra split
  if (cost < best[u][c]) { best[u][c] = cost; from[u][c] = p; } }
const map = []; for (let u = U, c = C; u > 0; u--) { const p = from[u][c]; map[u - 1] = [p, c]; c = p; }
// char times
const t0 = new Array(text.length).fill(0), t1 = new Array(text.length).fill(0);
units.forEach(([a, b], ui) => {
  const [p, c] = map[ui], parts = chunks.slice(p, c);   // speech spans of this sentence (pauses inside it are skipped)
  const span = parts.reduce((s, [x, y]) => s + y - x, 0);
  const at = f => { let left = f * span; for (const [x, y] of parts) { if (left <= y - x) return x + left; left -= y - x; } return parts[parts.length - 1][1]; };
  const words = []; let i = a; while (i <= b) { while (i <= b && text[i] === ' ') i++; let j = i; while (j <= b && text[j] !== ' ') j++; if (j > i) words.push([i, j - 1]); i = j; }
  const ws = words.map(([x, y]) => syl(text.slice(x, y + 1))), tot = ws.reduce((s, v) => s + v, 0); let acc = 0;
  words.forEach(([x, y], k) => { const w0 = at(acc / tot), w1 = at((acc + ws[k]) / tot); acc += ws[k];
    for (let q = x; q <= y; q++) { t0[q] = w0 + (w1 - w0) * (q - x) / (y - x + 1); t1[q] = w0 + (w1 - w0) * (q - x + 1) / (y - x + 1); }
    if (y + 1 < text.length && text[y + 1] === ' ') { t0[y + 1] = w1; t1[y + 1] = w1; } });
});
for (let q = 1; q < text.length; q++) if (text[q] === ' ' && t1[q] === 0) { t0[q] = t1[q - 1]; t1[q] = t1[q - 1]; }
for (let q = 1; q < text.length; q++) if (text[q] === ' ' && q + 1 < text.length) { t1[q] = t0[q + 1]; }   // a space lasts until the next word starts (the pause)
fs.writeFileSync(path.join(dir, 'alignment.json'), JSON.stringify({ model: 'eleven_v4 (web app take, aligned from pauses)', voice: 'yIFUVClxedWzoMYhk15k', text, chars: [...text].length === text.length ? text.split('') : text.split(''), t0, t1 }));
console.log(`${U} sentences, ${C} speech chunks, take ${dur.toFixed(2)} s`);
units.forEach(([a, b], ui) => console.log(`${t0[a].toFixed(2).padStart(6)}-${t1[b].toFixed(2).padStart(6)}  chunks ${map[ui][0]}-${map[ui][1] - 1}  ${text.slice(a, b + 1).slice(0, 48)}`));
