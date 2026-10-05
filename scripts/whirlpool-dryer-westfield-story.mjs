const base='images/repair-cases/whirlpool-dryer-westfield/';
export const whirlpoolDryerStory={
 slug:'westfield-whirlpool-wed5800bw0-dryer-noise-rollers-idler-pulley',
 title:'Whirlpool Cabrio Dryer Noise Repair',
 headline:'Whirlpool WED5800BW0 Dryer Noise Repair in Westfield',
 cardTitle:'Whirlpool Cabrio Dryer: Squeaking, Drum Thumping and Lint Buildup',
 seoTitle:'Whirlpool Dryer Noise Repair in Westfield | Alex Repair',
 description:'Whirlpool WED5800BW0 dryer repair in Westfield, IN: front and rear rollers and idler pulley replaced, belt retained, cabinet and blower cleaned.',
 city:'westfield',appliance:'dryer',published:'2026-10-05',modified:'2026-10-05',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Whirlpool Cabrio dryer in Westfield was squeaking and the drum was thumping during operation. We replaced the front and rear support rollers and idler pulley, retained the inspected belt, cleaned the cabinet and blower, then reassembled and tested the dryer.',
 overviewEntries:[
  {label:'Location',value:'Westfield, Indiana'},
  {label:'Appliance',value:'Whirlpool Cabrio electric dryer'},
  {label:'Model',value:'WED5800BW0, verified from the appliance label'},
  {label:'Complaint',value:'Squeaking and drum thumping / bouncing'},
  {label:'Parts replaced',value:'Front and rear drum support rollers and idler pulley'},
  {label:'Drive belt',value:'Inspected, in good condition and retained'},
  {label:'Cleaning',value:'Cabinet interior, blower wheel and internal lint duct'},
  {label:'Completion',value:'Reassembled and tested'}
 ],
 photos:[
  ['whirlpool-cabrio-service-visit',1200,1600,'Whirlpool Cabrio dryer opened for a noise inspection in Westfield, Indiana'],
  ['wed5800bw0-model-label',195,80,'Original appliance-label crop showing Whirlpool model WED5800BW0'],
  ['cabinet-before-cleaning',1200,1600,'Dryer with drum removed, showing heavy lint accumulation inside the cabinet'],
  ['blower-before-cleaning',1200,1600,'Blower wheel and housing coated with accumulated lint before cleaning'],
  ['blower-after-cleaning',1200,1600,'Same blower wheel after cleaning, with the heavy lint deposits removed'],
  ['old-idler-pulley',1400,1050,'Old idler pulley showing discoloration and marks on its running surface'],
  ['replacement-idler-installed',1400,1050,'Replacement idler pulley installed beside the existing drive motor'],
  ['rear-support-rollers',1400,1050,'Two replacement rear drum support rollers installed on the back support'],
  ['front-support-rollers',1400,1050,'Replacement front drum support rollers on the removed front bulkhead'],
  ['lint-in-front-duct',1200,1600,'Heavy lint accumulation in the removed front internal duct before cleaning'],
  ['front-duct-cleaned',1400,1050,'Removed front internal duct after cleaning during the Whirlpool dryer repair'],
  ['cabinet-after-cleaning',1200,1600,'Dryer cabinet after vacuuming and cleaning, before drum installation and reassembly'],
  ['cabinet-idler-parts-diagram',1700,2221,'Whirlpool WED5800BW0 cabinet diagram with the idler pulley assembly highlighted'],
  ['drum-roller-parts-diagram',1700,2507,'Whirlpool WED5800BW0 drum diagram with front and rear support roller locations highlighted'],
  ['idler-pulley-reference',2384,2858,'Supplied reference image of idler pulley assembly W10837240'],
  ['support-roller-reference',450,450,'Supplied reference image of drum support roller WPW10314173']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function whirlpoolDryerArticle(c,image,esc){
 const figure=(i,uniform=false)=>{
  const max=uniform==='duct'?520:uniform?450:Math.min(c.photos[i].width,520*c.photos[i].width/c.photos[i].height);
  const inset=uniform==='duct'?0:20;
  const frame=uniform?`style="aspect-ratio:${uniform==='duct'?'4/3':'1'};position:relative" `:'';
  const sizing=uniform?`position:absolute;top:${inset}px;left:${inset}px;width:calc(100% - ${inset*2}px);height:calc(100% - ${inset*2}px);object-fit:contain!important;aspect-ratio:auto`:`aspect-ratio:${c.photos[i].width}/${c.photos[i].height}`;
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" ${frame}href="/${c.photos[i].src}">${image(c.photos[i],i!==0).replace('<img ',`<img style="${sizing}" `)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b,uniform=false)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,uniform)}${figure(b,uniform)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Squeaking and a Thumping Drum',[
 'The homeowner in <strong>Westfield, Indiana</strong> reported that this Whirlpool Cabrio dryer was noisy: it squeaked, and the drum thumped or bounced as it turned. We opened the dryer to inspect its drum supports and belt-tensioning components.',
 'The repair included new front and rear drum support rollers and a new idler pulley. With the drum removed, we also addressed substantial lint accumulation inside the appliance.'
 ])}
 ${row(1,'Model Confirmed: WED5800BW0',[
 'The original appliance label identifies this electric dryer as <strong>Whirlpool WED5800BW0</strong>. This is a crop of the photographed model line, not a recreated label. The serial number is excluded.',
 'The full model number matters when selecting replacement parts. The Cabrio name alone does not identify every component used in a particular dryer.'
 ])}
 ${row(2,'What We Found Inside the Cabinet',[
 'Removing the drum exposed heavy lint deposits across the cabinet floor and around the motor, heater housing and blower assembly. The photographs document the condition found during this visit.',
 'We inspected the support and drive components as part of the noise diagnosis. The lint buildup was an additional maintenance finding; the photographs alone do not establish it as the cause of every reported sound.'
 ])}
 <section class="repair-story-section"><h2>Front and Rear Drum Support Rollers Replaced</h2><p>We replaced the drum support rollers at both the front and rear of this dryer. These rollers carry the drum as it rotates. The photographs show the two rear replacements on the back support and the front replacements on the removed front bulkhead.</p><p>This job involved both sets of rollers, not just the rear pair. The supports were accessible while the drum and front assembly were removed.</p>${pair(7,8)}</section>
 ${row(5,'Inspecting the Old Idler Pulley',[
 'The idler pulley is separate from the drum support rollers. It maintains tension on the drive belt as the motor turns the drum. We inspected this assembly and replaced the pulley as part of the noise repair.',
 'The close-up shows the old pulley before replacement. Its surface marks are visible, but a photograph cannot substitute for checking how a pulley turns and behaves in operation.'
 ])}
 ${row(6,'New Idler Pulley, Existing Belt',[
 'The replacement idler pulley was installed beside the existing motor. <strong>The drive belt was inspected, found to be in good condition and retained.</strong> A belt replacement was not part of this repair.',
 'The motor and heating assembly also remained in place. Replacing the rollers and pulley did not require replacing these larger assemblies.'
 ])}
 ${row(12,'Cabinet Diagram: Idler Pulley Assembly',[
 'This supplied <strong>WED5800BW0 cabinet diagram</strong> shows the drive motor and belt-tensioning assembly in relation to the cabinet. The enlarged callout highlights the idler pulley assembly.',
 'The diagram provides a parts-location reference alongside the service photographs above. The belt is also shown in the drawing, but it was inspected and retained on this repair.'
 ])}
 ${row(13,'Drum Diagram: Front and Rear Support Rollers',[
 'The second supplied diagram shows the drum, front bulkhead and rear support. Its callouts highlight the <strong>front and rear drum support rollers</strong>, corresponding to the locations photographed during replacement.',
 'The complete drawing is included without cropping the numbered parts or enlarged roller illustration. Open the image to inspect those details.'
 ])}
 <section class="repair-story-section"><h2>Idler Pulley and Drum Roller References</h2><p>The supplied parts images identify the idler pulley assembly as <strong>W10837240</strong> and the drum support roller as <strong>WPW10314173</strong>. These are identification references accompanying the diagrams; the installed components are documented in the service photographs above. Match replacement parts to the full appliance identification before ordering.</p>${pair(14,15,true)}</section>
 <section class="repair-story-section"><h2>Blower Wheel Before and After Cleaning</h2><p>The blower wheel had thick lint deposits on its blades and around its housing. We cleaned the existing wheel and housing rather than replacing the blower. The paired photographs show the heavy buildup before cleaning and the same assembly afterward.</p><p>Some light residue remains visible in the after photograph. The documented work was removal of the accumulated lint, not restoration of every surface to a new appearance.</p>${pair(3,4)}</section>
 <section class="repair-story-section"><h2>Clearing Lint From the Internal Duct</h2><p>The removed front duct also contained a substantial accumulation of lint. We cleaned this internal passage while the dryer was apart. These are components inside the appliance; this visit does not document cleaning the entire household exhaust duct.</p>${pair(9,10,'duct')}</section>
 ${row(11,'Interior Cleaning, Reassembly and Testing',[
 'We vacuumed and cleaned the cabinet interior, including the accessible areas around the drive and air-handling components. This photograph shows the cleaned cabinet and installed replacement parts before the drum went back in.',
 'After the roller and idler pulley replacement and cleaning were complete, we reassembled and tested the dryer. The photograph records the pre-reassembly stage, not the final operating test.'
 ])}
 <section class="repair-story-section"><h2>Questions About Noisy Whirlpool Dryers</h2><h3>Does a squeaking dryer always need a new belt?</h3><p>No. On this dryer, the belt was inspected and retained because it was in good condition. The parts replaced were the support rollers and idler pulley. Another dryer needs its own inspection.</p><h3>Are drum rollers and the idler pulley the same thing?</h3><p>No. The rollers support the drum; the idler pulley tensions its drive belt. Both were included in this Westfield repair.</p><h3>Was the blower wheel replaced?</h3><p>No. The existing blower wheel was cleaned. The before-and-after photographs document the removal of heavy lint deposits.</p><h3>What should I share when booking a noise inspection?</h3><p>Provide the model number and describe whether the noise is a squeak, scrape or rhythmic thump, and when it occurs. A recording can help describe the symptom, but an inspection is needed to determine the repair.</p></section>
 <section class="repair-story-section"><h2>Dryer Repair in Westfield, Indiana</h2><p>Alex Appliance Repair provides <a href="/dryer-repair.html">dryer repair</a> in <a href="/westfield.html">Westfield</a>. For a squeaking or thumping dryer, we inspect the appliance and explain the recommended work before proceeding with an approved repair.</p><p>Explore our <a href="/recent-work.html">documented repair stories</a> and <a href="/brands.html">serviced appliance brands</a>. Alex Appliance Repair is an independent service operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair</a></section>
 </article>`;
}
