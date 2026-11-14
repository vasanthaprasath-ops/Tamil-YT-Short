// One-pass check of a code film before sending it for notes. Prints one summary and writes one contact sheet
// (one frame per shot, taken near the shot's end so every label and action is visible).
//   node check-film.cjs <film folder> [VideoHub folder] [chrome.exe]
// Runs: grab.cjs (frames), qa-motion.cjs (page errors, still-camera share), layout-check.cjs (overlaps, cut-offs) and, if earshot is installed,
// earshot measure (loudness, true peak). Exit code 1 if a hard check fails.
const path = require('path'), fs = require('fs'), { spawnSync } = require('child_process');
const film = path.resolve(process.argv[2] || '.');
const hub = process.argv[3] || 'D:/Shorts/Videohub', chrome = process.argv[4] || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const EARSHOT = process.env.EARSHOT_PY || 'D:/Shorts/ext/earshot/.venv/Scripts/python.exe';
global.window = {}; require(path.join(film, 'timeline.js')); const TL = window.TIMELINE;
const times = TL.shots.map(s => (s.t0 + (s.t1 - s.t0) * 0.85).toFixed(2));
const sheet = path.join(film, 'check-sheet.jpg'), run = (cmd, args) => spawnSync(cmd, args, { encoding: 'utf8', env: { ...process.env, PYTHONUTF8: '1' } });
const g = run('node', [path.join(__dirname, 'grab.cjs'), film, hub, chrome, sheet, ...times]);
const q = run('node', [path.join(__dirname, 'qa-motion.cjs'), film, hub, chrome]);
let qa = {}; try { qa = JSON.parse(q.stdout); } catch { qa = { page_errors: ['qa-motion failed: ' + (q.stderr || q.stdout).slice(0, 200)] }; }
const lay = run('node', [path.join(__dirname, 'layout-check.cjs'), film, hub, chrome]), layOut = (lay.stdout || '').trim();
let loud = 'earshot not found';
if (fs.existsSync(EARSHOT)) { const m = run(EARSHOT, ['-I', '-m', 'earshot', 'measure', path.join(film, 'audio', 'mix.wav')]); loud = ((m.stdout || '').match(/true peak [-\d.]+ dBTP\); [-\d.]+ LUFS/) || [m.stderr.slice(0, 120)])[0]; }
const tp = +(loud.match(/true peak ([-\d.]+)/) || [])[1], lufs = +(loud.match(/([-\d.]+) LUFS/) || [])[1];
const checks = [
  ['page errors', (qa.page_errors || []).length === 0, (qa.page_errors || []).length + ''],
  ['length 30-45 s', TL.dur >= 30 && TL.dur <= 45, TL.dur.toFixed(1) + ' s'],
  ['still-camera share <= 15 %', qa.still_share_pct <= 15, qa.still_share_pct + ' %'],
  ['loudness -14 LUFS (+-0.5)', Math.abs(lufs + 14) <= 0.5, lufs + ' LUFS'],
  ['true peak <= -1 dBTP', tp <= -1, tp + ' dBTP'],
  ['layout: no overlaps, nothing cut off', lay.status === 0, layOut.split(/\r?\n/)[0].replace(/^(PASS|FAIL|SKIP)\s+layout:\s*/, '')],
  ['contact sheet written', g.status === 0 && fs.existsSync(sheet), sheet],
];
checks.forEach(([n, ok, v]) => console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}: ${v}`));
console.log('shots:', TL.shots.map((s, i) => `${i + 1} ${s.name} ${(s.t1 - s.t0).toFixed(1)}s`).join(' | '));
console.log('still by shot:', qa.still_by_shot || '-');
if (lay.status !== 0) console.log(layOut);
console.log('LOOK AT:', sheet, '(frames at', times.join(', '), 's)');
process.exit(checks.every(c => c[1]) ? 0 : 1);
