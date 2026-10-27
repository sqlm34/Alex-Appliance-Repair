const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const slug='carmel-maytag-medb835dw4-dryer-squeaking-rollers-idler-repair';
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
   await page.locator('[data-diagram-next]').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);
   assert.match(await page.locator('h1').textContent(),/Maytag MEDB835DW4.*Carmel/);
   assert.doesNotMatch(await page.content(),/W10837240|W10314173|W11258418|M81233460/i,'No replacement-part or serial numbers');
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].image.length,15);
   assert.equal(schema['@graph'][0].datePublished,'2026-10-27');
   assert.match(await page.locator('.case-summary-copy').textContent(),/Five rollers: two rear, three front/);
   assert.equal(await page.locator('.case-summary-copy a').first().getAttribute('href'),'../carmel.html');
   assert.equal(await page.locator('.repair-diagram-slide').count(),2);
   const stage=page.locator('.repair-diagrams-stage'),initial=await stage.boundingBox();
   for(const n of [2,1]){
    await page.locator('[data-diagram-next]').click();
    assert.equal(await page.locator('[data-diagram-count]').textContent(),`${n} / 2`);
    assert.equal((await stage.boundingBox()).height,initial.height);
   }
   await page.locator('[data-diagram-prev]').click();
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'2 / 2');
   await page.keyboard.press('ArrowRight');
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'1 / 2');
   await stage.dispatchEvent('touchstart',{touches:[{identifier:1,clientX:200,clientY:100}]});
   await stage.dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:80,clientY:100}]});
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'2 / 2');
   await stage.dispatchEvent('touchstart',{touches:[{identifier:2,clientX:100,clientY:100}]});
   await stage.dispatchEvent('touchend',{changedTouches:[{identifier:2,clientX:100,clientY:100}]});
   assert.equal(await page.locator('.repair-diagram-slide:visible').count(),1);
   assert.equal(await page.locator('.repair-diagram-slide:visible img').evaluate(i=>getComputedStyle(i).objectFit),'contain');
   assert.deepEqual(await page.locator('main img').evaluateAll(async images=>{
    images.forEach(i=>{i.loading='eager';});
    await Promise.all(images.map(i=>i.decode().catch(()=>{})));
    return images.filter(i=>!i.naturalWidth||!i.alt).map(i=>i.src);
   }),[]);
   assert.deepEqual(await page.locator('.case-body img,.repair-diagram-slide img').evaluateAll(images=>images.filter(i=>i.naturalWidth!==Number(i.getAttribute('width'))||i.naturalHeight!==Number(i.getAttribute('height'))).map(i=>i.src)),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow');
   assert.deepEqual(await page.locator('.case-summary dd').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent)),[]);
   for(const selector of ['.repair-diagram-slide:visible','.case-body .gallery-item']){
    await page.locator(selector).first().click();
    await page.locator('.native-lightbox.is-open').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.native-lightbox.is-open').count(),0);
   }
   for(const [name,selector,index] of [['overview','.case-summary',0],['pair','.repair-story-section:has(.lg-fan-pair)',0],['idler','.repair-story-section:has(.lg-fan-pair)',3],['row','.lg-fan-row',2],['label','.lg-fan-row',1]]){
    const section=page.locator(selector).nth(index);
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({path:path.join(root,`previews/maytag-medb835-${name}-${width}.png`)});
   }
   console.log(`PASS ${width}px: model, no part numbers, metadata, images, slider, lightbox, no overflow`);
  }
  assert.deepEqual(errors,[]);
  if(!process.argv[2]){
   const links=await page.locator('main [href],main [src]').evaluateAll(nodes=>nodes.flatMap(n=>['href','src'].filter(a=>n.hasAttribute(a)).map(a=>n.getAttribute(a))));
   for(const link of links)if(link.startsWith('../'))assert(fs.existsSync(path.resolve(root,'repair-cases',link.split(/[?#]/)[0])),link);
   for(const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml'])assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
