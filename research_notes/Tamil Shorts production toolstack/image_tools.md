# AI image tools for consistent recurring characters (stylised 3D clay look), Tamil Shorts channel, as of Nov 2026

Research date: 2026-11-04. 19 tool calls (searches and fetches); no downloads or installs. Most comparison material on the web is vendor blogs or SEO listicles. Official pages fetched: Google Gemini India subscriptions page and YouTube's AI-disclosure help page, plus two TechCrunch articles (Aug and Dec 2025). The Midjourney docs returned HTTP 403, so every Midjourney fact below comes from secondary sources. **[UNVERIFIED]** marks a claim that has only one non-primary source or that conflicts with another source.

## 1. Which tools lead on character consistency, and how reliable are they? (features, failure modes)

### Takeaway
As of late 2026, multi-reference "edit-style" models lead for keeping a character consistent. Google's Nano Banana family (Nano Banana 2 = Gemini 3.1 Flash Image, and Nano Banana Pro) is ranked first by most comparisons, followed by FLUX.2, Seedream 5.0 and GPT Image 2.x. Midjourney gives the most polished look, but its references (`--cref` / Omni Reference) drift more on faces and outfits. No independent, peer-reviewed benchmark exists. Every published ranking is either vendor-adjacent or labelled "illustrative", so Vasanth has to run his own test with Mani and Paati.

