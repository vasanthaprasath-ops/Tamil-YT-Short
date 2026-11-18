# Skills, MCP servers and repos worth using (checked 2026-11-18)

Nothing here is installed. Stars, last push and licence were checked with the GitHub API on 2026-11-18; nothing was run on Windows yet. Gap numbers refer to `research_notes/Gap review 2026-11-18.md`.

## Adopt now
| Tool | What it gives us | Checked | Risks / notes |
|---|---|---|---|
| [conorbronsdon/yt-analytics-mcp](https://github.com/conorbronsdon/yt-analytics-mcp) | Read-only YouTube Analytics API: engaged views, the retention curve (`audienceWatchRatio`, `relativeRetentionPerformance`), traffic source incl. the Shorts feed. Ends hand-reading Studio (gap 5). | 3★, MIT, pushed 2026-11-18 | Very few users: read the source before use. "Viewed vs swiped away" is **not** in the API; still read in Studio. Needs a Google Cloud OAuth app authorised on the Brand Account; in "Testing" mode the token expires every 7 days. |
| [adelaidasofia/instagram-mcp](https://github.com/adelaidasofia/instagram-mcp) | Official Instagram Graph API (no scraping): `reels_skip_rate` (skips in the first 3 s, our hook metric), views, reach, shares, saves, average watch time. | 20★, MIT, pushed 2026-11-17 | Also has publish/delete/DM tools: give it a token with only basic + insights scopes. Token stored in a plain file on Windows. `reels_skip_rate` is in Meta's changelog ([Instagram Platform changelog](https://developers.facebook.com/docs/instagram-platform/changelog)); secondary sources say it is "estimated and in development". No Facebook data. |
| [ElevenLabs Forced Alignment](https://elevenlabs.io/docs/capabilities/forced-alignment) | Exact word times from the take + locked script (Tamil supported); replaces `vo/align-from-silence.cjs` (±0.15 s guess). | Official API, our account | Costs credits (speech-to-text rate; exact cost for 45 s not published). Ask Vasanth before each call. |
| [HyperFrames motion reference](https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes/references/motion.md) | Measured motion rules (eases per move, arrivals and exits, motion-blur sizes) that carry over to `renderOut(t)`. | 86k★, Apache-2.0, pushed 2026-11-18 | Read and copy the rules with attribution; **don't install the skills** (usage telemetry, separate HTML/GSAP pipeline). |

## Try later
| Tool | Why | Checked | Risks |
|---|---|---|---|
| [DeepGaze IIE](https://github.com/matthias-k/DeepGaze) | Predicts where eyes land on frame 0 / 0.5 / 1 s, to check the eye goes to the contradiction and the question (gap 1) | 218★, pushed 2026-08 | **No licence file**; trained on photos, so compare our frames with each other only; downloads pickled weights |
| Instagram Trial Reels | A/B two openings on non-followers, compare skip rate | native | Needs about 200–1,000 followers (unverified) |
| [ctc-forced-aligner](https://github.com/MahmoudAshraf97/ctc-forced-aligner) | Free local Tamil word alignment (Meta MMS) | 576★, GitHub says BSD-2 | `pyproject` reportedly says CC-BY-NC (non-commercial): check before a monetised channel uses it; Windows build may need MSVC |
| [AI4Bharat IndicConformer 600M](https://huggingface.co/ai4bharat/indic-conformer-600m-multilingual) | Local Tamil speech-to-text to check a take says the script | MIT | Gated download; no documented word timestamps |
| [cyanheads/pubmed-mcp-server](https://github.com/cyanheads/pubmed-mcp-server) | PubMed / Europe PMC search for the "fresh search for newer studies" step | 168★, Apache-2.0 | — |
| [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | Motion-design notes | 3.3k★, MIT | UI-focused; overlaps installed `animate` / `emil-design-eng` |

## Rejected
WhisperX (no Tamil alignment model by default); Sarvam speech-to-text (no word timestamps); YouTube **Data** API skills (public counts only, no retention); other YouTube Analytics MCPs (0–5★ or stale); Meta TRIBE v2 (non-commercial research model); older saliency models (unmaintained); Remotion / motion-canvas skills (different pipeline); Theatre.js (inactive since 2024); GSAP (easing can be hand-written); loudness skills (renders already meet −14 LUFS / −1 dBTP); Instagram scrapers and cookie/password tools (break Instagram's terms). YouTube Audio Library music is reportedly YouTube-only, so cross-posted Shorts keep using CC0/CC-BY sound (`kit/tools/fetch_cc0.py`).

**TOKEN CUT:** for the weekly numbers, one ~50-line script calling the YouTube Analytics and Instagram Graph APIs into `kit/metrics-sheet.csv` costs no Claude round trips; the MCP servers are handier for ad-hoc questions.
