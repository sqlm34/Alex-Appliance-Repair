import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rebuildSitemaps } from "./rebuild-sitemaps.mjs";
import { story as lgRangeStory } from "./lg-range-story.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://alex-repair.com/";
const TODAY = "2026-09-17";

const indexedBrands = new Set(["bosch", "frigidaire", "ge", "kitchenaid", "lg", "samsung"]);
const retiredBrands = [
  "amana", "bertazzoni", "dacor", "electrolux", "fisher-paykel", "gaggenau", "haier", "hisense",
  "jenn-air", "kenmore", "liebherr", "maytag", "midea", "miele", "sharp", "smeg", "speed-queen",
  "sub-zero", "thermador", "viking", "whirlpool", "wolf"
];
const retiredServices = [
  ["carmel", "cooktop"], ["carmel", "microwave"], ["fishers", "microwave"],
  ["mccordsville", "cooktop"], ["mccordsville", "dishwasher"], ["mccordsville", "freezer"], ["mccordsville", "microwave"],
  ["westfield", "cooktop"], ["westfield", "freezer"], ["westfield", "microwave"], ["westfield", "refrigerator"], ["westfield", "washer"],
  ["zionsville", "cooktop"], ["zionsville", "dishwasher"], ["zionsville", "freezer"], ["zionsville", "microwave"], ["zionsville", "refrigerator"], ["zionsville", "stove"]
];
const retiredPaths = new Set([
  ...retiredBrands.map((slug) => `brands/${slug}-appliance-repair.html`),
  ...retiredServices.map(([city, service]) => `${city}/${service}-repair-services.html`)
]);

const cases = [...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/repair-cases.json"), "utf8")), lgRangeStory];
const caseBySlug = new Map(cases.map((item) => [item.slug, item]));
const brandCases = {
  bosch: ["service-area-bosch-dishwasher-pump"],
  frigidaire: ["service-area-frigidaire-freezer-fan"],
  ge: ["ge-dishwasher-leak-repair-fishers-indiana"],
  kitchenaid: ["carmel-kitchenaid-ksdg950ess1-bake-element", "carmel-kitchenaid-door-switch"],
  lg: ["lg-dle3400w-dryer-thermostat-vent-repair-fishers-indiana", "carmel-lg-lde4413st-terminal-block", "service-area-lg-washer-suspension"],
  samsung: ["service-area-samsung-washer-valve"]
};
const serviceCases = {
  "carmel/dishwasher-repair-services.html": ["carmel-dishwasher-fill-funnel"],
  "carmel/freezer-repair-services.html": ["carmel-freezer-evaporator-fan"],
  "carmel/refrigerator-repair-services.html": ["carmel-cafe-cve28dp2njs1-freezer-drain", "carmel-kitchenaid-door-switch", "carmel-refrigerator-drain-cleaning"],
  "carmel/stove-repair-services.html": ["carmel-kitchenaid-ksdg950ess1-bake-element", "carmel-range-control-wiring"],
  "fishers/dishwasher-repair-services.html": ["ge-dishwasher-leak-repair-fishers-indiana"],
  "fishers/dryer-repair-services.html": ["lg-dle3400w-dryer-thermostat-vent-repair-fishers-indiana"]
};
const substantivePages = new Set([
  "brands.html",
  ...[...indexedBrands].map((brand) => `brands/${brand}-appliance-repair.html`),
  ...Object.keys(serviceCases),
  "carmel/dryer-repair-services.html",
  "fishers.html"
]);

const changed = new Set();
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), "utf8");
function write(relative, value) {
  const file = path.join(ROOT, relative);
  const before = fs.readFileSync(file, "utf8");
  const eol = before.includes("\r\n") ? "\r\n" : "\n";
  const normalized = value.replace(/\r?\n/g, eol);
  if (before !== normalized) {
    fs.writeFileSync(file, normalized);
    changed.add(relative.replaceAll("\\", "/"));
  }
}
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function repairCard(item) {
  const photo = item.photos?.[0];
  if (!photo) throw new Error(`Missing photo for ${item.slug}`);
  const url = `${BASE}repair-cases/${item.slug}.html`;
  const title = item.cardTitle || item.headline || item.title;
  const location = item.city === "service-area" ? "Documented service call" : `${item.city[0].toUpperCase()}${item.city.slice(1)}, Indiana`;
  return `<article class="local-service-card">
      <a class="local-service-card-media" href="${url}"><img src="${BASE}${photo.src}" alt="${escapeHtml(photo.caption || title)}" width="${photo.width}" height="${photo.height}" loading="lazy"></a>
      <div class="local-service-card-copy"><p class="local-eyebrow">${location}</p><h3><a href="${url}">${escapeHtml(title)}</a></h3><p>${escapeHtml(item.summary)}</p><a class="local-text-link" href="${url}">View the documented repair</a></div>
    </article>`;
}

