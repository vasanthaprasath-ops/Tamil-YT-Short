# Characters, outlines, textures and readability: teardown of `mromidev/claude-animated-shorts`

Slice: character design and acting, ink outlines, textures / painted look, readability at phone size.
Repo: github.com/mromidev/claude-animated-shorts (MIT). It is a Claude skill that builds "2D cartoon cards in a painted 3D world" Shorts in three.js + Remotion. Its reports measure 20 Shorts from one top animated channel (720x1280, 30 fps).
Files read in full: `references/reports/CONTEXT.md`, `characters.md`, `outlines.md`, `textures.md`, `SKILL.md`. Skimmed: `templates/bridge/toon.ts`, `cast.ts`, `ink.ts`, `paint.ts`, `cardshade.ts`. The repo's copied reference frames and contact sheets were not downloaded.
Our side: `D:/Personal/VideoHubWorkspace/films/02-pondy-grid/film.js` (`head()` l.147, `body()` l.203, `maniStand()` l.225, `touristHead()` l.229, `scooter()` l.256, `shot8()` l.641) and `kit/style-sheet.md`.

Evidence grades used below:
- **[MEASURED-in-repo]**: the repo measured it on the 20 reference Shorts with scripts (pixel scans, contour fits). Treat it as real data for **one channel**, at 720p, with caveats.
- **[ANIMATION/DESIGN-CANON]**: standard practice in animation or character-design teaching (Disney principles, the silhouette test).
- **[RESEARCH]**: peer-reviewed perception research (cited at the end).
- **[PRACTITIONER-DATA]**: published numbers or experience from working artists or studios, not controlled studies.
- **[OPINION]**: the repo's or my judgement, with no data behind it.
- **[UNVERIFIED]**: claimed, but I could not check it.

Two caveats before the numbers:
1. **One channel, one look.** Every [MEASURED-in-repo] number describes how *that* channel draws: pale faces, stick limbs, deadpan humour. It shows what works for a top channel. It does not prove the look is *why* the channel works. The repo's own verifier scores reached only 6-7/10 against it.
2. **Measured and shipped values differ.** The outline report measured world ink at 3.4 px near-black `#0b0a0c`. After 4 verifier rounds the shipped `ink.ts` uses 5.1 px `#030303` (SKILL.md "Final look values"). So some of the final numbers were tuned by taste, not copied from the measurements.

---

## 1. Techniques found (with numbers and file refs)

### 1.1 Head shape (`characters.md` §1.1, §2.2; `toon.ts` `blobPts`, `headBlob`)

The repo's key finding: the reference heads are **not less round** than a circle. They look hand-drawn because of **taper, asymmetry and tilt**.

| Parameter | Reference median (front views, n=23) | What it means |
|---|---|---|
| Height / width | **0.93** (IQR 0.83-1.01) | slightly *wider* than tall |
| Crown exponent `nTop` | **1.70** (superellipse; <2 = slightly pointed crown) | top comes to a soft point |
| Jaw exponent `nBot` | **2.26** (>2 = fuller, squarer jaw) | full cheeks and jaw |
| Egg taper | **−0.125** | narrower at the chin |
| Side bulge `asym` | **+0.10** toward the side the face turns to | cheek/jaw bulge on the facing side |
| Tilt | about ±4° per character; 3/4 views up to **19°** | never dead upright |
| Contour wobble | **1.0 % of W** RMS | almost smooth; variety comes from shape, not noise |
| Eyes and mouth shift | **+0.08 W** toward the facing side | features slide with the turn |

Implementation in the repo: a superellipse with separate top/bottom exponents, an egg factor, a one-side bulge, and 0.8 % low-harmonic noise, seeded per character (`toon.ts` `blobPts`, 72-96 points). **[MEASURED-in-repo]**

### 1.2 Body proportions (`characters.md` §1.5, §2.1; `toon.ts` `BUILD`)

| | Reference adult median | Reference kids | Repo's build table |
|---|---|---|---|
| Total height | **3.5 head-heights (HH)** (3.3-3.7) | 2.7-3.0 HH | adult 3.5, stout 3.47, kid 2.85 |
| Chin to torso bottom | **1.1 HH** | 0.7-1.0 | adult 1.1 |
| Torso bottom to sole (legs) | **1.4 HH** | 1.0-1.15 | adult 1.4 |
| Torso width | **0.80 W** | 0.47-0.84 | 0.8 (stout 0.92) |
| Legs | **one ink stroke, 0.055 W**, no knees | | 5.8 % W |
| Arms | stroke **0.05 W**, no elbows or shoulders | | 5.2 % W |
| Hands | **filled ink dots, 0.11 W** | | r 5.5 % W |
| Feet | short strokes 0.15-0.25 W long, pointing out | | 16 % W long |
| Neck | none; head overlaps torso | | none |
| Torso shape | a **bean**: narrow top hidden under the head, widest at 60-70 % height, round bottom | | superellipse bean, `egg +0.12` |

