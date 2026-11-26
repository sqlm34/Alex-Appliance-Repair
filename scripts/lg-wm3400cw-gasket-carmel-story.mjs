const base='images/repair-cases/lg-wm3400cw-gasket-carmel/';
export const lg3400Story={
 slug:'carmel-lg-wm3400cw-washer-door-boot-gasket-replacement',
 title:'LG Washer Door Boot Gasket Replacement in Carmel',
 headline:'LG Washer Door Boot Gasket Replacement in Carmel, Indiana',
 seoTitle:'LG Washer Door Gasket Replacement | Carmel, IN',
 description:'LG WM3400CW washer door boot gasket replacement in Carmel, Indiana. See original repair photos, model identification and the leak-free post-repair test result.',
 city:'carmel',appliance:'washer',published:'2026-11-26',modified:'2026-11-26',editorialStylesheet:'lg-fan-noblesville',
 summary:'Alex Appliance Repair replaced the door boot gasket on an LG WM3400CW front-load washer in Carmel, Indiana. The washer was tested after the repair: no water leaks were found, and it operated properly. Follow the work through original service photographs, a readable model-label crop and the supplied component diagram.',
 overviewEntries:[
 {label:'Location',value:'Carmel, Indiana'},
 {label:'Appliance',value:'LG front-load washing machine'},
 {label:'Verified model',value:'WM3400CW'},
 {label:'Repair',value:'Door boot gasket replaced'},
 {label:'Post-repair test',value:'Tested; no water leaks found; operating properly'},
 {label:'Photo record',value:'Washer, model label, access stages and gasket detail'}],
 overviewImage:{src:base+'gasket-diagram.webp',width:1240,height:1799,caption:'Supplied LG washer assembly diagram highlighting the door boot gasket'},
 photos:[
 ['washer',1200,1600,'LG front-load washer at the Carmel, Indiana service visit'],
 ['model-label',326,100,'Original model-label crop identifying LG washer WM3400CW'],
 ['top-access',1200,1600,'Top panel removed to access the LG washer interior during gasket replacement'],
 ['front-access',1200,1600,'Front and top access opened around the tub and door boot gasket'],
 ['gasket-installed',1200,1600,'Close view of the gasket and drum opening with the front panel removed'],
 ['gasket-detail',1200,1600,'Door boot gasket detail showing its molded openings and sealing edge during service'],
 ['gasket-reference',1006,754,'Supplied product reference showing the shape and folds of a washer door boot gasket']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function lg3400Article(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'An LG Washer Door Seal Repair in Carmel',[
 'This service visit in <strong>Carmel, Indiana</strong>, involved replacing the door boot gasket on an <strong>LG WM3400CW front-load washing machine</strong>. The flexible rubber seal surrounds the loading opening, between the washer tub and the front of the cabinet. It is also commonly called a door gasket, door seal or washer boot.',
 'Alex Appliance Repair completed the gasket replacement and tested the washer afterward. <strong>No water leaks were found, and the machine operated properly.</strong> The photographs below document the actual appliance and access stages during the work.',
 'A front-load washer seal has more to it than the visible rubber lip inside the door. Its folds, attachment surfaces and molded connections extend behind the front panel. This photo story follows that area of the washer as it became accessible during the repair.'
 ])}
 ${row(1,'Confirming the Washer Model',[
 'The appliance label identifies this washer as <strong>LG WM3400CW</strong>. The image is an unretouched crop from the original label photograph, focused on the model field so that it remains readable without the surrounding phone-screen interface.',
 'Model identification matters when arranging a door boot replacement. Similar-looking LG front-load washers can use different seals. The appliance label provides a more dependable starting point than the exterior appearance of the machine or the name printed on its control panel.',
 'When requesting service for your washer, provide the model and describe what you have observed around the door. A clear label photograph helps identify the appliance before a replacement component is selected.'
 ])}
 ${row(2,'Opening the Washer for Access',[
 'The service photographs show the top panel removed, exposing the upper tub area, hoses and internal assemblies. This view records an access stage in the gasket replacement while the washer was still positioned in the laundry room.',
 'The seal cannot be understood fully from the closed-door exterior. Access around the tub opening makes its attachment and surrounding components visible. In this job, the photo sequence continues from the opened top to the exposed front of the machine.',
 'The documented repair concerned the door boot gasket. The internal components visible in these photographs provide context for where the work took place; their appearance in the photo does not indicate that they were replaced.'
 ])}
 <section class="repair-story-section"><h2>Access Around the Door Boot Gasket</h2>
 <p>With the front panel removed, the circular gasket and stainless-steel drum opening are visible together. The wider photograph shows the access available around the tub; the closer view shows the seal at the loading opening. Both photographs were taken during this Carmel repair.</p>
 ${pair(3,4)}
 <p>The gasket bridges the opening between the tub assembly and the front cabinet. Its position and shape explain why replacing it involves access behind the washer front, beyond the portion that is normally visible when loading laundry.</p></section>
 ${row(5,'A Closer Look at the Rubber Seal',[
 'The hand-held photograph shows the gasket edge and several molded openings during service. These details help explain the component’s shape and how much of the seal is normally hidden inside the cabinet.',
 'The boot includes folds as well as an outer sealing surface. Correct fit involves the entire component, including its mounting areas and applicable connections, rather than only the visible lip around the door glass. The supplied assembly diagram in the Visit Overview locates the gasket within the washer.',
 'The work completed on this LG washer was replacement of the door boot gasket. After the repair, the washer was tested, no water leaks were detected, and normal operation was confirmed.'
 ])}
 ${row(6,'The Replacement Component and Completed Repair',[
 'The supplied product reference shows the overall form of a door boot gasket away from the washer. It is a component reference, while the other photographs document access and gasket details on the actual appliance during the service visit.',
 'The replacement restored the door-seal assembly on this LG WM3400CW. Following the work, testing confirmed that the washer operated properly without water leaks. That post-repair check is the recorded outcome of this Carmel service.',
 'A similar-looking seal on another washer should still be matched to that appliance’s model. For a service estimate, the exact model and the condition found during inspection determine which component and work are needed.'
 ])}
 <section class="repair-story-section"><h2>Door Gasket Care Between Service Visits</h2>
 <p>LG’s <a href="https://www.lg.com/us/support/help-library/lg-front-load-washer-maintenance-CT00000305-1400786418920" target="_blank" rel="noopener">front-load washer maintenance guidance</a> recommends cleaning the gasket surface and door glass to remove hair and lint that can interfere with a proper seal. Follow the instructions for your appliance when choosing cleaning products and caring for the rubber folds.</p>
 <p>Routine cleaning and component replacement address different needs. Cleaning removes surface debris; it does not replace an inspection when the seal appears damaged or water is escaping around the door. If you notice moisture, describe where it appears and when in the cycle you see it. Those observations help communicate the concern when arranging service.</p></section>
 <section class="repair-story-section"><h2>Questions About LG Washer Door Seal Replacement</h2>
 <h3>What is a door boot gasket?</h3><p>It is the flexible rubber component around the loading opening of a front-load washer. Door seal, door gasket and washer boot are common names for the same type of component.</p>
 <h3>Which LG washer was repaired?</h3><p>This repair involved model WM3400CW in Carmel, Indiana. The original model-label crop is included above.</p>
 <h3>Was the washing machine tested after replacement?</h3><p>Yes. The washer was tested after the door boot gasket was replaced. No water leaks were found, and the machine operated properly.</p>
 <h3>Does water near a washer door always mean the gasket needs replacement?</h3><p>A wet area alone is not enough to identify the repair. Inspection should establish the source before recommending a component. LG also identifies debris on sealing surfaces as something to check in its maintenance guidance.</p>
 <h3>How much does a door boot gasket replacement cost?</h3><p>The estimate depends on the washer model and the required work. Contact us with the model and your observations so the repair can be evaluated for your appliance.</p>
 </section>
 <section class="repair-story-section"><h2>Schedule LG Washer Repair in Carmel</h2>
 <p>For help with a washer door seal or another washing-machine concern, contact Alex Appliance Repair for <a href="/carmel/washer-repair-services.html">washer repair in Carmel, Indiana</a>. Share your model and a short description of the issue when requesting service.</p>
 <p>Learn about our <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a>, view <a href="/carmel.html">Carmel service coverage</a>, or browse more <a href="/recent-work.html">repair stories with original photographs</a>. Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or request an appointment online.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Carmel</a></section>
 </article>`;
}
