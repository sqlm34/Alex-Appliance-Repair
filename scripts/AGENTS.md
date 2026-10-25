# Repair Story Requirements

- Never emit replacement-part numbers in article content, FAQs, captions, alt text, SEO metadata or structured data. Use component names only, and check generated output before publication. Verified appliance model numbers and diagram position/callout numbers remain allowed.

- Preserve the shared alternating article-divider system for every new article. Follow the root AGENTS.md density and symmetric spacing rules; add assets through `articleDividers` from `apply-article-dividers.mjs`. Run the divider browser regression test before and after deployment. Never insert a divider inside photo/caption blocks or individual FAQ answers.

- For more than one supplied diagram, use overviewImages and a manual slider in the right half of Visit Overview, with visible previous/next arrow buttons styled to the site. Keep diagrams uncropped, support mobile use, and do not add visible diagram captions. A single diagram remains a plain image without slider controls.

- When the user supplies a Photoshop-prepared repair diagram, place it in the right half of the Visit Overview block using overviewImage; keep the overview text and call button on the left. On mobile, stack these using the existing responsive layout. Do not repeat the diagram at the start of the article body. Preserve the supplied diagram without visible explanatory captions or commentary about brand/model differences. Keep the appliance model verified from its actual label.

- When the user supplies a photograph of an appliance model label, verify the model against that photograph and include a readable, unretouched crop of its model-number area in the article. Do not invent or recreate label text. Keep serial numbers out of the crop when practical.
- Preserve the established repair-story layout: desktop text and heading blocks centered against their associated photograph, captions inset slightly from the photograph edges, and responsive mobile stacking.
- Separate the technician's confirmed findings from inferred causes or unverified leak paths. Do not invent measurements, repair durations, or test results.
- Before authorized publication, verify metadata, canonical URL, structured data, local links, image dimensions, sitemaps, desktop/mobile layout and gallery interaction. Verify the deployed page and media afterward.
- Do not advertise a fixed repair warranty, parts-and-labor coverage, free repeat repairs or a satisfaction guarantee. Describe careful workmanship, clear communication and post-repair checks without promising coverage or a duration. Keep manufacturer coverage guidance distinct from our own service.