Kid heads are almost adult size; only the body shrinks. **[MEASURED-in-repo]** (bodies read by eye from 15 gridded crops, ±3 % HH, so lower confidence than the head fits).

### 1.3 Faces and expressions (`characters.md` §1.4, §2.5; `toon.ts` `FACE`, `faceFront`)

All sizes as a fraction of head width W.

| Feature | Reference |
|---|---|
| Eye spacing, centre to centre | **0.26 W** (0.19-0.28) |
| Default eye | **lidded half-disc** (a flat lid line 0.18 W with a dark half-disc under it) = deadpan look. Also dashes and vertical oval dots 0.09 × 0.13 W |
| Shock eyes | **white circles 0.21-0.24 W, almost touching** (gap 0.02 W), tiny pupils 0.06 W |
| Brows | **0.17-0.18 W long × 0.045-0.055 W thick, tapered**, at **−0.20 W** above centre (0.18-0.24 W above the eyes). Often one brow higher (skeptical) |
| Mouth | at **+0.19 W** below centre, shifted to the facing side. Neutral = short dash **0.09-0.14 W**, often tilted. Grin 0.22-0.42 W with a white teeth box. O-mouth 0.2 × 0.26 W |
| Nose / ears | **none** in front view; a small nose tick only in 3/4 or side view |
| Blush | **0 of ~40 faces** |
| Eye catchlights | **0 of ~40 faces** |
| Face fill brightness | median luma **0.93** (most reference characters are pale) |
| Face shading | soft crescent away from the light: flat to 0.6 R, then down to **0.88×** by 0.8 R. Shadow tint is lavender on white faces, warm on skin `×(0.96, 0.86, 0.84)` |

The repo ships **14 expressions** (`FACE` table): neutral, stern, grin, laugh, whistle, nervous, shock, relief, relief_open, dazed, pained, smile, smile_closed, lick. Each is just three choices: an eye type (10 kinds), a brow pair given as `[inner, outer]` offsets in units of 1 % W (e.g. stern `[+3, −2]` = V-brow, worried `[−3, +2]`), and a mouth type (12 kinds). **Brows carry most of the emotion**: the same lidded eyes read as neutral or stern depending only on the brows. **[MEASURED-in-repo]** for the sizes. The table itself is **[OPINION]**, the repo's own design.

### 1.4 Acting and reacting to story beats (`cast.ts` "life: blinks and reaction timing"; SKILL.md)

- **Expression and action changes land 0-3 frames *before* the word** that triggers them (`LEAD = 2/FPS`). **[MEASURED-in-repo]**, stated as a measurement in the code comment, though no report table backs it.
- **Blink across every expression swap.** The two shut frames hide the face change, so it doesn't pop. **[OPINION]**: a classic animation trick, and the repo's choice.
- Blinks: **gaps 0.5-2.3 s, random per character**, each a 4-frame cycle: half, shut, shut, half. **[MEASURED-in-repo]**
- Poses: torso lean 3-8°, head tilt ±5°, one arm busy (pointing or holding) while the other hangs, feet turned out, **never mirror-symmetric**. Walk bob 3-7 %, lean 1-7°, planted feet. **[MEASURED-in-repo]**
- Every hold creeps (push-in 0.15-0.35 %/frame, 0.6 %/f on punch words); a still hold of 12 or more frames reads as a freeze. **[MEASURED-in-repo]** (the camera report; repeated in SKILL.md)
- Ground contact: a soft dark blob under the feet, about **0.5 W × 0.06 W at alpha 0.3**, blue-violet. Without it characters float. **[MEASURED-in-repo]** + verifier feedback.

### 1.5 Character outlines (`characters.md` §1.2, §2.3; `toon.ts` `inkRing`)

| | Reference |
|---|---|
| Outline width | **5 % of head width** (IQR 4.8-6.9 %); about **4.6 px at 1080p** on screen (`outlines.md` table) |
| Thick/thin ratio around one head | **≈3:1** (p90/p10 2.9-3.5) |
| Where it is thick | the **bottom and shadow side**: thickest point at a median of **64°** (lower right under upper-left light); top-right is only 0.65× the average |
| Colour | **dark plum `#201628`-`#2f1d28`**, not black. It turns warm brown under orange light |
| Inner lines (brows, mouth) | 0.6-0.9× the outline |
| Clothing seams, pockets | ≈0.4× the outline |
| Formula used | `w(θ) = w0·(1 + 0.45·cos(θ − θthick))`, w0 = 5 % W; draws a ring that runs from 6.5 to 17 units |

