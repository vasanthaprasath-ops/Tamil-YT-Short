# Project context: everything decided so far

This file consolidates the planning conversations from 2026-11-04 to 2026-11-14. When something here conflicts with an older file, **this file and the newest report win**. Details and sources are in the linked files.

---

## 1. Who and what

- **Creator:** Vasanth. A Tamil speaker in India, a developer with a day job, and a complete beginner at content creation. He has roughly 12–15 free hours a week.
- **Goal:** get into the short-form content game and make money. This is not tech content.
- **Channel:** faceless, AI-assisted, animated YouTube Shorts for a **broad Tamil audience**, cross-posted to Instagram Reels and Facebook. It must be "AI-made but not slop".
- **Reference creator:** Zack D. Films (29.6M subscribers, 4.1K videos as of 2026-11-04). We copy his *mechanism*, never his look, name or characters.
- **Language:** Tamil-first. English and Hindi dubs come later, on the same Shorts.

## 2. The core insight (from the Zack D. Films teardown)

His top 48 Shorts are about **40% the viewer's own body**, 20% everyday-object mysteries, 15% survival, 15% weird history and 5% small moral stories.

**The mechanism:** pick something on the viewer's body or in their daily life, show it happening in the first second, and answer a question they never thought to ask. The animation amplifies the effect, but the topic and the first-second visual are what drive views. His account size and output volume (4.1K videos, several uploads a day) can't be copied.

Title formula: `How X Works` / `Why X …` / `What Is X?` / `Could/Can …?` / a situation you could be in. Each title is 3–7 plain words with one emoji that names the emotion.

## 3. Vision and series (decisions)

- **Vision is BROAD** (Vasanth, 2026-11-04). Topics are wide open, like Zack's "A Collection of Things I Find Interesting". What stays fixed is the **promise and the style**: interesting things about a Tamil person's life, shown happening in second one, honestly answered, with the same look, characters and voice every time.
- **Filter for every topic:** is it on a Tamil viewer's body, in their house, on their street, or in their family's memory?
- **Series, ranked by research evidence** (report 1, §2):
  1. **Your body, Tamil life:** kaal maraththu pochu, ear pop on the ghat road, onion tears…
  2. **"Paati sonnadhu unmaiya?"** Elders' household rules tested against science. Each episode ends in a verdict stamp: **UNMAI ✅ / PAADHI UNMAI ⚠️ / POI ❌**. Order: fact → myth mentioned once → why people believed it → fact. Elders are never mocked.
  3. **City series: "Why is Tamil Nadu like this?"** One "yen?" question per city, weekly. Not fact lists (those get ~1K views) and never city-vs-city put-downs.
  4. Everyday-object mysteries.
  5. Tamil survival.
  - Later: animated Tamil history as stories, and nostalgia.
- **Start with 3 series, not 5** (toolstack report), so each gets ≥4 episodes before being judged.
- **Dropped:** god / temple "facts", religious rituals, astrology and drishti (false-claim and backlash risk); contested caste or political history; slang comedy and food vlogs as the core (they need real faces and places).
- **Why honest verdicts win:** existing Tamil "முன்னோர்கள் சொன்னது அறிவியல்" shorts are pro-tradition pseudo-science and get 15 to ~7K views. A near-identical "Paati — உண்மையா பொய்யா" Short got 63 views, which shows execution matters. Honest health myth-busting by doctors gets 1.1M–4.4M. No one runs an honest, animated, recurring verdict series.
- **The share driver:** grandchildren can't easily correct elders in family WhatsApp groups. Forwarding the verdict card is the face-saving way to do it.

## 4. Look, characters, voice (fixed: see `kit/style-sheet.md`)

- **Style:** warm stylised 3D "clay" render. **Never photoreal.** Animated visuals need no AI label, and the style keeps us distinct from Zack.
- **Palette:** turmeric `#E3A72F`, kolam white `#F7F3EA`, temple red `#B23A2E`, banana-leaf green `#4C8C3A`, night indigo `#1F2A44`.
- **Characters** (names are placeholders until Vasanth decides):
  - **Mani:** a Tamil man about 25 with medium-dark brown skin and a fixed mustard half-sleeve shirt. Things happen *to* him. **He is silent.**
  - **Paati:** a warm, sharp Tamil grandmother. **Never mocked, and never shown as a doctor**, because YouTube demonetises AI personas posing as health experts.
  - **Verdict stamp:** the third "character", with a fixed sound sting. The final card is designed to be screenshotted and forwarded.
