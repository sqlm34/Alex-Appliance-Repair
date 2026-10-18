const base='images/repair-cases/lg-ice-light-mccordsville/';
export const lgIceStory={
 slug:'mccordsville-lg-lfxc24726s-ice-maker-leak-light-repair',
 title:'LG Refrigerator Ice Maker Leak and Light Repair',
 headline:'LG LFXC24726S Ice Maker Leak and Light Repair in McCordsville',
 cardTitle:'LG Ice Maker Leak and Door Light Repair in McCordsville',
 seoTitle:'LG LFXC24726S Ice Maker Leak Repair | McCordsville, IN',
 description:'LG LFXC24726S/02 repair in McCordsville, IN: leaking water valve, ice buildup behind the bin, ice maker and LED replacement, plus right-hinge wiring repair.',
 city:'mccordsville',appliance:'refrigerator',published:'2026-10-18',modified:'2026-10-18',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'Ice was building up behind and beneath the in-door ice bin on this LG refrigerator in McCordsville. We replaced the leaking water valve and ice maker, replaced the light under the right door, and repaired damaged wiring at the upper right hinge.',
 overviewEntries:[
  {label:'Location',value:'McCordsville, Indiana'},
  {label:'Appliance',value:'LG French-door refrigerator'},
  {label:'Model',value:'LFXC24726S/02'},
  {label:'Ice concern',value:'Heavy ice behind and under the in-door ice bin'},
  {label:'Leak cause',value:'Water valve not sealing closed'},
  {label:'Lighting concern',value:'Light under right door did not turn on when freezer opened'},
  {label:'Parts replaced',value:'Water valve, ice maker and LED light'},
  {label:'Wiring repair',value:'Chafed and broken wires at upper right door hinge'}
 ],
 overviewImages:[
  ['valve-diagram',1439,1800,'LG refrigerator diagram with the water valve highlighted'],
  ['ice-maker-diagram',1600,1573,'LG in-door ice-maker assembly diagram'],
  ['light-diagram',1429,1800,'LG door assembly diagram with the LED light highlighted']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 photos:[
  ['refrigerator',1200,1600,'LG French-door refrigerator serviced in McCordsville, Indiana'],
  ['model-label',475,180,'Original LG model label identifying LFXC24726S/02'],
  ['ice-behind-connector',1200,1600,'Ice buildup around the connector behind the in-door ice-maker assembly'],
  ['ice-behind-assembly',1200,1600,'Ice on the back of the removed ice-maker compartment assembly'],
  ['rear-valve-access',1200,1600,'Rear access to the refrigerator water inlet valve and supply connection'],
  ['old-and-new-valves',1200,1600,'Removed water valve beside the replacement valve during the McCordsville repair'],
  ['empty-ice-compartment',1200,1600,'In-door ice compartment with the assembly removed for service'],
  ['ice-maker-replacement',1200,1600,'Ice-maker assembly during replacement'],
  ['installed-ice-maker',1200,1600,'Replacement ice maker installed in the LG refrigerator door'],
  ['unlit-door-light',1200,1600,'Unlit LED beneath the right refrigerator door with the lens removed'],
  ['removed-led',1200,1600,'LED light removed from its mounting opening beneath the right door'],
  ['replacement-led',1600,1200,'Replacement LED light prepared for installation'],
  ['right-hinge-wiring-repair',1200,1600,'Wiring repair in progress at the upper right refrigerator door hinge']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function lgIceArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Two Concerns on One LG Refrigerator Service Visit',[
  'This <strong>LG refrigerator repair in McCordsville, Indiana</strong> involved two distinct problems. The homeowner reported heavy ice behind and underneath the ice bin inside the door-mounted ice-maker compartment. The light beneath the right refrigerator door also stayed off when the freezer was opened.',
  'The water-side repair involved a leaking valve and replacement of the ice maker. The lighting repair involved both a new LED light and damaged wiring at the upper right door hinge. Treating these as separate concerns kept the diagnosis focused on the parts and connections involved in each symptom.'
 ])}
 ${row(1,'Model Confirmed: LG LFXC24726S/02',[
  'The original appliance label identifies this refrigerator as <strong>LG LFXC24726S/02</strong>. The model-number area is shown here from the service photograph.',
  'This repair record covers the refrigerator photographed at the McCordsville home. Its in-door ice maker, water valve, underside door light and hinge wiring are documented below.'
 ])}
 <section class="repair-story-section"><h2>Ice Behind and Under the In-Door Ice Bin</h2><p>The reported buildup was not simply loose ice inside the storage bin. Ice had accumulated behind the bin and beneath it, against the compartment wall. Removing the assembly exposed additional ice around the rear connector area and on the back of the assembly.</p>${pair(2,3)}<p>On this refrigerator, the diagnosed source of the leak was a water valve that was not sealing closed. The valve allowed unwanted water flow instead of stopping it as intended. The repair addressed that source rather than only removing the visible ice.</p></section>
 ${row(4,'Accessing the Water Valve',[
  'The water valve was reached at the rear of the refrigerator. The photograph shows the service access area and water connection during the job.',
  'The confirmed finding for this visit was a valve that did not hold water back properly. Ice accumulation alone does not establish the same diagnosis on every refrigerator; a similar symptom still needs inspection of the appliance involved.'
 ])}
 ${row(5,'Replacing the Leaking Water Valve',[
  'We replaced the water valve with a new assembly. The removed and replacement valves are shown together in the service photograph.',
  'Replacing the ice maker alone would not address a separately identified valve leak. Both the water valve and the ice maker were replaced during this service visit.'
 ])}
 <section class="repair-story-section"><h2>Removing the Ice-Maker Assembly</h2><p>The door compartment was opened and the ice-maker assembly removed for service. These photographs show the exposed compartment and the assembly during replacement, providing a closer view of the area hidden behind the ice bin.</p>${pair(6,7)}</section>
 ${row(8,'Installing the Replacement Ice Maker',[
  'A new ice maker was installed in the refrigerator door. The photograph shows the replacement in position with the storage bin removed.',
  'This completed the component replacements for the ice-compartment portion of the job: the leaking water valve and the ice maker. The separate lighting concern required attention on the right-hand door.'
 ])}
 ${row(9,'The Light Under the Right Door Would Not Turn On',[
  'The second complaint concerned the light located underneath the right refrigerator door. It did not illuminate when the freezer was opened. The photograph shows the unlit LED with its clear cover removed.',
  'We replaced this LED light. However, the lighting problem also involved damaged wiring at the top of the same right-hand door, so the work did not stop at replacing the lamp.'
 ])}
 <section class="repair-story-section"><h2>Replacing the LED Light</h2><p>The original LED was removed from the underside of the door and replaced. The photographs show the removed light and the replacement prepared for installation.</p>${pair(10,11)}</section>
 ${row(12,'Repairing Broken Wiring at the Upper Right Hinge',[
  'Chafed wiring and an open wire connection were found at the <strong>upper right door hinge</strong>. We repaired the damaged wires as part of the lighting repair.',
  'The photograph documents the wiring work with the hinge cover open. It shows the repair in progress, not a finished view with the cover reinstalled. This was an additional electrical repair alongside the LED replacement.'
 ])}
 <section class="repair-story-section"><h2>Work Completed During This Visit</h2><ul><li>Replaced the water valve that was not sealing closed.</li><li>Replaced the in-door ice maker.</li><li>Replaced the LED light under the right refrigerator door.</li><li>Repaired chafed and broken wiring at the upper right door hinge.</li></ul><p>The service addressed both the ice-compartment leak and the components involved in the lighting complaint. The original photographs document the affected areas, replacement parts and wiring work.</p></section>
 <section class="repair-story-section"><h2>Questions About This LG Refrigerator Repair</h2>
 <h3>What caused ice to build up behind the bin?</h3><p>For this LFXC24726S/02, the technician identified a water valve that was not sealing closed and was allowing leakage. The valve was replaced.</p>
 <h3>Was only the ice maker replaced?</h3><p>No. The water valve and ice maker were both replaced. The visit also included an LED light replacement and right-hinge wiring repair.</p>
 <h3>Why did the light repair involve the door hinge?</h3><p>In addition to the light itself, chafed and broken wires were found at the upper right hinge. Those wires needed repair as part of addressing the lighting complaint.</p>
 <h3>Does the same ice buildup always mean a bad valve?</h3><p>This article records the diagnosis on one refrigerator. Similar-looking ice buildup on another appliance needs its own inspection before a valve or ice maker is recommended.</p></section>
 <section class="repair-story-section"><h2>LG Refrigerator Repair in McCordsville, Indiana</h2><p>For ice buildup around an in-door ice maker, a water leak or a refrigerator lighting problem, contact Alex Appliance Repair for <a href="/mccordsville/refrigerator-repair-services.html">refrigerator repair in McCordsville</a>. Share the full model number and describe where the ice or water appears, or which light is not working.</p><p>See our <a href="/refrigerator-repair.html">refrigerator repair services</a>, <a href="/mccordsville.html">McCordsville service coverage</a> and more <a href="/recent-work.html">repair stories with original photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your refrigerator.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator repair in McCordsville</a></section>
 </article>`;
}
