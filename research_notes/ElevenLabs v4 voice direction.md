# ElevenLabs Eleven v4: directing emotion line by line (researched 2026-11-18)

Sources: [Eleven v4 docs](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/eleven-v4), [Prompting Eleven v4](https://elevenlabs.io/docs/best-practices/prompting/eleven-v4), [Emotional TTS with v4 (blog)](https://elevenlabs.io/blog/emotional-text-to-speech-with-eleven-v4), [v4 launch page](https://elevenlabs.io/v4). Released 2026-09-28; model IDs `eleven_v4` (quality) and `eleven_v4_turbo` (low latency). Tamil (`ta`) is supported; both are on our account.

## How it works
- **Audio tags** in square brackets, inside the text, before the clause they shape: `[curious]`, `[excited]`, `[sarcastic]`, `[mischievously]`, `[whispers]`, `[sighs]`, `[laughs]`, `[worried]`, `[reassuring]`… The list is open: plain descriptions also work (`[lowers voice, mysterious]`, `[quick, light, playful pace]`).
- An emotion carries across the rest of the line once started; to change it mid-sentence, add a new tag at the new clause. One emotion per phrase; mixing opposite emotions in one sentence lowers accuracy.
- v4 also infers emotion from the words, so well-written lines need fewer tags.
- Pauses: no SSML. Use `…`, punctuation, or `[pause]` / `[long pause]`. Exclamation marks add intensity; ALL CAPS adds emphasis (Latin script only, so not for Tamil words).
- Settings: lower stability = more varied, expressive delivery; higher = steadier. No numbers are published. Style and speed sliders are not available in v4 (docs conflict on speed; we set the pace in the mix with `atempo`).
- Limits: tag-following is "not perfect"; a vague tag can be read as a sound effect, so describe the voice quality; re-test after model updates.

## Our test (ep 03, 3 lines, stability 0.35, 277 characters)
- **English tags inside Tamil text work:** they are not spoken. In the `with-timestamps` alignment each tag appears as text with a ~0.1 s duration (`[laughs]` 0.6 s, a real laugh), so `make-audio.js` must strip bracketed tags before building captions and word times.
- **Livelier, measured with `kit/tools/pitch_check.py`:** pitch spread rose from 9.6 to 12.1 semitones; the hook's surprise line peaks on the right word (எதுவுமே, not அப்படி) with 10.9 st of range (v3: 7.0).
- **Still wrong:** the twist peaked on வீட்டு, not மொக்கை. Fix by placing a tag right before the word to stress.
- **Slower:** the 3 lines took 14.5 s against ~11 s in v3, about 30 % longer. A full script would run about 49 s at 1.04×, over our 45 s limit. Use a pace tag (`[quick, lively pace]`), fewer `…`, or a slightly faster mix.

## How to use it on our Shorts
1. Write the script first (natural Tamil). Set ONE base tone tag at the very top (e.g. `[warm, curious, conversational storyteller, quick pace]`), then at most 2–3 short accent tags where the story turns (surprise, rehook, twist). A tag on every sentence made ep 03 sound like a roller coaster (Vasanth, 2026-11-18): one emotion per video (rule 21), energy in a narrow band.
2. Put a tag right before the one word that must peak.
3. Only when Vasanth says to generate: test 2–3 key lines first (about 100 credits), run `pitch_check.py`, and listen, before the full take.
4. Full take with `MODEL=eleven_v4`, then strip tags from the alignment for captions.

## Added 2026-11-18: delivery research for the emotion map
- **Top creators' tempo:** no study links a speaking rate or vocal energy to Shorts retention; published numbers are practitioner guesses (140–190 English words a minute; 200+ becomes hard to follow on phone speakers). Words-per-minute does not transfer to Tamil. Our rule: ≤ 3.6 s a sentence, pauses over 0.25 s ≤ 1 s per 40 s (film-craft §1.7–1.8). Speed: about 7–7.5 syllables a second as a guide, Vasanth's ear decides (see "how fast top Shorts narrators speak" below; this replaces the older "about 5.8 syllables a second, never speed up" rule).
- **Pauses:** practitioners keep 0.2–0.4 s breaks between ideas and cut hesitations inside sentences; a longer pause only before a reveal (no data, matches our think-pause rule).
- **Expressiveness:** research on talk videos uses pitch variation (more than tempo) as the measure of an expressive voice ([arXiv 2606.28531](https://arxiv.org/pdf/2606.28531)). That is what `kit/tools/pitch_check.py` measures.
- **Jenny Hoyos:** the voice-over tells one story while the picture tells another ("dual narrative"); conflict with "but/so". Nothing published on her vocal energy.
- **Tamil intonation ([Keane 2006](https://www.isca-archive.org/speechprosody_2006/keane06_speechprosody.pdf), Madurai Tamil, 18 speakers):** a ஏன்/என்ன question is not marked by a final rise. The question word gets a raised pitch peak, and the words after it are compressed. So in our scripts the stress goes on ஏன் / என்ன, and the line does not need to rise at the end. Yes/no questions (…-ஆ?) may still rise; the evidence there is thin.
- **The voice itself limits the emotion:** v4 follows tags less well when the voice was not trained on that delivery. Prashant V is listed as "Calm" (conversational). More expressive male Tamil voices in the library, by use in the last year (preview clips are free to play):
  - Kathiravan – Playful and Exaggerated (social media) — [preview](https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/oJtqFwbHKS0pFD03MNRd/y0y2BorR9kJtHYTV0yye.mp3)
  - Ashwin – Casual Tamil Social Creator — [preview](https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/OP382u5y4MvFmE1mReFV/rccgxoW9fDfX7aETB3Ue.mp3)
  - Aarumugam – Expressive and Engaging Narrator — [preview](https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/yrFqUM5ku2rYJCdiBKFU/My2vuPqW5YMTAcMfHn6f.mp3)
  - Srivatsa – Energetic Social Media Voice — [preview](https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/X7Nmzx8hn3qOAZD8GnBn/beupPh4Cx8twK6y6sbLH.mp3)
  - Muthu – Narrative, Calm and Informal (lively, youthful) — [preview](https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/gJvkwI7wGFW2czmyfJhp/JgCM4B5PjDYK8E2vgAn1.mp3)
  Changing the voice changes the channel's sound from ep 01–02; Vasanth's call.

## Added 2026-11-18: how fast top Shorts narrators speak (measured)
Method: each Short played silently in the browser; loudness peaks in the 300–3000 Hz band counted as syllable beats; calibrated on our own ep 01 render (true 6.06 syl/s read as 4.01 peaks/s, so ×1.49). Rough, ±15 %; background music can add or hide beats. No video was downloaded.

| Short | Views | Syllables / s |
|---|---|---|
| SJ Tamil, "சவுதி அரேபியா ஒட்டக விருந்து" | 3.1M | ~8.3 |
| SJ Tamil, "Vascular corrosion casting" | 3M | ~8.5 |
| SJ Tamil, "ஏன் ஒட்டகங்களுக்கு தண்ணீர் கொடுக்க கூடாது" | 2.2M | ~8.2 |
| Zack D. Films, "How A Hidden Bookshelf Door Works" (English) | 1.4M | ~4.8 |
| Our ep 01 (published), Prashant V at 1.04× | — | 6.1 (counted from the text) |
| Our ep 03 v5 take at 1.04× / 1.10× / 1.15× / 1.20× | — | 6.6 / 7.0 / 7.3 / 7.6 (counted) |

- The top Tamil facts narrator speaks about 25 % faster than our takes. English syllable rates are lower for every speaker (more information per syllable; Coupé et al. 2019), so the old comparison with the English reference wrongly told us not to speed up.
- Target: about 7–7.5 syl/s, below SJ Tamil's human pace because an AI voice blurs words when pushed, and older viewers need clarity. Trim inside-sentence pauses and words first; then the mix speed.
- Two measured DK IN FACTS Shorts gave ~1.3–1.6 syl/s: almost no narration, music-led, so not comparable.
