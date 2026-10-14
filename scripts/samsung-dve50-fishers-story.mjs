const base='images/repair-cases/samsung-dve50-fishers/';
export const samsungHeatStory={
 slug:'fishers-samsung-dve50r5200w-dryer-not-heating-element-replacement',
 title:'Samsung Dryer Heating Element Replacement',
 headline:'Samsung DVE50R5200W/A3 Not Heating in Fishers: Heating Element and Idler Pulley Replacement',
 cardTitle:'Samsung Dryer Not Heating in Fishers',
 seoTitle:'Samsung Dryer Not Heating in Fishers | DVE50R5200W/A3',
 description:'Samsung DVE50R5200W/A3 dryer repair in Fishers, IN: burned-out heating element and worn idler pulley replaced, interior cleaned, and heating restored.',
 city:'fishers',appliance:'dryer',published:'2026-10-14',modified:'2026-10-14',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Samsung dryer in Fishers was running without heat. We diagnosed a burned-out heating element, replaced it and a worn idler pulley, cleaned the interior and exterior vent grille, and confirmed heating after reassembly. The existing belt was in good condition and remained in service.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Samsung electric dryer'},
  {label:'Model',value:'DVE50R5200W/A3'},
  {label:'Customer concern',value:'No hot air; dryer not heating'},
  {label:'Diagnosis',value:'Burned-out heating element; wear on idler pulley'},
  {label:'Repair',value:'Heating element and idler pulley replacement'},
  {label:'Cleaning',value:'Internal surfaces, components and exterior vent grille'},
  {label:'Result',value:'Reassembled and tested; heating restored'}
 ],
 photos:[
  ['samsung-dryer',1200,1600,'Samsung DVE50R5200W/A3 dryer at the Fishers service visit'],
  ['model-label',400,180,'Original Samsung dryer model label showing DVE50R5200W/A3'],
  ['heater-diagram',1600,1250,'Samsung dryer heater assembly diagram with the heating element highlighted'],
  ['drive-diagram',1600,1214,'Samsung dryer drive assembly diagram highlighting the idler pulley location'],
  ['front-panel-removed',1200,1600,'Samsung dryer with the front panel removed for diagnostic access'],
  ['cabinet-before-cleaning',1200,1600,'Lint and dust inside the dryer cabinet before cleaning'],
  ['heater-diagnostic-access',1200,1600,'Heater housing and thermal components exposed during diagnosis'],
  ['broken-heating-coil',1200,1600,'Burned-out heating element removed from the dryer with a visibly broken coil'],
  ['worn-idler-pulley',1200,1600,'Removed idler pulley showing wear and accumulated debris'],
  ['replacement-idler-installed',1600,1200,'Replacement idler pulley installed beside the dryer motor'],
  ['lint-duct-before-cleaning',1200,1600,'Removed internal lint duct before cleaning'],
  ['lint-duct-after-cleaning',1200,1600,'Internal lint duct opening after cleaning'],
  ['cabinet-after-cleaning',1600,1200,'Cleaned dryer cabinet with the replacement idler pulley in place'],
  ['replacement-heating-element',1200,1600,'Replacement heating element fitted into the heater housing'],
  ['heater-housing-reassembled',1200,1600,'Replacement heating coil inside the reassembled heater housing']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function samsungHeatArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==2).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(2,'The Heating Element Behind This No-Heat Repair',[
  'This <strong>Samsung dryer repair in Fishers, Indiana</strong> started with a straightforward complaint: the dryer was not producing hot air. Diagnosis identified a burned-out heating element. The heater assembly diagram shows the element inside its housing, matching the component documented in the service photographs below.',
  'The repair also included replacement of a worn idler pulley and cleaning inside the appliance. After reassembly and testing, the dryer heated again.'
 ])}
 ${row(0,'The Customer Concern: No Hot Air',[
  'The homeowner contacted Alex Appliance Repair because their Samsung dryer was not heating. We visited the Fishers home, opened the dryer for diagnosis and tested the fuses and heating element.',
  'The failed heating element was the confirmed cause of the no-heat condition in this service visit. We also inspected the accessible drive components while the dryer was open.'
 ])}
 ${row(1,'Confirming the Model: Samsung DVE50R5200W/A3',[
  'The original appliance label identifies the dryer as <strong>Samsung DVE50R5200W/A3</strong>. The photograph here is a crop of the actual label from this machine.',
  'When booking service, send the complete model number and describe the symptom. For this dryer, the complaint was a lack of hot air, and the repair findings were confirmed after opening and testing the appliance.'
 ])}
 <section class="repair-story-section"><h2>Opening the Dryer and Inspecting the Interior</h2><p>The front panel was removed to gain access. With the drum out, the heater housing, motor, idler pulley and cabinet floor were accessible for diagnosis and cleaning. The photographs show the machine at two stages of disassembly, including dust and lint inside the cabinet before cleaning.</p>${pair(4,5)}</section>
 ${row(6,'Testing the Fuses and Heating Element',[
  'We tested the fuses and heating element during diagnosis. The element had burned out and needed replacement. The close-up shows the heater housing and thermal components exposed for service.',
  'The confirmed replacement work on this visit was the heating element and idler pulley. The service record does not include fuse replacement.'
 ])}
 ${row(7,'A Visibly Broken Heating Coil',[
  'The removed heating element shows a visibly broken coil. This photograph documents the damaged component found during the no-heat diagnosis.',
  'The failed element was removed from the housing and replaced. Later photographs show the replacement coil fitted into the housing before the dryer was reassembled and tested.'
 ])}
 ${row(3,'Inspecting the Idler Pulley and Keeping the Good Belt',[
  'The drive assembly diagram highlights the idler pulley location. During inspection, the original pulley showed some wear, so we replaced it while the dryer was disassembled.',
  'The <strong>drive belt was in good condition</strong> and did not need replacement. It was retained for reassembly. The pulley wear was a separate finding; it was not identified as the cause of the heating failure.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Worn Idler Pulley</h2><p>The first photograph shows the removed pulley. The second shows the replacement installed beside the motor. This addresses the wear found during inspection while preserving the belt that was still in good condition.</p>${pair(8,9)}</section>
 <section class="repair-story-section"><h2>Cleaning the Internal Duct and Components</h2><p>With the appliance open, we cleaned the internal surfaces and components. These before-and-after photographs show the removed internal lint duct and its opening after cleaning. Cleaning was part of this repair, alongside replacement of the two worn or failed components.</p>${pair(10,11)}</section>
 ${row(12,'A Clean Cabinet Before Reassembly',[
  'The cabinet floor and accessible internal surfaces were cleaned before the dryer was reassembled. This view shows the cleaned cabinet and replacement idler pulley while the heater assembly was still removed.',
  'We also cleaned the <strong>exterior vent grille</strong>, which was slightly clogged. That work was limited to the outside grille; this visit is not described as a full-length household vent-duct cleaning. The grille buildup was not established as the cause of the burned-out element.'
 ])}
 <section class="repair-story-section"><h2>Installing the Replacement Heating Element</h2><p>The replacement element was fitted into the heater housing, and the housing was reassembled. The photographs show the new coil before the cover was closed and inside the assembled housing. We then reassembled the dryer with its existing belt and the replacement idler pulley.</p>${pair(13,14)}</section>
 <section class="repair-story-section"><h2>Final Testing: The Dryer Heated Again</h2><p>After everything was reassembled, we tested the dryer. <strong>Heating was restored</strong>, resolving the customer's complaint about the lack of hot air. The completed work included heating element replacement, idler pulley replacement, internal cleaning and exterior grille cleaning.</p><p>The existing belt remained in service because it was in good condition. No additional parts replacement is claimed in this repair record.</p></section>
 <section class="repair-story-section"><h2>Questions About This Samsung Dryer Repair</h2>
 <h3>Why was this Samsung dryer not heating?</h3><p>Diagnosis found a burned-out heating element. The removed element had a visibly broken coil, and heating returned after replacement and reassembly.</p>
 <h3>Was the drive belt replaced?</h3><p>No. The belt was inspected and found to be in good condition. We replaced the worn idler pulley and retained the belt.</p>
 <h3>Were the fuses checked?</h3><p>Yes. The technician tested the fuses and heating element during diagnosis. Fuse replacement was not part of the reported work.</p>
 <h3>Was the entire household dryer vent cleaned?</h3><p>The internal surfaces and components were cleaned, along with the slightly clogged exterior vent grille. Full-length household duct cleaning was not reported.</p>
 <h3>Does every Samsung dryer without heat need a new element?</h3><p>This article describes one confirmed failure. A similar symptom on another dryer still requires diagnosis before deciding which repair is needed.</p>
 </section>
 <section class="repair-story-section"><h2>Samsung Dryer Repair in Fishers, Indiana</h2><p>If your Samsung dryer is not heating, Alex Appliance Repair provides <a href="/fishers/dryer-repair-services.html">dryer repair in Fishers</a>. Share the model number and symptoms when requesting service. We explain the findings and estimate before approved repair work and check the appliance after repair.</p><p>Learn about our <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair</a>, <a href="/dryer-repair.html">dryer repair services</a> and <a href="/fishers.html">Fishers service area</a>, or browse more <a href="/recent-work.html">documented repair stories</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer problem.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Fishers</a></section>
 </article>`;
}
