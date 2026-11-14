# Ep 02 film source (backup)

Source of the VideoHub code film for episode 02. The **live working copy** is `C:SERSASANDOCUMENTSVIDEOHUBILMSTHE **LIVE WORKING COPY** IS `D:/PERSONAL/VIDEOHUBWORKSPACE/FILMS/02-PONDY-GRID`; EDIT THERE AND COPY BACK HERE AFTER CHANGES.2-PONDY-GRID` (WAS `D:/PERSONAL/VIDEOHUBWORKSPACE/...` ON THE OLD LAPTOP). THIS FOLDER NOW HOLDS THE **V2 PRACTICE VERSION** (SCRIPT V10, NOT UPLOADED); THE SOURCE OF THE PUBLISHED V1 IS IN `V1-SRC/`.

Not included: media (`vo/vo.mp3`, `vo/takes/`, `vo/voice-tests/`, `audio/mix.wav`, `render/`, mp4s). To rebuild on a new machine:
1. Regenerate the voice (needs `ELEVENLABS_API_KEY` in the environment): `node vo/tts.mjs`.
2. Run `node make-audio.js`.
3. Open with VideoHub: `hub_live`.

`timeline.js` and `vo/alignment.json` are kept so you can see how the cut was timed.