### Cited Findings
**Current model names (late 2026):**
- The Google India plan page (fetched 2026-11-04) names "Gemini 4 Argon", Nano Banana, Nano Banana Pro, "3.1 Pro" and Veo 3.1 Lite. The page does not say whether "Gemini 4 Argon" generates images. — [Google AI plans India](https://gemini.google/in/subscriptions/?hl=en-IN)
- Nano Banana 2 is Gemini 3.1 Flash Image. A Sept 2026 test guide lists the current contenders as Nano Banana 2, GPT Image 2.5, Qwen-Image-2.1, Seedream 5.0 Lite and FLUX.2 [pro]. — [Tech Insider, 2026-09-23](https://tech-insider.org/consistent-ai-character-generator-test-2026/)
- OpenAI model naming is inconsistent across sources: "GPT Image 2", "GPT Image 2.5" and "ChatGPT Images 2.0" all appear. **[UNVERIFIED which is current in ChatGPT]** — [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/); [ChatCut](https://chatcut.io/blog/free-gpt-image-2)
- Midjourney's current default is V8.1 according to one source and V8.2 (since 2026-07-24) according to another. The newest review (checked 2026-10-03) and Wikipedia say V8.2. **[conflicting]** — [javisreview](https://javisreview.com/review/midjourney-review-2026/); [Wikipedia](https://en.wikipedia.org/wiki/Midjourney); [aiweekly](https://aiweekly.co/learning-ai/generative-ai/how-to-use-midjourney)

**Consistency features:**
- Nano Banana: several 2026 comparisons rank it first for multi-reference character consistency and iterative editing. One says Nano Banana 2 takes up to 5 characters as references. — [search summary of renderreport / neolemon / thedaringcreatives listicles](https://renderreport.com/blog/best-ai-image-generators-character-consistency); [neolemon](https://www.neolemon.com/blog/best-ai-image-generator/)
- One vendor guide claims Nano Banana Pro accepts up to 14 reference images and recommends supplying 4–8 good references from varied angles and expressions. **[UNVERIFIED, single vendor]** — [selfielabstudio multi-ref guide, 2026-03-13](https://selfielabstudio.com/blog/nano-banana-pro-multi-ref-character-workflow-guide-20260313)
- FLUX.2 accepts up to 8 reference images through the API and is described as keeping characters, products and styles consistent. — [renderreport listicle](https://renderreport.com/blog/best-ai-image-generators-character-consistency)
- Seedream 5.0 Pro accepts multiple references, but sources disagree on the maximum (5, 9 or 10). Lite is listed at up to 14. **[conflicting]** — [CreateVision](https://createvision.ai/guides/seedream-5-complete-guide); [BudgetPixel](https://budgetpixel.com/models/seedream-5.0-pro); [VdoBloom](https://vdobloom.com/blog/where-to-use-seedream-5/); [kie.ai](https://kie.ai/blog/what-is-seedream-5)
- Seedream 5.0 Pro scored 4.86/5 in IMG.LY's 2026 prompt-only consistency test and 1,081 Elo on Artificial Analysis text-to-image. GPT Image 2.5 variants scored 1180/1160 Elo on the Artificial Analysis image-editing board. **[second-hand, via Tech Insider]** — [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/)
- Midjourney Omni Reference (`--oref`) is a V7 feature. One source says it had not been fully ported to V8.1 as of July 2026, and it costs about 2× GPU time per prompt. **[UNVERIFIED; the official docs page returned 403]** — [search summary of MJ reviews](https://vantaige.io/ai-tool/midjourney); [pixverse](https://pixverse.ai/en/blog/midjourney-ai-image-generator-review)
- Ideogram still supports Character Reference in 2026. Freepik charges 60 credits for an Ideogram 3 image and 200 credits for Ideogram 3 with an image reference. — [superfreshai](https://superfreshai.pages.dev/tools/ideogram/); [Freepik credits FAQ](https://www.freepik.com/ai/faq/ai-image-generator-credits)

**Reliability / failure modes:**
- ToonyStory benchmark (140 images, run April 2026 and re-validated May 2026, updated 2026-10-22). Overall scores: Midjourney `--cref` 7.5, SD + IP-Adapter 7.0, Flux + PuLID 6.5, Leonardo 6.0, DALL-E 3 5.5, Ideogram 2.0 5.0. **Conflict of interest:** the author's own product ranked #1 with 9.2. The test also used *old* versions and did not score Nano Banana, MJ Omni Reference or the new ChatGPT and Ideogram reference features. — [ToonyStory](https://toonystory.com/blog/best-ai-for-character-consistency-2026)
- Failure modes in that test:
  - Midjourney `--cref` shifted eye shape **and skin tone** between scenes, and outfits drifted even at `--cw 100`.
  - Flux + PuLID handles faces only, so outfits drift.
  - Leonardo lost the face in full-body and action shots.
  - In multi-character scenes most tools swapped features between characters (hair and outfits merged).

  — [ToonyStory](https://toonystory.com/blog/best-ai-for-character-consistency-2026)
- "Every model ... performs worse when asked to keep two or more reference characters consistent in the same scene." Front portraits are the easiest case and back views are where "most models actually fail". Outputs are non-deterministic, so the guide recommends running each prompt at least twice. — [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/)
- A reference sheet "doesn't guarantee an identical character", so each view needs checking for costume coherence, hands and silhouette. — [search summary, geeky-gadgets / mootion guides](https://www.geeky-gadgets.com/character-consistency-workflow-reference-sheets/)

**Indian skin tones and South Indian dress:**
- A 2026 arXiv preprint found that neutral prompts do not produce demographically neutral outputs in Gemini Flash 2.5 Image and GPT Image 1.5. High-income prompts skew toward lighter skin, and adding prompt constraints only modestly reduces this. — [arXiv 2602.12133](https://arxiv.org/html/2602.12133v1)
- Earlier independent analysis found colourism and gender skew in AI images of Indian people. — [Medium, evijit](https://medium.com/@evijit/analysis-of-ai-generated-images-of-indian-people-for-colorism-and-sexism-b80ff946759f)
- The claim that models trained mostly on North Indian faces struggle with South Indian features comes only from a weak commercial source. **[UNVERIFIED]** — [technavio sample page](https://samples.technavio.com/?p=16634)

### Inferences
- For Mani and Paati, the realistic shortlist is (a) Nano Banana Pro / Nano Banana 2 inside the Gemini app, which is cheapest in India and gives multi-image editing; (b) Seedream 5.0, which is strong on multi-reference; (c) FLUX.2 / Kontext through a pay-per-image host. Midjourney is the "look" option but weaker on lock-in, and Omni Reference is V7-only.
- Two characters in one frame is the hardest case for every tool. Shot lists should favour single-character frames, or two-shots composed from both references with checks on whether outfits swap (Mani's mustard shirt colour bleeding onto Paati's saree, for example).
- Colourism research suggests the skin tone must be pinned in every prompt ("deep brown / dark-wheatish skin"). Tone drift should be checked across a batch, since a reference image alone may not hold it.
- Because the target is a stylised clay render, face-identity drift is less visible than it would be in photoreal work. Silhouette, outfit colour and props (Paati's saree border, Mani's mustache) carry the identity. Stylised targets are generally easier to keep consistent, but no source tested a clay style specifically.

### Gaps
- No independent, recent (Q3–Q4 2026) head-to-head covering Nano Banana Pro vs Seedream 5.0 vs GPT Image 2.x vs FLUX.2 vs MJ V8 on character consistency. Every ranking is vendor-adjacent or illustrative.
- No source tested sarees, veshti or South Indian elderly women specifically, and none covered the "3D clay" style. Extra-finger rates are not quantified for any 2026 model.
- Unclear whether "Gemini 4 Argon" is or includes a new image model, or whether Nano Banana 2 is the default in the Gemini app in India.
- Recraft, Krea and Leonardo (2026 versions) were not covered by any source found.

## 2. Pricing in India (free tiers, INR plans, per-image cost, payment from India)

### Takeaway
The cheapest workable route from India is Google AI Plus at ₹399/month (₹199 promo for the first six months, Dec 2025) or AI Pro at ₹1,950/month, both with Nano Banana Pro access. ChatGPT Go costs ₹399/month and Plus ₹1,999/month, and both take UPI. Midjourney is USD-only, $10–$120/month with no free trial. API pay-per-image runs roughly US$0.03–$0.15 per image, depending on model and resolution. Neither Google nor OpenAI publishes exact image caps.

### Cited Findings
**Google (fetched 2026-11-04):**
- Free: ₹0, "Image generation and editing" with no stated cap, plus "limited access to Nano Banana Pro" in Google Flow. — [Google AI plans India](https://gemini.google/in/subscriptions/?hl=en-IN)
- AI Plus: ₹399/month, "More access to Nano Banana", video generation, 200 Flow credits, 400 GB. — same page
- AI Pro: ₹1,950/month, "Higher access to Gemini 4 Argon, Nano Banana...", 1,000 Flow credits, 5 TB, limited Veo 3.1 Lite trial. — same page
- AI Ultra: from ₹6,500/month (5× Pro limits) and ₹19,500/month (20×). — same page
- Usage limits run relative to Free: Plus 2×, Pro 4×. They "refresh every five hours" until a weekly limit is reached. **No numeric daily or monthly image cap is published for any plan.** — same page
- AI Plus launched in India in Dec 2025 at ₹199/month for the first six months for new users, then ₹399, with "higher limits for Gemini 3 Pro and ... Nano Banana Pro". TechCrunch reported 200 GB storage at launch; the current page says 400 GB. Jio users on a qualifying plan got AI Pro free for 18 months. — [TechCrunch, 2025-12-10](https://techcrunch.com/2025/12/10/google-launches-sub-5-ai-plus-plan-in-india-to-compete-with-chatgpt-go)
- A blog figure of about 100 free edits/day is single-source. **[UNVERIFIED]** — [search summary of Nano Banana pricing blogs](https://www.izzedo.chat/blog/nano-banana-price-and-limits)
- API: Nano Banana 2 costs about $0.067 (1K), $0.101 (2K) or $0.151 (4K) per image. — [Tech Insider, 2026-09-23](https://tech-insider.org/consistent-ai-character-generator-test-2026/)

**OpenAI:**
- ChatGPT Go costs ₹399/month with "10x more image generations" than Free, and is payable via **UPI**. Plus costs ₹1,999/month. — [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/openai-launches-a-sub-5-chatgpt-plan-in-india)
- Go went global in Jan 2026 at US$8/month. A guide updated Oct 2026 says OpenAI publishes **no** image count for any ChatGPT plan. — [toolcolumn](https://www.toolcolumn.com/learn/chatgpt-image-generation-limits-by-plan); [search summary](https://www.analyticsvidhya.com/blog/2025/08/chatgpt-go/)
- In Nov 2025 OpenAI offered Go free for one year to Indian users who signed up during a promo window. Whether that still applies in Nov 2026 is unknown. — [TechCrunch, 2025-10-27](https://techcrunch.com/2025/10/27/openai-offers-free-chatgpt-go-for-one-year-to-all-users-in-india)
- Plus at ₹1,999 includes GST via the App Store; ₹1,660 appears to be the pre-tax figure. — [kingy.ai](https://kingy.ai/blog/chatgpt-claude-gemini-prices-india/); [desibundle](https://desibundle.com/chatgpt-price-in-india/)

**Midjourney (USD, secondary sources, 2026):**
- Plans:
  - Basic: $10/month, 3.3 fast GPU hours, no Relax mode.
  - Standard: $30/month, 15 fast hours, unlimited Relax.
  - Pro: $60/month.
  - Mega: $120/month.
  - No free trial.

  **[secondary sources only]** — [eesel.ai](https://www.eesel.ai/blog/midjourney-pricing); [javisreview](https://javisreview.com/review/midjourney-review-2026/)

**Seedream / Dreamina:**
- Dreamina offers Seedream 5.0 Pro and Lite with free daily credits. Credit cost per image differs by source: 10/19, 50–100, or 55/110. **[conflicting]** — [VdoBloom](https://vdobloom.com/blog/where-to-use-seedream-5/); [CreateVision](https://createvision.ai/guides/seedream-5-complete-guide); [BudgetPixel](https://budgetpixel.com/models/seedream-5.0-pro); [Dreamina official](https://dreamina.capcut.com/seedream/seedream-5-0-pro)
- API: Seedream 5.0 Pro costs about $0.045–0.09 per image (Atlas Cloud) or $0.075/$0.15 (kie.ai). Lite costs about $0.055. **[about 3× spread across resellers]** — [Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/seedream-5-0-pro-price); [kie.ai](https://kie.ai/blog/what-is-seedream-5); [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/)

**Flux / BFL and Ideogram:**
- BFL bills in credits (1 credit = $0.01), priced by resolution. FLUX.2 [pro] costs about $0.03 per megapixel. Kontext Pro is about $0.04/image and Kontext Max about $0.08 (Aug 2026). FLUX.2 Klein is about $0.014–0.015. — [BFL docs](https://docs.eu.bfl.ai/quick_start/pricing); [invideo, Aug 2026](https://invideo.io/blog/flux-ai-image-generator/); [aitoolsatlas](https://aitoolsatlas.ai/tools/flux-2-pro/pricing)
- Ideogram works out to about $0.03–$0.09 per image across plans (April 2026). — [costbench](https://costbench.com/changelog/ideogram-pricing-update-2026-04/)

### Inferences
- **Volume estimate:** 10–12 stills × 4–5 Shorts/week is roughly 175–260 kept images/month. At 2–3 attempts per kept image, that is about 350–780 generations/month.
- **Cost per image:** At AI Pro (₹1,950), 500 generations works out to about ₹4 per generation. At AI Plus (₹399), the same 500 would be under ₹1 per generation, if the caps allow it. That is the unknown, because Google publishes no numbers.
- **API comparison:** 500 Nano Banana 2 API images at 1K would cost about $33.50, or roughly ₹2,900 at an assumed ₹87/USD (**exchange rate not sourced**). Subscriptions are cheaper for this volume if they don't hit caps.
- **Suggested path:** start with AI Plus (or Pro if limits bite) and measure how many Nano Banana Pro edits fit before the 5-hourly or weekly limit hits. Pay-per-image API or Dreamina free credits make a good overflow channel.
- **Dreamina access from India:** Dreamina is a CapCut/ByteDance product. CapCut has been blocked in India since 2020 (training knowledge, not verified in this session), so availability from India should be checked before relying on it. Seedream is also reachable via third-party APIs (fal, Replicate, Atlas).

### Gaps
- Exact Nano Banana / Nano Banana Pro image quotas for Free, Plus and Pro in India are not published, and OpenAI publishes no ChatGPT image counts.
- Whether Google One / Gemini subscriptions in India accept UPI was not confirmed. TechCrunch's Dec 2025 article does not mention payment methods.
- Whether Midjourney accepts Indian cards or UPI was not found. Indian card acceptance on USD Stripe billing is unverified.
- Current India pricing for Ideogram, Leonardo, Krea and Recraft was not found, and none of them publishes INR prices in the sources found.
- Whether the Jio free AI Pro offer is still running in Nov 2026 is unknown.

## 3. Commercial rights, ownership, watermarking, and YouTube AI labels

### Takeaway
For a fully animated clay-style channel, YouTube says **disclosure is not required for non-realistic AI content**. YouTube may still auto-label videos whose files carry C2PA "fully AI-generated" metadata. For animated content the label sits in the expanded description, not on the player, and disclosure alone does not affect monetisation. Google (SynthID plus C2PA, and a visible sparkle on Free and Pro) and OpenAI (C2PA plus an invisible pixel watermark) both mark their images. Paid Midjourney plans grant commercial use. Exact Gemini-app ownership wording was not verified from primary terms.

### Cited Findings
- YouTube: "We require creators to disclose AI-generated or altered content that seems realistic". "Creators don't need to disclose non-realistic content that's made with AI" (example: an AI-generated animation in a fully animated video). — [YouTube Help 14328491](https://support.google.com/youtube/answer/14328491)
- YouTube may automatically label content made with its own GenAI tools, content that "contains C2PA metadata", and content its systems detect as AI. Creators can change auto labels except for YouTube-tool content, C2PA-carrying content, and labels applied after manual review. — [YouTube Help](https://support.google.com/youtube/answer/14328491)
- For non-photorealistic or animated AI content, the label appears in the **expanded description**, not the player. "Disclosing AI content alone won't limit a video's audience or impact its eligibility to earn money". Repeated non-disclosure can lead to YPP suspension. — [YouTube Help](https://support.google.com/youtube/answer/14328491)
- YouTube moved to automatic AI labelling in late May 2026, driven by C2PA "fully AI-generated" metadata. Sources conflict on whether SynthID triggers labels; YouTube's own help page names only C2PA. — [The Next Web](https://thenextweb.com/news/youtube-will-now-automatically-label-ai-generated-videos-whether-creators-disclose-them-or-not); [c2paviewer](https://c2paviewer.com/articles/youtube-ai-labels-c2pa); [ChatForest](https://chatforest.com/builders-log/youtube-ai-auto-labeling-c2pa-synthid-builder-guide/)
- Google Nano Banana Pro: a visible "Gemini sparkle" watermark appears on images from **Free and AI Pro** users and is removed for **Ultra** subscribers and Google AI Studio (API) images. Invisible SynthID stays on every output, and C2PA metadata is also attached. — [implicator.ai](https://www.implicator.ai/google-charges-premium-users-to-remove-the-ai-watermarks-it-calls-critical); [eWeek](https://www.eweek.com/de/news/google-nano-banana-pro-release/)
- Google promised copyright indemnification "at general availability" for commercial (API/Vertex) use. Gemini-app consumer output terms were not retrieved. — [implicator.ai](https://www.implicator.ai/google-charges-premium-users-to-remove-the-ai-watermarks-it-calls-critical)
- OpenAI GPT Image 2: invisible C2PA metadata plus an imperceptible pixel watermark. The metadata strips on screenshot; the pixel mark survives most edits. Plus does not remove it, and the watermark does not restrict commercial licensing. **[blog claims, not OpenAI's own docs]** — [ChatCut](https://chatcut.io/blog/free-gpt-image-2); [aiml.site](https://aiml.site/reviews/gpt-image-2)
- Midjourney: all paid subscribers get commercial-use rights. Companies with more than US$1M gross annual revenue need Pro or Mega. Users "generally own" their assets, subject to plan rules. **[secondary sources]** — [eesel.ai](https://www.eesel.ai/blog/midjourney-pricing); [aivideobootcamp](https://aivideobootcamp.com/blog/midjourney-complete-guide-2026/)

### Inferences
- Clay-style animated Shorts fall under YouTube's non-realistic exemption. At worst, a C2PA-triggered auto label appears in the expanded description and does no monetisation harm. Disclosing voluntarily in Studio is low-risk and avoids the "consistent non-disclosure" penalty path.
- C2PA metadata on stills is usually stripped once images pass through an image-to-video tool and a video editor re-encode. Whether the final MP4 carries C2PA depends on the video tool (Veo/Flow output likely does). This is not verified.
- The visible Gemini sparkle on Free and Pro images is a practical problem. It sits in a corner and would carry into image-to-video. Options are cropping (9:16 framing with margin), routing final renders through the API/AI Studio (no visible mark per the source), or Ultra, which is too expensive. Whether removing the sparkle by cropping is allowed under Google's terms was not found.
- The channel is a solo creator well under US$1M revenue, so Midjourney Basic or Standard would cover commercial use.

### Gaps
- Primary text of Google's Generative AI Additional Terms (ownership of Gemini-app outputs; whether free-tier output can be used commercially) was not retrieved.
- Primary OpenAI terms and C2PA documentation were not retrieved, and neither were current Ideogram, Leonardo or Seedream commercial terms for free vs paid tiers. Free tiers of some tools historically restricted commercial use or made generations public. This is not verified for 2026.
- How YouTube treats C2PA in Shorts specifically was not found.

## 4. Best-practice workflow: reference sheet → consistent shots (prompt structure, seeds, upscaling, text artefacts)

### Takeaway
Creators converge on one approach. Lock each character with a reference/turnaround sheet (front, side and 3/4 views plus an expression row) on a plain background. Feed several of those references into a multi-image model for every new shot, and re-describe the fixed identity traits in text every time. Per-shot QA is still needed: back views, two-character frames and hands fail most often.

### Cited Findings
- Sheet layout: row 1 shows front neutral, left side and right side; row 2 shows expressions and poses (happy, angry, sad), on a white background. Others recommend a turnaround (front, side, back, 3/4) plus outfit, prop and expression variants. — [search summary of geeky-gadgets / mootion / selfielab guides](https://www.geeky-gadgets.com/character-consistency-workflow-reference-sheets/); [selfielabstudio sheets guide, Feb 2026](https://selfielabstudio.com/blog/nano-banana-pro-consistent-character-sheets-guide-20260220)
- "Expression boards": apply expressions from one image onto a consistent character reference in Nano Banana. — [CGTrader, 2025-09-17](https://www.cgtrader.com/blog/nano-banana-for-3d-artists)
- Supply 4–8 high-quality references with varied angles and expressions to Nano Banana Pro. **[single vendor]** — [selfielabstudio multi-ref](https://selfielabstudio.com/blog/nano-banana-pro-multi-ref-character-workflow-guide-20260313)
- The model adapts its rendering to match the reference's style. Toy-plastic and Pixar-like 3D prompts are common, but no source covered "clay" specifically. — [search summary, Runware Nano Banana 2 consistency guide](https://runware.ai/docs/models/google-nano-banana-2/guides/character-consistency)
- Testing protocol: use one reference and 8 fixed scene prompts (2 close-ups with different expressions, 2 three-quarter, 2 full scene, 1 style variation, 1 back view). Run each prompt at least twice, since outputs are non-deterministic. Human review beats CLIP scores for identity drift. — [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/)
- Nano Banana 2 API outputs come in 1K, 2K and 4K tiers. — [Tech Insider](https://tech-insider.org/consistent-ai-character-generator-test-2026/)

### Inferences (recommended workflow, synthesised; not from a single source)
1. **Pick one primary tool** and test it before committing. Recommended: Gemini app with Nano Banana Pro on AI Plus/Pro. Run the Tech-Insider-style 8-prompt test per character on the shortlist (Nano Banana Pro, Seedream 5.0 via free credits or API, FLUX.2/Kontext via a pay-per-image host).
2. **Write a fixed identity block per character** and paste it verbatim into every prompt. Mani: Tamil man ~25, deep-brown skin, thick black mustache, short side-parted hair, mustard half-sleeve shirt, dark-grey trousers. Paati: ~70, dark-wheatish skin, grey hair in a bun, big round red pottu, maroon silk saree with gold zari border, gold nose stud. Add a fixed **style block** as well: "stylised 3D clay render, soft matte plasticine texture, warm key light, shallow depth of field, rounded proportions, no text".
3. **Generate a reference sheet per character:** front, 3/4, side, back, plus a 6-expression row, on a plain light background. Keep the best sheet plus 3–5 cleaned single-view crops as the "reference pack". Never regenerate the pack, and version it in a folder.
4. **For each shot,** attach the reference pack (both packs for two-shots), then the identity block, style block and scene (action, setting, camera angle, 9:16 vertical). Prefer single-character frames; check two-shots for outfit or colour swap.
5. **Edit, don't re-roll:** fix drift with multi-turn edits ("keep everything, change only the expression to surprised") instead of new generations.
6. **QA checklist per image:** hands and finger count, saree drape and border, shirt colour, mustache, skin tone against the sheet, no stray text, nothing in the watermark corner.
7. **Resolution:** generate at 2K-class 9:16 where available (exceeds 1080×1920) or upscale. 1080×1920 is the delivery target for Shorts. Specific upscalers were not researched.
8. **Seeds:** chat-style tools (Gemini app, ChatGPT) do not expose seeds. Seeds matter only on API/Flux/Midjourney routes, and reference images matter more than seeds for identity.

### Gaps
- No source specifically on "clay" style consistency, or on 9:16 aspect-ratio support in the Gemini app vs API.
- Creator-community evidence (Reddit r/aivideo, r/midjourney, r/IndianCreators) was not retrieved in this pass. The workflow above leans on vendor tutorials.
- Upscaler recommendations, and whether image-to-video tools preserve clay texture, are out of scope here and not covered.

## 5. Tamil script inside images

### Takeaway
No source shows any 2026 image model rendering Tamil script reliably. Vendor claims of high non-Latin text accuracy list Hindi, Bengali and CJK, but not Tamil. Tamil text (verdict stamps such as UNMAI / POI in Tamil script, titles, captions) should be added in the video editor, and image prompts should include "no text, no letters".

### Cited Findings
- A GPT Image 2 vendor page claims about 99% character accuracy across Latin, Chinese, Japanese, Korean, Hindi and Bengali. **Tamil is not listed**, and the page notes complex or long strings can still fail. **[vendor-adjacent claim]** — [sunra.ai](https://sunra.ai/gpt-image-2/text-rendering)
- Ideogram claims 95% text-rendering accuracy vs 30–50% for most others, with no mention of Tamil or Indic scripts. **[vendor claim]** — [Ideogram](https://ideogram.ai/features/text-rendering/)
- The only Tamil-specific text-to-image research found is an older GAN paper (blurry outputs), which says nothing about current models. — [ACM, TAM GAN](https://dl.acm.org/doi/10.1145/3584019)

### Inferences
- Treat in-image Tamil as unsupported. Design shots with clean space for overlaid text, add Tamil text in CapCut-alternative or other editors with a proper Tamil font, and add "no text, no letters, no signage" to every prompt to avoid gibberish glyphs. Gibberish glyphs would also need to be inpainted out before image-to-video.
- English words such as "UNMAI" in Latin script may render acceptably in GPT Image / Ideogram / Nano Banana Pro, but editor overlay is still safer for consistency across Shorts.

### Gaps
- No independent benchmark of Tamil (or any Dravidian script) rendering in Nano Banana Pro, GPT Image 2.x, Seedream 5.0, Ideogram or FLUX.2. A quick hands-on test by Vasanth (5 prompts per tool) would close this.
