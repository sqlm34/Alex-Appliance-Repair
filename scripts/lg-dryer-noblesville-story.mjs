const base='images/repair-cases/lg-dryer-noblesville/';
export const lgNoiseStory={
 slug:'noblesville-lg-dlex4200b-dryer-squeaking-rollers-idler-pulley',
 title:'LG Dryer Squeaking Noise Repair',
 headline:'LG DLEX4200B Dryer Squeaking Repair in Noblesville',
 cardTitle:'LG Dryer Squeaking When Hot: Rollers and Idler Pulley Repair',
 seoTitle:'LG Dryer Squeaking Repair in Noblesville | Alex Repair',
 description:'LG DLEX4200B dryer squeaking when hot in Noblesville, IN. Two rear drum rollers and the idler pulley replaced, cabinet cleaned and dryer tested.',
 city:'noblesville',appliance:'dryer',published:'2026-10-04',modified:'2026-10-04',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Noblesville homeowner reported a high-pitched squeak as an LG dryer warmed up and the drum turned. We replaced two rear support rollers and the idler pulley, cleaned inside the cabinet, then reassembled and tested the dryer.',
 overviewEntries:[
  {label:'Location',value:'Noblesville, Indiana'},
  {label:'Appliance',value:'LG electric dryer'},
  {label:'Model',value:'DLEX4200B, verified from the original label'},
  {label:'Complaint',value:'Squeaking during drum rotation, especially when hot'},
  {label:'Parts replaced',value:'Two rear drum support rollers and the idler pulley'},
  {label:'Additional work',value:'Interior vacuuming and cleaning'},
  {label:'Completion',value:'Reassembled, powered on and checked'}
 ],
 photos:[
  ['lg-dryer-service-visit',1200,1600,'LG DLEX4200B dryer at the Noblesville service visit for squeaking noise'],
  ['dlex4200b-model-label',204,40,'Original model-label crop: LG DLEX4200B'],
  ['drum-removed',1200,1600,'Drum and front components removed to access the LG dryer support and drive system'],
  ['rear-rollers-and-cabinet',1200,1600,'Open dryer cabinet showing the two rear drum support rollers and interior components'],
  ['rear-support-roller-one',1400,1050,'Close-up of one replacement rear drum support roller in the LG dryer'],
  ['rear-support-roller-two',1400,1050,'Second replacement rear drum support roller on the back drum support'],
  ['idler-pulley-and-motor',1400,1050,'Replacement idler pulley beside the LG dryer drive motor'],
  ['dryer-reassembled-test',1200,1600,'LG dryer reassembled and powered on for the post-repair check'],
  ['idler-pulley-reference',565,450,'Supplied reference image of idler pulley assembly 4561EL3002A'],
  ['roller-parts-reference',1200,1600,'Supplied roller parts reference labeled 4581EL2002L; two rear rollers were replaced on this job']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'drum-support-parts-diagram.webp',width:1122,height:1600,caption:'Reference diagram of the LG dryer drum supports and idler pulley location'}
};

