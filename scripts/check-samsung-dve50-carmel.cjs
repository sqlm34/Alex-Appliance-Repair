const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const slug='carmel-samsung-dve50r5200w-dryer-heating-element-rollers-idler-repair';
const canonical=`https://alex-repair.com/repair-cases/${slug}.html`;
const target=process.argv[2]||pathToFileURL(path.join(root,'repair-cases',slug+'.html')).href;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  fs.mkdirSync(path.join(root,'previews'),{recursive:true});
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.goto(target,{waitUntil:'domcontentloaded'});
   await page.locator('[data-diagram-next]').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].image.length,17);
   assert.equal(schema['@graph'][0].datePublished,'2026-10-24');
   assert.match(await page.locator('.case-summary-copy').textContent(),/four drum rollers/);
   assert.equal(await page.locator('.repair-diagram-slide:visible').count(),1);
   assert.equal(await page.locator('.repair-diagram-slide:visible img').evaluate(i=>getComputedStyle(i).objectFit),'contain');
   const initial=await page.locator('.repair-diagrams-stage').boundingBox();
   for(const n of [2,3,1]){
    await page.locator('[data-diagram-next]').click();
    assert.equal(await page.locator('[data-diagram-count]').textContent(),`${n} / 3`);
    assert.equal((await page.locator('.repair-diagrams-stage').boundingBox()).height,initial.height);
   }
   await page.locator('[data-diagram-prev]').click();
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'3 / 3');
   await page.keyboard.press('ArrowRight');
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'1 / 3');
   const stage=page.locator('.repair-diagrams-stage');
   await stage.dispatchEvent('touchstart',{touches:[{identifier:1,clientX:200,clientY:100}]});
   await stage.dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:80,clientY:100}]});
   assert.equal(await page.locator('[data-diagram-count]').textContent(),'2 / 3');
   await stage.dispatchEvent('touchstart',{touches:[{identifier:2,clientX:100,clientY:100}]});
   await stage.dispatchEvent('touchend',{changedTouches:[{identifier:2,clientX:100,clientY:100}]});
   assert.deepEqual(await page.locator('main img').evaluateAll(async images=>{
    images.forEach(i=>{i.loading='eager';});
    await Promise.all(images.map(i=>i.decode().catch(()=>{})));
    return images.filter(i=>!i.naturalWidth||!i.alt).map(i=>i.src);
   }),[]);
   assert.deepEqual(await page.locator('.case-body img,.repair-diagram-slide img').evaluateAll(images=>images.filter(i=>i.naturalWidth!==Number(i.getAttribute('width'))||i.naturalHeight!==Number(i.getAttribute('height'))).map(i=>i.src)),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow');
   assert.deepEqual(await page.locator('.case-summary dd').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent)),[],'Overview text clipping');
   for(const selector of ['.repair-diagram-slide:visible','.case-body .gallery-item']){
    await page.locator(selector).first().click();
    await page.locator('.native-lightbox.is-open').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.native-lightbox.is-open').count(),0);
   }
   for(const [name,selector,index] of [['overview','.case-summary',0],['pair','.lg-fan-pair',0],['row','.lg-fan-row',3],['label','.lg-fan-row',1]]){
    const section=page.locator(selector).nth(index);
    await section.scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(root,`previews/samsung-carmel-${name}-${width}.png`)});
    await section.screenshot({path:path.join(root,`previews/samsung-carmel-${name}-full-${width}.png`)});
   }
   console.log(`PASS ${width}px: metadata, images, stable 3-slide carousel, keyboard, swipe events, lightbox, no overflow`);
  }
  assert.deepEqual(errors,[],'Browser errors');
  if(!process.argv[2]){
   const links=await page.locator('main [href],main [src]').evaluateAll(nodes=>nodes.flatMap(n=>['href','src'].filter(a=>n.hasAttribute(a)).map(a=>n.getAttribute(a))));
   for(const link of links)if(link.startsWith('../'))assert(fs.existsSync(path.resolve(root,'repair-cases',link.split(/[?#]/)[0])),link);
   for(const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml'])assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
   console.log('PASS internal links, discovery pages and sitemaps');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
