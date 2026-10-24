const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'repair-cases')).filter(f=>f.endsWith('.html')).map(f=>'repair-cases/'+f)].filter(f=>fs.readFileSync(path.join(root,f),'utf8').includes('css/article-dividers.css'));
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const errors=[],report=[];
 try{
  const page=await browser.newPage();
  const base=process.argv[2]||`http://127.0.0.1:${server.address().port}/`;
  fs.mkdirSync(path.join(root,'previews/dividers'),{recursive:true});
  for(const file of files.filter(f=>!process.env.ARTICLE_FILTER||f.includes(process.env.ARTICLE_FILTER))){
   for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:1000});
    const response=await page.goto(new URL(file,base).href,{waitUntil:'load'});
    if(!response||response.status()!==200)throw Error(`HTTP ${response?.status()}: ${file}`);
    if(response.request().redirectedFrom()&&!(await page.locator('.case-body,.alex-article-body').count())){
     report.push({file,width,redirect:page.url(),errors:[]});
     continue;
    }
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.case-body img,.alex-article-body img')].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
    const result=await page.evaluate(()=>{
     const errors=[],mobile=innerWidth<=768,expected=mobile?28:34;
     const body=document.querySelector('.case-body,.alex-article-body');
     if(!body)return {errors:['Article body missing'],count:0};
     if(body.dataset.articleDividersReady!=='true')errors.push('Divider script did not initialize');
     const ds=[...body.querySelectorAll(':scope>.article-divider')],box=e=>e.getBoundingClientRect();
     let words=0;
     for(const child of body.children){
      if(child.classList.contains('article-divider')){if(words<70)errors.push('Divider before 70 words');words=0;}
      else words+=(child.textContent.trim().match(/\S+/g)||[]).length;
     }
     if(ds.length>6)errors.push('More than six dividers');
     ds.forEach((d,i)=>{
      const prev=d.previousElementSibling,next=d.nextElementSibling,b=box(d);
      if(d.dataset.variant!==(i%2?'stripes':'wrench'))errors.push('Alternation');
      if(d.getAttribute('aria-hidden')!=='true')errors.push('Decorative accessibility');
      if(!next.matches('h2,h3,.repair-story-section')&&!(next.matches('ol')&&next.querySelector(':scope>li>h3')))errors.push('Not a major boundary');
      for(const gap of [b.top-box(prev).bottom,box(next).top-b.bottom])if(Math.abs(gap-expected)>1)errors.push(`Clearance ${gap.toFixed(1)} expected ${expected}`);
      if(Math.abs(b.height-(mobile?24:28))>1)errors.push('Ornament height');
      if(getComputedStyle(next,'::after').backgroundImage.includes('article-divider'))errors.push('Duplicate old ornament');
     });
     if(document.documentElement.scrollWidth>innerWidth+1)errors.push('Horizontal overflow');
     return {errors,count:ds.length};
    });
    if(result.errors.length)errors.push({file,width,...result});
    report.push({file,width,...result});
    if(result.count){
     await page.locator('.article-divider').first().evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-220));
     await page.screenshot({path:path.join(root,`previews/dividers/${file.replaceAll('/','_')}-${width}.png`)});
    }
   }
   console.log(`CHECKED ${file}`);
  }
  const pages=new Set(report.map(r=>r.file)).size;
  fs.writeFileSync(path.join(root,`previews/dividers/report${process.env.ARTICLE_FILTER?'-filtered':''}.json`),JSON.stringify({pages,errors,report},null,2));
  console.log(JSON.stringify({pages,errors},null,2));
  if(errors.length)process.exitCode=1;
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
