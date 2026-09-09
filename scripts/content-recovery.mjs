import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from './recovery-articles.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REVIEW_DATE = '2026-09-09';
const BASE = 'https://alex-repair.com/';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const cities = {fishers:'Fishers',westfield:'Westfield',noblesville:'Noblesville'};
const preparation = {
  refrigerator: 'Note which compartment is affected, any temperature readings, visible frost, leaks or changes after a power interruption. Tell us if the refrigerator is built in or panel-ready; do not move it or remove panels to investigate.',
  washer: 'Tell us whether the washer is front-load or top-load, which cycle stage stops, whether water remains in the tub and any displayed error code. Mention a stacked installation or restricted access to the drain and water connections. Do not force a locked door or dismantle the machine.',
  dryer: 'Note whether the dryer is gas or electric, whether the drum turns and whether the issue is no heat, long dry times, noise or stopping mid-cycle. Mention stacked equipment and any known exhaust restriction. Do not open the cabinet or bypass safety devices.',
  dishwasher: 'Record the cycle stage, error code and where any leak appears. Tell us about recent installation, disposal or plumbing work and whether water stays in the tub. Do not run another cycle if water is leaking onto the floor or cabinetry.',
  stove: 'Tell us whether the appliance is gas, electric or dual fuel, and whether the fault affects one burner, the oven or both. Note the selected mode and any error code. Mention a wall oven or built-in installation before the visit.',
  microwave: 'Identify a countertop, over-the-range, drawer or built-in microwave and describe the controls, door and heating symptom. Do not remove the cabinet or bypass door interlocks; internal components require professional handling even after the appliance is unplugged.',
  cooktop: 'Identify gas, radiant electric or induction equipment and note which cooking zones are affected. Report control messages, ignition problems or changes after cleaning or installation. Do not remove the cooktop from its cutout or open electrical connections.',
  freezer: 'Tell us whether this is an upright, chest or built-in freezer, and report temperature readings, visible frost, door-seal damage or a recent power interruption. Note a garage installation if applicable. Do not chip ice away or remove internal panels.'
};
const jobs = {
  dryer: {id:'service-area-lg-dryer-rollers',image:'images/home-repairs/lg-dryer-rollers-01.webp',title:'LG dryer tensioner and roller replacement',description:'Published service-area example showing cabinet access and belt, tensioner and roller work.',width:1200,height:1600},
  washer: {id:'service-area-samsung-washer-valve',image:'images/home-repairs/samsung-washer-valve-01.webp',title:'Samsung washer water valve replacement',description:'Published service-area example showing water-inlet valve access and replacement work.',width:1600,height:1200},
  dishwasher: {id:'service-area-bosch-dishwasher-pump',image:'images/home-repairs/bosch-dishwasher-pump-01.webp',title:'Bosch dishwasher circulation pump replacement',description:'Published service-area example showing pump access, replacement and reassembly.',width:1200,height:1600},
  refrigerator: {id:'service-area-frigidaire-freezer-fan',image:'images/home-repairs/frigidaire-freezer-fan-01.webp',title:'Frigidaire freezer fan replacement',description:'Published service-area example showing access to the freezer fan and component work.',width:1200,height:1600}
};
function proof(keys) {
  return `<section class="local-section local-section--soft" data-content-recovery="repair-proof"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Documented repair work</p><h2>See the work behind a repair visit</h2><p>These examples come from our published service-area gallery. They show the equipment and work documented on those visits; your appliance needs its own diagnosis.</p></header><div class="local-grid local-grid--three">${keys.map(key=>{const j=jobs[key];return `<article class="local-feature recovery-job"><a href="${BASE}recent-work.html#${j.id}"><img src="${BASE}${j.image}" alt="${esc(j.title)}" width="${j.width}" height="${j.height}" loading="lazy"><h3>${j.title}</h3></a><p>${j.description}</p><a href="${BASE}recent-work.html#${j.id}">View repair photos</a></article>`;}).join('')}</div></div></section>`;
}
function addBeforeCta(html, block, marker) {
  if (html.includes(`data-content-recovery="${marker}"`)) return html;
  return html.replace(/<section class="local-cta">/, `${block}\n<section class="local-cta">`);
}
function rewriteSchemas(html, article) {
  return html.replace(/<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, raw)=>{
    const data=JSON.parse(raw);
    function clean(v){
      if(Array.isArray(v)) return v.map(clean).filter(v=>v!==null);
      if(!v||typeof v!=='object') return v;
      if(v['@type']==='FAQPage') return null;
      for(const key of Object.keys(v)) v[key]=clean(v[key]);
      if(v['@type']==='BlogPosting') {v.dateModified=REVIEW_DATE; v.description=article.lead; delete v.comment; delete v.commentCount;}
      return v;
    }
    const result=clean(data);
    return result ? `<script${attrs}>\n${JSON.stringify(result,null,2)}\n</script>` : '';
  });
}

