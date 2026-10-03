const base='images/repair-cases/whirlpool-water-westfield/';
export const whirlpoolWaterStory={
 slug:'westfield-whirlpool-wrs588fihz00-water-leak-frozen-fill-tube',
 title:'Whirlpool Refrigerator Water Leak Repair',
 headline:'Whirlpool WRS588FIHZ00 Water Leak Repair in Westfield',
 cardTitle:'Whirlpool Water Leak and Frozen Ice Maker Fill Tube in Westfield',
 seoTitle:'Whirlpool Refrigerator Leak Repair in Westfield | Alex Repair',
 description:'Whirlpool WRS588FIHZ00 leaking water in Westfield, IN: frozen ice maker fill tube cleared, two water valves replaced and refrigerator checked for leaks.',
 city:'westfield',appliance:'refrigerator',published:'2026-10-03',modified:'2026-10-03',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A water leak inspection in Westfield, Indiana revealed a frozen ice maker fill tube in this Whirlpool refrigerator. We cleared the line, replaced both water valve assemblies and checked the reassembled appliance for leaks.',
 overviewEntries:[
  {label:'Location',value:'Westfield, Indiana'},
  {label:'Appliance',value:'Whirlpool side-by-side refrigerator'},
  {label:'Model',value:'WRS588FIHZ00, verified from the appliance label'},
  {label:'Complaint',value:'Water beneath the refrigerator and at the upper door seal'},
  {label:'Finding',value:'Ice-blocked fill tube and a water valve that was not sealing'},
  {label:'Repair',value:'Thaw and clear the line; replace both water valve assemblies'},
  {label:'Result',value:'Reassembled and checked for leaks; repair completed'}
 ],
 photos:[
  ['whirlpool-refrigerator',1200,1600,'Whirlpool side-by-side refrigerator serviced for a water leak in Westfield, Indiana'],
  ['wrs588fihz00-model-label',680,190,'Original appliance label crop confirming Whirlpool model WRS588FIHZ00'],
  ['ice-maker-removed',1200,1600,'Freezer door with the ice maker removed to access the fill tube'],
  ['frozen-ice-maker-fill-tube',1200,1600,'Ice buildup inside the ice maker fill tube during the leak inspection'],
  ['door-water-line-connections',1200,1600,'Water-line couplings at the bottom of the freezer door accessed during line clearing'],
  ['rear-water-lines',1200,1600,'Water tubing routed along the rear of the Whirlpool refrigerator'],
  ['two-water-valves-replacement',1200,1600,'Two replacement water valve assemblies beside the refrigerator service compartment'],
  ['water-valve-connections',1200,1600,'Rear valve assemblies and water connections during replacement work'],
  ['ice-maker-and-bin-cleaning',1400,1050,'Removed ice maker, ice bin and covers during cleaning and reassembly'],
  ['refrigerator-reassembled',1200,1600,'Whirlpool refrigerator reassembled for the final leak check in Westfield'],
  ['wpw10238100-valve-reference',1400,1072,'Supplied reference image of the WPW10238100 single-solenoid water valve'],
  ['wpw10341320-valve-reference',1400,1315,'Supplied reference image of the WPW10341320 dual-solenoid water valve assembly']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'water-valves-reference-diagram.webp',width:1138,height:1600,caption:'Reference parts diagram showing the two water valve assemblies for the Whirlpool refrigerator'}
};

