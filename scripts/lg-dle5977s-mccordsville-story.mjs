const base='images/repair-cases/lg-dle5977s-mccordsville/';
export const lgBeltStory={
 slug:'mccordsville-lg-dle5977s-dryer-belt-rollers-idler-repair',
 title:'LG Dryer Broken Belt, Drum Rollers and Idler Pulley Repair',
 headline:'LG DLE5977S Dryer Not Starting in McCordsville, Indiana',
 cardTitle:'LG Dryer Would Not Start: Broken Belt and Seized Rollers in McCordsville',
 seoTitle:'LG DLE5977S Dryer Not Starting | McCordsville Repair',
 description:'LG DLE5977S dryer repair in McCordsville, IN: a broken belt, seized drum rollers and idler pulley. Four rollers replaced, dryer cleaned and operation restored.',
 city:'mccordsville',appliance:'dryer',published:'2026-10-24',modified:'2026-10-24',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A McCordsville homeowner called because their LG TROMM dryer would not start. Inspection revealed a broken drive belt, seized drum support rollers and a seized idler pulley. We replaced the belt, all four rollers and the idler, cleaned the dryer and drum, then reassembled and tested it successfully.',
 overviewEntries:[
  {label:'Location',value:'McCordsville, Indiana'},
  {label:'Appliance',value:'LG TROMM electric dryer'},
  {label:'Model',value:'DLE5977S'},
  {label:'Complaint',value:'Would not start; drum not turning'},
  {label:'Diagnosis',value:'Broken belt; seized rollers and idler'},
  {label:'Repair',value:'Belt, four rollers and idler replaced'},
  {label:'Cleaning',value:'Dryer interior and drum cleaned'},
  {label:'Result',value:'Reassembled, tested and working'}
 ],
 overviewImage:{src:base+'drive-system-diagram.webp',width:1006,height:1378,caption:'Dryer drum assembly diagram highlighting the belt, support rollers and idler pulley'},
 photos:[
  ['dryer',1200,1600,'LG TROMM DLE5977S dryer at the McCordsville service visit'],
  ['model-label',505,135,'Original appliance label identifying LG dryer model DLE5977S'],
  ['broken-belt',1200,1600,'Broken drive belt beside the removed LG dryer drum and lint filter'],
  ['old-roller',1200,1600,'Original drum support roller with lint and wear debris around the mounting area'],
  ['old-idler',1200,1600,'Original idler pulley inspected during the dryer no-start diagnosis'],
  ['front-rollers',1200,1600,'Two replacement drum support rollers on the front bulkhead'],
  ['rear-rollers',1200,1600,'Replacement rear drum support rollers with the drum removed'],
  ['new-idler',1600,1200,'New idler pulley installed beside the dryer motor'],
  ['lint-duct',1600,1200,'Lint accumulated inside the removed dryer duct before cleaning'],
  ['duct-debris',1200,1600,'Lint and loose coins found in the removed duct during cleaning'],
  ['cleaned-cabinet',1200,1600,'Dryer interior after cleaning and drive-component replacement'],
  ['reassembly',1200,1600,'LG dryer drum reinstalled during reassembly before final testing']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function lgBeltArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Service Call: An LG Dryer That Would Not Start',[
  'A homeowner in <strong>McCordsville, Indiana</strong>, contacted Alex Appliance Repair because their LG dryer would not start. The machine was no longer doing its job, and the drum was not turning.',
  'Opening the dryer revealed a mechanical problem: the <strong>drive belt had broken</strong>. Inspection also found seized drum support rollers and a seized idler pulley. The repair needed to address those binding components as well as the belt.'
 ])}
 ${row(1,'Model Identification: LG TROMM DLE5977S',[
  'The original appliance label identifies this electric dryer as <strong>LG DLE5977S</strong>. The cropped photograph preserves the actual model marking from the service visit.',
  'The full model number is useful when requesting service for a dryer that will not start or whose drum will not spin. It also helps distinguish the dryer from the matching washing machine beside it and supports correct replacement-part selection.'
 ])}
 ${row(2,'A Broken Belt Was Only Part of the Problem',[
  'With the drum removed, the broken belt could be inspected directly. In this case, the technician traced the belt failure to <strong>seized rollers and a seized idler pulley</strong>, which prevented the drive system from moving freely.',
  'Replacing only the broken belt would have left the diagnosed cause unresolved. The repair therefore covered the belt, the drum supports and the belt tensioner together.'
 ])}
 <section class="repair-story-section"><h2>Inspecting the Seized Rollers and Idler Pulley</h2><p>The service photographs show the original support roller and idler before replacement. Lint and wear debris were visible around the roller area; the technician confirmed that the affected drive components were binding.</p>${pair(3,4)}<p>The customer described a dryer that would not turn on. That complaint was the starting point, not proof of an electrical supply or control-board failure. The documented findings and repair in this visit concerned the mechanical drive system.</p></section>
 <section class="repair-story-section"><h2>Replacing All Four Drum Support Rollers</h2><p>We replaced <strong>all four drum rollers: two at the front and two at the rear</strong>. With the dryer already disassembled, both sets of supports were accessible.</p>${pair(5,6)}<p>The photographs show the front bulkhead and rear supports after the replacements. Addressing both locations was part of restoring free drum movement before putting the belt and drum back into service.</p></section>
 ${row(7,'A New Idler Pulley and Drive Belt',[
  'The seized idler pulley was replaced with a new assembly. This is the belt-tensioning component beside the motor, shown here after installation.',
  'A replacement drive belt completed the mechanical repair. The work addressed the broken belt and the components identified as the cause of its failure, rather than treating the belt as an isolated problem.'
 ])}
 <section class="repair-story-section"><h2>Cleaning the Dryer Interior and Drum</h2><p>The dryer and drum were cleaned while the machine was open. The removed duct contained lint and loose debris, including coins, as shown in the before-cleaning photographs.</p>${pair(8,9)}<p>These items were found during cleaning; they were not identified as the cause of the belt failure. The confirmed cause in this repair remained the seized rollers and idler pulley.</p></section>
 ${row(10,'Preparing the Dryer for Reassembly',[
  'After cleaning and replacement of the drive components, the dryer was ready for the drum to be reinstalled. The cabinet photograph shows the serviced supports and idler with the drum still out.',
  'This visit combined mechanical repair with interior cleaning. It did not involve replacing the heating element or control board.'
 ])}
 ${row(11,'Reassembled, Tested and Working Again',[
  'The drum was reinstalled and the dryer fully reassembled. The technician then started and tested the machine: <strong>operation was restored and the drum turned again</strong>. The photograph shows the reassembly stage before that final check.',
  'The completed service included a new belt, four drum rollers, a new idler pulley, cleaning of the dryer and drum, and a successful post-repair test.'
 ])}
 <section class="repair-story-section"><h2>LG Dryer Belt and Roller Repair Questions</h2>
 <h3>Why did this DLE5977S dryer stop working?</h3><p>Inspection found a broken drive belt together with seized drum support rollers and a seized idler pulley. Those mechanical faults were addressed during the repair.</p>
 <h3>Why replace the rollers and idler with the belt?</h3><p>They were diagnosed as the reason the belt failed in this dryer. Installing a belt without resolving that binding would leave the underlying fault in place.</p>
 <h3>How many rollers were replaced?</h3><p>All four: two front rollers and two rear rollers. The idler pulley is a separate belt-tensioning component and was also replaced.</p>
 <h3>Does every LG dryer that will not start need a belt?</h3><p>No. This article describes one diagnosed repair, not a diagnosis for every no-start symptom. Tell the technician whether the controls light up, whether the machine makes a sound when Start is pressed and whether the drum moves.</p>
 <h3>Can I request service by model or part name?</h3><p>Yes. Mention LG DLE5977S and describe the symptom, such as a dryer not starting or a drum not spinning. You can also ask about drive belt, drum roller or idler pulley replacement. The technician should verify the fault and part fit before repair.</p></section>
 <section class="repair-story-section"><h2>LG Dryer Repair in McCordsville, Indiana</h2><p>For an LG dryer that will not start or whose drum will not turn, contact Alex Appliance Repair for <a href="/mccordsville/dryer-repair-services.html">dryer repair in McCordsville</a>. Share the full model number and what happens when you try to start the machine.</p><p>Read about our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/mccordsville.html">McCordsville service coverage</a> and other <a href="/recent-work.html">completed appliance repairs</a>. A different recent case involved a <a href="/repair-cases/carmel-samsung-dve50r5200w-dryer-heating-element-rollers-idler-repair.html">Samsung dryer not heating in Carmel</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in McCordsville</a></section>
 </article>`;
}
