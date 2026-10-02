const base='images/repair-cases/lg-fan-noblesville/';
export const lgFanStory={
 slug:'noblesville-lg-gr-l228nksm-freezer-fan-error',
 title:'LG Refrigerator Fan Motor Replacement',
 headline:'LG GR-L228NKSM Refrigerator Noise and E FF Error in Noblesville',
 cardTitle:'LG Refrigerator Noise and E FF Error: Noblesville Fan Repair',
 seoTitle:'LG Refrigerator E FF Fan Repair in Noblesville | Alex Repair',
 description:'LG GR-L228NKSM refrigerator noise and E FF error in Noblesville, IN. See fan motor testing, replacement, reassembly and checks with original service photos.',
 city:'noblesville',appliance:'refrigerator',published:'2026-10-02',modified:'2026-10-02',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A noisy LG GR-L228NKSM (ASBCNA0) refrigerator in Noblesville displayed an E FF error. We tested the fan motor with a diagnostic instrument, replaced the motor, reassembled the refrigerator and checked its operation.',
 overviewEntries:[
  {label:'Location',value:'Noblesville, Indiana'},
  {label:'Appliance',value:'LG French-door refrigerator with bottom freezer'},
  {label:'Model',value:'GR-L228NKSM (ASBCNA0)'},
  {label:'Complaint',value:'Refrigerator making noise'},
  {label:'Display',value:'FF and E shown on the control panel (E FF)'},
  {label:'Diagnosis',value:'Fan motor checked with a diagnostic tester'},
  {label:'Repair',value:'Fan motor replacement'},
  {label:'Completion',value:'Refrigerator reassembled and checked after replacement'}
 ],
 photos:[
  ['lg-refrigerator-noise',1200,1600,'LG refrigerator displaying a fan error during the Noblesville service visit'],
  ['ff-e-error-display',1200,1600,'Close-up of the control panel showing FF on the left and E on the right'],
  ['fan-motor-diagnostic-tester',1400,1050,'Diagnostic tester connected to the removed freezer fan assembly during motor testing'],
  ['freezer-evaporator-access',1400,1050,'Freezer evaporator exposed with the rear fan panel removed for service'],
  ['eau65058511-motor-label',1200,1600,'Fan motor label showing EAU65058511 and the DC 12V rating'],
  ['fan-motor-replacement',1400,1050,'Fan motor in the mounting frame beside a separate motor during replacement'],
  ['freezer-panel-reinstalled',1400,1050,'Rear freezer panel reinstalled during refrigerator reassembly'],
  ['refrigerator-display-check',1200,1600,'Control panel showing temperature settings instead of the FF and E message during the visit']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'freezer-fan-reference-diagram.webp',width:1107,height:1600,caption:'Supplied LG reference diagram highlighting the freezer fan motor location'}
};

export function lgFanArticle(c,image,esc){
 const figure=i=>`<figure class="lg-fan-photo" style="--photo-max:${520*c.photos[i].width/c.photos[i].height}px"><a class="gallery-item" href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Service Call: A Noisy LG Refrigerator',[
 'A customer in <strong>Noblesville, Indiana</strong> called Alex Appliance Repair because the refrigerator was making noise. The appliance was an <strong>LG GR-L228NKSM (ASBCNA0)</strong>, a French-door refrigerator with a bottom freezer.',
 'During the service visit, we inspected the refrigerator and checked its fan motor with a diagnostic instrument. The photographs document the error display, access to the freezer fan assembly, motor testing and replacement.'
 ])}
 ${row(1,'The Display Showed an E FF Fan Error',[
 'The control-panel photograph shows <strong>FF</strong> in the freezer display and <strong>E</strong> in the refrigerator display. Together, these indicate the <strong>E FF error</strong>. Recording the message alongside the noise complaint helped document the condition we were called to inspect.',
 'LG identifies FF as a freezer-fan error. The code helps direct the inspection, but does not by itself establish which repair is needed. See <a href="https://www.lg.com/us/support/help-library/lg-refrigerator-troubleshooting-an-e-ff-or-e-rf-error-code--20153150964030">LG\'s E FF and E rF error guidance</a>. For this service call, we went on to test the motor before replacing it.'
 ])}
 ${row(2,'Checking the Motor With a Diagnostic Tester',[
 'We checked the fan motor using the diagnostic tester shown beside the removed freezer panel. The photograph shows the instrument, adapter leads and fan assembly used during the visit.',
 'Testing the motor added a direct component check to the information on the refrigerator display. Following the inspection and testing, we replaced the fan motor rather than treating the error message alone as a complete diagnosis.'
 ])}
 ${row(3,'Accessing the Freezer Fan Assembly',[
 'With the rear panel removed, the freezer evaporator and the connections behind the panel were accessible. The fan components are mounted on the panel assembly, shown separately in the testing and replacement photographs.',
 'The diagram in the visit overview is supplied reference artwork showing the fan location. The service photographs show the actual refrigerator and components worked on in Noblesville.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Fan Motor</h2><p>We replaced the fan motor after checking it. The close-up label identifies the photographed motor as <strong>EAU65058511</strong>. The adjacent photograph shows the motor mounting area and a separate motor during the replacement work.</p><p>The component number documents this repair; it is not a blanket compatibility recommendation for other LG refrigerators. The complete model and production version should be checked when identifying a replacement part.</p><div class="case-photo-grid lg-fan-pair">${figure(4)}${figure(5)}</div></section>
 ${row(6,'Reassembly and Post-Replacement Checks',[
 'After replacing the motor, we checked the repair, reassembled the refrigerator and checked it again. The freezer panel was put back in place as part of the reassembly.',
 'The final check took place after reassembly, not just with the fan assembly removed from the appliance. Checking the refrigerator again was the last step in completing this Noblesville service visit.'
 ])}
 ${row(7,'Documenting the Display During the Visit',[
 'Another service photograph shows the control panel displaying temperature settings instead of the FF and E message. These displayed settings are not independent measurements of the food-compartment temperatures.',
 'Together, the photographs document the displayed fault, hands-on motor testing, replacement and reassembly. We checked the refrigerator after the work was completed.'
 ])}
 <section class="repair-story-section"><h2>LG Refrigerator Repair in Noblesville</h2><p>If your refrigerator is making an unusual noise or displaying an error, share the full model number and a photograph of the display when booking service. Those details help us prepare for the visit.</p><p>Explore our <a href="/noblesville/refrigerator-repair-services.html">refrigerator repair in Noblesville</a>, <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a> and <a href="/recent-work.html">recent repair stories</a>. Alex Appliance Repair is an independent service provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator repair</a></section>
 </article>`;
}
