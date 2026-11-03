const base='images/repair-cases/kitchenaid-kdtm404-noblesville/';
export const kitchenAidWashStory={
 slug:'noblesville-kitchenaid-kdtm404kps0-dishwasher-not-cleaning',
 title:'KitchenAid Dishwasher Poor Cleaning: Inlet Valve and Circulation Pump Repair',
 headline:'KitchenAid KDTM404KPS0 Dishwasher Not Cleaning in Noblesville, Indiana',
 cardTitle:'KitchenAid Dishwasher Not Cleaning in Noblesville: Two Problems Repaired',
 seoTitle:'KitchenAid Dishwasher Not Cleaning | Noblesville, IN',
 description:'KitchenAid dishwasher not cleaning in Noblesville, IN? Our KDTM404KPS0 repair replaced the water inlet valve and circulation pump, restoring clean dishes.',
 city:'noblesville',appliance:'dishwasher',published:'2026-10-30',modified:'2026-10-30',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'Poor cleaning and insufficient filling led to two findings on this KitchenAid KDTM404KPS0 dishwasher in Noblesville. We replaced the water inlet valve and recirculation pump on October 30, 2026. Post-repair testing found no errors, the dishwasher worked properly, and dishes came out clean.',
 overviewEntries:[
  {label:'Location',value:'Noblesville, Indiana'},
  {label:'Repair date',value:'October 30, 2026'},
  {label:'Appliance',value:'KitchenAid dishwasher'},
  {label:'Model',value:'KDTM404KPS0'},
  {label:'Complaint',value:'Poor cleaning and insufficient filling'},
  {label:'Repair',value:'Water inlet valve and recirculation pump replaced'},
  {label:'Result',value:'Tested without errors; clean dishes'}
 ],
 overviewImage:{src:base+'pump-valve-diagram.webp',width:1855,height:2420,caption:'Dishwasher exploded diagram highlighting the water inlet valve and circulation pump'},
 photos:[
  ['dishwasher',1200,1600,'KitchenAid dishwasher at the Noblesville, Indiana service visit'],
  ['model-label',250,70,'Original KitchenAid model label identifying KDTM404KPS0'],
  ['access',1200,1600,'KitchenAid dishwasher removed from the cabinet for service access'],
  ['pump-removed',1200,1600,'Dishwasher underside with the circulation pump removed'],
  ['pump-replacement',1200,1600,'Circulation pump assembly outside the dishwasher during the repair'],
  ['pump-installed',1200,1600,'Circulation pump assembly and hose connections beneath the KitchenAid dishwasher'],
  ['valve-comparison',1200,1600,'Two water inlet valve assemblies photographed during replacement'],
  ['valve-installed',1200,1600,'Installed water inlet valve with its fill hose connected'],
  ['wash-system',1200,1600,'Interior wash-system detail photographed during the KitchenAid dishwasher service']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function kitchenAidWashArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Dirty Dishes and a Dishwasher That Was Not Filling Properly',[
  'A homeowner in <strong>Noblesville, Indiana</strong>, called Alex Appliance Repair because their KitchenAid dishwasher was leaving dishes poorly washed. The customer also reported that the machine was not taking in enough water. Those two observations made this more than a general complaint about disappointing cleaning results: both filling and the washing action needed attention.',
  'Diagnosis identified <strong>two components requiring replacement: the water inlet valve and the recirculation pump</strong>. We replaced both as part of the repair completed on October 30, 2026. Afterward, the dishwasher was tested, no errors were found, operation was normal, and the dishes were clean. This story follows the work using photographs from the actual service visit.'
 ])}
 ${row(1,'The Model Label: KitchenAid KDTM404KPS0',[
  'The appliance label confirms the model as <strong>KitchenAid KDTM404KPS0</strong>. The crop alongside this section comes directly from the original photograph. It keeps the model identification readable while leaving the serial-number line outside the image. The full model includes the final zero, an important detail when identifying the appliance for service.',
  'When booking a dishwasher repair, a model number and a specific symptom are more useful than appearance alone. For this visit, the useful description was that dishes were not coming clean and filling seemed insufficient. Those details guided the service request; the diagnosis established which components actually needed to be replaced.'
 ])}
 ${row(2,'Two Water Functions, Two Repair Findings',[
  'The inlet valve controls water entering the dishwasher. The circulation pump, also called the recirculation or wash pump, moves water through the wash system after it enters the tub. Cleaning depends on both stages: bringing water into the machine and moving it through the washing system are separate jobs.',
  'On this KitchenAid, the diagnosis called for work on both components. Addressing only the filling complaint would have left the circulation-pump finding unresolved. The dishwasher was moved out of its cabinet opening to provide access for the repair. The diagram in the Visit Overview highlights the two components, while the service photographs show their positions on the actual appliance.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Recirculation Pump</h2>
 <p>The circulation pump was removed and replaced. These photographs show the underside with the pump removed and a pump assembly outside the dishwasher during the work. Viewing the two stages together makes it easier to understand where the pump connects to the dishwasher's water path beneath the tub.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>The recirculation pump performs a different task from the drain pump. It supports washing by moving water through the wash system; the drain pump removes used water from the machine. The component replaced for this cleaning problem was the recirculation pump. Keeping those names clear helps explain the work without confusing a poor-washing complaint with a drainage repair.</p></section>
 ${row(5,'The Pump Assembly Back in Position',[
  'With the replacement pump installed, the assembly and its connections were reassembled beneath the dishwasher. The wider underside photograph shows the pump in context rather than as an isolated catalog component. It also shows how closely the pump, hoses and wiring share the space beneath the wash tub.',
  'This part of the job addressed the circulation-pump finding. The filling problem still required its own repair, so the next component in the service sequence was the water inlet valve. Both repairs belonged to the same diagnosis and were completed before the final operating check.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Water Inlet Valve</h2>
 <p>The water inlet valve was also replaced to address the filling problem identified during diagnosis. The first photograph shows the valve assemblies during the work. The second shows the installed valve with its fill hose connected, placing this smaller component in context within the lower part of the dishwasher.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(6,true)}${figure(7,true)}</div>
 <p>For this repair, replacing the inlet valve and replacing the circulation pump served different purposes. The valve addressed water entry; the pump addressed circulation during washing. The combination explains why a complete diagnosis mattered: the customer's single experience of dirty dishes involved two components requiring attention.</p></section>
 ${row(8,'Post-Repair Test: No Errors and Clean Dishes',[
  'After the inlet valve and recirculation pump were replaced, the dishwasher was reassembled and tested. <strong>No errors were found during the post-repair test, the machine operated properly, and dishes came out clean.</strong> That result addressed the reason the homeowner had requested service in the first place.',
  'The repair took place in <strong>Noblesville on October 30, 2026</strong>. The service record now connects the model, original symptoms, two replacement components and the successful test result. The interior photograph documents a detail of the wash system; the operating result is based on the completed post-repair check.'
 ])}
 <section class="repair-story-section"><h2>Questions About This KitchenAid Dishwasher Repair</h2>
 <h3>Why was this KitchenAid dishwasher leaving dishes dirty?</h3><p>The customer reported poor cleaning and insufficient filling. Diagnosis identified the water inlet valve and recirculation pump as requiring replacement. Both were replaced during this Noblesville repair.</p>
 <h3>Are the inlet valve and circulation pump the same part?</h3><p>No. The inlet valve controls water entering the appliance. The circulation pump moves water through the wash system. They perform separate jobs and were both replaced on this dishwasher.</p>
 <h3>Is a circulation pump the same as a drain pump?</h3><p>No. The circulation pump supports washing, while the drain pump removes used water. This repair involved the circulation pump and water inlet valve.</p>
 <h3>Does every dishwasher that cleans poorly need both components?</h3><p>No. These were the findings for this individual KitchenAid KDTM404KPS0. Similar cleaning complaints can have other causes, so another dishwasher needs its own diagnosis before replacement components are recommended.</p>
 <h3>Was the dishwasher tested after the repair?</h3><p>Yes. Post-repair testing found no errors. The dishwasher worked properly and dishes came out clean.</p>
 <h3>Do you repair KitchenAid dishwashers in Noblesville?</h3><p>Yes. Contact Alex Appliance Repair with the model number and a description of the problem to arrange dishwasher service in Noblesville, Indiana.</p></section>
 <section class="repair-story-section"><h2>Dishwasher Repair in Noblesville, Indiana</h2>
 <p>If your KitchenAid dishwasher leaves dishes dirty or seems to fill poorly, describe both symptoms when requesting service. Share the model number and any error message so we can understand the concern before the visit. We explain the diagnosis and estimate before approved repair work.</p>
 <p>Explore our <a href="/noblesville/dishwasher-repair-services.html">dishwasher repair services in Noblesville</a>, <a href="/brands/kitchenaid-appliance-repair.html">KitchenAid appliance repair services</a> and <a href="/recent-work.html">recent local repair stories</a>.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dishwasher.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dishwasher repair in Noblesville</a></section>
 </article>`;
}
