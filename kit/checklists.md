# Checklists

The launch-week checklist is in the report: `reports/Short video formats that work.md`, section 11. This file covers the **per-video** checks you repeat every time.

Tool picks and the bake-off test plan (run it before paying for anything): `reports/Tamil Shorts production toolstack.md`. **Its cadence gate replaces the earlier 4–5 Shorts/week plan:** start at 2 a week, and run 3 series first, not 5.

## A. Before scripting (research)
- [ ] The topic passes the filter: is it on a Tamil viewer's body, in their house, on their street, or in their family's memory?
- [ ] The answer is "half-known" (peak curiosity), not something obvious and not something obscure.
- [ ] Two independent credible sources found. For health topics: WHO / ICMR / MoHFW / NHS / peer-reviewed.
- [ ] The one-line true takeaway is written down.
- [ ] Quick YouTube search for the same topic in Tamil, to see what already exists and do it better.
- [ ] No god, temple, ritual, astrology or drishti claim. No contested caste or political history.

## B. Script check
- [ ] The first frame shows the thing **happening**.
- [ ] Tamil question on screen from frame 0.
- [ ] Mute test: frame 0 plus the on-screen text alone name the subject.
- [ ] Visual, spoken and on-screen hooks say the same thing, and a foreshadow line lands by about 3 s.
- [ ] Measured voice-over 30–45 s. One idea per sentence, spoken colloquial Tamil, second person, every technical word explained in one breath or cut.
- [ ] Sentence 1 states the surprise as a fact (not a question), landing by second 3.
- [ ] Every body line is a 'but' or a 'therefore'. Cut every 'and then'. At least 3 escalation beats, one an exaggeration joke.
- [ ] Exactly one mystery beat (question to the viewer) before the reveal.
- [ ] A mechanism line with an everyday Tamil analogy ("ஏன்னா…") at about 55–65 % of runtime.
- [ ] The last line is the twist and the video ends on its last word. No recap.
- [ ] Pace: every sentence ≤ 3.6 s; pauses over 0.25 s add up to ≤ 1 s per 40 s. Sentence lengths vary (mostly short, some medium, no run-ons). Cut words before speeding the voice; any speed-up (≤ 1.08×) is Vasanth's call.
- [ ] Contrast mapped: common belief → true, sourced reality → one quick proof within ~5 s.
- [ ] The key fact is said twice (plainly, then with the analogy); the myth only once.
- [ ] One target emotion named for the episode; no manufactured fear.
- [ ] Walkaway test: the fact can be retold to family in one sentence.
- [ ] Script locked with Vasanth before any voice is generated.
- [ ] Paati series: guess beat early; order is fact → myth once → why people believed it → fact; the stamp matches the evidence.
- [ ] The final line and card state the **fact**, not the myth.
- [ ] Health: explanatory, not prescriptive; authority named; a "see a doctor if…" line where relevant.
- [ ] No source text read out word for word (that counts as reused content).
- [ ] The video ends within ~0.5 s of the payoff. No outro or spoken subscribe ask. A loop line is optional and untested.

## C. Visuals and edit check
- [ ] Every image uses the prompt prefix from `style-sheet.md`, plus the character reference pack.
- [ ] Mani's and Paati's outfits match the bible.
- [ ] Each still QA'd:
  - skin tone matches the sheet
  - outfit colours
  - moustache / spectacles / saree border
  - hands and finger count
  - no stray text
  - no Gemini sparkle or watermark in frame
- [ ] Two-shots checked for swapped outfit colours.
- [ ] Only 3–5 shots animated. The last frame of each clip checked for drift. Clip audio muted.
- [ ] VO run through Enhance, and the master is about −14 LUFS / −1 dBTP.
- [ ] A new visual at each new idea or sentence, and no still sits still. Shots are different from the last video's (no reused clip set).
  - the camera moves on ≥ 85 % of the runtime; a new framing, move or reveal at least every 2 s on average
  - holds push in at 0.15–0.35 % per frame (about 5–10 % per second), never eased to a stop; punch words about 0.6 %/frame for ~1 s
  - no wobble or float; at most one whip pan, with real motion blur
- [ ] No photoreal humans in realistic events. If any slipped in, turn on the altered-content toggle. In the city series, realistic place B-roll counts too, so disclose it.
- [ ] Tamil captions:
  - the text is the script, burned in, white with black stroke
  - shown as 2–4-word phrases timed to speech, not one word at a time
  - everything sits inside x 90–918 / y 260–1470, with captions in the band y 1150–1450
  - an exported frame is zoomed in, and கை, கொ and ஸ்ரீ are shaped correctly
