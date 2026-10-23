const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(path.join(root,'repair-cases')).filter(f=>f.endsWith('.html')&&fs.readFileSync(path.join(root,'repair-cases',f),'utf8').includes('lg-fan-noblesville.css'));
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
  const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  for(const file of files){
   if(process.argv[2]&&!process.argv[2].includes(file))continue;
   for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:1000});
    await page.goto(process.argv[2]||`http://127.0.0.1:${server.address().port}/repair-cases/${file}`,{waitUntil:'domcontentloaded'});
    await page.locator('.editorial-story').waitFor();
    await page.evaluate(async()=>{
     await document.fonts.ready;
     await Promise.all([...document.querySelectorAll('.editorial-story img')].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));
    });
    const errors=await page.evaluate(()=>{
     const errors=[],mobile=innerWidth<=768,blockGap=mobile?24:28;
     const box=e=>e.getBoundingClientRect();
     const check=(value,expected,label)=>{if(Math.abs(value-expected)>1)errors.push(`${label}: ${value.toFixed(1)}px, expected ${expected}px`);};
     document.querySelectorAll('.lg-fan-pair').forEach((grid,i)=>{
      const prev=grid.previousElementSibling,next=grid.nextElementSibling;
      if(prev)check(box(grid).top-box(prev).bottom,blockGap,`pair ${i} before`);
      if(next)check(box(next).top-box(grid).bottom,blockGap,`pair ${i} after`);
      grid.querySelectorAll('figure').forEach((f,j)=>check(box(f.querySelector('figcaption')).top-box(f.querySelector('a')).bottom,12,`pair ${i} caption ${j}`));
     });
     document.querySelectorAll('.lg-fan-row').forEach((row,i)=>{
      const copy=row.querySelector('.lg-fan-copy'),photo=row.querySelector('.lg-fan-photo'),link=photo.querySelector('a'),caption=photo.querySelector('figcaption');
      if(mobile){check(box(photo).top-box(copy).bottom,24,`row ${i} mobile text/photo`);check(box(caption).top-box(link).bottom,12,`row ${i} caption`);}
      else {check(parseFloat(getComputedStyle(row).columnGap),32,`row ${i} columns`);check(box(caption).top-box(link).bottom,12,`row ${i} caption`);}
     });
     const sections=[...document.querySelectorAll('.editorial-story>.repair-story-section')];
     sections.slice(1).forEach((s,i)=>check(box(s).top-box(sections[i]).bottom,mobile?36:48,`section ${i} spacing`));
     if(document.documentElement.scrollWidth>innerWidth+1)errors.push('Horizontal overflow');
     return errors;
    });
    assert.deepEqual(errors,[],`${file} at ${width}px`);
    if(file.includes('ge-gfw550')){
     await page.locator('.lg-fan-pair').first().scrollIntoViewIfNeeded();
     await page.screenshot({path:path.join(root,`previews/ge-spacing-pair-${width}.png`)});
     await page.locator('.lg-fan-row').nth(2).scrollIntoViewIfNeeded();
     await page.screenshot({path:path.join(root,`previews/ge-spacing-row-${width}.png`)});
    }
   }
   console.log(`PASS spacing at four widths: ${file}`);
  }
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
