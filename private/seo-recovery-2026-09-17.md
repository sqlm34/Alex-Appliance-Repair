# SEO recovery deployment — 2026-09-17

## Evidence used

- Search Console export compared the latest 28 days with the previous period: clicks fell from 103 to 81 while impressions fell from 8,992 to 6,702.
- The decline overlapped Google’s August 2026 spam update.
- 101 duplicate city-brand pages produced 246 impressions and no clicks.
- 18 city-service pages selected for consolidation had no clicks and negligible impressions.

## Production changes

- Kept six brand pages supported by published original repair work: Bosch, Frigidaire, GE, KitchenAid, LG and Samsung.
- Consolidated 22 thin central brand pages and their city variants into the brand directory with direct 301 redirects.
- Consolidated 18 low-demand city-service pages into their city hubs with direct 301 redirects.
- Removed links to retired pages from indexable pages and pointed service navigation to the relevant core service page.
- Added direct links from Fishers, active local service pages and retained brand pages to documented repair stories with original job photos.
- Removed all 40 consolidated pages from XML sitemaps while retaining their files as redirect-safe fallbacks.

## Rollback

Revert the deployment commit. The previous HTML files remain in Git history; no content file was deleted.
