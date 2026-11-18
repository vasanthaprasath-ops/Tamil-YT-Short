# Ep 03 voice

Active: `vo.mp3` = Vasanth's take from the ElevenLabs web app (`takes/v51-v4-ui.mp3`): Prashant V, Eleven v4, stability 50, similarity 75, script v5.1 with the delivery-map v2 tags (one base tone + 3 accents). No post-processing. Mix speed 1.1x (`TEMPO` in make-audio.js) = 42.2 s film.
Timings: the web app gives no timestamps, so `vo/align-from-silence.cjs` matched the take's pauses to the 20 sentences (one extra split at "விஷயம் என்னன்னா,") and spread words by syllables (about +-0.15 s inside a sentence).
Measured: about 8 s of pauses over 0.25 s in the raw take; speech rate 6.2 syllables/s overall at 1.1x (7.1 inside sentences). Target 7-7.5 (film-craft §1.7).
Older: `takes/v5-t1.*` = the v3 API take (monotone, not used).
