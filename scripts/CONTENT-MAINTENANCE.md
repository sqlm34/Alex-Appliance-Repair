# Maintaining the September content improvements

The September 17 SEO recovery consolidates 22 thin brand pages and 18 low-demand city-service pages. Their files remain in the repository, but `.htaccess` sends those public URLs directly to the selected replacement page and the XML sitemaps omit them. Keep the redirect map in `private/seo-redirect-map-2026-09-17.csv` aligned with any future URL change.

## Editorial source

- `recovery-articles.mjs` contains the five revised articles. Their existing URLs and headings are retained.
- `content-recovery.mjs` applies the reviewed brand copy, service preparation, documented gallery links and exact placeholder-comment removal. It is idempotent and is also called by `rebuild-local-seo.mjs` before pages are written.
- Do not invent customer reviews, job locations, models, diagnoses, dates, qualifications or guarantees. New cases need actual job documentation. Current service-area examples must not be relabelled as Fishers, Westfield or Noblesville jobs without evidence.

From the repository root, apply only these editorial improvements:

```sh
node --input-type=module -e "import {applyRecovery} from './scripts/content-recovery.mjs'; console.log(applyRecovery())"
```

Apply the reviewed SEO recovery and rebuild the filtered sitemaps with:

```sh
node scripts/rebuild-local-seo.mjs
node scripts/audit-seo-recovery.mjs
```

The default command is idempotent and preserves the current hand-reviewed city-page design. The older whole-site generator is available only through `node scripts/rebuild-local-seo.mjs --full-rebuild`; review its complete diff before publishing because it replaces major page sections.

## Sitemaps

`content-dates.json` stores the dates of substantial page-content changes. Update only the affected entries when publishing a meaningful edit. Do not change all dates on each deployment. New pages without a known modification date may omit lastmod.

```sh
node --input-type=module -e "import {rebuildSitemaps} from './scripts/rebuild-sitemaps.mjs'; console.log(rebuildSitemaps())"
```

The builder uses the canonical page list in sitemap.xml and optional new paths. It rejects canonical mismatches and noindex pages. The image sitemap is rebuilt from existing images in each page's main content; header/footer images and obsolete redirected page addresses are not included.

## Release checks

1. Preserve intended canonical URLs, H1s, booking links and existing redirect behavior.
2. Parse both XML files; check every sitemap page returns 200 and every listed image exists on that page.
3. Check JSON-LD remains valid and describes visible content. Removed FAQ sections must not remain in FAQPage markup.
4. Check articles, brand pages and new repair cards on desktop and a narrow viewport.
5. After publishing, compare live files with the release and record the release date before evaluating Search Console changes.

After the host finishes deploying, verify all sitemap pages and the complete redirect map against production:

```sh
node scripts/audit-production-seo.mjs
```

Measure US search clicks/impressions and fixed commercial queries over complete comparable periods, separately from booking clicks and completed leads. A booking click is not a completed repair request. Do not publish new conversion claims without checking the booking system's actual completion event.