export function improvePage(relativePath, input) {
  let html=input.replace(/\r\n/g,'\n');
  if(!relativePath.endsWith('.html')) return html;
  const before=html;
  // These are the exact repeated placeholder comments, not arbitrary user content.
  html=html.replace(/<section class="alex-comments-wrap">[\s\S]*?<\/section>/g, block=>block.includes('Very helpful article. The warning signs are easy to understand')&&block.includes('Sarah K.')?'':block);
  if(relativePath.startsWith('brands/')) {
    html=html.replace('One brand page, six local routes','Model support and estimates')
      .replace('Service without duplicate city-brand pages','Before approving a brand-specific repair')
      .replace(/<p>This consolidated [^<]+ page replaces substantially similar city-specific brand pages\.[\s\S]*?<\/p>/,'<p>Share the appliance type, model number and installation details so we can confirm support for your equipment. Parts availability and access can affect the repair options. If manufacturer warranty coverage may apply, check its service requirements before authorizing independent work.</p>');
  }
  if(relativePath==='brands.html') html=html.replace('Browse one consolidated page for each supported brand, with appliance categories and links to local service routes across Central Indiana.','Find repair information for your appliance brand, including the equipment we evaluate and service coverage across Central Indiana.').replace('Select a brand to view one consolidated repair page with supported appliance categories and links to every local service route.','Choose your brand to check appliance categories, model details to prepare and local service coverage.');
  const match=relativePath.match(/^(carmel|fishers|westfield|noblesville|mccordsville|zionsville)\/(\w+)-repair-services\.html$/);
  if(match) {
    const [,city,service]=match;
    html=html.replace(/(<h2>How we approach [^<]+<\/h2>\s*)<p>[^<]*<\/p>/,`$1<p>${preparation[service]}</p>`);
    if(relativePath==='carmel/washer-repair-services.html') html=addBeforeCta(html,proof(['washer']),'repair-proof');
    if(relativePath==='fishers/dryer-repair-services.html') html=addBeforeCta(html,proof(['dryer']),'repair-proof');
    if(relativePath==='mccordsville/freezer-repair-services.html') {
      html=addBeforeCta(html,`<section class="local-section" data-content-recovery="freezer-preparation"><div class="local-shell local-copy"><h2>Before a freezer service visit in McCordsville</h2><p>For a freezer kept in a garage or other unconditioned space, share the installation location and check the model's permitted ambient conditions in its manual. A change after hot or cold weather is useful information, but does not by itself prove a component has failed.</p><p>Keep the door closed where practical and protect temperature-sensitive contents if cooling is unreliable. Record the temperature, frost pattern and any displayed warning without removing covers. See <a href="${BASE}mccordsville.html">McCordsville service coverage</a> for scheduling and other appliances.</p></div></section>`,'freezer-preparation');
    }
    if(relativePath==='zionsville/stove-repair-services.html') {
      html=addBeforeCta(html,`<section class="local-section" data-content-recovery="cooking-preparation"><div class="local-shell local-copy"><h2>Prepare for range or oven service in Zionsville</h2><p>For a range, note whether the problem affects the surface burners, oven or both. For a wall oven, include the model and installation details. Report the selected cooking mode, error code and whether the appliance stops heating or heats unevenly.</p><p>A built-in or dual-fuel installation may require different access and diagnostic checks. Do not disconnect gas lines, remove a wall oven or bypass controls. Review <a href="${BASE}zionsville.html">Zionsville appliance repair coverage</a> and share access restrictions when booking.</p></div></section>`,'cooking-preparation');
    }
  }
  if(cities[relativePath.replace('.html','')]) {
    const city=relativePath.replace('.html','');
    const keys=city==='fishers'?['washer','dryer','dishwasher']:city==='westfield'?['dryer','refrigerator','washer']:['dishwasher','washer','refrigerator'];
    html=html.replace('Each appliance has a dedicated local page with symptoms, diagnostic information and booking details. Choose the equipment that needs service.','Choose the appliance that needs attention to see common symptoms, preparation details and repair options.');
    html=addBeforeCta(html,proof(keys),'repair-proof');
  }
  if(articles[relativePath]) {
    const article=articles[relativePath];
    const start=html.indexOf('<article class="alex-article-card">');
    const end=html.indexOf('<aside class="alex-article-sidebar">',start);
    if(start<0||end<start) throw new Error(`Missing article boundaries: ${relativePath}`);
    html=html.slice(0,start)+`<article class="alex-article-card"><div class="alex-article-body">${article.body}<p class="recovery-review-date">Updated <time datetime="${REVIEW_DATE}">September 9, 2026</time>. <a href="${BASE}about.html">About Alex Appliance Repair</a></p></div></article>\n`+html.slice(end);
    html=html.replace(/(<section class="local-hero local-hero--article">[\s\S]*?<p class="local-hero-lead">)[\s\S]*?(<\/p>)/,`$1${article.lead}$2`);
    html=html.replace(/(<meta\b[^>]*(?:name="description"|property="og:description"|name="twitter:description")[^>]*content=")[^"]*/g,`$1${esc(article.lead)}`);
    html=rewriteSchemas(html,article);
  }
  if(relativePath==='about.html') html=addBeforeCta(html,`<section class="local-section local-section--soft" data-content-recovery="business-evidence"><div class="local-shell local-copy"><h2>Review our work before booking</h2><p>Alex Appliance Repair is operated by Aksenov LLC. Our <a href="${BASE}recent-work.html">repair gallery</a> shows original photographs of laundry, dishwasher and refrigeration service. Each example identifies the published location or service area and the work shown.</p><p>Before approving a repair, ask us to explain the diagnosis, estimate and warranty terms for your appliance. You can <a href="tel:+14632488429">call (463) 248-8429</a> to discuss the appliance and the available appointment window.</p></div></section>`,'business-evidence');
  if(relativePath==='recent-work.html') html=html.replace('A clean archive for real jobs','Photos from appliance service visits').replace('This page keeps completed repair photos in one organized place instead of overloading every service page with dozens of images. Each card opens the related photo set for that job.','Choose a repair example to view the published photographs and the work they document.').replace('Fast loading','Repair details').replace('Compressed WebP images','Photos of equipment and component access').replace('This archive keeps larger repair photo sets in one fast, organized place. Service pages can stay focused on scheduling, symptoms and local coverage while this gallery gives homeowners extra proof of hands-on appliance repair work.','These photographs document particular service visits. Similar symptoms can have different causes; a repair recommendation for your appliance follows diagnosis.');
  if(html!==before) html=html.replace(/css\/local-seo\.css(?:\?[^"']*)?/g,'css/local-seo.css?v=20260909-content-review');
  return html;
}

export function applyRecovery() {
  const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
  const paths=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname.slice(1)||'index.html');
  const changed=[];
  for(const relativePath of paths) {
    const file=path.join(ROOT,relativePath); const original=fs.readFileSync(file,'utf8');
    const improved=improvePage(relativePath,original);
    if(improved!==original.replace(/\r\n/g,'\n')) {fs.writeFileSync(file,improved);changed.push(relativePath);}
  }
  return changed;
}
