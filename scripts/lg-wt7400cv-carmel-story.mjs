const base='images/repair-cases/lg-wt7400cv-actuator-carmel/';
export const lgActuatorStory={
 slug:'carmel-lg-wt7400cv-washer-spins-but-wont-agitate',
 title:'LG Washer Spins but Will Not Agitate: Actuator Motor Repair',
 headline:'LG WT7400CV Washer Spins but Will Not Agitate in Carmel, Indiana',
 cardTitle:'LG Washer Spins but Will Not Wash in Carmel: Actuator Repair',
 seoTitle:'LG Washer Spins but Won’t Agitate | Carmel, IN Repair',
 description:'LG WT7400CV washer spins but will not agitate? See our Carmel, Indiana repair: diagnosis, actuator motor replacement, model label and real service photos.',
 city:'carmel',appliance:'washer',published:'2026-10-29',modified:'2026-10-29',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'The spin cycle worked, but the washplate would not move during washing. This LG WT7400CV repair in Carmel, Indiana, traced the problem to a failed actuator motor. The replacement was ordered and installed, with the repair completed on October 29, 2026.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Repair date',value:'October 29, 2026'},
  {label:'Appliance',value:'LG top-load washing machine'},
  {label:'Model',value:'WT7400CV'},
  {label:'Complaint',value:'Spin worked; washplate did not agitate'},
  {label:'Diagnosis',value:'Failed actuator motor'},
  {label:'Repair',value:'Replacement actuator ordered and installed'}
 ],
 overviewImage:{src:base+'actuator-diagram.webp',width:1565,height:2435,caption:'LG top-load washer exploded diagram with the actuator motor highlighted at K230'},
 photos:[
  ['washer',1200,1600,'LG WT7400CV top-load washer during the Carmel service visit'],
  ['model-label',470,70,'Original LG washer label showing model WT7400CV'],
  ['drive-access',1200,1600,'LG washer underside with the rotor removed and the actuator linkage visible'],
  ['original-actuator',1200,1600,'Original actuator motor and linkage before replacement'],
  ['replacement-comparison',1200,1600,'Removed actuator beside the replacement actuator at the service visit'],
  ['installed-actuator',1200,1600,'Replacement actuator motor secured beneath the washer with its linkage attached'],
  ['reassembled-drive',1200,1600,'Washer drive reassembled with the replacement actuator connected']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function lgActuatorArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Spin Cycle Worked, but the Wash Cycle Did Not',[
  'A homeowner in <strong>Carmel, Indiana</strong>, contacted Alex Appliance Repair about an unusual laundry problem: the LG washer could spin, but it would not perform the washing action. The customer described the agitator as not turning during the wash cycle. That difference between the two modes was the key detail in the service request.',
  'A spinning basket can make a washer appear mechanically functional, yet spinning alone does not wash the load. In this case, diagnosis identified a <strong>failed actuator motor</strong>. We ordered the replacement and installed it, completing the repair on <strong>October 29, 2026</strong>. The photographs below show the appliance, its model identification and the components involved in the repair.'
 ])}
 ${row(1,'Model Confirmed: LG WT7400CV',[
  'The original appliance label identifies this washer as <strong>LG WT7400CV</strong>. The image is a crop of the model-number area from the service photograph, with the serial number outside the crop. Confirming the model matters because similar-looking LG top-load washers can use different wash systems and components.',
  'Although homeowners often call the moving part an “agitator,” this model uses a low-profile <strong>impeller, or washplate</strong>, at the bottom of the basket. LG identifies the design as an impeller washer in its <a href="https://www.lg.com/us/washers-dryers/lg-wt7400cv-top-load-washer" rel="noopener">WT7400CV product specifications</a>. Here, “not agitating” describes the missing washing action; it does not refer to a tall center-post agitator.'
 ])}
 ${row(2,'Why a Working Spin Cycle Does Not Rule Out a Drive Problem',[
  'The reported symptoms narrowed the question: why could the machine spin while the washplate was not doing its job during washing? Those are different operating modes. The actuator and its linkage are part of the mechanism that changes the drive arrangement between washing and spinning. A problem in that mechanism can therefore affect one mode while the other still operates.',
  'That explanation is useful context, but the symptom alone is not enough to choose a replacement part. The diagnosis on this washer identified the actuator motor as the failed component. The underside photograph shows the exposed drive area and linkage; the highlighted diagram in the Visit Overview locates the actuator within the larger assembly.'
 ])}
 <section class="repair-story-section"><h2>From Diagnosis to Actuator Motor Replacement</h2>
 <p>Once the failed actuator was identified, a replacement was ordered for this repair. The original unit was removed and the replacement installed. These two photographs show the original actuator in position and the removed component beside its replacement, connecting the diagnosis to the actual work performed at the Carmel home.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>The small actuator is separate from the large drive motor assembly visible underneath the tub. That distinction matters when describing the repair: this visit involved replacing the actuator motor, rather than treating the customer's complaint as proof that every part of the drive system had failed. The confirmed finding determined the repair scope.</p></section>
 ${row(5,'The Replacement Actuator and Linkage',[
  'The replacement actuator was secured in its mounting position and attached to the linkage. In this close-up, the white arm connects the actuator to the shifting mechanism. The photograph records the replacement installation before the remaining reassembly was finished.',
  'The actuator is easy to overlook because it is much smaller than the rotor and stator beneath the tub. Its connection to the shifting linkage explains why it matters to the wash cycle. Replacing the diagnosed component addressed the repair identified during this visit and allowed the washer to be reassembled.'
 ])}
 ${row(6,'Repair Completed in Carmel on October 29',[
  'The final underside photograph shows the drive rotor back in place and the replacement actuator connected. The repair was completed in Carmel, Indiana, on October 29, 2026. The sequence of service photos follows the work from access to the drive area through actuator replacement and reassembly.',
  'For a homeowner arranging a similar visit, a useful description is: “The washer spins, but the washplate does not move during washing.” Add the model number and any displayed error message. These details help communicate the problem accurately, while an inspection determines whether the actuator, linkage or another component needs attention.'
 ])}
 <section class="repair-story-section"><h2>Questions About an LG Washer That Spins but Will Not Wash</h2>
 <h3>Can the actuator be faulty if the spin cycle still works?</h3><p>Yes. On this LG WT7400CV, the customer reported working spin and missing wash action, and diagnosis identified a failed actuator motor. Working spin does not establish that the washing mechanism is functioning correctly.</p>
 <h3>Does this symptom always mean the actuator needs replacement?</h3><p>No. Similar symptoms can require different repairs. The actuator diagnosis in this article applies to this particular washer. A technician should inspect the machine before recommending components.</p>
 <h3>Does the LG WT7400CV have an agitator or an impeller?</h3><p>It has a low-profile impeller, also called a washplate. Homeowners may still describe its washing motion as agitation, so “will not agitate” is a useful description of the symptom.</p>
 <h3>What work was performed on this washer?</h3><p>The failed actuator motor was diagnosed, a replacement was ordered and installed, and the washer was reassembled. The repair took place in Carmel, Indiana.</p>
 <h3>What should I share when booking service?</h3><p>Provide the model, describe whether wash and spin behave differently, and mention any error message. Avoid removing underside components or reaching beneath a powered washer to investigate the problem.</p></section>
 <section class="repair-story-section"><h2>LG Washer Repair in Carmel, Indiana</h2>
 <p>If your LG washing machine spins but will not wash, Alex Appliance Repair can help diagnose the cause. Start with the symptom and model number so the service request reflects what the appliance is actually doing.</p>
 <p>Learn about our <a href="/carmel/washer-repair-services.html">washer repair in Carmel</a>, <a href="/carmel/lg-appliance-repair.html">LG appliance repair services</a> and <a href="/recent-work.html">recent repair stories</a>. We explain the diagnosis and estimate before approved repair work.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your washer or book a service visit online.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Carmel</a></section>
 </article>`;
}
