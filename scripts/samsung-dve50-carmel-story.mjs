const base='images/repair-cases/samsung-dve50-carmel/';
const photo=([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption});
export const samsungCarmelStory={
 slug:'carmel-samsung-dve50r5200w-dryer-heating-element-rollers-idler-repair',
 title:'Samsung Dryer Heating Element, Rollers and Idler Pulley Replacement',
 headline:'Samsung DVE50R5200W/A3 Dryer Not Heating in Carmel, Indiana',
 cardTitle:'Samsung Dryer No-Heat Repair and Internal Cleaning in Carmel',
 seoTitle:'Samsung Dryer Not Heating in Carmel | DVE50R5200W/A3',
 description:'Samsung DVE50R5200W/A3 dryer repair in Carmel, IN: burned-out heating element, four drum rollers and idler pulley replaced, interior and drum felt cleaned.',
 city:'carmel',appliance:'dryer',published:'2026-10-24',modified:'2026-10-24',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Samsung dryer in Carmel was not heating. We found a burned-out heating element and replaced it, along with all four drum support rollers and the belt idler pulley. The dryer interior and drum felt were cleaned, then the appliance was reassembled and successfully tested.',
 overviewEntries:[
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'Samsung electric dryer'},
  {label:'Model',value:'DVE50R5200W/A3'},
  {label:'Customer concern',value:'Dryer not heating'},
  {label:'Diagnosis',value:'Burned-out, broken heating element'},
  {label:'Parts replaced',value:'Heating element, four drum rollers and idler pulley'},
  {label:'Cleaning',value:'Dryer interior, internal duct and drum felt'},
  {label:'Result',value:'Reassembled and tested; heating restored'}
 ],
 overviewImages:[
  ['roller-diagram',1600,1240,'Samsung dryer drum assembly diagram highlighting the front and rear support rollers'],
  ['heater-diagram',1600,1250,'Samsung dryer heater assembly diagram highlighting the heating element'],
  ['idler-diagram',1600,1214,'Samsung dryer drive assembly diagram highlighting the belt idler pulley']
 ].map(photo),
 photos:[
  ['dryer',1200,1600,'Samsung DVE50R5200W/A3 dryer at the Carmel service visit'],
  ['model-label',365,96,'Original appliance label identifying Samsung dryer model DVE50R5200W/A3'],
  ['cabinet-before',1200,1600,'Lint and dust inside the Samsung dryer before cleaning, with the drum removed'],
  ['broken-element',1200,1600,'Removed heating element with a visibly broken coil during diagnosis'],
  ['removed-element',1200,1600,'Failed heating element removed from its metal housing'],
  ['rear-rollers',1600,1200,'Two rear drum support rollers in the cleaned Samsung dryer cabinet'],
  ['original-idler',1200,1600,'Original belt idler pulley before replacement'],
  ['cabinet-after',1200,1600,'Cleaned dryer interior with heater housing and replacement idler pulley in place'],
  ['duct-before',1200,1600,'Lint buildup inside the removed internal air duct before cleaning'],
  ['duct-after',1600,1200,'Internal air duct after cleaning'],
  ['felt-before',1200,1600,'Drum felt with accumulated lint before cleaning'],
  ['felt-after',1200,1600,'Close-up of the drum felt after cleaning'],
  ['blower-after',1200,1600,'Blower wheel after internal cleaning'],
  ['controls',1600,1200,'Powered Samsung dryer control panel documented during the service visit']
 ].map(photo)
};

