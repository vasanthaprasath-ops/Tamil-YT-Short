# Style Sheet & Character Bible

This sheet fixes how the channel looks and sounds so every Short is recognisable at a glance. Topics change freely. **This sheet does not change** without a deliberate decision.

Why it matters: big channels show a recurring look and cast (Tamil "muthupandi" series, Part 41 at 7.9M; Zack D. Films' fixed style), but no data proves recurring characters raise follow rate. Treat the fixed look as cheap brand-building, not a guaranteed lever. It also found that templated sameness in *stories* gets channels demonetised. So the **look** is fixed and the **story** is always new.

---

## 1. Look

- **Style:** warm, slightly stylised 3D "clay / soft-toy" look. Rounded shapes, soft rim light, shallow depth of field. (Rim light is an open decision for code films: the measured reference uses none. See `kit/film-craft.md` "Decisions for Vasanth".) It must **not** be photoreal, for two reasons:
  - Fully animated visuals need no AI label on YouTube.
  - It keeps us clearly different from Zack D. Films' realistic 3D look.
- **Frame:** vertical 9:16, 1080×1920. Close-ups and medium shots. The subject fills the frame. Avoid wide establishing shots unless the place itself is the topic (city series).
- **Palette (use in every prompt and every graphic):**

| Name | Hex | Use |
|---|---|---|
| Turmeric yellow | `#E3A72F` | Mani's shirt, highlights, the PAADHI UNMAI stamp |
| Kolam white | `#F7F3EA` | Caption text, backgrounds of explainer cards |
| Temple red | `#B23A2E` | Accents, the POI stamp |
| Banana-leaf green | `#4C8C3A` | The UNMAI stamp, nature scenes |
| Night indigo | `#1F2A44` | Inside-the-body scenes, background of verdict cards |

## 2. Characters

**Reference pack for each character:**
- A sheet with front, 3/4, side and back views on a plain light background, plus an expression row: curious, shocked, relieved, happy, worried, amused.
- Keep the sheet plus 3–5 clean single-view crops as the **reference pack** in `kit/characters/v1/`.
- Attach the whole pack to every shot, and both packs for two-shots.
- Never regenerate the pack. Any change becomes `v2`, with a date.
- Tool: Gemini (Nano Banana Pro). Backup: ChatGPT (GPT Image).

Write the skin tone into every prompt and compare each batch against the sheet, because image models drift lighter. Default to single-character frames, and check every two-shot for swapped outfit colours.

### Mani (things happen to him)
- Tamil man, about 25. Medium-dark brown skin, round friendly face, short black hair with a side parting, thin moustache.
- **Fixed outfit:** mustard-yellow half-sleeve shirt (`#E3A72F`), grey trousers, black analogue watch on his left wrist. At home: white veshti and the same shirt.
- Role: the everyday "this could be you" person. The splinter, the flooded car, the ear pop on the ghat road all happen to him. He never explains anything; the narrator does.

### Face readability (all characters, stills and code films; added 2026-11-14)
Faces are read in about half a second on a phone, so big, high-contrast features beat subtle ones. Numbers are in head-widths (W); evidence in `kit/film-craft.md` §3.
- **Features stand out from the skin:** eyes, brows and mouth at least 3:1 contrast against the skin; shocked eyes and open mouths at least 4.5:1. On Mani's dark skin that means **eye whites** (kolam white `#F7F3EA`), a near-black mouth line and **near-black brows**, not hair-coloured ones.
- **Brows carry the emotion:** thick (about 0.05 W) tapering to thin, about 0.17 W long, set well above the eyes.
- **Eyes** about 0.26–0.28 W apart. Shocked = big white circles almost touching, tiny pupils.
- **Moustache** = two short tapered strokes with a clear gap above the mouth, so the two never merge.
- **Paati's spectacles:** thin gold rims, eyes and brows clearly visible, no glare over the pupils.
- **The expression row** (curious, shocked, relieved, happy, worried, amused) is defined by eye shape + brow angle + mouth shape. Make shocked and happy big; never rely on a small mouth-corner change.
- **Size:** when an expression changes, the face fills at least 25 % of the frame width.

### Paati (appears in the Paati series and whenever a household rule comes up)
- Tamil grandmother, about 70. Silver hair in a low bun, small round spectacles, maroon cotton saree with a mustard border, thin gold chain.
- Warm, sharp, slightly amused. **Never mocked.** The framing is always "here's what she noticed, here's what science knows now".
- **Never shown as a doctor or expert.** No stethoscope, no white coat, no "Doctor Paati". YouTube demonetises AI personas posing as health experts.

### Verdict stamp (the third "character")
- Three stamps, each landing with a short, fixed sound sting:
  - **UNMAI ✅** (உண்மை), green `#4C8C3A`
  - **PAADHI UNMAI ⚠️** (பாதி உண்மை), turmeric `#E3A72F`
  - **POI ❌** (பொய்), red `#B23A2E`
- It looks like a rubber stamp slammed onto the screen at a slight angle.
- The last frame after the stamp is a **clean verdict card** carrying the one-line true takeaway. It is designed to be screenshotted and forwarded to a family WhatsApp group.

## 3. Image prompt prefix

Start every image prompt with this prefix, then describe the shot. Do not change the prefix between videos.

```
Stylised 3D clay-render animation still, soft rounded shapes, warm soft rim lighting, shallow depth of field, vertical 9:16 composition, colour palette turmeric yellow #E3A72F, kolam white #F7F3EA, temple red #B23A2E, banana-leaf green #4C8C3A, night indigo #1F2A44, South Indian Tamil setting, no text, no letters, no signage, no logos, no watermark, not photorealistic.
```
This is prefix v2, dated 2026-11-04. Keep key detail away from the frame corners, where the Gemini sparkle watermark sits. Fix drift with "keep everything, change only X" edits rather than re-rolls.

Character add-ons (paste after the prefix when the character is in the shot, and attach the reference image):

```
Mani: a friendly Tamil man about 25, medium-dark brown skin, round face, short black side-parted hair, thin moustache, mustard-yellow half-sleeve shirt, grey trousers, black analogue watch on left wrist.
```

```
Paati: a warm Tamil grandmother about 70, silver hair in a low bun, small round spectacles, maroon cotton saree with mustard border, thin gold chain, kind amused smile.
```

Inside-the-body shots: "cutaway cross-section, translucent skin, glowing nerves and vessels in night indigo and turmeric, educational, not gory".

## 3b. Animation

- Animate only **3–5 character-moment shots** per Short: image-to-video, 5 s, 720p, **audio off**.
- Move every other shot with a slow push-in or parallax in Resolve. "Slow" means 0.15–0.35 % zoom per frame (about 5–10 % per second), steady through the shot rather than easing to a stop; the camera should be moving on at least 85 % of the runtime. No hand-held wobble. (Measured on a top animated channel; `kit/film-craft.md` §2.)
- Build diagrams and maps as keyframed graphics over a clean AI background still.
- Check the **last frame** of every clip for face and outfit drift.
- Tool: the bake-off winner. Candidates: Omni Flash in YouTube Create (free), Veo 3.1 Lite in Flow (AI Pro), or Kling 3.0 (STANDARD stack).

## 3d. Code-film look v3: paper world (decided by Vasanth, 2026-11-14)

**Scope (Vasanth, 2026-11-14): the city series, for now.** This replaces §3c for city-series code films. He does not expect the same mix to suit the other series (body, Paati, objects, survival); their look is **undecided**, so show style frames for a series before building its first film rather than assuming this one. Vasanth found the ep 02 clay look not distinctive enough and chose a mix of three looks from style frames. Reference frames and the code that drew them: `kit/style-frames/`. The frames are rough sketches of the style, not final art: the first job of ep 03 is to polish them into a reusable starter.

| Mode | Look | Use it for | Share of a film |
|---|---|---|---|
| **Main: paper cut-out** (`main-paper-cutout.png`) | Flat paper shapes in layers, soft drop shadows between layers, light paper grain, no outlines, clean and uncluttered | Mani and Paati, the body, close and medium shots, most explaining | about 70 % |
| **Places: isometric miniature** (`places-isometric-miniature.png`) | A small toy world on a floating tile seen from above at an angle, top and bottom softly out of focus | Towns, streets, maps, "how it is laid out", the inside of a body part shown as a little machine | about 20 %, mostly city and how-it-works beats |
| **Peak: matchbox print** (`peak-matchbox-print.png`) | Old Tamil matchbox-label print: thick ink outlines, sunburst rays, halftone dots, colour printed slightly off-register, ribbon banner | The hook frame when it helps, the reveal, the verdict stamp card | **1–2 moments per film, a few seconds each** |

**Rules that keep the mix one world**
- One paper world: the isometric tile is made of paper blocks (same grain, same soft shadows), and the matchbox frame is a printed card that lands on the paper scene, not a different universe.
- Same palette (§1), same Mani and Paati, same Tamil lettering in all three modes.
- **Clean first.** Few elements, lots of empty space, nothing decorative that doesn't explain. This is why Vasanth picked the paper and miniature looks.
- The matchbox look is a spice: only on a peak moment (hook, reveal or verdict), never for explaining, never more than two per film. If it shows up everywhere it stops meaning "big moment".
- Move between modes on a beat: the camera rises from the paper scene into the miniature; the matchbox card slams in on the reveal word. No slow dissolves between modes.
- Paper moves like paper: pieces slide, hinge and pop up; characters may step in small increments like stop-motion while the camera moves smoothly. (A proposal, to be judged on ep 03's preview.)
- Looked at and not chosen: kolam chalk on indigo (the kolam border stays for end cards), soft clay 3D (ep 02), light-box puppet, the single red kolam line. See `D:\Shorts\style-frames` on the current laptop.

**What still carries over from §3c:** shadows tinted toward night indigo, never black; one key light per shot (upper-left); glow only on things that give off light. **What changes:** paper grain is now part of the look (light, on every mode), and the main mode has **no** character outline; the ink outline belongs to the matchbox mode only.

**Not done yet:** proper character design for paper Mani and Paati (hands, poses, the expression set from §2 "Face readability"), and the reusable film starter with the three modes.

## 3c. Code-film look v2: clay (ep 02 only; superseded by §3d)

The clay look drawn in code, in place of the AI prefix. Full rules and canvas hints: `kit/film-craft.md` §4.
- **Shadows** are a darker, slightly richer version of the surface's own colour (about half as bright), mixed toward night indigo `#1F2A44`, **never toward black**. Drop shadows are indigo-tinted, not near-black.
- **One key light per shot**, upper-left by default: highlights, body gradients and shadow offsets all agree.
- **Outline policy:** characters get one thin warm dark outline (`#2A1A14`, 3–5 % of head width, thicker on the bottom/shadow side), drawn once around the whole silhouette. Background lines are thinner and fainter than character outlines. No outline on graphics or cards.
- **Depth of field** on about 1 shot in 3 (close and medium character beats), not every shot; wides, maps and cards stay sharp. Characters and text are always sharp. *(Replaces "shallow depth of field" for code films; the AI prefix keeps it.)*
- **Glow** only on things that give off light (lamps, glowing lines), never on faces or white text.
- **No grain or texture** on characters; the clay feel comes from soft gradients and soft shadows.

## 4. Voice

- Your own voice, off-screen, every video. It is the strongest protection against "inauthentic content" flags. Cloning your own voice later for dubs needs no disclosure.
- Spoken Tamil, not formal written Tamil. Speak in the second person ("unga veetla…", "neenga…").
- Calm and plain, like explaining to a cousin. No shouting and no fake hype.
- Pace: no Shorts speaking-speed target has evidence. Speak at natural speed and prefer cutting words over speeding up. A pitch-preserving speed-up of 1.1x or less is fine; never go higher. Older viewers are hurt most by fast speech (UCLA, Applied Cognitive Psychology 2022), and the real risk is jargon, not tempo.
- Record in a quiet room with soft furnishings, mic 10–15 cm from the mouth, one clean take per line.
- **One narrator voice only (yours).** Characters don't speak:
  - Mani reacts with faces and sound effects only.
  - Paati's rule is quoted by the narrator ("Paati sollvaanga…"), with her mouthing it on screen or a speech bubble.
  - This is the Zack D. Films model. It avoids multi-voice cost and stays consistent.
- **Optional upgrade:** one real Paati line, recorded by a real grandmother or elder in the family (with consent) and reused only where it fits. No AI-generated "elder" voices pretending to be a real person.
- **Optional upgrade B (from about video 10):** perform Paati's 1–2 lines yourself and convert them with **ElevenLabs Voice Changer** (model Multilingual STS v2, which supports Tamil) on the **Starter plan or above**. The free plan forbids commercial use.
  - Use one library or designed elderly-female voice as the fixed Paati preset forever. Never use a real person's voice.
  - Run Adobe Podcast Enhance on the line first.
  - Use **AI speech-to-speech**, not a cheap pitch shifter. Pitch shifters sound like a chipmunk.
  - Test on one line first. Only use it if a Tamil listener can't tell it's a man.
  - Keep Mani silent, so the narrator, Mani and Paati never blur together.
- **Clean-up chain:**
  1. Adobe Podcast Enhance Speech (free, about 1 h/day) on the raw take.
  2. In Resolve Fairlight: high-pass at 80 Hz, a light compressor, and Dialogue Leveler if needed.
  3. Normalise to about −14 LUFS integrated, −1 dBTP true peak. This is common guidance, not an official YouTube figure.
- **Dubs (English/Hindi):** use ElevenLabs Dubbing on the narration-only track, with an Instant Voice Clone of your own voice. Upload the result as a multi-language audio track on the same Short; no disclosure is needed.
  - YouTube's own auto-dub only does Tamil→English, with a generic voice.
  - On Instagram and Facebook, try Meta's free AI translation first.

## 5. Captions & on-screen text

- **Font:** **Mukta Malar ExtraBold** by default. Alternates: Catamaran Black, Baloo Thambi 2 ExtraBold, Noto Sans Tamil Bold. All are Google Fonts under the SIL OFL, so they're free for monetised video. Install the static .ttf files, not the variable font. Colour: kolam white `#F7F3EA` with a 6–8 px black stroke.
- **Position:** keep all text and key action inside the **safe box x 90–918 px, y 260–1470 px** on 1080×1920. That keeps the top 260 px, bottom 450 px, left 90 px and right 162 px clear of app buttons.
  - Captions go in the band **y 1150–1450**.
  - The verdict stamp and opening question go upper-centre, below y 260.
  - Preview every upload in each app's draft view, because button overlays change with app updates.
- **Caption workflow:** the caption text is your script, never speech-to-text output.
  1. Upload the rough cut as unlisted.
  2. In YouTube Studio, generate Tamil auto-captions and replace their text with your script.
  3. Download the .srt.
  4. Import it into a Resolve subtitle track (or use basic Text) and burn it in.
  - Don't use Text+ for Tamil unless it passed the export test.
  - Fallback: pre-render captions and the stamp as transparent PNGs from a browser.
- **Always check Tamil in an exported frame**, not the preview. Zoom in on கை, கொ and ஸ்ரீ.
- Burn the captions in on every Short. A review of 100+ studies found captions improve comprehension, attention and memory, most of all for second-language viewers (the 'for everyone' claim is disputed). Never justify captions with '85% watch muted'. That is a 2016 publisher claim, not a platform figure.
- Show captions as short phrases of 2–4 words timed to the narration, never one flashing word at a time (faster subtitles cut comprehension). Highlighting one keyword per line in turmeric `#E3A72F` is optional and untested, so A/B it.
- Opening question: on screen in Tamil script **from frame 0** through second 3. No black, fade-in or logo frame before it. Frame 0 doubles as the Shorts thumbnail and the Reels cover, and with the sound off it must name the subject by itself.
- English keywords may sit beside the Tamil (for example "Nerve") to help search.

## 6. Sound

- **No licensed music.** It does not raise your pay: your 45% share of your own allocation is the same with or without music, and music only shrinks the shared pool. The real reasons:
  - Claimed music blocks monetisation of Shorts over one minute.
  - It invites Content ID disputes.
  - It may not be cleared on Instagram or Facebook, where the same master goes.
- **Beds:** none, music synthesized in code (`make-audio.js`, code films), or YouTube Audio Library tracks marked "attribution not required" (check each before cross-posting). Never use Pixabay music, the Meta Sound Collection, or Freesound CC BY-NC.
- **Fixed sounds:** one "question" whoosh at the start and the verdict sting. Nothing else is fixed. Take both from Freesound CC0 or make them yourself, so they're cleared on every platform. Log every audio asset (URL, licence, download date). The verdict sting stays under 1 second. Nothing (sting, logo, title card) plays before the hook. The 'question' whoosh lands under the first spoken word, not before it. If music is used, keep it **10–14 LU under the voice** after ducking (about −24 to −28 LUFS with the voice at −14). *Changed 2026-11-14:* the old "−25 to −30 LUFS" had no source; the measured reference channel sits louder (5–10 dB under), accessibility guidance wants 20 dB or more, and older listeners need at least ~7, so 10–14 is the middle for an audience that includes Paati's generation. Whether to go louder is in `kit/film-craft.md` "Decisions for Vasanth".
- **Ducking:** dip the music only 3–4 dB, keyed from the voice's word times, not from the audio (which pumps on every syllable).
- **Ambience:** one ambience bed per place, always on, about 26–30 LU under the voice, so silence means "no music", never "no sound".
- **Hits and music:** no loud hit on a key word (put it in the gap after the line); the music stops dead on the pivot word and comes back after the answer lands; every boom has a mid-range layer so it exists on phone speakers.

## 6b. Channel brand (decided 2026-11-13)

- **Name:** Adhu Yen? (அது ஏன்?). **Handle:** @adhuyen. Use the same handle on every platform.
- **Logo:** option A, a "?" made of turmeric clay kolam dots, with a kolam flower as the dot, on night indigo: `kit/brand/logo.png` (800×800). It reads at the 98px circle size.
- **Banner:** `kit/brand/banner.png` (2560×1440, text inside the 1546×423 safe area). Tagline: "சின்ன கேள்வி. பெரிய காரணம்." (small question, big reason).
- **Source:** `kit/brand/brand.html` draws both; edit it and re-export rather than redrawing. Options B and C are kept as `logo-B.png` / `logo-C.png`.

## 7. Toolstack

Full reasoning and prices are in `reports/Tamil Shorts production toolstack.md`. **Bake-off date: — | Stack chosen: — (LEAN A / LEAN B / STANDARD)**

| Step | Primary | Backup |
|---|---|---|
| Script + research | Claude | — |
| Narration | Own voice, Fifine K669B USB mic | Boya BY-M1 on phone |
| Clean-up | Adobe Podcast Enhance (free) | Resolve Dialogue Leveler |
| Paati voice (optional) | ElevenLabs Voice Changer, Starter | Narrator quotes Paati |
| Dubs (optional) | ElevenLabs Dubbing + own voice clone → multi-language audio track | YouTube auto-dub (Tamil→English); Meta AI translation |
| Character stills | Gemini, Nano Banana Pro (AI Plus ₹399 / AI Pro ₹1,950) | ChatGPT Go (₹399, UPI) |
| Image-to-video | LEAN: Omni Flash in YouTube Create (free, if it works in India) / Veo 3.1 Lite in Flow | STANDARD: Kling 3.0, 720p, audio off |
| Edit (PC) | DaVinci Resolve (free) | Clipchamp (free) |
| Edit (phone) | YouTube Create | Premiere mobile |
| Captions | Script + YouTube Studio timing → .srt → Resolve | PNG pre-render |
| Fonts | Mukta Malar ExtraBold | Catamaran Black |
| SFX | Freesound CC0 / self-made | YouTube Audio Library |
| **Not available / don't use** | CapCut (blocked in India), Sora (shut down), Seedance/Dreamina (no India access), ElevenLabs free plan (non-commercial), all-in-one AI Shorts generators (templated, so demonetisation risk) | |
