const base='images/repair-cases/lg-wm9000hva-noblesville/';
export const noblesvilleWasherStory={
 slug:'noblesville-lg-wm9000hva-washer-not-draining-drain-pump-replacement',
 title:'LG Washer Drain Pump Replacement',
 headline:'LG Washer Not Draining in Noblesville: WM9000HVA Drain Pump Replacement',
 cardTitle:'LG Washer Not Draining: Pump Replacement in Noblesville',
 seoTitle:'LG Washer Not Draining in Noblesville | Drain Pump Repair',
 description:'LG WM9000HVA washer not draining in Noblesville, IN? See our drain pump replacement, original repair photos and successful testing. Book washer repair.',
 city:'noblesville',appliance:'washer',published:'2026-10-13',modified:'2026-10-13',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Noblesville homeowner called because their LG washing machine would not drain. We diagnosed a drain pump that needed replacement, installed the replacement, reassembled the washer and tested all cycles. The WM9000HVA was working again after service.',
 overviewEntries:[
  {label:'Location',value:'Noblesville, Indiana'},
  {label:'Appliance',value:'LG front-load washing machine'},
  {label:'Model',value:'WM9000HVA'},
  {label:'Customer concern',value:'Washer not draining water'},
  {label:'Diagnosis and repair',value:'Drain pump required replacement and was replaced'},
  {label:'Verification',value:'Washer reassembled; all cycles tested'},
  {label:'Result',value:'Drainage and normal operation restored'}
 ],
 photos:[
  ['washer-reassembled',1200,1600,'LG WM9000HVA reassembled and powered on for testing after drain pump replacement in Noblesville'],
  ['wm9000hva-model-label',280,44,'Original model-label crop identifying the LG washer as WM9000HVA'],
  ['washer-before-repair',1200,1600,'LG washer before repair with the lower service cover open and a bowl beneath the drain hose'],
  ['front-panel-removed',1200,1600,'Front panel removed to access the pump beneath the LG washer tub'],
  ['original-pump-connection',1200,1600,'Original pump electrical connection photographed before removal'],
  ['removed-pump-assembly',1200,1600,'Pump housing and mounting base removed from the washer during service'],
  ['removed-drain-pump',1200,1600,'Removed drain pump showing its white impeller and black housing'],
  ['drain-pump-replacement',1200,1600,'Detached pump beside the assembly during drain pump replacement'],
  ['replacement-pump-in-cabinet',1200,1600,'Replacement pump assembly positioned in the lower cabinet before hose reconnection'],
  ['pump-hoses-reconnected',1200,1600,'Pump assembly back in place with hoses reconnected'],
  ['filter-cap-reinstalled',1200,1600,'Drain filter cap reinstalled before closing the lower service cover'],
  ['control-panel-testing',1600,1200,'LG WM9000HVA control panel during post-repair cycle testing'],
  ['drain-pump-diagram',1240,1826,'Drain pump assembly diagram with the pump highlighted and an enlarged component view']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function noblesvilleWasherArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];
  const max=paired?390:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==12).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(12,'The Drain Pump Assembly',[
  'The diagram highlights the <strong>drain pump</strong> within the lower pump assembly. The enlarged component view shows the pump motor and impeller discussed in this repair story.',
  'For this <strong>LG WM9000HVA washer in Noblesville, Indiana</strong>, the customer reported that water was not draining. Our diagnosis identified a drain pump that required replacement. The service photographs below document the repair and post-repair testing.'
 ])}
 ${row(0,'From a Washer That Would Not Drain to Working Laundry Again',[
  'A washing machine that stops draining can bring the household laundry to a standstill. For this customer in <strong>Noblesville, Indiana</strong>, the problem led to a service call to Alex Appliance Repair: their LG front-load washer was not draining water.',
  'Our on-site diagnosis found that the <strong>drain pump needed replacement</strong>. We replaced the pump, put the machine back together and tested all cycles. The washer drained again and returned to working order. The photographs in this story follow the actual repair, from access to the original pump through reassembly and testing.'
 ])}
 ${row(1,'The Washer: LG WM9000HVA',[
  'The appliance label identifies this washer as <strong>LG WM9000HVA</strong>. The original model-number crop is shown here so the repair is tied to the machine actually serviced.',
  'A model number is more useful than appearance alone when discussing a repair. If you contact us about an LG washer that will not drain, include the full model and describe what happens when the machine should remove the water.'
 ])}
 ${row(2,'The Customer Complaint and Diagnosis',[
  'The reported symptom was straightforward: <strong>the washing machine would not drain</strong>. After evaluating the appliance at the Noblesville home, we determined that its drain pump required replacement.',
  'That finding applies to this washer. A drainage complaint is not, by itself, proof that every machine needs a new pump. The water path and individual appliance must be assessed before choosing a repair.'
 ])}
 ${row(3,'Accessing the Lower Pump Assembly',[
  'The service photographs show the front panel removed, exposing the drum, door boot and lower pump area. The drain pump assembly sits below the tub, behind the front of the cabinet.',
  'Opening the small filter cover and accessing the pump motor are different tasks. This repair required access to the internal assembly. The photographs document professional service, not a procedure for operating the washer while disassembled.'
 ])}
 <section class="repair-story-section"><h2>Documenting the Original Pump Before Replacement</h2><p>The close-up shows an electrical connection on the original pump. The next photograph shows the assembly outside the cabinet, including its housing and mounting base. Together, these views establish the before-replacement stage of the repair.</p>${pair(4,5)}</section>
 <section class="repair-story-section"><h2>Replacing the Drain Pump</h2><p>The removed pump's white impeller is visible in the close-up below. This component belongs to the system that moves water out of the washer; it is separate from the drive system that rotates the drum.</p><p>We replaced the drain pump identified during diagnosis. The second photograph shows the detached pump beside the assembly during the replacement work. These are photographs from the service visit, rather than catalog illustrations.</p>${pair(6,7)}</section>
 <section class="repair-story-section"><h2>Reinstalling the Assembly and Reconnecting the Hoses</h2><p>After the pump replacement, the assembly went back into the lower cabinet. The first image shows it positioned before hose reconnection; the second shows the hoses back in place. This sequence documents the return from component replacement to an assembled drain system.</p>${pair(8,9)}</section>
 ${row(10,'Putting the Washer Back Together',[
  'The drain filter cap was reinstalled, and the washer was reassembled. In this detail photograph, the lower service opening is still visible before its cover was closed.',
  'The completed exterior photograph at the beginning of this story shows the next stage: the machine back together, its service cover closed and its control panel powered on for testing.'
 ])}
 ${row(11,'Post-Repair Testing: All Cycles Checked',[
  'Replacing the component was followed by testing the assembled washer. <strong>All cycles were tested after the repair</strong>, and the machine was working again, including draining water as intended.',
  'The control-panel photograph records part of that testing stage. The outcome of this Noblesville repair was a working LG WM9000HVA after drain pump replacement, rather than a washer left disassembled or awaiting further repair.'
 ])}
 <section class="repair-story-section"><h2>Questions About an LG Washer That Will Not Drain</h2>
 <h3>Does a washer that will not drain always need a pump?</h3><p>No. A blocked filter or a restricted drain hose can also cause drainage trouble. <a href="https://www.lg.com/us/support/help-library/lg-washing-machine-water-not-draining--20154726902590">LG's water-not-draining guidance</a> discusses these possibilities. In the repair documented here, the diagnosis was a pump that required replacement.</p>
 <h3>Is cleaning the filter the same as replacing the drain pump?</h3><p>No. The filter is an accessible part of the drainage system; the pump motor is a separate component inside the cabinet. This service involved replacing the pump, not just opening the filter cover.</p>
 <h3>What information should I share when booking service?</h3><p>Send the model number, your service location and a description of the symptom. Mention whether water remains inside and share any error code actually displayed. For this visit, the documented model was WM9000HVA and the reported issue was failure to drain.</p>
 <h3>How much does drain pump replacement cost?</h3><p>The estimate depends on the diagnosis, the correct part for the appliance and the work needed. Contact us to discuss your washer; we explain the diagnosis and estimate before approved repair work.</p>
 </section>
 <section class="repair-story-section"><h2>Book LG Washer Repair in Noblesville, Indiana</h2><p>If your LG washing machine is not draining, Alex Appliance Repair provides <a href="/noblesville/washer-repair-services.html">washer repair in Noblesville</a>. Tell us the model, symptoms and service address when scheduling an appointment.</p><p>Read more about our <a href="/washer-repair.html">washing machine repair services</a>, check <a href="/noblesville.html">Noblesville service coverage</a>, or explore <a href="/recent-work.html">more repair stories with original photographs</a>. Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC.</p><p><a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your washer, or schedule online.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair</a></section>
 </article>`;
}
