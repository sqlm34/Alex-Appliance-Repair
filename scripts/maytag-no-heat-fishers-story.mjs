const base='images/repair-cases/maytag-no-heat-fishers/';
export const maytagHeatStory={
 slug:'fishers-maytag-med5630hw2-dryer-not-heating-element-replacement',
 title:'Maytag Dryer Not Heating: Heating Element Replacement',
 headline:'Maytag MED5630HW2 Dryer Not Heating in Fishers, Indiana',
 cardTitle:'Stacked Maytag Dryer Not Heating in Fishers',
 seoTitle:'Maytag MED5630HW2 Not Heating Repair | Fishers, IN',
 description:'Maytag MED5630HW2 dryer not heating in Fishers, IN. See the heating element, four drum rollers and idler pulley replacement, interior cleaning and final test.',
 city:'fishers',appliance:'dryer',published:'2026-10-22',modified:'2026-10-22',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A stacked Maytag MED5630HW2 dryer in Fishers stopped heating. We replaced the burned-out heating element, four drum support rollers and the belt idler pulley, vacuumed the interior, then reassembled and tested the dryer. Heating was restored.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Maytag electric dryer, stacked above washer'},
  {label:'Model',value:'MED5630HW2'},
  {label:'Complaint',value:'Dryer not heating'},
  {label:'Diagnosis',value:'Burned-out heating element'},
  {label:'Parts replaced',value:'Heating element, four drum rollers and idler pulley'},
  {label:'Cleaning',value:'Dryer interior vacuumed'},
  {label:'Result',value:'Reassembled and tested; heating restored'}
 ],
 overviewImages:[
  ['drum-heater-diagram',1373,1800,'Maytag MED5630HW2 drum and heater diagram highlighting the heating element and support rollers'],
  ['cabinet-drive-diagram',1449,1800,'Maytag MED5630HW2 cabinet and drive diagram highlighting the belt idler pulley']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 photos:[
  ['stacked-dryer',1200,1600,'Maytag dryer stacked above its matching washer at the Fishers service visit'],
  ['model-label',500,80,'Original Maytag dryer label cropped to show model MED5630HW2'],
  ['unstacked-access',1200,1600,'Maytag dryer removed from the stacked installation to provide service access'],
  ['cabinet-before-cleaning',1200,1600,'Dryer cabinet with drum removed, showing lint before interior cleaning'],
  ['broken-heating-coil',1200,1600,'Break in the removed heating element coil from the Maytag dryer'],
  ['replacement-heating-element',1200,1600,'Replacement heating element inside the dryer heater housing'],
  ['rear-rollers-before',1200,1600,'Rear drum support rollers and lint inside the dryer before service'],
  ['new-rear-rollers',1600,1200,'Two replacement rear drum support rollers installed on the cleaned bulkhead'],
  ['old-and-new-idler',1200,1600,'Removed belt idler assembly beside the replacement assembly'],
  ['installed-idler',1600,1200,'Replacement idler pulley installed beside the dryer drive motor'],
  ['internal-duct-lint',1200,1600,'Lint inside the removed internal air duct during the dryer service'],
  ['cabinet-after-cleaning',1200,1600,'Maytag dryer interior after vacuuming, before the drum was reinstalled'],
  ['drum-reinstalled',1200,1600,'Drum and front support reinstalled during reassembly'],
  ['completed-test',1200,1600,'Reassembled Maytag dryer back above the washer during the final test']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function maytagHeatArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Stacked Maytag Dryer With No Heat',[
  'A homeowner in <strong>Fishers, Indiana</strong>, contacted Alex Appliance Repair because their Maytag dryer was not heating. The electric dryer was installed above the matching washer in a stacked laundry setup.',
  'The repair addressed a burned-out heating element. During the same visit, we also replaced four drum support rollers and the belt idler pulley, and vacuumed the interior. After reassembly and testing, the dryer heated again.'
 ])}
 ${row(1,'Identifying the Dryer: Maytag MED5630HW2',[
  'The original appliance label identifies the dryer as <strong>Maytag MED5630HW2</strong>. This close-up is cropped from the service photograph to show the brand and full model number.',
  'The two parts diagrams in the visit overview show the heater, drum supports and drive components involved in this repair. They accompany the actual service photographs below.'
 ])}
 ${row(2,'Accessing the Stacked Dryer for Service',[
  'The dryer was taken down from above the washer and moved into position for service. The photographs document the stacked installation, the access needed for the repair and the machine as it was opened.',
  'After opening the cabinet, the drum was removed to access the heater and the drum-support and drive components. The dryer was returned to its stacked position after the work was completed.'
 ])}
 ${row(3,'Inspection With the Drum Removed',[
  'With the drum out, the technician could reach the heating assembly, rollers and idler pulley. Lint and dust were visible on the cabinet base and around the internal components.',
  'This image records the condition before vacuuming. The lint was removed as part of the service, but its presence alone does not establish why the heating element failed.'
 ])}
 <section class="repair-story-section"><h2>The No-Heat Fault: A Burned-Out Heating Element</h2><p>The diagnosis on this dryer was a <strong>burned-out heating element</strong>. The close-up of the removed part shows a break in the coil. We replaced the failed element; the second photograph shows the replacement inside the heater housing.</p>${pair(4,5)}<p>The heating element was the component responsible for the confirmed no-heat fault in this case. The roller and idler replacements were additional work performed while the dryer was apart, not the explanation for the missing heat.</p></section>
 <section class="repair-story-section"><h2>Four New Drum Support Rollers: Two Rear and Two Front</h2><p>We replaced <strong>all four drum support rollers: two at the rear and two at the front</strong>. The photographs below show the rear support area before the work and the two replacement rear rollers installed afterward.</p>${pair(6,7)}<p>The drum-and-heater diagram in the overview shows both front and rear support locations. The rear photographs illustrate part of the completed roller replacement, rather than showing all four rollers in a single view.</p></section>
 <section class="repair-story-section"><h2>Replacing the Belt Idler Pulley</h2><p>The belt idler pulley assembly was also replaced. One photograph shows the removed assembly beside its replacement; the next shows the replacement installed next to the motor.</p>${pair(8,9)}<p>This service included the idler pulley, not a reported belt replacement. Together with the four new drum rollers, it completed the drive and support component work during this visit.</p></section>
 <section class="repair-story-section"><h2>Vacuuming Lint From the Dryer Interior</h2><p>We vacuumed the dryer interior while the drum and cabinet panels were removed. The service photographs show lint in the internal duct and the cleaned cabinet before reassembly.</p>${pair(10,11)}<p>This was internal dryer cleaning. The repair record does not include cleaning the home's separate exhaust vent, and the photographs should not be taken as a claim that an exterior vent-cleaning service was performed.</p></section>
 ${row(12,'Reassembly After the Component Replacements',[
  'After the heating element, four rollers and idler pulley had been replaced and the interior vacuumed, the drum was put back into position and the dryer was reassembled.',
  'This photograph shows an intermediate stage with the outer front still off. The machine was fully assembled before its final operating test.'
 ])}
 ${row(13,'Final Test: Heating Restored',[
  'The completed dryer was returned above the washer and tested. It worked properly and heat was restored, resolving the original no-heat complaint.',
  'The finished service included heating element replacement, four drum support rollers, a belt idler pulley and interior vacuuming. The original photographs document the installation, failed coil, replacement components and reassembly.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Maytag Dryer Repair</h2><h3>Why was this MED5630HW2 dryer not heating?</h3><p>The technician diagnosed a burned-out heating element. The removed coil had a visible break, and heat was restored after replacement and reassembly.</p><h3>Were all four drum rollers replaced?</h3><p>Yes. Two rear and two front drum support rollers were replaced, along with the belt idler pulley.</p><h3>Did the stacked installation affect access?</h3><p>Yes. This dryer was removed from above the washer for service and returned to its stacked position afterward.</p><h3>Does every Maytag dryer with no heat need a new element?</h3><p>This article records one confirmed diagnosis. A similar symptom on another dryer needs its own diagnosis before parts are selected.</p></section>
 <section class="repair-story-section"><h2>Maytag Dryer Repair in Fishers, Indiana</h2><p>For a dryer that is not heating, contact Alex Appliance Repair for <a href="/fishers/dryer-repair-services.html">dryer repair in Fishers</a>. Share the model number, describe the symptom and mention whether the dryer is stacked so the installation is clear when arranging service.</p><p>See our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/fishers.html">Fishers service coverage</a> and more <a href="/recent-work.html">repair stories with original service photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your appliance.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Fishers</a></section>
 </article>`;
}
