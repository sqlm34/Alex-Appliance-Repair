const base='images/repair-cases/samsung-rfg237aawp-fishers/';
export const fridgeStory={
 slug:'fishers-samsung-rfg237aawp-refrigerator-fan-motor-sensor',
 title:'Samsung RFG237AAWP/XAA Refrigerator Fan Motor and Sensor Replacement',
 seoTitle:'Samsung RFG237AAWP Fridge Repair in Fishers, IN | Alex Appliance Repair',
 description:'Samsung RFG237AAWP/XAA refrigerator temperature fluctuating in Fishers, Indiana: intermittent fan motor operation, motor and sensor replacement, and service photos.',
 city:'fishers',appliance:'refrigerator',published:'2026-09-24',modified:'2026-09-24',
 summary:'This Samsung RFG237AAWP/XAA in Fishers, Indiana could hold 37 degrees Fahrenheit one day and warm up later. An intermittently operating fan motor was replaced, along with a sensor.',
 overviewEntries:[
  {label:'Location',value:'Fishers, Indiana'},
  {label:'Appliance',value:'Samsung French-door refrigerator'},
  {label:'Model',value:'RFG237AAWP/XAA'},
  {label:'Reported problem',value:'Inconsistent cooling; temperature rising above the 37 F setting'},
  {label:'Finding',value:'Fan motor operating intermittently'},
  {label:'Work completed',value:'Refrigerator fan motor and sensor replacement'}
 ],
 photos:[
  ['samsung-rfg237aawp-refrigerator',1200,1600,'Samsung RFG237AAWP/XAA refrigerator serviced for inconsistent cooling in Fishers, Indiana'],
  ['samsung-rfg237aawp-model-label',765,84,'Model code RFG237AAWP/XAA on the Samsung refrigerator identification label'],
  ['fresh-food-compartment',1200,1600,'Fresh-food compartment of the Samsung refrigerator with shelves and rear air panel visible'],
  ['twin-cooling-rear-panel',1200,1600,'Close view of the Twin Cooling Plus rear panel and its air openings'],
  ['shelves-removed-for-access',1200,1600,'Shelves removed to provide access to the refrigerator rear panel during service'],
  ['evaporator-and-wiring-exposed',1200,1600,'Refrigerator evaporator and wiring exposed after removal of the rear panel'],
  ['removed-fan-panel-and-motor',1200,1600,'Removed fan panel, fan blade and separate motor during Samsung refrigerator service'],
  ['refrigerator-fan-motor',1200,1600,'Close-up of the refrigerator fan motor and shaft during the replacement work'],
  ['fan-blade-and-air-opening',1200,1600,'Fan blade in the circular opening of the removed refrigerator air panel'],
  ['fan-motor-housing-and-wiring',1200,1600,'Rear of the refrigerator fan assembly showing its motor housing and electrical leads']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption})),
 overviewImage:{src:base+'fan-motor-and-sensor-diagram.webp',width:1107,height:1600,caption:'Samsung RFG237AAWP component-layout reference with the fan motor and sensor highlighted'}
};

