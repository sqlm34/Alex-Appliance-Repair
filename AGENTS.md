# Repair Story Publishing

When creating or editing repair articles:

- Reuse the existing editorial layout and shared CSS. Keep image/text spacing consistent throughout the article, including paired photo blocks followed by paragraphs.
- For the `lg-fan-noblesville.css` layout, preserve 32px desktop image/text column gaps, 28px desktop photo-block/text gaps, 24px mobile gaps, and 12px image/caption gaps. Section spacing is 48px desktop and 36px mobile.
- Run the article-specific browser test and `scripts/check-repair-story-spacing.cjs` before publishing. Set `PLAYWRIGHT_PATH` to the installed Playwright module when needed.
- Inspect screenshots of the overview, paired photographs with the following text, and alternating image/text sections at desktop and mobile widths. Check 1440, 768, 390 and 320px for overflow and overlap.
- When shared CSS changes, check every affected article and update the stylesheet cache version in both the generator and existing pages without rebuilding unrelated page content.
- Verify the published page again after deployment. Do not claim a visual or spacing check passed based only on HTML validation.
