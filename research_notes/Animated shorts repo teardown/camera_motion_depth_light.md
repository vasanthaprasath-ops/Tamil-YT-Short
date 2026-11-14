# Camera, motion, depth, lighting and grade: repo teardown vs our ep 02

Source repo: `mromidev/claude-animated-shorts` (MIT). Its reports measured 20 Shorts from one top animated channel (720x1280, 30 fps, 32,337 frames for motion, 539-2,164 frames for depth, light and grade) and compared them with the author's own three.js film, "The Bridge". Only the general rules and numbers are taken here. The reference frames and contact sheets were not downloaded.

Files read in full: `references/reports/CONTEXT.md`, `motion.md`, `depth.md`, `lighting.md`, `grade.md`. Skimmed for how the rules were built: `templates/bridge/story.ts`, `lights.ts`, `grade.ts`, `lensblur.ts`, `Bridge.tsx` (`build.ts` only by name).

Our side: `D:/Personal/VideoHubWorkspace/films/02-pondy-grid/film.js` (the live shots are hook, foreshadow, contrast, ruler, guess, twist7, french, card7 and loop7, plus the transitions in `renderOut`), `timeline.js`, the rendered `02-pondy-grid_v1.mp4`, and `kit/style-sheet.md`.

**Units.** px/f means pixels moved per frame. Unless marked, the repo quotes px at 720p; multiply by 1.5 for our 1080x1920. %/f means scale change per frame.

**Evidence grades.**
- **[MEASURED]**: measured by the repo on the 20 reference Shorts.
- **[CANON]**: the 12 principles of animation, or classic painting and colour theory.
- **[PRACTITIONER]**: tutorials, forums or engineering docs.
- **[OPINION]**: the repo author's or my judgement call.
- **[UNVERIFIED]**: claimed with no data behind it.

---

## 1. Techniques found (numbers + where they are in the repo)

### 1.1 Camera (motion.md §2, story.ts lines 1-4 and 89-170)

| Technique | Number | Ref |
|---|---|---|
| The camera almost never stops | 65 % of frames move (≥ 2 px/f), 24 % drift (0.3-2 px/f), only 10 % fully still | motion.md 2.1 |
| Median camera speed | 3.6 px/f; p90 16.9 px/f | 2.1 |
| Moves per 10 s | 6.0 (range 2.9-8) | 2.1 |
| Shape of a move | Symmetric ease-in-out: about 10 f in and 10 f out, about 23 f in total. Median peak 13.7 px/f (p75 24.6, p90 36). 62 % symmetric, 18 % ease-out, 20 % ease-in | 2.1 |
| Easing curve used | Smootherstep `x³(x(6x−15)+10)`. Peak speed = 1.875 × distance / duration, so keep duration ≥ 0.075 × distance (in 720p px) | 5.1a, story.ts `glide` |
| Size of one move | 101 px and 23 % zoom on average | 2.1 |
| Big reframes | Cut them; do not fly. A move over half the frame width or over 40 % zoom becomes a cut | 5.1a |
| Push-in on "holds" | Even in quiet frames the camera zooms in 70 % of the time, and 83 % of that is pushing in. Rate median 0.14 %/f, p75 0.34, p90 0.70 | 2.1 |
| Push-in runs | 336 push-ins vs 180 pull-outs. Median 35 f long, +22 %, 0.61 %/f. Slow ones under 0.3 %/f last about 25 f and add +3.7 % | 2.1 |
| Punch push on key words | 0.6 %/f for about 35 f; base 0.15-0.35 %/f on every hold. Stop the push at an impact | 5.1b, story.ts `pushK(f, f0, rate, punch, n)` |
| Snap zoom | 0.4 → 5.9 %/f, +38 % in 14 f | 2.1 |
| Crane pull-back | Up to −4.6 %/f; about 45 f speeding up and 60 f slowing down | 2.1 |
| Roll (dutch) moves | 3.2 per 10 s, median 3.6° over 18 f (p75 8.1°, p90 17.5°). Emphasis keys ±3.6-8°, glided over ≥ 18 f. Note that depth.md counts a held dutch tilt in only 2 % of frames: rolls are moves, not held tilts | 2.1, 5.1b, depth.md 4.1 |
| Hand-held float | **None** (high-frequency residual 0.08 px). The repo deleted its sine float | 2.1 |
| Impact shake | Offset **flips sign every frame**, about 3 px at 720p (about 5 px/f), roll ±0.1-0.35°, gone in 6-8 f, decay `(1−n/7)^1.5`. The push-in stops on the hit | 2.1, 5.1c `kickAt` |
| Whip pans | Rare: 0.45 per minute. 45-93 px/f for 7-25 f, 2-3 f ramp up and down, always with **strong directional motion blur**. Rule: no whip without blur | 2.1, 5.4 |
| Transition blur pulse | Whole-frame blur (σ 3.6-5 at 720p) for 0.3-1 s at some cuts | depth.md 1.5 |
| Crowds | Formations stand still while the camera supplies the motion | 2.1 |

**Shot mix and framing** (depth.md §4):
- Shot shares: CU 3 %, MS 27 %, FS 28 %, WS 12 %, EWS 8 %, inserts 22 %.
- Head top sits at y = 0.28 (CU), 0.35 (MS), 0.38 (FS) and 0.50 (WS) of frame height. The horizon sits at 0.45.
- Camera height is about 0.79 × character height; 82 % of shots are at eye level.
- A foreground object frames 38-39 % of MS/CU shots.

