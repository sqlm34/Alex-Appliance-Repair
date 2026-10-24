const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const urls=process.argv.slice(2);
assert(urls.length,'Supply published article URLs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();
  for(const url of urls){
   const response=await page.goto(url,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200);
   assert(!/noindex/i.test(response.headers()['x-robots-tag']||''));
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),url);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('title').count(),1);
   assert.equal(await page.locator('meta[name="description"]').count(),1);
   const description=await page.locator('meta[name="description"]').getAttribute('content');
   assert(description.length>60 && description.length<200);
   const robots=await page.locator('meta[name="robots"]').getAttribute('content').catch(()=>'');
   assert(!/noindex|nofollow/i.test(robots||''));
   assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),url);
   const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   assert(schema['@graph'].some(n=>n['@type']==='BlogPosting'));
   assert(schema['@graph'].some(n=>n['@type']==='BreadcrumbList'));
   assert.deepEqual(await page.locator('main img').evaluateAll(xs=>xs.filter(i=>!i.alt||!i.width||!i.height).map(i=>i.src)),[]);
   const links=await page.locator('main a[href]').evaluateAll(xs=>[...new Set(xs.map(a=>a.href))]);
   for(const link of links){
    if(new URL(link).origin!==new URL(url).origin)continue;
    const result=await page.request.get(link);
    assert.equal(result.status(),200,link);
   }
   for(const name of ['sitemap.xml','sitemap-images.xml','blog.html','recent-work.html']){
    const result=await page.request.get(new URL('/'+name,url).href);
    assert.equal(result.status(),200);
    assert((await result.text()).includes(new URL(url).pathname.split('/').pop()),name);
   }
   console.log(`PASS published SEO: ${url}; title, description, H1, canonical, robots, social tags, schema, image attributes, internal links and discovery`);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
