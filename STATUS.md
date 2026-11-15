# Status and handoff (2026-11-14)

The one-page "where are we" for a new Claude session. Read this first, then `PROJECT-CONTEXT.md` (decisions and reasons). This file wins where the two disagree on current state.

## Where we are right now (end of 2026-11-14) — read this first

- **Ep 02 (Pondy grid) is PUBLIC** on YouTube, Instagram and Facebook since 2026-11-13. The "rendered, not uploaded" heading further down is old.
- **Ep 01 (Kaal maraththu) is RENDERED and ready to upload**; Vasanth was about to post it. File: `C:\Users\vasan\Documents\VideoHub\outputs\2026-11-14\2026-11-14 01 Kaal maraththu - needle-prick is a good sign v1.mp4` (1080×1920, 30 fps, 40.9 s, −14.0 LUFS, 68 MB). Upload text (title, description, pinned comment, Instagram caption): `episodes/01-kaal-maraththu.md` → "Upload text v2". Chosen title: `கால் மரத்துப் போனா ஊசி குத்துதா? நல்ல sign! 😮 | உடம்பு #1`.
- **Ep 01 facts:** script v2 locked with Vasanth (ending C); voice Prashant V, one take, word emphasis + tone ("version D", `films/01-kaal-maraththu/vo/VOICE-NOTES.md`), played at 1.04×; paper cut-out look; series tag "உடம்பு series" far top-left; no subscribe or channel tag; 4 whooshes only. Working copy: `C:\Users\vasan\Documents\VideoHub\films\01-kaal-maraththu` (VideoHub id 93d1ca4c4b49); source backup in `films/01-kaal-maraththu/` (no media).
- **Known weak points of ep 01:** still-camera share 18.3 % (limit 15 %); Mani is a simple sketch figure (no hands); the mystery line (the rehook) starts at 60 % of the runtime, a little after the 40–55 % target. The answer at 82 % is fine: it belongs in the last third (research notes rule 27).
- **How we work now** (also in NEW-MACHINE.md and the skill): script locked with Vasanth before any voice; ask and state the cost before each ElevenLabs call (measured ≈ 0.4 credits per character on v3; 6,418 of 40,000 used at last check); show still frames before building; run `node kit/tools/check-film.cjs <film>` before every preview (it includes the no-overlap layout check, `kit/film-craft.md` §7); in VideoHub choose **Full film** for a film's first render.
- **Posting plan:** 2 Shorts a week on fixed days; no platform penalty for consecutive days or time of day; never delete and re-upload.
- **Series:** 5 planned, 30 titles in `kit/title-bank.md` (1 published, 1 rendered, 28 ideas). The paper/miniature/matchbox look is decided for the **city** series; ep 01 (body) used the paper cut-out look after Vasanth approved frames; other series: show frames first.
- **Next:** upload ep 01; in 1–2 days read ep 02's retention curve in YouTube Studio (it was not ready; Vasanth signs in to the built-in browser); pick ep 03 and lock its script; extract a reusable film starter from ep 01; design paper Mani and Paati properly.
- **Local additions outside this repo:** VideoHub (`D:\Shorts\Videohub`) has a video-only full-screen button (🎬, Shift+F) added to `ui/review.js`, `ui/review/transport.js`, `ui/review.css`; `UPDATE.cmd` may overwrite it. Audio tools: earshot at `D:\Shorts\ext\earshot` (see `kit/tools/README.md`).

## Channel

