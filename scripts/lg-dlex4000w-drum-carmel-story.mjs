const base='images/repair-cases/lg-dlex4000w-drum-carmel/';
export const lgDrumStory={
 slug:'carmel-lg-dlex4000w-dryer-cracked-drum-roller-replacement',
 title:'LG Dryer Cracked Drum and Roller Replacement',
 headline:'LG Dryer Thumping in Carmel: Cracked Drum Repair',
 seoTitle:'LG Dryer Thumping & Cracked Drum Repair | Carmel, IN',
 description:'LG DLEX4000W dryer thumping in Carmel, IN? See a cracked drum repair with four support rollers and an idler pulley replaced. Photos and local booking.',
 city:'carmel',appliance:'dryer',published:'2026-11-17',modified:'2026-11-17',editorialStylesheet:'lg-fan-noblesville',
 summary:'A customer in Carmel, Indiana, reported an unusual drum noise and a bouncing motion as their LG DLEX4000W dryer rotated. Inspection revealed a cracked drum. We replaced the drum, all four support rollers and the idler pulley during the repair. These service photographs show the crack and the component replacement work.',
 overviewEntries:[
 {label:'Location',value:'Carmel, Indiana'},
 {label:'Appliance',value:'LG electric dryer'},
 {label:'Model',value:'DLEX4000W'},
 {label:'Reported symptom',value:'Unusual rotating noise and a bouncing drum'},
 {label:'Diagnosis',value:'Cracked dryer drum'},
 {label:'Drum repair',value:'Drum assembly replaced'},
 {label:'Support rollers',value:'Four replaced: two front and two rear'},
 {label:'Belt tensioner',value:'Idler pulley replaced'}],
 overviewImage:{src:base+'drum-support-diagram.webp',width:1843,height:2786,caption:'LG dryer assembly diagram highlighting the drum, support rollers and belt tensioner'},
 photos:[
 ['dryer',1200,1600,'LG DLEX4000W dryer at the Carmel, Indiana service location'],
 ['model-label',1837,856,'Model detail identifying the serviced LG dryer as DLEX4000W'],
 ['crack',1200,1600,'Visible crack beside the seam near the edge of the removed LG dryer drum'],
 ['opened',1200,1600,'LG dryer with its front panel removed to access the drum and support assemblies'],
 ['old-front-rollers',1200,1600,'Original front drum support rollers on the removed dryer bulkhead'],
 ['old-idler',1200,1600,'Original belt tensioner with visible lint around the idler pulley'],
 ['front-rollers',1200,1600,'Two new front drum support rollers fitted during the Carmel dryer repair'],
 ['rear-rollers',1200,1600,'Two new rear drum support rollers on the LG dryer rear bulkhead'],
 ['idler-comparison',1200,1600,'Replacement idler assembly beside the removed belt tensioner and support rollers'],
 ['drum',1200,1600,'Removed LG dryer drum showing the drum shell, internal lifters and felt rim']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function lgDrumArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Call: A Dryer Drum That Seemed to Bounce',[
 'The customer contacted Alex Appliance Repair in <strong>Carmel, Indiana</strong>, because the dryer sounded different while the drum was turning. The motion was described as a kind of jumping or bouncing, accompanied by an unusual drum noise. This was a mechanical noise complaint that called for inspection of the rotating assembly.',
 'During the visit, we found a <strong>crack in the dryer drum</strong>. The repair included replacement of the drum assembly, the two front and two rear support rollers, and the idler pulley that tensions the belt. The photographs document the damaged drum and the work carried out on its support system.'
 ])}
 ${row(1,'Model Identification: LG DLEX4000W',[
 'The appliance label supplied with this job identifies the dryer as <strong>LG DLEX4000W</strong>. The model detail shown here makes that identification easy to read. This is the electric dryer in the photographed laundry setup.',
 'When booking service, providing the dryer model together with the symptom helps us prepare for the visit. For example, “LG DLEX4000W, drum bouncing and making a repeating thump” gives more useful information than “dryer broken.” The technician still needs to inspect the appliance to establish the cause.'
 ])}
 ${row(2,'The Diagnosis: A Crack Near the Drum Edge',[
 'The close-up photograph shows the actual damage: a dark, irregular crack running beside the seam near the drum edge. It is a break in the drum shell, not simply a mark on its surface. That finding led to the decision to replace the drum.',
 'A drum has to remain structurally sound as it rotates on its supports. A crack can allow a local section to flex and can contribute to an uneven, repeating noise as the drum turns. In this case, the visible damage supported the technician’s diagnosis following the customer’s report of bouncing and abnormal sound.',
 'The photograph documents where this drum failed. It does not establish why the crack first developed, so the repair story does not attribute it to overloading, a manufacturing defect or a particular operating habit.'
 ])}
 ${row(3,'Opening the Dryer to Reach the Drum',[
 'The service photographs show the dryer opened with the front panel removed. This exposed the drum and the support assemblies that needed to be reached for the repair. Replacing the drum involves access to the rotating assembly inside the cabinet, rather than an adjustment from the outside.',
 'With the drum removed, the front and rear support rollers and the belt tensioner could be reached during the same job. The exploded assembly diagram in the visit overview helps show how those components relate to the drum. It is a component reference; the job photographs show the actual appliance.'
 ])}
 ${row(9,'Replacing the Cracked Drum Assembly',[
 'The cracked drum was replaced as an assembly. The removed drum photograph shows its cylindrical shell, the lifters inside and the felt around the rim. The separate close-up above provides the clearest view of the fracture that prompted replacement.',
 'LG’s <a href="https://media.us.lg.com/m/438e6724d078bd6a/original/DLEX4000_-DLGX4001_-LG-Builder-Spec-Sheet.pdf" target="_blank" rel="noopener">specification for this model family</a> describes the drum material as aluminized alloy steel. That is the material description used here, rather than calling it a solid aluminum drum.',
 'The important repair distinction is the damaged drum shell itself. New rollers alone would not remove the crack. Drum replacement addressed the structural damage identified during inspection, while the additional component replacements addressed the supporting and belt-tensioning parts included in this job.'
 ])}
 <section class="repair-story-section"><h2>The Original Supports and Belt Tensioner</h2>
 <p>These photographs show the front support rollers and the original idler pulley before replacement. Visible lint and deposits help document their condition at the time of service. The confirmed diagnosis for the reported bouncing drum was the cracked drum; the photographs alone do not prove that every roller had failed.</p>
 ${pair(4,5)}
 <p>Because the drum was already being replaced, the work also included replacement of all four support rollers and the idler pulley. This records the scope of this particular repair, rather than suggesting that every dryer noise requires the same set of parts.</p></section>
 <section class="repair-story-section"><h2>Four New Drum Rollers: Two Front and Two Rear</h2>
 <p>We replaced <strong>all four drum support rollers</strong>. Two are mounted at the front of the drum and two at the rear. The paired photographs show the new blue-centered rollers on each of the removed support assemblies, making both sets visible.</p>
 ${pair(6,7)}
 <p>The rollers support the rotating drum. They perform a different job from the idler pulley: the rollers carry the drum, while the idler tensions the drive belt. Replacing both front and rear sets during this drum replacement renewed all four support points in one repair.</p></section>
 ${row(8,'Replacing the Idler Pulley',[
 'The <strong>idler pulley, also called the belt tensioner</strong>, was replaced during the same service. The comparison photograph shows the replacement assembly beside the removed one. The original pulley has visible deposits around its wheel; the replacement is shown separately on the work surface.',
 'This component maintains tension in the belt drive as the drum turns. It is separate from the four drum rollers and is counted separately in the repair: one drum assembly, four support rollers and one idler pulley. Those are the replacements documented for this Carmel job.'
 ])}
 <section class="repair-story-section"><h2>What a Thumping or Bouncing Dryer Noise Can Tell You</h2>
 <p>A repeating thump, an uneven tumbling sound or a drum that seems to bounce is useful information to share when requesting dryer repair. It helps focus the inspection on the rotating assembly, but the sound by itself does not identify a single failed component. This LG dryer had a visible cracked drum; another appliance with a similar noise may have a different cause.</p>
 <p>Describe when the noise occurs, whether it repeats as the drum turns, and whether it happens with different loads. If you already noticed a crack or damaged edge, mention that as well. You do not need to disassemble the dryer or decide which part to order before calling. A model number and a clear description of the change in operation are enough to start the service request.</p></section>
 <section class="repair-story-section"><h2>Questions About Cracked Drum and Roller Repair</h2>
 <h3>Why was this LG dryer making an unusual thumping sound?</h3><p>The customer reported bouncing and abnormal noise as the drum rotated. Inspection identified a cracked drum, and the drum assembly was replaced.</p>
 <h3>Can a dryer drum crack near the seam?</h3><p>Yes. The close-up from this repair shows a crack beside the seam near the drum edge. Its location was documented during inspection; the original reason the crack developed was not established in the job notes.</p>
 <h3>Will replacing the rollers fix a cracked drum?</h3><p>Rollers support the drum but do not repair a fracture in the drum shell. This job required a replacement drum, with the four rollers and idler replaced during the same service.</p>
 <h3>How many drum rollers were replaced?</h3><p>Four: two front and two rear rollers. The idler pulley was an additional, separate replacement.</p>
 <h3>Does every noisy LG dryer need a new drum?</h3><p>No. This was a specific repair supported by a visible crack. A noise complaint needs inspection before recommending a drum, rollers or another component.</p>
 <h3>How much does a cracked dryer drum repair cost?</h3><p>The scope depends on the model, the damage and the components required. Contact us with your model and symptoms to arrange diagnosis and discuss the repair for your appliance. This article does not quote a price for a different job.</p>
 </section>
 <section class="repair-story-section"><h2>Book Dryer Repair in Carmel, Indiana</h2>
 <p>If your dryer makes a repeating thump, the drum seems to bounce or you have noticed damage inside it, contact Alex Appliance Repair for <a href="/carmel/dryer-repair-services.html">dryer repair in Carmel</a>. Tell us the brand, model and what you hear while the drum turns so we can discuss the service you need.</p>
 <p>Explore our <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a>, check our <a href="/carmel.html">Carmel service page</a>, or see another documented <a href="/repair-cases/mccordsville-lg-dle5977s-dryer-belt-rollers-idler-repair.html">LG dryer belt, roller and idler repair</a>. Each story describes its own inspection findings and completed work.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> or use online booking to request service.</p>
 <a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Carmel</a></section>
 </article>`;
}
