// QA (kit/film-craft.md §6.1-6.3): frame-difference stats for a VideoHub film page.
// usage: node qa-motion.cjs <film folder> <puppeteer-core dir> <chrome exe>
const path = require('path');
const [film, pdir, chrome] = process.argv.slice(2);
const puppeteer = require(require.resolve('puppeteer-core', { paths: [pdir] }));
(async () => {
  const b = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file:///' + path.join(film, 'index.html').replace(/\\/g, '/'));
  await p.waitForFunction('window.READY === true', { timeout: 30000 });
  const r = await p.evaluate(() => {
    const src = document.querySelector('canvas'), sm = document.createElement('canvas'); sm.width = 180; sm.height = 320;
    const c = sm.getContext('2d', { willReadFrequently: true }), dur = window.TIMELINE.dur, n = Math.floor(dur * 30);
    let prev = null; const diffs = [];
    for (let f = 0; f <= n; f++) {
      window.renderOut(f / 30); c.drawImage(src, 0, 0, 180, 320);
      const d = c.getImageData(0, 0, 180, 320).data, y = new Float32Array(180 * 320);
      for (let i = 0; i < y.length; i++) y[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
      if (prev) { let s = 0; for (let i = 0; i < y.length; i++) s += Math.abs(y[i] - prev[i]); diffs.push(s / y.length); }
      prev = y;
    }
    return { diffs, cuts: window.TIMELINE.shots.map(s => Math.round(s.t0 * 30)), names: window.TIMELINE.shots.map(s => s.name) };
  });
  await b.close();
  const { diffs, cuts, names } = r, N = diffs.length;
  const still = diffs.filter(x => x < 0.0015).length;
  const frozen = []; let run = 0;
  diffs.forEach((x, i) => { if (x < 0.02) run++; else { if (run >= 12) frozen.push([i - run, i]); run = 0; } });
  if (run >= 12) frozen.push([N - run, N]);
  const pops = [];
  diffs.forEach((x, i) => {
    const w = diffs.slice(Math.max(0, i - 8), i + 9).filter((_, j) => j !== Math.min(8, i)).sort((a, b) => a - b), med = w[w.length >> 1];
    if (x > 3 * med && x > 0.01 && !cuts.some(c => Math.abs(c - (i + 1)) <= 1)) pops.push([(i + 1) / 30, +(x / med).toFixed(1)]);
  });
  const shotStill = names.map((nm, k) => { const a = cuts[k], z = k + 1 < cuts.length ? cuts[k + 1] : N; const seg = diffs.slice(a, z - 1); return `${nm} ${(100 * seg.filter(x => x < 0.0015).length / Math.max(1, seg.length)).toFixed(0)}%`; });
  console.log(JSON.stringify({ frames: N, page_errors: errs, still_share_pct: +(100 * still / N).toFixed(1), still_by_shot: shotStill.join(' | '),
    frozen_spans_lt002_ge12f: frozen.map(([a, z]) => `${(a / 30).toFixed(2)}-${(z / 30).toFixed(2)}s`), pops: pops.slice(0, 20), median_diff: +[...diffs].sort((a, b) => a - b)[N >> 1].toFixed(4) }, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