| Item | State |
|---|---|
| Name / handle | **Adhu Yen? (அது ஏன்?) / @adhuyen**, live at youtube.com/@adhuyen (channel id UCJcWIjn9wnv0sFRbpV3qF6w). It sits on a separate new Gmail as a Brand Account. "Yen Appadi" was dropped because the name clashes with @YENAPPADI. |
| Logo / banner | Logo option A (a "?" made of kolam dots) and the premium banner are uploaded. Files are in `kit/brand/` (`logo.png`, `banner.png`); `brand.html` is the editable source. Re-export with Chrome headless through puppeteer-core from `D:/Personal/VideoHub/node_modules`. |
| Tagline | சின்ன கேள்வி. பெரிய காரணம். |
| Channel description | Set, in a short version. Two suggested lines are not added yet: "உண்மையா இருந்தா உண்மை. இல்லனா இல்ல. ஒவ்வொரு பதிலுக்கும் source." and "அடுத்த தடவை family group-ல, பதில் தெரிஞ்சவர் நீங்கதான்." |
| Instagram | **Created; ep 02 posted 2026-11-13 on YouTube, Instagram and Facebook (Vasanth, 2026-11-14).** Original plan, for reference: Plan: sign up with the channel Gmail, username `adhuyen` (fallbacks `adhu.yen`, `adhuyen.tamil`), name "Adhu Yen? \| அது ஏன்?", Creator account, 2FA on, link to the YouTube channel. The Facebook Page needs a personal Facebook profile; link it through Accounts Center. |
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

## Ep 02 v2: practice upgrade (2026-11-14, new laptop; not for upload)

v1 is public, so v2 is practice for the kit. Working copy: `C:\Users\vasan\Documents\VideoHub\films\02-pondy-grid` (VideoHub id 861506f06c8a). v1 source, mix and v8 voice are backed up in `.v1-src\` there.
- **Script v9** (film-craft §1): the surprise is stated in sentence 1, then a foreshadow, 3 but/therefore beats with one joke, the kolam analogy on the card ("புள்ளி வெச்சது Dutch. கோலம் போட்டது French."), and the ironic last line "இன்னும் French town!". Script v10 locked with Vasanth: hook "பாண்டிச்சேரில வழி தவறுனா, திட்ட வேண்டியது Dutch-அ!", scene 2 "300 வருஷ பழைய ஒரு map தான் காரணம்…". Voice: one 116-character take for lines 1–2 spliced onto take v9-t2, 1.08× speed, film 38.8 s. Rule from now on: script locked first, voice second, ask before every ElevenLabs call.
- **Camera**: constant push-ins, reframes every ~1.8 s on word times, 2 roll moves, one blurred whip, punch only into the twist, a kick on the reveal, tilt-shift on the town, no float. Still-camera share 44.8 % → 10.6 % (card is the only still shot).
- **Look**: indigo shadows, contact blobs, outlines + background blur on the tourists, vignette, shirt `#E3A72F`; Mani's new face (eye whites, brows, mouth, seeded blinks) is coded but not on screen in this script.
- **Sound**: duck from word times, music stop + button chord, boom after the key word, one tempo grid, ambience beds, stems levelled separately, look-ahead limiter. −14.0 LUFS, −1.0 dBTP.
- **QA tools**: `kit/tools/qa-motion.cjs` (still share, pops) and `kit/tools/grab.cjs` (contact sheet), both run against the film page with Chrome.
- Not rendered yet. Before rendering, make sure the render uses the new `audio/mix.wav`, not v1's track.

## Visual style decided (2026-11-14)

Vasanth chose the look for **city-series** code films (other series: look undecided, show frames first): **paper cut-out as the main look, isometric miniature for places, matchbox print only on 1–2 peak moments** (hook, reveal, verdict). Rules: `kit/style-sheet.md` §3d. Reference frames: `kit/style-frames/`. Still to do: design paper Mani and Paati properly, and build the reusable film starter with the three modes.

**Ep 02 first numbers (read 2026-11-14, ~13 h after publish):** 158 views, 42.6 % stayed to watch (57.4 % swiped away), average view 0:20 of 0:39, 3 likes, 0 subscribers. Logged in `kit/metrics-sheet.csv`. The retention curve was not ready yet.

## Knowledge base (newest first)

- **Installed skill packs (2026-11-14, in `~/.claude/skills`, not in this repo):** all 11 `yt-*` skills and six `ig-*` skills (`ig-caption`, `ig-profile`, `ig-audit`, `ig-viral`, `ig-reply`, `ig-comment`), both by Jake Schincariol (MIT). Run their Python tools as `python -X utf8`. Their hook and title scores only understand English.
- `future-english/`: parked toolkit for possible English videos later (English hook formulas and scorers, beat timer, humanizer, repurposing). Not active; see its `README.md`.

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