### 1.2 Character motion (motion.md §3)

| Technique | Number |
|---|---|
| Drawing rate | Moving characters are animated **on ones** (a new pose every frame). Holds are pixel-still |
| Walk | 9-12 f per step (2.5-3.3 steps/s). Body bob 3-7 % of height, lowest at contact. Lean swings from 1° at passing to 5-7° at contact. The stance foot is **planted** (no skating) and has a soft blue-grey contact shadow |
| Idle in holds | **None.** Background extras are frozen except on cue. The only "idle" is an acting beat, e.g. a head loll of 12° in 9 f, hold 20 f, back in 9 f |
| Blinks | Every 0.5-2.3 s, 4 frames shaped half / shut / shut / half, plus a blink across every expression change |
| Reaction timing | An expression or action change lands **0-3 f before** the word starts. Swaps take 1 frame |
| Anticipation | Jump: 2-3 f crouch. Strike: 3 f to lower, about 6 f held back, a **1-frame** thrust on the word, a 4-5 f flash/ring. No overshoot frames |
| Squash/stretch, smears, line boil | **None measured** |
| Turns | 1-4 f |

### 1.3 Depth (depth.md)

| Technique | Number |
|---|---|
| Background blur (DOF) | On in about **1/3 of shots**, mostly intimate CU/MS beats, inserts and foreground-framed shots; off for establishing shots. When on, background σ at 720p is CU 4.2, MS 4.0, FS 2.7, WS 1.9. Blur radius at 1080p ≈ 3 × σ720, so about **12 px (CU/MS), 8 px (FS), 6 px (WS)** |
| Foreground blur | 20 % of frames have a near foreground object, blurred to σ720 3.7-7.8 (about 11-23 px radius at 1080p), covering 10-25 % of a frame edge |
| Sharp baseline | Line work is crisp (σ 0.33), so blur is a deliberate per-shot choice |
| No rack focus inside shots | DOF changes only at cuts or ramps with camera moves |
| Blur saturates | Blur reaches its maximum within about 3× the focus distance, then stays flat |
| Aerial perspective (haze) | Skyline objects are pulled about **40 % toward the horizon colour**; their darkest pixels lift to about 15 % of the horizon colour. Near objects keep full colour |
| Sky gradient (day) | Pale horizon #9fb6e6, deep upper blue #5e93d9; horizon/top luminance 1.28; full depth by about 20° elevation |
| Sky gradient (golden) | Horizon #ffd18a, top mauve #9a7e7f; ratio 1.55 |
| Glow | Only emitters glow (sun, lamp, fire, moon): halo e-fold 21-31 px at 1080p (about 1.5 % of frame height), +0.25-0.5 of (source − background) at the edge. **White faces and white surfaces never glow**; their edges are the crispest |

### 1.4 Lighting (lighting.md)

