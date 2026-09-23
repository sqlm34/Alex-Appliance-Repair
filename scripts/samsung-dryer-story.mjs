const base = 'images/repair-cases/samsung-dv330aew-mccordsville/';
export const samsungStory = {
 slug:'mccordsville-samsung-dv330aew-dryer-belt-idler-pulley',
 title:'Samsung DV330AEW/XAA Dryer Belt and Idler Pulley Repair',
 seoTitle:'Samsung DV330AEW Dryer Repair in McCordsville, IN | Alex Appliance Repair',
 description:'Samsung DV330AEW/XAA dryer repair in McCordsville, Indiana: a seized idler pulley caused a broken belt. See original repair photos and replacement work.',
 city:'mccordsville', appliance:'dryer', published:'2026-09-23', modified:'2026-09-23',
 summary:'A broken belt brought this Samsung DV330AEW/XAA dryer in McCordsville, Indiana out of service. Behind the belt failure was an idler pulley wheel that would no longer turn.',
 overviewEntries:[
  {label:'Location',value:'McCordsville, Indiana'},
  {label:'Appliance',value:'Samsung electric dryer'},
  {label:'Model',value:'DV330AEW/XAA'},
  {label:'Reported problem',value:'Broken drive belt'},
  {label:'Cause',value:'Seized idler pulley wheel'},
  {label:'Repair',value:'Drive belt and idler pulley assembly replacement'}
 ],
 photos:[
  ['samsung-dv330aew-dryer',1200,1600,'Samsung DV330AEW/XAA dryer with its top removed during service in McCordsville, Indiana'],
  ['dryer-drum-removed',1200,1600,'Samsung dryer cabinet with the drum removed, exposing the motor and blower area'],
  ['seized-idler-pulley',1200,1600,'Removed idler pulley whose wheel had seized, causing the dryer belt to fail'],
  ['old-and-new-idler-assemblies',1200,1600,'Old and replacement Samsung dryer idler pulley assemblies side by side'],
  ['replacement-idler-installed',1400,1050,'Replacement idler pulley assembly installed beside the dryer motor with its tension spring connected'],
  ['new-drive-belt-on-drum',1200,1600,'Replacement drive belt positioned around the Samsung dryer drum during reassembly'],
  ['blower-cover-before-cleaning',1200,1600,'Lint buildup inside the removed dryer blower cover before cleaning'],
  ['blower-cover-after-cleaning',1200,1600,'The same blower cover after accumulated lint was removed']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'idler-pulley-layout-diagram.webp',width:1280,height:1600,caption:'Samsung dryer component-layout reference with the idler pulley assembly highlighted'}
};

export function samsungArticle(c,image,esc){
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 return `<article class="case-body editorial-story">
 ${row(0,'A Broken Belt, but Not the Whole Story',[
 '<strong>McCordsville, Indiana.</strong> The reason for this service call was a broken drive belt in a <strong>Samsung DV330AEW/XAA dryer</strong>. The belt was the failed component the homeowner needed addressed, but the repair also had to account for what had caused it to break.',
 'Inspection found an idler pulley wheel that was no longer rotating. The repair involved replacing the belt and the idler pulley assembly, addressing both the damaged belt and the mechanical fault behind its failure. These photographs document the actual appliance and the work inside it.'
 ])}
 ${row(1,'Opening the Cabinet to Reach the Drive System',[
 'With the top and front components removed, the drum was taken out to expose the drive area. The wide cabinet photograph shows the motor and blower below the rear drum support. This access made it possible to reach the belt tensioner rather than work only around the visible drum.',
 'The white idler pulley is a different component from the blue-centered drum support rollers visible at the back of the cabinet. This story concerns the belt and its tensioner; it does not describe replacement of those support rollers.'
 ])}
 ${row(2,'The Seized Wheel Behind the Belt Failure',[
 'The idler pulley maintains tension on the drive belt while its wheel turns with the moving belt. On this dryer, the wheel had stopped rotating. Instead of rolling freely, it created resistance at the belt contact point, leading to the belt failure reported for this visit.',
 'The close-up shows the removed pulley, including accumulated lint around the wheel and bracket. The seizure was the finding from the service visit; a photograph alone cannot establish how freely a pulley turns. Replacing only the belt would leave the underlying fault unaddressed.'
 ])}
 ${row(3,'Old and New Tensioners, Side by Side',[
 'The removed idler assembly and its replacement were placed together on the dryer top. This comparison records the component change clearly: the old wheel and bracket are beside the clean replacement assembly before installation.',
 'The component diagram in the visit overview highlights this assembly within the motor and blower layout. It is a reference illustration, while the photographs show the actual parts used during this McCordsville repair.'
 ])}
 ${row(4,'Installing the Replacement Idler Assembly',[
 'The replacement idler assembly was installed next to the motor, with the tension spring connected. The photograph shows the new white wheel and its mounting arm in position before the drum and belt were put back into place.',
 'This stage addressed the cause of the failure. The belt and tensioner work together, so the replacement belt needed a functioning pulley, not just an intact path around the drum.'
 ])}
 ${row(6,'Lint Found Behind the Blower Cover',[
 'Opening the dryer also exposed lint inside the blower cover. The before photograph shows the accumulation along the interior and around the opening, an area normally hidden behind the front of the machine.',
 'This was a separate part of the work documented during access. The lint photograph should not be confused with the diagnosis of the broken belt: the stated cause of that failure was the seized idler pulley.'
 ])}
 ${row(7,'The Cover After Cleaning',[
 'The follow-up photograph shows the same cover with the accumulated lint removed. Together, the two views document the cleaning performed while the dryer was open.',
 'These images concern the internal blower cover. They do not document cleaning of the entire household exhaust duct or any airflow measurement, so no such claim is made for this visit.'
 ])}
 ${row(5,'A New Belt Around the Drum',[
 'With the replacement tensioner installed, a new drive belt was positioned around the drum during reassembly. The photograph shows the belt on the drum inside the open cabinet, completing the visible sequence from disassembly to replacement of the failed drive components.',
 'The important point in this repair was the connection between the two failures. The broken belt was the immediate problem, while the seized pulley explained why replacing the belt alone was not the complete repair.'
 ])}
 <section class="repair-story-section"><h2>Samsung Dryer Repair in McCordsville, Indiana</h2><p>A dryer that will not tumble can have more than one cause. This visit documents a broken belt and seized idler pulley on a Samsung DV330AEW/XAA, not a diagnosis for every Samsung dryer with similar symptoms. When arranging service, share the model number and describe what happens when you try to start a cycle, including any unusual sounds you noticed.</p><p>For help with your appliance, explore our <a href="/mccordsville/dryer-repair-services.html">dryer repair service in McCordsville</a>, <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair services</a>, and <a href="/mccordsville.html">McCordsville service coverage</a>. More photographed service visits are available in our <a href="/recent-work.html">repair stories</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></section>
 </article>`;
}