export function samsungCarmelArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Samsung Dryer That Stopped Heating',[
  'The homeowner in <strong>Carmel, Indiana</strong>, contacted Alex Appliance Repair because their Samsung dryer was not heating. We opened the appliance to investigate and found a burned-out heating element with a broken coil.',
  'The completed repair included a replacement heating element, <strong>two front and two rear drum support rollers</strong>, and a new belt idler pulley. With the dryer apart, we also cleaned its interior and the felt around the drum before reassembly and testing.'
 ])}
 ${row(1,'Model Identification: DVE50R5200W/A3',[
  'The original label on this dryer identifies it as <strong>Samsung DVE50R5200W/A3</strong>. The model-number crop comes directly from the service photograph.',
  'The three diagrams in the visit overview show the drum support rollers, heating element and idler pulley. The photographs below document the actual dryer and the work carried out in Carmel.'
 ])}
 ${row(2,'Opening the Dryer for Diagnosis',[
  'With the drum removed, the heater housing, drive components and cabinet floor were accessible. The initial photograph shows the lint and dust present inside the appliance before cleaning.',
  'The confirmed heating fault was the broken element. The internal buildup was cleaned during the repair, but it was not established as the cause of the element failure.'
 ])}
 <section class="repair-story-section"><h2>The Burned-Out Heating Element</h2><p>The removed element had a visibly broken coil. These photographs show the damaged coil close up and the element outside its housing.</p>${pair(3,4)}<p>We replaced the failed heating element to address the no-heat complaint. The support rollers and idler pulley were also replaced during this visit; they were separate parts of the repair, not the diagnosed cause of the missing heat.</p></section>
 ${row(5,'Replacing All Four Drum Support Rollers',[
  'The dryer received <strong>four replacement drum support rollers: two at the front and two at the rear</strong>. The photograph shows the rear pair in the cleaned cabinet; the drum diagram above identifies both support locations.',
  'These rollers support the drum as it turns. Replacing the full set was part of the work completed while the dryer was disassembled.'
 ])}
 ${row(6,'Replacing the Belt Idler Pulley',[
  'We also replaced the <strong>idler pulley</strong>, which maintains tension on the drive belt. This close-up documents the original pulley before replacement.',
  'The cleaned interior shown later in the article includes the replacement pulley beside the motor. The repair record covers pulley replacement, not a replacement belt.'
 ])}
 <section class="repair-story-section"><h2>Internal Air Duct: Before and After Cleaning</h2><p>Lint had collected inside the internal air duct. With the duct removed, we cleaned the accumulated material from its accessible surfaces before reinstalling it.</p>${pair(8,9)}<p>These images show the internal dryer duct before and after cleaning. This work was inside the appliance; it is not a claim that the full household exhaust-vent run was cleaned.</p></section>
 <section class="repair-story-section"><h2>Cleaning the Drum Felt</h2><p>The felt around the drum was cleaned as part of the service. The close-ups show the lint-covered felt before the work and its condition after cleaning.</p>${pair(10,11)}<p>The existing felt was cleaned and retained. It was not replaced during this repair.</p></section>
 ${row(12,'Cleaning the Blower and Interior',[
  'The cleaning extended to the accessible interior and blower area. This photograph shows the blower wheel after cleaning.',
  'Taking care of the internal cleaning while the dryer was open allowed us to remove the visible lint and dust before putting the appliance back together.'
 ])}
 ${row(7,'Reassembling the Dryer',[
  'With the replacement heating element, four support rollers and idler pulley in place, we reassembled the dryer in the reverse order of disassembly. The photograph shows the cleaned cabinet and installed components before the drum and panels were returned.',
  'The interior cleaning and drum-felt cleaning were completed before final assembly. The next step was to test the reassembled dryer.'
 ])}
 ${row(13,'Final Testing: Heating Restored',[
  'After reassembly, we tested the dryer and confirmed that it heated again. The repair was completed successfully, resolving the customer\'s original no-heat complaint.',
  'This Carmel service combined heating-element replacement with replacement of all four drum rollers and the idler pulley, plus internal cleaning and cleaning of the drum felt.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Repair</h2>
 <h3>What caused this dryer to stop heating?</h3><p>Diagnosis found a burned-out heating element with a broken coil. Heating was restored after the element was replaced and the dryer reassembled.</p>
 <h3>How many drum rollers were replaced?</h3><p>Four: two front rollers and two rear rollers. The belt idler pulley was replaced as well.</p>
 <h3>Was the drum felt replaced?</h3><p>No. The felt was cleaned and retained during this service.</p>
 <h3>Does every Samsung dryer without heat need an element?</h3><p>This article documents one confirmed repair. Another dryer with the same symptom needs its own diagnosis before parts are selected.</p></section>
 <section class="repair-story-section"><h2>Samsung Dryer Repair in Carmel, Indiana</h2><p>For a Samsung dryer that is not heating, contact Alex Appliance Repair for <a href="/carmel/dryer-repair-services.html">dryer repair in Carmel</a>. Share the full model number and the symptoms when requesting service.</p><p>Explore our <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair services</a>, <a href="/dryer-repair.html">dryer repair</a> and more <a href="/recent-work.html">documented repair stories</a>. We explain the findings and estimate before approved work and test the appliance after repair.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Carmel</a></section>
 </article>`;
}
