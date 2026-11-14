# Ep 02 film source (backup)

Source of the VideoHub code film for episode 02. The **live working copy** is `D:/Personal/VideoHubWorkspace/films/02-pondy-grid`; edit there and copy back here after changes.

Not included: media (`vo/vo.mp3`, `vo/takes/`, `vo/voice-tests/`, `audio/mix.wav`, `render/`, mp4s). To rebuild on a new machine:
1. Regenerate the voice (needs `ELEVENLABS_API_KEY` in the environment): `node vo/tts.mjs`.
2. Run `node make-audio.js`.
3. Open with VideoHub: `hub_live`.

`timeline.js` and `vo/alignment.json` are kept so you can see how the cut was timed.
