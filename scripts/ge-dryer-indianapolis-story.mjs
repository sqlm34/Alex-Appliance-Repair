const base='images/repair-cases/ge-dryer-indianapolis/';
export const geDryerStory={
 slug:'north-indianapolis-ge-gfdn110el0ww-dryer-belt-thermostat',
 title:'GE Dryer Belt, Thermostat and Drum Slide Repair',
 headline:'GE GFDN110EL0WW Dryer Repair on the North Side of Indianapolis',
 cardTitle:'GE Dryer Would Not Start: Repair in Northern Indianapolis',
 seoTitle:'GE GFDN110EL0WW Dryer Repair in Indianapolis | Alex Repair',
 description:'GE dryer would not start in northern Indianapolis. See before-and-after lint cleaning, broken belt repair, thermostat and drum slide replacement, and testing.',
 city:'indianapolis',appliance:'dryer',published:'2026-09-28',modified:'2026-09-28',
 summary:'A GE GFDN110EL0WW dryer on the north side of Indianapolis would not start. We found a broken belt, a failed thermostat and heavy internal lint buildup. Cleaning and replacement of the belt, thermostat and front drum slides restored heating and drum rotation.',
 overviewEntries:[
  {label:'Location',value:'North side of Indianapolis, Indiana'},
  {label:'Appliance',value:'GE electric dryer'},
  {label:'Model',value:'GFDN110EL0WW'},
  {label:'Reported problem',value:'Dryer would not start'},
  {label:'Findings',value:'Broken drive belt, failed thermostat and heavy internal lint buildup'},
  {label:'Work completed',value:'Internal cleaning; drive belt, thermostat and front drum slide replacement'},
  {label:'Final test',value:'Drum rotated and dryer heated properly'}
 ],
 photos:[
  ['ge-dryer',1200,1600,'GE GFDN110EL0WW dryer serviced on the north side of Indianapolis'],
  ['cabinet-before-cleaning',1200,1600,'Before: lint-covered cabinet with the drum removed and loose belt lying at the bottom'],
  ['cabinet-after-cleaning',1200,1600,'After: the same cabinet following removal of accumulated lint and debris'],
  ['front-panel-before-cleaning',1200,1600,'Before: thick lint buildup around the removed front panel and lower air passage'],
  ['front-panel-after-cleaning',1400,1050,'After: front panel with the heavy lint deposits removed; existing surface wear remains visible'],
  ['blower-before-cleaning',1200,1600,'Before: compacted lint and debris around the yellow blower wheel and its inlet'],
  ['blower-after-cleaning',1200,1600,'After: blower wheel opening cleared of the heavy lint accumulation'],
  ['heater-area-before-cleaning',1200,1600,'Before: dark compacted debris along the lower edge of the rear heater area'],
  ['heater-area-after-cleaning',1200,1600,'After: rear heater area with loose and compacted debris removed; staining remains'],
  ['thermostat-replacement',1200,1600,'Removed dryer thermostat beside the replacement component in its packaging'],
  ['front-drum-slides',1200,1600,'Close view of the slide surfaces on the upper front drum support during service'],
  ['new-belt-on-drum',1200,1600,'Replacement drive belt installed around the GE dryer drum'],
  ['installed-belt-routing',1200,1600,'Installed belt visible beside the drum and idler pulley during reassembly'],
  ['belt-reference-diagram',1400,1482,'Supplied reference diagram highlighting the drive belt and motor assembly, not a service photograph'],
  ['slide-bearing-reference-diagram',1357,1600,'Supplied reference diagram showing the front upper drum slides and their support'],
  ['thermostat-reference-diagram',1085,1600,'Supplied reference diagram locating a thermostat at the rear heater assembly']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'gfdn110el0ww-model-label.webp',width:1080,height:732,caption:'GE dryer identification label showing model GFDN110EL0WW'}
};

