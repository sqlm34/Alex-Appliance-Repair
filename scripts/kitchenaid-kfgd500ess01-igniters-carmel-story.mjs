const base = 'images/repair-cases/kitchenaid-kfgd500ess01-igniters-carmel/';

export const kitchenAidCarmelOvenStory = {
 slug: 'carmel-kitchenaid-kfgd500ess01-double-oven-igniter-replacement',
 title: 'KitchenAid Double Oven Igniter Replacement',
 headline: 'KitchenAid Double Oven Not Heating in Carmel, Indiana',
 seoTitle: 'KitchenAid Double Oven Repair in Carmel, IN | Alex Appliance Repair',
 description: 'A KitchenAid KFGD500ESS01 had no heat in the lower oven and poor upper-oven heat. See the three igniter replacements and the on-site testing in Carmel, IN.',
 city: 'carmel',
 appliance: 'range',
 published: '2026-11-28',
 modified: '2026-11-28',
 editorialStylesheet: 'lg-fan-noblesville',
 summary: 'The lower oven in a Carmel homeowner’s KitchenAid gas range would not heat, and the upper oven heated poorly. Alex Appliance Repair diagnosed the KFGD500ESS01, replaced three oven igniters, reassembled the range and tested both ovens.',
 overviewEntries: [
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'KitchenAid double-oven gas range'},
  {label:'Verified model',value:'KFGD500ESS01'},
  {label:'Symptoms',value:'Lower oven cold, upper oven heating poorly'},
  {label:'Repair',value:'Replaced three oven igniters'},
  {label:'Test result',value:'Both ovens tested after reassembly'}
 ],
 enlargeOverviewImage: true,
 overviewImage: {
  src: base + 'oven-ignition-diagram.webp',
  width: 1529,
  height: 2300,
  caption: 'KitchenAid gas range parts diagram with oven igniter styles highlighted'
 },
 photos: [
  ["double-oven-range",1200,1600,"KitchenAid stainless steel double-oven gas range serviced in Carmel, Indiana"],
  ["range-before-service",1200,1600,"Front view of both oven doors and the KitchenAid control panel before service"],
  ["range-in-kitchen",1200,1600,"Wider view of the KitchenAid gas range in the Carmel kitchen"],
  ["range-controls-and-doors",863,1600,"Close front view of the cooktop controls and stacked oven doors"],
  ["model-label",332,42,"Original rating plate cropped to the KitchenAid model field KFGD500ESS01"],
  ["model-number-closeup",563,49,"Second close-up of the KitchenAid KFGD500ESS01 model number"],
  ["rear-service-access",1200,1600,"Rear service area with the cover removed during the KitchenAid repair"],
  ["rear-access-side-view",1200,1600,"Side view of the open rear service area and wiring"],
  ["lower-oven-access",1200,1600,"Lower oven with the bake burner and igniter area exposed"],
  ["lower-burner-closeup",1200,1600,"Close view of the lower bake burner and nearby igniter housing"],
  ["removed-igniter-assembly",1200,1600,"Removed oven burner section with the igniter bracket and braided leads visible"],
  ["bake-igniter-position",1200,1600,"Igniter housing beside the bake burner tube inside the oven"],
  ["igniter-reference-short-lead",1200,1240,"Reference image of a protected oven igniter with a short braided lead"],
  ["igniter-reference-long-lead",1145,1358,"Reference image of a protected oven igniter with a longer braided lead"],
  ["upper-oven-preheating",1200,1600,"Upper oven open during a preheat and burner check"],
  ["upper-bake-flame-detail",1200,1600,"Blue flame visible under the upper oven bake burner shield"],
  ["upper-bake-igniter-glow",1200,1600,"Glowing bake igniter beside the burner inside the upper oven"],
  ["broil-igniter-glow",1200,900,"Glowing igniter beside the overhead broil burner"],
  ["broil-burner-startup",1200,900,"Overhead burner and glowing igniter during the broil startup check"],
  ["broil-burner-flame",1200,900,"Blue flame along the overhead broil burner in the upper oven"],
  ["broil-flame-closeup",1200,900,"Close view of the blue broil flame next to the glowing igniter"],
  ["upper-oven-test",1200,1600,"Front view of the upper oven during the overhead burner test"],
  ["lower-bake-flame",1200,1600,"Lower oven bake burner lit beneath the convection fan cover"],
  ["lower-bake-flame-closeup",1200,1600,"Blue flame and glowing igniter along the lower oven bake burner"],
  ["double-oven-test-view",1200,1600,"Both oven cavities visible during the KitchenAid range service check"]
 ].map(([name,width,height,caption]) => ({src:base+name+'.webp',width,height,caption}))
};

