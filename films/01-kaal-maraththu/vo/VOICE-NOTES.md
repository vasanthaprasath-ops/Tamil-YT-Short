# Ep 01 voice: what is active and how it was made

**Active voice (approved by Vasanth 2026-11-14): "version D".** `vo.mp3` + `alignment.json`.

1. One ElevenLabs take: Prashant V (`yIFUVClxedWzoMYhk15k`), `eleven_v3`, stability 0.5, plain text of `script.json` → `takes/v2-t1.mp3` / `.json`.
2. No pause trimming (Vasanth found the trimmed, 1.08× version unnatural).
3. Word emphasis with `emphasis.py` (+2 to +3 dB on the key words, −1 to −2.5 dB on connecting words) → `takes/v2-t1-emph.wav`.
4. Tone with ffmpeg: high-pass 70 Hz, +1.5 dB at 140 Hz, +2.5 dB at 3.5 kHz, +1.5 dB shelf from 8 kHz, 2:1 compression.
5. Timing is untouched, so `alignment.json` is the take's own.
6. Play at **1.04×** in the mix (`TEMPO=1.04`), not 1.08×.

Tried and not used: `takes/v2-t1-tight.*` (pauses trimmed), `takes/v2-t1-breathe.*` (pauses added), `hook/h1–h3` (hook re-recorded with delivery cues and stretched spelling).
Vasanth's own reading of the hook, used as the reference for emphasis: `C:\Users\vasan\Downloads\20261114_183352.m4a`.
