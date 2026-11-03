const base='images/repair-cases/lg-wm4000hwa-gasket-carmel/';
export const lgGasketStory={
 slug:'carmel-lg-wm4000hwa-washer-leaking-door-boot-gasket',
 title:'LG Washer Leak Repair: Door Boot Gasket Replacement',
 headline:'LG WM4000HWA Washer Leaking During Wash in Carmel, Indiana',
 cardTitle:'LG Washer Leaking in Carmel: Torn Door Gasket Replaced',
 seoTitle:'LG Washer Leaking During Wash | Carmel, IN Repair',
 description:'LG WM4000HWA washer leaking during wash in Carmel, IN. See the torn door boot gasket, seal replacement, dispenser cleaning and successful leak testing.',
 city:'carmel',appliance:'washer',published:'2026-10-31',modified:'2026-10-31',editorialStylesheet:'lg-fan-noblesville',
 summary:'Water was running beneath an LG WM4000HWA during the wash cycle. At this Carmel service visit, diagnosis found a hole in the lower door boot gasket. We replaced the gasket, cleaned hardened detergent from the dispenser and tested all cycles. No leaks remained after the repair on October 31, 2026.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Repair date',value:'October 31, 2026'},
  {label:'Model',value:'LG WM4000HWA'},
  {label:'Complaint',value:'Water beneath the washer during washing'},
  {label:'Diagnosis',value:'Hole in the lower door boot gasket'},
  {label:'Work',value:'New gasket installed; detergent dispenser cleaned'},
  {label:'Result',value:'All cycles tested; no water leaking underneath'}
 ],
 overviewImage:{src:base+'gasket-diagram.webp',width:1191,height:1789,caption:'LG front-load washer exploded diagram with the door boot gasket highlighted'},
 photos:[
  ['washer',1200,1600,'LG WM4000HWA front-load washer at the Carmel service visit'],
  ['model-label',490,105,'Original LG appliance label showing WM4000HWA and revision 01'],
  ['gasket-hole',1200,1600,'Visible hole in the lower section of the original LG door boot gasket'],
  ['gasket-removed',1200,1600,'Washer front disassembled with the door boot gasket removed'],
  ['gasket-installed',1200,1600,'Replacement door boot gasket fitted around the washer tub opening'],
  ['retaining-spring',1200,1600,'Close-up of the replacement gasket and retaining spring during installation'],
  ['dispenser-residue',1200,1600,'Hardened powdered detergent in the dispenser before cleaning'],
  ['reassembled-door',1200,1600,'Front panel refitted around the replacement LG washer door gasket']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function lgGasketArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Water Was Running Beneath the Washer During Washing',[
  'A homeowner in <strong>Carmel, Indiana</strong>, contacted Alex Appliance Repair because water was escaping beneath their LG washing machine during the wash cycle. A puddle underneath an appliance shows where water ends up, but identifying the failed component requires tracing the leak on the individual machine.',
  'We visited the home, diagnosed the problem and disassembled the washer for access. The finding was a <strong>hole in the lower section of the door boot gasket</strong>. The damaged gasket was replaced, and hardened detergent deposits were removed from the dispenser. After reassembly, all cycles were tested and the area beneath the machine was checked. The washer worked properly with no remaining leak.'
 ])}
 ${row(1,'Model Identification: LG WM4000HWA',[
  'The original appliance label identifies this front-load washer as <strong>LG WM4000HWA</strong>, with revision 01 shown beside the model. The photograph here is a crop of the actual model-number area. It preserves the printed identification and leaves the serial number outside the crop.',
  'The model and the timing of a leak are useful details when requesting service. In this case, the customer specifically reported water during washing. That gave the service request a clear starting point, while the inspection established the damaged door gasket as the repair finding. The repair and this article are dated <strong>October 31, 2026</strong>.'
 ])}
 ${row(2,'The Leak Source: A Hole in the Lower Door Gasket',[
  'The close-up service photograph shows an opening through the rubber in the lower part of the original door boot gasket. This flexible seal surrounds the front opening of the tub. The visible damage matched the diagnosed leak problem and made replacement necessary on this washer.',
  'A gasket can look intact around much of the door while having damage in a less visible fold or lower section. Here, the photograph records the specific defect found during diagnosis. The repair addressed that defect with a new gasket. The service record does not establish what originally punctured or tore the rubber, so the cause of the damage is not assumed.'
 ])}
 <section class="repair-story-section"><h2>Removing the Damaged Boot and Installing the New Gasket</h2>
 <p>The washer was disassembled to reach the door boot and its attachment points. The damaged gasket was removed and a new one installed. The following photographs show the exposed tub opening without the gasket and the replacement fitted around the opening, documenting the main stages of this leak repair.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>The door boot is also called a door seal, bellows or rubber door gasket. These names describe the same component serviced here. The diagram in the Visit Overview places it within the front-load washer assembly, while the original photographs show the work on this particular LG machine in Carmel.</p></section>
 ${row(5,'Securing the Replacement Door Seal',[
  'The replacement boot was fitted and secured as the washer was put back together. This close-up shows the retaining spring at the gasket attachment area during installation. The wider photograph in the previous section shows the new rubber around the tub opening before the front of the machine was fully reassembled.',
  'Fitting the new seal was one part of completing the job. The washer also needed to be reassembled and operated so its water-containing components could be checked in use. The final verification therefore included cycle testing and an inspection beneath the machine, where the homeowner had originally noticed the escaping water.'
 ])}
 ${row(6,'Cleaning Hardened Detergent From the Dispenser',[
  'The detergent dispenser contained hardened pieces of powdered laundry detergent. The photograph shows those deposits before cleaning. We removed the accumulated material and cleaned the dispenser as part of this service, then completed reassembly of the washer.',
  'The dispenser cleaning and gasket replacement were separate parts of the visit. The confirmed leak finding was the hole in the lower door boot; the detergent buildup was an additional condition that was cleaned. Keeping that distinction clear explains the work accurately without suggesting that the powder deposits caused the tear in the rubber.'
 ])}
 ${row(7,'All Cycles Tested and No Leaks Underneath',[
  'After the new door boot gasket was installed and the dispenser cleaned, the washer was reassembled and <strong>all cycles were tested</strong>. We also checked beneath the machine for water. The washer operated properly, and <strong>no leakage remained</strong>. The successful repair was completed in Carmel on October 31, 2026.',
  'That final check returned to the original complaint: water running under the appliance during washing. Replacing the damaged seal corrected the diagnosed problem, and the post-repair inspection confirmed a dry area beneath the washer during testing. The photograph shows the front panel refitted around the replacement gasket during the reassembly sequence.'
 ])}
 <section class="repair-story-section"><h2>Questions About This LG Washer Leak Repair</h2>
 <h3>Why was water leaking beneath this LG washer?</h3><p>Diagnosis found a hole in the lower section of the door boot gasket. The customer had reported water running beneath the washer during the wash cycle.</p>
 <h3>What was replaced?</h3><p>The damaged door boot gasket was replaced with a new one. This component is also known as the door seal or bellows.</p>
 <h3>Was the detergent dispenser replaced?</h3><p>No. Hardened detergent deposits were removed and the dispenser was cleaned. The replacement component in this repair was the door boot gasket.</p>
 <h3>Did detergent buildup cause the gasket damage?</h3><p>That was not established. The hole in the gasket and hardened detergent in the dispenser were separate findings. The gasket was replaced and the dispenser cleaned.</p>
 <h3>Was the leak checked after reassembly?</h3><p>Yes. All cycles were tested and the area beneath the washer was inspected. The machine worked properly and no remaining leak was found.</p>
 <h3>Does every LG washer leak require a new door gasket?</h3><p>No. This was the diagnosis for this LG WM4000HWA. Another washer with water underneath needs an inspection to locate its own leak source before repair work is recommended.</p></section>
 <section class="repair-story-section"><h2>LG Washing Machine Leak Repair in Carmel, Indiana</h2>
 <p>If your LG front-load washer leaks during washing, share the model number, when the water appears and where you notice it. Those details help describe the problem when arranging service. We explain the diagnosis and estimate before approved repair work.</p>
 <p>See our <a href="/carmel/washer-repair-services.html">washer repair services in Carmel</a>, <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a> and <a href="/recent-work.html">recent repair stories</a> for more examples of local service.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your washing machine.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Carmel</a></section>
 </article>`;
}