function proofSection(slugs, eyebrow, heading, intro, marker = "seo-repair-proof") {
  const selected = slugs.map((slug) => {
    const item = caseBySlug.get(slug);
    if (!item) throw new Error(`Unknown repair case: ${slug}`);
    return repairCard(item);
  }).join("\n");
  return `<section class="local-section local-section--soft" data-content-recovery="${marker}">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">${eyebrow}</p><h2>${heading}</h2><p>${intro}</p></header>
    <div class="local-service-card-grid local-repair-proof-grid">${selected}</div>
  </div>
</section>`;
}

function replaceMarkedSection(html, marker, section) {
  const markerAt = html.indexOf(`data-content-recovery="${marker}"`);
  if (markerAt < 0) return null;
  const start = html.lastIndexOf("<section", markerAt);
  const end = html.indexOf("</section>", markerAt);
  if (start < 0 || end < 0) throw new Error(`Malformed marked section: ${marker}`);
  return `${html.slice(0, start)}${section}${html.slice(end + 10)}`;
}

function insertBeforeEyebrow(html, eyebrow, section) {
  const at = html.indexOf(`<p class="local-eyebrow">${eyebrow}</p>`);
  if (at < 0) throw new Error(`Insertion point not found: ${eyebrow}`);
  const start = html.lastIndexOf("<section", at);
  if (start < 0) throw new Error(`Section start not found: ${eyebrow}`);
  return `${html.slice(0, start)}${section}\n${html.slice(start)}`;
}

function updateBrandsDirectory() {
  let html = read("brands.html");
  html = html.replace(
    /<h2 id="brand-grid-title">[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>/i,
    '<h2 id="brand-grid-title">Brands and documented repair experience</h2>\n        <p>Brands with original repair stories link to detailed pages. For other brands, share the model number during booking so equipment and parts support can be confirmed before the visit.</p>'
  );
  for (const match of html.matchAll(/<article class="brand-directory-card" id="([^"]+)">[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<div class="brand-city-links">[\s\S]*?<\/div>[\s\S]*?<\/article>/gi)) {
    const [card, slug, nameMarkup] = match;
    const replacement = indexedBrands.has(slug)
      ? `<div class="brand-city-links"><a href="${BASE}brands/${slug}-appliance-repair.html">View documented ${nameMarkup} repairs</a></div>`
      : '<div class="brand-city-links"><span>Model support confirmed during booking</span></div>';
    html = html.replace(card, card.replace(/<div class="brand-city-links">[\s\S]*?<\/div>/i, replacement));
  }
  write("brands.html", html);
}

