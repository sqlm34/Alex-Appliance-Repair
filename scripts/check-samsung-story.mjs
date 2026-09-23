import assert from 'node:assert/strict';
import fs from 'node:fs';
import {samsungStory as story} from './samsung-dryer-story.mjs';
const url=`https://alex-repair.com/repair-cases/${story.slug}.html`;
const html=fs.readFileSync(`repair-cases/${story.slug}.html`,'utf8');
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert(html.includes(`rel="canonical" href="${url}"`));
const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
assert.equal(schemas.length,1);
const article=schemas[0]['@graph'].find(x=>x['@type']==='BlogPosting');
assert.equal(article.url,url);
assert.equal(article.datePublished,'2026-09-23');
assert.equal(article.image.length,9);
assert(html.includes('DV330AEW/XAA') && html.includes('McCordsville, Indiana'));
assert(html.includes('View McCordsville service coverage'));
assert(!html.includes('View Fishers service coverage'));
for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
 if(!match[1].startsWith('//')) assert(fs.existsSync('.'+match[1]),match[1]);
}
for(const filename of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml']) {
 assert(fs.readFileSync(filename,'utf8').includes(url),filename);
}
assert(fs.readFileSync('recent-work.html','utf8').includes('data-filter-value="mccordsville"'));
console.log('PASS: model, city, metadata, schema, links, assets, listings, sitemaps and city filter');
