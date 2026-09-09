import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const BASE='https://alex-repair.com/';
const escapeXml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function rebuildSitemaps(additionalPaths=[]) {
  const source=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
  const entries=new Map([...source.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>[m[1].match(/<loc>([^<]+)<\/loc>/)[1],m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]]));
  for(const p of additionalPaths) if(!entries.has(BASE+p)) entries.set(BASE+p,undefined);
  const datesFile=path.join(ROOT,'scripts/content-dates.json');
  const dates=fs.existsSync(datesFile)?JSON.parse(fs.readFileSync(datesFile,'utf8')):{};
  const pageBlocks=[],imageBlocks=[];
  for(const [url,previousDate] of entries) {
    const relativePath=new URL(url).pathname.slice(1)||'index.html';
    const html=fs.readFileSync(path.join(ROOT,relativePath),'utf8');
    const canonical=html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
    if(canonical!==url||/<meta[^>]+content=["'][^"']*noindex/i.test(html)) throw new Error(`Noncanonical or nonindexable sitemap page: ${url}`);
    const date=dates[relativePath]||previousDate;
    if(date&&!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid content date: ${relativePath}`);
    pageBlocks.push(`  <url>\n    <loc>${escapeXml(url)}</loc>${date?`\n    <lastmod>${date}</lastmod>`:''}\n  </url>`);
    const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
    const images=new Set([...main.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m=>new URL(m[1],url).href).filter(u=>{
      const image=new URL(u);return image.origin===new URL(BASE).origin&&fs.existsSync(path.join(ROOT,decodeURIComponent(image.pathname)));
    }));
    if(images.size) imageBlocks.push(`  <url>\n    <loc>${escapeXml(url)}</loc>\n${[...images].map(u=>`    <image:image><image:loc>${escapeXml(u)}</image:loc></image:image>`).join('\n')}\n  </url>`);
  }
  fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pageBlocks.join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(ROOT,'sitemap-images.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageBlocks.join('\n')}\n</urlset>\n`);
  return {pages:pageBlocks.length,imagePages:imageBlocks.length};
}
