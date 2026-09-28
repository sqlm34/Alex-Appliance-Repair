const base='images/repair-cases/kenmore-drawer-fishers/';
export const drawerStory={
 slug:'fishers-kenmore-washer-softener-drawer-dc97-07125z',
 title:'Kenmore Washer Not Dispensing Fabric Softener',
 seoTitle:'Kenmore Washer Softener Repair in Fishers | Alex Appliance Repair',
 description:'Fabric softener would not flush out of a 15-year-old Kenmore 402-49032011 washer in Fishers. A failed water valve led to replacement of Samsung assembly DC97-07125Z.',
 city:'fishers',appliance:'washer',published:'2026-09-27',modified:'2026-09-27',
 summary:'Fabric softener was not flushing out of this 15-year-old Kenmore washer because a water valve was not working. The repair in Fishers, Indiana involved replacing the Samsung DC97-07125Z Assembly Housing Drawer.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Kenmore front-load washer, approximately 15 years old'},
  {label:'Model',value:'402-49032011'},
  {label:'Reported problem',value:'Fabric softener not flushing out of the dispenser'},
  {label:'Finding',value:'Nonworking water valve'},
  {label:'Work completed',value:'Samsung DC97-07125Z Assembly Housing Drawer replacement'}
 ],
 photos:[
  ['kenmore-washer-open',1200,1600,'Kenmore front-load washer with its top removed during service in Fishers, Indiana'],
  ['water-inlet-valves',1400,1050,'Water inlet valves, electrical connectors and dispenser hoses inside the Kenmore washer'],
  ['original-dispenser-connections',1400,1050,'Original dispenser housing connections with visible deposits and staining around the clamps'],
  ['dc97-07125z-replacement-assembly',1400,1050,'Replacement Samsung DC97-07125Z drawer housing assembly with hoses and valves laid out before installation'],
  ['new-drawer-housing-positioned',1200,1600,'Replacement drawer housing positioned inside the washer during installation'],
  ['housing-hose-and-clamp',1400,1050,'Close-up of the large hose connection and spring clamp below the drawer housing'],
  ['assembly-and-hose-routing',1200,1600,'Replacement housing and hose routing inside the open washer during reassembly']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'drawer-assembly-reference.webp',width:1236,height:1600,caption:'Supplied component reference showing the drawer housing assembly and its connected parts'}
};

export function drawerArticle(c,image,esc){
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 return `<article class="case-body editorial-story">
 ${row(0,'Fabric Softener Was Staying in the Dispenser',[
 '<strong>Fishers, Indiana.</strong> The concern with this approximately <strong>15-year-old Kenmore front-load washer</strong> was specific: fabric softener was not being flushed out of the dispenser. The identified fault was a water valve that was not working. The repair involved replacement of the <strong>Samsung DC97-07125Z Assembly Housing Drawer</strong>.',
 'The appliance identification label reads <strong>Kenmore 402-49032011</strong>. Kenmore is the brand of the washer; Samsung DC97-07125Z identifies the replacement assembly used for this job. The photograph shows the machine with its top removed for access to that assembly.'
 ])}
 ${row(1,'A Nonworking Water Valve',[
 'The service finding linked the softener complaint to a nonworking water valve. In this case, softener remaining in the drawer was not simply treated as a request to clean the visible tray: the repair addressed the failed valve through replacement of the assembly.',
 'The close-up shows the valve area, electrical connectors and hoses in the machine before the replacement. It provides context for the fault without implying that every valve visible in the photograph had failed.'
 ])}
 ${row(2,'The Original Housing and Connections',[
 'The original dispenser housing had visible deposits and staining around several hose connections and clamps. This close view records the condition of the existing components when the washer was opened.',
 'For this visit, the repair focused on the softener dispensing problem and the nonworking water valve. Access from above exposed both the housing and the hoses connecting it to the water supply components.'
 ])}
 ${row(3,'The Replacement: Samsung DC97-07125Z',[
 'The replacement <strong>DC97-07125Z Assembly Housing Drawer</strong> is shown on protective packaging before installation. The actual service photograph shows the white housing together with its connected hoses and valves, rather than just the removable detergent drawer.',
 'This was an assembly replacement, not a tray-only replacement. The component reference beside the visit overview illustrates the housing and surrounding parts. The part number records what was installed on this washer; it is not a blanket compatibility recommendation for other Kenmore models.'
 ])}
 ${row(4,'Positioning the New Housing',[
 'The next photograph shows the replacement housing positioned inside the open cabinet. It sits near the front of the washer, with the hoses extending toward the rear valve area. Installation was still in progress at this stage.',
 'The wide view helps connect the replacement part to its location in the appliance. It also distinguishes the dispenser work from unrelated repairs to the drum, motor or drain pump, none of which are part of the documented replacement for this visit.'
 ])}
 ${row(5,'The Hose Connection Below the Housing',[
 'The close-up underneath the housing shows a large black hose and its spring clamp at the connection. This is one of the less visible parts of the assembly that becomes accessible with the cabinet open.',
 'Together with the wider installation view, this detail shows how the housing connects to the rest of the washer. Replacing the assembly involved these hose connections as well as positioning the white housing itself.'
 ])}
 ${row(6,'Assembly Replacement on a 15-Year-Old Washer',[
 'The later service photograph shows the replacement housing seated in the cabinet and the hoses routed toward the rear. With the top still off, the relationship between the dispenser assembly, rear valves and washer tub is visible during reassembly.',
 'The completed repair for this Fishers visit was replacement of the Samsung DC97-07125Z drawer housing assembly to address the nonworking water valve behind the softener complaint. This approximately 15-year-old Kenmore received a component-level repair rather than being replaced as an entire appliance.'
 ])}
 <section class="repair-story-section"><h2>Washer Repair in Fishers, Indiana</h2><p>If fabric softener stays in your washer dispenser, include the model number and describe what remains in the drawer when requesting service. Similar symptoms do not automatically mean the same part has failed, and a different machine needs its own diagnosis.</p><p>Explore our <a href="/fishers/washer-repair-services.html">washer repair service in Fishers</a>, check <a href="/fishers.html">Fishers service coverage</a>, or browse more <a href="/recent-work.html">repair stories with original service photographs</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></section>
 </article>`;
}