**[MEASURED-in-repo]**

### 1.6 World outlines (`outlines.md`; `ink.ts`)

- **74 % of the geometry edges scanned carry a line** (36 of 49). The lines sit on silhouettes, depth jumps, convex corners and contact lines (object meets floor).
- **No line** on wall/floor joins, baseboards or the sea horizon.
- Width about **3 px at 1080p** and **nearly constant on screen** with distance (3.4 → 2.2 px from near to far). The lines don't scale with perspective, and they blur with the depth of field.
- **Characters are never outlined twice.** The world ink never draws around character cards.
- Painted texture lines (plank seams, mortar) are **0.7-0.9× the ink width and half its contrast**, so surfaces never compete with silhouettes.

**[MEASURED-in-repo]** (66 reference scans). This is mostly a 3D post-process problem, so it matters less for our 2D canvas. The rules that do transfer are "constant screen width", "lighter and thinner lines inside shapes than on their silhouettes" and "no double outlines".

### 1.7 Textures and the painted look (`textures.md`; `paint.ts`; SKILL.md)

- Surfaces are **a few flat colour fields with a gentle broad drift**, plus thin dark painted lines. **No photographic grain.**
- Faces: residual noise is at JPEG level, so **no texture on faces**.
- **Film grain off.** The reference measures none, and 2.5 % grain made the 2K file 910 MB instead of about 250 MB. The repo predicts it will "turn to mush on YouTube" **[UNVERIFIED]**.
- Grain on characters is allowed **at most 2 %**, default off.
- Torsos are shaded far more than faces: **1.0 → 0.55-0.66** from the lit side to the shadow side, as a smooth gradient. About half also have a thin light rim inside the shadow edge.
- No blacks in the picture: the darkest non-ink tones stay at **L\* ≥ 19**. Day median luma is about 0.57.
- Painted lines are 3-5 px at 1080p and coloured as a dark *tint* of the surface (×0.35-0.45), not black.

**[MEASURED-in-repo]**

### 1.8 Colour count per character

- Clothing detail: **at most about 5 elements per torso** (buttons, pocket, belt, tie, collar, stripes), drawn as flat fills with thin inner lines. **[MEASURED-in-repo]**
- The repo's outfits use about **6-9 fills** per character, counting skin, ink, jacket, trousers, feet, hat, one accent and buttons (`toon.ts` `RIFLEMAN`, `KID`). **[OPINION]** (counted from the code, not measured).

### 1.9 Readability traps (SKILL.md "Readability traps the verifier caught")

All of these are **[PRACTITIONER-DATA]**: the repo's verifier flagged them on real renders.
- A prop drawn ambiguously reads as something else. One rope disappearing behind a kid read as **a hanging**; the fix was two ropes to a wide plank.
- Props closer than about 2 m to the lens become **huge cut-off blobs**. A foreground bush cut by the frame edge read as a "green ball". **A foreground prop must be recognisable or gone.**
- A flag's colours can read as the wrong country.
- Signs lit from the side go grey and unreadable, so they need flat (unlit) colour.
- An offset outer rim light turns hats into "picture frames". Use an inner rim on the head and torso only.
- A rail at chest height reads as cutting through a torso. Frame it so lines cross legs, not bodies.
- Flat holds of 12 or more frames read as freezes.

### 1.10 Cast size per scene

**Not measured** in this repo for my slice. The bridge short used crowds of up to 74 soldiers, but nothing measures how many characters a reference frame holds. Our style sheet already says "default to single-character frames".

---

## 2. Validation against outside evidence

