
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const root = path.resolve(__dirname,'..');
const slug = 'carmel-kitchenaid-kfgd500ess01-double-oven-igniter-replacement';
const canonical = 'https://alex-repair.com/repair-cases/'+slug+'.html';
const target = process.argv[2] || pathToFileURL(path.join(root,'repair-cases',slug+'.html')).href;

(async () => {
 const browser = await chromium.launch({channel:'msedge',headless:true});
 try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror',error=>errors.push(error.message));
  fs.mkdirSync(path.join(root,'previews'),{recursive:true});
  for (const width of [1440,768,390,320]) {
   await page.setViewportSize({width,height:1000});
   const response = await page.goto(target,{waitUntil:'load'});
   if (process.argv[2]) assert.equal(response.status(),200);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);
   assert.match(await page.locator('h1').textContent(),/KitchenAid Double Oven Not Heating in Carmel/);
   assert.match(await page.locator('.case-summary').innerText(),/KFGD500ESS01/);
   assert.match(await page.locator('.case-summary a').first().getAttribute('href'),/carmel\.html/);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),canonical);
   assert.match(await page.locator('meta[name=description]').getAttribute('content'),/three igniter/);
   assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'),/double-oven-range\.webp$/);
   assert.doesNotMatch(await page.locator('main').innerText(),/D54603248|W10827919A/);
   const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].datePublished,'2026-11-28');
   assert.equal(schema['@graph'][0].image.length,26);
   assert.equal(await page.locator('.case-body img').count(),25);
   assert.equal(await page.locator('.case-summary-visual img').count(),1);
   assert.deepEqual(await page.locator('.case-body img,.case-summary-visual img').evaluateAll(async images=>{
    images.forEach(img=>{img.loading='eager';});
    await Promise.all(images.map(img=>img.decode()));
    return images.filter(img=>!img.alt||img.naturalWidth!==Number(img.getAttribute('width')) ||
      img.naturalHeight!==Number(img.getAttribute('height'))).map(img=>img.src);
   }),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   for (const link of [page.getByRole('link',{name:'Enlarge oven ignition diagram'}),page.locator('.case-body .gallery-item').first()]) {
    await link.click();
    await page.locator('.native-lightbox.is-open').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.native-lightbox.is-open').count(),0);
   }
   for (const [name,selector,index] of [['overview','.case-summary',0],['labels','.repair-story-section:has(.lg-fan-pair)',0],['access','.repair-story-section:has(.lg-fan-pair)',1],['broil','.repair-story-section:has(.lg-fan-pair)',4]]) {
    const section=page.locator(selector).nth(index);
    await section.screenshot({path:path.join(root,'previews','kitchenaid-'+name+'-'+width+'.png')});
   }
   console.log('PASS '+width+'px: SEO, 26 images, photo and diagram enlargement and no horizontal overflow');
  }
  assert.deepEqual(errors,[]);
  if (!process.argv[2]) {
   for (const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml']) {
    assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
   }
  }
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
