# Repair stories

The existing blog (`blog.html`) features repair stories; `recent-work.html` is the full archive. Each story has a permanent `/repair-cases/<slug>.html` URL. Existing archive fragment IDs are preserved. Existing advice articles stay at their original URLs.

## Add or update a story

1. Add approved photographs under `images/`. Remove private customer information from new assets before publishing.
2. Add an entry to `scripts/repair-cases.json`: a permanent unique slug, factual title and summary, location category, appliance category, publication/modification dates, and photos with dimensions and meaningful captions.
3. Add the three editorial paragraphs to `scripts/repair-case-notes.mjs`: service focus, work documented, and clearly distinguished general context. Describe only confirmed work. Do not infer the model, location, replaced part, measured result or service date from a similar job. Publication dates are dates of the story, not the repair visit.
4. Run `node scripts/build-repair-cases.mjs`. It creates static pages, archive cards, blog features, structured data and both sitemaps. No browser JavaScript is required to read stories or follow links.
5. Review the output, check local links, preview desktop/mobile, then publish through the existing repository deployment. Reuse an existing slug when correcting a story; do not remove indexed URLs casually.

The main legacy SEO generator invokes the story builder after its own changes. The builder also works independently and is repeatable. It preserves the site's current header/footer instead of introducing a second design system.

The archive retains client-side city/appliance filters. All stories remain in its initial HTML. Filters do not generate extra search URLs. Six cards are featured: the Carmel gas-dryer case and five service-area entries; all 16 stories are available from the archive.

The initial 16 stories use the existing gallery descriptions. Nine Carmel entries were individual photographs within one mixed gallery; only the relevant photograph is carried into each story. Limited records are kept concise instead of inventing customer complaints or successful outcomes. Enrich them with actual technician notes when available.