| Technique | Grade | Outside support or contradiction |
|---|---|---|
| Faces and people get looked at first | [RESEARCH] | Faces bias eye movements within the first two fixations, with over 80 % of first fixations landing on faces within about 500 ms; a preference for human figures shows even in 200 ms glimpses. CG faces are scanned in the same eyes-nose-mouth pattern as photos. **Supports "the face is the 0.5 s read".** A video study found no fixed preference for the eyes: gaze moves between eyes and mouth depending on what is needed. So **both** eyes/brows and mouth must carry the expression. |
| Big, simple expressions read at a distance; subtle ones don't | [RESEARCH] | Smith & Schyns 2009: some expressions work as long-distance signals (low spatial frequency) and others only up close. Later work: **happiness and surprise are recognised at very short exposures and low resolution**. Subtle states (worry, sadness) need fine detail. **Supports an exaggerated expression set** (shock eyes 0.22 W, open D-mouth) and argues against relying on small mouth-corner changes. |
| Brows carry the emotion | [RESEARCH] + [MEASURED-in-repo] | Sadr, Jarudi & Sinha 2003: removing eyebrows hurt face recognition **more than removing the eyes**. That was identity, not emotion, but it shows brows are high-salience. The repo's brows are 0.05 W thick (ours 0.0375 W). **Supports thicker, higher, tapered brows.** |
| Outlines help objects read fast | [RESEARCH] | Biederman & Ju 1988: line drawings were identified **as fast and as accurately as colour photos**. Edges carry recognition, and colour added little (later studies found small colour gains in some conditions). **Supports an outline pass** as a readability tool, not just a style. |
| Silhouette test | [ANIMATION/DESIGN-CANON] | Valve's TF2 papers (SIGGRAPH 2007, GDC 2008): classes were designed silhouette-first and checked "with no internal detail" in bad lighting. Disney teaching material uses the same test. The popular "70 % silhouette / 30 % detail" rule has **no primary source** (folklore). |
| Close-ups suit small screens | [RESEARCH] | Knoche et al. (UCL, 2005-2008, mobile TV): shots where the subject fills the screen were judged more suitable for mobile; zoomed versions of extreme long shots were preferred. People in long shots were acceptable at a minimum of about 0.5-0.7° of visual angle, preferred at 0.7-1.4°. These are old PDA-era studies, but the direction is clear. **Our style sheet's "close-ups and medium shots" rule is supported.** |
| Bigger eyes = more appeal | [RESEARCH] | Glocker et al. 2009 (Ethology): faces with stronger baby-schema features (round face, big eyes, small nose and mouth) were rated cuter. A later study found large eyes rated cuter across expressions and ages. This supports *appeal*, not clarity. The reference channel does the **opposite**: small lidded deadpan eyes for comedy. Pick per character (see §4). |
| Dark skin needs a different lighting approach | [PRACTITIONER-DATA] | Pixar on *Soul*: shaping dark skin with diffuse light over-exposed or flattened it; they **added specular highlights** and longer subsurface scattering for lighter shadows. A former feature lighter: keep the base tone true and shape it with highlights and reflections. I found **no source on eye whites for dark-skinned cartoon characters** (gap). Our own contrast numbers (§3) show the problem directly. |
| No blush, no catchlights | [MEASURED-in-repo] / [OPINION] | Measured on one channel. It is not a readability rule. Catchlights are standard in clay and Pixar-style work; they add life and "wetness" to an eye. **Keep it as a style choice.** For our warm clay look, keep catchlights but make them small. |
| Stick limbs, 0.055 W | [MEASURED-in-repo] | Defines *that* channel's look. It conflicts with our clay/soft-toy brief, where chunky rounded limbs are the norm (Aardman-style; [ANIMATION/DESIGN-CANON]). Not a readability rule. |
| 3.5 HH adults | [MEASURED-in-repo] | Comedic cartoon adults commonly sit at about 3-4 HH [ANIMATION/DESIGN-CANON]. A bigger head means a bigger face on a phone (see the Knoche angle-size data). |
| Expression lands 0-3 frames before the word | [MEASURED-in-repo] | Matches the canon of anticipation: action slightly ahead of the sound reads as in sync, because sound arriving late is tolerated better than sound arriving early [ANIMATION/DESIGN-CANON]. |
| Blink gaps 0.5-2.3 s, 4 frames | [MEASURED-in-repo] | Real people blink about every 3-4 s for 100-400 ms [UNVERIFIED here, common figure]. The reference blinks *more* often than people: a stylised "alive" signal. |
| No film grain | [MEASURED-in-repo] + [PRACTITIONER-DATA] | The file-size numbers are the repo's own. The claim that grain looks bad after YouTube compression is plausible but **[UNVERIFIED]**. |
| Crescent face shading ×0.88, torso ×0.6 | [MEASURED-in-repo] | Matches the standard toon form-shading practice of a soft core shadow away from the key light [ANIMATION/DESIGN-CANON]. |
| Outline thicker on the shadow/bottom side | [MEASURED-in-repo] + [ANIMATION/DESIGN-CANON] | A classic inking rule ("weight on the shadow side, thin toward the light"). Now measured too: 3:1, thickest at 64°. |

---

## 3. Gap: our ep 02 vs the techniques

Numbers below are computed from `film.js` (units of head width W = 2r).

