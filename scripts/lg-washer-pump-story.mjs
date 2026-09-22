export const washerStory = {
 slug: 'carmel-lg-wm3997hwa-drain-pump',
 title: 'LG WM3997HWA Drain Pump Replacement',
 seoTitle: 'LG WM3997HWA Washer Not Draining in Carmel, IN | Alex Appliance Repair',
 description: 'LG WM3997HWA /01 washer repair in Carmel, Indiana: water left in the drum, wet-vacuum water removal and drain pump replacement with original service photos.',
 city: 'carmel', appliance: 'washer', published: '2026-09-22', modified: '2026-09-22',
 summary: 'Water remained in the drum of this LG WM3997HWA /01 in Carmel. We removed the standing water, opened the washer and replaced the drain pump.',
 overviewEntries: [
  {label:'Location',value:'Carmel, Indiana'},
  {label:'Appliance',value:'LG front-load washer'},
  {label:'Model',value:'WM3997HWA /01'},
  {label:'Reported problem',value:'Water remaining in the drum; washer not draining'},
  {label:'Work completed',value:'Water removal and LG drain pump replacement'}
 ],
 photos: [
  ['lg-wm3997hwa-washer',1200,1600,'LG WM3997HWA front-load washer serviced for a drainage problem in Carmel, Indiana'],
  ['removing-water-with-wet-vacuum',1200,1600,'Wet vacuum used to remove remaining water during the LG washer drain pump repair'],
  ['washer-front-panel-removed',1200,1600,'LG washer with its front panel removed to access the pump assembly below the drum'],
  ['old-and-new-lg-drain-pumps',1400,1050,'Old and replacement LG drain pumps beside the removed pump housing during service'],
  ['lg-washer-pump-housing-access',1200,1600,'Lower-front pump housing and hose connections exposed during LG WM3997HWA service'],
  ['lg-wm3997hwa-model-label',545,60,'Model label identifying this LG washer as WM3997HWA /01']
 ].map(([name,width,height,caption])=>({src:`images/repair-cases/lg-wm3997hwa-drain-pump-carmel/${name}.webp`,width,height,caption})),
 overviewImage: {src:'images/repair-cases/lg-wm3997hwa-drain-pump-carmel/lg-wm3997hwa-pump-location-diagram.webp',width:1240,height:1515,caption:'LG WM3997HWA exploded-view reference diagram with the pump position highlighted'}
};

export function washerArticle(c,image,esc){
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 return `<article class="case-body editorial-story">
 ${row(0,'Water Left in the Drum of an LG Washer',[
 'This service visit in <strong>Carmel, Indiana</strong> involved an LG washer that was not pumping water out of the drum. Water remained inside instead of being discharged, leaving the homeowner with a drainage problem that needed attention before normal laundry use could resume.',
 'The repair addressed the <strong>LG drain pump</strong>. The standing water was removed with a wet vacuum, the washer was opened for access, and the old pump was removed and replaced. The photographs below follow that work from access to the replacement components.'
 ])}
 ${row(5,'Identifying the Model: LG WM3997HWA /01',[
 'The appliance label identifies the machine as <strong>LG WM3997HWA /01</strong>. The model number is useful when arranging service because washers that look similar can have different internal layouts and component requirements.',
 'For this visit, the reported symptom was water remaining in the drum and not being pumped out. The model label and service photographs document the actual machine involved, rather than a generic example of a washer repair.'
 ])}
 ${row(1,'Removing the Water Before Pump Access',[
 'The remaining water had to be managed as part of the repair. A wet vacuum was used to extract water from the washer, and towels were laid out around the working area. The photograph shows the vacuum and hose alongside the partially opened machine.',
 'Removing the water was preparation for the pump work, not the repair itself. Emptying the drum does not replace the component responsible for pumping water away during operation. The next stage was to gain access to that component.'
 ])}
 ${row(2,'Opening the Washer to Reach the Pump Assembly',[
 'The washer was disassembled to reach the pump area beneath the drum. With the front panel removed, the lower pump housing, connected hoses and surrounding components became accessible. This wider view shows where the repair took place inside the cabinet.',
 'The exploded-view diagram in the visit overview provides a reference for the pump position. It is a component-layout illustration, while the service photographs show the actual washer and the parts removed during this job.'
 ])}
 ${row(3,'The Old Drain Pump and Its Replacement',[
 'The old LG drain pump was removed, and a replacement drain pump was installed. The side-by-side photograph shows both pumps next to the removed housing, making this stage of the work visible without relying on a stock image.',
 'The documented replacement was the drain pump. The photograph also includes the housing and other parts of the assembly; it should not be read as a claim that every component shown was replaced. No additional board, motor or drum repair is described for this visit.'
 ])}
 ${row(4,'Working in the Lower-Front Pump Area',[
 'The close-up shows the pump housing and hose connections below the drum. This is the area that needed access for removal of the old pump and installation of the replacement. A small exterior filter opening and full access to the pump assembly are not the same thing.',
 'For the homeowner, the important distinction is between removing trapped water and addressing the drainage fault. In this repair, the work went beyond water removal: the LG drain pump itself was replaced.'
 ])}
 <section class="repair-story-section"><h2>What to Tell Us When a Washer Will Not Drain</h2><p>When requesting service, include the model number, whether water remains in the drum, and when the cycle stops. Mention any displayed error message or unusual sound if you observed one. Those details help describe the problem without assuming that every drainage complaint needs the same repair.</p><p>This article documents one pump replacement on an LG WM3997HWA /01. It is not a diagnosis for every washer with water inside. Leave internal disassembly and electrical work to a qualified service professional, and avoid forcing the door open when water is visible inside.</p></section>
 <section class="repair-story-section"><h2>LG Washer Repair in Carmel, Indiana</h2><p>If your LG WM3997HWA or another washer is leaving water in the drum, our <a href="/carmel/washer-repair-services.html">washer repair service in Carmel</a> can evaluate the problem and explain the recommended work. Include a photograph of the model label when booking so we can identify the appliance.</p><p>Explore our <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a>, check <a href="/carmel.html">Carmel service coverage</a>, or read more <a href="/recent-work.html">real repair stories</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></section>
 </article>`;
}
