# Ep 01 film source (backup)

Source of the VideoHub code film for episode 01, "Kaal maraththu". The **live working copy** is `C:\Users\vasan\Documents\VideoHub\films\01-kaal-maraththu`; edit there and copy back here after changes.

Not included: media (`vo/vo.mp3`, `vo/takes/`, `vo/hook/`, `audio/mix.wav`, `render/`, mp4s). To rebuild on a new machine:
1. Regenerate the voice (needs `ELEVENLABS_API_KEY`; ask Vasanth first and state the cost): `node vo/tts.mjs`, then the steps in `vo/VOICE-NOTES.md` (word emphasis and tone).
2. `node make-audio.js` (reads `TEMPO`, default 1.04).
3. `node ../../kit/tools/check-film.cjs <film folder>`, then open with VideoHub: `hub_live`.

What is new in this film compared with ep 02: the paper cut-out look, a layout guard (`claim()` / `window.VH_BOXES`, checked by `kit/tools/layout-check.cjs`), characters that move in steps of 12 a second, and `vo/breathe.mjs` and `vo/emphasis.py` for fixing a take without re-recording.
