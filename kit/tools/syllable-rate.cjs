// Speech rate of a voice take from its ElevenLabs alignment.json: syllables, duration and syllables/s at several mix speeds.
//   node syllable-rate.cjs <alignment.json> [...]   Target about 7-7.5 syl/s (film-craft §1.7).
// Tamil syllables ≈ letters (consonant or vowel) that are not killed by pulli (U+0BCD); English: vowel groups per word
const syl = s => { let n = 0; const ta = s.match(/[஀-௿]+/g) || []; for (const w of ta) for (let i = 0; i < w.length; i++) { const c = w.charCodeAt(i); const isLetter = (c >= 0x0B85 && c <= 0x0BB9); if (isLetter && w.charCodeAt(i + 1) !== 0x0BCD) n++; }
  for (const w of (s.match(/[A-Za-z]+/g) || [])) n += Math.max(1, (w.toLowerCase().replace(/e$/, '').match(/[aeiouy]+/g) || []).length); return n; };
for (const f of process.argv.slice(2)) { const a = require(require('path').resolve(f)); const text = a.text, n = syl(text);
  const end = a.t1[a.t1.length - 1]; let pause = 0; for (let i = 0; i < a.chars.length; i++) if (a.chars[i] === ' ' && a.t1[i] - a.t0[i] > 0.15) pause += a.t1[i] - a.t0[i] - 0.15;
  for (const T of [1, 1.04, 1.08, 1.1, 1.12]) console.log(f.split(/[\/]/).slice(-3).join('/'), 'x' + T, 'syllables', n, 'dur', (end / T).toFixed(1), 's', 'rate', (n / (end / T)).toFixed(2), 'syl/s', 'articulation', (n / ((end - pause) / T)).toFixed(2)); }
