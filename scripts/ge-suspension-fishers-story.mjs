const base='images/repair-cases/ge-suspension-fishers/';
export const geSuspensionStory={
 slug:'fishers-ge-wcsr4170g6ww-washer-suspension-rods-replacement',
 title:'GE Washer Banging During Spin: Suspension Rod Replacement',
 headline:'GE WCSR4170G6WW Washer Suspension Rod Replacement in Fishers, Indiana',
 cardTitle:'GE Washer Banging During Spin in Fishers: Suspension Rod Replacement',
 seoTitle:'GE Washer Suspension Rod Repair in Fishers, IN',
 description:'GE WCSR4170G6WW washer banging during spin in Fishers, IN. See the diagnosis, suspension rod replacement and original service photos from Alex Appliance Repair.',
 city:'fishers',appliance:'washer',published:'2026-10-28',modified:'2026-10-28',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Fishers homeowner reported loud banging as the washer tub struck the cabinet during spin. On-site diagnosis identified suspension rods requiring replacement. This GE washer repair story documents the appliance, the suspension work and reassembly with original service photographs.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'GE top-load washing machine'},
  {label:'Model',value:'WCSR4170G6WW'},
  {label:'Complaint',value:'Tub striking the cabinet during spin'},
  {label:'Diagnosis',value:'Suspension rods required replacement'},
  {label:'Repair',value:'Suspension rod replacement and reassembly'}
 ],
 overviewImage:{src:base+'suspension-diagram.webp',width:2250,height:3218,caption:'GE WCSR4170G6WW washer suspension diagram with rod assemblies highlighted'},
 photos:[
  ['washer',1200,1600,'GE top-load washer at the Fishers, Indiana service visit'],
  ['model-label',255,40,'Original GE washer model label showing WCSR4170G6WW'],
  ['open-cabinet',1200,1600,'GE washer with the front panel removed to access the tub suspension'],
  ['suspension-detail',1200,1600,'Close-up of an installed suspension rod and its lower support mounting'],
  ['installed-suspension',1200,1600,'Installed suspension assembly beside the GE washer tub'],
  ['assembled-washer',1200,1600,'GE washer reassembled following suspension rod replacement in Fishers']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function geSuspensionArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Loud Banging During the Spin Cycle',[
  'A homeowner in <strong>Fishers, Indiana</strong>, contacted Alex Appliance Repair because their GE washing machine was making a loud banging sound during spin. The customer described the tub moving far enough to strike the sides of the washer cabinet. This was the specific complaint that prompted the service visit.',
  'We visited the home and diagnosed the washer. The findings pointed to suspension rods that required replacement. The photographs in this story follow that repair, from the assembled appliance and model identification to access inside the cabinet and the installed suspension assemblies.'
 ])}
 ${row(1,'GE Washer Model',[
  'The appliance label confirms the model as <strong>GE WCSR4170G6WW</strong>. The crop shown here is taken from the original service photograph. It isolates the model-number area so the identification is readable without publishing the serial number.',
  'When arranging service for a noisy washer, share the appliance model and explain when the noise occurs. In this case, the important detail was that the banging happened during spin and involved the tub contacting the cabinet. Those details help describe the problem, but the repair decision still depends on inspecting the individual machine.'
 ])}
 ${row(2,'Diagnosis and Access to the Tub Suspension',[
  'On-site diagnosis identified suspension rods requiring replacement. Removing the front panel provided access to the tub and suspension area. The open-cabinet photograph shows the relationship between the large outer tub, the surrounding cabinet and the rod assemblies supporting the suspended mechanism.',
  'This article documents the findings from this particular service visit. A washer making a similar sound is not automatically a suspension-rod repair. Describing the symptom accurately and inspecting the appliance are important before deciding which components need attention. Here, the diagnosed suspension problem was addressed by replacing the rods.'
 ])}
 <section class="repair-story-section"><h2>Suspension Rod Replacement</h2>
 <p>The suspension rods were replaced as part of the repair. The following photographs show an installed assembly in close-up and its position beside the washer tub. The close-up makes the lower mounting area visible, while the wider view places the component in context inside the cabinet.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>These are photographs from the actual Fishers service visit, not just catalog illustrations. The highlighted diagram in the Visit Overview provides a separate view of the suspension layout. Together, the diagram and service photos explain which part of the washer was serviced without requiring the homeowner to identify or order components.</p></section>
 ${row(5,'The Washer After Reassembly',[
  'After the suspension work, the washer was reassembled. The photograph shows the machine with its front panel back in place. This closes the visual sequence from the original noise complaint through access to the suspension and installation of the replacement assemblies.',
  'The documented scope of this visit was a <strong>GE washer suspension rod replacement in Fishers</strong>. Keeping a record of the appliance model, reported symptom and work performed gives the homeowner a useful reference for future service. The assembled-machine photograph records the finished exterior; it is not a measurement of vibration or operating sound.'
 ])}
 <section class="repair-story-section"><h2>Questions About This GE Washer Repair</h2>
 <h3>What problem did the customer report?</h3><p>The tub was striking the washer cabinet during spin and making a loud banging sound.</p>
 <h3>What was replaced?</h3><p>The diagnosis identified suspension rods requiring replacement, and the repair addressed those suspension assemblies.</p>
 <h3>Does banging during spin always mean the rods need replacement?</h3><p>No. This is a record of one diagnosed repair, not a diagnosis for every washer with a similar noise. An inspection is needed to determine the appropriate work for another machine.</p>
 <h3>Do you provide washer repair in Fishers?</h3><p>Yes. Alex Appliance Repair provides <a href="/fishers/washer-repair-services.html">washer repair in Fishers, Indiana</a>. Contact us with the model and a description of the problem to discuss a service visit.</p></section>
 <section class="repair-story-section"><h2>GE Washing Machine Repair in Fishers, Indiana</h2>
 <p>If your GE washer bangs during spin or the tub hits the cabinet, describe those symptoms when contacting us. Include the model number when available so we can discuss the appliance and arrange the next step.</p>
 <p>Explore our <a href="/washer-repair.html">washing machine repair services</a>, <a href="/fishers.html">Fishers service coverage</a> and <a href="/recent-work.html">recent repair stories</a> for more examples of local appliance service.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your washer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Fishers</a></section>
 </article>`;
}
