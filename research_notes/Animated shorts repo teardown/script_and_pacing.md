# Script, story structure, pacing and cut rhythm: teardown of mromidev/claude-animated-shorts (2026-11-14)

Slice: script, story structure, pacing, cut rhythm. Repo files read in full: `SKILL.md`, `references/STYLE_BIBLE.md`, `templates/SCRIPT_example.md`, `references/reports/CONTEXT.md`, `references/reports/motion.md` (fetched; it holds the real camera numbers), `templates/bridge/story.ts`, `templates/audio/timeline.py`, `templates/scripts/short_qa.py`. I did not open the reference frames or contact sheets.

**What the repo's evidence is.** The author had agents measure 20 shorts (32,337 frames) from one top animated channel that the repo never names. It has 2D cartoon characters in 3D worlds, a male narrator and "You see" explanations. The measuring scripts are described but the data is private, so nobody can re-run the numbers. They are one channel's habits, not proof of what drives retention. The repo also contradicts itself in two places (camera "holds", and hard cuts), and both are flagged below.

Grades: **[MEASURED-in-repo]** = counted or measured from the 20 reference shorts. **[PRACTITIONER-DATA]** = a named creator with numbers. **[PEER-REVIEWED]**. **[OPINION]** = the repo author's or a creator's choice with no data. **[UNVERIFIED]**. **[INFERENCE]** = my reasoning.

---

## 1. Techniques found (with numbers and file references)

### 1.1 Script formula (`STYLE_BIBLE.md` "Script formula", `SKILL.md` step 2)
| # | Technique | Numbers | Source |
|---|---|---|---|
| S1 | **Hook = a paradox stated as fact in sentence 1, with no setup.** Three shapes: "a person did something dumb or impossible, with stakes", "If you X, you'd Y", "X is illegal, yet…" | 10–16 words; 20 of 20 videos follow the formula | STYLE_BIBLE |
| S2 | **Setting in 1–2 lines**, present tense, concrete (time of day, a named everyman, numbers) | 1–2 sentences | STYLE_BIBLE |
| S3 | **Escalation**: others doubt or mock (short in-character lines), stakes climb | 3–6 beats; 1–2 exaggeration jokes per video ("so slow X…") | STYLE_BIBLE |
| S4 | **Mystery beat**: a question or "Wait, …?" | about 1 per video | STYLE_BIBLE |
| S5 | **"You see," pivot** into the real mechanism, often through an everyday analogy ("Ever…?", "think about the last time…", "picture your body as…") | 14 of 20 videos | STYLE_BIBLE |
| S6 | **Ironic payoff** in the last 1–2 sentences, short. The video ends on the last word: no outro, CTA, logo or intro | voice starts at frame 1–4 | STYLE_BIBLE |
| S7 | Two modes: third-person story (a named everyman, present tense) or second-person "Imagine you're…" | — | STYLE_BIBLE |
| S8 | Sentences are plain spoken English with contractions. Jargon only if the next clause explains it | **~13.5 words median** per sentence | STYLE_BIBLE |
| S9 | Narration speed | **3.5–4.1 words/s, median 3.7** | STYLE_BIBLE |
| S10 | Almost no pauses | word gaps over 0.25 s add up to **under 1 s per video** | STYLE_BIBLE |
| S11 | Length | 31–78 s, **median ~60 s** | STYLE_BIBLE |
| S12 | Bridge beat template: Hook → Setting → Action (3–4 beats, each a bit bigger) → Snap → **deadpan double line "Luckily… / Unluckily…"** → Explanation via one everyday analogy → Consequence (the rule it created) → Callback twist | one film | SKILL.md step 2 |
| S13 | "Never describe on screen what the viewer already sees" | — | SKILL.md step 2 |
| S14 | "Jokes are researched real facts"; the voice keeps one steady tone | — | SKILL.md user rules |
| S15 | Every sentence is illustrated literally, and props carry the joke | — | STYLE_BIBLE "Picture" |

**The bridge script, measured** (`SCRIPT_example.md`, 14 lines, 206 words; film length 67.5 s = `TOTAL 2025` frames in `story.ts`). Where each beat starts, as a share of the words:

| Hook | Setting | Escalation (5 lines) | Snap | Luckily/Unluckily | "You see" | Analogy (swing) | Consequence | Callback |
|---|---|---|---|---|---|---|---|---|
| 0 % | 8 % | 17–45 % | 45 % | 52 % | **60 %** | 67 % | 85 % | 92 % |