| Area | Ours (ep 02) | Reference / rule | Gap |
|---|---|---|---|
| **Head shape** | perfect circle `circ(x, y, r)` with two ear ellipses; H/W 1.0, no taper, no tilt, no bulge | H/W 0.93, pointed crown 1.7, full jaw 2.3, chin taper −0.12, 8-10 % bulge to the facing side, ±4° tilt | Roundness is fine. **Missing: taper, asymmetry, tilt.** `look` slides the features (`fx = x + look·0.32r`, i.e. 0.16 W) but the head outline does not change |
| **Proportions** | head top −276, feet 0, head 72 units → **≈3.8 HH**; neck present (`rr(-10,-210,20,16)`) | 3.5 HH, no neck | our head is **~9 % smaller relative to the body**: a smaller face on screen |
| **Face size on screen** | shot 8 (Mani on the bridge): head r ≈ 61 px, so **W ≈ 123 px = 11 % of frame width**; scooter shots W ≈ 120 px; close-up `head(470, 830, 190)`, W = 380 px (35 %) | close-ups should fill the frame (Knoche); a 0.5 s face read needs the face large | shot 8 changes the expression (neutral → smile at 2.6 s) on a 123 px face; that change is about 25 px of mouth |
| **Eye spacing** | ±0.33 r → **0.33 W** | 0.26 W | 27 % too wide (pushes eyes to the cheeks) |
| **Eyes** | dark ovals 0.1 × 0.13 W plus a white catchlight; **no sclera** | lidded or dot; shock = **white circles 0.22 W** | no "big eye" state at all; nothing shows shock or worry |
| **Eye contrast** | `#1A1210` on skin `#7A4A2E` = **2.5:1** | — | **low**: the eyes sink into Mani's dark skin at phone size |
| **Mouth contrast** | `#5A1E1A` on skin = **1.74:1** | — | **very low**: the neutral and confused mouths almost vanish. Only the smile works, because of its white teeth band |
| **Brows** | hair-coloured, 0.0375 W thick, 0.14 W long, uniform width, 0.12-0.155 W above the eyes; contrast **2.5:1** | 0.05 W thick, 0.17 W long, tapered, 0.20 W above centre | thin, low, low contrast |
| **Expression range** | 4: `neutral`, `smile`, `big`, `confused` | repo: 14. Style sheet asks for curious, shocked, relieved, happy, worried, amused | **missing shocked, worried, relieved and amused**: the main "Adhu Yen?" reactions |
| **Nose / ears / blush** | potato nose ellipse, two ears, blush on smile | none in front view | style choice; OK for clay. The nose bump competes with the mouth for attention at small sizes |
| **Moustache** | always present, 0.24 W wide, hair colour, right above the mouth | thin tapered commas | it sits between nose and mouth and the same dark tone **merges with the mouth line** at small sizes |
| **Blinks** | `(t % 3.3) < 0.09`: **every character blinks at the same instant**, 2-3 frames, no half-lid frame | per-character random 0.5-2.3 s, 4-frame half/shut/shut/half | synchronised blinking looks mechanical; no blink hides an expression swap |
| **Reaction timing** | expression switches set by hand at shot times (`s > 2.6 ? 'smile'`) | lead the word by 0-3 frames, blink across the swap | not tied to word timings |
| **Pose / acting** | `body()` is mirror-symmetric; arms sway ±0.035 rad; no lean, no head tilt | lean 3-8°, head tilt ±5°, one arm busy, asymmetric | stiff |
| **Outlines** | **none on characters.** Separation comes from `soft()` drop shadows (blur 12-18, offset 6-8, alpha 0.28) | plum 5 % W, 3:1 thick-thin | on a dark or busy background Mani has no edge. Skin vs night indigo `#1F2A44` is only **1.93:1** |
| **Limbs** | trouser tubes 0.33 W, arms 0.25 W, hands 0.31 W, shoe ovals 0.5 W | stick strokes 0.055 W, dot hands 0.11 W | **not a gap for us**: chunky limbs are correct for clay. Hands at 0.31 W are large but read as "soft toy" |
| **Shading** | `clayFill` vertical gradient (+20 % top, −18 % bottom); head radial gradient from upper left | face crescent ×0.88 on the far side; torso ×0.6 | fine for clay. The head's −20 % edge darkening plus dark skin pushes the face edge to **near the hair and brow tone** |
| **Texture / grain** | none | none (flat fields, grain off) | **no gap.** Don't add a noise overlay to characters |
| **Colour count** | Mani: skin, hair, mustard shirt plus shade and light buttons, grey trousers, brown shoes, black/grey watch, mouth and teeth, blush: about 9 fills | about 6-9 fills, ≤5 clothing details | fine |
| **Palette drift** | `P.shirt = '#C9921E'`, while the style sheet fixes Mani's shirt at turmeric `#E3A72F` (`P.tur`) | — | small brand inconsistency: decide which one is canon |
| **Tourists** | `touristHead()`: circle, sunglasses, hat; mouth only | — | sunglasses remove the eyes; fine for background extras, never for a reacting character |

---

## 4. Recommended rules and 2D canvas implementation notes

Ordered by readability gain per line of code. Each rule is tagged with its strongest evidence.