export function fridgeArticle(c,image,esc){
 const row=(i,heading,paragraphs)=>{const side=i%2?'right':'left';return `<section class="repair-story-section cafe-story-row cafe-story-row--${side}"><figure class="article-image-${side} cafe-story-photo"><a href="/${c.photos[i].src}">${image(c.photos[i],i!==0)}</a><figcaption>${esc(c.photos[i].caption)}</figcaption></figure><div class="cafe-story-copy"><h2>${heading}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></section>`;};
 return `<article class="case-body editorial-story">
 ${row(0,'Cold One Day, Warmer the Next',[
 '<strong>Fishers, Indiana.</strong> This Samsung refrigerator had a cooling problem that came and went. It could hold the requested <strong>37 degrees Fahrenheit</strong> one day, then run warmer the next day or several days later. The concern was not a constant loss of cooling, but a refrigerator that would not reliably maintain its set temperature.',
 'The fault was traced to a fan motor that operated intermittently. The motor was replaced, and a sensor was also replaced during the service visit. The photographs follow the work from the assembled refrigerator to the fan components behind its rear interior panel.'
 ])}
 ${row(1,'The Model Behind This Repair: RFG237AAWP/XAA',[
 'The appliance label identifies this refrigerator as <strong>Samsung RFG237AAWP/XAA</strong>. The cropped label photograph preserves the exact model code, which helps distinguish this machine from other Samsung French-door refrigerators with a similar appearance.',
 'When requesting service for the same model, include the full code and describe the temperature pattern. A refrigerator that cools normally for a while and then warms up presents a different service history from one that never gets cold.'
 ])}
 ${row(2,'The Temperature Problem Was Inside the Fresh-Food Compartment',[
 'The interior view shows the shelves, drawers and rear air panel in the compartment affected by the cooling complaint. The refrigerator could reach the desired temperature, but it did not maintain that performance consistently over time.',
 'That day-to-day pattern mattered. A normal temperature at one moment did not erase the periods of warmer operation the homeowner had experienced. The service focused on the intermittent behavior rather than treating a single normal reading as the whole story.'
 ])}
 ${row(3,'Following the Air Path to the Rear Panel',[
 'The close-up centers on the Twin Cooling Plus rear panel and its air openings. Behind this panel sits the fan assembly involved in the repair. Its job is to move cooled air through the refrigerator compartment.',
 'For this appliance, the problem was unreliable fan operation: the motor would work at some times and fail to run at others. That finding explained why cooling performance could change even though the temperature setting had not changed.'
 ])}
 ${row(4,'Clearing Access for the Repair',[
 'The shelves were removed to open up the working area in front of the rear panel. This photograph shows the access stage before the panel was taken out, with the interior cooling cover still in place.',
 'Reaching the fan required access behind that cover. The work was inside the refrigerator compartment, rather than at the external dispenser or the freezer drawer.'
 ])}
 ${row(5,'Behind the Cover: Evaporator and Wiring',[
 'With the rear panel removed, the evaporator and its surrounding wiring became visible. The photograph shows the normally concealed area behind the air panel, while the fan assembly was accessible on the removed cover.',
 'A sensor was also replaced as part of this repair. The supplied component diagram highlights both the sensor and the fan motor, giving context for the two replacement components. The intermittent fan operation was the identified cooling fault; the sensor replacement is recorded separately as part of the completed work.'
 ])}
 ${row(6,'The Fan Assembly Out of the Refrigerator',[
 'The removed panel was opened to expose the fan assembly. In this wider view, the fan blade remains visible in the circular opening, and a separate motor is beside it. The photograph ties the individual motor to the larger panel it works within.',
 'This was the central repair area. Access to the assembly allowed the intermittently operating motor to be removed and a replacement installed without describing the entire refrigerator as having failed.'
 ])}
 ${row(7,'Replacing the Intermittently Operating Motor',[
 'The close-up shows the fan motor and its shaft, the component that drives the fan blade. In this service visit, the motor was not dependable: it ran at some times and did not run at others. It was replaced to address that intermittent operation.',
 'An intermittent fault can be frustrating because the appliance may appear to be working again before the problem returns. Here, the history of normal cooling followed by rising temperatures was an important part of understanding the complaint.'
 ])}
 ${row(8,'The Fan Blade and Its Air Opening',[
 'This photograph shows the fan blade within the round opening of the panel. It illustrates the air-moving side of the assembly, while the motor close-up shows the drive component behind it.',
 'The distinction matters when describing the repair: the fan motor was replaced. The visible blade, surrounding panel and other components help explain the assembly, but their presence in the photographs does not mean every part shown was replaced.'
 ])}
 ${row(9,'The Motor Housing and Electrical Leads',[
 'The reverse view shows the motor housing and the leads running across the back of the fan assembly. Together with the front view, it documents the component from both sides and shows why the rear panel had to be opened for access.',
 'The completed work for this Fishers visit was replacement of the refrigerator fan motor and a sensor. The repair addressed the intermittent fan operation behind the changing cooling performance, rather than simply lowering the temperature setting.'
 ])}
 <section class="repair-story-section"><h2>Samsung Refrigerator Repair in Fishers, Indiana</h2><p>If your Samsung RFG237AAWP/XAA cools normally and then warms up again, tell us how often it happens, the temperature setting and any temperature readings you have recorded. Those details help describe an intermittent problem. Similar symptoms can have different causes, so each refrigerator needs its own diagnosis.</p><p>Learn about our <a href="/fishers/refrigerator-repair-services.html">refrigerator repair service in Fishers</a>, explore <a href="/brands/samsung-appliance-repair.html">Samsung appliance repair services</a>, or check <a href="/fishers.html">Fishers service coverage</a>. See more original service photographs in our <a href="/recent-work.html">repair stories</a>. Alex Appliance Repair is an independent appliance repair provider operated by Aksenov LLC.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book service online</a></section>
 </article>`;
}
