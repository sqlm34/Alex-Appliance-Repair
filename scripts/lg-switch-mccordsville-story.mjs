const base='images/repair-cases/lg-switch-mccordsville/';
export const lgSwitchStory={
 slug:'mccordsville-lg-lde4413st-burner-stays-on-high',
 title:'LG Range Burner Control Switch Replacement',
 headline:'LG LDE4413ST Burner Stays on High: McCordsville Repair',
 cardTitle:'LG Burner Too Hot on Low: Switch Repair in McCordsville',
 seoTitle:'LG Burner Stays on High Repair in McCordsville | Alex Repair',
 description:'LG LDE4413ST burner heated on high at the lowest setting. See our McCordsville, IN switch replacement, service photos and successful post-repair testing.',
 city:'mccordsville',appliance:'range',published:'2026-10-01',modified:'2026-10-01',
 summary:'An LG LDE4413ST range in McCordsville heated at maximum even on the lowest burner setting. Diagnosis identified a faulty control switch. Replacing it restored normal heat regulation, confirmed during post-repair testing.',
 overviewEntries:[
  {label:'Location',value:'McCordsville, Indiana'},
  {label:'Appliance',value:'LG electric range with glass cooktop and double oven'},
  {label:'Model',value:'LDE4413ST'},
  {label:'Reported problem',value:'Cooktop burner heated on high at the lowest setting'},
  {label:'Diagnosis',value:'Faulty surface-element control switch'},
  {label:'Repair',value:'Replaced the affected burner control switch'},
  {label:'Result',value:'Normal heat regulation restored and range checked after repair'}
 ],
 photos:[
  ['lg-lde4413st-range',1080,1440,'LG LDE4413ST electric range serviced for excessive burner heat in McCordsville, Indiana'],
  ['front-control-panel-open',1200,1600,'Front control panel opened to access the cooktop burner switches during the LG range repair'],
  ['surface-element-switches',1200,1600,'Surface-element control switches and wiring visible behind the front knob panel'],
  ['removed-switch',1200,1600,'Removed burner control switch photographed on the work surface during service'],
  ['replacement-switch-in-package',1400,1050,'Original switch beside the packaged replacement during the McCordsville service visit'],
  ['radiant-element-heating',1200,1600,'Radiant cooktop element glowing during an operating check on the LG range']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'switch-location-diagram.webp',width:1123,height:1600,caption:'Supplied reference diagram highlighting a surface-element control switch behind the LG range front panel'}
};

export function lgSwitchArticle(c,image,esc){
 const figure=i=>`<figure><a class="gallery-item" href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure>`;
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a class="gallery-item" href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 return `<article class="case-body editorial-story">
 ${row(0,'The Problem: Maximum Heat on the Lowest Setting',[
 'A customer in <strong>McCordsville, Indiana</strong> contacted Alex Appliance Repair about a burner on an <strong>LG LDE4413ST electric range</strong>. Turning the control down to its lowest setting did not bring the heat down as expected. Instead, the cooking element continued heating as though it were set to maximum.',
 'The customer described a failure to cycle properly at low heat: the expected periods of heating followed by pauses were not providing normal control. The complaint concerned a surface burner on the glass cooktop, rather than an oven temperature problem. We visited the home to check the range and identify the fault.'
 ])}
 ${row(1,'Diagnosis Behind the Front Control Panel',[
 'Inspection and testing identified a <strong>faulty burner control switch</strong>. The service photograph shows the front panel opened, exposing the switches behind the control knobs. This provided access to the component responsible for the affected burner.',
 'The important distinction in this case was that the element could produce heat, but the selected low setting was not being regulated correctly. Diagnosis pointed to the switch, so that was the component replaced. The repair did not call for replacing the glass cooking surface or the oven controls.'
 ])}
 ${row(2,'The Switch Behind the Burner Knob',[
 'The close-up shows the control components and their connections inside the front panel. The supplied diagram in the visit overview gives a separate reference view of the switch location. The diagram is reference artwork; the photographs in the article document the actual service visit.',
 'For this LG LDE4413ST, the failed switch was the source of the reported heat-control problem. A burner that stays too hot on low should be diagnosed on its own merits: this repair is an example of a confirmed switch fault, not a parts recommendation for every range with a similar symptom.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Faulty Burner Control Switch</h2><p>We removed the faulty switch and installed its replacement. The first photograph shows the removed component on the work surface. The second shows the original switch beside the replacement in its packaging during the repair. These views document the part involved and the work inside the control panel.</p><p>Only the affected burner switch was replaced for this complaint. Once the replacement was fitted, we checked the operation of the range to confirm that the original problem had been resolved.</p><div class="case-photo-grid">${figure(3)}${figure(4)}</div></section>
 ${row(5,'After Repair: Normal Heat Control Restored',[
 '<strong>The switch replacement resolved the problem.</strong> During the post-repair check, the burner responded normally to the control setting rather than continuing to heat at maximum on low. Normal heat regulation and cycling were restored, and the range was checked after the repair.',
 'The photograph shows the radiant element producing heat during an operating check. A still image captures only one moment; the successful result was confirmed by observing the burner\'s operation during testing. This completed the service visit for the customer in McCordsville.'
 ])}
 <section class="repair-story-section"><h2>LG Range Repair in McCordsville, Indiana</h2><p>Does your stove burner stay on high even when the knob is turned down? When requesting service, tell us which burner is affected, what happens at the low setting, and the appliance model number. That information helps us prepare for an inspection of the range and its controls.</p><p>Learn about our <a href="/mccordsville/stove-repair-services.html">stove and range repair in McCordsville</a>, explore <a href="/mccordsville.html">local appliance repair services</a>, or browse more <a href="/recent-work.html">repair stories with original service photographs</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book range repair</a></section>
 </article>`.replaceAll('cafe-story-row cafe-story-row--','cafe-story-row lg-switch-row cafe-story-row--');
}
