const base = 'images/repair-cases/whirlpool-wrs325sdhz01-ice-maker-fishers/';

export const whirlpoolFishersIceStory = {
 slug: 'fishers-whirlpool-wrs325sdhz01-refrigerator-ice-maker-replacement',
 title: 'Whirlpool Refrigerator Ice Maker Replacement in Fishers',
 headline: 'Whirlpool Refrigerator Not Making Ice in Fishers, Indiana',
 seoTitle: 'Whirlpool Ice Maker Repair in Fishers, IN | Alex Appliance Repair',
 description: 'A Whirlpool WRS325SDHZ01 stopped making ice in Fishers, IN. See the ice maker replacement, original repair photos and the confirmed water fill and ice production.',
 city: 'fishers',
 appliance: 'refrigerator',
 published: '2026-11-26',
 modified: '2026-11-26',
 editorialStylesheet: 'lg-fan-noblesville',
 summary: 'A Fishers homeowner called because their Whirlpool refrigerator had stopped making ice. Alex Appliance Repair diagnosed the WRS325SDHZ01, replaced the ice maker assembly and tested the replacement. Water filled the ice mold and the new unit produced ice.',
 overviewEntries: [
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Whirlpool side-by-side refrigerator'},
  {label:'Verified model',value:'WRS325SDHZ01'},
  {label:'Reported symptom',value:'Ice maker stopped working'},
  {label:'Repair',value:'Replaced the ice maker assembly'},
  {label:'Post-repair test',value:'Water fill and ice production confirmed'}
 ],
 overviewImage: {
  src: base + 'ice-maker-diagram.webp',
  width: 1600,
  height: 2111,
  caption: 'Whirlpool freezer diagram highlighting the automatic ice maker assembly'
 },
 photos: [
  ['refrigerator',1200,1600,'Whirlpool side-by-side refrigerator serviced in Fishers, Indiana'],
  ['model-label',207,97,'Original Whirlpool refrigerator model label showing WRS325SDHZ01'],
  ['freezer-mount',1200,1600,'Upper freezer compartment with the ice maker removed and its mounting points exposed'],
  ['replacement',1200,1600,'Replacement ice maker assembly in its packaging during the service visit'],
  ['ice-maker-reference',1000,1000,'Ice maker assembly reference showing the mold, housing and fill cup'],
  ['installed-ice-maker',1200,1600,'Replacement automatic ice maker mounted in the Whirlpool freezer'],
  ['ice-mold',1200,1600,'Close view of the installed ice mold, fill cup and wire shutoff arm']
 ].map(([name,width,height,caption]) => ({src:base+name+'.webp',width,height,caption}))
};

