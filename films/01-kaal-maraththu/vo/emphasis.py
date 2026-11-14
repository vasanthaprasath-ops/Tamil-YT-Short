# Adds spoken emphasis to a flat take without re-recording: per-word gain (dB) from a list of [word start index or
# substring, dB], smoothed so it sounds like the speaker leaning on a word, not a volume knob. Timing is unchanged, so
# alignment.json stays valid. Run with the earshot venv Python (needs numpy, soundfile).
#   python emphasis.py in.wav alignment.json out.wav "கால்:+2.5" "ஊசி:+3" ...   (word:dB, first match in order)
import sys, json, numpy as np, soundfile as sf

src, al_path, out = sys.argv[1:4]; rules = [a.rsplit(':', 1) for a in sys.argv[4:]]
y, sr = sf.read(src); y = y if y.ndim == 1 else y.mean(axis=1)
al = json.load(open(al_path, encoding='utf-8')); text = ''.join(al['chars'])
gain_db = np.zeros(len(y)); pos = 0
for word, db in rules:
    i = text.find(word, pos)
    if i < 0: print('not found:', word); continue
    j = i + len(word) - 1; pos = j + 1
    a, b = int(al['t0'][i] * sr), int(al['t1'][j] * sr); gain_db[a:b] = float(db)
k = int(0.06 * sr); win = np.hanning(2 * k + 1); win /= win.sum()           # 60 ms smoothing each side
gain_db = np.convolve(gain_db, win, mode='same')
y2 = y * 10 ** (gain_db / 20)
peak = np.abs(y2).max();
if peak > 0.97: y2 *= 0.97 / peak
sf.write(out, y2, sr)
print(f'emphasis: {len(rules)} words shaped, gain range {gain_db.min():+.1f} to {gain_db.max():+.1f} dB')
