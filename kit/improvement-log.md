# Improvement log: 1% better every video

Every episode must beat the last one somewhere: script, hook, voice, animation, sound or packaging. Before starting an episode, read **Carry forward** and close at least one item. After its numbers come in, write what worked against the previous episode.

Rules for improving:
- Improve at the right stage: wording before the script lock; voice fixes with free tools (pauses, emphasis, tone) before any re-record; animation, sound and layout after the voice. No loops on a locked script, no re-records for tiny gains (ElevenLabs credits).
- **One main change per episode**, named here before the build; everything else copies the previous film, so the numbers can tell us what helped. (Ep 03 changed five things at once.)
- Read every Short at 48 h and 7 days, into the `metrics-sheet.csv` columns (checklists §E).
- Compare on the same yardsticks: YouTube "stayed to watch" and average view duration, where the retention curve falls hardest, Instagram views and shares per viewer.

## Carry forward (open items)
| Area | Next 1% | From |
|---|---|---|
| Hook | **Ep 04's one change: the 2-second opening** (surprise spoken by 2.0 s, visible from frame 0; question on screen). Target: stayed-to-watch above ep 01–03's 42–43 % at 48 h | ep 01–02 numbers, gap review 2026-11-18 |
| Hook | Cut the first-6-s drop seen on ep 02's curve; compare ep 03's curve at the same second | ep 02 numbers |
| Packaging | Related video + series playlist on every Short (confirm ep 01–03 in desktop Studio); next question named in the pinned comment; ep 02 pinned on the Instagram grid | 0 follows from ~9,500 Meta views |
| Policy | Health guard on every உடம்பு episode; decide own voice vs Prashant V for the health series | gap review 2026-11-18, gap 3–4 |
| Animation | Still-camera share ≤ 8 % and no empty holds (ep 01 18.3 %, ep 03 4.9 % after notes; parallax + reframes every 1.3 s) | ep 01, ep 03 notes |
| Animation | Mani redesigned with hands and 4 expressions; stills shown before building | ep 01 notes |
| Animation | New visual-hook type each episode (ep 01 impending disaster, ep 03 misdirection reveal) | collections menu |
| Voice | Hook energy: ep 01's first take sounded flat; check pitch and emphasis on the hook and twist words before the mix | ep 01 voice notes |
| Voice | Ep 03 take v5-t1 measured monotone: 13 of 19 sentences peak early and fall 3-6 semitones; peaks on the wrong word in 4 lines (e.g. 'அப்படி' not 'எதுவுமே'). Volume emphasis can't fix pitch. Run `tools/pitch_check.py` on every take | ep 03 voice |
| Packaging | After upload, check the caption is present on YouTube, Instagram and Facebook (ep 01's Facebook copy had none) | ep 01 upload |
| Mascot | "Yen" question-mark mascot: stills for ep 04 | 2026-11-16 plan |

## Episodes
### Ep 02 — Pondy grid (published 2026-11-13; Instagram/Facebook 2026-11-14)
- Numbers at ~36 h: YouTube 168 views, stayed 42.2 %, avg 0:20 of 0:39. Instagram 6,360 views, Facebook 1,061; 46 shares, 107 likes.
- Worked: shareable local fact (46 shares). Fell short: steepest retention drop in the first ~6 s.

### Ep 01 — Kaal maraththu (published 2026-11-14)
- Improved over ep 02: paper cut-out look; layout guard (no overlaps); voice emphasis and tone fixed without re-recording; whooshes cut from 22 to 4.
- Numbers at ~16 h: YouTube 1,351 views, stayed 42.5 %, avg 0:23 of 0:41. Instagram 1,801, Facebook 291.
- Fell short: rehook at 60 % (target 40–55 %); still share 18.3 %; Facebook caption missing.

### Ep 04 — planned
- One change: the 2-second opening. Everything else copies ep 03's film.

### Ep 03 — Vengaayam (posted 2026-11-18)
**Everything below is now a default in `kit/checklists.md` §0, so ep 04 starts with it.**
- Script: Vasanth's searchable question hook + fact; interactive (guess, home test, twist that flips the hook, pinned-comment question); natural-Tamil pass (`helmet-லாம்`, `கழுவி விடுது`, `கம்மியா வரும்`); a 2025 study caught a wrong tip (fridge) before the voice; rule audit before showing.
- Voice: Eleven v4 made by Vasanth in the web app; one base tone + 3 accents (the every-line version was a roller coaster); pace measured against top Tamil channels (they speak ~8.3 syl/s, we were 6.6); free word timings from pauses (`align-from-silence.cjs`); new tools `syllable-rate.cjs`, `pitch_check.py`.
- Film: Mani redesigned; parallax + drift + reframes every 1.3 s (still share 18.3 % on ep 01 → 4.9 %); no empty holds; payoff objects claimed and on screen; comparison shot with real action; cards sized to their text; captions lowered; CSK colours without the trademark.
- Notes it took to get there: 5 (tear off-frame, word outside its pill, flat comparison, CSK helmet, empty cells grid) + "camera looks still". Target for ep 04: fewer notes.
- Improved already: hook is Vasanth's searchable question + a fact; rehook at ~43 %; answer in the last third; natural-Tamil pass (bookish words removed); every tip re-checked against newer research (the fridge tip was overturned by a 2025 study, replaced by the sharp-knife twist); pinned comment asks for viewers' own trick.
- Built 2026-11-18: Mani redesigned (hands, thicker brows, 8 moods, tears), still share 12.7 % (ep 01: 18.3 %), captions lowered so the props stay visible, voice from Vasanth's Eleven v4 take with one base tone + 3 accents.
- Review notes (3): tear off-frame, word spilling out of its pill, flat comparison shot. All fixed; the lessons are in film-craft §7.
- Still open: about 8 s of pauses in the take (overall 6.2 syl/s at 1.1x, target 7–7.5).
