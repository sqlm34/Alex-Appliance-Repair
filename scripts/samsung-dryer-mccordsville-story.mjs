const base='images/repair-cases/samsung-dryer-mccordsville/';
export const samsungMcStory={
 slug:'mccordsville-samsung-dve50r5200w-dryer-not-heating-repair',
 title:'Samsung Dryer Not Heating: Heating Element and Idler Pulley Repair',
 headline:'Samsung DVE50R5200W/A3 Dryer Not Heating in McCordsville, Indiana',
 cardTitle:'Samsung Dryer No Heat Repair in McCordsville',
 seoTitle:'Samsung Dryer Not Heating Repair | McCordsville, IN',
 description:'Samsung DVE50R5200W/A3 dryer repair in McCordsville, IN: failed heating element and worn idler pulley replaced, internal lint removed and operation tested.',
 city:'mccordsville',appliance:'dryer',published:'2026-11-02',modified:'2026-11-02',editorialStylesheet:'lg-fan-noblesville',
 summary:'A Samsung dryer in McCordsville was not heating. Diagnosis found a burned-out heating element and an idler pulley in poor condition. We replaced both components, vacuumed accumulated and scorched lint from inside the dryer, reassembled it and tested operation. Heat returned and the dryer ran quietly without abnormal sounds.',
 overviewEntries:[{label:'Location',value:'McCordsville, Indiana'},{label:'Published',value:'November 2, 2026'},{label:'Model',value:'Samsung DVE50R5200W/A3'},{label:'Complaint',value:'Dryer not heating'},{label:'Findings',value:'Failed heating element; worn belt idler pulley; internal lint buildup'},{label:'Work',value:'Heating element and idler pulley replaced; interior vacuumed and cleaned'},{label:'Drum support rollers',value:'In good condition; not replaced'},{label:'Result',value:'Heating restored; quiet operation without abnormal sounds'}],
 overviewImages:[{src:base+'heater-diagram.webp',width:1279,height:2370,caption:'Samsung dryer heating assembly exploded diagram highlighting the heating element'},{src:base+'idler-diagram.webp',width:2183,height:2501,caption:'Samsung dryer drive assembly exploded diagram highlighting the belt idler pulley'}],
 photos:[['dryer',1200,1600,'Samsung dryer reassembled and powered on after the McCordsville repair'],['model-label',500,85,'Original appliance label identifying Samsung DVE50R5200W/A3'],['failed-heater',1200,1600,'Failed dryer heating element with broken coil sections and accumulated lint'],['replacement-heater',1200,1600,'Heating element coils photographed during the Samsung dryer repair'],['worn-idler',1200,1600,'Original belt idler pulley found in poor condition during diagnosis'],['new-idler',1600,1200,'Replacement belt idler pulley installed beside the dryer motor'],['lint-before',1200,1600,'Heavy internal lint accumulation before the dryer was vacuumed and cleaned'],['clean-interior',1200,1600,'Dryer interior after accumulated lint was removed during service']].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function samsungMcArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A No-Heat Complaint Led to Two Repair Findings',[
 'The service request from a homeowner in <strong>McCordsville, Indiana</strong>, was straightforward: their Samsung dryer was not heating. We inspected the appliance and opened the cabinet to diagnose the problem. Inside, the heating element had failed, and the belt idler pulley was also in poor condition.',
 'The completed repair included a <strong>new heating element and a replacement idler pulley</strong>, along with vacuuming and cleaning the dryer interior. After reassembly, testing confirmed that the dryer heated and operated quietly without unusual sounds. This repair story, published November 2, 2026, documents those findings with photographs from the service visit.'
 ])}
 ${row(1,'Verified Model: Samsung DVE50R5200W/A3',[
 'The model label on the actual dryer identifies it as <strong>Samsung DVE50R5200W/A3</strong>. The close-up is a crop of that original photograph, preserving the printed model identification while leaving the serial number outside the image. It connects the repair account to the appliance that was serviced.',
 'The two diagrams in the Visit Overview show the heating assembly and the belt-drive components. Use the arrows to switch between them. The service photographs below provide a different kind of detail: the condition of the failed heater, the worn tensioner and the lint found inside this particular dryer.'
 ])}
 <section class="repair-story-section"><h2>Burned-Out Heating Element Replaced</h2>
 <p>Diagnosis identified a burned-out heating element as the no-heat fault. The removed assembly contained broken coil sections, visible in the service photographs. We replaced the failed element so the dryer could produce heat again. The photographs show the damaged heater and a close view of the coils during the repair.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(2,true)}${figure(3,true)}</div>
 <p>The heating element and the idler pulley serve different functions. The element supplies heat; the idler maintains tension on the drum drive belt. Replacing the heater addressed the diagnosed heating failure. The worn idler was a separate finding handled while the cabinet was open. The photos alone do not establish the original reason the element failed.</p></section>
 ${row(4,'The Belt Idler Needed Replacement; the Drum Rollers Did Not',[
 'Inspection also found the <strong>idler pulley in poor condition</strong>. This is the belt tensioner pulley, located near the motor. It is distinct from the support rollers that carry the drum. The photograph shows the original idler before replacement, with lint present around the mechanism.',
 'The <strong>drum support rollers were in good condition and were not replaced</strong>. Keeping that distinction clear matters: this visit did not include a drum roller replacement. The mechanical component changed was the belt idler pulley. The new idler was installed, and quiet operation was confirmed after the dryer had been reassembled.'
 ])}
 ${row(5,'Replacement Idler Pulley Installed',[
 'The replacement idler assembly was fitted beside the dryer motor, as shown in this service photograph. Its job is to maintain belt tension as the drum turns. The image records the installed component before the drum and cabinet were fully put back together.',
 'The original complaint concerned missing heat, but the condition of the tensioner was another repair issue identified during the same diagnosis. Both findings were addressed in the completed work. Final testing then checked the assembled machine: it heated properly, ran quietly and produced no abnormal mechanical sounds. No replacement of the drum support rollers was needed.'
 ])}
 <section class="repair-story-section"><h2>Removing Heavy Lint From Inside the Dryer</h2>
 <p>Opening the dryer revealed substantial lint accumulation inside the cabinet and around the heating area. Some of the lint was scorched. We vacuumed and cleaned the accessible interior before completing reassembly. These photographs document the condition before cleaning and the interior after the accumulated material had been removed.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(6,true)}${figure(7,true)}</div>
 <p>This was internal dryer cleaning performed as part of the repair. The service account does not include cleaning the household exhaust duct. It also does not establish that lint caused the element failure. The confirmed findings were a failed heater, a worn idler and accumulated lint, each addressed by the work described here.</p></section>
 <section class="repair-story-section"><h2>Reassembled, Tested and Running Quietly</h2>
 <p>After replacing the heating element and belt idler pulley and cleaning the interior, we reassembled the dryer in reverse order and tested its operation. The dryer heated again and ran quietly without unusual sounds. That was the successful result of this Samsung dryer repair in McCordsville.</p>
 <p>The finished result covered both parts of the repair: restored heat and smooth, quiet operation. The support rollers remained in place because they were in good condition. The completed service combined the two necessary component replacements with removal of the lint found inside the machine.</p></section>
 <section class="repair-story-section"><h2>Questions About This Samsung Dryer Repair</h2>
 <h3>Why was this Samsung dryer not heating?</h3><p>The heating element had burned out. Diagnosis identified the failed element, and it was replaced.</p>
 <h3>Which pulley was replaced?</h3><p>The belt idler pulley, also called the belt tensioner pulley, was replaced. It was found in poor condition during inspection.</p>
 <h3>Were the drum support rollers replaced?</h3><p>No. The drum support rollers were in good condition. Only the idler pulley and heating element were replaced.</p>
 <h3>Was lint removed during the repair?</h3><p>Yes. The dryer interior was vacuumed and cleaned. There was substantial lint buildup, including scorched lint.</p>
 <h3>How did the dryer perform afterward?</h3><p>After reassembly and testing, it heated properly and ran quietly without abnormal sounds.</p>
 <h3>Does every Samsung no-heat problem require a heating element?</h3><p>No. This was the confirmed diagnosis for this appliance. Another dryer needs its own diagnosis before replacement components are recommended.</p></section>
 <section class="repair-story-section"><h2>Samsung Dryer Repair in McCordsville, Indiana</h2>
 <p>When arranging service for a dryer that is not heating, provide the model number and describe what happens when you start it. Mention any unusual sounds or smells as well. Those details help explain the complaint; inspection determines the repair needed.</p>
 <p>Explore our <a href="/mccordsville/dryer-repair-services.html">dryer repair services in McCordsville</a>, <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair services</a> and <a href="/recent-work.html">recent repair stories</a>.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer problem.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in McCordsville</a></section>
 </article>`;
}