- **Reference packs:** front, 3/4, side, back plus an expression row, kept in `kit/characters/v1/`. Never regenerate them; changes become `v2`. Write skin tone into every prompt, because models drift lighter. **These packs don't exist yet.**
- **Voice decision (2026-11-04):** **one narrator only: Vasanth's own voice**, in spoken Tamil, second person, calm. Characters don't talk; the narrator quotes Paati ("Paati sollvaanga…").
  - Optional later: a real family elder records a line (with consent).
  - **Upgrade B (from about video 10):** Vasanth performs Paati's 1–2 lines and converts them with **ElevenLabs Voice Changer** (Multilingual STS v2, which supports Tamil) on the **paid Starter plan**. The free plan bans commercial use and forces "elevenlabs.io" into the title. Use a fixed elderly-female preset. AI speech-to-speech only, never a cheap pitch shifter. Test by ear on a family member. **No kid voice** (an adult-to-child voice is the hardest and sounds weird). Mani stays silent.
- **Recording:** a quiet room with soft furnishings (an open wardrobe works), mic 10–15 cm away, one line at a time with 2–3 takes. Clean up with Adobe Podcast Enhance, then Resolve (high-pass 80 Hz, light compression), then about −14 LUFS / −1 dBTP.
- **Captions:**
  - The caption text is the script. Burn it in using Mukta Malar ExtraBold, white with a black stroke.
  - **Safe box: x 90–918, y 260–1470** on 1080×1920, with the caption band at **y 1150–1450**.
  - Check Tamil glyphs (கை, கொ, ஸ்ரீ) in an *exported frame*.

## 5. Platform rules and policy (what can hurt the channel)

- **Inauthentic content** (YouTube, effective 15 Jul 2025, wording reorganised Jul 2026): templated or mass-produced AI, slideshows and stitched shock clips are not monetisable, and the penalty applies **channel-wide**. The defence: a distinct story in every Short, varied shots, our own voice and research.
- **AI label:** not needed for animated or fantasy visuals or for a clone of your own voice. Needed for realistic scenes. Since May 2026, YouTube auto-labels realistic AI with an overlay; animated content only gets a description note. Clips from Google tools carry a permanent label, which is fine.
- **Health misinformation:** never give UNMAI to a remedy that contradicts health authorities. Name the authority (WHO / ICMR / MoHFW / NHS). Body videos explain what's happening; they never prescribe a cure. Strikes are possible, so any warning pauses all health topics.
- **Meta:** upload clean masters natively and never repost downloaded or watermarked copies; duplicates lose reach. Instagram ranks on watch time, likes and **sends** (DM shares). Avoid engagement bait like "comment YES / tag a friend".
- **Music:** no licensed music, but **not because it raises pay**: your 45% share is the same either way. The real reasons are Content ID claims, blocked monetisation on Shorts over one minute, and cross-posting. Use Freesound CC0 or self-made sounds. Never Pixabay music or the Meta Sound Collection.
- **Psychology rules:** high-arousal emotion (awe, surprise, mild fear) plus practical value gets shared; sadness gets shared less. In-group warmth ("our paati, our ooru") works. A guess-before-reveal beat helps. Captions help everyone. The backfire effect is rare, so honest verdicts are safe. Most viral "first 3 seconds" percentages have no real source.

## 6. Money (realistic)

- **The YPP change on 1 Feb 2027 is confirmed** (YouTube blog, 10 Aug 2026, plus multiple outlets):
  - **New applicants:** 1,000 subscribers plus **20M Shorts views in 90 days** (about 222K a day) or 8,000 watch hours.
  - **To earn Shorts revenue in any month:** **10M Shorts views in the trailing 90 days**.
  - Existing partners are exempt from the new entry bar.
- **Lower tier, unchanged:** 500 subscribers plus 3,000 watch hours or 3M Shorts views in 90 days. This unlocks **YouTube Shopping affiliate** (India: Flipkart, Myntra, Nykaa) and fan funding. It's the realistic first money.
- Indian Shorts RPM is tiny and estimates conflict (roughly ₹900–3,800 per 1M views). Order of income: **brand deals + Shopping affiliate → dubbed audio tracks for reach → Shorts ads last.** Fund the channel from salary for 6–12 months. Meta pays almost nothing directly in India.
- **Check HumHealth's employment terms on side income before monetising.** Keep an income and expense sheet for tax.

## 7. Toolstack (see `reports/Tamil Shorts production toolstack.md` and style-sheet §7)

