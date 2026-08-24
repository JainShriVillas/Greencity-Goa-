# Greencity Goa — Design System v2 (Reference-Driven)
*Supersedes the v1 palette pulled from the old "Moon's Path" brochure wireframe. This version is built directly off two reference sites you shared: **greencityindia.com** (weekend homes / villas / farmlands / NA plots) and **maehrhomes.com** (luxury Goa villas). Colors below are eyeballed from screenshots, not sampled from live CSS — confirm exact hex before final build.*

## Why the shift
V1 leaned gold/brown, styled after the old resort-brochure aesthetic. This direction is greener, more editorial, more "nature retreat" than "resort brochure" — which actually fits a project literally named Greencity better. Recommend this replaces v1 as the working target; the existing wireframe will need a visual pass to match (flagging that as a next step, not doing it in this doc).

---

## Color palette

| Token | Approx. hex | Where it's used in the references |
|---|---|---|
| Cream (base) | `#F8F5EC` | Page background throughout both sites |
| Deep forest green | `#16281D` | Headlines, full-bleed dark section blocks (GreenCity's "NA Plots" block), primary text on cream |
| Leaf green (accent) | `#2F7A4F` | Logo mark, search bar accent/icon — a brighter, fresher green than the deep forest green above; used sparingly as a pop, not a base |
| Deep teal-green | `#14453D` | Maehr Homes logo, headline text, sticky button gradient — a cooler, more coastal-feeling green than GreenCity's forest tone |
| Terracotta / dusty clay | `#BD8271` | Category-divider block background (GreenCity's "Farmlands" section) — used as an occasional secondary block color, not a primary |
| Warm gold (accent) | `#B08D5A` | Italic stat label ("Projects" next to "21+") — close to the gold already used in the v1 palette, so there's natural continuity if you want to keep one gold thread across both directions |
| Muted sage/taupe | `#6E6B5E` | Body copy on cream backgrounds |
| White | `#FFFFFF` | Text over photos, button outlines |

Recommendation for Greencity Goa specifically: lead with **deep forest green + cream + leaf green accent** as the primary system (matches the brand name), and borrow Maehr's **warm gold italic stat label** and **mixed-weight headline** tricks as secondary artistic techniques. Use terracotta sparingly as an occasional block-background variant for visual rhythm, not a core color.

---

## Typography

**Headlines:** a display serif with real personality — generous letter-spacing on all-caps treatments ("MEMORIES LAST FOREVER."), and, notably, **mixed weights within a single headline** for emphasis (see "Where Every *Arch Has a Story* and Every *Home* Has a Soul" — alternating light/bold by phrase, not just bold-everything). This is a specific, learnable technique, not just "pick a nice serif."

Closest accessible match: **Fraunces** (Google Fonts) — it's a variable serif with a full weight range in one family plus a genuine italic, which is exactly what's needed to pull off the mixed-weight-headline trick and the italic taglines below without loading multiple font files. Treat this as a strong recommendation, not a confirmed match to whatever the references actually use.

**Italic taglines:** recurring pattern under section headers — "*Ready escapes, move right in.*", "*Design your dream home.*" Short, lowercase-start, italic, sits directly under an all-caps section label. Same serif family, italic cut.

**Eyebrow / label text:** small, uppercase, tracked out ("WHY GREENCITY?", "YOUR WEEKEND, YOUR WAY.") — clean sans, not the display serif.

**Body copy:** plain sans, muted color, no tracking. Suggest **Inter** or **Manrope** — either pairs cleanly against Fraunces without competing with it.

**Numerals as design elements:** large serif numerals used decoratively, not just as data — "21+" in bold serif paired with "Projects" in smaller italic gold serif right beside it; ghost/translucent oversized numerals ("04") watermarked behind portfolio card text. Numbers get treated as typography, not just stats.

---

## Signature artistic elements (the specific "vibe" moves worth replicating)

These are the details that make these two sites read as premium rather than template — worth calling out individually since they're each a real production decision, not a CSS one-liner:

1. **Organic-shaped image masks.** Photos aren't plain rectangles — the Villas section image is masked into an asymmetric rounded blob shape; the NA Plots image sits inside a Romanesque arch shape. This needs actual CSS clip-path or SVG masking work per image, not a border-radius.
2. **Mixed-weight expressive headlines.** Covered above under typography — light and bold weights alternating within one heading line for emphasis and rhythm.
3. **Custom hand-drawn icon glyphs.** The four icons in Maehr's "21+ Projects" section (leaf/branch, spiral/key motif, shell, community figures) have a textured, stamp/linocut quality — not flat vector icons from a standard icon library. This is a real illustration task: either commission custom icons in this style, or source a specific hand-drawn icon pack that matches — a generic icon font won't get this feel.
4. **Ghost/translucent numeral overlays.** Large, low-opacity numbers layered behind text on portfolio/project cards ("04" behind "Villa Olivia") — decorative depth without adding visual noise.
5. **Faint background line-art texture.** A very low-opacity mountain silhouette illustration sits behind the "Reimagine Weekends" text block — texture that's felt more than seen.
6. **Diagonal/angled image crops** used occasionally as a section-break device (the wood-and-sky diagonal tile in Featured Projects) rather than every image being a straight rectangle.

---

## Buttons & CTAs

- **Outline pill:** fully rounded (pill-shaped), transparent background, 1px border (white on photos, dark on cream), uppercase tracked text, generous horizontal padding — used for primary in-page CTAs ("CONTACT US", "EXPLORE VILLAS", "EXPLORE NA PLOTS", "EXPLORE PROJECTS")
- **Solid gradient pill:** teal gradient fill, white text, paired with a small circular arrow-icon button — used for the sticky, high-intent CTA ("Enquire Now" on Maehr Homes, fixed at the bottom of the viewport)
- **Text-only link CTAs:** small tracked uppercase text under an image, no button box at all ("EXPLORE VILLAS" sits directly under the villa photo, not inside a bordered button)

## Section patterns

Sections alternate between cream backgrounds, full-bleed photography, and **solid color-block sections** used as category dividers rather than plain white cards — the terracotta "Farmlands" block and the deep-green "NA Plots" block both work this way, turning a simple list of property types into something that reads as distinct, considered categories rather than a repeated card template.

Floor plan renders are **colored, not technical line drawings** — green landscaping fills, gray floor fills — closer to a lifestyle illustration than an architect's blueprint, which reads more approachable for a buyer audience.

---

## What's confirmed vs. what needs sourcing

- **Colors:** eyeballed from screenshots — get real hex values if you can access either site's CSS directly, otherwise treat the table above as a close approximation to build against
- **Fonts:** Fraunces + Inter/Manrope is a recommended match for the *feel*, not a confirmed identification of the actual fonts these sites use
- **Custom icons:** genuinely need illustration work or a sourced hand-drawn icon pack — flagging this now so it doesn't become a late surprise in the build
- **Image masking:** needs per-image CSS/SVG work, not a global style — budget real time for this, it's not a one-line change