export function kitchenAidCarmelOvenArticle(story, image, escapeHtml) {
 const figure = (index, paired = false) => {
  const photo = story.photos[index];
  const maxWidth = paired ? Math.min(photo.width, 480) : Math.min(photo.width, 520 * photo.width / photo.height);
  const img = image(photo, index !== 0).replace('<img ', '<img style="aspect-ratio:'+photo.width+'/'+photo.height+';object-fit:contain!important" ');
  return `<figure class="lg-fan-photo" style="--photo-max:${maxWidth}px"><a class="gallery-item" href="/${photo.src}">${img}</a><figcaption>${escapeHtml(photo.caption)}</figcaption></figure>`;
 };
 const pair = (first, second) => `<div class="case-photo-grid lg-fan-pair">${figure(first,true)}${figure(second,true)}</div>`;
 const row = (index, heading, paragraphs, right = false) =>
  `<section class="repair-story-section lg-fan-row${right ? ' lg-fan-row--right' : ''}">${figure(index)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(text=>`<p>${text}</p>`).join('')}</div></section>`;

 return `<article class="case-body editorial-story">
 ${row(0,'The Service Call for Two Different Heating Symptoms',[
  'A Carmel homeowner called Alex Appliance Repair about two problems on the same KitchenAid gas range. The <strong>lower oven would not heat at all</strong>, and the <strong>upper oven heated poorly</strong>. Both symptoms mattered because a double oven has separate burner functions to evaluate.',
  'Our technician diagnosed the range on site and determined that all three oven igniters needed replacement. The repair covered the lower bake burner, the upper bake burner and the upper broil burner. After installing the new igniters, we reassembled the range and checked operation.'
 ])}
 <section class="repair-story-section">
 <h2>Identifying the KitchenAid Double Oven</h2>
 <p>The appliance was a stainless steel KitchenAid double-oven gas range. The first photos show the two oven doors and the separate control groups on the back panel. Those controls gave us a clear way to talk about which cavity and mode were affected when the customer described the heating problem.</p>
 ${pair(1,2)}
 <p>The full model on the rating plate is <strong>KFGD500ESS01</strong>. The final <strong>01</strong> identifies the version serviced. A clear photo of the model field is especially useful when a range has more than one oven and uses different igniter configurations.</p>
 ${pair(4,5)}
 </section>
 ${row(3,'Why the Upper and Lower Ovens Were Checked Separately',[
  'On this KitchenAid, the upper cavity has separate bake and broil burners, and the lower cavity has its own bake burner. The model label identifies all three functions. A single range can therefore show several heating symptoms at once even though the controls and oven lights still come on.',
  'A hot-surface igniter gets hot enough to light gas at its burner. A glow can be visible before flame appears, so a picture of a glowing igniter and a picture of a lit burner document different moments in the ignition sequence.',
  'KitchenAid’s model overview shows the two-cavity range. <a href="https://www.kitchenaid.com/major-appliances/ranges/double-oven-ranges/p.KFGD500ESS.html" target="_blank" rel="noopener">KitchenAid model overview</a>'
 ],true)}
 <section class="repair-story-section">
 <h2>Accessing the Ignition Components</h2>
 <p>The rear service photos show the wiring area with the back cover off. The oven-cavity photos show the other side of the job, where the bake burner and its igniter sit beneath the oven floor. Seeing both areas helps explain why servicing a covered bake burner involves access beyond the control panel.</p>
 ${pair(6,7)}
 <p>In the lower oven, the bake burner runs along the floor of the cavity. Its igniter is mounted near the back end of the burner, where the close-up shows the vented metal housing beside the burner tube.</p>
 ${pair(8,9)}
 </section>
 <section class="repair-story-section">
 <h2>Replacing Three Oven Igniters</h2>
 <p>We replaced the three igniters identified during diagnosis. The close-ups show a removed burner section with its bracket and braided leads, and an igniter housing beside a bake burner tube. The supplied diagram in the visit overview locates the igniter styles relative to the burner assemblies.</p>
 ${pair(10,11)}
 <p>The two reference images show differences in lead length and mounting shape. Position and fit matter on a double-oven range because each igniter has to sit next to its own burner and reach the corresponding connection.</p>
 ${pair(12,13)}
 </section>
 <section class="repair-story-section">
 <h2>Checking the Upper Oven Bake Burner</h2>
 <p>The upper bake check is shown in the wider photo of the open cavity and in the side view of the burner area. Blue flame is visible beneath the burner shield. The other close-up shows the igniter glowing near the burner during the ignition sequence.</p>
 ${pair(14,15)}
 <p>These views document the bake burner at the shield and at the igniter itself. The broil burner sits overhead and was checked separately.</p>
 ${figure(16)}
 </section>
 <section class="repair-story-section">
 <h2>Checking the Upper Oven Broil Burner</h2>
 <p>These frames show the overhead broil burner as the igniter glows and as blue flame becomes visible along the burner ports. The wider view places the broil burner at the top of the upper oven, above the floor shield that covers the bake burner.</p>
 ${pair(17,18)}
 <p>The next two photographs show the lit burner from different angles, including the area immediately beside the igniter. That distinction is useful when an upper oven heats poorly in one mode but behaves differently in another.</p>
 ${pair(19,20)}
 </section>
 ${row(21,'Testing Continued Through Reassembly',[
  'After the igniters were installed, the technician reassembled the KitchenAid range, turned it on and tested both ovens. The upper bake and upper broil checks addressed the complaint about weak heating in the smaller cavity. The lower bake check addressed the cavity that had stayed cold.',
  'The service photographs of the exposed burners document ignition during the inspection. The range was checked again after reassembly.'
 ],true)}
 <section class="repair-story-section">
 <h2>Lower Oven Heat After the Igniter Replacement</h2>
 <p>The lower oven’s bake burner lit during testing. The close-ups show blue flame along the tube and the igniter glowing nearby, with the convection fan cover visible in the wider frame.</p>
 ${pair(22,23)}
 <p>The final service view shows both cavities and the control panel during the check. The repair visit ended with both ovens tested after reassembly.</p>
 ${figure(24)}
 </section>
 <section class="repair-story-section">
 <h2>Questions About KitchenAid Double Oven Heating</h2>
 <h3>Can the upper oven heat poorly while the lower one stays cold?</h3>
 <p>Yes. Each cavity has its own bake burner, and this model also has an upper broil burner. On this range, diagnosis found that all three oven igniters needed replacement. The same symptoms on another range should be checked before parts are ordered.</p>
 <h3>Does a glowing igniter mean the burner has lit?</h3>
 <p>A glowing igniter is one stage of the sequence. The burner lighting is a separate observation. The service photos in this case show both the orange glow of the igniter and blue flame at the burners.</p>
 <h3>What should I mention when booking a visit?</h3>
 <p>Share the full model number, which oven is affected, and whether the problem happens in Bake, Broil or both. It also helps to describe whether the oven stays cold or starts heating but struggles during preheat.</p>
 </section>
 <section class="repair-story-section">
 <h2>Book KitchenAid Oven Repair in Carmel</h2>
 <p>Alex Appliance Repair provides <a href="/carmel/stove-repair-services.html">gas range and oven repair in Carmel, Indiana</a>, including on-site diagnosis for <a href="/carmel/kitchenaid-appliance-repair.html">KitchenAid appliances</a>. If one or both ovens stop heating properly, tell us which mode is affected when you book.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or request service online.</p>
 <a class="local-button" href="https://aleksappliancerepair.com/booking">Book oven repair in Carmel</a>
 </section>
 </article>`;
}