export function geDryerArticle(c,image,esc){
 const figure=i=>`<figure><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 const pair=(a,b,heading,text)=>`<section class="repair-story-section"><h2>${heading}</h2><p>${text}</p><div class="case-photo-grid">${figure(a)}${figure(b)}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Call: A GE Dryer Would Not Start',[
 'A customer on the <strong>north side of Indianapolis, Indiana</strong> called because their dryer would not start. This service visit involved a <strong>GE GFDN110EL0WW electric dryer</strong>, identified from the appliance label shown in the visit overview.',
 'After opening the dryer and removing the drum, we found a broken drive belt and far more lint than would be visible at the lint screen. Thick deposits had collected inside the cabinet, around the blower and behind the front panel. Diagnosis also identified a failed thermostat, and the front upper drum slides needed replacement.'
 ])}
 <section class="repair-story-section"><h2>Why the Belt Needed More Than a Simple Replacement</h2><p>The broken belt explained the loss of drum drive, but replacing it alone would have left the underlying condition unaddressed. During this visit, heavy internal contamination was identified as a contributor to resistance in the rotating assembly and belt wear. We therefore treated cleaning and inspection of the drum supports as part of the repair.</p><p>Repeated overloading with large amounts of wet laundry was also a <strong>possible contributing factor</strong>. That was a suspicion, not a confirmed history of how the customer had used the dryer. The confirmed findings were the broken belt, failed thermostat and extensive lint accumulation documented below.</p></section>
 ${pair(1,2,'Inside the Cabinet: Before and After Cleaning','With the drum removed, the extent of the buildup became clear. The before photograph shows lint across the cabinet floor, on the side wall and around the motor and blower housing, with the loose belt at the bottom. The matching after photograph shows the same interior after cleaning. Removing the debris exposed the metal surfaces and cleared the areas that had been hidden beneath accumulated lint.')}
 ${pair(3,4,'Front Panel: Removing the Thick Lint Deposits','The back of the front panel carried a particularly heavy layer of lint around the drum opening and lower air passage. We cleaned these areas while the panel was off the appliance. The after photograph shows the bulky deposits removed. Discoloration and existing wear are still visible: this was a functional cleaning and repair, not cosmetic restoration of the dryer.')}
 ${pair(5,6,'Blower Wheel: Clearing the Packed Debris','The close-up of the yellow blower wheel shows how tightly lint and debris had collected around the inlet. Cleaning the lint screen alone would not have reached this internal buildup. The second photograph records the opening after cleaning, with the wheel and individual blades much more clearly visible. These pictures document cleaning inside the dryer, rather than a separate whole-house exhaust-duct cleaning service.')}
 ${pair(7,8,'Rear Heater Area: Before and After','Dark, compacted debris had also gathered along the bottom of the rear heater area. We removed the accumulated material during the internal cleaning. The after view shows the same rear assembly without the heavy deposits at its lower edge. The photographs show remaining surface staining, and the work described here did not include replacement of the heater assembly.')}
 ${row(9,'Replacing the Failed Thermostat',[
 'The thermostat was found to be nonworking during diagnosis and was replaced as part of this repair. The job photograph shows the removed component alongside the replacement in its packaging.',
 'This was a separate finding from the broken drive belt. Both faults were addressed before the dryer was reassembled and tested. The final operating check confirmed heating as well as drum rotation.'
 ])}
 ${row(10,'Replacing the Front Drum Slide Bearings',[
 'The upper portion of the front panel supports the drum through small sliding bearing surfaces, often called drum slides or glides. We replaced these front support slides during the service visit.',
 'The close-up records the slide surfaces and their mounting positions on the curved support. Attention to these contact points was important alongside the new belt, so the repair addressed the drum support rather than only replacing the part that had broken.'
 ])}
 ${pair(11,12,'Installing the New Drive Belt','After cleaning and component replacement, the drum was reinstalled with a new drive belt. The first photograph shows the replacement belt around the drum. The second shows the installed belt beside the drum and idler pulley during reassembly. These are photographs of the actual repair, documenting the installation before the cabinet was closed.')}
 <section class="repair-story-section"><h2>Component Reference Diagrams</h2><p>The supplied diagrams below help identify the three component groups discussed in this repair: the drive belt, front drum slides and thermostat. They are reference illustrations, separate from the original before-and-after service photographs above. Replacement parts must be matched to the exact appliance model; these illustrations are not a universal parts guide for all GE dryers.</p><div class="case-photo-grid">${figure(13)}${figure(14)}${figure(15)}</div></section>
 <section class="repair-story-section"><h2>Final Test: Heating and Drum Rotation Restored</h2><p>After reassembly, we tested the dryer. <strong>The drum rotated and the dryer heated properly.</strong> Internal cleaning, a new belt, a replacement thermostat and new front drum slides brought this GE dryer back into operation. The work was completed and the customer was pleased with the result.</p><p>The visit is a useful example of why a no-start complaint needs diagnosis of the appliance as a whole. In this case, the broken belt was only one part of the work: accumulated lint and the additional component faults also needed attention.</p></section>
 <section class="repair-story-section"><h2>Dryer Repair in Northern Indianapolis</h2><p>When requesting service for a dryer that will not start or tumble, share its model number and describe the symptoms. A similar complaint on another dryer may have a different cause and requires its own diagnosis.</p><p>Learn about our <a href="/dryer-repair.html">dryer repair service</a>, check our <a href="/locations.html">service area</a>, or explore more <a href="/recent-work.html">repair stories with original photographs</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></section>
 </article>`;
}
