# Voice tools for a Tamil faceless animated YouTube Shorts channel (state as of 2026-11-04)

Notes by research subagent. "Accessed 2026-11-04" = page fetched or searched on that date; the vendor page itself was usually undated. Prices are USD unless the vendor showed INR. "UNVERIFIED" = came only from a third-party blog or aggregator, or sources conflicted. No Amazon.in or Flipkart product page was opened directly, so every mic price is a blog snapshot.

## 1. AI speech-to-speech voice changers (Paati lines: male Tamil voice to elderly female)

### Takeaway
ElevenLabs Voice Changer is the only option with an official language list that includes Tamil (`eleven_multilingual_sts_v2`, accessed 2026-11-04). It costs 1,000 credits per minute, so the $6/mo Starter plan (30k credits) easily covers 1–2 lines per Short. The free plan is out for a channel that plans to monetize: it allows no commercial use and requires "elevenlabs.io" in the video title. No source anywhere evaluated Tamil retroflex handling or male-to-elderly-female quality for any tool, so Vasanth has to judge that by ear.

### Cited Findings
**ElevenLabs Voice Changer (speech-to-speech)**
- `eleven_multilingual_sts_v2` shares the 29-language set of Multilingual v2, and that set includes Tamil (`ta`). `eleven_english_sts_v2` is English-only. Docs say the multilingual model "often outperforms" the English one even on English. (accessed 2026-11-04) — [ElevenLabs models](https://elevenlabs.io/docs/models); [ElevenLabs Voice Changer docs](https://elevenlabs.io/docs/capabilities/voice-changer)
- Voice Changer aims to keep the original performance: whispers, laughs, cries, accents and emotional cues. Max 5 minutes per segment. Optional `remove_background_noise=true`. Latency not stated. (accessed 2026-11-04) — [ElevenLabs Voice Changer docs](https://elevenlabs.io/docs/capabilities/voice-changer)
- Cost is 1,000 credits per minute from the shared monthly pool. Plans (USD only, no INR on the page as fetched, accessed 2026-11-04):
  - Free: $0, 10k credits
  - Starter: $1 for the first month, then $6/mo ($5/mo billed annually), 30k credits, adds the commercial license and Instant Voice Cloning
  - Creator: $11 for the first month, then $22/mo, 121k credits, adds 1 Professional Voice Clone
  - Pro: $99/mo, 600k credits
  — [ElevenLabs pricing](https://elevenlabs.io/pricing)
- Official help center: "The free plan does not include a commercial license and cannot be used for any commercial purpose." Free output must carry "elevenlabs.io" or "11.ai" in the title. "All paid plans include a commercial license, provided you're not using Beta Services". Output from beta features cannot be used commercially. (accessed 2026-11-04) — [ElevenLabs: Can I publish the content I generate?](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform)
- A third-party guide reads "commercial" as including a monetized channel. The official text just says "any commercial purpose". — [mrktcorrect: ElevenLabs free plan](https://mrktcorrect.com/blog/elevenlabs-free-plan) (UNVERIFIED interpretation)

**Voicemod (real-time desktop voice changer)**
- The free tier rotates a limited set of voices. Pro price conflicts across sources: ~$9.99/mo or ~$45 lifetime; ~$12/mo or ~$4.50/mo billed annually; $30–60/yr on promo. Pro is sold inside the app, not on the public site. No INR price found. (aggregators dated Feb–Jun 2026) — [Toolradar Voicemod pricing](https://toolradar.com/tools/voicemod-ai/pricing); [aitoolsatlas Voicemod pricing](https://aitoolsatlas.ai/tools/voicemod/pricing); [Capterra Voicemod](https://www.capterra.com/p/10015124/Voicemod/) (all UNVERIFIED)
- Commercial-use terms for Voicemod output: not found (see Gaps).

**RVC / Applio (open-source, local, offline)**
- Official Applio docs recommend a ±12-semitone pitch shift as the starting point for cross-gender conversion. Formant shifting makes male-to-female and female-to-male conversion sound more natural. A smaller hop length tracks big pitch jumps more accurately but processes more slowly. Note: the sign convention in the docs snippet looked reversed, so test both. (accessed 2026-11-04) — [Applio docs: Inference](https://applio-docs.pages.dev/getting-started/inference)
- Applio ships a Tamil UI translation (`ta-IN.json`). This says nothing about how well it converts Tamil speech. — [Applio ta-IN.json on Hugging Face](https://huggingface.co/spaces/IAHispano/Applio/blob/main/assets/i18n/languages/ta-IN.json)
- No Tamil-specific review of RVC or Applio was found. — search 2026-11-04

**Kits.ai**
- The official pricing page lists:
  - Free: 15 conversion minutes, 0 voice slots, **0 download minutes**, so audio cannot be exported on the free plan
  - Starter: $10/mo (20% off annually), unlimited conversions, 2 voice slots, 15 download minutes
  (snippet accessed 2026-11-04; page undated) — [Kits.ai pricing](https://kits.ai/pricing)
- Third-party sources conflict on tiers ($14.99, $8 "Creator", $59.99 "Composer"). Commercial rights are claimed "royalty-free on paid plans" by one review, which also warns that terms vary per voice. — [Kits.ai subscription blog](https://www.kits.ai/blog/kits-ai-subscription); [violetrecording Kits review](https://violetrecording.com/kits-ai-review/) (UNVERIFIED)

**Resemble AI**
- Reportedly consolidated into a credit-based self-serve "Flex" plan plus Enterprise. It removed voice-generation prices from its pricing page in July 2026. Speech-to-speech is listed among Flex features with no separate rate. Rates conflict: $0.0005/s vs $0.006/s with 150 free seconds. — [CostBench Resemble AI change, Jul 2026](https://costbench.com/changelog/resemble-ai-plan-removed-2026-07/); [Voiceflow on Resemble AI](https://www.voiceflow.com/articles/resemble-ai); [CostBench Resemble AI](https://costbench.com/software/ai-voice-tools/resemble-ai) (UNVERIFIED)

**Altered / Altered Studio**
- No shutdown notice found. Aggregator: "Free to $90 per month" with 4 plans (Aug 2026). Toolradar is internally inconsistent: "From $10/mo" vs "no plan prices on file" (checked 2026-10-14). — [CostBench Altered AI](https://www.costbench.com/software/voice-apis/altered-ai/hidden-costs/); [Toolradar Altered Studio](https://toolradar.com/tools/altered-studio) (UNVERIFIED)

**Consent and voice-library rules**
- ElevenLabs Professional Voice Clones can only be made of your own voice and must pass verification that the voice belongs to the account holder. To use someone else's voice, that person creates and verifies the clone on their own account and shares it with you. — [ElevenLabs help: PVC of someone else's voice](https://help.elevenlabs.io/hc/en-us/articles/36842751624209-Can-I-create-a-Professional-Voice-Clone-of-someone-else-s-voice) (accessed 2026-11-04)
- The ElevenLabs Prohibited Use Policy bars replicating another person's voice without consent or legal right, and bars evading guardrails such as voice verification. — [ConductAtlas summary of ElevenLabs Usage Policy](https://conductatlas.com/platform/elevenlabs/elevenlabs-usage-policy/voice-cloning-without-consent-prohibition/) (third-party summary)

### Inferences
- **Paati pipeline:** ElevenLabs Starter at $6/mo. Pick one library or designed elderly-female voice and reuse it as the fixed preset. Run Vasanth's acted Tamil line through `eleven_multilingual_sts_v2`. At 1,000 credits/min, a 10-second line costs about 170 credits, so the monthly allowance is not the constraint.
- **Why Tamil input should survive:** speech-to-speech keeps the input's timing and phonetics (the docs say it preserves accent and emotional cues) rather than re-reading text. Retroflex consonants in the performance should carry through better than with Tamil TTS. This is reasoning from the docs, not a tested result.
- **What will decide quality:** a male-to-elderly-female conversion depends more on Vasanth's performance (raised pitch, slower, breathy, a "paati" cadence) than on the tool. Large jumps in pitch and formant tend to produce artifacts in every tool family. This is unverified, so test 2–3 voices before fixing the preset.
- **Voicemod** is built for live use (streaming, calls). For offline single-line conversion it adds nothing over ElevenLabs, and its commercial terms are unclear.
- **RVC/Applio** is free and offline, but needs a GPU-capable PC, a local install (outside this brief's no-install rule) and a target voice model. Community models are often trained on real people's voices without consent, which is a legal and ethical risk for a monetized channel.

### Gaps
- No published test (reviews, Reddit, YouTube) of any tool on Tamil input, retroflex consonants, or male-to-elderly-female and male-to-child quality. Searches on 2026-11-04 returned only generic content.
- ElevenLabs INR pricing: the fetched page showed USD only. Whether India checkout shows INR, and whether GST is added, is unverified.
- Voicemod's commercial-use and license terms, and its India price: not found.
- Latency for ElevenLabs STS: not stated in its docs.
- Altered's official pricing page (altered.ai/pricing) was not opened.

## 2. Own-voice cloning and dubbing (English/Hindi versions)

### Takeaway
YouTube auto-dubbing supports **Tamil to English only**: no Tamil to Hindi, and no expressive or voice-matched speech for the Tamil-to-English pair. Its official help page does not say whether Shorts are eligible. The reliable route is to dub with ElevenLabs (Tamil and Hindi supported; Instant Voice Clone from the $6 Starter plan; no watermark on paid plans), then upload the result to YouTube's multi-language audio feature. That feature explicitly supports Shorts and has been open to all creators since September 2025. Meta's Reels translation is free, includes Tamil, and keeps the creator's own voice.

### Cited Findings
**YouTube automatic dubbing** (help page accessed 2026-11-04; footer "©2026 Google", no update date)
- Tamil appears only as an original language dubbed into English, and as a target dubbed from English. There is no Tamil-to-Hindi pair. Hindi sources dub only to Bengali or English. — [YouTube Help: Use automatic dubbing](https://support.google.com/youtube/answer/15569972?hl=en)
- Expressive Speech is available only for target languages marked with an asterisk. "Tamil → English" carries no asterisk, while e.g. "Telugu → English*" does, so Tamil-to-English dubs get a generic voice. — [YouTube Help: Use automatic dubbing](https://support.google.com/youtube/answer/15569972?hl=en)
- Dubs cannot be edited. To regenerate one, change the original language. Videos are ineligible if they have little speech, speech that is too fast, music only, or copyrighted content. Lip sync is an experimental feature for select channels. The page does not mention Shorts. — [YouTube Help: Use automatic dubbing](https://support.google.com/youtube/answer/15569972?hl=en)
- News reports in February 2026 describe auto-dubbing expanding to all users and 27 languages. — [India TV News, 2026-02-05](https://www.indiatvnews.com/technology/news/youtube-auto-dubbing-feature-expands-to-all-users-now-supports-27-languages-2026-02-05-1029070); [Storyboard18](https://www.storyboard18.com/digital/youtube-expands-auto-dubbing-to-27-languages-adds-more-natural-and-expressive-voices-88923.htm)

**YouTube multi-language audio (creator-uploaded tracks)**
- Google's help page says it lets you upload audio tracks in different languages "to a single video or Short". — [YouTube Help: Add multi-language features](https://support.google.com/youtube/answer/13338784?hl=en)
- Rolled out to all creators in September 2025 after a two-year pilot. YouTube reported that over 25% of watch time came from non-primary languages for videos with these tracks. — [TechCrunch, 2025-09-10](https://techcrunch.com/2025/09/10/youtubes-multi-language-audio-feature-for-dubbing-videos-rolls-out-to-all-creators/)

**ElevenLabs Dubbing and voice cloning**
- Dubbing v1 and v2 support Tamil (`ta`) and Hindi (`hi`) among 90+ languages. Dubs preserve speaker identity. A v2 "Cloning strength" setting (0–10, default 7) trades voice similarity against natural target-language delivery. Free-tier dubs are watermarked; paid-tier dubs are not. Dubbing Studio caps files at 45 minutes, Automatic Dubbing at 180 minutes. (accessed 2026-11-04) — [ElevenLabs Dubbing docs](https://elevenlabs.io/docs/capabilities/dubbing)
- Instant Voice Cloning and Dubbing Studio start at Starter ($6/mo). Professional Voice Clone starts at Creator ($22/mo). (accessed 2026-11-04) — [ElevenLabs pricing](https://elevenlabs.io/pricing)

**Meta AI translations for Reels** (Instagram and Facebook)
- Tamil was added in late 2025 (announced at House of Instagram, Mumbai) and rolled out around January 2026. Supported languages as of April 2026: English, Spanish, Portuguese, Hindi, Bengali, Tamil, Telugu, Marathi, Kannada. — [Social Samosa](https://www.socialsamosa.com/news-2/instagram-facebook-ai-reel-translations-more-indian-languages-11017659); [FoneArena](https://www.fonearena.com/blog/?p=473641); [inro.social (Apr 2026)](https://www.inro.social/blog/meta-ai-reel-translation)
- The feature keeps the creator's voice and tone, lip-sync can be toggled separately, and translated Reels show the label "Translated with Meta AI". Free. Available to all public Instagram accounts and to Facebook creators with 1,000+ followers, in countries where Meta AI is available. — [inro.social](https://www.inro.social/blog/meta-ai-reel-translation); [Meta Newsroom, Oct 2025](https://about.fb.com/news/2025/10/discover-reels-around-world-meta-ai-translation/)

**HeyGen and Rask**
- Rask lists Tamil among supported languages. Third-party pricing conflicts: Creator at $60/mo for 25 lip-synced minutes vs an entry plan at $50/mo for 25 minutes. — [Rask](https://rask.ai/marketing); [perso.ai Rask review 2026](https://perso.ai/blog/rask-ai-dubbing-review-2026-features-pricing-how-it-compares) (competitor blog, UNVERIFIED)
- HeyGen claims 140+ languages. The only Tamil mention found is an older guide. Third-party estimate: audio dubbing free, lip sync 5 credits/min, ~$24/mo entry for lip-sync. — [HeyGen blog](https://www.heygen.com/blog/best-ai-dubbing-tools); [perso.ai HeyGen review 2026](https://perso.ai/blog/heygen-ai-dubbing-review-2026) (UNVERIFIED; HeyGen Tamil support not confirmed)

### Inferences
- **Lip-sync is irrelevant** for a faceless channel where characters mostly don't speak. That removes HeyGen's and Rask's main selling point; both cost more than ElevenLabs for audio-only dubbing.
- **Recommended path for English or Hindi:** ElevenLabs Dubbing of the narration stem with his Instant Voice Clone (Starter) → upload as a multi-language audio track on the same Short. Export narration without music, so the dub is cleaner and music can be re-mixed.
- **Hindi from Tamil** is impossible via YouTube auto-dub as of 2026-11-04 (no such pair), so Hindi must come from ElevenLabs or another tool, or from manual recording.
- **Instagram and Facebook:** Meta's free translation is a zero-effort way to test demand for English, Hindi and Telugu versions before paying for dubs. Exact source-to-target language pairs were not confirmed.

### Gaps
- Whether YouTube auto-dubbing works on Shorts: not stated on the official help page; no reliable source found.
- Meta: whether every listed language works as both source and target (e.g. Tamil to English) was not confirmed from a primary Meta page.
- ElevenLabs per-minute dubbing cost on self-serve plans: the docs point to the pricing page, which did not state it clearly.
- HeyGen's current Tamil support and official prices; Rask's official pricing page was not opened.

## 3. Tamil text-to-speech (fallback only) and the "inauthentic content" angle

### Takeaway
Sarvam Bulbul v3 (Indian, Tamil-native, priced in INR) and ElevenLabs v3 / Multilingual v2 are the main Tamil TTS options. Azure has two confirmed ta-IN neural voices. Google Chirp 3 HD Tamil was not confirmed. No source ranked Tamil naturalness head to head. YouTube's policy text does not ban TTS. It demonetizes mass-produced, templated content, and original narration is what YouTube itself cites as adding value, which favours Vasanth keeping his own voice.

### Cited Findings
- **Sarvam Bulbul v3:**
  - Supports Tamil (ta-IN)
  - ₹30 per 10,000 characters (marked Beta pricing); Bulbul v2 is ₹15 per 10,000 characters
  - Pricing page says ₹1,000 free credits; a third-party blog says ₹100 (conflict)
  (accessed 2026-11-04) — [Sarvam API pricing docs](https://docs.sarvam.ai/api-reference-docs/pricing); [Sarvam API pricing](https://sarvam.ai/api-pricing); [Bulbul model docs](https://docs.sarvam.ai/api-reference-docs/models/bulbul); [invideo blog](https://invideo.io/blog/sarvam-bulbul-indian-tts/)
- **Independent benchmark:** Artificial Analysis lists Bulbul v3 on its TTS leaderboard (quality Elo, speed, price). Its Tamil-specific scoring was not extracted. — [Artificial Analysis: Bulbul v3](https://artificialanalysis.ai/text-to-speech/models/bulbul-v3)
- **ElevenLabs:** Tamil is supported in eleven_v3 (70+ languages), Multilingual v2 (29) and Flash v2.5 (32). (accessed 2026-11-04) — [ElevenLabs models](https://elevenlabs.io/docs/models)
- **Azure:** ta-IN-PallaviNeural (female) and ta-IN-ValluvarNeural (male) are listed, plus Sri Lanka, Malaysia and Singapore Tamil variants. — [json2video Azure Tamil voices](https://json2video.com/ai-voices/azure/languages/tamil/); [edesy Azure TTS](https://edesy.in/docs/voice-agent/tts/azure) (third-party listings)
- **Google Chirp 3 HD:** the official docs snippets showed bn-IN, en-IN and ur-IN, but ta-IN was not seen. Not confirmed. — [Google Cloud Chirp 3 HD](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd)
- **AI4Bharat (open-source):**
  - IndicF5 supports Tamil, listed under the MIT license on India's AIKosh
  - Indic Parler-TTS supports Tamil; license conflicts (MIT on AIKosh vs Apache 2.0 elsewhere) and the model is gated on Hugging Face
  — [AIKosh IndicF5](https://aikosh.indiaai.gov.in/home/models/details/aibharat_indicf5.html); [AIKosh Indic Parler-TTS](https://aikosh.indiaai.gov.in/home/models/details/ai4bharat_indic_parler_tts_text_to_speech_model.html); [dev.co Indic Parler-TTS](https://dev.co/ai/llms/indic-parler-tts)
- **YouTube Partner Program policy** (accessed 2026-11-04):
  - The "inauthentic content" section (renamed 2025-07-15) bars "mass-produced, generic, repetitive" content, and "AI-generated content made with generic or unoriginal templates giving the impression of mass production"
  - It allows using AI to visualize "a unique character and narrative you invented"
  - Reused content is acceptable when original voiceover or commentary is added
  - The page does not mention TTS
  — [YouTube monetization policies](https://support.google.com/youtube/answer/1311392?hl=en)
- Third-party claim of a January 2026 enforcement wave that removed 4.7 billion views: secondary sources only. — [flocker.tv](https://flocker.tv/posts/youtube-inauthentic-content-ai-enforcement/) (UNVERIFIED)

### Inferences
- **Own narration is the safest choice:** it is the strongest signal against an "inauthentic" or templated judgment. TTS should stay a fallback (e.g. sick days), not the default.
- **If TTS is needed:** test Sarvam Bulbul v3 first (Indian-built, INR billing, cheap) against ElevenLabs v3 on one script.

### Gaps
- No head-to-head Tamil naturalness comparison (MOS or listening tests) across ElevenLabs, Google, Azure, Sarvam and AI4Bharat was found.
- Google Chirp 3 HD Tamil availability is unconfirmed.

## 4. Microphones in India (phone vs PC)

### Takeaway
For PC recording, a ~₹2,000–2,600 USB condenser (Fifine K669B) or ~₹2,500–3,500 (Maono AU-A04) is the common beginner pick. For phone recording, the wired Boya BY-M1 lavalier (~₹850 on Amazon.in, July 2026) is the cheapest. Wireless lavaliers like the Hollyland Lark M2 (~₹12–13.5k at Indian dealers) are unnecessary for seated voiceover. Every price below is a blog or dealer snapshot; live Amazon.in and Flipkart prices were not checked.

### Cited Findings
- **Fifine K669B (USB):**
  - About ₹1,999 in one May 2026 list; ₹2,300–2,600 in another
  - Called the honest sub-$40 first recommendation for voiceover
  - No official India warranty, so Amazon's return window is the only protection
  — [earlyviewnewstipper, May 2026](https://earlyviewnewstipper.blogspot.com/2026/05/best-budget-microphones-under-3000-in.html); [fone.tips](https://fone.tips/best-budget-usb-microphone/); [getpc.co.in Fifine K669B](https://getpc.co.in/parts/usb-microphones/fifine-k669b) (UNVERIFIED prices)
- **Maono AU-A04 (USB, 192 kHz / 24-bit):** ₹2,499 (2026 blog) or ₹2,999–3,499 (review site). A ₹5,999 figure from Dec 2024 looks outdated. — [earlyviewnewstipper](https://earlyviewnewstipper.blogspot.com/2026/05/best-microphones-under-3000-in-india.html); [getpc.co.in Maono AU-A04](https://getpc.co.in/parts/usb-microphones/maono-au-a04); [Bajaj Finserv](https://bajajfinserv.in/guide-to-maono-microphones) (UNVERIFIED)
- **Maono AU-PM461TR / PM360TR (USB):** ~₹2,400–2,800. — [getpc.co.in AU-PM461TR](https://getpc.co.in/parts/usb-microphones/maono-au-pm461tr) (UNVERIFIED)
- **Maono PD200X (USB + XLR dynamic, the upgrade path):** ~₹3,959. — [producthunter.in](https://www.producthunter.in/smartphones/best-usb-microphones-podcasting-india) (UNVERIFIED)
- **Boya BY-M1 (wired 3.5 mm lavalier, not USB):** ₹848 on Amazon.in, 57% off MRP (dated 2026-07-06); ₹690–1,300 in other lists. — [MagicDrop, 2026-07-06](https://magicdrop.in/drops/boya-mic-price); [earlyviewnewstipper](https://earlyviewnewstipper.blogspot.com/2026/05/best-microphones-under-3000-in-india_0526499758.html) (UNVERIFIED)
- **Hollyland Lark M2 combo (wireless):** ₹11,990 (Videolinks, authorized dealer) or ₹13,490 (Heyjimmy), against an MRP of about ₹27,000. Both pages undated. — [Videolinks](https://videolinks.com/products/hollyland-lark-m2-combo); [Heyjimmy](https://heyjimmy.in/product/hollyland-lark-m2-wireless-lavalier-microphone-combo-india/) (UNVERIFIED)
- **Rode Wireless GO II:** no Amazon.in price found. The ₹77,500 figure on cameralk.com appears to be in Sri Lankan rupees and should not be used. — [cameralk](https://cameralk.com/browse/wireless-microphones)

### Inferences
- **Recording on PC:** a Fifine K669B or Maono AU-A04 plugged into a laptop or PC is the better beginner choice. One cable, gain knob on the mic, records straight into Audacity or Resolve. Condenser mics pick up room echo, so record close (about 10–15 cm) in a soft-furnished room or closet.
- **Recording on phone:** the Boya BY-M1 needs a 3.5 mm TRRS jack or a USB-C dongle with a mic input on modern phones. Verify the dongle supports microphone input before buying.
- **Wireless lavaliers** (Lark M2, Rode Wireless GO) are for talking-to-camera while moving. Not needed for faceless voiceover.

### Gaps
- No direct Amazon.in or Flipkart page was opened. All prices are blog snapshots (May–July 2026) or undated dealer pages, so they need re-checking at purchase time.
- No Indian tech press (Gadgets360, Digit, 91mobiles) or Reddit (r/IndianCreators) mic recommendation was retrieved.

## 5. Free voice clean-up and loudness target

### Takeaway
Adobe Podcast Enhance Speech's free tier (1 hour of audio per day, files up to 30 minutes) is more than enough for Shorts narration. DaVinci Resolve's Voice Isolation is most likely a paid Studio feature; Dialogue Leveler is free. Master to about -14 LUFS integrated with a -1 dBTP true-peak ceiling. That is common guidance, not an official YouTube figure.

### Cited Findings
- **Adobe Podcast Enhance Speech, free plan:**
  - 1 hour of audio per day, files capped at 30 minutes and 500 MB
  - The quota counts the uploaded file length and resets daily
  - Premium: $9.99/mo or $99.99/yr, 4 hours per day, 2-hour files
  - One aggregator instead claims a 4-hour free file cap (conflict)
  — [gauravtiwari.org review](https://gauravtiwari.org/adobe-podcast-review/); [aitoolsatlas Adobe Podcast free vs paid](https://aitoolsatlas.ai/tools/adobe-podcast/free-vs-paid) (third-party, UNVERIFIED; Adobe's own page not opened)
- **DaVinci Resolve Voice Isolation:** most sources say it is Studio-only (added in Studio 18.1). DaVinci Resolve Club says the July 2026 Resolve 21 manual labels it Studio-only. Larry Jordan's Resolve 20 article describes it in the free version (conflict). Dialogue Leveler is free. Studio 21 costs $295. — [DaVinci Resolve Club](https://davinciresolveclub.com/voice-isolation-vs-dialogue-leveler/); [Larry Jordan](https://larryjordan.com/articles/compare-ai-voice-isolation-ai-dialogue-leveler-ai-dialogue-separator-in-davinci-resolve-20/); [Toolfarm Studio vs Free](https://www.toolfarm.com/tutorial/in-depth-davinci-resolve-studio-vs-the-free-version/)
- **Loudness:** -14 LUFS integrated and -1 dBTP true peak is the common rule of thumb. YouTube turns loud audio down but does not boost quiet audio. No official YouTube document or Shorts-specific figure was found, and forum users question whether -14 is a recommendation or only YouTube's internal normalization target. — [Audacity forum](https://forum.audacityteam.org/t/how-to-get-maximum-loudness-for-youtube-on-voice-recording/58497); [Youlean](https://youlean.co/?p=30813); [DEV: LUFS -14 for Shorts/Reels](https://dev.to/arthurvalle1_a2586dd2b4bc/mastering-for-reels-tiktok-and-youtube-shorts-the-lufs-14-standard-2ck5)

### Inferences
- **Free chain:** record → Adobe Podcast Enhance (free) → edit and mix in CapCut, Resolve free or Audacity → normalize to about -14 LUFS / -1 dBTP.
- **Paati line order:** run Enhance before the voice changer, or use ElevenLabs' `remove_background_noise` option. Feeding noise into speech-to-speech usually degrades the result (inference).

### Gaps
- Audacity's Noise Reduction effect (free and built in) was not sourced in this session. It is widely documented but unverified here.
- Adobe's official free-tier limits page was not opened.

## 6. YouTube and Meta rules on AI voices, cloning disclosure and impersonation

### Takeaway
YouTube's altered-content help page lists "cloning one's own voice to create voice overs or dubs" as a minor change that needs no disclosure, and fully animated or fantasy content is exempt too. Disclosure is required when content makes a real person appear to say something they didn't. A generic AI "Paati" voice in a cartoon does not trigger the label as long as it does not imitate a real, identifiable person. Disclosing does not hurt reach or monetization.

### Cited Findings
- **Must disclose** (realistic content):
  - A real person appearing to say or do something they didn't
  - Altered footage of real events or places
  - Realistic scenes that never happened
  - AI music that is the main focus of the video
- **No disclosure needed:**
  - "AI animation in a fully animated video"
  - Beauty filters, captions, voice or audio repair
  - "Cloning one's own voice to create voice overs or dubs"
- **Other rules from the same page:**
  - YouTube may apply labels itself
  - Disclosure "doesn't limit a video's audience or affect monetization eligibility"
  - Repeated non-disclosure can lead to penalties
  - Labels for animated content appear in the expanded description
  — [YouTube Help: Disclosing altered or synthetic content](https://support.google.com/youtube/answer/14328491?hl=en) (accessed 2026-11-04; no update date on page)
- **Generic TTS voiceover** does not inherently need a label unless it deceptively imitates a real person's voice (2024 reporting on the policy launch). — [TechSpot](https://www.techspot.com/news/102315-youtube-introduces-labeling-requirements-synthetic-altered-content.html); [AIR Media-Tech 2026 guide](https://air.io/en/youtube-hacks/youtube-ai-disclosure-in-2026-label-it-yourself-or-youtube-will)
- **AI personas:** the YPP policy bars monetizing AI personas that present as human experts on sensitive topics (health, legal, finance, politics). — [YouTube monetization policies](https://support.google.com/youtube/answer/1311392?hl=en) (accessed 2026-11-04)
- **Meta:** Reels translated with Meta AI are auto-labelled "Translated with Meta AI". — [inro.social](https://www.inro.social/blog/meta-ai-reel-translation)
- **ElevenLabs:** forbids cloning another person's voice without consent; Professional Voice Clones are verified as the account holder's own voice. — [ElevenLabs help](https://help.elevenlabs.io/hc/en-us/articles/36842751624209-Can-I-create-a-Professional-Voice-Clone-of-someone-else-s-voice)

### Inferences
- **Paati:** never clone or imitate a real person's voice for Paati (e.g. a celebrity or a family member without consent). Use a library or designed voice.
- **Health-adjacent myth-busting:** if the channel's "Paati sonnadhu unmaiya" format touches health claims, the AI-persona rule matters. Paati must not be presented as a real human medical expert.
- **Dubs in Vasanth's own cloned voice** need no YouTube disclosure, per the help page wording.

### Gaps
- Meta's general AI-content labeling rules ("AI info") for synthetic voice in Reels were not researched.
- Whether YouTube auto-dubs or uploaded AI dub tracks are themselves labelled to viewers on Shorts was not confirmed.
