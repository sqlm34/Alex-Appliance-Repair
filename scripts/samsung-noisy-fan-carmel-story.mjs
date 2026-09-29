const base='images/repair-cases/samsung-fan-carmel/';
export const carmelFridgeStory={
 slug:'carmel-samsung-rf260beaesr-fan-noise-defrost-drain',
 title:'Samsung Refrigerator Fan Noise Repair',
 headline:'Samsung RF260BEAESR Fan Noise Repair in Carmel',
 cardTitle:'Samsung Fan Noise Stops When Doors Open: Carmel Repair',
 seoTitle:'Samsung Refrigerator Fan Noise Repair in Carmel, IN | Alex Repair',
 description:'Samsung RF260BEAESR/AA fan noise in Carmel, IN: evaporator ice removal, drain cleaning, fan and sensor replacement, and an additional heater tested in defrost.',
 city:'carmel',appliance:'refrigerator',published:'2026-09-29',modified:'2026-09-29',
 summary:'A Samsung refrigerator in Carmel made fan noise that stopped when the doors opened. Service addressed evaporator and drain ice, included a new fan and temperature sensor, and added a flexible heater verified during forced defrost.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'Samsung French-door refrigerator'},
  {label:'Model',value:'RF260BEAESR/AA'},
  {label:'Reported problem',value:'Fan noise stopped when the doors opened'},
  {label:'Findings',value:'Ice buildup at the fresh-food evaporator and drain line'},
  {label:'Work completed',value:'Defrosting, drain cleaning from inside and rear, new fan and temperature sensor, additional flexible heater'},
  {label:'Verified test',value:'Additional heater operated together with the existing heater during forced defrost'}
 ],
 photos:[
  ['samsung-refrigerator',1200,1600,'Samsung RF260BEAESR/AA refrigerator serviced for fan noise in Carmel, Indiana'],
  ['fresh-food-cover',1200,1600,'Fresh-food compartment with shelves removed and the rear evaporator cover still in place'],
  ['evaporator-ice-buildup',1200,1600,'Exposed fresh-food evaporator with frost and a large ice buildup around the upper tubing'],
  ['ice-around-upper-tubing',1400,1050,'Close view of the ice surrounding tubing and connections above the evaporator'],
  ['rear-service-access',1200,1600,'Lower rear compartment opened to access the refrigerator drain tubes'],
  ['rear-drain-tubes',1400,1050,'Rear drain tubes beside the condenser, accessed for removal and cleaning during this visit'],
  ['additional-flexible-heater',1400,1050,'Additional flexible heater installed along the upper tubing during service; frost remains visible at this stage'],
  ['existing-defrost-heater',1400,1050,'Existing defrost heating element below the evaporator, retained alongside the additional heater'],
  ['temperature-sensors',1200,1600,'Temperature sensors on the work surface during service; one temperature sensor was replaced on this refrigerator'],
  ['original-and-replacement-fans',1400,1050,'Original fan in the removed cover beside the new replacement evaporator fan'],
  ['replacement-fan-mounted',1200,1600,'Replacement fresh-food evaporator fan mounted in the cover during the repair'],
  ['fresh-food-service',1200,1600,'Fresh-food compartment during service with the evaporator exposed and tools on a protective towel'],
  ['rf260beaesr-model-label',535,384,'Refrigerator identification sticker showing Samsung model RF260BEAESR and full code RF260BEAESR/AA']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'fan-sensor-reference.webp',width:1000,height:1488,caption:'Supplied reference illustration highlighting the evaporator cover, fan and temperature sensor; not a service photograph'}
};

