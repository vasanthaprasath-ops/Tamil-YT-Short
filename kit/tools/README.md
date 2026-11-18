# kit/tools

Small scripts used on code films. On this Windows laptop run Python tools as `python` with `PYTHONUTF8=1` (or `python -X utf8`); `python3` opens the Microsoft Store.

| Tool | What it does | Run |
|---|---|---|
| `qa-motion.cjs` | Renders every frame of a film page and reports the still-camera share, frozen spans and sudden jumps | `node qa-motion.cjs <film folder> <VideoHub folder> <chrome.exe>` |
| `grab.cjs` | Contact sheet of chosen frames | `node grab.cjs <film folder> <VideoHub folder> <chrome.exe> out.jpg 1.0 5.5 …` |
| `check-film.cjs` | **Run this before sending any film for notes.** One pass: page errors, length, still-camera share, layout (overlaps, cut-offs), loudness, true peak, and one contact sheet with a frame from every shot | `node check-film.cjs <film folder>` |
| `layout-check.cjs` | Checks every 0.1 s that no label, caption or key picture element overlaps another or leaves the frame. The film must expose `window.VH_BOXES(t)` (see film 01) | `node layout-check.cjs <film folder>` |
| `syllable-rate.cjs` | Syllables per second of a voice take (from `alignment.json`) at 1.0–1.12x mix speeds. Target about 7–7.5 syl/s | `node syllable-rate.cjs <film>/vo/alignment.json` |
| `pitch_check.py` | Per-sentence pitch of a voice take: range, which word peaks, whether the sentence ends up or down. A take where most sentences peak early and fall 3-6 semitones at the end sounds machine-made (ep 03 v5-t1: 13 of 19) | `python pitch_check.py take.wav alignment.json` (earshot venv: needs librosa) |
| `fetch_cc0.py` | Downloads **CC0-only** sound effects from Openverse (Freesound source) and logs title, creator, licence and source page in `sources.json` beside the output folder | `python fetch_cc0.py "bicycle bell" <film>/audio/sfx/bell --limit 8` |
| `cue_check.py` | Pass/fail per sound cue from an earshot timeline: heard within 40 ms of the cue and at least 6 dB over the bed | `earshot timeline mix.wav --cues "23.75,24.70" --out tl.json` then `python cue_check.py tl.json reveal_snap,boom` |

**earshot** is not in this repo. It is installed at `D:\Shorts\ext\earshot`; run it as `D:\Shorts\ext\earshot\.venv\Scripts\python.exe -m earshot <command>`.

**Credits.** `fetch_cc0.py` and `cue_check.py` (originally `check.py`) are copied unchanged from https://github.com/ekcheungAI/foley-skill, MIT licence: see `foley-LICENSE.txt`.

**Limits.** Openverse allows about 20 anonymous requests a minute and 200 a day. `fetch_cc0.py` skips sounds longer than 10 s unless the output folder name contains `amb` (or pass `--max-seconds`).
