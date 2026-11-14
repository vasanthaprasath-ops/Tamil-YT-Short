// grab frames from a VideoHub film page into one contact sheet. usage: node grab.cjs <film> <pdir> <chrome> <out.jpg> t1 t2 ...
const path = require('path');
const [film, pdir, chrome, out, ...ts] = process.argv.slice(2);
const puppeteer = require(require.resolve('puppeteer-core', { paths: [pdir] }));
(async () => {
  const b = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file:///' + path.join(film, 'index.html').replace(/\\/g, '/'));
  await p.waitForFunction('window.READY === true', { timeout: 30000 });
  const url = await p.evaluate(ts => {
    const src = document.querySelector('canvas'), w = 360, h = 640, sh = document.createElement('canvas'); sh.width = w * ts.length; sh.height = h;
    const c = sh.getContext('2d'); ts.forEach((t, i) => { window.renderOut(+t); c.drawImage(src, i * w, 0, w, h); c.fillStyle = '#fff'; c.font = '20px sans-serif'; c.fillText(t + 's', i * w + 8, 24); });
    return sh.toDataURL('image/jpeg', 0.85);
  }, ts);
  require('fs').writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