### R1. Make Mani's features pop off dark skin (biggest gap, cheap)
**Rule:** features on Mani's face need **≥ 3:1 contrast** against the skin, and the important ones (eyes in shock or worry, open mouth) **≥ 4.5:1**. [RESEARCH] (expression must survive low resolution) + [PRACTITIONER-DATA] (dark-skin lighting) + [OPINION] (the thresholds are borrowed from WCAG text contrast).
- Lift the face fill slightly: `#7A4A2E` → about `#8E5A3A` (still medium-dark brown, luma 0.13). That alone takes eye contrast from 2.5 to 3.2:1. Keep the brief's "medium-dark brown"; check against the style-sheet description, because image models drift *lighter* and so can we.
- Give every eye a **sclera**: a warm-white `#F7F3EA` almond or oval behind the dark pupil (6.7:1 against the skin). Size about 0.16 × 0.13 W normal and 0.22 W in shock. This is the main fix.
- Mouth: give open mouths a white teeth band (already done for smile). Draw the closed-mouth line in near-black `#1A0E0C`, not `#5A1E1A`, and make it 0.05 W thick.
- Use **specular-style highlights, not more diffuse light**, for shape on dark skin: a small soft warm-white spot on the forehead and cheek at 15-25 % alpha, plus the existing radial gradient. [PRACTITIONER-DATA] (Pixar *Soul*)
- Drop the bottom edge darkening of the head gradient from −0.20 to about −0.10, so the face edge doesn't melt into the hair and brows.