- **The repo misses its own pace target.** 206 words over 67.5 s is **3.05 words/s**, not 3.7. The last word is probably before the end of the film (the crane pull-out runs to the end), but even with a ~1.5 s tail it is about 3.1–3.2 words/s. The script header also says "~55 s" while the film runs 67.5 s. Words per second is a loose target even in the repo's own proof film.
- Average sentence: 206 / 15 sentences ≈ 13.7 words, which matches S8.

### 1.2 Cut rhythm and camera (`motion.md` §2, `story.ts` header, `SKILL.md` "Camera")
| # | Technique | Numbers | Source |
|---|---|---|---|
| C1 | **Hard cuts are rare** in the reference. Most detected "cuts" were 4-frame flash effects | 0–1 hard cuts per video in 12 of 20 | STYLE_BIBLE |
| C2 | **Transitions are continuous camera moves**: follow an object from subject to subject, whip pans with motion blur, fly-throughs, or a crossfade when the place changes | crossfade 6–8 f | STYLE_BIBLE |
| C3 | **Camera moves often** | **6.0 moves per 10 s** (range 2.9–8), i.e. one every ~1.7 s | motion.md 2.1 |
| C4 | Frames that move vs hold | move (≥2 px/f at 720p) 65 %; drift 24 %; **dead still only 10 %** | motion.md 2.1 |
| C5 | **Symmetric ease-in-out glides**, not snaps | ~23 f total (10 f in, 10 f out); peak 13.7 px/f median (p75 24.6) at 720p; one move ≈ 101 px and 23 % zoom | motion.md 2.1 |
| C6 | **Every hold creeps in** | push-in 0.14 %/f median (p75 0.34); push runs median 35 f at 0.61 %/f (+22 %); 336 push-ins vs 180 pull-outs | motion.md 2.1 |
| C7 | Punch-word push | ~0.6 %/f for ~35 f | motion.md 5.1b, story.ts `pushK(..., 0.006, 35)` |
| C8 | Rolls (dutch tilt) on emphasis | 3.2 per 10 s; median 3.6° over 18 f | motion.md 2.1 |
| C9 | Whip pans are rare and always blurred | **0.45 per minute**; 45–93 px/f for 7–25 f, 2–3 f ramp | motion.md 2.1 |
| C10 | Impact shake | flips sign every frame, ~3 px at 720p, gone in 6–8 f; the push stops at the hit | motion.md 2.1, story.ts `KICKS` |
| C11 | No hand-held float | residual 0.08 px | motion.md 2.1 |
| C12 | Moves bigger than about half a frame width, or more than 40 % zoom, become a hard cut | rule derived from C5 | story.ts header, motion.md 5.1a |
| C13 | **Visual reactions land 0–3 frames before their word** | measured on 4 cases (−1, −3, 0, 0 f) | motion.md §3, SKILL.md step 4 |
| C14 | Background crowds freeze except on a cue | — | motion.md §3 |
| C15 | Glides are centred on the key word; a sound whoosh peaks there | — | story.ts header ([OPINION], "camera-to-word timing was not measured", motion.md 5.1a) |

**The bridge film's own rhythm** (`story.ts` SHOTS, CAMS, XFADE):
- 15 shots over 67.5 s, so **4.5 s per shot**.
- 33 camera framings over 67.5 s, so **one new framing every ~2.0 s**.
- That breaks down into about 17 hard cuts, 1 white flash (4 f, after the hook at frame 130), 6 crossfades of 6–8 f at place or time changes, and ~11 glides of 18–40 f.
- Hold push rate: 0.15–0.3 %/f.
- **Contradiction 1:** the bridge uses ~17 hard cuts, while the reference measured 0–1 per video (C1). motion.md *recommended* turning fast moves into cuts (5.1a), so the repo knowingly chose a cut-heavier grammar than its reference.
- **Contradiction 2:** STYLE_BIBLE says the camera "holds ~80 % of frames". motion.md re-measured with a sub-pixel method and found only 10 % dead still. motion.md says the older method was wrong. **Use motion.md's numbers.**

### 1.3 Captions and timing
| # | Technique | Numbers | Source |
|---|---|---|---|
| T1 | Reference captions: **one word at a time** (sometimes 2–3), white bold sans with a thin black outline, lower-middle (60–74 % of frame height), hard swap on each word | — | STYLE_BIBLE, CONTEXT.md |
| T2 | The repo's own rule: **no captions** in its films | — | SKILL.md user rules ([OPINION], user preference) |
| T3 | **Everything is timed to `words.json`** (word times from speech-to-text, then hand-fixed). Picture constants are locked before the sound is made | — | SKILL.md steps 3 and 8, timeline.py |

