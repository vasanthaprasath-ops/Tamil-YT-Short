# Platform mechanics: YouTube Shorts, Instagram Reels, Facebook Reels (official vs folklore, as of Nov 2026)

Grades: [OFFICIAL] = platform's own page/post; [REPUTABLE-PRESS] = reputable outlet reporting an official statement; [PRACTITIONER-DATA]; [VENDOR] = tool/agency blog; [MYTH/UNVERIFIED].
Research budget note: ~18 tool calls. Several primary pages (YouTube Help Shorts-discovery article, Mosseri's original videos, Meta's 2026 "original content" definition) could not be fetched directly; where so, the press report is the best evidence and is graded accordingly.

## YouTube Shorts: how recommendations work

### Takeaway
YouTube's own statements say Shorts are recommended by testing a Short on a "seed audience" and expanding if viewers choose to watch rather than swipe; there is no ideal length, posting time does not matter (except news), volume does not beat quality, and deleting/re-uploading looks like spam. Since 31 Mar 2025 public "views" count every start and replay; "engaged views" (the old threshold) still drive YPP and are the number to compare against.

### Cited Findings
- **Seed-audience testing, then taper.** Shorts product lead Todd Sherman (Aug 2023): the algorithm tests a seed audience and results may "taper off"; "There are parts of the algorithm that try and find people, find creators an audience." [REPUTABLE-PRESS, dated 2023-08-25] — [TechCrunch via Yahoo](https://finance.yahoo.com/news/youtube-demystifies-shorts-algorithm-views-161321949.html); [TechCrunch original](https://techcrunch.com/2023/08/25/youtube-demystifies-the-shorts-algorithm-views-and-answers-other-creator-questions/)
- **Swipe feed differs from long-form:** viewers don't choose what comes next, so the "chose to view" decision is the key early signal; YouTube favours a varied feed. [REPUTABLE-PRESS, 2023] — same TechCrunch source
- **"Viewed vs swiped away" metric:** YouTube Studio shows "Shown in feed" and "How many chose to view" (percentage viewed vs swiped away) under Analytics > Content > Shorts. Exact recommendation weight and any cutoff are NOT published. Benchmarks such as "70–90% viewed is good" are community estimates. [VENDOR describing official Help text; MYTH/UNVERIFIED for benchmarks] — [OutlierKit](https://outlierkit.com/resources/youtube-shorts-algorithm/), [CreatorEssentials glossary](https://www.creatoressentials.com/glossary/viewed-vs-swiped-away/)
- **Length:** No ideal length; "as long as the story needs" (2023, when cap was 60 s). [REPUTABLE-PRESS, 2023] — TechCrunch above
- **3-minute Shorts:** square/vertical uploads up to 3 min after 15 Oct 2024 are Shorts (Official Artist Channels from 8 Dec 2025); earlier uploads stay long-form; use 16:9 to avoid Shorts classification. [OFFICIAL] — [YouTube Help: Understand three-minute Shorts](https://support.google.com/youtube/answer/15424877?hl=en)
- **Over-1-minute + Content ID = global block:** "Any Short that is over one minute in duration with an active copyright claim of any type, including manual claims, will be blocked globally." Blocked Shorts are not playable, recommended or monetised; no channel penalty; YouTube Audio Library music "won't receive a Content ID claim"; most Shorts-library songs usable up to 90 s (some 60/30 s). [OFFICIAL] — [YouTube Help 15424877](https://support.google.com/youtube/answer/15424877?hl=en). (Confirms PROJECT-CONTEXT §5 music rule.)
- **Help page is silent on how longer Shorts are ranked** vs short ones. [OFFICIAL, by omission] — same page
- **Posting time:** not a factor to optimise, except news/freshness. [REPUTABLE-PRESS, 2023] — TechCrunch above
- **Frequency:** publishing volume does not drive traction; quality over quantity. [REPUTABLE-PRESS, 2023] — TechCrunch above
- **Don't delete & re-upload** a Short to revive it; may be seen as spam. [REPUTABLE-PRESS, 2023] — TechCrunch above
- **Hashtags:** "can be useful," should be used, but hard to generalise. [REPUTABLE-PRESS, 2023] — TechCrunch above
- **Thumbnails:** custom thumbnails unnecessary for Shorts because viewers don't see thumbnails while swiping; thumbnail only matters on shelves/entry points. [REPUTABLE-PRESS, 2023] — TechCrunch above
- **Cannibalisation:** YouTube said (2023) it does not view Shorts as cannibalising long-form, and added Shorts-to-long-form links. [REPUTABLE-PRESS, 2023] — TechCrunch above. Contradicting data: a 2026 article cites a peer-reviewed analysis of 250 large channels showing long-form declines after starting Shorts [PRACTITIONER-DATA, not verified at source] — [TubeFilter 2026-08-03](https://www.tubefilter.com/2026/08/03/youtube-shorts-long-form-study-metricool/). The widely quoted Todd Beaupré line about Shorts/long-form "same channel" has no locatable primary source [MYTH/UNVERIFIED] — [PandaVideo](https://www.pandavideo.com/blog/shorts-and-long-form-videos-same-channel)
- **View-count change (31 Mar 2025):** a Shorts view now counts on every start or replay with no minimum watch time; the old threshold is kept as "engaged views," which govern YPP eligibility and revenue; YouTube recommends engaged views for before/after comparisons (Studio > Analytics > Advanced mode). [REPUTABLE-PRESS reporting official] — [ppc.land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/), [Entrepreneur](https://www.entrepreneur.com/business-news/youtube-shorts-will-see-more-view-counts-earnings/489190), [eMarketer](https://emarketer.com/content/youtube-shorts-changes-view-count-rules-match-tiktok--instagram)

### Inferences
- Loops inflate public views but not engaged views; a loop-friendly ending pads the public counter, while the YPP 10M/20M bars (PROJECT-CONTEXT §6) are, per the March 2025 statement, engaged-view based — worth confirming against the Aug 2026 YPP post wording.
- For a faceless channel with no licensed music, 1–3 min Shorts carry no extra copyright risk; the length should follow the story, not a target.
- The highest-leverage creator-visible metric is "chose to view" (the first second) followed by retention; neither has a published threshold.

### Gaps
- Could not fetch a current official YouTube Help page describing Shorts recommendation signals; the 2023 TechCrunch report is the most detailed official statement found. Creator Insider / Rene Ritchie 2025-26 statements were not located in this pass.
- Shorts thumbnail/frame-selection feature: no source found in this pass; do not assume details.
- Remix rules: Help page only links "Create YouTube Shorts with remixed content"; not read.
- One vendor source claims an Oct 1 2026 "originality" Shorts recommendation change; unverified — [OutlierKit](https://outlierkit.com/resources/youtube-shorts-algorithm/).
- Titles/descriptions on Shorts: no official statement found.

## Instagram Reels: ranking signals and rules

### Takeaway
Mosseri (Jan 2025) named watch time, likes and sends as the top three signals, told creators to watch average watch time, likes per reach and sends per reach, and said sends matter slightly more for reaching non-followers. Unoriginal/reposted content loses recommendation eligibility (account-level, 10+ unoriginal posts in 30 days for Reels; extended to photos/carousels Apr 2026). Trial Reels let you test on non-followers first.

### Cited Findings
- "The top three signals that matter most for ranking are watch time, likes and sends." Check "average watch time, likes per reach, and sends per reach." "Likes are slightly more important for connected content, and sends are slightly more important for unconnected content." [REPUTABLE-PRESS reporting official, 2025-01-22] — [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)
- Comments were not among the named signals (author observation). — same source
- 2024 Mosseri Q&A: sends per reach "correlate more ... with overall reach than anything else." [REPUTABLE-PRESS/secondary, 2024] — [Social Samosa](https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916)
- Claims that sends are weighted "3–5x" likes have no primary source [MYTH/UNVERIFIED] — [Buffer guide](https://buffer.com/resources//instagram-algorithms/) and similar vendor guides
- **Originality (Reels):** Instagram stops recommending Reels from accounts that posted unoriginal content 10+ times in the previous 30 days; reposts get a label crediting the original. [REPUTABLE-PRESS reporting official] — [Engadget](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)
- **Extension Apr 2026:** accounts that mainly share content they didn't create or "meaningfully transform" are not recommended to non-followers, judged on the account's content mix over a month; Mosseri's fixes: remix, add commentary/voiceover, collaborate with the original creator. [REPUTABLE-PRESS reporting official, 2026-04-30] — [TubeFilter](https://tubefilter.com/2026/04/30/instagram-removes-algorithm-recommendations-repost-content-aggregator), [PetaPixel](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/)
- **Watermarks/low quality (Feb 2021):** Reels with visible watermarks/logos from other apps, blurry low-res video, borders, or mostly covered by text are made "less discoverable" in the Reels tab (followers still see them). [REPUTABLE-PRESS reporting official, 2021 — current status not re-verified] — [TubeFilter 2021](https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/), [The Next Web](https://thenextweb.com/news/instagram-wont-recommend-reels-with-a-tiktok-logo-and-its-unfair)
- **3-minute Reels:** announced ~20 Jan 2025 by Mosseri (from 90 s); profile grid moved to vertical at the same time. [REPUTABLE-PRESS reporting official] — [Social Media Today](https://www.socialmediatoday.com/news/instagram-officially-expands-reels-length-to-3-minutes/737766/), [Business Today](https://www.businesstoday.in/technology/news/story/instagram-head-announces-big-changes-to-reels-and-instragram-app-461527-2025-01-21)
- **Trial Reels (launched 10 Dec 2024):** shown to non-followers first; not on grid/Reels tab/followers' feeds until shared; optional auto-share if it performs well (~72 h per secondary sources); later opened to public accounts with 1,000+ followers. [OFFICIAL for launch] — [Instagram Creators blog](https://creators.instagram.com/blog/instagram-trial-reels); [REPUTABLE-PRESS for eligibility] — [Social Media Today](https://socialmediatoday.com/news/instagram-expands-access-trial-reels/752895/)
- Claim that trials "almost always get less reach" than regular Reels attributed to Mosseri only by vendor blogs [MYTH/UNVERIFIED] — [PostFast](https://postfa.st/blog/instagram-trial-reels)
- **Insights (Apr 2026 rebuild):** Reels now show a retention chart, **skip rate** (% of views skipped within the first 3 seconds; replaced "view rate"), share rate, views over time. [REPUTABLE-PRESS/VENDOR describing product] — [Social Samosa](https://www.socialsamosa.com/news-2/instagram-retention-chart-skip-rate-new-performance-metrics-reels-9730992), [Inro](https://www.inro.social/blog/instagram-insights-update)

### Inferences
- Design for a reason to DM ("send this to your paati") over a reason to like; sends-per-reach is the non-follower lever. This matches PROJECT-CONTEXT §5 (confirms).
- Instagram's own skip-rate metric is defined on the first 3 seconds, so "first 3 s matter" has official support as a measured metric, but no official multiplier.
- An originally produced animated channel is on the safe side of the originality rules; the risk is only reposting someone else's clip without transformation.

### Gaps
- Edits app captions/text: no official ranking statement found.
- Hashtags on Instagram: no official 2025-26 statement located in this pass (folk claims vary).
- Cover image effect on ranking: no official source found.
- Formal "Recommendation guidelines" page (Instagram Help) not fetched; 2021 watermark rule not re-verified for 2026.

## Facebook Reels: Meta's guidance

### Takeaway
Since July 2025 Meta reduces distribution and can demonetise Facebook accounts that repeatedly reuse others' videos/photos/text without meaningful change (simple reactions, compilations in scope), and adds links from duplicates to the original. Meta further defined "original" in March 2026.

### Cited Findings
- July 2025: accounts repeatedly reposting others' content may be made non-recommendable and lose monetisation; duplicate videos get reduced distribution; Meta tested linking duplicates to the original. [REPUTABLE-PRESS reporting official, 2025-07-14/15] — [iPhone in Canada](https://www.iphoneincanada.ca/2025/07/15/meta-crackdown-unoriginal-facebook-content/), [Lindsey Gamble](https://www.lindseygamble.com/blog/facebook-will-limit-reach-and-monetization-of-unoriginal-content)
- Meta reported views and time spent on original Reels on Facebook roughly doubled in H2 2025 vs H2 2024. [REPUTABLE-PRESS reporting official] — summarised from [Social Media Today](https://www.socialmediatoday.com/news/meta-adds-more-measures-to-ensure-original-creators-get-credit/814764/)
- March 2026: Facebook content guidelines updated to define "original," plus impersonator reporting and content-protection tools. [REPUTABLE-PRESS] — [TechCrunch 2026-03-13](https://techcrunch.com/2026/03/13/facebook-makes-it-easier-for-creators-to-report-impersonators/), [MediaPost](https://www.mediapost.com/publications/article/413530/) (paywalled/403, not read)

### Inferences
- Cross-posting your OWN Reel from Instagram to Facebook is not the target of these rules (they target reuse of others' content); no source found penalising own-content cross-posts.

### Gaps
- Exact text of Meta's March 2026 "original" definition not read (MediaPost 403).
- Facebook Professional Dashboard metrics specifics not researched in this pass.

## Cross-posting the same master to all three

### Takeaway
Officially: upload clean native masters, no other-app watermarks (Instagram 2021 rule), no reposting others' content (Instagram and Facebook originality rules), and on YouTube keep any copyrighted audio out of anything over 60 s. No official source forbids posting your own same video on all three.

### Cited Findings
- Instagram de-prioritises watermarked/recycled-from-other-apps Reels in discovery. [REPUTABLE-PRESS reporting official, 2021] — [TubeFilter](https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/)
- Instagram/Facebook originality penalties target unoriginal (others') content, judged account-wide. — [Engadget](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html), [iPhone in Canada](https://www.iphoneincanada.ca/2025/07/15/meta-crackdown-unoriginal-facebook-content/)
- YouTube: >1 min Short with any Content ID claim is blocked globally. [OFFICIAL] — [YouTube Help](https://support.google.com/youtube/answer/15424877?hl=en)

### Inferences
- Export one clean master without app watermarks; add platform text/captions natively per app. Confirms PROJECT-CONTEXT §5 "Meta" bullet.

### Gaps
- No official YouTube statement found on Shorts that were first posted elsewhere (YouTube's reused-content policy is covered in PROJECT-CONTEXT §5).

## Metrics creators can see and how to read them

### Takeaway
YouTube: Shown in feed, % chose to view (vs swiped away), views vs engaged views, retention. Instagram: watch time, likes/sends per reach, retention chart, skip rate (first 3 s), share rate.

### Cited Findings
- YouTube "Shown in feed" / "How many chose to view" under Analytics > Content > Shorts. [VENDOR citing Help] — [OutlierKit](https://outlierkit.com/resources/youtube-shorts-algorithm/)
- YouTube engaged views as secondary metric in Advanced mode; use for period comparisons. [REPUTABLE-PRESS reporting official] — [ppc.land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/)
- Instagram: average watch time, likes per reach, sends per reach (Mosseri). — [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)
- Instagram retention chart + skip rate (first 3 s) + share rate (Apr 2026). — [Social Samosa](https://www.socialsamosa.com/news-2/instagram-retention-chart-skip-rate-new-performance-metrics-reels-9730992), [Inro](https://www.inro.social/blog/instagram-insights-update)

### Inferences
- Read in order: did they stop (chose-to-view / skip rate) → did they stay (retention curve drop points) → did they pass it on (sends/shares per reach). Compare per-reach rates, not raw counts.

### Gaps
- No official "good" thresholds exist for any of these on any platform.

## Common myths vs official sources

### Takeaway
Most numeric folklore ("first 3 s = 2.2x views", "post at 6 pm", "sends = 3–5x likes", "70–90% viewed") has no official source; YouTube officially downplays posting time and volume.

### Cited Findings
- "Post at X time": YouTube says time of day isn't a factor except news (2023). [REPUTABLE-PRESS reporting official] — [TechCrunch](https://techcrunch.com/2023/08/25/youtube-demystifies-the-shorts-algorithm-views-and-answers-other-creator-questions/). Instagram: no official statement found.
- "Post more = more reach": YouTube says volume doesn't drive traction (2023). — same
- "Hashtags boost reach": YouTube says useful but not generalisable (2023) — same; no official Instagram 2025-26 statement found [MYTH/UNVERIFIED as a reach boost].
- "First 3 s = 2.2x views": no source found [MYTH/UNVERIFIED]; consistent with PROJECT-CONTEXT §5 note that viral "first 3 seconds" percentages have no real source. Instagram's skip-rate metric (first 3 s) does exist officially as a measurement.
- "Sends weigh 3–5x likes": [MYTH/UNVERIFIED] — vendor guides only.
- "Viewed vs swiped 70–90% target": [MYTH/UNVERIFIED] — [CreatorEssentials](https://www.creatoressentials.com/glossary/viewed-vs-swiped-away/)
- "Delete and re-upload a flop": YouTube says may be treated as spam. [REPUTABLE-PRESS reporting official] — TechCrunch above

### Inferences
- Optimise the opening frame, retention and shareability; ignore posting-time and hashtag hacks.

### Gaps
- The specific "2.2x" claim's origin was not traced.
- PROJECT-CONTEXT §5-6 items (YPP Feb 2027, inauthentic content, AI labels) were not re-researched; nothing found contradicts them, and the music/Content ID and Meta-originality points are confirmed.