### R2. Thin warm outline on characters (cheap, high gain)
**Rule:** every character gets an outline of **3-5 % of head width**, **thicker on the bottom/shadow side (about 2-3:1)**, coloured as a **dark warm tint, not black** (keeps the clay feel). Inner lines (brows, mouth) are 0.6-0.9× the outline, and clothing seams 0.4×. [MEASURED-in-repo] + [RESEARCH] (edges drive fast recognition) + [OPINION] (warm tint for clay).
- Canvas, no new machinery: build the head path, then `g.lineWidth = 2*w; g.strokeStyle = '#2A1A14'; g.stroke(); g.fill();`. Stroke first and fill on top, so only the outer half of the line shows and the shape isn't eaten.
- Thick-thin on the cheap: stroke the same path twice, the second time shifted 0.02 W down and away from the light (`g.translate(dx, dy)`), clipped to outside the shape. Or port `inkRing` from `toon.ts` (≈20 lines, MIT) for the exact `w(θ) = w0(1 + 0.45 cos(θ − θthick))` ring.
- Draw the outline **once around the whole silhouette** (head + body), not around each part, to avoid inner double lines. Easiest way: draw the character to an off-screen buffer (we already have `bufF`), then draw the buffer 8 times offset by w in a circle, tinted dark with `globalCompositeOperation = 'source-in'`, behind the character. That gives a uniform silhouette outline in about 10 lines, and it works for any pose.
- Keep the soft drop shadow, but drop its alpha from 0.28 to about 0.18 once the outline exists. Two separators at full strength look like a sticker.
- Check: Mani against night indigo `#1F2A44` must show a visible edge. Add a warm rim (inner, head and torso only, never an offset outer copy) for indigo scenes. [PRACTITIONER-DATA] (the repo's "picture frame" trap)

### R3. A real expression set tied to the six the style sheet already asks for
**Rule:** 6-8 expressions, each defined only by **eye type + brow pair + mouth type**, and **brows do most of the work**. Exaggerate the distal ones (shock, happy), and never rely on subtle mouth-corner changes alone. [RESEARCH] (Smith & Schyns; Sadr et al.) + [MEASURED-in-repo] (repo `FACE` table)
- Port the table idea, not the exact faces: `const FACE = { curious:{eye:'dot', brow:[0,-4], mouth:'o'}, shocked:{eye:'shock', brow:[-8,-7], mouth:'O'}, worried:{eye:'small', brow:[-4,+3], mouth:'wave'}, relieved:{eye:'happy', brow:[-2,+1], mouth:'smileWide'}, happy:{eye:'happy', brow:[-3,-3], mouth:'grin'}, amused:{eye:'lid', brow:[0,-3], mouth:'smirk'}, neutral:{...}, confused:{eye:'dot', brow:[-6,+2], mouth:'dash-tilt'} }`. Brow offsets are in units of 1 % W, + = down, as `[inner, outer]`.
- Brows: **0.05 W thick at the inner end tapering to 0.025 W**, 0.17 W long, at **−0.20 W** from the head centre. Use a tapered quad (`taper()` in `toon.ts`), not a uniform stroke. Make them near-black, not hair-coloured, for contrast (R1).
- Shock eyes: white circles **0.22 W, almost touching** (gap ≈0.02 W), pupils 0.06 W. This is the single most readable "Adhu Yen?!" face.
- Bring the eyes in to **0.26-0.28 W apart** (from 0.33 W).
- Slide eyes and mouth **0.07-0.08 W toward the facing side** when `look ≠ 0`. We already slide by 0.16 W; that's fine for a full turn.
- Moustache: make it two short tapered commas (thick 0.04 W to thin 0.015 W, total width ≈0.3 W) with a **gap above the mouth of at least 0.04 W**, so mouth and moustache don't merge.
- Paati: same system. Her round spectacles must not hide the eyes. Draw the lens rims thin (0.02 W) in gold, with the eyes and brows clearly inside or just above them, and no glare that covers the pupils.

### R4. Head shape with taper, bulge and tilt (keep Mani's "round friendly face")
**Rule:** heads are rounded superellipses, **slightly wider than tall (H/W ≈0.93-0.97)**, with a **fuller jaw and slightly narrower chin**, an **8 % bulge to the facing side**, and **±3-5° tilt**. Characters differ by seed. [MEASURED-in-repo]
- Replace `circ(x, y, r)` with a 72-point path from a ported `blobPts` (≈15 lines), using `{a: r, b: 0.95 r, nTop: 1.85, nBot: 2.3, egg: -0.08, asym: 0.08*look, rot: tilt, noise: 0.006}`. Use **milder** numbers than the reference for Mani (nTop 1.85, not 1.7; egg −0.08, not −0.12), because the style sheet says round face. Paati can take a softer, wider jaw (nBot 2.5) and a flatter crown under the bun.
- Clip hair, ears and gradient to the new path. `head()` already clips hair to a circle, so swap that circle for the blob path.
- Tie `asym` to `look`. Then the head *turns* instead of the features just sliding across a fixed circle.

### R5. Bigger head, no neck (moderate effort)
**Rule:** adults at about **3.3-3.5 HH**; Paati can go to 3.2 HH (shorter, rounder). Drop the visible neck: overlap the head on the torso top. [MEASURED-in-repo] + [RESEARCH] (bigger faces on small screens)
- In `maniStand`, raise the head radius from 36 to about 40 units (≈3.45 HH) and move it down so it overlaps the collar. Remove `rr(-10,-210,20,16)`.
- **Keep chunky clay limbs.** Taper the trousers (24 → 20 units) and arms (18 → 15) slightly if they look heavy. **Do not** adopt the reference's stick limbs; they are that channel's identity, not a readability rule. [OPINION]

### R6. Frame faces for a 0.5 s read
**Rule:** any shot where Mani's **expression changes** must show his face at **≥ 25 % of frame width** (≥ 270 px wide at 1080). Shots at about 11 % width (shot 8, scooter) may carry only body action or very big expressions (shock eyes, open mouth). Background extras can be smaller. [RESEARCH] (Knoche; Smith & Schyns) + [OPINION] (the 25 % threshold is mine)
- Shot 8 changes neutral → smile on a 123 px face. Either push the camera in during the change (we already creep: make it reach about 25 %), or use a bigger expression (grin with teeth + happy ∩ eyes + raised brows).
- One reacting character per frame, as the style sheet already says. A second character can stay in the frame if their face is not doing the story work. [OPINION] (no repo data on cast size)
- Silhouette test every key pose: fill the character black. You must be able to tell what Mani is *doing* (pointing, recoiling, shrugging) from the shape alone. [ANIMATION/DESIGN-CANON]

### R7. Acting rules (cheap, all in `t`)
- **Per-character random blinks:** gap 0.5-2.3 s from a seeded hash of `(character id, blink index)`, 4-frame cycle with lid values `[0.5, 1, 1, 0.5]`. This stays a pure function of `t` (VideoHub contract). Port `lidAt()` from `cast.ts` (≈10 lines). [MEASURED-in-repo]
- **Blink across every expression swap:** schedule a blink so its shut frames cover the switch. [OPINION] / [ANIMATION/DESIGN-CANON]
- **Lead the word:** switch expressions 0-3 frames (≈0-0.1 s) **before** the narrator's trigger word, using the voice word timings. [MEASURED-in-repo]
- **Break the symmetry:** body lean 3-6° toward the action, head tilt ±3-5° (rotate around the chin), and one arm doing something while the other hangs. React with the whole body for big beats: a shock jump, or a recoil lean of 8-10° plus shock face. [MEASURED-in-repo] + [ANIMATION/DESIGN-CANON] (exaggeration, staging)
- Every hold creeps; no still of 12 frames or more. [MEASURED-in-repo]

### R8. Textures: stay flat
**Rule:** no grain or noise overlay on characters. Clay feel comes from **soft gradients and soft shadows**, not texture noise. If a subtle clay surface is ever wanted, cap it at **≤ 2 % multiply noise, clipped to the shape**, drawn once per character into a cached pattern (not per frame), and judge it on a phone after YouTube compression first. [MEASURED-in-repo] + [UNVERIFIED] (the compression claim)
- Background painted lines (tiles, house edges, kolam) should be **thinner and lower in contrast than the character outline** (0.7-0.9× width, half the contrast), so characters always win. [MEASURED-in-repo]
- No crushed blacks in the scene except ink and pupils: keep the darkest painted tones at L\* ≥ 19. [MEASURED-in-repo]

### Skip (not worth it for us)
- The 3D `InkPass` (depth + normal edge detection). We draw in 2D and already control every edge. "Constant screen width" just means not scaling the outline width with the camera's `cam2d` zoom: divide the line width by the current scale.
- Stick limbs, no catchlights, no blush, and pale faces at luma 0.93. These are that channel's identity. For Mani, a luma of 0.93 is wrong anyway.
- Exact plum `#241726`. On warm clay, a warm dark brown `#2A1A14` does the same job.

### Cost summary (2D canvas)
| Change | Lines of code (rough) | Gain |
|---|---|---|
| R1 sclera + lighter skin + darker mouth line | 10-15 | high |
| R2 silhouette outline via offscreen offsets | 10-20 | high |
| R3 expression table + tapered brows + shock eyes | 60-90 | high |
| R7 seeded blinks + blink-on-swap + lead timing | 15-20 | medium |
| R4 blob head path | 20 | medium |
| R6 framing rule | 0 (shot planning) | high |
| R5 head size / no neck | 5 | medium |
| R8 no texture | 0 | protects quality |

---

## Sources
- Repo: `mromidev/claude-animated-shorts`: `references/reports/{CONTEXT,characters,outlines,textures}.md`, `SKILL.md`, `templates/bridge/{toon,cast,ink,paint,cardshade}.ts`.
- [Smith & Schyns 2009, "Smile through your fear and sadness", Psychological Science](https://eprints.gla.ac.uk/64201); [follow-up citing it on happy/surprise at low resolution](https://pmc.ncbi.nlm.nih.gov/articles/PMC3604912); [Frontiers 2015 summary](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.00944/full)
- [Biederman & Ju 1988, "Surface versus edge-based determinants of visual recognition"](https://www.bohrium.com/paper-details/surface-versus-edge-based-determinants-of-visual-recognition/812339532459409409-11891)
- [Sadr, Jarudi & Sinha 2003, "The role of eyebrows in face recognition", Perception](https://pubmed.ncbi.nlm.nih.gov/12729380/)
- [Knoche et al., small-screen image size studies (UCL)](https://discovery-pp.ucl.ac.uk/id/eprint/20255/2/acmm2008.pdf); [shot types for mobile, 2005](https://discovery-pp.ucl.ac.uk/id/eprint/20256/1/acmmm2005_ucl.pdf)
- [Glocker et al. 2009, baby schema and cuteness](https://www.cceb.upenn.edu/csa/assets/user-content/documents/BabySchemainInfantFacesInducesCutenessPerceptionandMotivationforCaretakinginAdults.pdf)
- Eye tracking, faces first: [PMC6458421](https://pmc.ncbi.nlm.nih.gov/articles/PMC6458421), [PMC6802786](https://pmc.ncbi.nlm.nih.gov/articles/PMC6802786), [CG portraits viewed like photos](https://farid.berkeley.edu/downloads/publications/tr18a.pdf)
- Silhouette canon: [Valve, Illustrative Rendering in TF2 (SIGGRAPH 2007)](https://www.advances.realtimerendering.com/s2007/Mitchell-IllustrativeRenderingInTF2(Siggraph07%20Course%20Notes).pdf), [Valve GDC 2008, Stylization with a Purpose](https://cdn.fastly.steamstatic.com/apps/valve/2008/GDC2008_StylizationWithAPurpose_TF2.pdf), [Walt Disney Family Museum silhouette sheet](https://www.waltdisney.org/sites/default/files/2020-05/T%26T_Silhouette-final2.pdf)
- Dark skin lighting: [Pixar SIGGRAPH 2021 on *Soul* skin tones](https://laughingplace.com/w/p/soul-guide/siggraph-2021-pixar-talks-about-the-technical-side-of-lighting-skin-tones-in-soul), [RenderMan, "Cinematography with Soul"](https://renderman.pixar.com/stories/cinematography-with-soul), [3D Artist tip: lighting dark-skinned characters](https://3dartist.substack.com/p/3d-artist-tip-how-to-light-dark-skinned)
- Contrast ratios in §3 were computed with the WCAG relative-luminance formula from the hex values in `film.js`.
