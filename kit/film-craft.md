# Film Craft: how to direct a code-animated Short

This is the rulebook for Shorts built as code in VideoHub (2D canvas, `film.js` + `make-audio.js`, one-take voice with word timestamps). The camera and script rules also apply to the AI-stills + Resolve workflow.

Distilled on 2026-11-14 from the teardown notes in `research_notes/Animated shorts repo teardown/` (the `mromidev/claude-animated-shorts` repo, which measured 20 Shorts from one top animated channel, 32,337 frames), compared against our ep 02 (`D:/Personal/VideoHubWorkspace/films/02-pondy-grid`). The wider evidence base is `reports/Short form video craft playbook.md`. Full reasoning, sources and code sketches are in the notes; this file is the short version.

**How to read the tags**
- **[MEASURED-ref]**: measured on the reference channel in that repo. Real data, but one channel, one look, and no link to retention was shown.
- **[CANON]**: classic animation, painting, film-sound or broadcast practice.
- **[RESEARCH]**: peer-reviewed study.
- **[PRACTITIONER-DATA]**: a named creator, studio or platform stat with numbers.
- **[OPINION]**: a judgement call (the repo author's or ours).
- **[UNVERIFIED]**: claimed, not checked.

**Units.** Video is 1080×1920 at 30 fps, so 1 frame (f) = 0.033 s. "%/f" = how much the zoom grows per frame (0.25 %/f is about 7.5 % per second).

---

## 1. Script and pacing

1. Sentence 1 states the surprise as a **fact**, not a question: the belief or fact plus the thing that breaks it. The spoken paradox lands by **2.0 s** (tightened from 3 s on 2026-11-18: ep 01–03 landed it at ~4.5 s and 57 % swiped away before choosing to watch). The on-screen Tamil question stays from frame 0; speak it first only if it fits in ~1.5 s. [MEASURED-ref, 20 of 20 videos; MEASURED-ours; question vs statement is otherwise unproven]
2. A foreshadow line follows right after: what the viewer gets by the end. [PRACTITIONER-DATA, playbook]
3. The middle has **at least 3 "but / therefore" beats**, each a bit bigger. One of them is an exaggeration joke ("so slow that…"). [MEASURED-ref, 3–6 beats and 1–2 jokes]
4. Exactly **one mystery beat** (a question to the viewer) before the reveal. In the Paati series the guess beat is it. [MEASURED-ref]
5. After the reveal, one **mechanism line with an everyday Tamil analogy**, opened with "ஏன்னா…" or "விஷயம் என்னன்னா…" (the reference's "You see," pivot). Use kitchen, kolam, bus, cricket, Paati's house. Place it at **55–65 %** of runtime. [MEASURED-ref, 14 of 20]
6. The last spoken line is the **ironic or surprising twist**, and the video ends on its last word (tail ≤ 0.5 s). No recap ("சுருக்கமா…"). A callback to the hook is fine only if it *is* the twist. In the Paati series the twist line is still the fact. [MEASURED-ref + PRACTITIONER-DATA n=1]
7. Pace is measured in **seconds, never words**: ≤ 3.6 s per sentence, one idea per sentence. **Speed: a guide, not a rule — Vasanth's ear decides.** About 7–7.5 syllables a second was the first target (measured 2026-11-18), but for ep 03 he preferred the natural pauses (6.2 syl/s) over the tightened cut (6.6), which felt rushed; tighten only when a retention curve shows viewers leaving in a pause. The biggest Tamil facts channel (SJ Tamil, 2–3M-view Shorts) runs ~8.2–8.5 syl/s; our ep 01 ran 6.1 and ep 03's v5 take 6.6 at 1.04×. Comparing with the English reference (Zack D. Films ~4.8 syl/s) was misleading: Tamil packs fewer bits per syllable, so it runs more syllables a second. Get there by trimming words and pauses first, then the mix speed (`TEMPO`), checked by ear; don't chase 8.3 with an AI voice. Measure with `kit/tools/syllable-rate.cjs`. [MEASURED-ours + MEASURED-peer, see research_notes/ElevenLabs v4 voice direction.md]
8. **Pause budget:** gaps over 0.25 s add up to ≤ 1.0 s per 40 s. One deliberate think-pause (≤ 0.5 s) after the mystery question is allowed. [MEASURED-ref; the exception is OPINION]
9. Don't narrate what the picture already shows; the narration adds the *why*. [OPINION]
10. Jokes are real researched facts, said in one steady calm tone. [OPINION]
- *Canvas:* the one-take voice (`vo/tts.mjs` → `alignment.json`) is the clock. Cut and key every shot from word times, never by hand-typed seconds.

## 2. Camera

1. **The camera moves on ≥ 85 % of the runtime.** The reference is fully still on only 10 % of frames. [MEASURED-ref]
2. A new framing, camera move or on-screen reveal **at least every 2 s on average** (reference: every 1.7 s). A glide counts; a cut is not required. [MEASURED-ref]
3. **Every hold pushes in at 0.15–0.35 %/f** (about 5–10 % per second), near-linear, never eased to a stop inside the shot. [MEASURED-ref]
   - *Canvas:* one helper `pushK(s, rate, punchStart)` called in every shot instead of `1 + 0.05*ease(s/d)`.
4. **Punch words** get about 0.6 %/f for about 35 f (≈ +21 %). The push stops dead on an impact frame. [MEASURED-ref]
5. Moves **ease in and out symmetrically** over 18–40 f (0.6–1.3 s). Duration ≥ 0.05 × distance in 1080p px (in frames). [MEASURED-ref + CANON "slow in, slow out"]
   - *Canvas:* `glide = x => x*x*x*(x*(6*x-15)+10)` (smootherstep). Our cubic `ease` is close; switch only where a move feels snappy.
6. A reframe bigger than half the frame width, or more than 40 % zoom, is a **cut**, not a fly. [MEASURED-ref]
7. **No continuous float or wobble.** Rolls are moves: 1–2 per film, 3–8°, glided over ≥ 18 f, on emphasis words. [MEASURED-ref]
8. **At most one whip pan per film**, 10–15 f long, peak ≤ about 140 px/f, 2–3 f ramps, always with real directional blur. Use push-ins, follow-moves and 6–8 f crossfades for other transitions. [MEASURED-ref]
   - *Canvas:* draw the two-shot pair N = 10 times across half the frame's motion with `globalAlpha = 1/(i+1)` (exact running average), not 3 ghost copies.
9. **Impacts:** a 7-frame kick whose offset flips sign every frame (≈ 4.5 px × gain at 1080p, decay `(1 − n/7)^1.5`, roll ±0.2°) plus the white flash. Only on 1–2 real hits (reveal, stamp slam). [MEASURED-ref, thin sample]
   - *Canvas:* `kickAt(t)` over a `KICKS = [[t0, gain]]` list taken from word times; overscale 1 % to hide the edge.
10. Ordinary cuts are plain. Keep the zoom punch-in only on 1–2 beat cuts, or it stops meaning "impact". [MEASURED-ref + OPINION]
11. Visual reactions (pops, rips, stamps, expression changes) start **2 f (0.067 s) before** their word. [MEASURED-ref, n=4; matches CANON]
12. Background crowds and extras stand still; the camera supplies the motion. [MEASURED-ref]

- **Ep 03 review (2026-11-18): "it looks like the camera is still" even at 12.7 % still share.** What fixed it (now 4.9 %): a firmer base push (`min(0.13, 0.42/d)`), a reframe about every 1.3 s instead of 1.8 s, a slow handheld drift on every shot, and a **parallax background** (`far()`: the back layer pushes in only 40 % as much as the front). Aim for **≤ 8 %** still share, and judge by eye too: the metric misses big flat areas.
- **No empty holds.** If the line says something exists, it is on screen and moving from the start of the shot (ep 03's cells grid sat empty for ~3 s until "தீக்குச்சி"). Something new should appear or change at least every ~1.3 s.

## 3. Characters and acting

1. **Still unless acting.** No always-on sway or nodding. Extras move only on a cue word, each with its own phase. [MEASURED-ref; a subtle moving hold is CANON-acceptable]
2. **Blinks per character**, gaps 0.5–2.3 s from a seeded random, 4 frames shaped half / shut / shut / half. Never all characters on the same frame. [MEASURED-ref]
   - *Canvas:* `lidAt(charId, t)` from a seeded hash of (character, blink index); stays a pure function of t.
3. **Blink across every expression change**, so the two shut frames hide the swap. [OPINION + CANON]
4. **Faces read in 0.5 s only when big:** a shot where an expression *changes* shows the face at **≥ 25 % of frame width** (≥ 270 px). Smaller faces carry body action or a very big expression only. [RESEARCH (small-screen and face-perception studies) + OPINION for the 25 %]
5. **Feature contrast on Mani's skin:** eyes, brows and mouth ≥ 3:1 against the skin; shock eyes and open mouth ≥ 4.5:1. Ep 02's eyes are 2.5:1 and the mouth 1.74:1. [RESEARCH + PRACTITIONER-DATA; thresholds borrowed from WCAG, OPINION]
   - *Canvas:* add **eye whites** (`#F7F3EA` almond, about 0.16 × 0.13 head-width, 6.7:1 on the skin); closed-mouth line `#1A0E0C`, 0.05 W thick; near-black tapered brows; reduce the head gradient's edge darkening from −0.20 to about −0.10. Shape dark skin with small warm highlights (15–25 % alpha), not more diffuse light (Pixar *Soul* practice).
6. **Brows carry the emotion.** 0.05 W thick tapering to 0.025 W, 0.17 W long, about 0.20 W above head centre. [RESEARCH + MEASURED-ref]
7. **Expression set of 6–8**, each just eye type + brow pair + mouth type: curious, shocked, worried, relieved, happy, amused (+ neutral, confused). Make shock and happy big; never rely on a small mouth-corner change. Shock eyes = white circles 0.22 W, almost touching, tiny pupils. [RESEARCH + MEASURED-ref]
8. Eyes **0.26–0.28 W apart** (ep 02: 0.33 W). Moustache = two tapered commas with ≥ 0.04 W gap above the mouth so they don't merge. [MEASURED-ref + OPINION]
9. **Break the symmetry:** lean 3–6° toward the action, head tilt ±3–5°, one arm busy. Big beats get the whole body (shock jump, 8–10° recoil). [MEASURED-ref + CANON]
10. **Head shape:** rounded, slightly wider than tall (H/W 0.95), fuller jaw, slightly narrower chin, 8 % bulge toward the look side, ±3–5° tilt. Milder than the reference, to keep Mani's round face. [MEASURED-ref, softened by OPINION]
11. Adults about 3.3–3.5 head-heights, no visible neck (bigger face on a phone). Paati can go to 3.2. [MEASURED-ref + RESEARCH]
12. **Anticipation on hits:** a 3 f wind-up, hold 5–6 f, strike in 1–2 f on the word. No overshoot on character acting; `back()` overshoot stays for graphics and titles. [MEASURED-ref + CANON]
13. **Silhouette test** on key poses: filled black, you can still tell what Mani is doing. [CANON]
14. A foreground prop must be recognisable or gone; a rail must cross legs, not torsos. [PRACTITIONER-DATA]

## 4. Depth, lighting, outlines and grade

1. **Background blur on about 1 shot in 3**: close/medium character beats ~12 px, full shots ~8 px, wides, maps and graphics 0; foreground objects 15–24 px. Characters and text stay sharp. Never pull focus inside a shot. [MEASURED-ref]
   - *Canvas:* draw the background into an offscreen layer, copy with `ctx.filter = 'blur(12px)'` (cache it if static), reset to `'none'` before characters. Chromium only, which is what VideoHub renders with.
2. **Parallax push-ins:** background 0.4×, mid 1×, foreground 1.6× the base push rate around one focus point. [CANON + PRACTITIONER-DATA]
3. **Haze:** the farthest layer is pulled 30–40 % toward the horizon/sky colour. [MEASURED-ref + CANON]
4. Top-down town shots may use **tilt-shift** (sharp band y 0.38–0.62, 10–14 px blur outside) to read as a clay miniature. [UNVERIFIED citation, common practice]
5. **Shadows keep their hue:** day shade ≈ 0.5 × lit brightness, same hue, slightly more saturated. Mix toward night indigo `#1F2A44`, never toward black. Dusk shadows go violet-blue. [MEASURED-ref + CANON]
   - *Canvas:* in `shade(hex, k)` use `[31,42,68]` instead of `[0,0,0]` for k < 0; `soft()` shadows in `rgba(31,42,68,a)`. Keep skin shadow warm (toward `#3E2614`) if it turns cool.
6. **One key light per shot**, upper-left by default: head highlight, body gradient and drop-shadow offset all agree (shadow x offset ≈ +0.6 × y offset). [CANON]
7. Contact = a soft blue-violet blob under every character (about 0.5 W × 0.06 W, alpha 0.3). Without it they float. [MEASURED-ref]
8. **Character outline (code films):** a warm dark line `#2A1A14`, 3–5 % of head width, 2–3× thicker on the bottom/shadow side, drawn once around the whole silhouette. Inner lines (brows, mouth) 0.6–0.9×, clothing seams 0.4×. With the outline on, drop the drop-shadow alpha to about 0.18. [MEASURED-ref + RESEARCH (edges drive fast recognition) + OPINION for the warm colour]
   - *Canvas:* draw the character to an offscreen buffer, stamp it 8 times offset by w around a circle, tint with `source-in`, draw behind. Don't scale line width with camera zoom.
9. Background lines (tiles, house edges, kolam) are thinner and half the contrast of the character outline, so characters always win. [MEASURED-ref]
10. **Glow only on emitters** (lamps, glowing lines, sun), never on faces, white text or white surfaces. Pulse once on the word, then hold; no 1 Hz loop. [MEASURED-ref]
11. **No grain or noise texture** on characters; clay feel comes from soft gradients and shadows. [MEASURED-ref + UNVERIFIED compression claim]
12. **No crushed blacks** except ink and pupils; darkest painted tones stay at L* ≥ 19. Night indigo already sits in the right band. [MEASURED-ref]
13. **Light vignette** on day and map shots (corner about 0.86 of centre, indigo-tinted, under the captions); table shots keep their stronger pool. [MEASURED-ref]
14. Sunlit surfaces use lighter tints than the brand hexes (lit red ≈ `#E85648`, lit green ≈ `#7FBC4E`); brand hexes stay for stamps and text. [MEASURED-ref]
- Tone and brightness of ep 02 already match the reference. Don't regrade.

## 5. Sound

1. **Never put a loud hit on a key word.** Big hits go in the gap after the line or on its last syllable. A short high "snap" may sit on the word (or 1 f early). [CANON + MEASURED-ref]
2. **Music stops dead on the pivot word** (10–15 ms fade, no click) and stays out until the answer has landed; SFX and ambience carry the gap; it returns with a tonic "button" chord. [MEASURED-ref; CANON as a film device; retention UNVERIFIED]
3. **One tempo grid per episode.** Every rhythmic SFX sits on it; phase the music so the payoff word is a downbeat. Ep 02 had 112 BPM music against 120 BPM knocks. [MEASURED-ref + CANON]
4. **At least four music states**, chosen per shot: hook (full), explain (light), tension (pedal + ticks), stop (silence), payoff (button then lighter), end (tonic chord on the last word). [MEASURED-ref + OPINION on the count]
5. **An ambience bed is always on**, one per place, about 26–30 LU under the voice; raise it to about 19–22 LU under in music-free gaps. Silence means "no music", never "no sound". [CANON + MEASURED-ref]
6. **Music level:** 10–14 LU under the voice after ducking (about −24 to −28 LUFS with the voice at −14). See "Decisions for Vasanth" for the louder reference level. [MEASURED-ref vs accessibility guidance; INFERENCE for the middle]
7. **Duck from word times, not from the audio:** −3 to −4 dB, attack ~70 ms, release ~450 ms, gaps under 0.3 s merged, plus −2 to −3 dB rides under sentence-final words. Ep 02's −8 dB envelope follower pumps on syllables. [CANON + MEASURED-ref]
8. **A whoosh on every camera move and transition.** Ease-out moves and cuts: peak at 70–90 ms, 0.45–0.6 s long. Crossfades: swell peaking ~0.3 s, ~0.8 s long. Into a flash or reveal: a reverse swell peaking on the event. [MEASURED-ref + OPINION]
9. **Every boom gets a 150–700 Hz layer** (harmonics or a click); phones can't play 50 Hz. Check the mix once through a 300 Hz high-pass: the reveal must still hit. [CANON + PRACTITIONER-DATA]
10. **Mix by separate stems**, each set relative to the voice: music, SFX and beds are measured on their own, never normalised together. [CANON + MEASURED-ref]
11. About **1 designed SFX per second** plus a continuous layer (bed or rhythmic world sound). Ep 02 is already there; don't add more one-offs. [MEASURED-ref]
12. **Composed ending:** tonic chord on the last word, no new notes after it, ring out, 0.15–0.25 s fade. [MEASURED-ref]
13. **One source of truth for timing:** any SFX tied to an animated event reads its time from the same constants `film.js` uses, never a shot-local guess. [CANON]
14. Use a look-ahead gain limiter, not an always-on `tanh` clipper; gain reduction rarely over 2 dB. [CANON]
15. Master −14 LUFS, ≤ −1 dBTP, LRA about 2–3 LU. Ep 02 already meets this. [PRACTITIONER-DATA]
16. Mani's reactions may use a short formant "huh?", in word gaps only. [OPINION]

## 6. QA (before sending a film for notes)

1. **Frozen-span check:** no run of ≥ 12 frames with a mean frame difference under 0.02 (at 180×320), outside planned cards. [OPINION, cheap tooling]
2. **Pop check:** no frame difference over 3× the local median (±8 f) except at planned cuts. [OPINION]
3. **Still-camera share** ≤ 8 % of runtime (was 15 %; ep 03 at 12.7 % still looked still to Vasanth, 2026-11-18), and judged by eye too; something new about every 1.3 s. `check-film.cjs` fails above 8 %. [MEASURED-ref + MEASURED-ours]
4. **Sync by eye on VideoHub frames:** a hit lands on the contact frame or up to 1 f early; never more than 3 f late (ITU-R BT.1359: +45 / −125 ms). [CANON]
5. **Audio print per build:** voice / music / SFX / bed LUFS and the voice-minus-bed margin per shot; flag any shot whose 10th-percentile speech margin drops under 4 LU. Run `silencedetect` (−45 dB, 0.3 s). [MEASURED-ref + PRACTITIONER-DATA]
6. **Phone checks:** 300 Hz high-pass listen; faces at phone size (expression readable, features not sinking into the skin); Tamil glyphs in an exported frame. [CANON + OPINION]
7. Pauses over 0.25 s summed from `alignment.json`: ≤ 1.0 s per 40 s. [MEASURED-ref]

## 7. Layout: nothing overlaps, nothing is cut off (added 2026-11-14, from ep 01's notes)

**What went wrong on ep 01, and why.** Vasanth found an arrow cut off by the frame edge, then, after that was "fixed", the same arrow sitting on top of the ✗ mark, with a label on top of the arrow. Four causes, all general:
- **Labels and picture were placed independently.** Labels sit at fixed screen positions; the picture moves under a camera that pushes in and reframes. Nothing reserved space for either, so they met.
- **Elements were drawn at hand-typed coordinates with no gap rule**, and one was drawn past the frame edge from the start.
- **A fix was made without checking its neighbours.** Moving the arrow to cure the cut-off put its tip on the ✗.
- **The check looked at one frame per shot.** Overlaps that appear only for part of a shot were never seen.

**The rules**
1. **Zones (1080×1920).** Series tag ("உடம்பு series"): y 150–206, far top-left (x from 48). It sits above the usual safe box on purpose, by Vasanth's choice; it stays below y 140 because the apps' own top bar covers the very top edge. The episode number goes in the title and description, not on screen. Labels: y 340–650. Picture subject: y 660–1150. Captions: y 1230–1370. Nothing important goes below 1470 or outside x 90–918. Design each shot's subject to sit in its zone *after* the camera's largest push.
2. **One label at a time** in the label zone. If a label would repeat the caption's words, drop the label.
3. **Pointers stop short.** An arrow, line or bubble that points at something ends 12–16 px before it; it never lands on it.
4. **Camera travel is part of the layout.** A shot with a label above a diagram gets half the reframe travel. A deliberate close-up may crop things, and says so in the code.
5. **Every label, caption and key picture element reports its box** (`claim(kind, name, x, y, w, h)` in the film; kinds `label`, `caption`, `key`, `prop`), exposed as `window.VH_BOXES(t)`.
6. **`kit/tools/layout-check.cjs` must pass before the film goes for notes.** It tests every 0.1 s: no two boxes overlap (except prop-with-prop and caption-with-prop), labels and captions stay in the safe box, key and prop boxes stay in the frame. `check-film.cjs` runs it.
7. **After fixing one overlap, run the check again**: a move that cures one clash often causes the next.

---

- **Every pill or card measures its own text** (`measureText` + padding), never a fixed width; Tamil words run wider than you expect. layout-check cannot see text spilling out of its own pill (ep 03 note 2).
- **The payoff object is a claimed `key` box** (the tear in ep 03 fell off the frame edge on "அதான் கண்ணீர்!" and nobody saw it, note 1). Anything the line names must be on screen, inside the safe box, at that word.
- **A comparison shot needs action on both sides**, not two still props: show the process (sawing, squashing, the halves parting), not just the result (ep 03 note 3).

## Ep 02 gap scorecard (02-pondy-grid, v1)

| Metric | Reference | Ep 02 | Target |
|---|---|---|---|
| Length | median ~60 s (31–78) | 39.1 s | 30–45 s (new channel) |
| Voice starts | ≤ 0.13 s | 0.12 s | ✓ keep |
| Tail after last word | ends on the word | 0.50 s | ≤ 0.5 s ✓ |
| Surprise stated | sentence 1 | at 6.0 s (a question first) | by 2 s (was 3 s) |
| Escalation beats | 3–6, 1–2 jokes | 2, no joke | ≥ 3, one joke |
| Mechanism + analogy beat | 14 of 20 videos, ~60 % | none | one, at 55–65 % |
| Ending | one ironic line | recap + callback (6.4 s after reveal) | one twist line, no recap |
| Seconds per sentence | ~3.6 s | ~3.0 s | ≤ 3.6 s ✓ |
| Pauses > 0.25 s | < 1 s per ~60 s | 2.15 s in 39 s | ≤ 1.0 s per 40 s |
| New framing / move | every ~1.7 s | every ~3.3 s | ≤ 2 s average |
| Still-camera share | 10 % | ~38 % | ≤ 8 % (was 15 %) |
| Hold push-in rate | 0.14–0.35 %/f | 0.03–0.07 %/f | 0.15–0.35 %/f |
| Whip pans | 0.45/min, 7–25 f, blurred | 2 in 39 s, 6.6 f, ghosted | ≤ 1, 10–15 f, real blur |
| Punch-in on cuts | none measured | on all 5 cuts | 1–2 beat cuts only |
| Impact kick | 7 f sign-flip | none | on 1–2 real hits |
| Float / rolls | none / 3.6° moves | ±1.4° sine sway | no float; 1–2 roll moves |
| Reaction lead | 0–3 f early | 0 f | 2 f early |
| Blinks | 0.5–2.3 s, 4 f, per character | 3.3 s, 2.7 f, all in unison | per character, 4 f |
| Face width on expression change | close-ups fill frame | 11 % (shot 8) | ≥ 25 % |
| Eye / mouth contrast on Mani | — | 2.5:1 / 1.74:1 | ≥ 3:1 (key ≥ 4.5:1) |
| Background blur | ~1 in 3 shots | none | ~1 in 3 |
| Shadows | hue kept, ~0.5 × lit | mixed toward black | toward indigo |
| Character outline | plum, 5 % W, 3:1 | none | warm dark, 3–5 % W |
| Vignette | ~0.86 on day shots | table shots only | light, all non-card shots |
| Loudness | −14 LUFS, LRA 2.4 | −14.0, LRA 2.2 | ✓ keep |
| Music under voice | 5–10 dB | ~13 LU, lower under the −8 dB duck | 10–14 LU (decision below) |
| Duck | −3 dB from word times | −8 dB audio follower | −3 to −4 dB from word times |
| Music stop at pivot | dead stop, ~15 % of runtime | never stops | stop on pivot to reveal end |
| Hit on key word | never | boom on "Dutch" | after the line |
| Ambience bed | always on | none | always, one per place |
| Tempo grid | one | 112 vs 120 BPM | one |
| Designed SFX density | ~1.07/s | ~1.0/s | ✓ keep |

## Not copied, and why

- **Stick limbs, dot hands** (0.055 W strokes): that channel's identity, not a readability rule. Chunky clay limbs fit our soft-toy look. [CANON]
- **Pale faces (luma 0.93), no catchlights, no blush:** style, not readability; wrong for Mani anyway. Keep small catchlights.
- **3.7 words/s as a target:** English-only, and the repo's own film ran 3.05. Tamil is measured in seconds per sentence. [RESEARCH]
- **The repo film's ~17 hard cuts:** contradicts its own reference measurement (0–1 per video). We keep cuts where a reframe is too big to glide.
- **"Camera holds ~80 % of frames"** (repo STYLE_BIBLE): superseded by its own better sub-pixel measurement (10 % still).
- **One-word captions** (and the repo's "no captions"): Tamil words are long and faster subtitles cut comprehension. Keep 2–4-word phrases. [RESEARCH]
- **"Luckily… / Unluckily…" double line:** one film's invention. Try it once as an exaggeration joke, not as a rule. [OPINION]
- **3D ink post-process, distance-based reverb and low-pass:** 3D problems; low value for flat 2D.
- **Exact plum outline `#241726`:** warm brown `#2A1A14` does the same job on clay.
- **Film grain:** the reference has none.
- **Repo mix rule "music +3 dB, SFX −6 dB":** the author's own preference, no data.

## Decisions for Vasanth

These are your calls. Nothing below has been applied.

1. **Mani's skin and shirt colours.**
   - *Evidence:* eye contrast on skin `#7A4A2E` is 2.5:1 and the mouth 1.74:1, so they sink at phone size. Lifting the skin to about `#8E5A3A` (still medium-dark) takes eyes to 3.2:1. Eye whites alone give 6.7:1. Separately, `film.js` uses shirt `#C9921E` while the style sheet fixes `#E3A72F`.
   - *Recommendation:* keep the skin; add eye whites, a near-black mouth line and dark brows first (they fix most of it with no identity change). Lighten the skin only if faces still fail at phone size, and record it as character v2. For the shirt, keep `#E3A72F` as canon; if `#C9921E` was chosen because `clayFill` lightens the top by 20 %, write that into the style sheet instead of leaving two values.
2. **Posting volume.**
   - *Evidence:* the winners post a lot (Zack ~5/day, Tamil winners ~1–3/week), and one hit makes a channel, so more Shorts = more chances [PRACTITIONER-DATA]. But volume alone does nothing (a 2.6K-video Tamil facts channel has a 1.95K median), YouTube says volume doesn't drive traction, and your time budget is 12–15 h/week.
   - *Recommendation:* keep the time gate (start at 2/week). The code-film pipeline should cut hours per Short; let the gate carry you to 4/week instead of jumping.
3. **Topic mix.**
   - *Evidence:* every strong Tamil animated median is body/daily habits (Roo 205K, AI2Learn 149K); city/local topics top out around 117K–299K even on a 576K channel [PLATFORM-DATA].
   - *Recommendation:* aim for about 3 in 4 body/daily-habit topics with a Tamil home angle for the next 8 Shorts, city "yen?" 1 in 4, then judge on your own numbers. Body topics carry more health-policy risk, so keep "explain, don't advise".
4. **Packaging extras** (episode numbers, verdict stamp up front, English title translations).
   - *Evidence:* competitors number episodes and set English translations; nobody in Tamil uses a verdict stamp. Effects are unmeasured.
   - *Recommendation:* add English title/description translations (cheap, more search reach). Numbering is optional. Showing the *final* verdict in frame 0 would spoil the guess beat; if you want the stamp visible early, show it un-inked or with "?" and slam the real one at the end.
5. **Music bed level.**
   - *Evidence:* ours sits about 13 LU under the voice (then the −8 dB duck makes it nearly inaudible on phones). The reference sits 5–10 dB under (energetic). Accessibility guidance wants ≥ 20 dB, and listeners over 50 asked for ≥ 7 LU.
   - *Recommendation:* keep 10–14 LU (your audience includes Paati's generation) and fix the duck to −3 to −4 dB from word times, so the music is audible between lines without fighting the voice. Go louder only after a phone listen with an older family member.
6. **Rim light.**
   - *Evidence:* the style sheet asks for a "soft rim"; the reference has none (measured), and an offset outer rim made hats look like picture frames in the repo's tests.
   - *Recommendation:* in code films, use the outline + one key light instead of a rim; at most an inner warm rim on head and torso for night-indigo scenes. Keep "soft rim lighting" in the AI-stills prefix only if the stills look good.
7. **Squash and stretch.**
   - *Evidence:* none in the reference; it is classic 2D animation practice and suits a soft-toy look.
   - *Recommendation:* allow it only on stamp hits and landings: (1.12, 0.88) for 2 f, then (0.96, 1.04) for 2 f, volume kept. Never on talking or idle.
