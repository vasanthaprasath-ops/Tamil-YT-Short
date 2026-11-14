# Moving to a new laptop / new Claude account

Claude's memory does not travel to a new account. Everything a new Claude session needs is either in this repo or listed here.

## First message to the new Claude

> Read `NEW-MACHINE.md`, then `STATUS.md`, then `PROJECT-CONTEXT.md`. Set up the machine using the checklist, then save the "How Vasanth works" rules to your memory.

## How Vasanth works (copy into the new Claude's memory)

- **Never commit or push** unless the message explicitly says "commit" or "push it". Leave changes in the working tree.
- **Ask before publishing** any Artifact or posting anything online. Offer it in one line.
- **Explain unfamiliar tools** in one plain sentence before relying on them.
- **Ask when unsure** about anything that changes the result. Use one round of multiple-choice questions, with the recommended option first. Don't guess silently.
- **Reacts to what he sees**: put a real draft or preview in front of him early, then iterate.
- **Never write API keys to files or chat.** Set keys with `Read-Host` into a User environment variable.
- **All project files live in this repo folder** (scripts, research, reports, skills). Films live in the VideoHub workspace.
- **Script language**: spoken Tamil, the way people talk, with English words where Tamil speakers use them ("chess board", "map", "plan"). Hooks must sound natural, not written. He supplies his own hook lines often; adopt them.
- **Facts**: every claim needs a source, graded as in `reports/Short form video craft playbook.md`. No god/temple claims, no religious rituals in the first 30 days.
- **Script before voice**: lock the whole script (lines, hook, on-screen text) with Vasanth first; generate the ElevenLabs voice only after he says it's final. Before any voice call, state the credit cost and ask. One take, only the changed lines (`vo/splice.mjs`, `vo/tighten.mjs`). No rewrite → regenerate loops.
- **Videos made as code**: build in VideoHub, open with `hub_live`, let him leave notes, fix by editing code, render only when he asks, one render at a time. (Copy this rule into the new `~/.claude/CLAUDE.md`.)

## Setup checklist (Windows)

1. Install Git, Node.js LTS, Google Chrome, and ffmpeg (`winget install Gyan.FFmpeg`). Headless Edge does not work for renders; use Chrome.
2. Clone this repo. Keep the same path (`D:\Personal\Health\Records`) if you can, so paths in the docs stay valid.
3. Clone VideoHub (`https://github.com/TensaikunYT/Videohub`) to `D:\Personal\VideoHub` and follow its README: `npm install`, register the `videohub` MCP server and skill, set the workspace to `D:\Personal\VideoHubWorkspace`.
4. Make the channel skill load: create a junction from `~/.claude/skills/tamil-shorts-producer` to `skills/tamil-shorts-producer` in this repo:
   `New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\tamil-shorts-producer" -Target "D:\Personal\Health\Records\skills\tamil-shorts-producer"`
5. Install the `social-media-skills` plugin (youtube-shorts, hook-writer, short-form-video-script and so on).
6. ElevenLabs: revoke the old key, create a new one, then in PowerShell:
   `$k = Read-Host; [Environment]::SetEnvironmentVariable('ELEVENLABS_API_KEY',$k,'User')`
   The voice is Prashant V (`yIFUVClxedWzoMYhk15k`), model `eleven_v3`.
7. Restore the ep 02 film (next section). In its `.videohub/project.json`, fix the render env paths `CHROME` and `FFMPEG` to the new machine's paths.

## Files to copy by hand (not in GitHub)

| What | From the old laptop | Why |
|---|---|---|
| Ep 02 film media | `D:\Personal\VideoHubWorkspace\films\02-pondy-grid\vo\` (vo.mp3, alignment.json, takes) and `audio\` | The paid ElevenLabs voice take. Regenerating costs credits and gives a different read. |
| Ep 02 final video | `02-pondy-grid_v1.mp4` (in the film folder and `outputs\2026-11-13\`) | The upload file. |
| Whole film folder (simplest) | `films\02-pondy-grid\` minus `render\chunks*` | About 15 MB without the render chunks. |
| Channel Gmail recovery | Backup codes, passwords | Keep them in a password manager, never in this repo. |

Skip: `render\chunks*` (rebuilt on render), `node_modules` (reinstalled), old Claude session transcripts.
