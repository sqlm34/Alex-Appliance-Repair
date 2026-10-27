const base='images/repair-cases/maytag-medb835-carmel/';
export const maytagCarmelStory={
 slug:'carmel-maytag-medb835dw4-dryer-squeaking-rollers-idler-repair',
 title:'Maytag Dryer Squeaking: Five Rollers and Idler Pulley Replaced',
 headline:'Maytag MEDB835DW4 Dryer Squeaking Repair in Carmel, Indiana',
 cardTitle:'Squeaking Maytag Dryer in Carmel: Five Rollers, Idler Pulley and Cleaning',
 seoTitle:'Maytag MEDB835DW4 Squeaking Dryer Repair in Carmel, IN',
 description:'Squeaking Maytag MEDB835DW4 dryer repaired in Carmel, IN. Five drum rollers and the idler pulley replaced, lint cleaned out and quiet operation verified.',
 city:'carmel',appliance:'dryer',published:'2026-10-27',modified:'2026-10-27',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Carmel homeowner called about a squeaking Maytag Bravos XL dryer. We diagnosed the noise, opened and cleaned the machine, replaced all five drum support rollers and the belt idler pulley, then reassembled and tested it. The dryer operated quietly and properly after the repair.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'Maytag Bravos XL electric dryer'},
  {label:'Model',value:'MEDB835DW4'},
  {label:'Complaint',value:'Squeaking noise during operation'},
  {label:'Drum supports',value:'Five rollers: two rear, three front'},
  {label:'Belt tensioner',value:'Idler pulley replaced'},
  {label:'Cleaning',value:'Internal lint and debris removed'},
  {label:'Result',value:'Reassembled and tested; quiet operation'}
 ],
 overviewImages:[
  {src:base+'roller-diagram.webp',width:1855,height:2388,caption:'Maytag MEDB835DW4 drum and bulkhead diagram highlighting support rollers'},
  {src:base+'idler-diagram.webp',width:1855,height:2424,caption:'Maytag MEDB835DW4 cabinet diagram highlighting the belt idler pulley'}
 ],
 photos:[
  ['dryer',1200,1600,'Maytag Bravos XL MEDB835DW4 dryer at the Carmel service visit'],
  ['model-label',220,88,'Original Maytag model label showing MEDB835DW4'],
  ['dirty-cabinet',1200,1600,'Opened Maytag dryer with lint and debris inside the cabinet before cleaning'],
  ['old-front-rollers',1200,1600,'Removed front bulkhead with three original drum support rollers'],
  ['old-idler',1200,1600,'Original belt idler pulley before replacement'],
  ['new-rear-rollers',1200,1600,'Two replacement rear drum support rollers installed in the Maytag dryer'],
  ['new-front-rollers',1200,1600,'Close-up of replacement rollers on the three-roller front bulkhead'],
  ['new-idler',1600,1200,'Replacement belt-tensioning idler pulley installed beside the drive motor'],
  ['dirty-blower',1200,1600,'Lint accumulated in the dryer blower wheel before cleaning'],
  ['clean-blower',1200,1600,'Dryer blower wheel after accumulated lint was removed'],
  ['dirty-duct',1200,1600,'Lint inside the removed internal air duct before cleaning'],
  ['clean-duct',1200,1600,'Internal air duct after lint and debris removal'],
  ['clean-cabinet',1200,1600,'Cleaned dryer interior with replacement rear rollers before reassembly']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function maytagCarmelArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Squeaking Maytag Bravos XL Dryer',[
  'A homeowner in <strong>Carmel, Indiana</strong>, called Alex Appliance Repair because their Maytag dryer was making a squeaking noise during operation. The complaint was mechanical noise, rather than a reported loss of heat. We visited the home to diagnose the dryer and inspect the components involved in supporting and turning the drum.',
  'The service included opening the machine, removing accumulated lint and debris, replacing all five drum support rollers and replacing the separate belt idler pulley. After reassembly, the dryer was tested and operated quietly and properly.'
 ])}
 ${row(1,'Model Confirmed: MEDB835DW4',[
  'The original appliance label identifies this Maytag Bravos XL dryer as <strong>MEDB835DW4</strong>. The model-number crop shown here comes directly from the service photograph and excludes the serial number.',
  'The complete model helps identify the dryer configuration when arranging service. For a noise complaint, it is also useful to explain when the sound occurs and whether it changes as the drum turns. A model number and symptom description are enough to begin the conversation; homeowners do not need to identify a failed component themselves.'
 ])}
 ${row(2,'Diagnosis With the Dryer Open',[
  'The dryer was diagnosed and opened so the drum supports, belt tensioner and interior could be inspected. With the drum removed, lint and debris were visible across the cabinet and around the blower area. The front bulkhead was also removed, exposing its three support rollers.',
  'This visit addressed the complete set of <strong>five drum support rollers: two at the rear and three at the front</strong>, along with the idler pulley. The idler is a separate belt-tensioning component and is not included in the count of five drum rollers.'
 ])}
 <section class="repair-story-section"><h2>Cleaning Lint From the Blower</h2><p>The before-and-after photographs show accumulated lint in the blower wheel and the same area after cleaning. The dryer was cleaned while its interior was accessible during the repair.</p>${pair(8,9)}<p>Internal cleaning was part of this service, alongside the mechanical replacements. Removing the visible lint did not replace the need to service the drum supports and idler pulley. Both the cleaning and the component work were completed before the machine was put back together.</p></section>
 <section class="repair-story-section"><h2>Clearing the Internal Air Duct</h2><p>Lint was also present in the removed internal air duct. These photographs show the duct before and after accumulated lint and debris were removed.</p>${pair(10,11)}<p>The cleaning shown here concerns components inside the dryer. It should not be confused with cleaning the home's entire exhaust vent, which is a separate service. Existing surface discoloration remains visible in the photographs; the documented work was lint removal, not replacement or refinishing of the duct.</p></section>
 ${row(3,'Replacing All Five Drum Support Rollers',[
  'The removed front bulkhead shows the three original front rollers. Together with the two rear rollers, they form the five drum supports replaced during this repair. Lint was visible around the original front roller hubs before the work was completed.',
  'All five support rollers were replaced during the visit. The photographs below show the replacement rear rollers and a close-up of the replacement front rollers. These service images document the work on this dryer; another machine with a similar squeak still needs its own diagnosis.'
 ])}
 <section class="repair-story-section"><h2>New Rear and Front Rollers Installed</h2><p>Two replacement rollers were installed at the rear, and all three front rollers were replaced on the front bulkhead. The front close-up shows two of the three front positions.</p>${pair(5,6)}<p>The drum support rollers carry the drum as it rotates. The technician completed the roller replacement while the dryer was disassembled, with access to both the front and rear supports. The total for this job was five drum rollers, plus the separate belt-tensioning idler shown in the next section.</p></section>
 <section class="repair-story-section"><h2>Replacing the Belt Idler Pulley</h2><p>The original idler pulley was replaced as well. The first photograph shows the old pulley; the second shows its replacement installed beside the drive motor.</p>${pair(4,7)}<p>The idler maintains tension on the drive belt and has a different role from the drum support rollers. Replacing it completed the mechanical work described in this service. No belt replacement is included in the documented scope of this repair.</p></section>
 ${row(12,'Reassembly and a Quiet Operating Test',[
  'After the interior cleaning and component replacements, the removed assemblies were reinstalled and the dryer was reassembled in reverse order. The photograph shows the cleaned interior before the machine was closed up, rather than a finished operating test.',
  'The fully assembled dryer was then tested. <strong>It operated quietly and properly after the repair.</strong> The result of this visit was a resolved squeaking complaint following replacement of five drum support rollers and the idler pulley, with lint and debris cleaned from the interior.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Maytag Dryer Repair</h2>
 <h3>How many rollers were replaced?</h3><p>Five drum support rollers were replaced: two rear rollers and three front rollers. One separate belt idler pulley was also replaced.</p>
 <h3>Was the dryer cleaned during the repair?</h3><p>Yes. Internal lint and debris were removed, including buildup in the blower wheel and internal air duct shown in the photographs.</p>
 <h3>Was the squeaking gone after service?</h3><p>Yes. After reassembly, the dryer was tested and operated quietly and properly.</p>
 <h3>Does every squeaking Maytag dryer need the same repair?</h3><p>No. This article documents one MEDB835DW4 repair. A similar noise can require a different repair, so the appliance should be diagnosed before components are selected.</p></section>
 <section class="repair-story-section"><h2>Maytag Dryer Repair in Carmel, Indiana</h2><p>For a squeaking or noisy Maytag dryer, contact Alex Appliance Repair for <a href="/carmel/dryer-repair-services.html">dryer repair in Carmel</a>. Share the model number and describe the sound so we can discuss the service visit.</p><p>See our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/carmel.html">Carmel service coverage</a> and <a href="/recent-work.html">recent repair stories</a>. For a different Maytag service, read about a <a href="/repair-cases/noblesville-maytag-med5430mw0-dryer-not-heating-repair.html">dryer that was not heating in Noblesville</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Carmel</a></section>
 </article>`;
}
