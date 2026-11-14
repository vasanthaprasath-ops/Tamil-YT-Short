// Layout guard for code films: finds elements that overlap or leave the frame, on every 0.1 s of the film.
// The film must expose window.VH_BOXES(t) -> [{kind, name, x, y, w, h}] in screen pixels (1080x1920), with kinds:
//   'label' (screen text), 'caption', 'key' (must stay fully readable: a face, a mark), 'prop' (arrows, bubbles),
//   'tag' (a small corner tag such as the series name: may sit above the safe box, down to y 140, never under the app's top bar).
// Rules: no two boxes overlap, except prop-with-prop and caption-with-prop. Labels and captions stay in the Shorts
// safe box (x 90-918, y 260-1470). Key and prop boxes stay inside the frame.
//   node layout-check.cjs <film folder> [VideoHub folder] [chrome.exe]      exit 1 if anything is found
const path = require('path');
const [film, hub = 'D:/Shorts/Videohub', chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe'] = process.argv.slice(2);
const puppeteer = require(require.resolve('puppeteer-core', { paths: [hub] }));
(async () => {
  const b = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file:///' + path.join(path.resolve(film), 'index.html').replace(/\\/g, '/'));
  await p.waitForFunction('window.READY === true', { timeout: 30000 });
  const has = await p.evaluate(() => typeof window.VH_BOXES === 'function');
  if (!has) { console.log('SKIP  film has no window.VH_BOXES(t): add the layout guard (see film 01-kaal-maraththu)'); await b.close(); process.exit(2); }
  const frames = await p.evaluate(() => { const out = [], T = window.TIMELINE; for (let t = 0; t < T.dur; t += 0.1) out.push([+t.toFixed(2), window.VH_BOXES(t), (T.shots.find(s => t >= s.t0 && t < s.t1) || {}).name]); return out; });
  await b.close();
  const SAFE = { x0: 90, x1: 918, y0: 260, y1: 1470 }, found = new Map();
  const add = (key, t, shot, detail) => { const e = found.get(key) || { n: 0, t0: t, shot, detail }; e.n++; e.t1 = t; found.set(key, e); };
  for (const [t, boxes, shot] of frames) {
    for (let i = 0; i < boxes.length; i++) {
      const a = boxes[i];
      if (a.kind === 'tag') { const out = Math.max(40 - a.x, a.x + a.w - 1040, 140 - a.y, a.y + a.h - SAFE.y1); if (out > 6) add('tag outside its zone (x 40-1040, y from 140): ' + a.name, t, shot, Math.round(out) + ' px out'); }
      else if (a.kind === 'label' || a.kind === 'caption') { const out = Math.max(SAFE.x0 - a.x, a.x + a.w - SAFE.x1, SAFE.y0 - a.y, a.y + a.h - SAFE.y1); if (out > 6) add(`outside safe box: ${a.name}`, t, shot, `${Math.round(out)} px out`); }
      else { const vis = Math.max(0, Math.min(1080, a.x + a.w) - Math.max(0, a.x)) * Math.max(0, Math.min(1920, a.y + a.h) - Math.max(0, a.y)); if (vis < 0.88 * a.w * a.h) add(`cut off by the frame: ${a.name}`, t, shot, `${Math.round(100 * vis / (a.w * a.h))} % visible`); }
      for (let j = i + 1; j < boxes.length; j++) {
        const c = boxes[j], pair = [a.kind, c.kind].sort().join('+');
        if (pair === 'prop+prop' || pair === 'caption+prop') continue;
        const ow = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x), oh = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
        if (ow > 6 && oh > 6 && ow * oh > 0.04 * Math.min(a.w * a.h, c.w * c.h)) add(`overlap: ${a.name}  x  ${c.name}`, t, shot, `${Math.round(ow)}x${Math.round(oh)} px`);
      }
    }
  }
  if (!found.size) { console.log(`PASS  layout: no overlaps, nothing cut off (${frames.length} moments checked)`); process.exit(0); }
  console.log(`FAIL  layout: ${found.size} problem(s) in ${frames.length} moments`);
  [...found.entries()].sort((x, y) => y[1].n - x[1].n).forEach(([k, e]) => console.log(`  ${k}  | shot ${e.shot}, ${e.t0}-${e.t1} s, ${e.n} moments, worst seen ${e.detail}`));
  process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
