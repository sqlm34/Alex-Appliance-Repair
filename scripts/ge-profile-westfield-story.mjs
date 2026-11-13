const base='images/repair-cases/ge-profile-westfield/';
export const geProfileStory={
 slug:'westfield-ge-profile-ptd70ebst1ws-dryer-squeaking-drum-slides',
 title:'GE Profile Dryer Drum Bearing Slide Repair',headline:'GE Profile Dryer Squeaking Repair in Westfield, Indiana',
 seoTitle:'GE Profile Dryer Squeaking Repair in Westfield, IN',
 description:'GE Profile PTD70EBST1WS dryer repair in Westfield, Indiana: drum bearing slides replaced, shoelace tip removed, interior cleaned and successful testing.',
 city:'westfield',appliance:'dryer',published:'2026-11-13',modified:'2026-11-13',editorialStylesheet:'lg-fan-noblesville',
 summary:'A squeaking GE Profile PTD70EBST1WS dryer in Westfield needed attention to its drum support. We replaced the drum bearing slides, removed a shoelace tip, cleaned the interior and successfully tested the dryer after reassembly.',
 overviewEntries:[{label:'Location',value:'Westfield, Indiana'},{label:'Appliance',value:'GE Profile electric dryer'},{label:'Model',value:'PTD70EBST1WS'},{label:'Complaint',value:'Squeaking during operation'},{label:'Repair',value:'Drum bearing slide replacement'},{label:'Additional work',value:'Shoelace tip removal and internal cleaning'},{label:'Result',value:'Successful testing after reassembly'}],
 overviewImage:{src:base+'diagram.webp',width:1612,height:2200,caption:'Supplied GE dryer front-panel diagram highlighting the drum bearing slides and their mounting positions'},
 photos:[['dryer',1200,1600,'GE Profile dryer serviced for squeaking in Westfield, Indiana'],['model-label',335,45,'Original label confirming GE Profile model PTD70EBST1WS'],['front-panel',1200,1600,'Removed front panel exposing the dryer drum support'],['lint-detail',1200,1600,'Lint and debris on the inside of the front assembly before cleaning'],['lint-buildup',1600,1200,'Accumulated lint around the front assembly before internal cleaning'],['open-cabinet',1200,1600,'GE dryer cabinet with the drum removed during service'],['air-opening',1200,1600,'Lint visible inside the dryer air opening during inspection'],['new-slides',1200,1600,'Replacement drum bearing slides fitted to the curved front support'],['slide-closeup',1200,1600,'Close-up of a replacement drum slide seated in its mounting position'],['cleaned-front',1200,1600,'Front assembly during reassembly after cleaning and slide replacement'],['finished-dryer',1200,1600,'GE Profile dryer reassembled after the Westfield repair']].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function geProfileArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Squeaking GE Profile Dryer',[
 'A homeowner in <strong>Westfield, Indiana</strong>, reported a squeaking GE Profile dryer. The repair involved the drum bearing slides, the small contact surfaces fitted to the front drum support. The work also included removing a shoelace tip and cleaning accumulated lint and debris inside the appliance.',
 'We replaced the slides, completed the cleaning and reassembled the dryer before testing it. The final test was successful. The original service photographs below document the appliance, access to the front support, the internal buildup and the replacement slides. This article follows the work completed on this particular dryer.'
 ])}
 ${row(1,'Confirming the Dryer Model',[
 'The appliance label identifies this dryer as <strong>GE Profile PTD70EBST1WS</strong>. The cropped photograph preserves the original model lettering so the identification can be read alongside the repair details.',
 'The supplied exploded diagram in the visit overview shows the front-panel assembly and highlights the drum slides. It provides a reference for their position on the curved support. The diagram is separate from the service photographs; its numbered callouts identify positions in the illustration.'
 ])}
 ${row(2,'Opening the Front Drum Support',[
 'The front panel was removed to reach the drum support and the areas behind it. With the dryer opened, the slide mounting locations and the lint deposits were accessible for service. The photograph shows the inside face of the front assembly during that work.',
 'The repair addressed the drum bearing slides rather than treating the squeak as a diagnosis by itself. A similar sound in another dryer can require different work. For this GE Profile, slide replacement, removal of the foreign object and internal cleaning were the confirmed steps before reassembly.'
 ])}
 <section class="repair-story-section"><h2>Removing the Shoelace Tip and Cleaning the Interior</h2>
 <p>A shoelace tip was removed during the repair. We also cleaned accumulated lint and debris from the accessible interior. The photographs show the buildup around the front assembly before cleaning, including deposits that would not be reached by simply emptying the lint screen.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>The foreign-object removal and cleaning were completed alongside the slide replacement. These details are part of the same service visit: the work addressed both the drum contact surfaces and the material found inside the opened dryer.</p></section>
 <section class="repair-story-section"><h2>Access Inside the Dryer</h2>
 <p>Removing the drum exposed the cabinet interior. The second photograph shows lint in an air opening during inspection. These views help explain why internal cleaning was included in the repair and show the areas accessible while the appliance was disassembled.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(5,true)}${figure(6,true)}</div>
 <p>The cleaning described here was performed inside the dryer as part of this repair. After the work, the removed assemblies were returned to their operating positions for the final test.</p></section>
 <section class="repair-story-section"><h2>Replacing the Drum Bearing Slides</h2>
 <p>The replacement drum bearing slides were fitted to the front support. The wider photograph shows their positions around the curved assembly; the close-up shows a new slide seated in its mounting location. These are original photographs from the repair.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(7,true)}${figure(8,true)}</div>
 <p>The slides provide contact surfaces at the front of the rotating drum. The supplied diagram makes their location easier to compare with the actual assembly. The repair documented here was replacement of the slides, followed by reassembly and testing.</p></section>
 ${row(9,'Reassembling the Front Assembly',[
 'After the slide replacement, shoelace tip removal and cleaning, the front assembly was prepared for reassembly. The photograph records this stage of the work, with the drum-support area visible before the dryer was closed.',
 'Cleaning and component replacement were completed before the operating check. That sequence allowed the final test to evaluate the reassembled appliance after all of the reported repair steps had been performed.'
 ])}
 ${row(10,'Successful Testing After Repair',[
 'The dryer was reassembled and <strong>successfully tested after the repair</strong>. This completed the Westfield service visit for the original squeaking complaint.',
 'The finished-appliance photograph shows the GE Profile back together. The confirmed work was drum bearing slide replacement, removal of a shoelace tip and internal cleaning. The successful operating test was the final step before the repair was considered complete.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Dryer Repair</h2>
 <h3>What was replaced?</h3><p>The drum bearing slides on this GE Profile PTD70EBST1WS were replaced.</p>
 <h3>Was anything found inside the dryer?</h3><p>A shoelace tip was removed, and accumulated lint and debris were cleaned from the interior during service.</p>
 <h3>Was the dryer tested afterward?</h3><p>Yes. Testing after reassembly was successful.</p>
 <h3>Does every squeaking dryer need new slides?</h3><p>No. This repair applies to the diagnosed appliance in this story. A different dryer or noise source requires its own inspection.</p></section>
 <section class="repair-story-section"><h2>Dryer Repair in Westfield, Indiana</h2><p>For a dryer that squeaks or makes an unfamiliar noise, share the model number and describe when the sound occurs. Explore our <a href="/westfield/dryer-repair-services.html">dryer repair service in Westfield</a> and more <a href="/recent-work.html">repair stories with original photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer problem.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair</a></section>
 </article>`;
}