| Step | Primary | Backup |
|---|---|---|
| Script and research | Claude (`tamil-shorts-producer` skill) | — |
| Mic | **Fifine K669B USB** (~₹2,000–2,600) | Boya BY-M1 lavalier on phone (~₹848) |
| Clean-up | Adobe Podcast Enhance (free) | Resolve Dialogue Leveler |
| Character stills | **Gemini, Nano Banana Pro**: AI Plus ₹399 (LEAN) / AI Pro ₹1,950 | ChatGPT Go ₹399 (UPI) |
| Image-to-video | **Omni Flash in YouTube Create** (free, if it works in India) → Veo 3.1 Lite (AI Pro) | **Kling 3.0**, 720p, audio off (STANDARD) |
| Edit | **DaVinci Resolve** (free, PC) | Clipchamp; YouTube Create on phone |
| Captions | Script → YouTube Studio Tamil auto-caption timing → .srt → Resolve | Transparent PNG captions |
| Paati voice and dubs | **ElevenLabs Starter** ($6, about ₹645) | Narrator quotes Paati; YouTube auto-dub (Tamil→English only) |

- **Not available or don't use:** **CapCut (blocked in India since Jul 2020)**, **Sora (shut down 2026)**, Seedance/Dreamina (no India access), the ElevenLabs free plan, all-in-one AI Shorts generators (InVideo, Revid, Fliki: templated, so a demonetisation risk), Resolve Studio, wireless mics.
- **Cost:** LEAN about **₹399–2,595/month**; STANDARD about **₹6,100/month**. USD tools cost about 22% more after forex markup and GST. Indian banks may decline recurring USD charges without an e-mandate.
- **No image model renders Tamil text.** Prompts always say "no text"; all Tamil text goes on in the editor.
- **Animate only 3–5 character shots per Short.** Everything else gets push-ins, parallax or keyframed graphics. This is the biggest saving of both money and time.
- **PC needs:** Resolve requires 16 GB RAM and a 4 GB+ GPU. Otherwise use Clipchamp.
- **Bake-off weekend (12 tests, about ₹110) before paying for anything:**
  - Omni Flash with your own still
  - one Mani still through 2–3 video tools
  - Tamil text rendering in each editor's exported frame
  - the .srt round trip
  - the voice chain
  - Paati voice by ear
  - payments and e-mandate
  - where the AI label shows up

  Full list in toolstack report §"Bake-off day".

## 8. Production process and cadence

- **Per Short:** idea → 2 credible sources → one-line true takeaway written first → script (30–45 s of measured voice-over, the template beats; see kit/film-craft.md) → 8–12 shots → prompts (prefix + character add-on) → stills → 3–5 animated clips → VO → edit and captions → publish to YouTube first, then native uploads to Instagram and Facebook the same day.
- **Time:** about 5.3–6.5 hours per Short for the first 10, then 3.3–4.5 hours.
- **Cadence gate** (replaces the earlier 4–5 a week):
  - **Start at 2 a week.**
  - Go to 3 when the median of the last 4 Shorts is ≤4 hours.
  - Go to 4 at ≤3.5 hours.
  - 5 is a ceiling.
  - YouTube doesn't reward daily posting or posting at specific times.
- **Sunday review:** Viewed vs swiped away, average % viewed, engaged views, subscribers per 1K, Instagram sends per reach. Decision rules are in `kit/checklists.md` §E:
  - A weak hook means rewriting the first frame.
  - A Short at 5× the median gets 3 follow-ups.
  - A series is judged after ≥4 episodes.
  - Any health warning pauses health topics.

## 9. Corrections made along the way (don't repeat old versions)

| Old claim | Correct version |
|---|---|
| Post 1 Short a day / 4–5 a week | Start at 2 a week, then the time gate |
| "No music = more revenue for you" | Your 45% is unaffected; avoid music for claims and cross-posting reasons |
| Keep captions out of the bottom 20% | Safe box x 90–918, y 260–1470 (bottom 450 px clear) |
| Animate 4–8 shots | Animate 3–5; the rest are graphics or camera moves |
| CapCut as the editor | Blocked in India; use DaVinci Resolve |
| The Feb 2027 YPP change is unverified | Confirmed by multiple outlets |
| The July 2026 policy "restructure" | Wording reorganised only; no practical change |
| City series = "Madurai la mattum…" fact lists | One "why is X like this?" question per city |
| @YENAPPADI is an active Tamil explainer competitor (§11) | 2026-11-14: its 33.7K subs come from 2017–18 pregnancy/gossip videos; it has no Shorts and its one new explainer has 39 views. The name is still taken, but it is not a benchmark |
| "Human-body animation is under-supplied in Tamil" | 2026-11-14: out of date; supply grew through 2026 (Roo, AI2Learn, Healthix and others) |

### 2026-11-14: animated-shorts teardown (headline findings)