export function whirlpoolFishersIceArticle(story, image, escapeHtml) {
 const figure = (index, paired = false) => {
  const photo = story.photos[index];
  const maxWidth = paired ? 480 : Math.min(photo.width, 520 * photo.width / photo.height);
  const img = image(photo, index !== 0).replace('<img ', '<img style="aspect-ratio:'+photo.width+'/'+photo.height+';object-fit:contain!important" ');
  return `<figure class="lg-fan-photo" style="--photo-max:${maxWidth}px"><a class="gallery-item" href="/${photo.src}">${img}</a><figcaption>${escapeHtml(photo.caption)}</figcaption></figure>`;
 };
 const row = (index, heading, paragraphs) => {
  const side = index % 2 ? ' lg-fan-row--right' : '';
  return `<section class="repair-story-section lg-fan-row${side}">${figure(index)}<div class="lg-fan-copy"><h2>${heading}</h2>${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}</div></section>`;
 };
 return `<article class="case-body editorial-story">
 ${row(0,'The Service Call: The Refrigerator Stopped Making Ice',[
  'A homeowner in <strong>Fishers, Indiana</strong>, called Alex Appliance Repair when the automatic ice maker in their Whirlpool side-by-side refrigerator stopped working. During the on-site diagnosis, we determined that the ice maker assembly needed replacement.',
  'We installed a new ice maker in the freezer and checked its operation. <strong>The replacement filled with water and produced ice.</strong> The service photographs show the refrigerator, the mounting area behind the ice bin and the installed assembly.'
 ])}
 ${row(1,'Confirming the Whirlpool Model',[
  'The refrigerator label identifies this unit as <strong>Whirlpool WRS325SDHZ01</strong>. The close-up is cropped from the original appliance label and shows the full model, including the final 01 suffix.',
  'The full model helps identify the correct replacement for a specific refrigerator. If you are requesting ice maker service, send a clear photo of the model field along with a description of what happens at the ice bin and dispenser.'
 ])}
 ${row(2,'Accessing the Ice Maker in the Freezer',[
  'The ice maker sits in the upper part of the freezer above the collection bin. With the old assembly removed, the mounting points and the electrical connector are visible in the service photo. The fill spout is at the back of the compartment.',
  'The diagram in the visit overview shows the ice maker alongside the ice bin and other parts of the dispenser system. This repair focused on the assembly that takes in water and makes the cubes.'
 ])}
 <section class="repair-story-section">
 <h2>Replacing the Ice Maker Assembly</h2>
 <p>With the freezer mounting area exposed, the new ice maker was installed in the old assembly’s position. The service photo shows the replacement in its packaging. The component reference provides a clearer view of the mold and fill cup, which are partly hidden once the unit is in the freezer.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>On the mounted assembly, the fill cup sits at the end of the mold and receives water from the freezer’s fill spout. The mold holds the water as it freezes. The assembly then releases the cubes into the bin for storage.</p>
 </section>
 ${row(5,'Testing Water Fill and Ice Production',[
  'After installation, we tested the replacement ice maker. Water entered the mold, and the unit produced ice. Those observations confirmed that the new assembly could complete the two functions that mattered for this service call.',
  'The photograph shows the ice maker in its installed position. Water fill and ice production were confirmed by the operating check after installation.'
 ])}
 ${row(6,'Reading the Symptoms Before Ordering a Part',[
  'If the ice bin stays empty, tell the technician whether the ice maker has stopped completely or is making fewer cubes. If cubes are already in the bin but none come through the door, describe that separately. Ice production and dispensing involve different parts of the refrigerator.',
  'Whirlpool lists the ice maker setting, water supply and filter among the possible checks for a side-by-side refrigerator that stops making ice. On this particular refrigerator, the on-site diagnosis called for replacing the assembly. <a href="https://producthelp.whirlpool.com/Refrigeration/Full-Size_Refrigerators/Side_By_Side_Refrigerator/Ice_and_Water_Concerns/Ice_and_Dispenser_Concerns/Ice_Production/Not_Making_Ice/Not_Making_Ice_-_Side_by_Side_Refrigerator" target="_blank" rel="noopener">Whirlpool guidance on ice production</a>'
 ])}
 <section class="repair-story-section">
 <h2>Questions About Whirlpool Ice Maker Repair</h2>
 <h3>Which Whirlpool refrigerator was repaired?</h3>
 <p>The unit was a Whirlpool WRS325SDHZ01 side-by-side refrigerator in Fishers, Indiana. The full model is visible in the original label crop above.</p>
 <h3>Does an empty ice bin always mean the ice maker needs replacement?</h3>
 <p>Several conditions can stop ice production. An inspection helps determine whether the issue is with the ice maker assembly, its settings or its water supply. Replacement was the diagnosis for this refrigerator.</p>
 <h3>What was checked after installation?</h3>
 <p>The new ice maker was tested for water fill and ice production. Water reached the mold, and the replacement produced ice.</p>
 </section>
 <section class="repair-story-section">
 <h2>Book Whirlpool Refrigerator Repair in Fishers</h2>
 <p>If your refrigerator has stopped making ice, share the full model and what you see in the ice bin when you contact us. Alex Appliance Repair provides <a href="/fishers/refrigerator-repair-services.html">refrigerator repair in Fishers, Indiana</a>, including diagnosis of ice maker problems on <a href="/brands/whirlpool-appliance-repair.html">Whirlpool appliances</a>.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or request service online.</p>
 <a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator repair in Fishers</a>
 </section>
 </article>`;
}
