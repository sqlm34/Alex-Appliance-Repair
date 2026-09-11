import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { notes } from './repair-case-notes.mjs';
import { fishersSlug, fishersArticle } from './fishers-ge-story.mjs';
import { story as lgRangeStory, paragraphs as lgRangeParagraphs } from './lg-range-story.mjs';
import { rebuildSitemaps } from './rebuild-sitemaps.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const BASE='https://alex-repair.com/';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const url=c=>BASE+'repair-cases/'+c.slug+'.html';
const cityName=c=>c.city==='mccordsville'?'McCordsville':c.city.charAt(0).toUpperCase()+c.city.slice(1);
const city=c=>c.city==='service-area'?'Central Indiana service area':cityName(c)+', Indiana';
const title=c=>c.headline||c.title+(c.city==='service-area'?'':' in '+cityName(c));
const image=(p,lazy=true)=>`<img src="/${esc(p.src)}" width="${p.width}" height="${p.height}" alt="${esc(p.caption)}" ${lazy?'loading="lazy"':'fetchpriority="high"'} decoding="async">`;
const date=s=>new Date(s+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
function card(c,anchor=false){return `<article ${anchor?`id="${c.slug}" data-work-card data-city="${c.city}" data-appliance="${c.appliance}"`:''} class="case-card"><a class="case-card-image" href="${url(c)}">${image(c.photos[0])}</a><div class="case-card-copy"><p class="local-eyebrow">${esc(city(c))} · ${esc(c.appliance)}</p><h3><a href="${url(c)}">${esc(title(c))}</a></h3><p>${esc(c.summary)}</p><p class="case-date">Published <time datetime="${c.published}">${date(c.published)}</time></p><a class="case-read" href="${url(c)}">Read repair story <span aria-hidden="true">→</span></a></div></article>`;}
function styleLink(html){if(!html.includes('/css/repair-cases.css'))html=html.replace('</head>','<link rel="stylesheet" href="/css/repair-cases.css?v=20260909-cases">\n</head>');return html;}
function metadata(html,{name,description,page,imageUrl,type='website',schema}){
 html=html.replace(/\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,'\n');
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(name)}</title>`).replace(/(<link\b[^>]*rel="canonical"[^>]*href=")[^"]+/,`$1${page}`);
 const values={'description':description,'og:title':name,'twitter:title':name,'og:description':description,'twitter:description':description,'og:url':page,'twitter:url':page,'og:image':imageUrl,'twitter:image':imageUrl,'og:type':type};
 html=html.replace(/<meta\b[^>]*>/g,tag=>{const key=tag.match(/(?:name|property)="([^"]+)"/)?.[1];return Object.hasOwn(values,key)?tag.replace(/content="[^"]*"/,`content="${esc(values[key])}"`):tag;});
 return html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>\n</head>`);
}
function rootAssets(html){return html.replace(/\b(href|src)="([^"#]+)"/g,(all,attr,value)=>/^(?:[a-z]+:|\/)/i.test(value)?all:`${attr}="/${value.replace(/^(?:\.\.\/)+/,'')}"`);}
const cta='<section class="local-cta"><div class="local-shell"><h2>Need help with your appliance?</h2><p>Tell us the appliance, symptom and service address. We explain the diagnosis and estimate before approved repair work.</p><div class="local-actions"><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a><a class="local-button local-button--secondary" href="tel:+14632488429">Call (463) 248-8429</a></div></div></section>';
export function buildRepairCases(){
 const cases=[lgRangeStory,...JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/repair-cases.json'),'utf8'))];
 cases.sort((a,b)=>b.published.localeCompare(a.published));
 notes[lgRangeStory.slug]=lgRangeParagraphs;
 const seen=new Set();
 for(const c of cases){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug)||seen.has(c.slug))throw Error('Invalid/duplicate case slug');seen.add(c.slug);
  if((!notes[c.slug]&&c.slug!==fishersSlug)||!c.photos.length)throw Error('Missing editorial content: '+c.slug);
  for(const d of [c.published,c.modified])if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw Error('Invalid date');
  for(const p of c.photos)if(!p.src.startsWith('images/')||p.src.includes('..')||!fs.existsSync(path.join(ROOT,p.src)))throw Error('Missing or unsafe photo');
 }
 let archive=fs.readFileSync(path.join(ROOT,'recent-work.html'),'utf8');
 // Capture the site's actual shared shell, never a replacement design.
 const shell=rootAssets(archive).replace(/<script[^>]+src="\/js\/(?:home-page|recent-work)\.js[^>]*><\/script>/g,'');
 fs.mkdirSync(path.join(ROOT,'repair-cases'),{recursive:true});
 for(const c of cases){
  const caseNotes=notes[c.slug]||[];
  const service=c.appliance==='range'?'stove':c.appliance;
  const servicePath=service==='diagnosis'?'services.html':c.city==='service-area'?`${service}-repair.html`:`${c.city}/${service}-repair-services.html`;
  const related=(c.slug===fishersSlug?cases:[lgRangeStory,...JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/repair-cases.json'),'utf8')).filter(x=>x.slug!==fishersSlug)]).filter(x=>x.slug!==c.slug).sort((a,b)=>(b.appliance===c.appliance)-(a.appliance===c.appliance)).slice(0,3);
  const schema={'@context':'https://schema.org','@graph':[
   {'@type':'BlogPosting','@id':url(c)+'#article',url:url(c),mainEntityOfPage:url(c),headline:title(c),description:c.summary,image:c.photos.map(p=>BASE+p.src),datePublished:c.published,dateModified:c.modified,author:{'@type':'Organization',name:'Alex Appliance Repair',url:BASE+'about.html'},publisher:{'@type':'Organization',name:'Alex Appliance Repair',url:BASE},inLanguage:'en-US'},
   {'@type':'BreadcrumbList',itemListElement:[{name:'Home',item:BASE},{name:'Repair stories',item:BASE+'recent-work.html'},{name:title(c),item:url(c)}].map((x,i)=>({'@type':'ListItem',position:i+1,...x}))}
  ]};
  const main=`<main class="local-seo-page repair-case-page">
<section class="case-heading"><div class="local-shell"><nav class="case-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog.html">Blog</a> / <a href="/recent-work.html">Repair stories</a></nav><p class="local-eyebrow">${esc(city(c))} · ${esc(c.appliance)} service</p><h1>${esc(title(c))}</h1><p class="case-lead">${esc(c.summary)}</p><p class="case-byline">By <a href="/about.html">Alex Appliance Repair</a> · Published <time datetime="${c.published}">${date(c.published)}</time></p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></div></section>
<section class="local-section"><div class="local-shell case-layout"><article class="case-body"><figure class="case-cover"><a href="/${c.photos[0].src}">${image(c.photos[0],false)}</a><figcaption>${esc(c.photos[0].caption)}</figcaption></figure><h2>Service focus</h2><p>${esc(caseNotes[0])}</p><h2>Work documented</h2><p>${esc(caseNotes[1])}</p><h2>Understanding this repair</h2><p>${esc(caseNotes[2])}</p><p>For a similar concern, see our <a href="/${servicePath}">${esc(service==='diagnosis'?'appliance diagnosis and repair':service+' repair service')}</a>. Each appliance is evaluated before parts or repair work are recommended.</p>${c.photos.length>1?`<h2>Photos from this repair</h2><div class="case-photo-grid">${c.photos.slice(1).map(p=>`<figure><a href="/${p.src}">${image(p)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`).join('')}</div>`:''}</article><aside class="case-summary"><h2>Visit overview</h2><dl><dt>Location</dt><dd>${esc(city(c))}</dd><dt>Appliance</dt><dd>${esc(c.appliance==='range'?'Range / oven':c.appliance)}</dd><dt>Work</dt><dd>${esc(c.title)}</dd><dt>Photographs</dt><dd>${c.photos.length}</dd></dl><a href="/${c.city==='carmel'?'carmel.html':'locations.html'}">View service coverage</a><hr><h2>Discuss your appliance</h2><p>Share the model, symptoms and installation details when booking.</p><a class="local-button" href="tel:+14632488429">Call our team</a></aside></div></section>
<section class="local-section local-section--soft"><div class="local-shell"><header class="local-section-header"><h2>More repair stories</h2><a href="/recent-work.html">View all repair stories</a></header><div class="case-grid">${related.map(c=>card(c)).join('')}</div></div></section>${cta}</main>`;
  let content=main;
  if(c.slug===fishersSlug) content=content.replace(/<article class="case-body">[\s\S]*?<\/article>/,fishersArticle(c,image,esc));
  if(c.causeExplanation) content=content.replace('<h2>Work documented</h2>',`<h2>${esc(c.causeHeading||'What caused the connection to burn?')}</h2><p>${esc(c.causeExplanation)}</p><h2>Work documented</h2>`);
  if(c.model) content=content.replace('<dt>Work</dt>',`<dt>Model</dt><dd>${esc(c.model)}</dd><dt>Problem</dt><dd>${esc(c.problem)}</dd><dt>Cause</dt><dd>${esc(c.cause)}</dd><dt>Work</dt>`);
  if(c.brandPath) {
   const brandName=c.brandName||'LG';
   content=content.replace('<h2>Photos from this repair</h2>',`<p>Explore our <a href="/${esc(c.brandPath)}">${esc(brandName)} appliance repair services</a> and <a href="/carmel.html">Carmel service coverage</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><h2>Photos from this repair</h2>`);
  }
  if(c.slug===fishersSlug) {
   content=content.replace('<dt>Photographs</dt>', '<dt>Repair time</dt><dd>Approximately 30 minutes for the repair itself</dd><dt>Result</dt><dd>No leaks found during post-repair checks of filling, circulation, washing and draining</dd><dt>Photographs</dt>');
   content=content.replace('<a href="/locations.html">View service coverage</a>', '<a href="/fishers.html">View Fishers service coverage</a>');
   content=content.replace(/(<article class="case-body editorial-story">[\s\S]*?<\/article>)(<aside class="case-summary">[\s\S]*?<\/aside>)/, '$2$1');
  }
  let page=shell.replace(/<main\b[\s\S]*?<\/main>/,content).replace(/\/js\/script\.js\?v=[^"']+/g,'/js/script.js?v=20260909-repair-story-lightbox');
  page=metadata(styleLink(page),{name:c.seoTitle||title(c)+' | Alex Appliance Repair',description:c.description||c.summary,page:url(c),imageUrl:BASE+c.photos[0].src,type:'article',schema});
  if(c.slug===fishersSlug) {
   page=page.replace('</head>','<link rel="stylesheet" href="/css/repair-story-editorial.css?v=20260911-visit-overview">\n</head>');
   // Keep this standalone HTML preview usable from disk as well as from the site root.
   page=page.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g,(_,attr,value)=>`${attr}="../${value||'index.html'}"`);
  }
  fs.writeFileSync(path.join(ROOT,'repair-cases',c.slug+'.html'),page.replace(/[\t ]+$/gm,''));
 }
 // Preserve all historical fragment IDs on the archive cards.
 if(archive.includes('<!-- repair-case-cards:start -->'))archive=archive.replace(/<!-- repair-case-cards:start -->[\s\S]*?<!-- repair-case-cards:end -->/,`<!-- repair-case-cards:start -->${cases.map(c=>card(c,true)).join('\n')}<!-- repair-case-cards:end -->`);
 else {
  let first=true;
  archive=archive.replace(/<button\b[^>]*data-work-card[\s\S]*?<\/button>/g,()=>{if(!first)return '';first=false;return `<!-- repair-case-cards:start -->${cases.map(c=>card(c,true)).join('\n')}<!-- repair-case-cards:end -->`;});
  if(first)throw Error('Archive cards not found');
 }
 archive=archive.replace('Photos open in a focused gallery view.','Each story includes service details and photos.');
 archive=archive.replace('Open any card to view the full photo set.','Open a repair story for the service details and photographs.').replace('Choose a repair example to view the published photographs and the work they document.','Choose a repair story to read about the work and view photographs from the service visit.');
 archive=archive.replace(/<script[^>]+src="js\/home-page\.js[^>]*><\/script>/g,'');
 archive=archive.replace(/<button[^>]*data-filter-group="city"[^>]*>[\s\S]*?<\/button>/g,tag=>['all',...new Set(cases.map(c=>c.city))].includes(tag.match(/data-filter-value="([^"]+)"/)?.[1])?tag:'');
 if(!archive.includes('data-filter-value="fishers"')) archive=archive.replace(/(<button[^>]*data-filter-group="city"[^>]*data-filter-value="carmel"[^>]*>[\s\S]*?<\/button>)/,'$1\n<button class="recent-work-filter" type="button" data-filter-group="city" data-filter-value="fishers" aria-pressed="false">Fishers</button>');
 archive=metadata(styleLink(archive),{name:'Recent Appliance Repair Work | Alex Appliance Repair',description:'Read real appliance repair stories with service details and original photos from Alex Appliance Repair in Carmel and Central Indiana.',page:BASE+'recent-work.html',imageUrl:BASE+cases[0].photos[0].src,schema:{'@context':'https://schema.org','@type':'CollectionPage',url:BASE+'recent-work.html',name:'Recent Appliance Repair Work',mainEntity:{'@type':'ItemList',itemListElement:cases.map((c,i)=>({'@type':'ListItem',position:i+1,url:url(c),name:title(c)}))}}});
 fs.writeFileSync(path.join(ROOT,'recent-work.html'),archive.replace(/[\t ]+$/gm,''));
 let blog=fs.readFileSync(path.join(ROOT,'blog.html'),'utf8');
 const featured=[cases.find(c=>c.slug===fishersSlug),...cases.filter(c=>c.city==='carmel').slice(0,2),...cases.filter(c=>c.city==='service-area').slice(0,3)].filter(Boolean);
 const block=`<!-- repair-stories:start --><section class="local-section local-section--soft" id="repair-stories"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">From our service visits</p><h2>Real appliance repair stories</h2><p>Explore the work, photographs and service details behind these repairs.</p><a class="local-button" href="/recent-work.html">View all repair stories</a></header><div class="case-grid">${featured.map(c=>card(c)).join('')}</div></div></section><!-- repair-stories:end -->`;
 if(blog.includes('<!-- repair-stories:start -->'))blog=blog.replace(/<!-- repair-stories:start -->[\s\S]*?<!-- repair-stories:end -->/,block);
 else blog=blog.replace(/(<section class="local-hero[\s\S]*?<\/section>)/,'$1\n'+block);
 blog=blog.replace('Helpful repair tips, maintenance advice, and local service updates from Alex Appliance Repair.','Real repair stories, original service photos, maintenance advice and appliance repair guides from Alex Appliance Repair.');
 fs.writeFileSync(path.join(ROOT,'blog.html'),styleLink(blog));
 // Insert through the existing carousel card markup and keep generation repeatable.
 for(const filename of ['index.html','carmel.html']) {
  let html=fs.readFileSync(path.join(ROOT,filename),'utf8');
  const marker='<!-- lg-range-story:start -->';
  const c=lgRangeStory;
  const preview=`${marker}<a class="home-repair-card" href="${url(c)}">${image(c.photos[0])}<span class="home-repair-card-copy"><small>Stove &amp; Oven Repair</small><strong>${esc(title(c))}</strong><span>Read repair story</span></span></a><!-- lg-range-story:end -->`;
  if(html.includes(marker)) html=html.replace(/<!-- lg-range-story:start -->[\s\S]*?<!-- lg-range-story:end -->/,preview);
  else html=html.replace(/(<div\b[^>]*class="home-repairs-track"[^>]*>)/,'$1'+preview);
  if(!html.includes(marker)) throw Error('Missing repair carousel: '+filename);
  fs.writeFileSync(path.join(ROOT,filename),html);
 }
 const datesPath=path.join(ROOT,'scripts/content-dates.json');const dates=JSON.parse(fs.readFileSync(datesPath,'utf8'));
 dates['blog.html']='2026-09-11';dates['recent-work.html']='2026-09-11';for(const c of cases)dates['repair-cases/'+c.slug+'.html']=c.modified;
 fs.writeFileSync(datesPath,JSON.stringify(dates,null,2)+'\n');
 return rebuildSitemaps(cases.map(c=>'repair-cases/'+c.slug+'.html'));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(buildRepairCases());
