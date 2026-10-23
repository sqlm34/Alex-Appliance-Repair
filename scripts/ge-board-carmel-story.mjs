const base='images/repair-cases/ge-control-board-carmel/';
export const geBoardStory={
 slug:'carmel-ge-gfw550ssn3ww-washer-control-board-replacement',
 title:'GE Washer Control Board Replacement and Initialization',
 headline:'GE GFW550SSN3WW Washer Control Board Replacement in Carmel, Indiana',
 cardTitle:'GE Washer Door-Lock Error Traced to the Control Board in Carmel',
 seoTitle:'GE GFW550SSN3WW Control Board Repair | Carmel, IN',
 description:'GE GFW550SSN3WW washer repair in Carmel, IN: a door-lock-related error traced to the control board. Board replacement, initialization and successful testing.',
 city:'carmel',appliance:'washer',published:'2026-10-23',modified:'2026-10-23',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A GE washer in Carmel displayed a door-lock-related error, but detailed diagnosis identified a faulty control board. We removed the stacked gas dryer for access, replaced and initialized the washer control board, then reassembled and tested the installation. Washer operation was restored.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'GE front-load washer beneath a stacked gas dryer'},
  {label:'Model',value:'GFW550SSN3WW'},
  {label:'Complaint',value:'Door-lock-related error'},
  {label:'Diagnosis',value:'Faulty washer control board'},
  {label:'Repair',value:'Control board replacement and initialization'},
  {label:'Access',value:'Gas dryer removed and reinstalled'},
  {label:'Result',value:'Reassembled and tested; washer operation restored'}
 ],
 overviewImage:{src:base+'control-board-diagram.webp',width:1364,height:1800,caption:'GE GFW550SSN3WW cabinet diagram highlighting the main control board location'},
 photos:[
  ['washer',1200,1600,'GE GFW550SSN3WW front-load washer beneath a stacked dryer at the Carmel service visit'],
  ['model-label',765,260,'GE appliance label showing washer model GFW550SSN3WW'],
  ['washer-open',1200,1600,'Washer opened from above after removing the stacked gas dryer'],
  ['control-housing',1200,1600,'Control-board housing inside the opened GE washer'],
  ['original-board-connections',1600,1200,'Original washer control board and wiring connections during service'],
  ['old-and-new-boards',1200,1600,'Removed control board in its housing beside the replacement board'],
  ['replacement-board',1200,1600,'Replacement GE washer control board before installation'],
  ['installed-board',1600,1200,'Replacement control board connected in the washer during reassembly'],
  ['dryer-restacked',1200,1600,'Gas dryer back above the washer while rear connections were being restored'],
  ['gas-connection-check',1200,1600,'Dryer gas connection with checking solution applied during reassembly'],
  ['vent-reconnected',1200,1600,'Dryer exhaust vent reconnected behind the stacked laundry pair'],
  ['completed-installation',1200,1600,'GE washer and gas dryer reassembled in the Carmel laundry room']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function geBoardArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i];const max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Door-Lock Error That Led to a Different Diagnosis',[
  'A homeowner in <strong>Carmel, Indiana</strong>, called Alex Appliance Repair after their GE washing machine displayed an error associated with the door lock. The washer sat beneath a gas dryer in a stacked installation, making access part of the repair work.',
  'A more detailed diagnosis traced the problem to the <strong>washer control board</strong>. The repair therefore focused on replacing that board rather than treating the reported error as proof that the door lock itself needed replacement.'
 ])}
 ${row(1,'Model Identification: GE GFW550SSN3WW',[
  'The appliance label identifies this front-load washer as <strong>GE GFW550SSN3WW</strong>. The model detail shown here comes from the original service photograph.',
  'After the control-board fault was identified, a replacement board was ordered for the repair. The cabinet diagram in the visit overview highlights the board location, while the photographs below document the actual work.'
 ])}
 ${row(2,'Removing the Stacked Gas Dryer for Access',[
  'Before taking the dryer down, its gas supply was shut off and the gas connection, electrical connection and exhaust vent were disconnected. The gas dryer was then removed from above the washer so the washing machine could be opened.',
  'With the washer top removed, the technician could reach the control-board assembly. This was a washer electronics repair, but completing it also required handling the stacked dryer and restoring its connections afterward.'
 ])}
 <section class="repair-story-section"><h2>Accessing the Washer Control Board</h2><p>The opened washer exposed the control-board housing and its wiring connections. These photographs show the housing and the original board during the service.</p>${pair(3,4)}<p>The important distinction in this case was between the reported symptom and the diagnosed component: the customer saw a door-lock-related error, while the technician identified a control-board fault. That diagnosis determined which part was ordered and replaced.</p></section>
 <section class="repair-story-section"><h2>Replacing the Faulty Control Board</h2><p>Once the ordered replacement was available, the faulty control board was removed and the new board installed. The side-by-side photograph shows the removed board in its housing and the replacement ready for installation.</p>${pair(5,6)}<p>The new board was fitted and its connections restored. The work documented here was a board replacement, not a component-level repair of the original circuit board.</p></section>
 ${row(7,'Initializing the New Control Board',[
  'Installing the replacement was not the final step. <strong>The new control board required initialization on this washer.</strong> The technician completed that setup, after which the washing machine began working properly.',
  'For this repair, replacing the hardware and completing the setup were both necessary before the washer could be returned to service. Once initialization was complete, the work continued with reassembly and final testing.'
 ])}
 ${row(8,'Putting the Laundry Pair Back Together',[
  'After the board replacement and initialization, the washer was closed up and the gas dryer returned to its position above it. The equipment was reassembled in the reverse order of removal.',
  'The dryer gas, electrical and exhaust connections were restored as part of returning the stacked pair to service. The photograph shows the installation during that process, before all rear connections were complete.'
 ])}
 <section class="repair-story-section"><h2>Restoring the Dryer Connections</h2><p>The service photographs document the rear connection work, including checking solution applied at the gas fitting and the exhaust vent reconnected to the dryer. These are two stages of the reassembly process.</p>${pair(9,10)}<p>Work on a stacked gas appliance involves more than opening the washer cabinet. Gas disconnection, reconnection and handling the upper appliance are work for qualified service personnel; this article is a record of a professional repair, not a do-it-yourself procedure.</p></section>
 ${row(11,'Final Testing: Washer Operation Restored',[
  'After everything was reassembled, the installation was checked and the washer tested. Following control-board replacement and initialization, the washer operated properly and the service was completed successfully.',
  'The completed job included diagnosis of the control-board fault, ordering and replacing the board, initialization, removal and reinstallation of the stacked gas dryer, reconnection and final testing.'
 ])}
 <section class="repair-story-section"><h2>Questions About This GE Washer Repair</h2><h3>Was the door lock the failed part?</h3><p>The reported error concerned the door lock, but the detailed diagnosis identified the control board as the problem. The documented repair was control-board replacement and initialization.</p><h3>Why was the gas dryer removed?</h3><p>It was stacked above the washer and needed to be taken down to provide access for this repair. Its gas, power and vent connections were disconnected and restored during the work.</p><h3>Did the new board need initialization?</h3><p>Yes. The technician initialized the replacement board on this GFW550SSN3WW, and the washer began operating properly afterward.</p><h3>Does a door-lock error always mean a bad control board?</h3><p>No conclusion about another washer should be drawn from this case alone. The repair decision here followed a detailed diagnosis, not the error description by itself.</p></section>
 <section class="repair-story-section"><h2>GE Washer Repair in Carmel, Indiana</h2><p>If your GE washer displays an error or will not operate correctly, contact Alex Appliance Repair for <a href="/carmel/washer-repair-services.html">washer repair in Carmel</a>. Share the full model number and the error as displayed, and mention whether a gas or electric dryer is stacked above the washer.</p><p>Explore our <a href="/washer-repair.html">washer repair services</a>, <a href="/carmel.html">Carmel service coverage</a> and more <a href="/recent-work.html">repair stories with original service photographs</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your appliance.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book washer repair in Carmel</a></section>
 </article>`;
}
