# Microwave service scope

Microwave service is limited to integrated built-in microwave/wall-oven
combination appliances. Cabinet installation alone does not qualify a microwave.
Do not advertise over-the-range, countertop, drawer or standalone built-in
microwave repair. Confirm model support before booking.

Keep existing routes, canonical URLs, redirects and indexing directives.
Navigation and service copy use `Built-in Microwave + Oven Combo Repair`.
Do not replace the current service-tools image with an over-the-range appliance.

After regenerating legacy HTML, run:

```text
python scripts/update-microwave-scope.py
python scripts/update-microwave-scope.py --check
python scripts/check-microwave-scope.py
node --input-type=module -e "import {rebuildSitemaps} from './scripts/rebuild-sitemaps.mjs'; console.log(rebuildSitemaps())"
node scripts/check-microwave-layout.cjs
```

The layout test uses Playwright and installed Edge; `PLAYWRIGHT_PATH` can point
to an existing Playwright installation. An optional URL argument tests production.
It creates and closes its own local server, and writes screenshots to `previews/`.
The migration's original routing snapshot is local to `previews/`; when present,
the scope test also compares canonicals, robots, scripts and navigation targets.
The migration date records this editorial change, not a future publication date.

The site-wide SEO recovery audit currently reports two pre-existing links to
retired URLs in the Fishers Whirlpool capacitor and Westfield Kenmore gasket
repair stories. These are outside this change's scope.
