const base='images/repair-cases/maytag-dryer-mccordsville/';
export const maytagDryerStory={
 slug:'mccordsville-maytag-medb835dc4-dryer-rollers-idler-repair',
 title:'Maytag Bravos XL Dryer Noise Repair',
 headline:'Maytag MEDB835DC4 Dryer Noise Repair in McCordsville',
 cardTitle:'Maytag Bravos XL: Five Rollers, Idler Pulley and Lint Cleaning',
 seoTitle:'Maytag Dryer Noise Repair in McCordsville | Alex Repair',
 description:'Maytag MEDB835DC4 dryer repair in McCordsville, IN: five drum rollers and idler pulley replaced, internal lint and both drum felt seals cleaned.',
 city:'mccordsville',appliance:'dryer',published:'2026-10-05',modified:'2026-10-05',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A squeaking Maytag Bravos XL dryer with a bouncing, thumping drum needed five support rollers and an idler pulley. We replaced these parts, vacuumed the cabinet and internal duct, cleaned the felt seals at both ends of the drum, then reassembled and tested the dryer in McCordsville.',
 overviewEntries:[
  {label:'Location',value:'McCordsville, Indiana'},
  {label:'Appliance',value:'Maytag Bravos XL electric dryer'},
  {label:'Model',value:'MEDB835DC4'},
  {label:'Symptoms',value:'Squeaking, drum bouncing and thumping'},
  {label:'Parts replaced',value:'Five drum support rollers and idler pulley'},
  {label:'Cleaning',value:'Cabinet, internal lint duct and both drum felt seals'},
  {label:'Completion',value:'Reassembled and tested'}
 ],
 photos:[
  ['maytag-tested',1200,1600,'Reassembled Maytag Bravos XL dryer during the final test in McCordsville'],
  ['medb835dc4-model',435,100,'Original model-label crop: MEDB835DC4'],
  ['cabinet-before',1200,1600,'Cabinet before lint removal'],
  ['cabinet-after',1200,1600,'Cabinet after vacuuming'],
  ['three-front-rollers',1200,1600,'Three replacement front rollers'],
  ['two-rear-rollers',1200,1600,'Two replacement rear rollers'],
  ['idler-installed',1400,1050,'Replacement idler pulley beside the motor'],
  ['duct-before',1400,1050,'Internal duct before cleaning'],
  ['duct-after',1200,1600,'Internal duct after cleaning'],
  ['felt-before',1200,1600,'Lint around the drum felt before cleaning'],
  ['felt-after',1200,1600,'Drum felt after vacuuming'],
  ['cleaned-drum',1200,1600,'Removed drum with cleaned felt seal'],
  ['reassembly',1200,1600,'Drum and front support during reassembly'],
  ['reference-idler-diagram',1700,2221,'WED5800BW0 reference: idler assembly'],
  ['reference-roller-diagram',1700,2507,'WED5800BW0 reference: drum rollers'],
  ['idler-reference',2384,2858,'Idler reference: W10837240'],
  ['roller-reference',450,450,'Roller reference: WPW10314173']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function maytagDryerArticle(c,image,esc){
 const figure=(i,paired=false,parts=false)=>{
  const p=c.photos[i];
  const max=paired?520:Math.min(p.width,520*p.width/p.height);
  const frame=paired?`style="aspect-ratio:${parts?'1':'4/3'};position:relative"`:'';
  const sizing=paired?`position:absolute;inset:${parts?20:0}px;width:calc(100% - ${parts?40:0}px);height:calc(100% - ${parts?40:0}px);object-fit:contain!important;aspect-ratio:auto`:`aspect-ratio:${p.width}/${p.height};object-fit:contain!important`;
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" ${frame} href="/${p.src}">${image(p,i!==13).replace('<img ',`<img style="${sizing}" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,heading,paragraphs)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b,parts=false)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true,parts)}${figure(b,true,parts)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(13,'Parts Reference: Idler Pulley',[
 'This supplied drawing is a <strong>Whirlpool WED5800BW0 reference diagram</strong>, not an exact parts diagram for the Maytag MEDB835DC4 repaired here. Its highlighted callout illustrates the belt-tensioning idler assembly.',
 'The service photographs below document the actual Maytag repair. This reference drawing should not be used by itself to select compatible parts.'
 ])}
 ${row(14,'Parts Reference: Drum Support Rollers',[
 'The second supplied <strong>WED5800BW0 reference diagram</strong> illustrates front and rear drum support rollers. Its layout differs from this Maytag: <strong>the serviced dryer has five rollers, three at the front and two at the rear</strong>, as shown in the repair photographs.',
 'The drawings provide context for the components discussed below; they do not establish the exact Maytag parts layout or compatibility.'
 ])}
 ${row(1,'Maytag Model MEDB835DC4',[
 'The photographed appliance label identifies this dryer as <strong>Maytag MEDB835DC4</strong>, a Bravos XL electric dryer. The crop preserves the original model line and excludes the serial number.',
 'At this service visit in <strong>McCordsville, Indiana</strong>, the customer reported a squeaking noise together with a drum that bounced and made a thumping sound. Diagnosis identified the drum support rollers and idler pulley for replacement.'
 ])}
 <section class="repair-story-section"><h2>Replacing All Five Drum Support Rollers</h2><p>We replaced all five support rollers: <strong>three on the front bulkhead and two on the rear support</strong>. The removed front assembly made the three front positions accessible; the rear pair was accessible with the drum out of the cabinet.</p><p>Drum support rollers carry the drum as it turns. In this case, the reported uneven drum movement and noise led to inspection and replacement of the complete set, not just one roller. These photographs show the replacements installed.</p>${pair(4,5)}</section>
 ${row(6,'Replacing the Idler Pulley',[
 'The idler pulley maintains tension on the drive belt and is separate from the five rollers supporting the drum. We replaced the idler as part of the same noise repair.',
 'The service photograph shows the replacement pulley beside the motor. The documented replacement work for this visit was the five support rollers and the idler pulley.'
 ])}
 <section class="repair-story-section"><h2>Supplied Component References</h2><p>The supplied product images are labeled <strong>W10837240</strong> for the idler assembly and <strong>WPW10314173</strong> for the roller. They are visual references, not a verified Maytag MEDB835DC4 ordering list. Part selection requires checking the full appliance model and the applicable parts information.</p>${pair(15,16,true)}</section>
 <section class="repair-story-section"><h2>Vacuuming Lint From the Cabinet</h2><p>Removing the drum also revealed accumulated lint across the cabinet floor and around the internal assemblies. We vacuumed and cleaned the accessible cabinet interior while the dryer was apart.</p><p>The before-and-after photographs show the same cabinet. Cleaning removed the loose buildup; it was additional work performed during the mechanical repair, not a claim that lint alone caused the drum to bounce.</p>${pair(2,3)}</section>
 <section class="repair-story-section"><h2>Cleaning the Internal Lint Duct</h2><p>The removed internal duct contained a thick layer of lint. We cleaned this passage before putting it back into the dryer. The paired images show the lint-filled passage and its condition after cleaning.</p><p>This was cleaning inside the appliance. The work described here does not include a documented cleaning of the entire household exhaust duct.</p>${pair(7,8)}</section>
 <section class="repair-story-section"><h2>Cleaning the Felt at Both Ends of the Drum</h2><p>Lint was also caught in the felt at both ends of the drum. With the drum removed, we vacuumed the felt on both sides and cleaned the accessible surrounding areas.</p><p><strong>The felt seals were cleaned, not replaced.</strong> The detail photographs show the accumulated lint and a cleaned section of the existing felt.</p>${pair(9,10)}</section>
 ${row(11,'Drum Ready for Reassembly',[
 'After cleaning the felt on both ends, we prepared the drum for installation. The photograph shows the removed drum and its cleaned felt edge.',
 'The replacement rollers and idler were already installed, and the cabinet and internal duct had been cleaned before reassembly continued.'
 ])}
 ${row(12,'Putting the Dryer Back Together',[
 'We reinstalled the drum and front support assembly, then completed reassembly of the dryer. This photograph records the work in progress before the exterior was fully closed.',
 'The completed repair combined mechanical parts replacement with internal lint removal and cleaning of the existing drum felt.'
 ])}
 ${row(0,'Reassembled and Tested in McCordsville',[
 'Once assembled, the dryer was tested. The final photograph shows the Maytag back together with its controls powered during the test.',
 'The completed service included all five drum support rollers, the idler pulley, cabinet and internal duct cleaning, and vacuuming the felt at both ends of the drum.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Maytag Dryer Repair</h2><h3>How many rollers were replaced?</h3><p>Five: three front rollers and two rear rollers. The idler pulley was an additional, separate component.</p><h3>Were the drum felt seals replaced?</h3><p>No. The existing felt on both ends of the drum was vacuumed and cleaned.</p><h3>Does every squeaking Maytag need the same repair?</h3><p>No. These findings belong to this appliance and service visit. Similar sounds can require a different repair, so the dryer needs its own inspection.</p><h3>What information helps when booking service?</h3><p>Share the full model number and describe the sound and drum movement. A recording of the symptom can help communicate the complaint before the on-site inspection.</p></section>
 <section class="repair-story-section"><h2>Maytag Dryer Repair in McCordsville</h2><p>For a squeaking or thumping dryer, Alex Appliance Repair provides <a href="/dryer-repair.html">dryer repair</a> in <a href="/mccordsville.html">McCordsville, Indiana</a>. See our <a href="/recent-work.html">recent repair stories</a>, including a <a href="/repair-cases/westfield-whirlpool-wed5800bw0-dryer-noise-rollers-idler-pulley.html">Whirlpool dryer roller and idler repair in Westfield</a>.</p><p>Alex Appliance Repair is an independent service operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair</a></section>
 </article>`;
}
