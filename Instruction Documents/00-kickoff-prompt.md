# Greencity Goa — Claude Code Kickoff Prompt

*Paste this directly into Claude Code once `/docs` and `/media` are populated. Reusable pattern for future projects too — swap the file names.*

---

Build the Greencity Goa landing page.

Read these first, in this order, before writing any code:

1\. docs/01-brief.md — project goal, audience, belief, tone, tracking/legal placeholders

2\. docs/02-content.md — final section-by-section copy, in exact page order (this doubles as the sitemap)

3\. docs/03-assets-manifest.md — every media file, what it is, and which section it belongs to

4\. docs/04-design-system.md — the target visual language (colors, type, components, signature artistic details)

5\. docs/reference/greencity-goa-landing-mockup.html — a working structural wireframe. Use this for SECTION ORDER, LAYOUT, and INTERACTIVE BEHAVIOR (floor plan tabs, FAQ accordion, sticky mobile CTA bar, floating WhatsApp button, lead form). Do NOT copy its color palette or fonts — that's the old direction, superseded. Restyle everything per 04-design-system.md instead.

6\. docs/reference/ screenshots of greencityindia.com and maehrhomes.com — the actual visual target for the new design system. Look at these images directly, don't just rely on the written description in 04-design-system.md.

Build spec:

\- Single-page, mobile-first, responsive site. Plain HTML/CSS/vanilla JS, no framework, no build step — should run by opening the file directly or with a simple static server.

\- Follow docs/02-content.md exactly for section order and copy. Use the actual headline/body/CTA text given — don't paraphrase or rewrite it.

\- Style everything per docs/04-design-system.md: forest-green/cream/leaf-green palette, Fraunces for headlines (mixed weights within a single headline where the doc calls for it), Inter or Manrope for body/UI text, pill-shaped buttons, organic image masking on villa/plot photography, the italic-gold stat-number pairing style.

\- Use real files from /media for every image, logo, and floor plan — map them using docs/03-assets-manifest.md. Do not use placeholder/stock images or emoji as icons.

\- For the custom hand-drawn icon glyphs described in the design system — if there are no sourced icon files in /media/icons, use a simple minimal line-icon fallback and flag it clearly as a placeholder. Don't invent a fake "artisanal" icon set that ends up looking off-brand.

\- Anything marked 🔶 in docs/02-content.md or \*TBD\* in docs/01-brief.md (unit mix, ROI numbers, RERA number, tracking IDs, possession timeline, etc.) — leave a clearly marked placeholder/TODO in the code and on-page copy. Don't invent a number or guess at one.

\- Forms should be fully functional in the UI (validation, field states) but don't wire a real submission endpoint yet — stub it with a clear TODO comment pointing at where the CRM/webhook integration goes once 01-brief.md's tracking section is filled in.

\- Leave clearly marked TODO comments in the \<head\> for where GA4/GTM/Meta Pixel/Google Ads snippets go once those IDs exist.

\- Don't set up hosting or deployment yet — just get the local build right first.

When you're done, give me:

1\. A short list of every 🔶/TBD item you had to leave as a placeholder, so I know exactly what's still blocking a real launch.

2\. Confirmation that every image referenced actually exists and loads — no broken image paths.

3\. How to preview it locally.  
