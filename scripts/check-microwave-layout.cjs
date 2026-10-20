const assert=require('node:assert/strict');
const path=require('node:path');
const http=require('node:http');
const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const files=['index.html','services.html','microwave-repair.html','noblesville/microwave-repair-services.html','carmel.html','brands.html','blog-microwave-repair-guide.html','top-5-common-microwave-problems-and-how-to-fix-them.html','finding-reliable-microwave-repair-near-carmel-what-to-look-for.html'];
(async()=>{
 const server=http.createServer((req,res)=>{
  const filename=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!filename.startsWith(root+path.sep)||!fs.existsSync(filename)||!fs.statSync(filename).isFile()){res.writeHead(404);res.end();return;}
  const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp'};
  res.setHeader('Content-Type',types[path.extname(filename)]||'application/octet-stream');
  fs.createReadStream(filename).pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=process.argv[2]||`http://127.0.0.1:${server.address().port}/`;
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const file of files){
    await page.goto(new URL(file,base).href,{waitUntil:'domcontentloaded'});
    await page.locator('h1').waitFor();
    assert.equal(await page.locator('h1').count(),1,file);
    const overflowing=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflowing)console.log(await page.locator('body *').evaluateAll(nodes=>nodes.filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='fixed'}).slice(-10).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,100),right:e.getBoundingClientRect().right}))));
    assert(!overflowing,`${width} ${file} overflow`);
    const errors=await page.locator('main img[src*="about-appliance-repair-tools"]').evaluateAll(async images=>{
     images.forEach(i=>i.loading='eager');await Promise.all(images.map(i=>i.decode().catch(()=>{})));
     return images.filter(i=>!i.naturalWidth||i.alt!=='Alex Appliance Repair tools and company logo').map(i=>i.src);
    });
    assert.deepEqual(errors,[],file);
    if(file==='index.html'){
     const card=page.locator('.home-service-card[href="microwave-repair.html"]');
     await card.scrollIntoViewIfNeeded();
     assert.match(await card.textContent(),/Built-in Microwave \+ Oven Combo Repair/);
     assert(await card.locator('h3').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Service title overflow');
     await page.evaluate(()=>scrollTo(0,0));
     const nav=page.locator(width<1000?'.mobile-menu-nav':'.menu-nav');
     if(width<1000)await page.locator('.hamburger').click();
     const locations=nav.locator(':scope > ul > .menu-has-children').first();
     await locations.locator(':scope > .menu-item-plus').click();
     const city=locations.locator(':scope > .sub-menu > .menu-has-children').first();
     await city.locator(':scope > .menu-item-plus').click();
     const item=city.getByRole('link',{name:'Built-in Microwave + Oven Combo Repair',exact:true});
     await page.waitForTimeout(500);
     await item.scrollIntoViewIfNeeded();
     assert(await item.isVisible(),'Microwave navigation entry hidden');
     assert(await item.evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Navigation label overflow');
     await page.screenshot({path:path.join(root,`previews/microwave-menu-${width}.png`)});
     if(width<1000)await page.locator('.header-mobile-close').click();
     else {await locations.locator(':scope > .menu-item-plus').click();await page.mouse.move(10,900);}
     await card.scrollIntoViewIfNeeded();
    }
    if(['index.html','microwave-repair.html','noblesville/microwave-repair-services.html'].includes(file))await page.screenshot({path:path.join(root,`previews/microwave-scope-${file.replaceAll('/','-')}-${width}.png`)});
    console.log(`PASS ${width}px ${file}`);
   }
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