### 1.4 Audio pacing that touches the edit
| # | Technique | Numbers | Source |
|---|---|---|---|
| A1 | Loudness | −14 LUFS integrated, **LRA ~2.4 LU** (heavily compressed) | STYLE_BIBLE |
| A2 | Music and SFX bed sits **only ~5–10 dB below speech** | — | STYLE_BIBLE |
| A3 | Repo mix: music +3 dB, SFX −6 dB, voice unchanged | — | SKILL.md ([OPINION]) |

### 1.5 QA checks (`templates/scripts/short_qa.py`)
`short_qa.py` reads every frame at 180×320 and checks:
- **Specs:** size, fps, frame count, audio.
- **Loudness:** EBU R128 integrated, LRA and peak.
- **Silences:** at least 0.3 s below −45 dB.
- **Black frames:** mean luma under 0.04.
- **Unplanned white frames:** mean luma over 0.93, ignoring planned flashes and crossfades.
- **Frozen spans:** at least 12 frames in a row with a mean frame-to-frame difference under 0.02. SKILL.md: "flat holds read as freezes in QA… every hold needs a creeping push-in".
- **Pops:** a frame difference more than 3× the local median (±8 f) + 1, excluding planned cuts.
- **Motion share:** the share of frames that are "held" (difference under 0.3).
- **Per-shot colour stats:** luma mean, std, p2, p98 and saturation.
- **Contact sheets:** 2 s each, 60 numbered frames.

---

## 2. Validation

| Technique | Grade | Evidence and verdict |
|---|---|---|
| S1 paradox-as-fact hook | **[MEASURED-in-repo]** (one channel, 20/20) | Our playbook found no evidence for any hook *wording*. Vendor sets of 121k and 4.8k hooks show small effects, and the 10M+ Shorts use *fewer* questions. The repo **adds** a data point: one top animated channel uses statement-paradox hooks in 20 of 20 videos, and none open with a question. That is consistent with OverseerOS, not proof that statements win. |
| S2–S4 setting / escalation / mystery beat | **[MEASURED-in-repo]** counts, with soft labels (the beat boundaries were judged by an agent) | Fits Hoyos's "but/therefore" and "visible mechanism" ([Creator Science](https://creatorscience.com/podcast/jenny-hoyos/)) **[PRACTITIONER-OPINION]**. **Confirms** our rule 6. |
| S5 "You see," pivot + everyday analogy | **[MEASURED-in-repo]** (14/20) | No outside creator data. Analogy as an explanation aid is common teaching practice, but I did not fetch a study. **Adds** to our playbook, which has no "mechanism + analogy" beat. |
| S6 end on the last word, no CTA or intro | **[MEASURED-in-repo]** + **[PRACTITIONER-DATA, n=1]** | Matches Hoyos (cutting 1 s from an ending took retention from 83 % to 88 %) and Rusnok's Zack D. Films Stitches teardown (no loop, no CTA) ([Rusnok](https://danielrusnok.substack.com/p/how-a-faceless-channel-engineered)). **Confirms** our "cut within 0.5 s of the payoff". |
| S8 ~13.5 words per sentence | **[MEASURED-in-repo]** | English-specific. It converts to **~3.6 s per sentence** at 3.7 words/s, and seconds per sentence is the part that transfers. |
| S9 3.7 words/s | **[MEASURED-in-repo]** for that narrator; **[UNVERIFIED]** as a target | There is no retention link, and the repo's own film runs at 3.05 words/s. Words per second does not transfer across languages. Syllable rates differ widely between languages, while information rate stays near ~39 bits/s across 17 languages (Coupé et al., *Science Advances* 2019) **[PEER-REVIEWED]** ([CNRS](https://www.cnrs.fr/en/press/similar-information-rates-across-languages-despite-divergent-speech-rates); [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6984970)). Tamil was not in that study. A small thesis (3 speakers per language) found Tamil spoken faster than American English ([Missouri State](https://bearworks.missouristate.edu/theses/3020)) **[PEER-REVIEWED-thesis, tiny n]**. **Confirms** our playbook's "words/s doesn't transfer". |
| S10 pauses under 1 s per video | **[MEASURED-in-repo]** | No outside retention data. It is consistent with Hoyos's and Galloway's "remove dead time" **[PRACTITIONER-DATA]**. **Adds** a concrete number we lacked. |
| S11 median ~60 s | **[MEASURED-in-repo]** | A big, established channel. Galloway: longer average view duration went with more views, correlational **[PRACTITIONER-DATA]**. Hoyos's best ≈ 34 s. Our "30–45 s for a new channel" is **not contradicted**, because the repo's channel is established. |
| S12 Luckily/Unluckily double line | **[OPINION]** | The repo author's own device, used in one film. Not measured in the reference (which has 1–2 "exaggeration jokes"). |
| S13 don't narrate what's on screen | **[OPINION]** | Common craft advice; no data. |
| C1/C2 almost no hard cuts | **[MEASURED-in-repo]**, method not shown | The repo's own film ignores it. Outside data on cut rate and retention is **vendor-only** (claims range from a cut every 2–7 s, none with methods) ([Opus](https://www.opus.pro/blog/ideal-youtube-shorts-length-format-retention); [ClipFlip](https://clipflip.io/resources/how-to-make-viral-clips)) **[VENDOR/UNVERIFIED]**. **Contradicts** the folklore "cut every 1–3 s" and **confirms** our playbook's verdict on it. |
| C3–C6 a move every ~1.7 s, 10 % dead still, 0.14 %/f creep | **[MEASURED-in-repo]** (sub-pixel method, 32k frames; the best-documented number in the repo) | **Adds** the first frame-measured numbers for a top animated channel. Our playbook said "No public frame-by-frame cut count… exists". It **sharpens** our rule "no still sits still" into numbers. |
| C9 whips 0.45/min, always blurred | **[MEASURED-in-repo]** | **Adds**. |
| C13 reactions 0–3 f before the word | **[MEASURED-in-repo]**, only 4 cases | Weak sample. Cheap to follow. |
| C15 glide centred on the word | **[OPINION]** (the repo says so itself) | — |
| T1 one-word captions | **[MEASURED-in-repo]** | It **contradicts** our phrase captions only as a habit. Faster subtitles reduce comprehension **[PEER-REVIEWED]** (playbook), and Tamil words are long. Keep our 2–4-word phrases **[INFERENCE]**. |
| A2 bed only 5–10 dB under speech | **[MEASURED-in-repo]** | **Contradicts** our playbook's "−25 to −30 LUFS under a −14 voice", which was marked "no source fetched". The measured reference sits much louder. Pass this to the audio slice. |
| QA checks | **[OPINION]** (engineering) | The thresholds (12 f frozen, 3× median pop) are the author's own choices. The frozen-span check turns C6 into a test and is worth copying. |