export function carmelFridgeArticle(c,image,esc){
 const figure=i=>`<figure><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 const pair=(a,b,heading,text)=>`<section class="repair-story-section"><h2>${heading}</h2><p>${text}</p><div class="case-photo-grid">${figure(a)}${figure(b)}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Complaint: Fan Noise That Stopped When the Doors Opened',[
 'A homeowner in <strong>Carmel, Indiana</strong> contacted Alex Appliance Repair because their Samsung refrigerator was making a fan noise. The distinctive detail was that <strong>the noise disappeared when the refrigerator doors were opened</strong>. We visited the home to diagnose the appliance rather than selecting a replacement part from the symptom alone.',
 'The identification label confirmed model <strong>Samsung RF260BEAESR/AA</strong>. This repair focused on the fresh-food compartment: the refrigerator section above the freezer drawer. The photographs below document the actual service visit, with a separate component reference illustration in the overview.'
 ])}
 ${row(12,'Model Confirmed: RF260BEAESR/AA',['This close-up from the refrigerator identification sticker records model RF260BEAESR and the full code <strong>RF260BEAESR/AA</strong> used for this service visit. Checking the appliance label helps identify the correct configuration when selecting replacement components.'])}
 ${row(1,'Inspecting Behind the Fresh-Food Rear Cover',[
 'We removed the shelves and opened the rear interior cover to inspect the evaporator area. Diagnosis revealed <strong>ice buildup at the evaporator coil and in the drain line</strong>. The upper tubing area also carried a substantial accumulation of ice, visible in the close-up photographs.',
 'The customer\'s description helped focus the inspection on the fresh-food fan area, but the repair needed to address more than the noise alone. The evaporator, drainage path, temperature sensor and fan were all part of the work completed during this visit.'
 ])}
 ${pair(2,3,'Evaporator Ice: What We Found','With the cover removed, we could see frost on the coil and a large block of ice above it. These photographs show the condition encountered during diagnosis. We thawed the evaporator and removed all accumulated ice before completing the repair. That gave us access to the affected drain area and the components being serviced.')}
 ${pair(4,5,'Clearing the Drain From Inside and Behind the Refrigerator','We cleaned the drain line from inside the fresh-food compartment, then accessed the lower rear compartment. The rear drain tubes were removed and cleaned from that side as well. This addressed the drainage path from both access points, not just the visible ice inside the cabinet. The photographs show the rear service opening and the drain tubes beside the condenser; the tubes are pictured in their installed positions.')}
 ${pair(6,7,'Adding a Flexible Heater Alongside the Existing Defrost Heater','An additional flexible heating element was installed as part of this repair. The installation photograph shows its position along the upper tubing during service; frost is still visible at that stage of the work. The second image shows the existing defrost heating element below the coil. The new flexible heater was an addition, not a replacement for that original heating element. Its operation was checked during the forced-defrost test described below.')}
 ${row(8,'Replacing the Temperature Sensor',[
 'We replaced the temperature sensor as part of the fresh-food evaporator service. The work-surface photograph shows several sensor components available during the visit; <strong>one temperature sensor was replaced in this refrigerator</strong>.',
 'The overview illustration helps locate the fan and sensor relative to the interior cover. It is a supplied reference image, while the repair photographs show the actual appliance. Part selection for another Samsung refrigerator requires checking its exact model and configuration.'
 ])}
 ${pair(9,10,'Replacing the Fresh-Food Evaporator Fan','The fresh-food evaporator fan was replaced with a new unit. In the comparison photograph, the original fan is still in the removed cover and the replacement is beside it. The next image shows the new fan mounted during the repair. This was the fan serving the refrigerator compartment, not the condenser fan in the lower rear machinery compartment.')}
 ${row(11,'Forced-Defrost Test: Both Heaters Operating Together',[
 'After the component work, we checked the system in test mode and activated a <strong>forced defrost cycle</strong>. This confirmed that <strong>the additional flexible heater operated at the same time as the existing defrost heating element</strong>. That operating check was an important part of verifying the installation.',
 'The completed work included thawing the ice, cleaning the drain from the interior and rear, replacing the temperature sensor and evaporator fan, and installing and testing the additional heater. The photograph records the service setup; it is not a display of a measured temperature or a test-mode reading.'
 ])}
 <section class="repair-story-section"><h2>Does Your Samsung Refrigerator Make Noise Until You Open the Door?</h2><p>Tell us when the sound occurs, whether opening the doors stops it, and whether you have noticed ice or water inside the refrigerator. Include the model number when requesting service. Those details help us prepare for a diagnosis, but a similar noise does not automatically mean another refrigerator needs the same repairs.</p><p>For <a href="/carmel/refrigerator-repair-services.html">refrigerator repair in Carmel</a>, Alex Appliance Repair can inspect the appliance and explain the findings. Explore our <a href="/carmel.html">Carmel appliance repair services</a> or browse more <a href="/recent-work.html">real repair stories</a>. Alex Appliance Repair is an independent service provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator service</a></section>
 </article>`;
}
