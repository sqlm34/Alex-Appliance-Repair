const base='images/repair-cases/whirlpool-no-start-carmel/';
export const whirlpoolNoStartStory={
 slug:'carmel-whirlpool-wed8500dc4-dryer-not-starting-thermal-fuse',
 title:'Whirlpool Dryer Not Starting: Thermal Fuse Repair',
 headline:'Whirlpool WED8500DC4 Dryer Not Starting in Carmel, Indiana',
 cardTitle:'Whirlpool Dryer Not Starting in Carmel: Fuse and Roller Repair',
 seoTitle:'Whirlpool Dryer Not Starting Repair | Carmel, IN',
 description:'Whirlpool WED8500DC4 dryer repair in Carmel, IN: blown blower-housing thermal fuse, five new drum rollers, idler pulley replacement and internal cleaning.',
 city:'carmel',appliance:'dryer',published:'2026-10-19',modified:'2026-10-19',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Whirlpool dryer in Carmel would not start despite a working power supply and cord. We replaced the blown thermal fuse, all five drum support rollers and the idler pulley, cleaned the interior, then reassembled and tested the dryer successfully.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'Whirlpool electric dryer'},
  {label:'Model',value:'WED8500DC4'},
  {label:'Complaint',value:'Dryer would not start'},
  {label:'Diagnosis',value:'Blown thermal fuse on blower housing'},
  {label:'Parts replaced',value:'Thermal fuse, five drum rollers and idler pulley'},
  {label:'Cleaning',value:'Cabinet, blower, internal air duct and both drum felt edges'},
  {label:'Result',value:'Reassembled and tested; operation restored'}
 ],
 overviewImages:[
  ['drum-blower-diagram',1391,1800,'Whirlpool WED8500DC4 drum and blower diagram highlighting rollers and thermal fuse'],
  ['idler-diagram',1373,1800,'Whirlpool WED8500DC4 cabinet and drive diagram highlighting the idler pulley']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 photos:[
  ['dryer',1200,1600,'Whirlpool Cabrio electric dryer serviced at a home in Carmel, Indiana'],
  ['model-label',265,115,'Original Whirlpool dryer label identifying model WED8500DC4'],
  ['cabinet-before-cleaning',1200,1600,'Dryer interior with the drum removed before internal cleaning'],
  ['old-and-new-thermal-fuses',1200,1600,'Removed thermal fuse beside its replacement during the Carmel dryer repair'],
  ['installed-thermal-fuse',1200,1600,'Replacement thermal fuse mounted on the blower housing before reconnecting the wires'],
  ['rear-rollers',1600,1200,'Two replacement drum support rollers installed on the rear bulkhead'],
  ['front-rollers',1200,1600,'Three replacement drum support rollers installed on the front bulkhead'],
  ['old-and-new-idler',1200,1600,'Removed idler pulley assembly beside the new replacement'],
  ['installed-idler',1600,1200,'Replacement idler pulley installed beside the dryer motor'],
  ['blower-before-cleaning',1200,1600,'Lint inside the blower wheel before cleaning'],
  ['blower-after-cleaning',1200,1600,'Blower wheel after lint removal and cleaning'],
  ['air-duct-lint',1200,1600,'Lint inside the removed internal air duct that connects to the blower'],
  ['drum-felt-first-end',1200,1600,'Felt edge at one end of the removed dryer drum during cleaning service'],
  ['drum-felt-second-end',1200,1600,'Felt edge at the other end of the drum during cleaning service'],
  ['cabinet-after-cleaning',1200,1600,'Whirlpool dryer cabinet after vacuuming and internal cleaning'],
  ['reassembly',1200,1600,'Drum back in position while the dryer front is being reassembled'],
  ['completed-test',1200,1600,'Reassembled Whirlpool dryer running during the final operational check']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function whirlpoolNoStartArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Whirlpool Dryer That Would Not Start',[
  'A homeowner in <strong>Carmel, Indiana</strong>, called because their Whirlpool dryer would not start. The service visit began with checking the electrical supply before opening the appliance to inspect its internal components.',
  'The no-start fault was traced to a blown thermal fuse on the blower housing. In addition to replacing that fuse, we replaced all five drum support rollers and the idler pulley, and cleaned the dryer internally. After reassembly, the dryer started and operated properly during testing.'
 ])}
 ${row(1,'Model Identification: Whirlpool WED8500DC4',[
  'The appliance label identifies this electric dryer as <strong>Whirlpool WED8500DC4</strong>. The original model-number area is shown here from the service photograph.',
  'This case documents the diagnosis and work completed on that specific dryer. A similar no-start complaint on another appliance still requires its own inspection.'
 ])}
 ${row(2,'Checking the Outlet, Terminal Block and Power Cord',[
  'We checked power at the wall outlet and at the dryer terminal block, along with the power cord. The supply and cord checked out, so the repair did not require replacing the cord.',
  'The dryer was then opened for internal diagnosis. With the drum removed, the blower housing, drive components and cabinet interior were accessible. The photograph shows the lint and dust present before cleaning.'
 ])}
 <section class="repair-story-section"><h2>The No-Start Fault: A Blown Blower-Housing Thermal Fuse</h2><p>The technician identified a failed thermal fuse on the blower housing as the reason this dryer would not start. The fuse was replaced. These photographs show the removed and replacement parts, followed by the new fuse mounted on the housing during the repair.</p>${pair(3,4)}<p>The installed-fuse photograph was taken before its wires were reconnected. It is a work-in-progress view, not the final assembled condition. The dryer was fully reassembled before the operational check.</p><p>Lint was also present inside the appliance and was cleaned out. This service record does not establish a separate root cause for the fuse failure, so the visible lint is not presented as proof of what caused it.</p></section>
 <section class="repair-story-section"><h2>Replacing All Five Drum Support Rollers</h2><p>With the drum out, we replaced <strong>all five drum support rollers</strong>: two at the rear and three on the front bulkhead. The photographs show the replacement rollers installed in both locations.</p>${pair(5,6)}<p>The roller replacement was additional work completed during the same visit. The confirmed cause of the original no-start complaint was the thermal fuse, not the rollers.</p></section>
 <section class="repair-story-section"><h2>Replacing the Idler Pulley</h2><p>The idler pulley was also replaced while the drive area was accessible. The old and new assemblies are shown together, followed by the replacement installed beside the motor.</p>${pair(7,8)}<p>This completed the drive-component replacements for the visit: the five drum rollers and the idler pulley. No belt replacement is included in this repair record.</p></section>
 <section class="repair-story-section"><h2>Cleaning the Blower Wheel</h2><p>The blower wheel had visible lint collected between its blades. We removed the lint and cleaned the blower as part of the internal service. The before-and-after photographs show the same area at two stages of the cleaning.</p>${pair(9,10)}</section>
 ${row(11,'Cleaning the Internal Air Duct',[
  'The internal air duct attached to the blower was removed and cleaned. Lint collected inside the duct is visible in the service photograph.',
  'This work concerned the air passage inside the dryer. It should not be confused with cleaning the separate exhaust vent through the home; exterior vent cleaning is not part of the work documented here.'
 ])}
 <section class="repair-story-section"><h2>Cleaning the Felt at Both Ends of the Drum</h2><p>With the drum removed, we cleaned the felt at both ends. These close-ups show the two drum edges during the service, rather than a before-and-after comparison of one edge.</p>${pair(12,13)}<p>The existing felt was cleaned, not replaced. This was part of the broader internal cleaning carried out while the dryer was apart.</p></section>
 ${row(14,'Vacuuming and Cleaning the Cabinet Interior',[
  'The dryer interior was vacuumed, and the accessible components were cleaned. The cabinet base and the areas around the motor, blower and internal duct received attention while the drum was out.',
  'The photograph shows the cleaned interior before final reassembly. This made the service more comprehensive than replacing the failed fuse alone.'
 ])}
 ${row(15,'Reassembling the Dryer',[
  'After the component replacements and cleaning, the drum and front assembly were put back in place and the dryer was reassembled.',
  'This photograph captures the assembly process with the front still open. The completed machine is shown in the next image during the final check.'
 ])}
 ${row(16,'Final Test: The Dryer Started and Worked Properly',[
  'Once reassembled, the Whirlpool dryer was powered on and tested. It started and worked properly, resolving the homeowner\'s original complaint.',
  'The completed work included a new thermal fuse, five drum support rollers and an idler pulley, plus cleaning of the cabinet, blower, internal air duct and felt at both ends of the drum.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Carmel Dryer Repair</h2><h3>Why would this dryer not start even though power was available?</h3><p>On this WED8500DC4, the outlet, terminal supply and cord checked out. The technician found a blown thermal fuse on the blower housing and replaced it.</p><h3>How many drum rollers were replaced?</h3><p>All five were replaced: two rear rollers and three front rollers. The idler pulley was replaced as well.</p><h3>Was the drum felt replaced?</h3><p>No. The felt at both ends of the drum was cleaned. The blower, internal air duct and cabinet interior were also cleaned.</p><h3>Did the repair restore operation?</h3><p>Yes. After reassembly, the dryer was turned on and tested, and it operated properly.</p></section>
 <section class="repair-story-section"><h2>Whirlpool Dryer Repair in Carmel, Indiana</h2><p>If your dryer will not start, contact Alex Appliance Repair for <a href="/carmel/dryer-repair-services.html">dryer repair in Carmel</a>. Describe the symptom and share the model number when available so the service request identifies the appliance correctly.</p><p>Explore our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/carmel.html">Carmel service coverage</a> and more <a href="/recent-work.html">repair stories with original service photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Carmel</a></section>
 </article>`;
}