- [ ] Frame 0 is a designed frame (no black or fade-in), with key content inside the centre 3:4 crop. The verdict sting is under 1 s, and nothing plays before the hook.
- [ ] No licensed music. Whoosh and sting come from the CC0 / self-made set, and every audio asset is in the licence log.
- [ ] Sound:
  - a whoosh on every camera move and transition
  - no loud hit on a key word (hits go in the gap after the line)
  - the music stops dead on the pivot word and returns after the answer lands
  - an ambience bed runs under every second (silence = no music, never no sound)
  - every boom still hits through a 300 Hz high-pass (phone speakers)
- [ ] Characters (when on screen):
  - a face whose expression changes is ≥ 25 % of the frame width
  - Mani's eyes, brows and mouth stand out from his skin (eye whites; ≥ 3:1 contrast)
  - blinks are staggered per character (never in unison), with a blink across each expression change
  - reactions start about 2 frames before their word; no always-on sway or nodding
- [ ] Verdict / takeaway card is readable as a screenshot.
- [ ] Length: measured voice-over 30–45 s by default (longer only when recent retention curves stay flat). Exported 1080×1920, clean master with no watermark.

## C2. Code film only (VideoHub)
- [ ] Every shot and sound is keyed from the voice's word times (`alignment.json`), not hand-typed seconds.
- [ ] QA run before sending for notes: no frozen run of ≥ 12 frames, no unplanned pops, hits on the contact frame or ≤ 1 frame early (never > 3 late), per-stem LUFS and voice margin printed. Details: `kit/film-craft.md` §6.

## D. Publish
- [ ] Title: Tamil-script question + 1 English keyword + 1 emoji + "| Series".
- [ ] Description: one-line takeaway, sources line, #tamil #shorts.
- [ ] Added to the series playlist; "related video" set to the series' best-performing episode (the previous episode until there's a clear winner). Once a series has 4+ episodes, register it as a Shorts series in Studio if the feature shows.
- [ ] Select frame 0 as the Shorts thumbnail and the Reels cover.
- [ ] Not made for kids. Altered-content toggle set correctly. Clips from Veo or Omni carry a permanent AI label in the expanded description; that's expected.
- [ ] Optional: English/Hindi dub uploaded as a multi-language audio track.
- [ ] YouTube first, then a **native** upload of the clean master to Instagram (try Trial Reels for hook tests) and to the Facebook Page, the same day.
- [ ] Never delete and re-upload a Short (YouTube may treat it as spam), and never re-upload a near-duplicate to test a hook.
- [ ] Pin a comment asking for real information, e.g. "Unga paati idhukku enna solluvaanga?". Never "comment YES / tag a friend".
- [ ] Reply to comments in the first hour (community building; no evidence it lifts reach).
- [ ] Log the time **per stage** (script, VO, stills, video, edit, publish) and the credits used in `metrics-sheet.csv`.

## E. Sunday review (30 min)
- [ ] Fill in `metrics-sheet.csv` for every Short from this week.
- [ ] Read each Short in three steps against your own median, using engaged views: stop (YouTube Viewed%, Instagram skip rate) → stay (where the retention curve drops) → share (sends/shares per reach). Add Instagram skip rate and share rate to `metrics-sheet.csv`.
- [ ] Apply the decision rules (report section 7):
  - Bottom-quartile Viewed% (or under 60%) → rewrite the first frame and line. Re-test only through Instagram Trial Reels, or YouTube's video-cut A/B test once Studio shows it. Never by re-uploading.
  - A Short at 5× the channel median → make 3 follow-ups on the same topic within 2 weeks.
  - Series judged only after ≥4 episodes. Top quartile on both Viewed% and subscribers per 1K → ≥40% of next month's slots. Under half the median after 6 episodes → drop the series.
  - Any health-policy warning → pause all health topics.
- [ ] Cadence gate:
  - Go from 2 to 3 Shorts/week only when the median total time of the last 4 Shorts is ≤4 h.
  - Go from 3 to 4 at ≤3.5 h.
  - Never go above 5.
- [ ] First Sunday of each month: check credit balances, renewal charges (Indian banks decline unmandated USD renewals) and GST invoices.