function updateBrandPages() {
  for (const [brand, slugs] of Object.entries(brandCases)) {
    const relative = `brands/${brand}-appliance-repair.html`;
    let html = read(relative);
    const display = brand === "ge" ? "GE" : brand === "lg" ? "LG" : brand === "kitchenaid" ? "KitchenAid" : `${brand[0].toUpperCase()}${brand.slice(1)}`;
    const section = proofSection(slugs, "Original job photos", `Real ${display} repair work`, "These published repair stories show the model, condition found, diagnostic work and completed service from actual customer visits.", "seo-brand-repair-proof");
    const replaced = replaceMarkedSection(html, "seo-brand-repair-proof", section);
    if (replaced !== null) html = replaced;
    else {
      const beforeAt = html.indexOf('<section class="local-section local-section--blue">');
      if (beforeAt < 0) throw new Error(`Brand insertion point missing: ${relative}`);
      html = `${html.slice(0, beforeAt)}${section}\n${html.slice(beforeAt)}`;
    }
    write(relative, html);
  }
}

function updateServicePages() {
  for (const [relative, slugs] of Object.entries(serviceCases)) {
    let html = read(relative);
    const [city, file] = relative.split("/");
    const appliance = file.replace("-repair-services.html", "");
    const cityName = city[0].toUpperCase() + city.slice(1);
    const applianceName = appliance === "stove" ? "stove and oven" : appliance;
    const section = proofSection(slugs, "Original job photos", `Documented ${applianceName} repairs in ${cityName}`, "These repair stories show real equipment, model-specific diagnosis and completed work. Every appliance still receives its own diagnosis before a repair is approved.", "repair-proof");
    const replaced = replaceMarkedSection(html, "repair-proof", section);
    if (replaced !== null) html = replaced;
    else if (html.includes('<p class="local-eyebrow">Related local services</p>')) html = insertBeforeEyebrow(html, "Related local services", section);
    else html = insertBeforeEyebrow(html, "Frequently asked questions", section);
    write(relative, html);
  }
  const dryer = "carmel/dryer-repair-services.html";
  write(dryer, read(dryer).replaceAll(
    `${BASE}recent-work.html`,
    `${BASE}repair-cases/carmel-dryer-gas-valve-coils.html`
  ));
}

function updateFishersHub() {
  const relative = "fishers.html";
  let html = read(relative);
  const section = proofSection(
    ["ge-dishwasher-leak-repair-fishers-indiana", "lg-dle3400w-dryer-thermostat-vent-repair-fishers-indiana"],
    "Recent work in Fishers",
    "See the diagnosis and repair work from local service visits",
    "Each case includes original job photographs, the appliance model, the condition found and the work completed in Fishers.",
    "repair-proof"
  );
  const replaced = replaceMarkedSection(html, "repair-proof", section);
  if (replaced === null) throw new Error("Existing Fishers proof section was not found");
  write(relative, replaced);
}

function cleanupInternalLinks() {
  const sitemap = read("sitemap.xml");
  const files = new Set([...sitemap.matchAll(/<loc>https:\/\/alex-repair\.com\/([^<]*)<\/loc>/g)].map((match) => decodeURIComponent(match[1]) || "index.html"));
  for (const retired of retiredPaths) files.delete(retired);
  files.add("brands.html");
  for (const brand of indexedBrands) files.add(`brands/${brand}-appliance-repair.html`);
  for (const relative of files) {
    if (!relative.endsWith(".html") || !fs.existsSync(path.join(ROOT, relative))) continue;
    let html = read(relative);
    for (const [city, service] of retiredServices) {
      const retired = `${city}/${service}-repair-services.html`;
      const core = `${service}-repair.html`;
      html = html.replaceAll(`${BASE}${retired}`, `${BASE}${core}`);
      html = html.replaceAll(`/${retired}`, `/${core}`);
      html = html.replaceAll(`../${retired}`, `../${core}`);
    }
    write(relative, html);
  }
}

function cleanupRedirectTargets() {
  let rules = read(".htaccess");
  for (const [city, service] of retiredServices) {
    rules = rules.replaceAll(`${BASE}${city}/${service}-repair-services.html`, `${BASE}${city}.html`);
  }
  write(".htaccess", rules);
}

