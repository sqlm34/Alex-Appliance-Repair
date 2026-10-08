const base='images/repair-cases/lg-wm4270hva-carmel/';
export const lgDrainStory={
 slug:'carmel-lg-wm4270hva-washer-not-draining-noisy-drain-pump',
 title:'LG Washer Drain Pump Replacement',
 headline:'LG WM4270HVA Washer Not Draining and Making Noise in Carmel',
 cardTitle:'LG Washer Not Draining and Making Noise: Drain Pump Replacement',
 seoTitle:'LG Washer Not Draining & Noisy in Carmel | Alex Repair',
 description:'LG WM4270HVA washer not draining and making noise in Carmel, IN. See the drain pump replacement, model label, diagram and original service photos.',
 city:'carmel',appliance:'washer',published:'2026-10-08',modified:'2026-10-08',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Carmel customer called because their LG WM4270HVA washer made an unusual noise when the drain cycle started, but the water did not leave the machine. This repair story documents the drain pump replacement with an annotated diagram and photographs from the service visit.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'LG front-load washing machine'},
  {label:'Model',value:'WM4270HVA'},
  {label:'Reported symptoms',value:'Water not draining; unusual noise during the drain cycle'},
  {label:'Repair',value:'Drain pump replacement'},
  {label:'Documentation',value:'Model-label crop, pump diagram and service photographs'}
 ],
 photos:[
  ['washer-before',1200,1600,'LG WM4270HVA washer before drain pump replacement in Carmel'],
  ['wm4270hva-model',310,43,'Original LG washer model-label crop: WM4270HVA'],
  ['drain-pump-diagram',1240,1826,'LG WM4270HVA diagram with the drain pump highlighted'],
  ['front-panel-removed',1200,1600,'Front panel removed to access the lower washer pump assembly'],
  ['pump-location',1200,1600,'Pump housing, filter opening and connected hoses inside the LG washer'],
  ['pump-connection',1200,1600,'Close-up of a pump electrical connection during service'],
  ['drain-pump-reference',1200,1200,'Drain pump reference showing the motor and impeller'],
  ['pump-during-replacement',1200,1600,'Pump and LG packaging laid out during the replacement'],
  ['removed-pump-assembly',1200,1600,'Removed pump housing and detached pump motor during repair'],
  ['pump-reinstalled',1200,1600,'Pump assembly back in the washer with its hoses connected'],
  ['washer-reassembled',1200,1600,'Reassembled LG washer on the right with its display powered on in Carmel']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function lgDrainArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];
  const max=paired?390:Math.min(p.width,520*p.width/p.height);
  const frame=paired?'style="aspect-ratio:3/4;position:relative"':'';
  const sizing=paired?'position:absolute;inset:0;width:100%;height:100%;object-fit:contain!important;aspect-ratio:auto':`aspect-ratio:${p.width}/${p.height};object-fit:contain!important`;
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" ${frame} href="/${p.src}">${image(p,i!==2).replace('<img ',`<img style="${sizing}" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(2,'Where the Drain Pump Fits in This LG Washer',[
 'The highlighted <strong>LG WM4270HVA diagram</strong> shows the drain pump within the lower pump assembly. The enlarged component view connects the drawing to the part discussed in this repair story.',
 'At a home in <strong>Carmel, Indiana</strong>, the customer reported that water stayed in the washer when the drain cycle began, accompanied by a new, unusual noise. The repair carried out was <strong>drain pump replacement</strong>. The photographs below follow that work from access to reassembly.'
 ])}
 ${row(1,'Identifying Model WM4270HVA',[
 'The original appliance sticker identifies this front-load washing machine as <strong>LG WM4270HVA</strong>. This close crop retains the photographed model line without displaying the serial number.',
 'The full model matters when arranging service: similar-looking LG washers can have different components and layouts. Sharing the model and the exact point in the cycle when a noise occurs helps describe the problem clearly.'
 ])}
 ${row(0,'The Customer Call: Noise, but No Drainage',[
 'The customer contacted Alex Appliance Repair because the washer was not moving water out during the drain cycle. They also noticed an unusual noise at that stage. The complaint was about <strong>draining</strong>, rather than a sound reported only during high-speed spin.',
 'A noise alone does not establish which component needs replacement. In this case, the service involved replacing the drain pump. The account here describes this particular Carmel visit, not a diagnosis for every LG washer with similar symptoms.'
 ])}
 ${row(3,'Accessing the Pump Behind the Front Panel',[
 'With the front panel removed, the lower pump area became accessible beneath the tub. The photograph shows the washer during disassembly, with the door boot and drum visible above the service area.',
 'The pump sits low in the cabinet, near the filter opening. Access to that assembly is different from opening the small filter service cover. These are repair photographs, not instructions to operate a washer with its panels removed.'
 ])}
 <section class="repair-story-section"><h2>The Pump Housing and Connections</h2><p>The close-up photographs show the pump housing, attached hoses and an electrical connection during service. These views document the area involved in the replacement and help distinguish the drain system from the drum drive.</p><p>A complete drainage assessment considers the water path as well as the pump. A restriction and a pump problem can produce similar complaints, so the symptom should not be treated as a parts order by itself.</p>${pair(4,5)}</section>
 ${row(6,'Drain Pump Replacement',[
 'The component reference shows a pump motor with its impeller. Its role in the drain system is to move water out of the washer; it is separate from the motor that turns the drum.',
 'For this LG WM4270HVA service in Carmel, the <strong>drain pump was replaced</strong>. The reference image gives a clear view of the component, while the on-site photographs show the actual assembly and replacement work.'
 ])}
 <section class="repair-story-section"><h2>The Assembly During Replacement</h2><p>With the assembly out for service, the pump housing and a detached pump motor can be seen on a towel. A second photograph shows a pump beside LG packaging and the mounting base.</p><p>These views show why a drain pump replacement involves more than the visible filter cap: the pump motor is attached to the housing within the lower cabinet.</p>${pair(8,7)}</section>
 ${row(9,'Pump Assembly Back in Place',[
 'After the replacement, the pump assembly was returned to the lower cabinet. This photograph shows the assembly with the hoses connected, including the green elbow visible in the earlier access photographs.',
 'The service sequence then continued with putting the washer back together. The images document the component location and reassembly without relying only on a product photograph.'
 ])}
 ${row(10,'Reassembled at the Carmel Home',[
 'The final photograph shows the laundry appliances back together. The <strong>washer is on the right</strong>, with its display powered on; the appliance on the left is the dryer.',
 'This visit addressed the reported drain-cycle noise and failure to remove water through a drain pump replacement on the LG WM4270HVA.'
 ])}
 <section class="repair-story-section"><h2>LG Washer Not Draining: Common Questions</h2>
 <h3>Does noise during draining always mean the pump is bad?</h3><p>No. The sound and lack of drainage need to be assessed together. LG also identifies a blocked pump filter or drain hose as possible causes of drainage trouble. See <a href="https://www.lg.com/us/support/help-library/lg-washing-machine-water-not-draining--20154726902590">LG's water-not-draining guidance</a>. A pump replacement should follow an assessment of the individual washer.</p>
 <h3>Is this the same as a washer making noise during spin?</h3><p>Not necessarily. This customer described the noise when the drain cycle began. Tell your technician whether the sound happens while filling, washing, draining or spinning, and whether water remains inside.</p>
 <h3>Should I keep restarting a washer that will not drain?</h3><p>Stop the cycle and arrange help if the problem persists. Do not force the door open with water inside. Before attempting any owner-level filter maintenance, follow the instructions for your model, disconnect power and allow hot water to cool. Removing a filter can release retained water.</p>
 <h3>What should I provide when booking LG washer repair?</h3><p>Provide the full model number, your service address, the stage of the cycle where the problem occurs and any code actually shown on the display. Mention both the unusual noise and the water remaining in the machine.</p></section>
 <section class="repair-story-section"><h2>LG Washer Repair in Carmel, Indiana</h2><p>For an LG washer that will not drain or makes an unusual noise during draining, Alex Appliance Repair provides <a href="/washer-repair.html">washer repair</a> in <a href="/carmel.html">Carmel, Indiana</a>. Share the model and symptoms when booking so we can discuss your appliance.</p><p>For another documented visit involving a different LG model, see our <a href="/repair-cases/carmel-lg-wm3997hwa-drain-pump.html">LG WM3997HWA drain pump replacement in Carmel</a>, or browse <a href="/recent-work.html">recent repair stories</a>. Alex Appliance Repair is an independent service operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair</a></section>
 </article>`;
}
