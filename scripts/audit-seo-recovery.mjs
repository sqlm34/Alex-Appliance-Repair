import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://alex-repair.com/";
const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const errors = [];
const titles = new Map();
const canonicals = new Map();
const retired = [
  /\/brands\/(amana|bertazzoni|dacor|electrolux|fisher-paykel|gaggenau|haier|hisense|jenn-air|kenmore|liebherr|maytag|midea|miele|sharp|smeg|speed-queen|sub-zero|thermador|viking|whirlpool|wolf)-appliance-repair\.html$/,
  /\/carmel\/(cooktop|microwave)-repair-services\.html$/,
  /\/fishers\/microwave-repair-services\.html$/,
  /\/mccordsville\/(cooktop|dishwasher|freezer|microwave)-repair-services\.html$/,
  /\/westfield\/(cooktop|freezer|microwave|refrigerator|washer)-repair-services\.html$/,
  /\/zionsville\/(cooktop|dishwasher|freezer|microwave|refrigerator|stove)-repair-services\.html$/
];

function addMap(map, key, relative) {
  const values = map.get(key) || [];
  values.push(relative);
  map.set(key, values);
}

for (const url of urls) {
  const pathname = new URL(url).pathname.slice(1);
  const relative = decodeURIComponent(pathname || "index.html");
  const file = path.join(ROOT, relative);
  if (!fs.existsSync(file)) {
    errors.push(`Sitemap file missing: ${relative}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
  if (canonical !== url) errors.push(`Canonical mismatch: ${relative} => ${canonical}`);
  if (!title) errors.push(`Title missing: ${relative}`);
  if (/<meta[^>]+content=["'][^"']*noindex/i.test(html)) errors.push(`Sitemap page is noindex: ${relative}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push(`Expected one H1: ${relative}`);
  if ((html.match(/<main\b/gi) || []).length !== 1 || (html.match(/<\/main>/gi) || []).length !== 1) errors.push(`Malformed main: ${relative}`);
  if (title) addMap(titles, title, relative);
  if (canonical) addMap(canonicals, canonical, relative);
  for (const script of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); } catch (error) { errors.push(`Invalid JSON-LD: ${relative}: ${error.message}`); }
  }
  for (const href of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    let linked;
    try { linked = new URL(href[1], url); } catch { continue; }
    if (linked.origin !== new URL(BASE).origin) continue;
    if (retired.some((pattern) => pattern.test(linked.pathname))) errors.push(`Internal link to retired URL: ${relative} => ${linked.pathname}`);
    if (linked.pathname.endsWith(".html")) {
      const target = path.join(ROOT, decodeURIComponent(linked.pathname.slice(1)));
      if (!fs.existsSync(target)) errors.push(`Broken internal HTML link: ${relative} => ${linked.pathname}`);
    }
  }
  for (const src of html.matchAll(/<img\b[^>]*src=["']([^"']+)["']/gi)) {
    let image;
    try { image = new URL(src[1], url); } catch { continue; }
    if (image.origin !== new URL(BASE).origin) continue;
    const target = path.join(ROOT, decodeURIComponent(image.pathname.slice(1)));
    if (!fs.existsSync(target)) errors.push(`Broken image: ${relative} => ${image.pathname}`);
  }
  for (const assetMatch of html.matchAll(/<(?:script\b[^>]*src|link\b[^>]*href)=["']([^"']+)["']/gi)) {
    let asset;
    try { asset = new URL(assetMatch[1], url); } catch { continue; }
    if (asset.origin !== new URL(BASE).origin || asset.pathname.endsWith(".html") || asset.pathname === "/") continue;
    const target = path.join(ROOT, decodeURIComponent(asset.pathname.slice(1)));
    if (!fs.existsSync(target)) errors.push(`Broken local asset: ${relative} => ${asset.pathname}`);
  }
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) errors.push(`Duplicate IDs: ${relative} => ${duplicateIds.join(", ")}`);
}

for (const [title, pages] of titles) if (pages.length > 1) errors.push(`Duplicate title: ${JSON.stringify(title)} => ${pages.join(", ")}`);
for (const [canonical, pages] of canonicals) if (pages.length > 1) errors.push(`Duplicate canonical: ${canonical} => ${pages.join(", ")}`);
for (const url of urls) if (retired.some((pattern) => pattern.test(new URL(url).pathname))) errors.push(`Retired URL remains in sitemap: ${url}`);

const brandsHtml = fs.readFileSync(path.join(ROOT, "brands.html"), "utf8");
const detailedBrandLinks = [...brandsHtml.matchAll(/href=["']https:\/\/alex-repair\.com\/brands\/([^"']+)-appliance-repair\.html["']/g)].map((match) => match[1]);
const expectedBrands = ["bosch", "frigidaire", "ge", "kitchenaid", "lg", "samsung"];
if (JSON.stringify([...new Set(detailedBrandLinks)].sort()) !== JSON.stringify(expectedBrands)) errors.push(`Unexpected detailed brand links: ${[...new Set(detailedBrandLinks)].sort().join(", ")}`);

const proofPages = [
  "fishers.html", "fishers/dishwasher-repair-services.html", "fishers/dryer-repair-services.html",
  "carmel/dishwasher-repair-services.html", "carmel/freezer-repair-services.html", "carmel/refrigerator-repair-services.html", "carmel/stove-repair-services.html",
  ...expectedBrands.map((brand) => `brands/${brand}-appliance-repair.html`)
];
for (const relative of proofPages) {
  const html = fs.readFileSync(path.join(ROOT, relative), "utf8");
  if (!/repair-cases\/[a-z0-9-]+\.html/.test(html)) errors.push(`Repair proof link missing: ${relative}`);
}

const result = {
  sitemapPages: urls.length,
  checkedPages: urls.length,
  uniqueTitles: titles.size,
  proofPages: proofPages.length,
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
