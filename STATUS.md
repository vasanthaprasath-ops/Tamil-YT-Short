# Status and handoff (2026-11-14)

The one-page "where are we" for a new Claude session. Read this first, then `PROJECT-CONTEXT.md` (decisions and reasons). This file wins where the two disagree on current state.

## Channel

| Item | State |
|---|---|
| Name / handle | **Adhu Yen? (அது ஏன்?) / @adhuyen**, live at youtube.com/@adhuyen (channel id UCJcWIjn9wnv0sFRbpV3qF6w). It sits on a separate new Gmail as a Brand Account. "Yen Appadi" was dropped because the name clashes with @YENAPPADI. |
| Logo / banner | Logo option A (a "?" made of kolam dots) and the premium banner are uploaded. Files are in `kit/brand/` (`logo.png`, `banner.png`); `brand.html` is the editable source. Re-export with Chrome headless through puppeteer-core from `D:/Personal/VideoHub/node_modules`. |
| Tagline | சின்ன கேள்வி. பெரிய காரணம். |
| Channel description | Set, in a short version. Two suggested lines are not added yet: "உண்மையா இருந்தா உண்மை. இல்லனா இல்ல. ஒவ்வொரு பதிலுக்கும் source." and "அடுத்த தடவை family group-ல, பதில் தெரிஞ்சவர் நீங்கதான்." |
| Instagram | **Not created yet.** Plan: sign up with the channel Gmail, username `adhuyen` (fallbacks `adhu.yen`, `adhuyen.tamil`), name "Adhu Yen? \| அது ஏன்?", Creator account, 2FA on, link to the YouTube channel. The Facebook Page needs a personal Facebook profile; link it through Accounts Center. |
| Security to-do | Turn on 2FA on the channel Gmail with backup codes. Add the personal Gmail as Manager in YouTube Studio → Permissions. **Revoke the ElevenLabs API key that was pasted in chat** and set a new one with `$k = Read-Host; [Environment]::SetEnvironmentVariable('ELEVENLABS_API_KEY',$k,'User')` (PowerShell). |

## Episode 02: Pondy grid (rendered, not uploaded)

- **Live working copy:** `D:/Personal/VideoHubWorkspace/films/02-pondy-grid` (VideoHub project id 224d21f902dd). A source backup is in this repo at `films/02-pondy-grid/`, without the media.
- **Render:** `02-pondy-grid_v1.mp4` (39.1 s, 1080×1920, 30 fps, −14.0 LUFS). A copy is at `D:/Personal/VideoHubWorkspace/outputs/2026-11-13/`.
- **Script:** v8, spoken Tamil, hook "நம்ம பாண்டிச்சேரி தெரு எல்லாம் ஏன் chess board மாதிரி இருக்கு தெரியுமா?". The source of truth is `vo/script.json`; `episodes/02-pondy-grid.md` has the v7 table plus v8 notes. The user chose to keep the loop line.
- **Voice:** ElevenLabs **Prashant V** (`yIFUVClxedWzoMYhk15k`), Eleven v3, one take with timestamps (`vo/tts.mjs`), sped up 1.08×. This conflicts with the style sheet's "own voice only" rule, which is still undecided.
- **Pipeline:**
  - `vo/tts.mjs` generates `vo.mp3` and `alignment.json`.
  - `make-audio.js` writes `timeline.js` (shot cuts and word timings) and `audio/mix.wav`. It mixes the voice at −14 LUFS and the bed at −27 LUFS, both measured.
  - `film.js` draws the film on a canvas, with kinetic Tamil captions in 2–4 word phrases.
  - `hub_live` for review, `hub_render` to render.
- **Render fixes on this PC:**
  - Headless Edge won't start. The film's render env sets `CHROME=C:/Program Files/Google/Chrome/Application/chrome.exe` and `FFMPEG=<winget ffmpeg path>`.
  - If renders fail with `spawn ffmpeg ENOENT`, restart the VideoHub hub (port 7788) from a shell whose PATH includes ffmpeg.
- **Upload plan:**
  - **YouTube:** use the phone app so frame 0 can be the cover. Upload Unlisted, watch it, then set it Public. Answer "No" to the AI-use question, since nothing is realistic.
  - **Instagram:** the same mp4 as a Reel, with the AI label **on** (Meta covers realistic AI audio) and the location set to Puducherry.
  - Never delete and re-upload.
  - Title: `பாண்டி தெரு ஏன் chess board மாதிரி? 🤯 | Pondicherry`
  - Description, tags, hashtags and pinned comment are written up in this session; the short description puts searchable keywords first and sources on one line.

## Knowledge base (newest first)

- `kit/film-craft.md`: the rulebook for directing code-animated Shorts. It covers script, camera, characters, light, sound and QA, has an **ep 02 gap scorecard**, and ends with **7 decisions for Vasanth**. Built from `research_notes/Animated shorts repo teardown/` (5 notes, including `competitor_gap.md`).
- `reports/Short form video craft playbook.md`: evidence-graded craft rules, a myths table, and a per-Short checklist (already applied to the kit).
- `research_notes/Shorts scriptwriting craft.md`: Hoyos, Kallaway, Zack D. Films and but/therefore rules.
- The `skills/tamil-shorts-producer/SKILL.md` and `kit/*.md` files are updated with all of the above.

## Open decisions (Vasanth)

1. Mani's look: add eye whites and contrast first; decide whether to lighten the skin (#7A4A2E → #8E5A3A); pick the official shirt colour (#E3A72F in the style sheet or #C9921E in film.js).
2. Own voice versus the ElevenLabs voice (the style sheet still says own voice).
3. Posting volume (the time gate starts at 2 a week; the teardown suggests 4–5).
4. Topic mix, about 75% body/habit for the next 8 Shorts.
5. English title translations, episode numbering.
6. Music level (keep 10–14 LU under the voice and fix the duck to −3/−4 dB keyed to word times).
7. Rim light in code films, and squash/stretch only on stamp hits and landings.

## Next steps

1. Upload ep 02 to YouTube, then Instagram and Facebook the same day.
2. Create Instagram and the Facebook Page, and do the security to-dos.
3. Decide the open items above.
4. Optional: upgrade ep 02 to the film-craft scorecard. The biggest items:
   - push-ins on every shot, and the camera moving at least 85% of the time;
   - move the reveal boom off "Dutch" and stop the music at the pivot;
   - add an ambience bed;
   - add eye whites, an outline and staggered blinks.
5. Next Short: a body or habit topic, built with the updated `tamil-shorts-producer` skill and as a code film in VideoHub.