---

## 3. Gap vs our ep 02 "pondy-grid" (numbers)

Measured from `02-pondy-grid/timeline.js` (word times from the voice) and `film.js` (camera code).

### 3.1 Pacing
| Measure | Reference / bridge | Ep 02 | Gap |
|---|---|---|---|
| Length | median ~60 s (31–78) | **39.1 s** | Fine for a new channel (playbook 30–45 s) |
| Voice starts | frame 1–4 (≤0.13 s) | 0.12 s | ✓ |
| Tail after the last word | ends on the last word | 0.50 s | ✓ |
| Words/s | 3.7 (bridge 3.05) | 2.44 | **Not comparable** (Tamil) |
| Syllables/s (rough) | ~5.2–5.6, my estimate from 3.7 words/s × ~1.4–1.5 syllables per English word **[INFERENCE]** | **~5.8** (counted by aksharas, a rough count) | Already as dense or denser. **Do not speed up.** |
| Seconds per sentence | ~3.6 s (13.5 words at 3.7/s) | ~3.0 s (13 sentences, 38.5 s of speech) | ✓ shorter |
| Pauses over 0.25 s | under 1 s per ~60 s | **2.15 s in 39 s** (0.67 s after the hook question, 0.59 s after the guess question, three of 0.30 s) | **~3–4× the reference rate.** About 1.1 s could go. |

