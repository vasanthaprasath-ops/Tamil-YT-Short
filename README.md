# Tamil YT Shorts — project hub

Everything for Vasanth's faceless, AI-animated Tamil YouTube Shorts channel, cross-posted to Instagram Reels and Facebook. It holds the research, decisions, production kit, a Claude skill, and the finished episode scripts.

**New laptop or new Claude session? Read [`STATUS.md`](STATUS.md), then [`PROJECT-CONTEXT.md`](PROJECT-CONTEXT.md).** It holds every decision, the reasoning behind it, and what's still open.

## What's where

| Path | What it is |
|---|---|
| [`PROJECT-CONTEXT.md`](PROJECT-CONTEXT.md) | Single source of truth: goal, vision, every decision (with dates and reasons), corrections, open items, next steps |
| [`zack-d-films-playbook.md`](zack-d-films-playbook.md) | Zack D. Films teardown (his top 48 Shorts), the extracted mechanism, title formula, early Tamil concepts and the first title batch |
| [`reports/Short video formats that work.md`](reports/Short%20video%20formats%20that%20work.md) | Research report 1 and the master operating plan: what works across platforms, the Tamil market, policy, money, ranked series, 90-day plan, metrics, risks, first-7-days checklist |
| [`reports/Tamil Shorts production toolstack.md`](reports/Tamil%20Shorts%20production%20toolstack.md) | Research report 2: the tool for every pipeline step (primary and backup), INR costs, the LEAN/STANDARD stacks, the bake-off test plan, time per Short, cadence gate |
| [`research_notes/`](research_notes/) | Raw sourced notes behind both reports (11 files) |
| [`kit/style-sheet.md`](kit/style-sheet.md) | **Fixed look**: clay-3D style, palette, characters (Mani, Paati, verdict stamp), image prompt prefix, voice, captions and safe box, sound rules, toolstack table |
| [`kit/script-template.md`](kit/script-template.md) | Beat structure (0–1 s thing happening → question → … → fact → loop) plus a worked example |
| [`kit/title-bank.md`](kit/title-bank.md) | 30 titles across 5 series, each with a status |
| [`kit/checklists.md`](kit/checklists.md) | Per-video checks: research, script, visuals, publish, Sunday review, cadence gate |
| [`kit/metrics-sheet.csv`](kit/metrics-sheet.csv) | Weekly metrics and per-stage time log |
| [`skills/tamil-shorts-producer/SKILL.md`](skills/tamil-shorts-producer/SKILL.md) | Claude Code skill that produces one full episode package |
| [`episodes/`](episodes/) | Finished episode packages: script, shots, AI prompts, title, description |

## Set up on a new laptop

1. Clone the repository:
   ```bash
   git clone https://github.com/vasanthaprasath-ops/Tamil-YT-Short.git
   ```
2. Make the skill available to Claude Code. Windows PowerShell, run from inside the clone:
   ```powershell
   New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\tamil-shorts-producer" -Target "$PWD\skills\tamil-shorts-producer"
   ```
   On macOS or Linux:
   ```bash
   ln -s "$PWD/skills/tamil-shorts-producer" ~/.claude/skills/tamil-shorts-producer
   ```
3. **The skill has absolute paths.** `SKILL.md` refers to `D:\Personal\Health\Records\...`. If the clone lives anywhere else, edit those paths in `SKILL.md` to point at the clone.
4. Open Claude Code in the clone folder and say: *"Read PROJECT-CONTEXT.md, then make the next Short"* (or name a title from `kit/title-bank.md`).

## Status

See [`STATUS.md`](STATUS.md): the current state, the open decisions and the next steps (updated 2026-11-14).