| Technique | Number |
|---|---|
| Day shadow on the same surface | Shade ≈ **0.5 × lit** brightness (Y ratio 0.49-0.52), keeping the surface's own hue and slightly **more** saturation (warm on wood, green on grass; bluish only on grey metal) |
| Sunset shadow | A painted **violet-blue** replacement colour, blue channel 1.35-3× the lit blue, e.g. orange sand #db9044 → shadow #5b5173 |
| Key direction | Day: side or side-back key (about 50-70° from the view axis) or soft frontal. Sunset: 10 of 15 frames **backlit**, sun ahead at 3-15° elevation, long shadows toward the camera |
| Shadow edges | In focus they stay crisp, 3-12 px at 720p; very soft shadows only appear in DOF-blurred foreground |
| Contact | No ambient-occlusion grime. Contact = ink line + a soft **blob shadow** under each character (multiply about 0.6, edge 3-12 px), offset away from the sun |
| Heads | Stay bright (V ≥ 0.86 always), take the scene light colour as a tint, have a soft side gradient of about **14 %** toward the key and a slightly brighter top (about 11 %), plus a lavender-tinted crescent on the shadow side. **No rim line** (rim 1.02-1.04 ≈ none) |
| Specular | Metal only, one soft highlight |
| Haze colours | Day distance blue/lavender (#94cefe, #a7a3af); sunset pink/peach (#db9594, #d1a57c); night fog violet #877aea |

### 1.5 Colour grade (grade.md)

| Technique | Ref day | Ref night | Ref interior |
|---|---|---|---|
| Median luma Y' | 0.571 | 0.243 | 0.448 |
| p99 (near-whites) | 0.967 | 0.817 | 0.942 |
| Non-ink p5 (how dark the darks get) | 0.234 | 0.088 | 0.129 |
| Black point RGB (darkest 0.5 %) | 35,19,20 (warm, lifted) | 9,10,38 (blue) | 23,12,20 |
| Lit chroma C* p50 / p90 | 34 / 55 | 37 / 64 | 28 / 55 |
| Vignette corner/centre | 0.86 (k 0.06-0.10, start r 0.45-0.50) | 0.46 | 0.67 |

Other grade numbers:
- **Golden:** corner/centre 0.75 (k 0.11-0.16).
- **"Targeted" colour:** about 2.5 % of pixels are ink. There are no black areas: dark materials are coloured darks at L* 16-22 (navy #262c51, aubergine #2e2439, plum #3d2530, oxblood #4d2725).
- **Hue mix (day):** orange about 38 % and azure about 27 %, with small accents of red 9 %, chartreuse 7 % and cyan 5 %. It works as one warm/cool pair plus accents.
- **Golden needs both families:** about 20 % red/rose and about 17 % blue/violet. A grade cannot add hues that the scene does not contain.
- **Lit paint targets (day):** red #e85648, wood/orange #e3b684, yellow #d3c677, green #7fbc4e / #5ab04c, azure #93c6f9.
- **Fitted grade:** curve y at x = 0, .1, .25, .5, .75, .9, 1 = 0.035, 0.183, 0.381, 0.661, 0.881, 0.963, 1. Saturation shadows / mids / highlights 0.98 / 1.27 / 1.46. Warm-red shadow tint (+16, −4, −14)/255. Vignette k 0.10, r0 0.45. Golden needs violet shadow and mid tints and k 0.16.
- **No film grain** was measured.

### 1.6 Per-frame "liveliness" rules, condensed
1. The camera is always moving slightly (a push-in), never floating.
2. Characters hold still unless they are acting, and the acting lands 0-3 f before the word.
3. Blinks are frequent (every 0.5-2.3 s) and shaped over 4 frames.
4. Background people are frozen; the camera supplies motion.

---

## 2. Validation

| Claim | Grade | Comment |
|---|---|---|
| Moves ease in and out symmetrically (~23 f) | **[MEASURED] + [CANON]** | This is "slow in and slow out" from the 12 principles: more drawings near the ends of a move, fewer in the middle ([animation principles overview](https://www.bloopanimation.com/the-12-principles-of-animation/), [Animaker](https://www.animaker.com/hub/?p=7967)). The repo also corrected its own earlier "ease-out burst" rule after better measurement, which is a good sign of honesty. |
| Camera is almost never still; constant slow push-in | **[MEASURED] + [PRACTITIONER]** | A Zack D.-style community post says the camera "is almost always moving" ([Skool 3D Shortcut](https://www.skool.com/the-3d-shortcut-6963)). Tutorials add zoom-ins and screen shakes in the edit ([Recapio digest](https://recapio.com/digest/how-to-make-zackdfilms-videos-with-ai-by-gentvid)). Our own style sheet §3b already says "slow push-in or parallax". There is no retention A/B data; this is a craft norm. |
| Big reframes should be cuts; whips need blur | **[MEASURED]** + **[CANON]** (motion blur hides strobing) | The repo's own film looked "cheap" partly from 79-488 px/f un-blurred moves. |
| Impact shake = 7-frame sign-flipping kick, not a sine wobble | **[MEASURED]** | Measured on one reference impact (v14 spear) plus our camera-code comparison. Treat the exact numbers as one example (thin n), the pattern as solid. |
| No hand-held float | **[MEASURED]** for this one channel | It is a style choice, not a law. |
| No squash/stretch, no idle loops | **[MEASURED]** for this channel; **contradicts [CANON]** | The 12 principles list squash/stretch (keeping volume constant) and secondary action. The reference gets weight from real 3D bodies and constant camera motion instead. For a **soft-clay 2D** look, light squash on landings and pops is canon and fits "soft toy". Use it sparingly and keep volume. |
| Anticipation: hold, then 1-frame strike on the word | **[MEASURED] (n = 2 actions) + [CANON]** | Anticipation is one of the 12 principles. The held wind-up is this channel's flavour. |
| Blinks every 0.5-2.3 s, 4-frame shape | **[MEASURED]** | Faster than real humans (who blink about every 3-4 s); a stylised "alive" cue. |
| Reactions 0-3 f before the word | **[MEASURED]** (4 cases) | Matches the common animation practice of leading sound slightly. |
| DOF on about 1/3 of shots; background σ 2-4 | **[MEASURED]** | Strong method (edge-spread fits, validated on synthetic edges). |
| Aerial perspective: far things pulled toward the horizon colour | **[MEASURED] + [CANON]** | This is classic aerial perspective: distant objects lose contrast and chroma and shift toward the air/sky colour ([Eclectic Light](https://eclecticlight.co/2015/04/23/making-space-4-aerial-perspective/), [Hanover College](https://psychlab1.hanover.edu/KRANTZ/art/aerial.html), [NPN](https://www.naturephotographers.network/articles/how-to-create-three-dimensionality-in-your-landscape-photos-video/)). |
| Shadows keep hue and gain saturation; sunset shadows violet | **[MEASURED] + [CANON]** | Painters' "chromatic dark": darken with the complement, not black; warm light gives cool shadows ([Zoung Y](https://zoungyart.substack.com/p/gouache-and-the-illusion-of-light), [artstudiolife](https://artstudiolife.com/full-guide-on-color-and-the-effect-of-light-on-color/)). Todd Casey warns it is a tendency, not a law ([Realism Today](https://realismtoday.com/color-rules-that-arent-true/)). |
| No rim light | **[MEASURED]** | **Conflicts with our style sheet**, which asks for "soft rim lighting". Our prefix was written for AI stills, not measured. Rim is optional, so keep it subtle if we want it as identity **[OPINION]**. |
| Glow only on emitters; white surfaces stay crisp | **[MEASURED]** | Good guard against "bloom everything". |
| Grade numbers (curve, lifted warm blacks, vignette 0.86) | **[MEASURED]** | Fitted to day/golden/night/interior clusters across 13-20 videos. Every video agreed on the direction; the sizes varied. |
| Tilt-shift top/bottom blur makes a scene read as a miniature | **[CANON-ish research, from memory]** | Held, Cooper, O'Brien & Banks (2010, ACM Transactions on Graphics) showed that blur gradients change perceived scale. I did not re-fetch the paper this session, so treat it as **[UNVERIFIED citation]**, though the effect is widely used. |
| `ctx.filter = 'blur()'` is cheap enough per frame | **[PRACTITIONER]** | Fast in Chrome (GPU). Reported 28x slower in Firefox and unreliable on Safari OffscreenCanvas. Best practice: blur once into a cached offscreen layer ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter), [web.dev](https://web.dev/articles/canvas-performance), [Mozilla bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1978851), [DEV](https://dev.to/shaishav_patel_271fdcd61a/three-canvas-blur-effects-without-a-library-gaussian-convolution-pixelate-and-css-backdrop-blur-2adf)). VideoHub renders in Chromium, so this is fine for us. |

**Caveats on the repo.**
- It studies one channel (3D, Zack D.-like), so the numbers describe that look, not "what wins".
- No retention data connects any of these numbers to performance.
- Its own film was computed from code, not rendered, for the motion comparison.
- The shipped `lights.ts` values differ from the report's first guesses (day `shade` 0.30 in the code vs 0.80 in the report), because they were re-tuned on renders. Use the report's **targets**, not its first parameter guesses.

---

## 3. Gap vs our ep 02 (film.js as of 2026-11-13)

I measured the ep 02 camera from the code (same idea as the repo's `ourcam.py`, by hand). Tone came from `ffmpeg signalstats` on 20 frames of `02-pondy-grid_v1.mp4` (one every 2 s, captions not masked, so treat it as rough).

### 3.1 Camera

| Shot (length) | What the camera does now | Reference norm | Gap |
|---|---|---|---|
| hook (3.6 s) | Tracks the scooter at 480 world px/s × scale 2.1 ≈ 34 px/f at 1080p (22 at 720p), steady. Plus a **sine roll ±1.4° at 0.38 Hz** (`Math.sin(s*2.4)*0.025`) | Tracking at about 22 px/f is within the p75. No float | The roll wobble is exactly the "hand-held float" the reference does not have. It reads as seasick, not alive. |
| foreshadow (5.0 s) | Pull-out 1.25→1.0 in 0.9 s (cubic in-out: average 0.9 %/f, peak about 2.8 %/f), then the map pushes +6 % over 1.2 s (about 0.17 %/f) | Push-in 0.14 %/f; strong moves ≤ ~1 %/f | The opening pull-out is a fast reframe, between a glide and a snap. Acceptable as a transition, but it is a pull-out where the reference prefers push-ins. |
| contrast (4.5 s) | **No camera move at all**; only the split wipe on "ஆனா" | The camera keeps moving on 90 % of frames | 4.5 s dead-still camera |
| ruler (4.6 s) | +5 % over 4.6 s, eased: about **0.036 %/f** | 0.14 %/f median, 0.15-0.35 base | **4x too slow**, so it reads as static |
| guess (3.9 s) | `shot3` +6 % linear over 3 s (0.067 %/f), then **stops for the last 0.9 s** | 0.14 %/f, continuous | Half speed, then a dead tail |
| twist (6.9 s) | Static for about 4.7 s (only the ship moves), then **+25 % in 0.6 s (18 f)** on "Dutch", peak about 4 %/f, plus a white flash 0.25 s at 0.6 | Snap zoom +38 % in 14 f exists in the reference | The snap is on-grammar. The 4.7 s of static camera before it is not; the 6.9 s shot needs a slow push to build to the snap. |
| french (4.1 s) | +4 % over 4.1 s ≈ **0.032 %/f** | 0.14 | 4x too slow |
| card (3.0 s) | Static; the panels "breathe" ±0.8 % at 0.5 Hz | Cards are graphics; a slow push still helps | Small gap. The breathing is an idle loop the reference does not use. |
| loop (3.4 s) | Scale 3.2 → 2.1 (−34 %) eased over 3.4 s (about 0.3 %/f average) plus a 260 px drift, landing on the hook's first frame | Crane pull-back up to 4.6 %/f exists | Fine. A good seamless-loop crane. |

**Transitions** (`renderOut`):
- **Whip** (contrast, guess):
  - It is 0.22 s = 6.6 f to cross 1080 px, with a cubic ease. That gives a peak of about 490 px/f at 1080p (about 330 at 720p).
  - The reference whips run at 45-93 px/f at 720p over 7-25 f.
  - So ours is **3.5-7x faster and too short**. The "blur" is 3 ghost copies at 0.35 alpha, offset ±50 px, which reads as a double image, not a smear.
- **Cut punch-in:** on every hard cut (5 of 8 transitions), the frame starts 7 % zoomed and settles in 5.4 f (out3; first-frame rate about 3.9 %/f).
  - The reference measures plain cuts, plus blur pulses at some cuts. It never shows a zoom kick on every cut.
  - Used on every cut, the punch stops meaning "impact". **[MEASURED] gap / [OPINION] severity medium.**
- **Fade** into card: 0.25 s. Fine.

**Impacts:** there is no camera kick anywhere. The twist reveal uses a white flash only. The reference pairs a flash with a 7-frame sign-flip kick, and the push stops on the hit.

**Counts:**
- Our 39 s has about 7 deliberate camera moves, about 1.8 per 10 s. The reference has 6 per 10 s.
- About 15 s of the film (contrast, twist pre-reveal, card, guess tail) has a still camera, about 38 % of runtime. The reference has 10 %.

### 3.2 Character motion

In the live ep 02 shots the only on-screen characters are the tourists in `guess` (`body()` + `touristHead()`), the tiny top-down scooter in hook/loop, and the hammering builders on the map (`builder()` inside `oldMap`). Mani's `head()` / `scooter()` / `maniStand()` appear only in shots that are **not in DRAW** for v7: `lost`, `split`, `phone` (and `dutch`, `mapzoom`, `canalShot`, `sides` are also unused). The notes below still matter because those helpers will come back in later episodes.

| Item | Ours | Reference / canon | Gap |
|---|---|---|---|
| Idle loops | `body()` arm sway ±2° at 0.27 Hz, always on. `touristHead()` nods (bob 20 % of head radius at 0.67 Hz), always on, for every tourist | Extras frozen except on cue [MEASURED]; a subtle "moving hold" is acceptable [CANON] | Constant nodding is busy and not tied to the words. Nod **on** "எல்லாரும் French-னு" (t ≈ 20.2-21.7 s) and freeze otherwise. |
| Blink | `head()`: every **3.3 s**, 0.09 s (**2.7 f**), one shut state. All characters blink on the **same frame** (pure function of t, no per-character phase) | Every 0.5-2.3 s, 4 f half/shut/shut/half, plus a blink on every expression swap | 2-4x too rare, no in-between, characters blink in unison |
| Reaction lead | Twist rip starts exactly at the "Dutch" onset (`rip = clamp((s - rv)/0.35)`); the guess tag glow starts at `fr - 0.1` (3 f early, good) | 0-3 f before the word | Twist rip should start about 2 f early |
| Anticipation | None. Tags, stamps, the "?" seal and houses pop straight in with `back()` | Hold, then strike; a 2-3 f crouch before a jump [MEASURED + CANON] | No wind-ups. The twist patch-rip is the obvious place. |
| Overshoot | `back()` with c = 1.9 gives a **12 % overshoot** on every pop | No overshoot on character actions [MEASURED]; overshoot / follow-through on graphics is [CANON] in motion design | OK for titles and graphics. Do not use it on character acting. |
| Squash/stretch | None | None in the reference; canon in 2D | Optional. Fits the clay look on landings and stamp hits only. |
| Motivated secondary motion | Ship bob 4 px at 0.35 Hz + ±3° rock; sea waves; flag ripple; builder hammer at 1.4 Hz | Motivated motion is fine (water bob kept in the repo) | Good, keep |
| Walk | None in v7 (the scooter glides; there are no walkers) | 9-12 f steps, 3-7 % bob, planted feet | n/a this episode; note it for future walks |

### 3.3 Depth

| Item | Ours | Gap |
|---|---|---|
| DOF / background blur | **None anywhere**. Every layer is equally sharp | The reference blurs about 1/3 of shots. Our style sheet also promises "shallow depth of field". This is the single biggest visual gap against our own style sheet. |
| Foreground framing | None (the guess railing is mid-ground) | The reference has a foreground object in 38 % of MS/CU shots |
| Parallax | All push-ins scale every layer together around one point (`g.scale(pk)` over the whole shot), so there is no parallax | Layered push-in = depth for free (style sheet §3b names it) |
| Haze / aerial perspective | None. The guess sea and sky are full-saturation gradients; the top-down town is one flat plane | Far layers should be pulled toward the horizon colour |
| Contact / drop shadows | `soft()` drop shadow on almost every object (blur 10-24, offset y 5-10, rgba(25,18,35,0.22-0.4)); ellipse ground shadows under bodies and the scooter | **Good.** This is our "clay lift" and it matches the reference's soft blob contact |

### 3.4 Lighting

| Item | Ours | Gap |
|---|---|---|
| Key direction | `clayFill` = light top, darker bottom (vertical gradient, +20 % / −18 %). `head()` radial highlight upper-left (−0.35r, −0.4r). `soft()` shadows fall straight down | Two key directions disagree: heads say upper-left, shadows say overhead. Pick one key, e.g. upper-left, and offset shadows to the lower-right (offset x of about +0.5 × offset y). |
| Shadow colour | `shade(hex, −k)` mixes **toward black**, which lowers saturation. Drop shadows are a near-black violet at low alpha; house shadows are brown rgba(50,30,20,0.3) | The reference keeps hue and gains saturation in day shadows (≈ 0.5 × lit). Our darks go muddy and grey: the same failure the repo diagnosed in its own film |
| Head shading | Radial gradient +22 % → −20 % (about 40 % spread) | Stronger than the reference's 14 %, but fits a clay look. Keep |
| Rim light | None | The reference has none either. The style sheet asks for a "soft rim", so this is a decision, not a defect |
| Light colour per scene | Table shots have a warm pool of light (radial rgba(255,200,120,0.22) → black 0.4 edges). Card is indigo with a lighter centre | Good: the scenes are lit as places. Map/town shots have no light direction at all (flat) |
| Glow | Glowing grid lines and canal (`shadowBlur` 18-24, alpha-pulsed at about 1 Hz) | Fine as "emitters". Do not pulse continuously (idle loop); pulse once on the word |

### 3.5 Grade (from the render; luma converted from TV range, captions included)

| Shot group | Median-ish Y' | 10th pct | Max | Ref comparison |
|---|---|---|---|---|
| hook / guess / loop (day-like) | 0.64-0.71 | 0.40-0.43 | ~1.0 | Ref day p50 0.57: **we are brighter**, with no crushed blacks. OK |
| foreshadow / ruler / twist / french (wood table) | 0.43-0.47 | 0.17 | ~1.0 | Ref interior p50 0.45, p5 0.12: **matches** |
| card (indigo) | 0.20-0.23 | 0.15 | ~1.0 | Ref night p50 0.24, blue black point: **matches**; indigo is a coloured dark (good) |

So **tone is not our problem.** The remaining grade gaps:
1. **Vignette** only exists on the table shots (strong, black-edged: 0.4 black at the rim, about 0.6 corner/centre). The town/hook/guess shots have none. The reference day uses a light 0.86.
2. **Darks:** shadows go toward black instead of toward a coloured dark. Our palette already has the right "coloured dark": night indigo #1F2A44 (L* about 17, exactly the reference's 16-22 band).
3. **Accent lightness:** temple red #B23A2E (L* about 42) and leaf green #4C8C3A (L* about 52) are darker than the reference's **lit** red #e85648 (L* 56) and green #7fbc4e (L* about 70). Keep the brand hexes for stamps and text. Use lighter tints for sunlit surfaces.
4. **Hue pairing:** we already have the warm/cool pair (turmeric/table vs sea/indigo). Good. For any dusk/golden scene, add violet shadows and rose accents; do not go all-orange.

---

## 4. Recommended rules + 2D canvas implementation notes

Rules are ordered by impact against cost. All of them work inside `film.js`, stay pure functions of t, and add no libraries.

### R1. Every shot pushes in; no static camera. [MEASURED + PRACTITIONER]
- **Rule:**
  - Base push 0.15-0.35 %/f (5-10 % per second), linear or near-linear inside the shot (not eased to zero at both ends).
  - Punch words get 0.6 %/f for about 35 f.
  - The push stops dead on an impact frame.
- **Canvas:** add one helper and call it in every shot:

```js
// scale after s seconds: base rate r per frame, optional punch window [p0, p0 + 35 f] at 0.6 %/f with 8 f soft edges
function pushK(s, r = 0.0025, p0 = -1) {
  const f = s * 30; let k = (1 + r) ** f;
  if (p0 >= 0) { const pf = clamp((f - p0 * 30) / 35); k *= 1 + 0.006 * 35 * pf * pf * (3 - 2 * pf); }   // +21 % over the punch
  return k;
}
```

- **Where:**
  - `contrast`: add `pushK` around both halves.
  - `ruler` / `french`: replace `1 + 0.05*ease(s/d)` with `pushK(s, 0.002)`.
  - `guess`: in `shot3`, replace `clamp(s/3)` with a continuous push.
  - `twist7`: `pushK(s, 0.0015)` up to the snap, then the existing +25 % snap.
  - `card7`: `pushK(s, 0.0015)` instead of the breathing.
- **TOKEN CUT:** it is one helper plus a one-line swap per shot; no new structure.

### R2. Delete the hook's sine roll; use rolls as moves. [MEASURED]
- **Rule:**
  - No continuous float or wobble.
  - Use at most 1-2 roll moves per film, 3-8° glided over ≥ 18 f, on emphasis words (e.g. "ஆனா" in contrast, "Dutch" in twist).
- **Canvas:** in `hook()` set the `cam2d(..., rot)` argument to 0. For an emphasis roll, use `rot = deg2rad(4) * glide(clamp((s - w0 + 0.3) / 0.6))`.

### R3. Glide curve = smootherstep, sized by distance. [MEASURED + CANON]
- **Rule:**
  - Duration ≥ 0.075 × distance (720p px), i.e. ≥ 0.05 × distance in our 1080p px.
  - Moves up to half a frame width glide over 18-40 f.
  - Anything bigger is a cut.
- **Canvas:** `const glide = x => { x = clamp(x); return x*x*x*(x*(6*x-15)+10); };`. Our cubic `ease` is already symmetric and nearly the same; switch only where a move feels snappy.

### R4. Whips: slower, real directional blur, at most 1-2 per film. [MEASURED]
- **Rule:**
  - 10-15 f (0.35-0.5 s) instead of 6.6 f.
  - Peak ≤ about 140 px/f at 1080p.
  - 2-3 f ramps.
  - Always smeared.
- **Canvas (running-average motion blur, exact equal weights):** for each output frame, draw the two-shot composite N = 10 times at sub-positions spanning half the frame-to-frame motion, with `globalAlpha = 1/(i+1)` for the i-th copy:

```js
const N = 10, v = (posAt(k + 1/(D*30)) - posAt(k)) * 0.5;   // half-shutter, px
for (let i = 0; i < N; i++) { m.globalAlpha = 1 / (i + 1); drawPair(x0 + v * (i / (N - 1) - 0.5)); }
m.globalAlpha = 1;
```

- This replaces the 3 ghost copies at 0.35. The cost is 10 drawImage calls on whip frames only.

### R5. Impact = 7-frame sign-flip kick + flash; drop the punch-in on ordinary cuts. [MEASURED]
- **Rule:**
  - On a real hit (twist "Dutch" rip, verdict stamp slam, French cross slam), offset the frame about 4.5 px × gain at 1080p, flipping sign every frame, decaying `(1 − n/7)^1.5`, plus roll ±0.23° × gain.
  - Keep the white flash.
  - Ordinary cuts are plain. Keep the 7 % punch only on 1-2 beat cuts.
- **Canvas:** in `drawInto`, after `setTransform`:

```js
const kickAt = t => { let a = 0; for (const [t0, gn] of KICKS) { const n = Math.round((t - t0) * 30); if (n >= 0 && n < 7) a += gn * (n % 2 ? -1 : 1) * (1 - n / 7) ** 1.5; } return a; };
// a = kickAt(globalT); g.translate(W/2 + 4.5*a, H/2 + 2.7*a); g.rotate(a * 0.004); g.scale(1.01, 1.01); g.translate(-W/2, -H/2);
```

- The 1 % overscale hides the exposed edge.
- `KICKS` lists `[t0, gain]` taken from `timeline.js` word onsets, e.g. `[wordT('Dutch') - 2/30, 1]`.

### R6. Parallax push-ins: each layer scales at its own rate. [CANON + PRACTITIONER, style sheet §3b]
- **Rule:**
  - Background layer 0.4x, mid 1x, foreground 1.6x the base push rate, all about one focus point.
  - Add a 3-6 % lateral offset difference on moves.
- **Canvas:** `shot3` already draws in layer order (sky, sea, sand, railing, tourists). Wrap each layer in its own `save/scale(pushK(s, r * depthMul))/restore` instead of one scale for the whole shot.
- Cheapest win in the guess shot; it also applies to any future eye-level street (`street()` already has z-depth, so use `1/z`).

### R7. Background blur on about 1/3 of shots, via cached layers. [MEASURED + style sheet]
- **Rule:**
  - CU/MS character beats: background blur about 12 px at 1080p.
  - Full shots: about 8 px.
  - Wides, maps and graphics: 0.
  - Foreground objects: 15-24 px.
  - Never pull focus inside a shot.
  - Characters and text stay crisp.
- **Canvas:**
  - Draw the background layer once into an offscreen canvas.
  - Apply `ctx.filter = 'blur(12px)'` when copying it to the frame.
  - Cache the blurred result if the layer is static (the sea/sky in `guess` is animated, so re-blur per frame; Chrome handles 12 px fine).
  - Reset `g.filter = 'none'` before the characters. The `drawInto` reset already exists.
- **Candidates in ep 02:** `guess` (blur sky + sea about 8 px, tourists sharp), `twist7` after the snap (blur the map edges, keep the ship sharp). Future Mani close-ups: blur the street.
- **Tilt-shift for top-down town shots (hook, loop):** draw the town once, then overlay the same town blurred 10-14 px, masked by a vertical gradient (sharp band y 0.38-0.62, blurred outside). It makes the clay town read as a miniature. **[UNVERIFIED citation, strong practice]**.
- **Caution:** Firefox and Safari are slow or broken with `ctx.filter`. VideoHub renders in Chromium, so this is OK.

### R8. Haze far layers toward the horizon colour. [MEASURED + CANON]
- **Rule:** the farthest layer is mixed 30-40 % toward the horizon/sky colour, and its darkest values are lifted about 15 %. Near layers keep full colour.
- **Canvas:** after drawing a far layer, `g.fillStyle = horizonCol; g.globalAlpha = 0.35; g.fillRect(...)` over that layer only (before mid layers are drawn).
- In `shot3`, the far sea band should be pulled toward the #F7E3B8 horizon; in a street, the far houses should be pulled toward the sky.

### R9. Coloured shadows: shade toward indigo or the hue's complement, never toward black. [MEASURED + CANON]
- **Rule:**
  - Day shadow ≈ 0.5 × lit brightness, same hue, slightly more saturated.
  - Contact/drop shadows use a coloured dark, not near-black.
  - At dusk/night, shadows go violet-blue.
- **Canvas:**
  - Change `shade(hex, k)` for k < 0 to mix toward night indigo `#1F2A44` instead of `[0,0,0]`. It is a one-line change: `m = k > 0 ? [255,255,255] : [31,42,68]`.
  - Change `soft()` shadowColor to rgba(31,42,68,a) (indigo) at the same alphas.
  - Re-check skin, which may turn slightly cool. If so, keep the warm skin shadow `shade(P.skin, ...)` toward a darker warm brown such as #3E2614.
  - **[OPINION]:** using our own indigo as the universal shadow tint also ties every scene to the palette.

### R10. One key light per shot. [CANON + MEASURED]
- **Rule:** choose a key side per shot, upper-left by default. Head highlight, `clayFill` and drop-shadow offsets all agree.
- Side gradient across heads and bodies about 14 % (heads) to 20-25 % (bodies) toward the key.
- **Canvas:**
  - `soft()` gets `ox = +0.6 * oy` so shadows fall to the lower-right.
  - `clayFill` can take an angle: a diagonal `createLinearGradient(x0, y0, x1, y1)` from upper-left to lower-right instead of pure vertical.
- Optional rim (style sheet): a 2-4 px stroke of `shade(col, +0.35)` at 0.3 alpha on the edge **away** from the key. **[OPINION]**; the reference has none.

### R11. Light vignette on every non-card shot. [MEASURED]
- **Rule:** day/map shots k 0.06-0.10 from r 0.45 (corner/centre about 0.86). Table shots can keep their stronger pool. Cards are fine as they are.
- **Canvas:** one radial gradient over the full frame in `renderOut` before the captions (so captions are not darkened):

```js
const vg = g.createRadialGradient(W/2, H/2, H*0.45*0.707, W/2, H/2, H*0.707);
vg.addColorStop(0, 'rgba(31,42,68,0)'); vg.addColorStop(1, 'rgba(31,42,68,0.14)');
g.fillStyle = vg; g.fillRect(0, 0, W, H);
```

- Skip it on table shots, which already have a vignette.

### R12. Characters: still unless acting; frequent shaped blinks; act 2 f early. [MEASURED + CANON]
- **Idle:**
  - Delete the always-on `body()` sway and the `touristHead()` nod.
  - Replace them with cue windows taken from `timeline.js` words, e.g. tourists nod on "French-னு". Add a per-character phase so they never move in unison.
- **Blink:**
  - Gaps 0.5-2.3 s from a seeded `rnd`, per character.
  - Use a 4-frame lid sequence `[0.5, 1, 1, 0.5]`.
  - Force a blink across every expression change.
  - Add a half-lid drawing: an ellipse with a lid line.
- **Lead:** every action keyed to a word starts `2/30` s before its onset (`wordS(...) - 0.067`). This applies to the twist rip, the tag glows and the cross slam.
- **Anticipation on hits:** the twist patch tugs down 6 % over 3 f, holds 5-6 f, then rips in 1-2 f on the word. The stamp lifts 4 % for 3 f before slamming.
- **Squash/stretch (optional, clay identity) [CANON, not MEASURED]:** only on landings and stamp/pop impacts. Scale (1.12, 0.88) for 2 f, then (0.96, 1.04) for 2 f, then rest. Keep the product of the two scales ≈ 1 (volume). Never use it on talking or idle.
- **Overshoot:** keep `back()` for graphics and titles only.

### R13. Glow pulses once, on the word; no continuous pulsing. [MEASURED + OPINION]
- The grid/canal glow uses `0.6 + 0.4*sin(s*6)`, which is a 1 Hz loop. Replace it with one rise of 0.3 s on the word, a hold, then a fall.
- Keep the glow (shadowBlur 18-24 px ≈ the reference's 21-31 px e-fold), and only on things that "emit" (glowing lines, lamps), never on white text or faces.

---

## 5. Summary

### What the repo measured
On this one channel:
- The camera keeps moving on 90 % of frames: slow push-ins of about 0.14-0.35 %/f, symmetric glides of about 23 f, cuts instead of fast reframes, and 7-frame sign-flip kicks on impacts.
- Characters are frozen unless acting. Acting lands 0-3 f before the word, and blinks come every 0.5-2.3 s.
- Background blur is on about 1/3 of shots, with far haze.
- Shadows are coloured at about 0.5 × lit, violet at sunset. There is no rim light, and only emitters glow.
- The grade has lifted warm blacks and a light vignette of 0.86.

### Ep 02 gaps
- About 38 % of runtime has a still camera, and the remaining pushes run 4x slower than the reference.
- The hook has a seasick sine roll.
- Whips are 3.5-7x too fast with ghosting instead of blur.
- A punch-in sits on every cut, and there is no impact kick.
- There is no depth blur or parallax.
- Shadows mix toward black, and the key direction is inconsistent.
- Idle loops run always-on, and blinks are in unison.

### What is fine
- Tone and brightness match the reference clusters.
- Night indigo is already a correct "coloured dark".
- The drop-shadow "clay lift" and the motivated ship/sea motion work.

### Cheapest high-impact fixes
1. `pushK` on every shot (R1).
2. Delete the hook roll (R2).
3. Shade toward indigo (R9).
4. Kick + flash on the twist (R5).
5. Cached `ctx.filter` blur on backgrounds and tilt-shift on the town (R7).
6. Layered parallax in `guess` (R6).

## Sources
- Repo: https://github.com/mromidev/claude-animated-shorts (reports/motion.md, depth.md, lighting.md, grade.md; templates/bridge/*)
- [12 principles overview, Bloop Animation](https://www.bloopanimation.com/the-12-principles-of-animation/) · [Animaker](https://www.animaker.com/hub/?p=7967) · [Game Developer: 12 principles in games](https://www.gamedeveloper.com/production/the-12-principles-of-animation-in-video-games)
- [Skool 3D Shortcut (Zack D. style community)](https://www.skool.com/the-3d-shortcut-6963) · [Recapio: Zack D. Films style process](https://recapio.com/digest/animating-a-zack-d-films-style-youtube-short-complete-process-by-osasart) · [Recapio: AI workflow](https://recapio.com/digest/how-to-make-zackdfilms-videos-with-ai-by-gentvid)
- [Eclectic Light: aerial perspective](https://eclecticlight.co/2015/04/23/making-space-4-aerial-perspective/) · [Hanover College](https://psychlab1.hanover.edu/KRANTZ/art/aerial.html) · [Nature Photographers Network](https://www.naturephotographers.network/articles/how-to-create-three-dimensionality-in-your-landscape-photos-video/)
- [Zoung Y: chromatic darks](https://zoungyart.substack.com/p/gouache-and-the-illusion-of-light) · [artstudiolife: colour and light](https://artstudiolife.com/full-guide-on-color-and-the-effect-of-light-on-color/) · [Todd Casey, Realism Today](https://realismtoday.com/color-rules-that-arent-true/)
- [MDN ctx.filter](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) · [web.dev canvas performance](https://web.dev/articles/canvas-performance) · [Mozilla bug 1978851](https://bugzilla.mozilla.org/show_bug.cgi?id=1978851) · [DEV: canvas blur effects](https://dev.to/shaishav_patel_271fdcd61a/three-canvas-blur-effects-without-a-library-gaussian-convolution-pixelate-and-css-backdrop-blur-2adf)
- Held, Cooper, O'Brien & Banks (2010), "Using blur to affect perceived distance and size", ACM TOG (cited from memory, not re-fetched).