function updateDatesAndSitemaps() {
  const datesPath = path.join(ROOT, "scripts/content-dates.json");
  const dates = JSON.parse(fs.readFileSync(datesPath, "utf8"));
  for (const relative of substantivePages) dates[relative] = TODAY;
  const previousDates = fs.readFileSync(datesPath, "utf8");
  const datesEol = previousDates.includes("\r\n") ? "\r\n" : "\n";
  fs.writeFileSync(datesPath, `${JSON.stringify(dates, null, 2)}\n`.replace(/\n/g, datesEol));
  changed.add("scripts/content-dates.json");
  const excluded = [
    ...retiredBrands.map((slug) => `brands/${slug}-appliance-repair.html`),
    ...retiredServices.map(([city, service]) => `${city}/${service}-repair-services.html`)
  ];
  const result = rebuildSitemaps(cases.map((item) => `repair-cases/${item.slug}.html`), excluded);
  changed.add("sitemap.xml");
  changed.add("sitemap-images.xml");
  return { result, excluded };
}

function writeDocumentation(excluded) {
  const privateDir = path.join(ROOT, "private");
  fs.mkdirSync(privateDir, { recursive: true });
  const rows = [["source_url", "target_url", "reason"]];
  for (const brand of retiredBrands) {
    rows.push([`${BASE}brands/${brand}-appliance-repair.html`, `${BASE}brands.html`, "Retired thin brand page; model support remains on the brand directory"]);
    for (const city of ["carmel", "fishers", "westfield", "noblesville", "mccordsville", "zionsville"]) {
      rows.push([`${BASE}${city}/${brand}-appliance-repair.html`, `${BASE}brands.html`, "Retired duplicate city-brand route"]);
    }
  }
  for (const [city, service] of retiredServices) {
    rows.push([`${BASE}${city}/${service}-repair-services.html`, `${BASE}${city}.html`, "Consolidated low-demand city-service page"]);
  }
  const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
  fs.writeFileSync(path.join(privateDir, "seo-redirect-map-2026-09-17.csv"), `${csv}\n`);
  fs.writeFileSync(path.join(privateDir, "seo-recovery-2026-09-17.md"), `# SEO recovery deployment — 2026-09-17\n\n## Evidence used\n\n- Search Console export compared the latest 28 days with the previous period: clicks fell from 103 to 81 while impressions fell from 8,992 to 6,702.\n- The decline overlapped Google’s August 2026 spam update.\n- 101 duplicate city-brand pages produced 246 impressions and no clicks.\n- 18 city-service pages selected for consolidation had no clicks and negligible impressions.\n\n## Production changes\n\n- Kept six brand pages supported by published original repair work: Bosch, Frigidaire, GE, KitchenAid, LG and Samsung.\n- Consolidated 22 thin central brand pages and their city variants into the brand directory with direct 301 redirects.\n- Consolidated 18 low-demand city-service pages into their city hubs with direct 301 redirects.\n- Removed links to retired pages from indexable pages and pointed service navigation to the relevant core service page.\n- Added direct links from Fishers, active local service pages and retained brand pages to documented repair stories with original job photos.\n- Removed all ${excluded.length} consolidated pages from XML sitemaps while retaining their files as redirect-safe fallbacks.\n\n## Rollback\n\nRevert the deployment commit. The previous HTML files remain in Git history; no content file was deleted.\n`);
}

updateBrandsDirectory();
updateBrandPages();
updateServicePages();
updateFishersHub();
cleanupInternalLinks();
cleanupRedirectTargets();
const { result, excluded } = updateDatesAndSitemaps();
writeDocumentation(excluded);

console.log(JSON.stringify({ changedFiles: changed.size, sitemapPages: result.pages, imageSitemapPages: result.imagePages, excludedPages: excluded.length }, null, 2));
