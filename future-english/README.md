# Future English videos: parked toolkit

**Status: parked.** The channel is Tamil-only for now (2026-11-14). Vasanth may make English videos later. Nothing here is active: these skills are **not** installed in `~/.claude/skills`, and the Tamil workflow (`skills/tamil-shorts-producer`) doesn't read this folder.

Everything in the two subfolders is copied unchanged from Jake Schincariol's MIT-licensed packs (licence files included):
- `instagram/` from https://github.com/Jakeschincariol/instagram-agent-skill
- `youtube/` from https://github.com/jakeschincariol/youtube-agent-skill

## What is here and why

| Item | What it does | Why it is English-only |
|---|---|---|
| `instagram/ig-reel` | A Reel script from 26 hook formulas (`hooks.json`), a hook scorer (`hookscore.py`) and a timed beat sheet (`beats.py`) | The formulas and scorer match English patterns; the beat timer assumes 165 English words a minute |
| `instagram/ig-human` | Strips stock "AI-sounding" words, em dashes and invisible characters from a draft (`humanize.py`), and scores it (`detect.py`) | The 154-term word list is English. It also deletes every invisible Unicode format character, which Tamil text sometimes needs for correct letter shapes, so **never run it on Tamil** |
| `instagram/ig-repurpose` | One long video into a week of Reels and carousels | Useful once there is long-form English material |
| `instagram/ig-carousel` | Swipe posts: cover, slide copy, sizes | A format we don't make yet |
| `youtube/yt-script` | A YouTube script from 21 hook formulas, with the hook scored | English patterns |
| `youtube/yt-shorts` | Finds the Shorts inside a long video | Needs long-form video |
| `*/voice-template.md` | The voice profile every skill reads | Fill one in for the English channel first |

## What is already usable for English from our own kit

Our rules are language-neutral except where they say "Tamil":
- `research_notes/Shorts scriptwriting craft.md`: rules 1–23 (hooks, but/therefore, contrast, repeaters, walkaway value).
- `kit/film-craft.md`: camera, sound and QA rules. Its pacing rule is in seconds, so it carries over; only the "Tamil analogy" beat changes to an analogy the English audience knows.
- `kit/tools/` and the film's `vo/tighten.mjs` and `vo/splice.mjs`: language-neutral.
- The script-lock rule: lock the script with Vasanth before any voice is generated.

## What the scorers can and can't do (the author's own test)

- The hook scorer **catches bad hooks** (greetings, preambles, nothing concrete): AUC 0.83 against deliberately bad hooks.
- It **does not pick winners**: separating one creator's hits from their misses gave AUC 0.56, where 0.50 is a coin flip. Only the specificity check separated the two groups.
- So: use it to kill weak hooks before recording, then trust the retention graph.

## To activate later

1. Decide the English channel's promise, audience and voice; fill in a `voice-template.md` and save it as `~/.claude/instagram/voice.md` / `~/.claude/youtube/voice.md`.
2. Copy the skill folders wanted into `~/.claude/skills/` (`yt-script` and `yt-shorts` are already installed there with the rest of the YouTube pack).
3. On this Windows laptop run the tools as `python -X utf8 <tool>.py`, because `python3` opens the Microsoft Store.
4. Check the platform numbers again (hashtag cap, caption cut-off): they go stale.

## Installed now, for the Tamil channel

In `~/.claude/skills`: all 11 `yt-*` skills, and `ig-caption`, `ig-profile`, `ig-audit`, `ig-viral`, `ig-reply`, `ig-comment`. Left out as not fitting a faceless explainer channel: `ig-dm`, `ig-story`, `ig-plan`.