export function whirlpoolWaterArticle(c,image,esc){
 const figure=i=>`<figure class="lg-fan-photo" style="--photo-max:${Math.min(c.photos[i].width,520*c.photos[i].width/c.photos[i].height)}px"><a class="gallery-item" href="/${c.photos[i].src}">${image(c.photos[i],i!==0).replace('<img ',`<img style="aspect-ratio:${c.photos[i].width}/${c.photos[i].height}" `)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'Water Under the Refrigerator and at the Door Seal',[
 'A homeowner in <strong>Westfield, Indiana</strong> called Alex Appliance Repair about water leaking beneath a Whirlpool refrigerator. The customer also noticed water along the seal at the top of the door. These two visible symptoms prompted an inspection of the water supply and the in-door ice maker.',
 'The repair involved more than drying the floor or clearing visible ice. We traced the problem to a frozen ice maker fill tube and a valve that was allowing water through when it should have been closed.'
 ])}
 ${row(1,'Model Confirmed: Whirlpool WRS588FIHZ00',[
 'The original appliance label identifies this refrigerator as <strong>Whirlpool WRS588FIHZ00</strong>. The close-up shown here is a crop of the actual label from the service visit.',
 'Recording the full model, including the final <strong>00</strong>, helps distinguish the appliance from other production versions when identifying parts. This was a side-by-side refrigerator with an ice and water dispenser in the freezer door.'
 ])}
 ${row(2,'Removing the Ice Maker to Inspect the Fill Tube',[
 'We removed the ice maker to inspect the water outlet above it. This outlet is commonly called the <strong>ice maker fill tube</strong> or fill spout: it directs incoming water into the ice maker during a fill cycle.',
 'With the assembly out of the way, we could inspect the outlet directly. The service photographs show the exposed door area and the ice obstructing the fill tube.'
 ])}
 ${row(3,'Why the Fill Tube Had Frozen',[
 'Our diagnosis was that the valve controlling water to the ice maker was not sealing completely. Water continued to seep into the fill tube between fill cycles, gradually collecting and freezing until the outlet became blocked.',
 'When the ice maker next called for water, the obstruction prevented normal filling. That blockage was consistent with the reported leakage at the door and below the refrigerator. The precise route the escaping water took inside the door was not confirmed.',
 'A frozen fill tube is a finding, not a universal diagnosis: other refrigerators can freeze for different reasons. <a href="https://www.whirlpool.com/blog/kitchen/ice-maker-troubleshooting.html">Whirlpool\'s ice maker troubleshooting guide</a> also discusses frozen inlet tubes and water-supply faults. In this case, clearing the ice needed to be paired with correcting the valve problem.'
 ])}
 ${row(4,'Thawing and Clearing the Water Line',[
 'We disconnected the affected line from the refrigerator water circuit, using the accessible connections at the bottom of the door. We then thawed and cleared the line with a steamer before reconnecting it.',
 'This work removed the ice restriction from the water path. The photograph shows the lower door connections accessed during the process; the steamer itself is not pictured. This was a technician-performed repair, not a recommendation to apply steam to an assembled refrigerator.'
 ])}
 ${row(5,'Inspecting the Supply Route Behind the Refrigerator',[
 'Access at the rear of the refrigerator exposed the water tubing and valve area. We worked on the water-supply components associated with the dispenser and ice maker while completing the line repair.',
 'The rear-view photograph documents the tubing route. It also provides context for the two valve assemblies shown in the replacement photographs below.'
 ])}
 ${row(6,'Replacing Both Water Valve Assemblies',[
 'We replaced <strong>both water valve assemblies</strong> in the dispenser and ice maker water-supply system. The service photograph shows the two replacement assemblies next to the open rear compartment.',
 'The supplied part references are <strong>WPW10238100</strong>, a single-solenoid valve, and <strong>WPW10341320</strong>, a dual-solenoid valve assembly. These are two separate assemblies, not simply two coils on one valve. Part selection should always be checked against the complete appliance model.'
 ])}
 <section class="repair-story-section"><h2>Water Valve Reference Images</h2><p>These supplied product images identify the valve assemblies associated with this repair. They are reference images, separate from the original service photographs.</p><div class="case-photo-grid lg-fan-pair">${figure(10)}${figure(11)}</div></section>
 ${row(7,'Reconnecting the Water System',[
 'After the line was cleared and the valves were replaced, we reconnected the water system and put the removed components back in reverse order. The valve-area photograph documents the connections during the work.',
 'Replacing the valves addressed the unwanted water flow identified during diagnosis, while clearing the fill tube removed the existing blockage. Both parts of the repair were necessary to address this service call.'
 ])}
 ${row(8,'Cleaning the Ice Bin and Reinstalling the Ice Maker',[
 'We cleaned the ice storage bin and reinstalled the ice maker, covers and related components. The countertop photograph shows the removed parts during this stage of the visit.',
 'The original ice maker was reinstalled. This repair did not involve replacing the complete ice maker or the door gasket: the work focused on the restricted fill line and the water valve assemblies.'
 ])}
 ${row(9,'Final Leak Check and Completed Repair',[
 'With the refrigerator reassembled, we checked it for water leaks. The repair was completed after clearing the line, replacing the valves and checking the system again.',
 'For this Westfield homeowner, the work addressed the source of unwanted water entering the ice maker line as well as the frozen obstruction. The final inspection was performed on the reassembled refrigerator, not only on the disconnected components.'
 ])}
 <section class="repair-story-section"><h2>Whirlpool Refrigerator Repair in Westfield, Indiana</h2><p>Water under a refrigerator or near its door does not automatically mean the door seal has failed. The water line, valves and ice maker fill path may need inspection before the correct repair can be identified.</p><p>For a similar problem, explore our <a href="/refrigerator-repair.html">refrigerator repair services</a>, <a href="/westfield.html">Westfield service coverage</a> and <a href="/brands.html">appliance brands we service, including Whirlpool</a>. Share your model number, where you see the water and when the leak occurs when booking.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. See more <a href="/recent-work.html">documented repair visits</a> or contact our team to schedule an inspection.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator repair</a></section>
 </article>`;
}
