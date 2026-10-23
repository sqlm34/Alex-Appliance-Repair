const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const slug='carmel-ge-gfw550ssn3ww-washer-control-board-replacement';
const canonical=`https://alex-repair.com/repair-cases/${slug}.html`;
const target=process.argv[2]||pathToFileURL(path.join(root,'repair-cases',slug+'.html')).href;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  fs.mkdirSync(path.join(root,'previews'),{recursive:true});
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.goto(target,{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].image.length,13);
   assert.equal(schema['@graph'][0].datePublished,'2026-10-23');
   assert.match(await page.locator('.case-summary-copy').textContent(),/Control board replacement and initialization/);
   assert.equal(await page.locator('[data-diagram-slider]').count(),0);
   assert.equal(await page.locator('.case-summary-visual img').count(),1);
   assert.deepEqual(await page.locator('main img').evaluateAll(async images=>{
    images.forEach(i=>{i.loading='eager';});
    await Promise.all(images.map(i=>i.decode().catch(()=>{})));
    return images.filter(i=>!i.naturalWidth||!i.alt).map(i=>i.src);
   }),[]);
   assert.deepEqual(await page.locator('.case-body img,.case-summary-visual img').evaluateAll(images=>images.filter(i=>i.naturalWidth!==Number(i.getAttribute('width'))||i.naturalHeight!==Number(i.getAttribute('height'))).map(i=>i.src)),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow');
   await page.locator('.case-body .gallery-item').first().click();
   await page.locator('.native-lightbox.is-open').waitFor();
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('.native-lightbox.is-open').count(),0);
   await page.locator('.case-summary').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(root,`previews/ge-board-carmel-${width}.png`)});
   await page.locator('.case-body .repair-story-section').nth(5).scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(root,`previews/ge-board-carmel-initialization-${width}.png`)});
   console.log(`PASS ${width}px: metadata, images, single diagram, gallery, no overflow`);
  }
  if(!process.argv[2]){
   const links=await page.locator('main [href],main [src]').evaluateAll(nodes=>nodes.flatMap(n=>['href','src'].filter(a=>n.hasAttribute(a)).map(a=>n.getAttribute(a))));
   for(const link of links)if(link.startsWith('../'))assert(fs.existsSync(path.resolve(root,'repair-cases',link.split(/[?#]/)[0])),link);
   for(const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml'])assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
   console.log('PASS internal links, discovery pages and sitemaps');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
