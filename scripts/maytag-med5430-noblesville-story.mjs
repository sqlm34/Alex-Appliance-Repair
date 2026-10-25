const base='images/repair-cases/maytag-med5430-noblesville/';
export const maytagNoblesvilleStory={
 slug:'noblesville-maytag-med5430mw0-dryer-not-heating-repair',
 title:'Maytag Dryer Thermal Fuse, Cut-Off and Roller Repair',
 headline:'Maytag MED5430MW0 Dryer Not Heating in Noblesville, Indiana',
 cardTitle:'Maytag Dryer Not Heating: Thermal Protection and Roller Repair in Noblesville',
 seoTitle:'Maytag MED5430MW0 Not Heating | Noblesville Dryer Repair',
 description:'Maytag MED5430MW0 dryer not heating in Noblesville, IN. Thermal fuse, thermal cut-off, two drum rollers and idler pulley replaced; dryer cleaned and tested.',
 city:'noblesville',appliance:'dryer',published:'2026-10-25',modified:'2026-10-25',
 editorialStylesheet:'lg-fan-noblesville',
 summary:'A Noblesville homeowner called because their Maytag dryer was not heating. The service included replacement of the thermal fuse and heater thermal cut-off, two drum support rollers and the idler pulley, followed by interior cleaning, reassembly and a successful operating test.',
 overviewEntries:[
  {label:'Location',value:'Noblesville, Indiana'},
  {label:'Appliance',value:'Maytag electric dryer'},
  {label:'Model',value:'MED5430MW0'},
  {label:'Complaint',value:'Dryer not heating'},
  {label:'Heating repair',value:'Thermal fuse and thermal cut-off'},
  {label:'Drive repair',value:'Two drum rollers and idler pulley'},
  {label:'Cleaning',value:'Cabinet and drum cleaned'},
  {label:'Result',value:'Reassembled, tested; heat restored'}
 ],
 overviewImages:[
  {src:base+'bulkhead-diagram.webp',width:1855,height:2472,caption:'Maytag MED5430MW0 bulkhead diagram highlighting the thermal fuse and two drum support rollers'},
  {src:base+'idler-diagram.webp',width:1855,height:2352,caption:'Maytag MED5430MW0 cabinet diagram highlighting the idler pulley assembly'}
 ],
 photos:[
  ['dryer',1200,1600,'Maytag MED5430MW0 dryer at the Noblesville service visit'],
  ['model-label',210,82,'Original model label: Maytag MED5430MW0'],
  ['rear-open',1200,1600,'Rear of the Maytag dryer opened for diagnosis and access to heating and blower components'],
  ['old-cutoff',1200,1600,'Removed metal-bodied thermal cut-off from the Maytag dryer'],
  ['new-cutoff',1200,1600,'Replacement heater thermal cut-off with red and purple wires connected'],
  ['blower-fuse',1200,1600,'White thermal fuse on the blower housing with the lint chute removed'],
  ['old-roller',1200,1600,'Original drum support roller with lint around the shaft before replacement'],
  ['old-idler',1200,1600,'Removed idler pulley assembly with accumulated lint'],
  ['new-roller',1200,1600,'Replacement drum support roller installed on the Maytag dryer bulkhead'],
  ['new-idler',1200,1600,'New belt-tensioning idler pulley installed beside the drive motor'],
  ['cleaned-cabinet',1200,1600,'Cleaned dryer cabinet with two replacement drum rollers and the new idler pulley'],
  ['drum-cleaning',1200,1600,'Vacuum cleaning of the removed Maytag dryer drum'],
  ['reassembly',1200,1600,'Maytag dryer drum and belt back in position during reassembly'],
  ['tested-dryer',1200,1600,'Maytag dryer reassembled at the end of the Noblesville repair visit']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};

export function maytagNoblesvilleArticle(c,image,esc){
 const figure=(i,paired=false)=>{
  const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);
  return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;
 };
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 const pair=(a,b)=>`<div class="case-photo-grid lg-fan-pair">${figure(a,true)}${figure(b,true)}</div>`;
 return `<article class="case-body editorial-story">
 ${row(0,'A Maytag Dryer With No Heat',[
  'A homeowner in <strong>Noblesville, Indiana</strong>, contacted Alex Appliance Repair because their Maytag dryer was not heating at all. A no-heat complaint calls for diagnosis before choosing a replacement part: the heating element is not the only component involved in producing heat.',
  'During this visit, the dryer was opened and inspected. The completed repair addressed two thermal-protection components and additional mechanical wear in the drum support and belt-tensioning system. Cleaning and a post-repair test were also part of the service.'
 ])}
 ${row(1,'Model Confirmed: Maytag MED5430MW0',[
  'The appliance label identifies this dryer as <strong>Maytag MED5430MW0</strong>. The photograph here is a crop of the original model-number area, with the serial number left out.',
  'When booking service for a Maytag dryer that is not heating, the complete model number helps identify the correct appliance configuration. Describing whether it starts, turns the drum or produces any warmth also helps distinguish a heating complaint from a separate starting or mechanical problem.'
 ])}
 ${row(2,'Opening the Dryer for Diagnosis',[
  'The rear panel and lint-chute assembly were removed to access the components. The technician also removed the drum to inspect its support rollers and the idler pulley near the motor.',
  'The no-heat repair involved the <strong>thermal fuse and the heater thermal cut-off</strong>. Separately, two drum support rollers and the idler pulley were replaced. These are different systems: servicing worn drum supports does not, by itself, repair an electrical heating fault.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Heater Thermal Cut-Off</h2><p>The metal-bodied component shown below is the heater thermal cut-off. The service photographs show the removed component and the replacement with red and purple wires attached.</p>${pair(3,4)}<p>This thermal-protection device is separate from the white thermal fuse on the blower housing. Replacing it was part of the heating repair. The photographs make it easier to distinguish the two components when discussing the service; wire colors alone should not be used to identify a replacement part.</p></section>
 ${row(5,'The White Thermal Fuse Was Also Replaced',[
  'The second thermal-protection component replaced during the visit was the <strong>thermal fuse</strong> on the blower housing. The white, elongated fuse can be seen near the blower opening in the service photograph.',
  'Both thermal-protection components were addressed during this visit. A similar symptom on another dryer still needs its own diagnosis: the model number and a description of what happens when a cycle starts are more useful than assuming a particular fuse must be the problem.'
 ])}
 <section class="repair-story-section"><h2>Two Drum Rollers and an Idler Pulley</h2><p>Inspection also identified mechanical components that needed attention. We replaced <strong>two drum support rollers and one idler pulley assembly</strong>. The rollers support the drum; the separate idler maintains tension on the drive belt.</p>${pair(6,7)}<p>The before-service photographs show lint around an original roller shaft and on the removed idler assembly. These findings were handled while the dryer was already open. They were additional repair needs, not presented as the cause of the loss of heat.</p></section>
 <section class="repair-story-section"><h2>Replacement Drive Components Installed</h2><p>The new support rollers and idler were installed before the drum was returned to the cabinet. The close-up photographs show a replacement roller and the new belt-tensioning pulley beside the motor.</p>${pair(8,9)}<p>There are two drum rollers in the completed repair, plus the separate idler pulley. Keeping those names distinct helps when requesting service for a noisy dryer, a drum that does not turn properly or a belt-tensioning concern. This visit began with a heating complaint but included those mechanical repairs as well.</p></section>
 <section class="repair-story-section"><h2>Vacuum Cleaning the Cabinet and Drum</h2><p>With the drum removed, the dryer interior was vacuumed and cleaned. The photographs show the cleaned cabinet and the drum being cleaned before reassembly.</p>${pair(10,11)}<p>Opening the machine provided access to lint that was not reachable through the normal lint-screen opening. The cleaning covered the appliance interior and drum. A home's exhaust duct is a separate part of the drying system and may require its own inspection or cleaning; this visit does not establish a house-duct blockage as the cause of the heating failure.</p></section>
 ${row(12,'Reassembly and an Operating Test',[
  'The drum and belt were returned to position, the removed assemblies were reinstalled and the dryer was fully reassembled. The photograph shows an intermediate stage, with the top still open, before the final check.',
  'After reassembly, the technician started and tested the dryer. <strong>Heating and operation were restored.</strong> That final operating check completed the visit, confirming that the machine worked again after the thermal-protection and mechanical repairs.'
 ])}
 ${row(13,'A Working Dryer at the End of the Visit',[
  'The completed Noblesville service included the thermal fuse, heater thermal cut-off, two drum support rollers, one idler pulley, interior and drum cleaning, reassembly and testing.',
  'For the homeowner, the important result was a dryer that heated again. For another owner with a similar symptom, the useful lesson is to have the machine diagnosed as a whole instead of assuming that a heating element or a particular fuse must be the answer.'
 ])}
 <section class="repair-story-section"><h2>MED5430MW0 Parts References</h2><p>The <a href="https://www.whirlpool.com/content/dam/global/documents/202312/repair-parts-list-w11638107-revc.pdf">manufacturer parts list for MED5430MW0</a> identifies the thermal fuse as <strong>3392519</strong>, the idler assembly as <strong>691366</strong> and the drum support roller as <strong>3397590</strong>. The supplied parts references also use <strong>WP3392519</strong> and <strong>WP691366</strong>.</p><p>The catalog lists <strong>W10900067</strong> as the thermal cut-off kit, including a thermostat. This is a catalog reference, not a claim that every item in that kit was installed during this visit. The documented work was replacement of the white thermal fuse and heater thermal cut-off, along with the drive components described above. Exact replacement selection and any superseded part numbers should be checked against the appliance model before ordering.</p></section>
 <section class="repair-story-section"><h2>Maytag Dryer Not Heating: Common Questions</h2>
 <h3>Does no heat always mean the heating element is bad?</h3><p>No. This service involved replacement of thermal-protection components. A technician needs to identify the actual fault before recommending a heating element or other parts.</p>
 <h3>Are the thermal fuse and thermal cut-off the same part?</h3><p>No. This dryer has separate components on the blower housing and heater housing. Both were replaced during this service visit.</p>
 <h3>Did the drum rollers cause the no-heat problem?</h3><p>The roller and idler replacements addressed additional mechanical issues found during inspection. They are not identified as the cause of the heating failure.</p>
 <h3>How many rollers were replaced?</h3><p>Two drum support rollers were replaced, together with one separate idler pulley assembly that tensions the belt.</p>
 <h3>Can I request repair using the model or part number?</h3><p>Yes. Mention Maytag MED5430MW0 and describe the symptom. References such as WP3392519 thermal fuse or WP691366 idler pulley can help explain your concern, but diagnosis and part compatibility still need verification.</p></section>
 <section class="repair-story-section"><h2>Maytag Dryer Repair in Noblesville, Indiana</h2><p>If your Maytag dryer is not heating, contact Alex Appliance Repair for <a href="/noblesville/dryer-repair-services.html">dryer repair in Noblesville</a>. Have the full model number ready and tell us what the dryer does when you start a cycle.</p><p>Explore our <a href="/dryer-repair.html">dryer repair services</a>, <a href="/noblesville.html">Noblesville service coverage</a> and <a href="/recent-work.html">recent appliance repair stories</a>. For a different drive-system repair, see this <a href="/repair-cases/mccordsville-lg-dle5977s-dryer-belt-rollers-idler-repair.html">LG dryer with a broken belt and seized rollers</a>.</p><p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss your dryer and arrange service.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer repair in Noblesville</a></section>
 </article>`;
}