### 3.2 Structure (start of each beat, as % of runtime)
| Ep 02 shot | Time | % | Reference role | Verdict |
|---|---|---|---|---|
| hook: "why are Pondy streets like a chess board, you know?" | 0–3.6 s | 0 | **Paradox as fact** | Ours is a *question* with no surprise in it. The actual paradox ("…the one who drew it wasn't French!") arrives at **6.0–8.6 s** (15–22 %). |
| foreshadow + "not French" | 3.6–8.7 | 9 | (setting) | A good foreshadow, but it carries the real hook |
| contrast (temple towns grow, Pondy didn't) | 8.7–13.2 | 22 | setting / escalation 1 | ✓ a "but" beat |
| ruler | 13.2–17.8 | 34 | escalation 2 | ✓ |
| guess: "who do you think?" | 17.8–21.7 | 45 | **mystery beat** | ✓ matches S4 |
| twist: Dutch, 1693 | 21.7–28.6 | 56 | (reveal ≈ "You see" at 60 %) | Good position. It answers **who**, not **why**. |
| french | 28.6–32.7 | 73 | consequence | ✓ |
| card: "In short… plan Dutch, built French" | 32.7–35.8 | 84 | ironic payoff | A **recap** ("சுருக்கமா"), not an ironic line. The playbook says no recap. |
| loop: "that's why every way you turn looks the same" | 35.8–39.1 | 91 | callback | A callback to the hook ✓. It restates rather than twists. |

Gaps in the script:
1. **No paradox in sentence 1.** The surprise ("the French town's grid isn't French") lands at 6 s instead of 0 s.
2. **No mechanism + everyday analogy beat.** Ep 02 never says *why* someone rules a town straight (easy to divide plots, defend, tax), and it has no analogy. A ready Tamil analogy is the **kolam pulli grid**: dots first, lines after, exactly "plan Dutch, built French". [INFERENCE]
3. **Escalation is 2 beats, not 3–6**, and has **no exaggeration joke** (the reference has 1–2).
4. **The ending is recap, then callback.** The reference ends on one ironic line. Ep 02 spends 6.4 s (16 %) after the reveal is complete.

### 3.3 Cut rhythm and camera
| Measure | Reference (motion.md) | Bridge | Ep 02 (from film.js) | Gap |
|---|---|---|---|---|
| Shots | — | 15 / 67.5 s = 4.5 s each | 9 / 39.1 s = **4.35 s each** | ≈ |
| New framing or camera move | **one every ~1.7 s** (6.0 per 10 s) | ~one every 2.0 s | ~12 events (8 shot changes + intra-shot reveals: the town-to-map move, the "ஆனா" wipe, the Dutch punch zoom, card step 2) = **one every ~3.3 s** | **About half the reference rate** |
| Hard cuts | 0–1 per video (12/20) | ~17 | 5 cuts (each with a 7 % punch-in over 0.18 s) | Between the two. Fine. |
| Whips | 0.45/min, 7–25 f, heavy blur | 0 | **2 in 39 s (~3/min)**, 0.22 s = 6.6 f, a 3-copy ghost instead of blur | **~7× too frequent** and too short |
| Crossfade | 6–8 f at place changes | 6–8 f | 1 fade of 0.25 s = 7.5 f (into the card) | ✓ |
| Hold push rate | **0.14 %/f median, 0.15–0.35 typical** | 0.15–0.3 %/f | ruler 5 % over 138 f ≈ **0.036 %/f**; french 4 %/124 f ≈ 0.032 %/f; card no push (0.8 % breathing); contrast none | **About 4× too slow.** Holds read nearly static. |
| Punch push on key words | ~0.6 %/f for ~35 f | yes | twist: 25 % in 18 f ≈ 1.4 %/f on "Dutch"; foreshadow map +6 % over 36 f ≈ 0.17 %/f | twist ✓ (strong); only one punch in the film |
| Ease | symmetric, ~23 f per move | smootherstep 18–40 f | cubic in-out stretched over the **whole shot** (3–7 s) | Speed falls to ~0 in the last ~10 % of each shot, which leaves a near-hold right before every cut |
| Reaction lead | 0–3 f before the word | yes | flag rip and cross fire at the word onset (0 f); captions lead 1.5 f | Edge of range. Shift by 2 f. |
| Rolls | 3.2 per 10 s, ~3.6° | 4–4.6° | the hook has a ±1.4° sine sway; no emphasis rolls | Missing |
| Captions | 1 word, hard swap | none | 2–4-word phrase plus a turmeric karaoke word highlight, 1.5 f lead | A deliberate difference; keep |
| QA frozen check | 12 f rule | run | not run on ep 02 | Add it |

---

## 4. Recommended rules for our skill (exact wording)

**Script**
1. "Sentence 1 states the surprise as a fact, not as a question: the Paati belief or the city fact, plus the thing that breaks it. The on-screen question can stay in the title text. The spoken paradox must land by second 3." **[MEASURED-in-repo, one channel 20/20; question vs statement is otherwise unproven]**
2. "After the reveal, one 'ஏன்னா…' / 'விஷயம் என்னன்னா…' line gives the mechanism through one everyday Tamil analogy (kitchen, kolam, bus, cricket, Paati's house). Put it at about 55–65 % of the runtime." **[MEASURED-in-repo, 14/20 'You see']**
3. "The middle has at least 3 'but/therefore' beats. One of them is a true exaggeration joke." **[MEASURED-in-repo 3–6 beats, 1–2 jokes; PRACTITIONER-OPINION but/therefore]**
4. "Keep exactly one mystery beat (a question to the viewer) before the reveal." **[MEASURED-in-repo]**
5. "The last spoken line is the ironic twist, and the video ends on its last word (≤0.5 s tail). No recap line ('சுருக்கமா…'). A callback to the hook is allowed only if it *is* the twist." **[MEASURED-in-repo + PRACTITIONER-DATA n=1]**
6. "Measure pace in seconds, never words. Target ≤3.6 s per sentence and one idea per sentence. Never speed up the voice: our Tamil already runs at about 5.8 syllables/s." **[MEASURED-in-repo for 3.6 s; PEER-REVIEWED that rates differ by language]**
7. "Pauses over 0.25 s add up to at most 1.0 s per 40 s. One deliberate think-pause (≤0.5 s) is allowed, after the mystery question." **[MEASURED-in-repo; the exception is OPINION]**

**Picture rhythm**

8. "A new framing, camera move or on-screen reveal at least every 2 s on average (reference: one every 1.7 s). A cut is not required. A glide counts." **[MEASURED-in-repo]**
9. "Every hold pushes in at 0.15–0.35 %/frame. Key words get ~0.6 %/frame for ~1 s. Never stretch one ease over the whole shot. Ease each move over 18–40 frames (0.6–1.3 s), then keep creeping." **[MEASURED-in-repo]**
10. "At most one whip pan per film, 7–25 frames long, with real directional blur. Use push-ins, follow-moves and 6–8-frame crossfades for the other transitions." **[MEASURED-in-repo]**
11. "Visual reactions (pops, rips, stamps) land 2 frames (~0.07 s) before their word in alignment.json." **[MEASURED-in-repo, n=4]**
12. "One emphasis roll of 3–5° on the twist beat." **[MEASURED-in-repo]**
13. "Keep 2–4-word Tamil caption phrases (the reference's 1-word captions suit short English words, not Tamil)." **[INFERENCE from PEER-REVIEWED subtitle-speed work]**

**QA**

14. "Before sending a film for notes, run a frozen-span check: no ≥12-frame run with a mean frame difference under 0.02 (at 180×320), plus a pop check (difference over 3× the local median, excluding planned cuts). Adapt `short_qa.py`'s frame-difference logic to VideoHub's preview." **[OPINION, cheap tooling]**
15. "Check the music bed level against the reference measure (5–10 dB under speech) before trusting the playbook's −25 to −30 LUFS. That figure has no source." **[MEASURED-in-repo vs UNVERIFIED]**

### Not copied, and why
- The bridge's ~17 hard cuts: they contradict the repo's own measurement. **[internal contradiction]**
- "3.7 words/s" as a target: English-only, and the repo's own film misses it. **[UNVERIFIED as a target]**
- "Luckily / Unluckily": a nice device but one film's invention. Try it once as an exaggeration joke. **[OPINION]**
- One-word captions and the repo's "no captions" rule: user preference in that repo. **[OPINION]**

Sources: [Coupé et al. 2019, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6984970); [CNRS press release](https://www.cnrs.fr/en/press/similar-information-rates-across-languages-despite-divergent-speech-rates); [Missouri State thesis, Tamil/Arabic/English speaking rate](https://bearworks.missouristate.edu/theses/3020); [Rusnok, Zack D. Films teardown](https://danielrusnok.substack.com/p/how-a-faceless-channel-engineered); [Creator Science, Jenny Hoyos](https://creatorscience.com/podcast/jenny-hoyos/); [Opus vendor blog](https://www.opus.pro/blog/ideal-youtube-shorts-length-format-retention); [ClipFlip vendor blog](https://clipflip.io/resources/how-to-make-viral-clips). Repo: github.com/mromidev/claude-animated-shorts (MIT).
