# Per-sentence pitch (F0) of a voice take: median, range, and the pitch of the sentence's last word vs its first.
# usage: python pitch.py take.wav alignment.json
import sys, json, numpy as np, librosa
wav, alp = sys.argv[1:3]
y, sr = librosa.load(wav, sr=16000, mono=True)
f0, vf, _ = librosa.pyin(y, fmin=70, fmax=400, sr=sr, frame_length=1024, hop_length=160)
tt = librosa.times_like(f0, sr=sr, hop_length=160)
al = json.load(open(alp, encoding='utf-8')); ch, t0, t1 = al['chars'], al['t0'], al['t1']
text = ''.join(ch)
def st(a, b):
    m = (tt >= a) & (tt < b) & vf & ~np.isnan(f0)
    return 12 * np.log2(f0[m] / 100) if m.sum() > 3 else np.array([])
allv = st(0, 1e9); base = np.median(allv)
print(f'whole take: median {100*2**(base/12):.0f} Hz, spread (10-90%) {np.percentile(allv,90)-np.percentile(allv,10):.1f} semitones')
# split into sentences and words
sent, s0 = [], 0
for i, c in enumerate(text):
    if c in '?!.…' and (i + 1 == len(text) or text[i + 1] == ' '):
        sent.append((s0, i)); s0 = i + 2
for a, b in sent:
    seg = text[a:b + 1].strip()
    words = []; p = a
    for w in text[a:b + 1].split(' '):
        if not w: p += 1; continue
        words.append((w, t0[p], t1[min(p + len(w) - 1, len(t1) - 1)])); p += len(w) + 1
    sv = st(t0[a], t1[b])
    if len(sv) == 0: continue
    wl = [(w, np.median(st(x0, x1)) - base if len(st(x0, x1)) else float('nan')) for w, x0, x1 in words]
    peak = max(wl, key=lambda z: -99 if np.isnan(z[1]) else z[1])
    print(f'{t0[a]:5.1f}s range {np.percentile(sv,90)-np.percentile(sv,10):4.1f} st | peak on "{peak[0]}" | last word {wl[-1][1]:+.1f} st | {seg[:60]}')
