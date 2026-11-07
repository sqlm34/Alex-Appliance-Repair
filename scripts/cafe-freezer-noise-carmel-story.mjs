const base='images/repair-cases/cafe-freezer-noise-carmel/';
export const cafeNoiseStory={
 slug:'carmel-cafe-freezer-making-noise-fan-thermistor-repair',
 title:'Café Freezer Noise: Fan and Thermistor Replacement',
 headline:'Café Freezer Making Noise in Carmel, Indiana',
 cardTitle:'Café Freezer Making Noise: A Carmel Repair Story',
 seoTitle:'Café Freezer Making Noise in Carmel, IN | Fan Repair',
 description:'Café CVE28DP4NBW2 freezer noise repair in Carmel, IN: evaporator fan and thermistor replacement, steam-cleared drain, original photos and diagram.',
 city:'carmel',appliance:'refrigerator',published:'2026-11-07',modified:'2026-11-07',editorialStylesheet:'lg-fan-noblesville',
 summary:'A noisy freezer brought us to a Carmel, Indiana home. This Café CVE28DP4NBW2 repair involved replacing the freezer evaporator fan and temperature-sensing thermistor, clearing the drain line with steam and reassembling the freezer.',
 overviewEntries:[{label:'Location',value:'Carmel, Indiana'},{label:'Appliance',value:'Café French-door refrigerator'},{label:'Model',value:'CVE28DP4NBW2'},{label:'Complaint',value:'Freezer making noise'},{label:'Repair',value:'Freezer evaporator fan and thermistor replacement'},{label:'Drain service',value:'Drain line cleared with steam'}],
 overviewImage:{src:base+'freezer-diagram.webp',width:1855,height:2636,caption:'Café CVE28DP4NBW2 freezer assembly diagram showing fan callout 67 and thermistor callout 66'},
 photos:[
 ['refrigerator',1200,1600,'Café refrigerator at the Carmel, Indiana service visit'],
 ['model-label',405,155,'Original appliance label confirming Café model CVE28DP4NBW2'],
 ['freezer-access',1200,1600,'Freezer drawer removed and rear interior panel opened for access'],
 ['frosted-evaporator',1200,1600,'Frost and ice visible on the exposed freezer evaporator before service'],
 ['fan-ice',1200,1600,'Ice visible beside the freezer evaporator fan on the removed rear panel'],
 ['fan-comparison',1200,1600,'Removed and replacement freezer fan assemblies during the repair'],
 ['thermistor',1200,1600,'Replacement temperature-sensing thermistor beside the freezer panel'],
 ['sensor-installed',1200,1600,'Thermistor wiring connections insulated before reassembly'],
 ['steam-drain',1600,1200,'Steam applied to clear the freezer drain area beneath the evaporator'],
 ['clean-evaporator',1200,1600,'Exposed freezer evaporator and drain area after steam clearing'],
 ['reassembled',1200,1600,'Freezer rear interior panel reinstalled after component replacement']
 ].map(([name,width,height,caption])=>({src:base+name+'.webp',width,height,caption}))
};
export function cafeNoiseArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;
 return `<article class="case-body editorial-story">
 ${row(0,'The Call: “The Freezer Is Making Noise”',[
 'A customer in <strong>Carmel, Indiana</strong>, called Alex Appliance Repair because the freezer was making noise. The appliance was a Café French-door refrigerator with a bottom freezer. A noise complaint describes what the homeowner hears; an inspection is needed to identify the component and the condition behind it.',
 'Diagnosis during this visit established that the <strong>freezer evaporator fan assembly and temperature sensor needed replacement</strong>. The work also included clearing the drain line with steam. Our original service photographs document access to the freezer, frost and ice around the cooling area, the replacement components and the rear panel after reassembly.'
 ])}
 ${row(1,'Model Identification and the Correct Sensor Name',[
 'The original label confirms <strong>Café CVE28DP4NBW2</strong>. This cropped photograph preserves the appliance brand and model so the repair can be associated with the correct refrigerator configuration. The serial number and connected-appliance information are outside the crop.',
 'The temperature sensor is called a <strong>thermistor</strong> in the GE Appliances catalog. In this repair, it is the freezer temperature-sensing component mounted at the rear cover. The fan is listed as the <strong>freezer evaporator fan</strong>: a fan and motor assembly that moves air through the freezer cooling area. These are two replacement components, with the motor included in the fan assembly.'
 ])}
 ${row(2,'Opening the Freezer for Diagnosis',[
 'The freezer was disassembled to reach the components behind its rear interior wall. The drawer was removed, and the rear cover was released to expose the evaporator and provide access to the fan and sensor. The photograph shows this access stage before the rear panel was taken out of the compartment.',
 'This access made it possible to inspect more than the visible storage space. The fan sits on the back of the cover, while the evaporator and drain area are behind it. Examining that whole area was relevant to this visit because the repair involved both component replacement and clearing the drain line.'
 ])}
 <section class="repair-story-section"><h2>Frost and Ice Behind the Rear Panel</h2>
 <p>The photographs below show frost on the evaporator and ice beside the fan housing. Those visible conditions are part of the repair record. Ice near a rotating fan can interfere with clearance and contribute to noise, although a photograph alone cannot establish every cause of a sound or determine whether a motor needs replacement.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>For this appliance, the technician's diagnosis called for replacing the fan assembly and thermistor. The drain line was also cleared with steam. The scope therefore addressed the diagnosed components as well as the drainage work, rather than relying on removal of visible ice as the entire repair.</p></section>
 ${row(5,'Replacing the Freezer Evaporator Fan',[
 'The removed fan and replacement assembly are shown together on the rear cover. The replacement includes the motor and fan, which is why this work is described as <strong>freezer evaporator fan assembly replacement</strong>. The assembly was installed in the panel before the freezer was put back together.',
 'The supplied exploded diagram helps locate the parts in the freezer assembly: callout <strong>67</strong> identifies the fan and callout <strong>66</strong> identifies thermistors. These are diagram positions. The model-specific <a href="https://www.geapplianceparts.com/store/parts/ModelSectionParts/CVE28DP4NBW2/6/0/0/0/FREEZER_SECTION" rel="noopener">GE Appliances freezer section catalog</a> provides the assembly reference.'
 ])}
 <section class="repair-story-section"><h2>Replacing the Freezer Thermistor</h2>
 <p>A thermistor senses temperature through changes in electrical resistance. It supplies temperature information to the refrigerator's control system. Here, the replacement sensor was fitted at the rear cover, and its wiring connections were completed and insulated before reassembly. The service photographs show the replacement sensor and the finished insulated connections.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(6,true)}${figure(7,true)}</div>
 <p>The diagram includes more than one thermistor position. The repair photos identify the work at the cover-mounted freezer sensor; they should not be read as evidence that every sensor shown in the diagram was replaced. The documented work was replacement of the diagnosed temperature sensor and freezer fan assembly.</p></section>
 ${row(8,'Clearing the Drain Line with Steam',[
 'With the rear panel removed, steam was used to clear the drain line and the drain area beneath the evaporator. The photograph captures this stage of the actual service visit. Drainage matters because water from defrosting needs a path out of the freezer cooling area.',
 'The visible ice and the drain service belong in the same repair history, but the photographs do not establish that a single fault caused every condition. The article records the confirmed work: component replacement, steam clearing of the drain and reassembly. It does not substitute a general explanation for the diagnosis made on this refrigerator.'
 ])}
 ${row(9,'The Cooling Area After Drain Service',[
 'After the steam work, the exposed evaporator and drain area were photographed again. This view shows the cooling compartment with the rear cover still out and the fan mounted on the cover in the foreground. It documents the transition from the ice-covered area to the stage before the interior panel was reinstalled.',
 'The fan, sensor, cover and drain are close together but serve different functions. The fan circulates air, the thermistor senses temperature, and the drain carries away defrost water. Describing each part separately helps explain why this particular noise complaint led to more than one service operation.'
 ])}
 ${row(10,'Rear Panel Reinstalled',[
 'The final interior photograph shows the rear freezer panel back in position after the fan and thermistor replacement and drain-line clearing. The freezer was reassembled following the work. These photos provide a record of the repair performed at the Carmel home, from access through reassembly.',
 'When arranging service for a similar concern, describe where the sound seems to come from and whether it changes when the freezer door opens. Include the appliance model and mention any visible frost or ice. Those observations help explain the complaint; the appropriate repair still depends on inspecting the individual refrigerator.'
 ])}
 <section class="repair-story-section"><h2>Questions About a Noisy Café Freezer</h2>
 <h3>Why is my Café freezer making noise?</h3><p>Noise can come from a fan, ice interfering with a moving part or another source. On this CVE28DP4NBW2, diagnosis led to freezer evaporator fan and thermistor replacement, along with steam clearing of the drain line. Another refrigerator may need different work.</p>
 <h3>What is the temperature sensor called?</h3><p>The catalog name is thermistor. It senses temperature for the control system. This repair involved the freezer sensor at the rear cover.</p>
 <h3>Were the motor and fan separate repairs?</h3><p>The freezer evaporator fan was replaced as an assembly that includes its motor. The thermistor was a separate replacement component.</p>
 <h3>Will melting the ice fix the noise permanently?</h3><p>Removing ice does not establish why it formed or whether a fan or sensor is faulty. This visit included diagnosis, component replacement and drain-line clearing.</p>
 <h3>Do you repair Café refrigerators in Carmel?</h3><p>Alex Appliance Repair provides refrigerator repair service in Carmel, Indiana. Share your model, symptoms and service address when requesting a visit.</p></section>
 <section class="repair-story-section"><h2>Café Refrigerator and Freezer Repair in Carmel</h2>
 <p>If your freezer is making an unusual noise, describe the symptom when contacting Alex Appliance Repair. We explain the diagnosis and estimate before approved repair work.</p>
 <p>Explore our <a href="/carmel/refrigerator-repair-services.html">refrigerator repair in Carmel</a>, <a href="/carmel.html">Carmel service coverage</a> and <a href="/recent-work.html">recent appliance repair stories</a>. Alex Appliance Repair is an independent service operated by Aksenov LLC.</p>
 <p><a href="tel:+14632488429">Call (463) 248-8429</a> or use online booking to request service.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book refrigerator repair in Carmel</a></section>
 </article>`;
}