Notes: `research_notes/Animated shorts repo teardown/` (5 files). Rules distilled into `kit/film-craft.md`, which also lists the open decisions for Vasanth (Mani's colours, volume, topic mix, packaging, music level, rim light, squash/stretch).
- **Real Tamil benchmarks:** Roo Explains (243K subs, best Tamil median ~205K, health habits as comedy, named character), AI2Learn (69K subs from 37 videos, median ~149K, "X ஏன் வருது?" body questions) and Chitti – Tamil (576K, local "unnoticed things" at 117K–299K). Only Chitti and Roo are animated Tamil explainers above 100K.
- **Body and daily habits dominate** every strong Tamil median; city/local topics cap lower. Suggested mix: about 3 in 4 body/habit with a Tamil home angle (Vasanth to decide). On hold since 2026-11-18: test 2 body + 2 city Shorts first (`research_notes/Gap review 2026-11-18.md`, gap 7).
- **Volume:** winners post a lot (Zack ~5/day, Tamil winners 1–3/week) and one hit can make a channel, but volume without topic strength gets nothing. The teardown suggests 4–5/week; the §8 time gate still stands until Vasanth decides.
- **"Why" niche is crowding:** three "Yen Theriyuma" channels launched in Oct 2026. Nobody in Tamil uses a verdict stamp, so it remains our point of difference.
- **Craft:** measured numbers from a top animated channel (camera moving ~90 % of the time, slow constant push-ins, reactions ~2 frames before the word, music stopping on the pivot word, ambience always on) now sit in `kit/film-craft.md`, with an ep 02 gap scorecard. Ep 02's loudness, tone and SFX density already match; its main gaps are a still camera (~38 % of runtime), the surprise arriving at 6 s instead of sentence 1, and a sting on the key word.

## 10. Episodes produced

| # | File | Series | Status |
|---|---|---|---|
| 01 | `episodes/01-kaal-maraththu.md`: "கால் மரத்துப் போனா உள்ள என்ன நடக்குது?" (nerve pressure → pins and needles; NHS + neurologist sources; Tamil demand 290K–3.3M views, but all remedy videos, no animated explainer) | Body | scripted |
| 02 | `episodes/02-pondy-grid.md`: "பாண்டி தெருக்கள் ஏன் chess board மாதிரி?" (grid first on Dutch 1693–94 maps, completed by the French; the canal was a drain that also split the French and Tamil towns) | City | scripted |

## 11. Open items (Vasanth decides)

- ~~Channel name~~ **Decided 2026-11-13: "Adhu Yen?" (அது ஏன்?), handle @adhuyen.** "Yen Appadi" was rejected because the name is taken by @YENAPPADI (33.7K subscribers from old 2017–18 videos; renamed "Yen Appadi?" in 2026, no Shorts, so not a real Shorts competitor — see the 2026-11-14 teardown — but the name clash still matters). Also rejected: Unmaiya? (taken), Yen Ippadi? (taken), Yen Theriyuma? (taken), Appadiya / Edhukku (several channels with the same name). Before naming anything new, check the YouTube handle and channel search for collisions.
- The final names of Mani and Paati.
- Series label wording, for example "உடம்பு" for the body series.
- Whether a borderline health topic goes ahead (decided case by case).

## 12. Next steps (in order)

> **Current next steps and open decisions live in [`STATUS.md`](STATUS.md) (2026-11-14).** The list below is the original plan.


1. ~~Pick the channel name~~ Done: Adhu Yen? (@adhuyen). Still to do: confirm @adhuyen is free on Instagram, Facebook, X and Threads.
2. Run the **bake-off weekend** (toolstack report). Fill in the "Bake-off date / stack chosen" line in style-sheet §7.
3. Make the **Mani and Paati reference packs** and save them to `kit/characters/v1/`.
4. Buy the Fifine K669B and record the 30-second voice test.
5. Create the YouTube Brand Account (not made for kids, Tamil default), the Instagram Creator account and the Facebook Page, and link them.
6. Make pilots 01 and 02, then judge them against `kit/checklists.md`.
7. Publish at 2 a week, and run the Sunday review with `kit/metrics-sheet.csv`.

## 13. Tools on the original laptop (for reference)

- **yt-dlp** (2026.10.26): read titles and view counts only, e.g. `python -m yt_dlp --flat-playlist --print "%(view_count)s|%(title)s" "<channel>/shorts"` or `"ytsearch15:<query>"`. Never download or re-upload others' videos.
- **Claude Code skills used:** `tamil-shorts-producer` (in this repo), plus the social-media skills plugin (youtube-shorts, hook-writer, short-form-video-script and others) and deep-research.
- The YouTube pages in the in-app browser sometimes render blank; yt-dlp is the reliable fallback.
