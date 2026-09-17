import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://alex-repair.com/";
const errors = [];
const headers = { "user-agent": "Alex-Appliance-Repair-release-audit/1.0" };

async function pooled(items, limit, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      try { await task(items[index], index); }
      catch (error) { errors.push(`${items[index]}: ${error.message}`); }
    }
  });
  await Promise.all(workers);
}

const sitemapResponse = await fetch(`${BASE}sitemap.xml`, { headers, cache: "no-store" });
if (sitemapResponse.status !== 200) errors.push(`Live sitemap status: ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length !== 104) errors.push(`Live sitemap URL count: ${urls.length}; expected 104`);

await pooled(urls, 10, async (url) => {
  const response = await fetch(url, { headers, redirect: "manual", cache: "no-store" });
  if (response.status !== 200) {
    errors.push(`Indexable page status ${response.status}: ${url}`);
    return;
  }
  const html = await response.text();
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
  if (canonical !== url) errors.push(`Live canonical mismatch: ${url} => ${canonical}`);
  if (/<meta[^>]+content=["'][^"']*noindex/i.test(html)) errors.push(`Live noindex page in sitemap: ${url}`);
});

const redirectCsv = fs.readFileSync(path.join(ROOT, "private/seo-redirect-map-2026-09-17.csv"), "utf8").trim().split(/\r?\n/).slice(1);
const redirects = redirectCsv.map((line) => {
  const match = line.match(/^"([^"]*)","([^"]*)"/);
  if (!match) throw new Error(`Invalid redirect CSV row: ${line}`);
  return { source: match[1], target: match[2] };
});
await pooled(redirects, 10, async ({ source, target }) => {
  const response = await fetch(source, { headers, redirect: "manual", cache: "no-store" });
  const location = response.headers.get("location");
  if (response.status !== 301) errors.push(`Redirect status ${response.status}: ${source}`);
  if (location !== target) errors.push(`Redirect target mismatch: ${source} => ${location}; expected ${target}`);
});

console.log(JSON.stringify({ sitemapPages: urls.length, redirectsChecked: redirects.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