export function lgNoiseArticle(c,image,esc){
 const figure=i=>`<figure class="lg-fan-photo" style="--photo-max:${Math.min(c.photos[i].width,520*c.photos[i].width/c.photos[i].height)}px"><a class="gallery-item" href="/${c.photos[i].src}">${image(c.photos[i],i!==0).replace('<img ',`<img style="aspect-ratio:${c.photos[i].width}/${c.photos[i].height}" `)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Squeak That Appeared as the Dryer Warmed Up',[
 'The customer in <strong>Noblesville, Indiana</strong> described a high-pitched squeaking noise while the drum was turning. It was especially noticeable once the dryer became hot during operation. This was a mechanical noise complaint, rather than a report that the dryer would not heat.',
 'We checked the LG dryer and opened the cabinet to inspect the drum support and belt-tensioning components. The completed repair included two rear support rollers, a new idler pulley and a thorough interior cleaning.'
 ])}
 ${row(1,'Confirmed Model: LG DLEX4200B',[
 'The model shown on the appliance label is <strong>DLEX4200B</strong>. The accompanying image is an unretouched crop of the actual model line photographed during the service visit.',
 'Keeping the model with the repair record helps identify the appliance accurately. Similar-looking LG dryers can use different parts, so appearance alone is not enough when selecting replacements.'
 ])}
 ${row(2,'Accessing the Drum Support and Drive Components',[
 'We removed the necessary cabinet components and the drum to reach the rear rollers and the idler pulley. The photograph shows the drum and removed front components during disassembly.',
 'A squeak that becomes noticeable when warm is useful information for diagnosis, but it does not identify one failed part by itself. <a href="https://www.lg.com/us/support/help-library/lg-dryer-noise-from-the-dryer--20154774023458">LG\'s dryer noise guidance</a> notes that drum-support and belt wear can be associated with squealing sounds. Inspection is needed to decide what a particular dryer requires.'
 ])}
 ${row(3,'Replacing Two Rear Drum Support Rollers',[
 'On this service call, we replaced <strong>both rear support rollers</strong> mounted on the back drum support. These rollers support the rear of the drum as it rotates. The open-cabinet photograph shows their positions clearly.',
 'The repair scope was two rear rollers, not every roller in the machine. The front support assembly was removed for access, but the work described here does not include replacing its rollers.'
 ])}
 <section class="repair-story-section"><h2>The Two Replacement Rear Rollers</h2><p>These close-ups document each rear roller after replacement. They show the components from the actual visit, separate from the parts-reference images below.</p><div class="case-photo-grid lg-fan-pair">${figure(4)}${figure(5)}</div></section>
 ${row(6,'Installing a New Idler Pulley',[
 'We also replaced the <strong>idler pulley</strong>, the pulley that maintains tension on the drum drive belt. It is a separate component from the drum support rollers and sits near the drive motor.',
 'The photograph shows the replacement pulley and its mounting area while the dryer was open. The repair involved the pulley, not replacement of the drive motor or heating assembly.'
 ])}
 <section class="repair-story-section"><h2>Roller and Idler Pulley Part References</h2><p>The supplied references identify roller parts labeled <strong>4581EL2002L</strong> and an idler pulley assembly referenced as <strong>4561EL3002A</strong>. These images are for identification; the package photograph does not represent the number of rollers installed on this job. Two rear rollers were replaced. Replacement parts should be matched to the full appliance identification before ordering.</p><div class="case-photo-grid lg-fan-pair">${figure(8)}${figure(9)}</div></section>
 <section class="repair-story-section"><h2>Vacuuming and Cleaning Inside the Dryer</h2><p>While the cabinet was open, we vacuumed and cleaned the dryer interior before reassembly. Removing the drum provided access to areas that are not reachable through the normal lint-filter opening.</p><p>This was internal cabinet cleaning as part of the repair. It should not be confused with cleaning the entire household exhaust duct, which was not part of the work described for this visit.</p></section>
 ${row(7,'Reassembly and the Final Operating Check',[
 'After replacing the two rear rollers and the idler pulley and cleaning the interior, we reassembled the dryer, powered it on and checked its operation. The final photograph shows the assembled LG dryer with the controls illuminated.',
 'The final operating check followed the complete repair sequence: roller replacement, pulley replacement, interior cleaning and reassembly. Checking the dryer after it was put back together completed the service visit.'
 ])}
 <section class="repair-story-section"><h2>Questions About a Dryer That Squeaks When Hot</h2><h3>Does squeaking during heating mean the heater is bad?</h3><p>Not necessarily. The drum and drive components are also operating during a heated cycle. In this Noblesville repair, the work focused on the rear rollers and idler pulley, not the heater.</p><h3>Are the support rollers and idler pulley the same part?</h3><p>No. The rollers support the rotating drum; the idler pulley keeps tension on its drive belt. Both were included in this repair.</p><h3>What information helps when booking a noise inspection?</h3><p>Share the model number, whether the noise starts immediately or only after warm-up, and whether it changes as the drum turns. A short recording of the sound can help describe the complaint, but it does not replace an inspection.</p></section>
 <section class="repair-story-section"><h2>LG Dryer Repair in Noblesville, Indiana</h2><p>For squeaking, squealing or another change in dryer operation, Alex Appliance Repair provides <a href="/dryer-repair.html">dryer repair service</a> in <a href="/noblesville.html">Noblesville</a>. We inspect the appliance and explain the recommended work before proceeding with an approved repair.</p><p>See our <a href="/brands.html">serviced appliance brands</a> and more <a href="/recent-work.html">repair stories with service photographs</a>. Alex Appliance Repair is an independent service operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair</a></section>
 </article>`;
}
