# Repair Story Publishing

When creating or editing repair articles:

- Reuse the existing editorial layout and shared CSS. Keep image/text spacing consistent throughout the article, including paired photo blocks followed by paragraphs.
- For the `lg-fan-noblesville.css` layout, preserve 32px desktop image/text column gaps, 28px desktop photo-block/text gaps, 24px mobile gaps, and 12px image/caption gaps. Undivided section spacing is 48px desktop and 36px mobile.
- All blog articles and repair stories use shared `article-dividers.css` and `article-dividers.js`, installed by `scripts/apply-article-dividers.mjs` and the generators. Alternate wrench and yellow-stripe motifs, never identical consecutive dividers. Limit to six per article, only before major sections after at least 70 words; do not divide individual paragraphs, captions, cards or FAQ questions.
- Divided boundaries use a total 96px gap on desktop (34px + 28px ornament + 34px) and 80px on mobile (28px + 24px + 28px). Keep both sides equal and never double up with old divider styles. Check every affected article at 1440, 768, 390 and 320px with `scripts/check-article-dividers.cjs`, inspect screenshots and repeat on production. Run this self-check during implementation, not only at the end.
- Run the article-specific browser test and `scripts/check-repair-story-spacing.cjs` before publishing. Set `PLAYWRIGHT_PATH` to the installed Playwright module when needed.
- Inspect screenshots of the overview, paired photographs with the following text, and alternating image/text sections at desktop and mobile widths. Check 1440, 768, 390 and 320px for overflow and overlap.
- When shared CSS changes, check every affected article and update the stylesheet cache version in both the generator and existing pages without rebuilding unrelated page content.
- Verify the published page again after deployment. Do not claim a visual or spacing check passed based only on HTML validation.
