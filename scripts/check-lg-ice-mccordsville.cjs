const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const slug='mccordsville-lg-lfxc24726s-ice-maker-leak-light-repair';
const canonical=`https://alex-repair.com/repair-cases/${slug}.html`;
const target=process.argv[2]||pathToFileURL(path.join(root,'repair-cases',slug+'.html')).href;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.goto(target,{waitUntil:'domcontentloaded'});
   await page.locator('[data-diagram-next]').waitFor();
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert.equal(schema['@graph'][0].image.length,16);
   assert.equal(schema['@graph'][0].datePublished,'2026-10-18');
   assert.match(await page.locator('.case-summary-copy').textContent(),/McCordsville/);
   assert.equal(await page.locator('.case-body .repair-diagram-slide').count(),0);
   assert.equal(await page.locator('.repair-diagram-slide:visible').count(),1);
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
   const imageErrors=await page.locator('main img').evaluateAll(async images=>{
    images.forEach(i=>{i.loading='eager';});
    await Promise.all(images.map(i=>i.decode().catch(()=>{})));
    return images.filter(i=>!i.naturalWidth||!i.alt||!i.width||!i.height).map(i=>i.src);
   });
   assert.deepEqual(imageErrors,[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow');
   await page.locator('.repair-diagram-slide:visible').click();
   await page.keyboard.press('Escape');
   assert.notEqual(await page.locator('body').evaluate(e=>getComputedStyle(e).position),'fixed');
   await page.locator('.case-summary').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(root,`previews/lg-ice-${width}.png`)});
   console.log(`PASS ${width}px: metadata, images, slider wrap/keyboard, stable layout, gallery close`);
  }
  if(!process.argv[2]){
   const links=await page.locator('main [href], main [src]').evaluateAll(nodes=>nodes.flatMap(n=>['href','src'].filter(a=>n.hasAttribute(a)).map(a=>n.getAttribute(a))));
   for(const link of links)if(link.startsWith('../'))assert(fs.existsSync(path.resolve(root,'repair-cases',link.split(/[?#]/)[0])),link);
   for(const name of ['blog.html','recent-work.html','sitemap.xml','sitemap-images.xml'])assert(fs.readFileSync(path.join(root,name),'utf8').includes(slug),name);
   await page.goto(pathToFileURL(path.join(root,'repair-cases/westfield-kenmore-elite-79641582411-washer-door-gasket-replacement.html')).href);
   assert.equal(await page.locator('[data-diagram-next]').count(),0);
   assert.equal(await page.locator('.case-summary-visual img').count(),1);
   console.log('PASS local links, indexes, sitemaps and single-diagram regression');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
