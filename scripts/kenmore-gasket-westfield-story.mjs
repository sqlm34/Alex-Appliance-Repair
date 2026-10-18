const base='images/repair-cases/kenmore-gasket-westfield/';
export const kenmoreGasketStory={
 slug:'westfield-kenmore-elite-79641582411-washer-door-gasket-replacement',
 title:'Kenmore Elite Washer Door Gasket Replacement',
 headline:'Kenmore Elite 796.41582.411 Washer Door Gasket Replacement in Westfield',
 cardTitle:'Kenmore Elite Washer Gasket Replacement in Westfield',
 seoTitle:'Kenmore Washer Gasket Replacement in Westfield, IN',
 description:'Kenmore Elite 796.41582.411 washer door gasket replacement in Westfield, IN. See the original before-and-after photos, cleaned mounting lip and leak-free test.',
 city:'westfield',appliance:'washer',published:'2026-10-18',modified:'2026-10-18',
 editorialStylesheet:'lg-fan-noblesville',
 overviewImage:{src:base+'gasket-diagram.webp',width:1226,height:1800,caption:'Washer assembly diagram with the door gasket highlighted'},
 summary:'A Westfield homeowner requested replacement of a dirty, stiff, moldy door gasket on an otherwise working Kenmore Elite washer. We removed the obstructing counterweights, cleaned the mounting area, installed a new gasket and tested the reassembled washer. No leaks were found.',
 overviewEntries:[
  {label:'Location',value:'Westfield, Indiana'},
  {label:'Appliance',value:'Kenmore Elite front-load washer'},
  {label:'Model',value:'796.41582.411'},
  {label:'Customer concern',value:'Dirty, stiff and moldy door gasket'},
  {label:'Other functions',value:'Working well before the repair'},
  {label:'Repair',value:'Door boot gasket replacement and mounting-area cleaning'},
  {label:'Access',value:'Counterweights removed and reinstalled'},
  {label:'Result',value:'Reassembled and tested; no leaks'}
 ],
 photos:[
  ['old-and-new-gaskets',1200,1600,'Removed old door gasket beside the packaged replacement for the Westfield washer'],
  ['model-label',360,87,'Original model-number label crop: Kenmore Elite 796.41582.411'],
  ['gasket-before',1200,1600,'Before: heavy staining and buildup inside the old washer door gasket'],
  ['gasket-after',1200,1600,'After: the replacement door gasket fitted around the drum opening'],
  ['top-panel-removed',1200,1600,'Top panel removed during access to the Kenmore Elite washer door boot'],
  ['front-panel-removed',1200,1600,'Front panel removed with the old gasket and front counterweights exposed'],
  ['counterweight-removed',1600,1200,'Removed front counterweight and gasket retaining ring during the repair'],
  ['mounting-lip-before',1200,1600,'Before cleaning: deposits on the tub lip beneath the removed gasket'],
  ['mounting-lip-after',1200,1600,'After cleaning: the tub mounting lip prepared for the replacement gasket'],
  ['new-gasket-installed',1200,1600,'New door boot fitted to the washer tub before reassembly'],
  ['inner-retaining-ring',1200,1600,'Inner spring retaining ring securing the replacement door boot'],
  ['hose-reconnected',1200,1600,'Lower gasket hose reconnected with its clamps in place'],
  ['counterweight-reinstalled',1200,1600,'Front counterweight reinstalled around the new washer door boot'],
  ['finished-door-seal',1200,1600,'Completed gasket replacement with the front panel back in place'],
  ['washer-testing',1200,1600,'Reassembled Kenmore Elite washer powered on for post-repair testing in Westfield']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function kenmoreGasketArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Replacing a Worn Door Gasket on an Otherwise Working Washer',[
  'This <strong>Kenmore Elite washer repair in Westfield, Indiana</strong> focused on the condition of the door boot, also called the door gasket or door seal. The homeowner reported that the old rubber had become dirty, rough and stiff, with mold buildup, and requested a new gasket.',
  'The washer\'s other functions were working well. This was not a visit for a reported initial leak or a failed wash cycle. We replaced the gasket, reassembled the appliance and checked it in operation. <strong>No leaks were found during the final test.</strong>'
 ])}
 ${row(1,'The Actual Washer Model: Kenmore Elite 796.41582.411',[
  'The model label on this washer identifies it as <strong>Kenmore Elite 796.41582.411</strong>. This is a crop of the original service photograph, not recreated label text. The serial-number area has been left out.',
  'The complete model number matters when identifying a replacement gasket and its connection layout. The photographs throughout this story document this specific washer and the work performed at the Westfield home.'
 ])}
 <section class="repair-story-section"><h2>Before and After: The Door Seal</h2><p>The first photograph shows the old gasket with extensive staining and buildup in its folds. The second shows the replacement fitted around the opening after reassembly. The homeowner chose replacement because of the old gasket's condition; the repair was not presented as a solution to an unrelated mechanical fault.</p>${pair(2,3)}</section>
 <section class="repair-story-section"><h2>Opening the Cabinet for Access</h2><p>We removed the panels needed to reach the door boot and its connections. With the front exposed, the counterweights restricted working access around the gasket. They were removed for this replacement and installed again during reassembly.</p>${pair(4,5)}</section>
 ${row(6,'Removing the Obstructing Counterweights',[
  'The photograph shows a removed front counterweight and gasket retaining ring. Removing the counterweights provided access to release the old boot and work around its mounting edge.',
  'The counterweights were removed for access, not because they were diagnosed as defective. They remained part of the washer and were reinstalled after the new boot was fitted.'
 ])}
 <section class="repair-story-section"><h2>Cleaning the Mounting Lip Before Installation</h2><p>Removing the old gasket exposed deposits around the tub opening. We cleaned this accessible mounting area before installing the replacement. These close-ups show the same stage of the job before and after cleaning; this was mounting-area cleaning, not a claim that the entire outer tub had been dismantled and cleaned.</p>${pair(7,8)}</section>
 ${row(9,'Fitting the New Door Boot',[
  'The replacement gasket was fitted around the tub opening. Its connections were positioned for reassembly, and the inner retaining ring was installed to secure the boot.',
  'The new gasket replaced the old rubber rather than concealing or treating its stains. The following photographs document the retaining spring and one of the reconnected hoses before the cabinet was closed.'
 ])}
 <section class="repair-story-section"><h2>Securing the Gasket and Reconnecting the Hose</h2><p>The inner retaining ring and hose connections were restored as part of the installation. The lower hose is shown with its clamps back in place. These are service-record photographs of this repair, not a complete disassembly guide for other washer models.</p>${pair(10,11)}</section>
 <section class="repair-story-section"><h2>Reinstalling the Counterweights and Front Panel</h2><p>With the replacement boot secured, we reassembled the washer in reverse order, including the counterweights, connections, panels and outer gasket attachment. The photographs show the new boot with the counterweight reinstalled and the finished door opening after the front panel was restored.</p>${pair(12,13)}</section>
 ${row(14,'Final Test: The New Gasket Held Water',[
  'After reassembly, we tested the washer. <strong>The new door gasket held water, and no leaks were observed.</strong> The washer was returned to the homeowner with the requested replacement completed.',
  'The customer was satisfied with the result. This visit addressed the gasket condition while retaining the other components that were already working well.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Gasket Replacement</h2>
 <h3>Was this washer leaking before service?</h3><p>A leak was not the reported reason for the visit. The customer requested replacement of a dirty, stiff, moldy gasket. The leak check was performed after installation.</p>
 <h3>Was the old gasket cleaned or replaced?</h3><p>It was replaced with a new gasket. We also cleaned the accessible mounting lip exposed by removing the old boot.</p>
 <h3>Why were the counterweights removed?</h3><p>They restricted access to the gasket on this washer. They were removed for the job and reinstalled during reassembly, not replaced as failed parts.</p>
 <h3>Did the washer need other repairs?</h3><p>The customer reported that its other functions were working well. This service record documents the requested door gasket replacement and the successful post-repair leak check.</p>
 </section>
 <section class="repair-story-section"><h2>Washer Door Gasket Replacement in Westfield, Indiana</h2><p>For a damaged or deteriorated washer door seal, contact Alex Appliance Repair for <a href="/westfield/washer-repair-services.html">washer repair in Westfield</a>. Share the full model number, a photograph of the gasket and a description of the concern so we can discuss the service request.</p><p>Explore our <a href="/washer-repair.html">washer repair services</a>, <a href="/westfield.html">Westfield service area</a> and more <a href="/recent-work.html">repair stories with original service photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your washer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Westfield</a></section>
 </article>`;
}
