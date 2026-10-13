const base='images/repair-cases/whirlpool-wtw5057-fishers/';
export const fishersWasherStory={
 slug:'fishers-whirlpool-wtw5057lw0-washer-not-spinning-capacitor-replacement',
 title:'Whirlpool Washer Capacitor Replacement',
 headline:'Whirlpool WTW5057LW0 Not Spinning or Agitating in Fishers: Capacitor Replacement',
 cardTitle:'Whirlpool Washer Not Spinning or Agitating in Fishers',
 seoTitle:'Whirlpool WTW5057LW0 Not Spinning | Washer Repair Fishers',
 description:'Whirlpool WTW5057LW0 washer not spinning or agitating in Fishers, IN: failed capacitor diagnosis, replacement photos, and Rinse and Spin and Wash Cycle testing.',
 city:'fishers',appliance:'washer',published:'2026-10-13',modified:'2026-10-13',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Fishers homeowner called because their Whirlpool washer would not spin or agitate. Diagnosis found a capacitor that had lost capacitance, preventing the drive motor from starting properly. We replaced it, reassembled the washer and verified operation with Rinse and Spin and a Wash Cycle.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Whirlpool top-load washing machine'},
  {label:'Model',value:'WTW5057LW0'},
  {label:'Customer concern',value:'Basket and agitator would not rotate'},
  {label:'Diagnosis',value:'Failed motor capacitor with lost capacitance'},
  {label:'Repair',value:'Capacitor replacement and washer reassembly'},
  {label:'Verification',value:'Rinse and Spin and Wash Cycle tested'},
  {label:'Result',value:'Spin and agitation restored'}
 ],
 photos:[
  ['whirlpool-washer',1200,1600,'Whirlpool WTW5057LW0 top-load washer at the Fishers service visit'],
  ['wtw5057lw0-model-label',412,82,'Original model-number label identifying this Whirlpool washer as WTW5057LW0'],
  ['capacitor-diagram',1470,1800,'Whirlpool WTW5057LW0 drive assembly diagram with capacitor item 7 highlighted'],
  ['drive-cover-before',1200,1600,'Protective drive cover before access to the washer motor and capacitor'],
  ['motor-and-belt',1200,1600,'Whirlpool washer drive motor, belt and pulley exposed during diagnosis'],
  ['original-capacitor',1200,1600,'Original motor capacitor mounted beside the washer drive pulley'],
  ['capacitor-access',1200,1600,'Original capacitor accessible beside the drive assembly with the lower pulley removed'],
  ['failed-capacitor-measured-zero',1200,1600,'Removed failed capacitor with the meter displaying 0.0 microfarads'],
  ['replacement-measured-50-1',1200,1600,'Replacement capacitor with the meter displaying 50.1 microfarads'],
  ['old-and-new-capacitors',1200,1600,'Removed capacitor on the left and replacement capacitor on the right'],
  ['replacement-packaging',1200,1600,'Capacitor and Whirlpool factory certified parts packaging from the service visit'],
  ['replacement-installed',1200,1600,'Replacement capacitor installed beside the Whirlpool washer drive assembly'],
  ['drive-cover-reinstalled',1200,1600,'Protective drive cover reinstalled before the washer was returned to operating position']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function fishersWasherArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==2).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(2,'Where the Capacitor Fits in the Whirlpool Drive System',[
  'The supplied <strong>WTW5057LW0 gearcase, motor and pump diagram</strong> shows the capacitor as <strong>item 7</strong>, near the motor and belt-driven assembly beneath the tub. The highlighted detail connects the diagram to the component replaced during this Fishers repair.',
  'This story follows a specific service visit: the basket would not spin and the agitator would not move. Diagnosis identified a failed capacitor, and replacement restored operation without replacing the drive motor.'
 ])}
 ${row(0,'The Call: A Washer That Would Not Spin or Agitate',[
  'The customer in <strong>Fishers, Indiana</strong> reported that the washing machine was not working: neither the basket nor the agitator would rotate. Alex Appliance Repair visited the home to diagnose the Whirlpool top-load washer.',
  'Instead of treating the symptom as proof of a failed motor or gearcase, we diagnosed the appliance and identified the capacitor as the component that needed replacement. The service photos below document access, component testing, replacement and reassembly.'
 ])}
 ${row(1,'Confirming the Model: Whirlpool WTW5057LW0',[
  'The original appliance label confirms <strong>Whirlpool WTW5057LW0</strong>. The model-number area is reproduced here from the actual photograph, without recreating the label.',
  'When requesting Whirlpool washer repair in Fishers, include the complete model number, including its final digit. Also explain whether the problem occurs during washing, spinning or both. For this machine, both basket rotation and agitation were affected.'
 ])}
 <section class="repair-story-section"><h2>Accessing the Motor, Belt and Capacitor</h2><p>The first photograph shows the protective drive cover. With access opened for service, the next view shows the drive motor, belt and large pulley. These photographs establish the location of the parts involved; they do not indicate that the belt or motor was replaced.</p>${pair(3,4)}</section>
 <section class="repair-story-section"><h2>Finding the Failed Motor Capacitor</h2><p>The original capacitor was mounted beside the drive assembly. During diagnosis, we found that it had lost capacitance and the motor could not develop the starting torque needed to begin normal operation. That explains why both washing action and spinning were affected in this case.</p><p>The close-ups show the capacitor before replacement and the access available with the lower pulley removed. The confirmed repair was capacitor replacement, not a gearcase, agitator or drive-motor replacement.</p>${pair(5,6)}</section>
 <section class="repair-story-section"><h2>Capacitance Testing: 0.0 Compared With 50.1 Microfarads</h2><p>The diagnostic photographs show a clear difference. The meter displays <strong>0.0 &micro;F</strong> with the removed failed capacitor connected, while the replacement measurement displays <strong>50.1 &micro;F</strong>. The photographed capacitors are marked <strong>50 &micro;F</strong>.</p><p>These readings support the technician's finding that the original capacitor had lost capacitance. The replacement measurement is close to its marked nominal value. The images document this particular repair; they are not a recommendation to order a capacitor solely from a similar-looking washer or a symptom.</p>${pair(7,8)}</section>
 <section class="repair-story-section"><h2>Replacing the Capacitor</h2><p>The side-by-side photograph shows the old capacitor on the left and the replacement on the right. The second image documents the capacitor and Whirlpool parts packaging from the visit. We removed the failed component and installed the replacement in the washer.</p><p>Physical appearance alone was not the basis for this diagnosis. The loss of capacitance, the motor-starting problem and the successful operational checks after replacement are the important findings in this repair record.</p>${pair(9,10)}</section>
 ${row(11,'Installing the Replacement and Reassembling the Drive',[
  'The replacement capacitor was installed and connected in the drive area. The photograph shows the new component in place while the assembly was still open for service.',
  'We then reassembled the parts removed for access. The motor and belt drive remained part of the existing washer; the component replaced to address this failure was the capacitor.'
 ])}
 ${row(12,'Final Checks: Rinse and Spin and Wash Cycle',[
  'After reassembly, we tested the washer on <strong>Rinse and Spin</strong> and also tested a <strong>Wash Cycle</strong>. The checks confirmed that the machine could spin and perform its washing action again.',
  'The cover photograph documents the reassembly stage, not a running-cycle test. The completed operational testing is the technician-reported result of this Fishers visit. The Whirlpool WTW5057LW0 returned to working order after capacitor replacement.'
 ])}
 <section class="repair-story-section"><h2>Whirlpool Washer Not Spinning: Common Questions</h2>
 <h3>Can a failed capacitor stop both spinning and agitation?</h3><p>In this documented WTW5057LW0 repair, yes. The failed capacitor prevented proper motor starting, so neither the basket nor agitator operated normally. Replacing it restored both functions during the post-repair tests.</p>
 <h3>Does every Whirlpool washer that will not spin need a capacitor?</h3><p>No. A no-spin complaint does not identify one particular failed part. The appliance needs diagnosis before a replacement is recommended. This article describes a confirmed capacitor failure on one washer, not a universal fix.</p>
 <h3>Was the motor replaced?</h3><p>No. The repair documented here was replacement of the failed capacitor. The washer was reassembled and tested on Rinse and Spin and a Wash Cycle.</p>
 <h3>What should I send when booking washer repair in Fishers?</h3><p>Share the full model number, your service address and a description of what the washer does. Mention whether the basket will not spin, the agitator will not move, or both. Include any displayed error code without guessing its meaning.</p>
 <h3>How much does washer capacitor replacement cost?</h3><p>The estimate depends on the diagnosis, the correct replacement component and the work required. We explain the findings and estimate before approved repair work.</p>
 </section>
 <section class="repair-story-section"><h2>Schedule Whirlpool Washer Repair in Fishers, Indiana</h2><p>For a Whirlpool washing machine that will not spin or agitate, Alex Appliance Repair offers <a href="/fishers/washer-repair-services.html">washer repair in Fishers</a>. We approach each repair with care, explain the work performed and check the appliance after service.</p><p>Explore our <a href="/fishers.html">appliance repair services in Fishers, Indiana</a>, <a href="/brands/whirlpool-appliance-repair.html">Whirlpool appliance repair</a> and <a href="/washer-repair.html">washing machine repair services</a>. More documented service visits are available in our <a href="/recent-work.html">repair story gallery</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> with your model and symptoms, or book an appointment online.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Fishers</a></section>
 </article>`;
}
