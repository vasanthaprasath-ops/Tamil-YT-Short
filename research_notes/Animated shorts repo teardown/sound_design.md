# Sound design, music, SFX and mix: teardown of mromidev/claude-animated-shorts

Slice: sound design, music, SFX, mix. Source: the repo's `templates/audio/` (cues.md, sfx.py, sfx_gen.py, music.py, instruments.py, mix.py, dsp.py, timeline.py), `SKILL.md` and `references/STYLE_BIBLE.md`. All of it was read in full except the bodies of the synthesis helpers in `sfx_gen.py`, `instruments.py` and `dsp.py`, where only the function list and docstrings were read, plus `whoosh()` in full. Compared against our `films/02-pondy-grid/make-audio.js`, the measured `audio/mix.wav` and `timeline.js`, `kit/style-sheet.md` §4 and §6, and the playbook's sound parts.

Evidence grades:
- **[MEASURED-in-repo]**: a number the repo measured or set in code. It describes one film ("The Bridge That Fell for a Song", 67.5 s), not proof that it works.
- **[REF-MEASURED]**: the repo author's measurement of the reference channel (STYLE_BIBLE, 20 shorts). We cannot re-check it.
- **[AUDIO-CANON]**: broadcast or film practice, or a standard.
- **[PRACTITIONER-DATA]**: a measured or survey number from a non-academic source.
- **[OPINION]**: practitioner advice with no data behind it.
- **[UNVERIFIED]**
- **[INFERENCE]**: my own reasoning.

---

## 1. Techniques found (numbers and file refs)

### 1.1 Architecture
- **Everything is synthesized in code.** No samples and no licensed music: numpy/scipy synthesis (`sfx_gen.py`, `instruments.py`), placement (`sfx.py`, `music.py`) and mix (`mix.py`). The voice gets gain only: no EQ, compression or pitch change (cues.md header). This matches our own-music rule exactly.
- **One timeline file mirrors the picture's time constants.** `timeline.py` copies shots, crossfades, snap/drop/hit times, footfall grid, camera distance keys and swing pushes from the Remotion `story.ts`/`cast.ts`. Every sound is placed from those constants, never by ear. SKILL.md step 8 says to lock the picture's time constants before making the sound, and that any later timing change means re-running the sound.
- **Voice word timings (`words.json`) drive the ducking and the rides**, not the audio envelope (`mix.py` `speech_spans`, `duck_db`).
- **Stems and a cue sheet are written on every run.** `cues.md` lists every one of the 358 SFX events with time, frame, naive and applied level, measured loudness in the mix, and pan. It also has a per-section voice-vs-bed table and a music map.

### 1.2 Master loudness (`mix.py`, cues.md)
| item | value |
|---|---|
| Integrated | **−15.0 LUFS** (target constant `TARGET_LUFS = -15.0`) |
| True peak | **−1.2 dBTP** (limiter ceiling `CEIL_DBTP = -1.2`; spec ≤ −1 dBTP) |
| LRA | **2.6 LU** |
| Max momentary / short-term | −9.0 / −12.5 LUFS |
| Limiter | own 4x-oversampled look-ahead (3 ms look-ahead, 80 ms release). Max gain reduction 1.45 dB, active on 3.5 % of samples |
| Format | 48 kHz, stereo, 24-bit, sample-exact length (3,240,000 samples = 67.500 s) |
| Cross-check | own BS.1770-4 meter, then ffmpeg `ebur128=peak=true` (agrees) |
| QA | `short_qa.py` runs ebur128 plus `silencedetect=n=-45dB:d=0.3` on the final mp4 to catch dead air |

Reference channel: **−14 LUFS integrated, LRA ~2.4 LU, bed 5–10 dB below speech** (STYLE_BIBLE "Format") [REF-MEASURED].

