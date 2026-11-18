const base='images/repair-cases/bosch-circulation-pump-westfield/';
export const boschPumpStory={
 slug:'westfield-bosch-shp78cm6n-dishwasher-noise-circulation-pump-repair',
 title:'Bosch Dishwasher Noise and Circulation Pump Replacement',
 headline:'Noisy Bosch Dishwasher: Circulation Pump Repair in Westfield',
 seoTitle:'Bosch Dishwasher Noise & Pump Repair | Westfield, IN',
 description:'Bosch SHP78CM6N/25 dishwasher noise during washing in Westfield, IN: circulation pump replacement, original repair photos, model identification and booking.',
 city:'westfield',appliance:'dishwasher',published:'2026-11-18',modified:'2026-11-18',editorialStylesheet:'lg-fan-noblesville',
 summary:'A Westfield customer called because their Bosch dishwasher made an unusual noise during the wash cycle. Inspection identified the circulation pump as the component requiring replacement. This repair story follows the service on model SHP78CM6N/25, with original photographs of access to the pump and the replacement work.',
 overviewEntries:[
 {label:'Location',value:'Westfield, Indiana'},
 {label:'Appliance',value:'Bosch built-in dishwasher'},
 {label:'Verified model',value:'SHP78CM6N/25'},
 {label:'Reported symptom',value:'Unusual noise during the wash cycle'},
 {label:'Diagnosis',value:'Circulation pump replacement required'},
 {label:'Repair',value:'Circulation pump replaced'},
 {label:'Photo record',value:'Inspection, pump access and reassembly stages'}],
 overviewImage:{src:base+'circulation-diagram.webp',width:806,height:1231,caption:'Dishwasher pump assembly diagram highlighting the circulation pump'},
 photos:[
 ['dishwasher',1200,1600,'Bosch built-in dishwasher at the Westfield, Indiana service visit'],
 ['model-label',281,85,'Original appliance-label crop identifying Bosch dishwasher model SHP78CM6N/25'],
 ['controls',1200,1600,'Open Bosch dishwasher with its top-edge controls visible during inspection'],
 ['removed-dishwasher',1200,1600,'Bosch dishwasher removed from the cabinet and positioned on protective towels for access'],
 ['base-open',1200,1600,'Opened dishwasher base exposing the pump area, wiring and hose connections'],
 ['pump-access',1200,1600,'Close-up of the circulation pump area beneath the Bosch dishwasher tub'],
 ['pump-connection',1200,1600,'Separated pump connection during circulation pump replacement'],
 ['pump-reference',1200,1200,'Circulation pump product reference showing the housing, ports and mounting support'],
 ['reassembly',1200,1600,'Bosch dishwasher base and side during reassembly after pump work'],
 ['upright',1200,1600,'Dishwasher returned upright during reassembly with the side access area still exposed']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function boschPumpArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Call: Unusual Noise While Washing Dishes',[
 'A customer in <strong>Westfield, Indiana</strong>, contacted Alex Appliance Repair because their Bosch dishwasher was making an unusual noise while the wash cycle was running. The appliance was operating, but its sound during washing had become a concern.',
 'At the service visit, diagnosis identified the <strong>circulation pump as the component requiring replacement</strong>. We replaced the circulation pump. The photographs in this article follow the work from the installed dishwasher and model identification through access beneath the tub, the pump connection and reassembly.',
 'Knowing when a noise occurs helps describe the problem accurately. In this case, the customer specifically reported noise during washing. That detail gave the service request a clear starting point for inspection.'
 ])}
 ${row(1,'Identifying the Bosch Dishwasher',[
 'The original appliance label identifies the dishwasher as <strong>Bosch SHP78CM6N/25</strong>. The model-number crop shown here comes from the supplied service photograph and preserves the actual printed marking.',
 'The full model, including its revision suffix, is useful when arranging repair. It helps identify the exact appliance version before selecting a replacement assembly. For a service request, pair that model information with a short description such as “unusual noise during the wash cycle.”',
 'This article describes the diagnosis and repair of this particular dishwasher in Westfield. A matching brand name or a similar sound on another dishwasher is a reason to inspect it, rather than enough information to recommend the same repair.'
 ])}
 ${row(2,'Inspection: Noise During the Wash Cycle',[
 'The open-door photograph shows the dishwasher and its top-edge controls during the service visit. The reported symptom concerned the sound while dishes were being washed. Following inspection, the technician determined that the circulation pump needed replacement.',
 'The circulation pump moves wash water through the dishwasher’s spray system. The drain pump has a separate task: removing water from the appliance. Describing the stage at which a sound appears helps distinguish a washing concern from a complaint that occurs only while the machine drains.',
 'The diagnosis in this repair was circulation-pump replacement. The timing of the reported sound mattered: it occurred while the dishwasher was actively washing. Customers can help communicate a similar concern by describing the cycle stage in addition to the sound itself.'
 ])}
 ${row(3,'Removing the Dishwasher for Pump Access',[
 'The dishwasher was moved out of its cabinet opening and positioned on protective towels. This made the lower and side areas accessible for the pump work. The photograph shows the appliance out of its installed position with the exterior side area exposed.',
 'A circulation pump sits within the machinery beneath the wash tub. Reaching that area requires access beyond the racks and filter inside the dishwasher. The next photographs show how the lower assemblies became accessible during this service.',
 'The photo sequence records the stages of this repair. It shows why a pump replacement involves work beneath the appliance, even though the customer first notices the symptom as a sound from the dishwasher during a cycle.'
 ])}
 <section class="repair-story-section"><h2>Opening the Base and Reaching the Circulation Pump</h2>
 <p>With the base opened, the pump area, wiring and hose connections were accessible. The wider photograph records the layout beneath the tub; the close-up focuses on the circulation pump area. These are original photographs from the Westfield repair.</p>
 ${pair(4,5)}
 <p>The circulation pump shares this lower compartment with wiring, hoses and other dishwasher components. The replacement work required access to its connections within that confined space. The wider view and close-up together show the position of the pump beneath the wash tub.</p></section>
 ${row(6,'The Pump Connection During Replacement',[
 'This photograph shows a separated connection in the pump area during the replacement work. It provides a closer view of the interface that is normally hidden beneath the dishwasher. The circulation pump was replaced as part of the diagnosed repair.',
 'The pump interfaces with the dishwasher’s water-circulation path. Access to that connection was part of removing the assembly identified during diagnosis and fitting its replacement. This close view shows a stage of the pump work that cannot be seen with the dishwasher assembled.',
 'The supplied exploded diagram in the Visit Overview highlights the circulation pump within the larger assembly. It helps readers locate the component while the job photographs show the actual dishwasher during service.'
 ])}
 ${row(7,'Understanding the Circulation Pump Assembly',[
 'The product reference photograph shows the circulation pump housing, water ports and mounting support more clearly than an installed view can. It is a component reference supplied with the repair photographs, rather than a photograph of the part removed from this dishwasher.',
 'During washing, the circulation system keeps wash water moving through the spray system. A problem diagnosed in that assembly can call for pump replacement. In this Westfield case, that was the repair recommended after inspection and then completed.',
 'The correct assembly should be selected for the full appliance model and version. A photograph is useful for explaining the component, while the model label remains the source for identifying the dishwasher being serviced.'
 ])}
 <section class="repair-story-section"><h2>Reassembly Following Circulation Pump Replacement</h2>
 <p>After the pump work, the dishwasher assemblies were brought back together. The first photograph shows the base and side during reassembly. The next shows the dishwasher upright with its side access area still exposed, documenting a later stage of the work.</p>
 ${pair(8,9)}
 <p>The completed repair was circulation-pump replacement for the unusual noise reported during washing. The sequence shows the actual appliance as it moved from pump access back toward its assembled configuration.</p></section>
 <section class="repair-story-section"><h2>Does Every Noisy Dishwasher Need a Circulation Pump?</h2>
 <p>A change in sound deserves attention, but the sound alone does not identify the repair. Loading and spray-arm interference can also produce noise. Bosch’s <a href="https://www.bosch-home.co.nz/service/get-support/dishwasher-is-making-noise" target="_blank" rel="noopener">dishwasher noise guidance</a> discusses several possible sources, including movement of light items and spray arms striking dishes. Those are general possibilities, not the diagnosed cause of this Westfield repair.</p>
 <p>When requesting service, describe whether the noise appears during filling, active washing or draining. Mention whether it is new, continuous or intermittent and whether the dishwasher still completes its cycle. A short recording may help communicate what you hear. In this job, the customer’s wash-cycle noise complaint was followed by inspection and a circulation-pump replacement diagnosis.</p></section>
 <section class="repair-story-section"><h2>Questions About Bosch Dishwasher Pump Repair</h2>
 <h3>What was wrong with this Bosch dishwasher?</h3><p>The customer reported unusual noise during the wash cycle. Inspection determined that the circulation pump required replacement, and that repair was completed.</p>
 <h3>Which model was serviced?</h3><p>The appliance label identifies Bosch SHP78CM6N/25. The model crop is included above so the exact version can be read.</p>
 <h3>Is a circulation pump the same as a drain pump?</h3><p>No. The circulation pump moves water through the wash system. The drain pump removes water from the dishwasher. The circulation pump was the component replaced in this job.</p>
 <h3>Can a dishwasher keep running while it makes an unusual noise?</h3><p>This customer reported noise while a wash cycle was operating. Continued operation does not identify the source of a new sound; inspection is needed to determine what requires attention.</p>
 <h3>How much does a Bosch circulation pump repair cost?</h3><p>The estimate depends on the exact model, the diagnosed fault and the required work. Share your model and symptoms when requesting service so the repair can be evaluated for your appliance.</p>
 <h3>Do you service Bosch dishwashers in Westfield?</h3><p>Yes. This documented circulation-pump replacement was completed in Westfield, Indiana. Use the service links below to request an appointment.</p></section>
 <section class="repair-story-section"><h2>Book Bosch Dishwasher Repair in Westfield</h2>
 <p>If your Bosch dishwasher has developed an unusual sound during washing, contact Alex Appliance Repair for <a href="/westfield/dishwasher-repair-services.html">dishwasher repair in Westfield, Indiana</a>. Give us the model and describe when the noise occurs so we can discuss the service you need.</p>
 <p>Explore our <a href="/brands/bosch-appliance-repair.html">Bosch appliance repair services</a>, view <a href="/westfield.html">Westfield service coverage</a>, or browse more <a href="/recent-work.html">repair stories with original photographs</a>. Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or book service online to arrange diagnosis of a noisy dishwasher.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dishwasher repair in Westfield</a></section>
 </article>`;
}
