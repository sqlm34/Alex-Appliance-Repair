const base='images/repair-cases/samsung-dv400-fishers/';
export const fishersDryerStory={
 slug:'fishers-samsung-dv400ewhdwr-dryer-not-starting-idler-pulley-repair',
 title:'Samsung Dryer Not Starting Repair',
 headline:'Samsung Dryer Powers On but Will Not Start in Fishers: Idler Pulley Repair',
 cardTitle:'Samsung Dryer Will Not Start: Idler Pulley Repair in Fishers',
 seoTitle:'Samsung Dryer Not Starting in Fishers | Idler Pulley Repair',
 description:'Samsung DV400EWHDWR/AA dryer powers on but will not start in Fishers, IN. See idler pulley, four roller and heating element replacement with before-and-after photos.',
 city:'fishers',appliance:'dryer',published:'2026-10-13',modified:'2026-10-13',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Fishers homeowner reported that the Samsung dryer control panel worked, but pressing Start did not start the machine. We found a damaged idler pulley and heavy internal lint buildup. The repair included a new idler pulley, all four drum support rollers, a heating element and thorough interior cleaning. After reassembly and testing, the dryer was working again.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Samsung electric dryer'},
  {label:'Model',value:'DV400EWHDWR/AA'},
  {label:'Customer concern',value:'Control panel works; dryer does not start'},
  {label:'Findings',value:'Damaged idler pulley; heavy internal lint buildup'},
  {label:'Parts replaced',value:'Idler pulley, all four drum support rollers and heating element'},
  {label:'Additional work',value:'Thorough vacuuming and interior cleaning'},
  {label:'Result',value:'Reassembled, tested and working again'}
 ],
 photos:[
  ['dryer-before',1200,1600,'Samsung dryer before service at the Fishers home'],
  ['model-label',380,45,'Original model-label crop identifying Samsung DV400EWHDWR/AA'],
  ['idler-diagram',2097,1614,'Idler pulley assembly diagram with the pulley highlighted and an enlarged reference view'],
  ['interior-before',1200,1600,'Heavy lint buildup throughout the Samsung dryer cabinet before cleaning'],
  ['damaged-idler-pulley',1200,1600,'Damaged white idler pulley found during disassembly'],
  ['idler-old-and-new',1200,1600,'Removed damaged idler pulley assembly beside its replacement'],
  ['idler-installed',1600,1200,'Replacement idler pulley installed beside the motor before belt reassembly'],
  ['roller-diagram',2098,1551,'Drum support roller diagram with front and rear roller locations highlighted'],
  ['roller-before',1200,1600,'Original drum support roller covered in lint before replacement'],
  ['roller-old-and-new',1200,1600,'Removed drum support roller held beside a replacement roller installed on the support panel'],
  ['rear-rollers-installed',1200,1600,'Replacement rear drum support roller installed during the repair'],
  ['heater-diagram',2097,1614,'Heater assembly diagram with the heating element highlighted'],
  ['heater-before',1200,1600,'Lint accumulation inside the heater housing before service'],
  ['replacement-heating-element',1200,1600,'Replacement heating element in the opened heater housing during service'],
  ['blower-before',1200,1600,'Blower wheel with lint deposits before cleaning'],
  ['blower-cleaned',1200,1600,'Blower wheel after lint removal'],
  ['lint-duct-before',1600,1200,'Removed lint duct with accumulated lint inside before cleaning'],
  ['lint-duct-cleaned',1200,1600,'The internal lint duct after cleaning and before reinstallation'],
  ['interior-cleaned',1200,1600,'Cleaned dryer cabinet with replacement rear rollers and the heater removed during service'],
  ['reassembly',1200,1600,'Drum back in place during reassembly, before the front exterior panel was installed']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function fishersDryerArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];
  const max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==2).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(2,'The Idler Pulley Behind This Repair',[
  'The highlighted diagram identifies the <strong>idler pulley assembly</strong> near the dryer motor. The enlarged reference view makes it easier to recognize the white pulley and metal arm in the service photographs below.',
  'At this <strong>Fishers, Indiana</strong> service call, the Samsung dryer powered on at the control panel but would not start. Disassembly revealed a damaged idler pulley and extensive lint accumulation inside the cabinet. The diagrams explain component locations; the photographs document the actual machine and repair.'
 ])}
 ${row(0,'The Complaint: Lights On, but Nothing Happens at Start',[
  'The homeowner could turn on the control panel, but pressing <strong>Start</strong> did not start the dryer. This was not simply a complaint about clothes taking longer to dry: the machine was not beginning its cycle.',
  'A working display does not establish that the entire appliance is ready to run. We opened the dryer to investigate the reported symptom and assess the internal components. The exterior photograph shows the appliance before service.'
 ])}
 ${row(1,'Confirming the Samsung Model',[
  'The original appliance label identifies the dryer as <strong>DV400EWHDWR/AA</strong>. This unretouched crop retains the model line without publishing the serial number.',
  'When arranging dryer repair in Fishers, send the complete model number together with the symptom. A description such as "the panel lights up, but Start does nothing" is more informative than saying only that the dryer is broken.'
 ])}
 ${row(3,'What We Found Inside the Cabinet',[
  'Removing the drum exposed substantial lint buildup across the cabinet floor, around the motor and rollers, and near the heater housing. The blower wheel and internal lint duct also contained visible deposits.',
  'The repair therefore involved both component replacement and a thorough internal cleanup. These pictures document the dryer interior; they are not evidence of cleaning the separate exhaust duct inside the home.'
 ])}
 ${row(4,'A Visibly Damaged Idler Pulley',[
  'The close-up shows the damaged white idler pulley in place. The removed assembly and replacement are shown side by side below, making the broken edge of the old pulley easy to compare with the intact replacement.',
  'The idler pulley was replaced as part of resolving this no-start service call. The photographs do not establish a separate motor, control-board or safety-switch failure, and this account does not attribute unverified electrical faults to the machine.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Idler Pulley Assembly</h2><p>We removed the damaged assembly and installed its replacement beside the motor. The installed-part photograph records an intermediate stage, before the drive belt and drum were fully reassembled. It is not a photograph of the dryer running with its cabinet open.</p>${pair(5,6)}</section>
 ${row(7,'Replacing All Four Drum Support Rollers',[
  'The roller diagram highlights the front and rear support locations. For this repair, we replaced <strong>all four drum support rollers</strong>, not just the roller most visible in one photograph.',
  'The photographs below show the lint-covered original roller, an old-and-new comparison, and a replacement roller mounted at the rear. The rollers and idler pulley are separate parts of the drum support and drive system.'
 ])}
 <section class="repair-story-section"><h2>Original Rollers and Replacement Parts</h2><p>The old roller is shown beside a newly installed roller so the service work can be inspected directly. All four rollers were included in the repair; the images illustrate selected locations rather than suggesting that every roller had an identical visible defect.</p>${pair(8,9)}</section>
 ${row(10,'The Rear Support After Replacement',[
  'This detail shows a replacement roller secured on the rear support panel. The wider cleaned-cabinet photograph later in the article shows both rear support positions with the drum still removed.',
  'The roller replacement formed part of the documented repair. We do not claim that each replaced component independently caused the original failure to start.'
 ])}
 ${row(11,'Heating Element Replacement',[
  'The heater diagram identifies the heating element inside its housing. We also <strong>replaced the heating element</strong> during this service visit.',
  'The before photograph shows lint inside the heater housing, while the replacement photograph shows the element during installation. A heater replacement and a no-start diagnosis are distinct parts of this account: the photos alone do not prove that the old element caused the failure to start.'
 ])}
 <section class="repair-story-section"><h2>Inside the Heater Housing</h2><p>The heater area was included in the internal cleaning and component work. The replacement element is shown in the open housing before the assembly was closed and the dryer reassembled.</p>${pair(12,13)}</section>
 <section class="repair-story-section"><h2>Blower Cleaning: Before and After</h2><p>The first photograph shows lint attached to the blower wheel. The second shows the same area after cleaning. Removing the accumulated material was part of the thorough vacuuming and cleanup carried out while the appliance was apart.</p>${pair(14,15)}</section>
 <section class="repair-story-section"><h2>Clearing the Internal Lint Duct</h2><p>The removed duct contained a substantial layer of lint. The after photograph shows the open channel following cleaning, before reinstallation. This is the internal duct inside the dryer, separate from the home's external vent run.</p>${pair(16,17)}</section>
 ${row(18,'The Cabinet After Vacuuming and Cleaning',[
  'With the drum removed, we thoroughly vacuumed and cleaned the exposed interior. Compare this photograph with the earlier full-cabinet view: the accumulated lint has been removed, and the replacement rear rollers are visible.',
  'This image was taken during the work, with the heater assembly still out of the cabinet. The remaining parts were then reinstalled as the repair progressed.'
 ])}
 ${row(19,'Reassembly, Testing and the Result',[
  'After replacing the <strong>idler pulley, all four drum support rollers and heating element</strong>, we reassembled the dryer. This photograph shows the drum back in place during that process, before the exterior front panel was fitted.',
  'The assembled dryer was switched on and tested. It was <strong>working again after the repair</strong>, resolving the customer\'s original concern that the panel operated but the machine would not start.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Samsung Dryer Repair</h2>
 <h3>Does a lit control panel rule out a dryer problem?</h3><p>No. In this case the controls powered on, yet the dryer would not begin a cycle. The precise symptom matters when describing a problem to a technician.</p>
 <h3>Was only the idler pulley replaced?</h3><p>No. This visit included the idler pulley, all four drum support rollers, the heating element, and thorough internal cleaning. That is the work performed on this appliance, not a standard parts list for every no-start complaint.</p>
 <h3>Was the home's dryer vent cleaned?</h3><p>This article documents cleaning inside the dryer, including the blower and internal lint duct. It does not describe cleaning the home's external exhaust duct.</p>
 <h3>Can the photos identify the part my dryer needs?</h3><p>They illustrate this particular repair. Share your full model number and symptoms when booking so the appliance can be evaluated before a replacement part is recommended.</p></section>
 <section class="repair-story-section"><h2>Book Samsung Dryer Repair in Fishers, Indiana</h2><p>Does your Samsung dryer light up but fail to start? Alex Appliance Repair provides <a href="/fishers/dryer-repair-services.html">dryer repair in Fishers</a>. Tell us what happens when you press Start, whether the drum moves, and the full model shown on the appliance label.</p><p>Explore our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair</a> and <a href="/fishers.html">Fishers service coverage</a>, or browse <a href="/recent-work.html">more documented repair visits</a>. Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC.</p><p><a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair</a></section>
 </article>`;
}
