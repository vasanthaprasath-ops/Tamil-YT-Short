---
name: tamil-shorts-producer
description: Produce one Short for Vasanth's faceless, AI-animated Tamil YouTube Shorts channel end to end — topic check, fact research, Tamil script, shot list, AI image/video prompts in the channel's fixed style, title, description and publish checklist — and log it. Use this whenever Vasanth asks for a new Short, episode, script, shot list, image prompts, titles, or "next video" for his Tamil channel, mentions Mani, Paati, the verdict stamp (UNMAI / PAADHI UNMAI / POI), "Paati sonnadhu unmaiya", the city "yen?" series, or the title bank — even if he doesn't say "skill" or "Short".
---

# Tamil Shorts Producer

You produce one finished, ready-to-make package for a single Short. Every project file lives in the **project repo**: the folder two levels above this skill (this skill sits in its `skills\tamil-shorts-producer`). On the current laptop that is `D:\Shorts\Tamil-YT-Short`. All paths below are relative to it. Save any new file there and nowhere else.

## Read first (every time)

1. `kit\style-sheet.md`: the fixed look, characters, prompt prefix, voice and captions. Follow it exactly. A consistent look is how viewers recognise the channel.
2. `kit\script-template.md`: the beat structure and a worked example.
3. `kit\title-bank.md`: pick from here unless Vasanth names a topic, and update the status afterwards.
4. `kit\film-craft.md`: script, camera, acting, lighting and sound rules with measured numbers, plus open decisions for Vasanth (don't apply those).
5. `reports\Short form video craft playbook.md`: which craft rules have evidence and which are folklore.
0. `kit\checklists.md` section 0, **Defaults for every new Short**: the fixes learned on ep 01–03. Apply them in the first draft, not after Vasanth's notes.
6. `kit\improvement-log.md`: the "Carry forward" list. Every episode must close at least one item and beat the last episode somewhere (script, hook, voice, animation, sound or packaging). Log what changed in the episode's entry.

Read `reports\Short video formats that work.md` only when you need the reasoning behind a rule, or the series ranking. The competitor numbers are in `research_notes\Animated shorts repo teardown\competitor_gap.md`.

## Workflow

1. **Pick the topic.** It must pass the filter: is it on a Tamil viewer's body, in their house, on their street, or in their family's memory? Avoid god, temple, ritual, astrology and drishti claims, and contested caste or political history. Those topics carry misinformation and backlash risk the channel chose not to take. Guidance, not a hard rule: in Tamil, body and daily-habit topics with a home angle reach far more people (Roo Explains and AI2Learn medians 150–200K) than city or local topics (around 100–300K even on a 576K channel), so lean about 3 in 4 toward body/habit. The final mix is Vasanth's call.
   - **Where to look for topics:** videos that beat their own channel's normal by a wide margin (several times its median, or views 10× its followers), from creators who do it repeatedly, in any language. Tear each one down (hook, purpose, structure, key words, psychology, shared patterns) and adapt the **idea** to a Tamil home, street or family: new angle, new "who is it for", a new hook in spoken Tamil. Never translate a script or reuse footage, and re-source every fact. Method and limits: `research_notes\Shorts scriptwriting craft.md` rules 24–26; tools: `/yt-viral`, `/ig-viral`.
2. **Research.** Find two independent credible sources, using web search. For health topics use WHO, ICMR, MoHFW, NHS, NINDS or peer-reviewed work. Write the **one-line true takeaway** before anything else, because the script is built to land on it. If the evidence is mixed, say so; PAADHI UNMAI is an honest and often the best verdict. Never give UNMAI to a remedy that contradicts health-authority guidance. YouTube's medical-misinformation policy issues strikes for that.
3. **Script.** Write the hook and the last line first, then the middle. Follow the template beats (details and evidence in `film-craft.md` §1):
   - **Map the contrast before writing:** the viewer's common belief → the true, sourced reality that breaks it → one quick proof or plain example. The bigger the gap, the stronger the curiosity. Never invent a contrarian claim to create a gap.
   - **Sentence 1 states the surprise as a fact**, not a question (the belief or fact plus what breaks it), landing by second 3. The Tamil question stays on screen from frame 0. The bolder the claim, the faster its proof: give it within ~5 s.
   - A **foreshadow** line: what the viewer gets by the end (the guess beat does this in the Paati series).
   - **At least 3 escalation beats**, each a "but" or "therefore", one of them an exaggeration joke. Exactly **one mystery beat** (a question to the viewer) before the reveal, at about **40–55 %** of runtime. It is the rehook: it names this video's next thing, never "கடைசி வரைக்கும் பாருங்க". Rehook lines in Tamil: rule 28 of the research notes.
   - **Mark the answer line.** The line that answers the hook's question sits in the last third. The hook states the surprise, never the why; if the answer comes early, move it and put a question in its place.
   - **Check every hook option before showing it:** the four failures (delay, confusion, irrelevance, disinterest), the stay-or-swipe panel, and no swipe words or invented authority (rules 30–32).
   - After the reveal, one **mechanism line with an everyday Tamil analogy**, opened with "ஏன்னா…" or "விஷயம் என்னன்னா…" (kitchen, kolam, bus, cricket, Paati's house), at about 55–65 % of runtime.
   - The **last line is the surprising or ironic twist**, and the video ends on its last word. No recap, no outro. In the Paati series that twist is still the fact.
   - **Say the key fact twice:** once plainly, once with the Tamil analogy. Say the myth only once, because repetition makes anything feel true.
   - **One target emotion** per video (surprise, awe, mild worry, joy). Choose the words, visuals and sounds for it. Never manufacture fear, above all on health topics.
   - **Walkaway test:** after one watch, can the viewer tell the fact to their family in one sentence? If not, simplify.
   - **Pace in seconds:** 30–45 s measured voice-over, ≤ 3.6 s per sentence, pauses over 0.25 s adding up to ≤ 1 s per 40 s. Mostly short sentences with a few medium ones; never all the same length, never run-ons. Speed: about 7–7.5 syllables a second is a guide only (top Tamil facts channel ~8.3); Vasanth decides by ear, and natural pauses win over a rushed feel (ep 03). Tighten only when retention shows a drop in a pause.
   - **Audit before showing (every script, every version).** Fill a pass/fail table in the episode file against `film-craft.md` §1, `checklists.md` B and research-notes rules 1–33, with timings estimated from ep 01's rate (622 Tamil characters = 40.9 s; `|` marks a sentence break). Fix every FAIL first; mark any accepted NEAR with its reason. Vasanth skims, so the audit is the quality gate.
   - **Natural-Tamil pass (after the audit, before showing).** Read each line as a Tamil friend talking across the kitchen counter. Replace bookish or translated words: பொருள் → அது / chemical / மேட்டர்; குறைவான → கம்மி; தன்னை → (drop); …ஆகும் → …மாட்டீங்க / …போகும்; பொங்கி (for gas) → கிளம்பி. Prefer real idioms (தன் வேலைய காட்டுது, வெட்டி பாத்தாரு, என்ன தான்). Keep everyday English words people actually say (gas, chemical, helmet, second as செகண்ட்). One spelling style per script. Vasanth rejected ep 03 v4 as "machine made" for exactly these words.
   - **Re-check each fact and tip with a fresh search for newer studies before the lock.** Ep 03's "chill the onion" tip came from a health site but was overturned by a 2025 PNAS study; the script had to change.
   - Evidence and grades for these rules: `research_notes\Shorts scriptwriting craft.md` (rules 14–23 come from Kallaway's storytelling principles; 27–33 from rehook, hook-failure and story-format handouts).
   - Spoken colloquial Tamil, second person, written in Tanglish so Vasanth can read it aloud; every technical word explained in one breath. On-screen text in Tamil script. Paati series order: fact → myth mentioned once → why people believed it → fact. Ending on the fact matters because ending on the myth makes the myth what people remember.
4. **Shot list.** Plan the shots so a new framing, camera move or on-screen reveal comes at least every 2 s on average (a glide counts; a cut is not required), and every hold slowly pushes in. Shot 1 must show the thing happening. Name its visual hook from the menu in `research_notes\Shorts scriptwriting craft.md` (impending disaster, A vs B, crash zoom, whip, beat-matched switch) and don't reuse the previous episode's. Make the compositions different from recent videos. YouTube demonetises channels that look templated, and the rule applies channel-wide.
5. **AI prompts.** For each shot, write the image prompt as the style-sheet prefix, plus the character add-on if Mani or Paati appears, plus the shot description. Add a short image-to-video motion prompt (camera move and action) only for the **3–5 character-moment shots** worth animating. Mark every other shot as "push-in / parallax in Resolve" or "keyframed graphic". Video credits are the only cost that grows with output, and animating fewer shots is the biggest time and cost saver (see style-sheet §3b). Keep visuals stylised, never photoreal, so no AI label is needed. Write Mani's skin tone into every Mani prompt, because image models drift lighter.
6. **Packaging.** Write the title (Tamil-script question + 1 English keyword + 1 emoji + "| Series"), a description (takeaway, sources line, #tamil #shorts), and one pinned-comment question that asks for real information, such as "Unga paati idhukku enna solluvaanga?". Never use "comment YES / tag a friend"; Meta demotes engagement bait.
7. **Self-check.** Run through sections A–C of `kit\checklists.md` and fix anything that fails before presenting.
8. **Optional: build it as a code film.** Only when Vasanth asks for the VideoHub version instead of (or as well as) AI stills. Follow the `videohub` skill and `kit\film-craft.md`; the film gets its own folder in the VideoHub films folder (**start by copying ep 03**: `<VideoHub workspace>\films\03-vengaayam`, backup in the repo `films\03-vengaayam`; it has the parallax camera, drift, the redesigned Mani, measured cards and the timing tools; `hub_workspace` names the workspace, on the current laptop `C:\Users\vasan\Documents\VideoHub`). **Lock the script first:** the whole script (every line, the hook and the on-screen text) is agreed with Vasanth in one round before any voice is made. Never call ElevenLabs until Vasanth says so; he usually makes the take in the web app from the tagged script (checklists §0). A web-app take gets its word times from `vo/align-from-silence.cjs`. Record only the lines that changed (`vo/splice.mjs`, `vo/tighten.mjs`). Never loop between rewriting and re-recording. Order: record the voice as **one take with word timestamps** (`vo/script.json` → `vo/tts.mjs` → `alignment.json`), then cut and key every shot from those word times, then build the sound from the same times (`make-audio.js`), then run `node kit\tools\check-film.cjs <film folder>` and fix everything it fails (it includes the layout guard: no element may overlap another or leave the frame, `kit\film-craft.md` §7), then open it in VideoHub's **live preview** for Vasanth's notes. Render only when he asks.
9. **Save and log.** Save the package as `episodes\<NN>-<short-slug>.md`, numbering on from the highest existing file. Set the title's status in `title-bank.md` to `scripted`.

## Output format (episode file)

```
# <NN> — <Title>
Series: | Status: scripted | Date:
## Takeaway
## Sources
## Script (beat table: time | visual | on-screen text | VO)
## Shot list + prompts (shot | image prompt | motion prompt)
## Title / Description / Pinned comment
## Checklist result (A–C: any items needing Vasanth's attention)
```

## Things Vasanth decides, not you

- The channel name and the final names of the recurring characters. Use "Mani" and "Paati" until he changes them in the style sheet.
- Whether a borderline health topic goes ahead. Flag it with the reason; don't silently drop it or silently publish it.
- Publishing. You prepare the package; he records, edits and posts.