### 1.3 Stem balance (cues.md "Master loudness" and section table)
- Voice **−15.4 LUFS**, music **−25.8 LUFS**, SFX **−29.1 LUFS**, integrated over the whole film.
- In other words, music sits ~10.4 LU under the voice, SFX ~13.7 LU under, and the combined bed ~8–9 LU under.
- Per-section voice-minus-bed margin is **8.2–11.6 LU** in normal sections. The exception is the music-silent water section at 18.1 LU.
- The 10th-percentile momentary margin over spoken words drops to **0.7–2.5 LU** in loud sections. So for brief moments an SFX hit is nearly as loud as the voice.
- SKILL.md user rule: **"Standard mix: music +3 dB, SFX −6 dB, voice unchanged."** In code:
  - Music is placed per section at a target LU under the voice, after ducking: hook −9.5, town −10.5, march −10, bounce −10, whistle −9.5, tension −10, sway −12, swing −11.5, march2 −10.5, rule −11.5, tourists −11 (`MUSIC_TARGET`). The comment says this is "bed −10 instead of the old −13".
  - Each SFX event gets a "naive" level (LU vs the voice, measured as the event's **max momentary loudness**), then −6 dB (`SFX_DB`), then distance or intensity offsets.
  - **Ambience beds are measured as integrated loudness and are not reduced** (`sfx.py` `Cue`).

### 1.4 Ducking and rides (`mix.py`)
- **Duck depth −3 dB only** (`DUCK_DB`), keyed from word times. Settings: pre-roll 80 ms, post-roll 120 ms, attack 70 ms, release 450 ms. Word gaps under 0.3 s are merged, so the duck does not pump between words.
- **Manual rides** of −2 to −4 dB under quiet sentence-final words (3.65–4.30 s −3 dB, 26.95–27.36 −2, 32.20–32.77 −4, 61.25–61.98 −3). The aim is that the last word of a sentence stays on top and "the band blooms in the gap after it".
- SFX were also ridden: the hook's last two footfalls are 3 dB lower under "...walking across it."
- Section level changes are smoothed over 0.4 s, except where the music is already silent (white flash, end of the dropout), where they switch hard.

### 1.5 SFX density and what gets a sound (cues.md SFX table, counted)
358 events in 67.5 s, plus 5 ambience beds:

| layer | count | rate |
|---|---|---|
| Rhythmic "world" layer: `stomp` (78) + `deck_flex` (56) on every footfall of the marching column (0.5 s grid), `stroll_step` (147) for 24 out-of-step tourists in the last 5.5 s | 281 | 2 per s while marching |
| **Designed one-off events** (whooshes, hits, creaks, crowd, splash, hammer...) | 72 | **≈1.07 per s** |
| Ambience beds | 5 | one always running |

What gets a sound:
- **Every camera move and transition gets a whoosh.**
  - 14 `whoosh_cam` at naive −11/−12 LU, applied −17/−18 LU under the voice. They are 0.45–0.6 s long and **peak at 70–90 ms**, an ease-out burst that matches the reference channel's ease-out camera moves (`sfx_gen.whoosh`, `peak` param).
  - 5 `whoosh_xfade` on crossfades, 0.8 s long, peaking at 0.32 s, so they swell into the dissolve.
  - 1 `flash_whoosh`: a reverse swell (peak 0.33 s) into the white flash, plus a 62 Hz "whoomp", at naive −5.
- **Every visible physical action**: footfalls, deck flex, the first bounce, chain groans, bolt strain (4 creaks rising +1 dB each), 3 fatigue ticks 310/150/50 ms before the snap, the snap, the chain whip, bolt halves landing, the column halting, timber tear, fall air, splash, wood crack, debris, swing squeaks (scaled by swing arc, `8*log10(a)`), swing pushes, hammer swish (90 ms before) plus hammer hit.
- **Crowd reactions** are synthesized with formants: murmur of ~22 voices, a cheer on the line "pride of the whole town", a dozen "oof/ugh" at the splash, and 3 groans placed **in the gap before** a line.
- **Biggest hits** (naive LU vs voice): bolt snap 0, splash −2, wood crack −4, oofs −4, chain whip −4, flash −5, hammer −5/−4. These are all moments where the music is silent or the voice is pausing.

### 1.6 Ambience beds (`sfx.py` "ambience beds")
5 beds, one per location or light change. Each is made of breeze + river + birds + flags, or water, or golden-hour crickets and blackbird. Integrated level vs the voice:

| bed | level vs voice | in the mix |
|---|---|---|
| day | −30 LU | −45 LUFS |
| water | −19 LU | louder, because music is silent there |
| golden | −29 LU | |
| bank | −26 LU | |
| town | −29 LU | |

- Beds have 0.25–0.6 s fades and switch at the picture crossfades.
- **No moment of the film is without a bed.** Silence in this repo always means "no music", never "no sound".

### 1.7 Distance and space (`timeline.py` `dist_fx`, `sfx.py` render)
- Camera distance d (metres) feeds three settings: gain = −14·log10(d/3.5) dB, low-pass = 17 kHz·(3.5/d)^0.55 (clamped 1.8–17 kHz), and reverb send = 0.06 + 0.45 × (scaled log distance).
- One shared synthetic "valley" reverb (RT60 1.1 s) on the SFX bus at 0.55 wet. Music has a hall (1.5 s) and a "yard" (0.9 s) for the whistlers.
- High-pass at 25 Hz (SFX) and 30 Hz (music).

### 1.8 Music (`music.py`)
- **Original march, Bb major, 120 BPM, chosen so one quarter note = one footfall.** The music grid *is* the picture's step grid.
- Bars are placed "at odd seconds so 'Then,' = 33.0 is a downbeat": the key word was made a downbeat by choosing where the grid starts.
- **The arrangement follows the story**, one section per shot group:
  1. Hook tutti with 7 whistlers; a snare fill under the hook's last words.
  2. **Band cut to zero in 45 ms on the white flash**, with a brass "button" chord, cymbal and glock **on the flash**. This is "after the last word, so it never masks the hook line".
  3. Light story march, then full band (boots act as the bass drum), then the tuba switches to bouncing octaves when the bridge starts bouncing.
  4. **A vamp bar with no melody to leave room for a line.**
  5. Whistler solo, then the column joins, then the whistlers falter (pitch droops) as faces turn nervous.
  6. Tension: F7 pedal, then a 2 s chromatic climb with a snare roll crescendo.
  7. **DEAD STOP on the pivot word "Then,"** (12 ms fade at 32.985 s). **10.4 s of no music** follows, through the snap, the fall and the deadpan joke; SFX and beds carry it. That is about 15 % of the runtime.
  8. A warm pad returns at 84 BPM (= the bridge's 0.7 Hz sway), then a music-box waltz locked to the swing pushes, then a soft march reprise.
  9. **Brass stabs plus timpani on each of 3 hammer blows, each landing on a key word** ("rule", "Never", "step").
  10. A lazy swung version for the ending.
- **Ending:** the final tonic chord on the last word ("tourists", 66.72–67.24), rings out, then a 0.2 s fade to silence at 67.5. The SFX bus gets a squared fade over the last 0.12 s. Nothing is designed as a loop. The reference channel "ends on the last word, no outro, no CTA" (STYLE_BIBLE).
- **Risers:** no generic noise riser. The build-ups are musical: a snare roll crescendo 2 s before the stop, rolls of about 0.5–0.9 s into the stabs, and a music-box run up "higher and higher". On the SFX side, a reverse-swell whoosh leads into the flash, and rising creaks and ticks lead into the snap.
- **Inside the band:** each instrument track is normalised to a relative LU target (whistle 0, tuba −2.5, fife −3, glock −6, snare −5.5, cymbal −11, brush −13, triangle −15).

---

## 2. Validation

| # | Technique | Grade | Notes |
|---|---|---|---|
| V1 | Master −14 to −15 LUFS, ≤ −1 dBTP | **[AUDIO-CANON] for the true-peak margin; [PRACTITIONER-DATA] for −14** | EBU R128 targets −23 LUFS for broadcast with a −1 dBTP max true peak. −14 is the common streaming practice, but no YouTube page states it ([Production Advice](https://productionadvice.co.uk/youtube-loudness/); already in our playbook). The repo's −15 sits 1 dB under the reference channel's −14 [REF-MEASURED]. |
| V2 | LRA 2–3 LU (heavily compressed) | **[REF-MEASURED]** | Typical for phone-first content. Ours already measures 2.2 LU. |
| V3 | Bed 8–11 LU under the voice (reference 5–10 dB) | **[REF-MEASURED], [MEASURED-in-repo]**; contested by accessibility guidance | **See the evidence below this table.** |
| V4 | Word-keyed duck of only −3 dB; attack 70 ms, release 450 ms; merge gaps < 0.3 s | **[AUDIO-CANON]** in principle (sidechain or key ducking is standard; keying from a transcript avoids pumping on syllables) | Many editor guides duck music "during speech and bring it back in pauses" ([Soundstripe](https://soundstripe.com/blogs/how-to-perfect-your-audio-levels), [tryuncle](https://tryuncle.com/learn/davinci-resolve/how-to-duck-background-music-under-dialogue-in-davinci-resolve)). The exact −3 dB is the repo's choice [MEASURED-in-repo]; it only works because the music is already set ~10 LU down. |
| V5 | Rides under sentence-final words | **[AUDIO-CANON]** | Standard dialogue-mix practice: final syllables fall in level, so the music is pulled down there and blooms in the gap after. |
| V6 | SFX "naive minus 6 dB", set by max momentary loudness vs the voice | **[MEASURED-in-repo]**, method **[AUDIO-CANON]** | Measuring each event's loudness instead of setting raw gains is good practice. The "−6 dB" rule is the user's own [OPINION]. |
| V7 | A whoosh on every camera move, peak matched to the move's ease-out | **[MEASURED-in-repo]** + **[OPINION]** | Common motion-graphics advice: align the strongest part of the sound to where motion peaks or changes ([Pixflow](https://pixflow.net/blog/enhancing-motion-graphics-with-cinematic-transition-sounds/)). No retention data exists. |
| V8 | Sample-exact SFX sync from the picture's own constants | **[AUDIO-CANON]** | Sync tolerance: ITU-R BT.1359 detectability is about **+45 ms (sound early) to −125 ms (sound late)**; acceptability is about +90/−185 ms ([ITU-R BT.1359](https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-0-199802-S!!MSW-E.doc); [Wikipedia](https://en.wikipedia.org/wiki/Audio-to-video_synchronization)). EBU R37 asks for end to end within roughly +40/−60 ms (sources differ on the sign). So at 30 fps, **a sharp hit may be up to 1 frame early or up to 3 frames late before it is noticed.** Practitioners nudge sharp impacts ~1 frame early ([Morphic](https://morphic.com/resources/how-to/how-to-sync-sound-effects-to-video)) [OPINION]. The repo has no explicit tolerance; it places on the exact frame. |
| V9 | Continuous ambience bed, one per location, ~26–30 LU under the voice | **[AUDIO-CANON]** | Room tone and ambience under every scene is basic film practice. It hides edits and stops "dead air". |
| V10 | Music dead stop on the pivot word, then 10 s carried by SFX | **[MEASURED-in-repo]**; the device is **[AUDIO-CANON]** in film scoring (the "drop-out" before a gag or impact) | No short-form retention data [UNVERIFIED for retention]. |
| V11 | Loud hits placed after the line or in word gaps, never on a key word | **[AUDIO-CANON]** | Dialogue intelligibility comes first in every broadcast mix spec. The repo writes this into its comments (button "after the last word, so it never masks the hook line"). |
| V12 | Music tempo locked to an on-screen rhythm (120 BPM = footfalls, 84 BPM = sway) | **[MEASURED-in-repo]**; classic animation "mickey-mousing" **[AUDIO-CANON]** in cartoon scoring | |
| V13 | Distance-based gain, low-pass and reverb | **[AUDIO-CANON]** (air absorption and direct-to-reverb ratio) | Low value for flat 2D art [INFERENCE]. |
| V14 | Final chord on the last word, short ring, no outro | **[REF-MEASURED]** (the reference ends on the last word) | Agrees with our playbook's "cut within 0.5 s of the answer". |
| V15 | Low "whoomp" and "boom" content (≈50–62 Hz) | **[AUDIO-CANON]**: inaudible on phone speakers | Phone speakers roll off well above that. Estimates of the usable floor range from ~200 to ~600 Hz depending on device ([Waves](https://www.waves.com/tips-for-great-mixes-on-small-speakers), [LANDR](https://blog.landr.com/make-bass-audible-phone-speakers), [Sonarworks](https://www.sonarworks.com/soundid-reference/blog/learn/make-your-mix-sound-great-on-small-speakers); vendor sources, they disagree on the exact cutoff). The repo layers cracks and transients on top, so its hits still read. Ours does not (see G6). |
| V16 | Does any of this raise retention? | **[UNVERIFIED]** | No controlled study isolates SFX or music in Shorts retention. The only number found is vendor data saying speech-led Reels beat music-led ones (Emplifi, Facebook Reels: about +11.7 % at 3 s) [PRACTITIONER-DATA, vendor] ([Emplifi](https://emplifi.io/resources/facebook-reels-data/)). Our playbook already says this. |

**Evidence on how far under the voice the bed should sit (V3).** The sources disagree with each other:
- **Accessibility guidance** wants a much bigger gap:
  - WCAG 1.4.7 (level AAA) asks for background audio **≥ 20 dB under speech** ([summary](https://www.disabilityworld.org/toolkit/standards/wcag/1-4-7-low-or-no-background-audio/)).
  - A voice-over preference study found non-experts preferred a **20–30 LU** gap and experts 11.5–17 LU, and recommends at least 20 LU.
  - A ducking study reports listeners **over 50 wanted at least 7 LU**.
  - The UK DPP minimum is 4 LU.
  - These figures come from search snippets of Salford-repository papers; the full texts were not readable [PRACTITIONER-DATA, secondhand].
- **Editor guides** say 18–25 dB ([vidpros](https://vidpros.com/fix-background-music-too-loud-video/), [overseeros](https://www.overseeros.com/blog/background-music-volume-under-voiceover)) [OPINION].
- **The reference channel** sits at only 5–10 dB.

**Conclusion:** 8–10 LU is the "energetic" end of the range. For our audience, which includes older viewers, 10–14 LU is the defensible middle [INFERENCE].

---

## 3. Gap vs our ep 02 (Pondy grid)

Measured on our `audio/mix.wav`:
- **Loudness:** −14.0 LUFS integrated, LRA 2.2 LU, true peak −2.2 dBFS, no silences under −45 dB longer than 0.3 s. **These already match the reference.**
- **Length and speech rate:** 39.1 s, 94 words, 2.44 words/s.
- **Event count:** about 68 SFX events, 28 of them rhythmic knocks, so ~40 designed events, **≈1.0 per s, the same as the repo's 1.07.** Density is not the problem. Placement, continuity and the music's relationship to the picture are.

| # | Gap | What ours does | What the repo does | Severity |
|---|---|---|---|---|
| **G1** | **The reveal sting sits on the key word** | `snap + boom + bell + pop` fire at `REVEAL` = the *start* of "Dutch" (26.993 s), so a 0.8 s, 50 Hz-plus-noise boom masks the payoff word. | Big hits go after the line or in gaps (button "after the last word"); music dead-stops *on* the pivot word so the word is left alone. | **High** |
| **G2** | **Music never really stops** | Twist shot before the reveal: music at 25 % plus a D drone; elsewhere 60–100 %. There is no moment without music. | 10.4 s without music after a dead stop on the pivot word; SFX and bed carry it. | High |
| **G3** | **Two tempos clash** | The music grid is 112 BPM (beat 0.536 s), but the clock knocks in `guess`/`twist` are every **0.5 s** (= 120 BPM) on top of 112 BPM plucks, so they drift against each other across 8 s. The `french` knocks every 0.27 s are nearly half a beat (0.268), but start off-grid. | One grid: music tempo = the on-screen rhythm; every rhythmic SFX sits on it. | High (audible) |
| **G4** | **The music ignores the picture** | A fixed D–Bm–G–A pluck loop from t = 0, whatever the shots are. Only level and drums toggle per shot, plus a pad on `card`. Cuts and the reveal fall wherever the loop happens to be. | Arrangement changes per section; the grid starts so the key word is a downbeat; button chords on the flash and the hits. | Medium |
| **G5** | **No ambience bed** | Only `rustle` (0.6 s) and an unused `rain()`. Under the speech, the sound is just the pluck loop. | One bed per location, always on, ~26–30 LU under the voice. | Medium |
| **G6** | **Booms are inaudible on phones** | `boom` = 50 Hz sine plus low-passed noise. The phone-speaker floor is ~200–600 Hz, so the reveal's weight disappears on the main playback device. The 48 Hz kick in the bed has the same problem. | Low whoomps are always layered with cracks or transients in the mid range. | Medium |
| **G7** | **Ducking pumps and is too deep** | An envelope follower on the voice *audio* (attack 10 ms, release 350 ms, depth −8 dB). It dips on every syllable and recovers in micro-gaps. | −3 dB keyed from word times, 70/450 ms, word gaps < 0.3 s merged, plus rides under sentence ends. We already have every word's t0/t1 in `timeline.js`. | Medium |
| **G8** | **SFX and music are normalised together** | Music and SFX are summed into one bed, then the bed is normalised to −27 LUFS. One loud boom lowers all the music; a quiet episode pushes the plucks up. SFX levels are raw gains, not measured. | Each event is set by its own max momentary loudness relative to the voice; music is set per section relative to the voice. | Medium |
| **G9** | **The limiter colours the voice** | `0.89*tanh(x/0.89)` runs on *every* sample, a soft clipper that is always slightly on. | A look-ahead gain limiter, active on only 3.5 % of samples. | Low–medium |
| **G10** | **The ending is not composed** | `loop` shot at 85 % music; the plucks keep going and the whole mix is chopped by a 0.12 s fade at the end of TAIL (0.5 s after the last word). | Tonic chord on the last word, rings out, 0.2 s fade. | Low–medium |
| **G11** | **SFX times are shot-local guesses** | e.g. `at('guess', 0.1)`, `at('ruler', 0.3 + k*0.55)`. These are not read from the animation keys in `film.js`, so a re-timed animation silently drifts out of sync. | `timeline.py` mirrors the picture constants; there is one source of truth. | Low now, grows with each episode |
| **G12** | **No space** | All SFX are dry, with no reverb glue. | A shared short reverb send. | Low |
| G13 | Bed level | Bed −27 vs voice −14 = **13 LU**; music during speech is lower still after the −8 dB duck (est. −20 LU or more) [INFERENCE]. | Bed ~8–9 LU, music ~10 LU under the voice. | **Not a defect.** Ours is inside the kit rule and the accessibility-leaning range. The music is just close to inaudible under speech on phones. Keep the bed level, fix the duck (G7). |

Things we already do as well as or better than the repo:
- −14 LUFS with ≤ −1 dBTP.
- No dead air.
- The fixed opening whoosh sits under the first word: voice at 0.12 s, whoosh 0–0.5 s.
- A riser into the reveal (0.9 s, squared ramp; the repo has none as such).
- A "wrong answer" buzz synced to a word (`wordAt('foreshadow','இல்ல')`).
- A bell synced to a word in `card`.

---

## 4. Recommended rules and implementation notes (for make-audio.js, pure JS)

Each rule has a grade. "Rule" means it goes into the kit; the code notes fit the current `make-audio.js` style (same `add`/`addBuf`/`env` helpers).

**R1. Never put a loud hit on a key word. Put it in the gap after the line, or on the line's last syllable end.** [AUDIO-CANON] [MEASURED-in-repo]
- Split the reveal sting. A short high `snap` (it carries no low mids and masks little) can stay on `REVEAL`, or 1 frame earlier (−33 ms; V8).
- Move `boom` + `bell` to the end of the reveal sentence (`தான்!` t1 ≈ 28.565, which is also the cut to `french`) or into the pause.
- Code: `const REVEAL_END = words.find(w => w.t0 >= REVEAL && /[!.?]$/.test(w.w)).t1; boom(REVEAL_END); bell(REVEAL_END + 0.05, 440, 0.12);`

**R2. Music dead-stops on the pivot word and stays out until the answer has landed; the SFX and bed carry the gap.** [MEASURED-in-repo] [AUDIO-CANON as a device; retention UNVERIFIED]
- In `level(t)`, return `0` (not 0.25) from the pivot word (`ஆனா` in `twist`, 21.751) to `REVEAL_END`.
- Make the cut-off a 10–15 ms fade, not an instant zero, to avoid a click.
- Keep the clock knocks and riser as the only sounds under the voice there. This also removes the D drone (it is part of the same "never quiet" problem).
- Bring the music back with a tonic "button" chord on `REVEAL_END`.

**R3. One tempo grid per episode. Every rhythmic SFX sits on it.** [MEASURED-in-repo] [AUDIO-CANON]
- Clock knocks: `for (let t = gridAfter(at('guess',0.9)); t < REVEAL - 0.25; t += B) knock(t, 0);`
- `french` knocks: step `B/2`, start on the grid.
- Helper: `const gridAfter = t => Math.ceil((t - PHASE) / (B/2)) * (B/2) + PHASE;`

**R4. Phase the music so the payoff word is a downbeat.** [MEASURED-in-repo]
- `const PHASE = REVEAL_END % (4*B);` then start the beat loop at `t = PHASE - 4*B*k`.
- Alternative: choose TEMPO so that (`REVEAL_END` minus the first beat) is a whole number of bars.

**R5. At least four music states per episode, chosen per shot.** [MEASURED-in-repo] [OPINION on the exact count]
1. Hook: full, drums on.
2. Explain: light, no kick, plucks only.
3. Tension: pedal tone plus ticks, no melody.
4. Stop: silence (R2).
5. Payoff: button chord, then a lighter loop.
6. End: tonic chord on the last word (R10).

This is a small `state(t)` table keyed by shot name, replacing `level()` and `drums()`. No new synthesis is needed.

**R6. An ambience bed is always on, one per place, about 26–30 LU under the voice; music-free gaps raise it to ~19–22 LU under.** [AUDIO-CANON] [MEASURED-in-repo]
- For Pondy: sea wash plus wind plus a few crows or a distant street.
- Code:
  ```js
  function amb(t0, d, {lpK=0.03, swell=0.15, chirps=0}) {
    const b = lp(noise(d), lpK);
    env(b, (x,l) => (1 - swell + swell*Math.sin(TAU*0.12*x)) * Math.min(1, x/0.5) * Math.min(1, (l-x)/0.5));
    addBuf(t0, b, 0, 1);
    for (let k = 0; k < chirps; k++) ping(t0 + rng()*d);
  }
  ```
  The sine-modulated swell gives the sea wash. Swap `ping` for a short formant "caw" if wanted.
- Put the beds on their **own bus**, normalised by integrated loudness (R8).

**R7. Every boom, kick or whoomp gets a mid-range layer at 150–700 Hz, so it exists on a phone speaker.** [AUDIO-CANON] [PRACTITIONER-DATA, vendor sources]
- Add a 2nd and 3rd harmonic at 100–150 Hz plus a 10–20 ms noise click high-passed around 1 kHz.
- Check the mix once through a 300 Hz high-pass. If the reveal still "hits", it works on phones.
- Code, inside `boom`: `add(t0, 0.25, x => Math.tanh(3*Math.sin(TAU*(50*x + 1.5*(1-Math.exp(-x*12)))))*Math.exp(-x*8), 0, 0.25);`. The tanh saturation creates audible harmonics of the 50 Hz.

**R8. Mix by measured stems, each relative to the voice: music, SFX and beds are separate.** [AUDIO-CANON] [MEASURED-in-repo]
- Targets with the voice at −14 LUFS:

  | stem | in normal sections | in music-free gaps |
  |---|---|---|
  | music | **−11 to −13 LU** under (≈ −25 to −27 LUFS) | none |
  | SFX | **−13 to −15 LU** under (integrated) | |
  | bed | **−26 to −30 LU** under | −19 to −22 LU under |

- These keep the kit's "bed about −25 to −30 LUFS" rule and sit inside the accessibility-leaning range (V3).
- Use the existing `lufs()` per stem: three ffmpeg calls instead of one.
- Optional: per-event level. Take each SFX's peak 400 ms RMS (a rough stand-in for momentary loudness with no K-weighting [INFERENCE]) and set it from a small table of "LU under the voice": whoosh −17, pop −18, knock −20, reveal hit −8.

**R9. Duck from word times, not from the audio. Depth −3 to −4 dB, attack ~70 ms, release ~450 ms, gaps under 0.3 s merged; add −2 to −3 dB rides under sentence-final words.** [AUDIO-CANON] [MEASURED-in-repo]
- `words` already holds every t0/t1. Build a 1 kHz control array set to 1 from `w.t0 - 0.08` to `w.t1 + 0.12`, with gaps under 0.3 s merged, then run the same one-pole smoothing at 70/450 ms. Duck = `10**(-3.5*env/20)`.
- Ride: for each word ending in `.`, `!` or `?`, add −2.5 dB from `w.t0 - 0.1` to `w.t1`.
- Because R8 sets the music at −11 to −13 LU *after* the duck, the music stays faintly audible on a phone instead of vanishing.

**R10. The ending is composed: a tonic chord on the last word's t0, no new notes after it, ring out, 0.15–0.25 s fade to the end of TAIL.** [MEASURED-in-repo] [REF-MEASURED: ends on the last word]
- Code: `const LAST = words.at(-1); if (t >= LAST.t0) skip loop notes;` then `for (const m of [50,62,66,69]) add(LAST.t0, DUR - LAST.t0, x => pluck-ish..., 0, 0.12)`.
- A loop-friendly tail is **optional [OPINION]**. The playbook already says loop lines are optional. If the episode loops, let the final chord's ring be clipped by the opening whoosh rather than designing a seamless loop.

**R11. One source of truth for timing.** [AUDIO-CANON] [MEASURED-in-repo]
- Any SFX tied to an animated event (pencil stroke, house pop, card flip) reads that event's time from the same object `film.js` uses. For example, export `EVENTS = { ruler: [{t:0.3, kind:'stroke'}, ...] }` from a shared `events.json`, used by both make-audio.js and film.js.
- Sync tolerance to check by eye on VideoHub frames: **a hit lands on the contact frame, or up to 1 frame early; never more than 3 frames late** (BT.1359: +45/−125 ms).

**R12. Replace the always-on tanh with a gain limiter.** [AUDIO-CANON]
- Code: peak per 1 ms block → required gain `min(1, 0.89/peak)` → minimum over ±3 ms look-ahead → one-pole release over 80 ms → multiply.
- About 15 lines of JS. Check that the gain reduction rarely exceeds 2 dB; if it does, the stems are too hot.
- Keep the final ffmpeg ebur128 check; ours already prints it.

**R13. A whoosh's peak matches the motion it covers.** [MEASURED-in-repo] [OPINION]
- Ease-out camera moves and cuts: peak at **70–90 ms**, length 0.45–0.6 s.
- Crossfades: a swell peaking ~0.3 s in, length ~0.8 s.
- Into a flash or reveal: a reverse swell that peaks *on* the event.
- Our current whoosh is a symmetric sine envelope (peak in the middle), which lands late on a cut. Add a `peak` parameter: `env(b, (x) => x < pk ? (x/pk)**2.2 : Math.exp(-(x-pk)/tail))`.

**R14. Keep density near 1 designed SFX per second, plus a continuous layer (bed or rhythmic world sound).** [MEASURED-in-repo]
- Ours is already ≈1.0/s. Do not add more one-offs. Spend the effort on R1–R6.
- Mani's reactions can use a formant "huh?" (the `huh()` helper exists but is never called), placed **in word gaps only** [INFERENCE; fits style-sheet §4 "Mani reacts with faces and sound effects"].

**R15. QA: on every build, print voice/music/SFX/bed LUFS and the voice-minus-bed margin per shot, plus silencedetect (−45 dB, 0.3 s).** [MEASURED-in-repo]
- Flag any shot whose 10th-percentile speech margin falls below ~4 LU. That is the DPP minimum, and the repo's own p10 dips to 0.7 LU under loud hits [PRACTITIONER-DATA].

### Suggested order of work
1. R1 + R2 + R3 (about 20 lines total; fixes the three audible problems in ep 02).
2. R7 + R9.
3. R6 + R8.
4. R10 + R13.
5. R11 + R12 + R15 as pipeline hardening.
6. R5 as each new episode is scored.

### Kit text change (style-sheet §6), proposed, not applied
Add: "Music: self-made, one tempo grid per episode, the payoff word on a downbeat. The music stops dead on the pivot line and returns with a button chord after the answer. No hit on a key word. Every boom has a 150–700 Hz layer. One ambience bed per location, always on. Duck from word times (−3 to −4 dB), not from the audio."

---

### Sources
- Repo: `mromidev/claude-animated-shorts`, `templates/audio/*`, `SKILL.md`, `references/STYLE_BIBLE.md` (MIT).
- [ITU-R BT.1359](https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-0-199802-S!!MSW-E.doc); [Audio-to-video synchronization (Wikipedia)](https://en.wikipedia.org/wiki/Audio-to-video_synchronization); [TV Technology](https://www.tvtechnology.com/opinions/av-synchronization-how-bad-is-bad)
- [Production Advice: YouTube loudness](https://productionadvice.co.uk/youtube-loudness/)
- [WCAG 1.4.7 summary](https://www.disabilityworld.org/toolkit/standards/wcag/1-4-7-low-or-no-background-audio/); [Salford repository (Ward/Shirley group)](https://salford-repository.worktribe.com/output/1357673/improving-broadcast-accessibility-for-hard-of-hearing-individuals-using-object-based-audio-personalisation-and-narrative-importance); [JSLHR 2026](https://pubs.asha.org/doi/10.1044/2026_JSLHR-25-00127)
- [vidpros](https://vidpros.com/fix-background-music-too-loud-video/); [overseeros](https://www.overseeros.com/blog/background-music-volume-under-voiceover); [Soundstripe](https://soundstripe.com/blogs/how-to-perfect-your-audio-levels); [tryuncle (Resolve ducking)](https://tryuncle.com/learn/davinci-resolve/how-to-duck-background-music-under-dialogue-in-davinci-resolve)
- [Waves: small speakers](https://www.waves.com/tips-for-great-mixes-on-small-speakers); [LANDR: bass on phones](https://blog.landr.com/make-bass-audible-phone-speakers); [Sonarworks](https://www.sonarworks.com/soundid-reference/blog/learn/make-your-mix-sound-great-on-small-speakers); [Audiokinetic phone measurements](https://blog.audiokinetic.com/en/loudness-and-frequency-response-on-popular-smart-phones/)
- [Morphic: syncing SFX](https://morphic.com/resources/how-to/how-to-sync-sound-effects-to-video); [Pixflow: transition sounds](https://pixflow.net/blog/enhancing-motion-graphics-with-cinematic-transition-sounds/); [Sound Ideas / Randy Thom: offsetting layers](https://sound-ideas.com/blogs/sound-ideas/enhancing-sound-effects-by-slightly-offsetting-diverse-sound-elements)
- [Emplifi: Facebook Reels data](https://emplifi.io/resources/facebook-reels-data/)
