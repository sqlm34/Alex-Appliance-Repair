const base='images/repair-cases/samsung-dve45b6300p-belt-fishers/';
export const samsungFishersBeltStory={
 slug:'fishers-samsung-dve45b6300p-dryer-belt-idler-repair',
 title:'Samsung Dryer Belt and Idler Pulley Replacement',
 headline:'Samsung Dryer Not Starting in Fishers, Indiana',
 seoTitle:'Samsung Dryer Not Starting | Belt Repair in Fishers, IN',
 description:'Samsung DVE45B6300P dryer repair in Fishers, IN: broken belt and idler pulley replacement, internal lint removal and blower cleaning. See service photos.',
 city:'fishers',appliance:'dryer',published:'2026-11-17',modified:'2026-11-17',editorialStylesheet:'lg-fan-noblesville',
 summary:'A Fishers customer called because their Samsung dryer would not start the drum or begin the heated drying cycle. Inspection found a broken drive belt and an idler pulley that needed replacement. We installed a new belt and idler pulley, removed internal lint and cleaned the blower wheel.',
 overviewEntries:[
 {label:'Location',value:'Fishers, Indiana'},
 {label:'Appliance',value:'Samsung electric dryer'},
 {label:'Model',value:'DVE45B6300P/A3'},
 {label:'Complaint',value:'Drum and drying cycle would not start'},
 {label:'Diagnosis',value:'Broken drive belt; idler pulley replacement required'},
 {label:'Repair',value:'New drive belt and idler pulley installed'},
 {label:'Cleaning',value:'Internal lint removed; blower wheel cleaned'}],
 overviewImage:{src:base+'drive-diagram.webp',width:642,height:938,caption:'Dryer drive assembly diagram with belt and idler pulley reference images'},
 photos:[
 ['dryer',1200,1600,'Samsung dryer at the Fishers, Indiana service visit'],
 ['model-label',430,302,'Original model-label crop identifying Samsung DVE45B6300P/A3'],
 ['broken-belt',1200,1600,'Broken and frayed drive belt laid across the removed Samsung dryer drum'],
 ['belt-detail',1200,1600,'Close-up of split ribs and fraying along the damaged dryer belt'],
 ['new-idler',1200,1600,'Replacement idler pulley installed beside the Samsung dryer motor'],
 ['new-belt',1200,1600,'New drive belt around the reinstalled dryer drum during reassembly'],
 ['blower-before',1200,1600,'Lint deposits on the blower wheel and housing before cleaning'],
 ['blower-after',1200,1600,'Blower wheel and housing after cleaning during the Fishers dryer repair'],
 ['duct-before',1200,1600,'Lint inside the removed front lint-duct housing before cleaning'],
 ['duct-after',1200,1600,'The front lint-duct housing after accumulated lint was removed'],
 ['door-before',1200,1600,'Lint accumulated along the inside bottom edge of the dryer front panel'],
 ['door-after',1200,1600,'Inside bottom edge of the dryer front panel after cleaning'],
 ['assembled',1200,1600,'Samsung dryer reassembled following belt replacement, idler replacement and internal cleaning']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function samsungFishersBeltArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Service Call: The Drum Would Not Start',[
 'A customer in <strong>Fishers, Indiana</strong>, contacted Alex Appliance Repair because their Samsung dryer would not begin drying. The complaint was that the drum would not start turning and the heated drying cycle would not begin.',
 'We opened the dryer and inspected the drive system. The <strong>drive belt was broken</strong>, and the idler pulley also required replacement. Lint was present inside the appliance. The completed work included a new belt, a new idler pulley and internal cleaning, including the blower wheel.'
 ])}
 ${row(1,'Verified Model: Samsung DVE45B6300P/A3',[
 'The original label identifies this electric dryer as <strong>Samsung DVE45B6300P/A3</strong>. The crop preserves the photographed model marking so readers can identify the appliance covered by this repair.',
 'When requesting service, share the dryer model and describe what happens when Start is pressed. A drum that does not turn is a useful detail to mention alongside whether the controls respond and whether a drying cycle begins.'
 ])}
 <section class="repair-story-section"><h2>A Broken, Fraying Drive Belt</h2>
 <p>The removed belt shows extensive damage: loose strands, split ribs and separated sections are visible in the service photographs. The technician confirmed that the belt was broken. A broken belt cannot transfer the motor’s movement to the drum, making the drive system a key finding in this no-start complaint.</p>
 ${pair(2,3)}
 <p>The repair addressed the belt and the idler pulley together. The pulley needed replacement during this visit; the job notes do not establish the original cause of the belt failure.</p></section>
 ${row(4,'Installing the New Idler Pulley',[
 'We installed a <strong>new idler pulley</strong>, the component that maintains tension in the drum drive belt. The photograph shows the replacement in position beside the motor with the drum removed.',
 'The idler is separate from the drum support rollers. The replacements documented in this repair were the drive belt and the idler pulley. The supplied assembly diagram in the overview shows those drive components as a reference.'
 ])}
 ${row(5,'Fitting the Replacement Drive Belt',[
 'A new drive belt was installed around the drum, and the drum was returned to the cabinet during reassembly. This photograph shows the belt around the drum while the dryer was still open.',
 'The customer’s report that heated drying would not begin was part of the same service request. The documented repair concerned the drive system; a no-start symptom alone does not establish a failed heating element.'
 ])}
 <section class="repair-story-section"><h2>Cleaning the Blower Wheel</h2>
 <p>With the dryer open, we removed accumulated lint and cleaned the blower wheel. The first photograph shows deposits on the wheel and around the housing opening. The second shows those areas after cleaning.</p>
 ${pair(6,7)}
 <p>The blower moves air through the dryer. Cleaning it was part of this service alongside the belt and tensioner replacement. These photographs document work inside the appliance.</p></section>
 <section class="repair-story-section"><h2>Removing Lint from the Front Air Passage</h2>
 <p>The removed front lint-duct housing also contained lint. Opening the assembly made the deposits accessible for cleaning. The paired photographs show the same area before and after the accumulated material was removed.</p>
 ${pair(8,9)}
 <p>The internal cleanup covered the accessible dryer components. The work described here concerns the appliance interior and its accessible air passages.</p></section>
 <section class="repair-story-section"><h2>Cleaning Behind the Front Panel</h2>
 <p>Lint had collected along the inside bottom edge of the front panel as well. It was removed while the panel was off the dryer. This before-and-after pair records another part of the internal cleaning completed during the visit.</p>
 ${pair(10,11)}
 <p>Access for the drive repair made it possible to reach these hidden areas. The cleaning and component replacement were completed before the removed assemblies were put back in place.</p></section>
 ${row(12,'The Completed Repair',[
 'The dryer was reassembled following installation of the new drive belt and idler pulley. The service also included internal lint removal, blower-wheel cleaning and cleaning of the accessible front air passage and panel.',
 'The final photograph shows the assembled Samsung dryer at the Fishers service location. The earlier photographs document the damaged belt, replacement components and cleaning work that formed this repair.'
 ])}
 <section class="repair-story-section"><h2>Samsung Dryer No-Start Questions</h2>
 <h3>Can a broken belt stop the drum from turning?</h3><p>Yes. The belt transfers movement from the motor to the drum. This dryer had a confirmed broken belt, which was replaced during service.</p>
 <h3>What does the idler pulley do?</h3><p>It keeps tension on the drive belt. The idler pulley on this Samsung dryer needed replacement and was renewed with the belt.</p>
 <h3>Does a dryer that will not start always need a heating element?</h3><p>No. This job involved a broken belt and an idler pulley replacement. The appliance needs diagnosis before deciding which components require repair.</p>
 <h3>Was the blower cleaned?</h3><p>Yes. The blower wheel and accessible internal areas were cleaned, with the work documented in the before-and-after photographs.</p></section>
 <section class="repair-story-section"><h2>Samsung Dryer Repair in Fishers, Indiana</h2>
 <p>If your Samsung dryer drum will not turn or the drying cycle will not start, contact Alex Appliance Repair for <a href="/fishers/dryer-repair-services.html">dryer repair in Fishers</a>. Share the model and symptoms when requesting an appointment.</p>
 <p>Explore our <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair services</a>, <a href="/fishers.html">Fishers service coverage</a> and more <a href="/recent-work.html">repair stories with original service photographs</a>. Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or book service online.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Fishers</a></section>
 </article>`;
}
