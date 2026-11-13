# Style Sheet & Character Bible

This sheet fixes how the channel looks and sounds so every Short is recognisable at a glance. Topics change freely. **This sheet does not change** without a deliberate decision.

Why it matters: research found recurring characters and one consistent style drive follows (Tamil "muthupandi" series, Part 41 at 7.9M). It also found that templated sameness in *stories* gets channels demonetised. So the **look** is fixed and the **story** is always new.

---

## 1. Look

- **Style:** warm, slightly stylised 3D "clay / soft-toy" look. Rounded shapes, soft rim light, shallow depth of field. It must **not** be photoreal, for two reasons:
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
- Move every other shot with a slow push-in or parallax in Resolve.
- Build diagrams and maps as keyframed graphics over a clean AI background still.
- Check the **last frame** of every clip for face and outfit drift.
- Tool: the bake-off winner. Candidates: Omni Flash in YouTube Create (free), Veo 3.1 Lite in Flow (AI Pro), or Kling 3.0 (STANDARD stack).

## 4. Voice

- Your own voice, off-screen, every video. It is the strongest protection against "inauthentic content" flags. Cloning your own voice later for dubs needs no disclosure.
- Spoken Tamil, not formal written Tamil. Speak in the second person ("unga veetla…", "neenga…").
- Calm and plain, like explaining to a cousin. No shouting and no fake hype.
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
- Burn the captions in on every Short. A review of 100+ studies found captions improve comprehension, attention and memory for everyone.
- Opening question: shown on screen in Tamil script during seconds 0–3.
- English keywords may sit beside the Tamil (for example "Nerve") to help search.

## 6. Sound

- **No licensed music.** It does not raise your pay: your 45% share of your own allocation is the same with or without music, and music only shrinks the shared pool. The real reasons:
  - Claimed music blocks monetisation of Shorts over one minute.
  - It invites Content ID disputes.
  - It may not be cleared on Instagram or Facebook, where the same master goes.
- **Beds:** none, or YouTube Audio Library tracks marked "attribution not required" (check each before cross-posting). Never use Pixabay music, the Meta Sound Collection, or Freesound CC BY-NC.
- **Fixed sounds:** one "question" whoosh at the start and the verdict sting. Nothing else is fixed. Take both from Freesound CC0 or make them yourself, so they're cleared on every platform. Log every audio asset (URL, licence, download date).

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
