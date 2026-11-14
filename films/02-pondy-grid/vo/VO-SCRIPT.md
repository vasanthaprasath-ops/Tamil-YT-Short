# Voice-over: how this film is built (v2)

1. **Lines:** `vo/script.json` holds them. Each segment is one caption line and usually one shot. `text` is what the captions show; `say` is what the voice reads when it must differ (e.g. "1693").
2. **Voice:** `node vo/tts.mjs` makes the whole voice-over as **one** ElevenLabs take with character timestamps. It writes `vo/vo.mp3` and `vo/alignment.json`.
   - Voice: `gJvkwI7wGFW2czmyfJhp`. Model: Eleven v3.
   - Needs `ELEVENLABS_API_KEY` in the environment, never in a file.
3. **Edit:** `node make-audio.js` builds the edit from the voice and writes `timeline.js` and `audio/mix.wav`:
   - every shot cuts 60 ms before its line;
   - every caption word gets its real timing;
   - the music ducks under the voice.

To change a line, edit `vo/script.json` and run steps 2 and 3 again. The whole film re-times itself.

To use **your own recording** (style sheet §4 wants your voice): read the lines in `vo/script.json` in order as one take. Tell Claude, and it will time that take instead (forced alignment, or a quick ElevenLabs speech-to-text with timestamps).
