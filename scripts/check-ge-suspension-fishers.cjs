const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const slug='fishers-ge-wcsr4170g6ww-washer-suspension-rods-replacement';
const canonical=`https://alex-repair.com/repair-cases/${slug}.html`;
const target=process.argv[2]||pathToFileURL(path.join(root,'repair-cases',slug+'.html')).href;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  fs.mkdirSync(path.join(root,'previews'),{recursive:true});
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   const response=await page.goto(target,{waitUntil:'load'});
   if(process.argv[2])assert.equal(response.status(),200);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);
   assert.match(await page.locator('h1').textContent(),/GE WCSR4170G6WW.*Fishers/);
   assert.doesNotMatch(await page.content(),/WH16X10057|WH16X544|MT913848G/i);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].image.length,7);
   assert.equal(schema['@graph'][0].datePublished,'2026-10-28');
   assert.equal(await page.locator('.case-summary-visual img').count(),1);
   assert.equal(await page.locator('[data-diagram-slider]').count(),0);
   assert.deepEqual(await page.locator('main img').evaluateAll(async images=>{
    images.forEach(i=>{i.loading='eager';});
    await Promise.all(images.map(i=>i.decode().catch(()=>{})));
    return images.filter(i=>!i.naturalWidth||!i.alt).map(i=>i.src);
   }),[]);
   assert.deepEqual(await page.locator('.case-body img,.case-summary-visual img').evaluateAll(images=>images.filter(i=>i.naturalWidth!==Number(i.getAttribute('width'))||i.naturalHeight!==Number(i.getAttribute('height'))).map(i=>i.src)),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.deepEqual(await page.locator('.case-summary dd').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent)),[]);
   await page.locator('.case-body .gallery-item').first().click();
   await page.locator('.native-lightbox.is-open').waitFor();
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('.native-lightbox.is-open').count(),0);
   for(const [name,selector,index] of [['overview','.case-summary',0],['pair','.repair-story-section:has(.lg-fan-pair)',0],['row','.lg-fan-row',2],['label','.lg-fan-row',1]]){
    const section=page.locator(selector).nth(index);
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({path:path.join(root,`previews/ge-suspension-${name}-${width}.png`)});
   }
   console.log(`PASS ${width}px: model, metadata, images, gallery, no part numbers or overflow`);
  }
  assert.deepEqual(errors,[]);
  if(!process.argv[2])for(const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml'])assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
