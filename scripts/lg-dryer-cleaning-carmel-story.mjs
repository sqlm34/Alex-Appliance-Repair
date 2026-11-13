export const lgMaintenanceStory={
  "slug": "carmel-lg-dryer-cleaning-door-reversal",
  "title": "LG Dryer Cleaning and Door Reversal",
  "headline": "LG Dryer Cleaning and Door Reversal in Carmel, Indiana",
  "seoTitle": "LG Dryer Cleaning & Door Reversal in Carmel, IN",
  "description": "LG dryer maintenance in Carmel, Indiana: internal lint cleaning, drum felt cleaning and hinges moved from right to left. See original service photos.",
  "city": "carmel",
  "appliance": "dryer",
  "published": "2026-11-13",
  "modified": "2026-11-13",
  "editorialStylesheet": "lg-fan-noblesville",
  "summary": "A Carmel homeowner requested internal dryer cleaning and a door that would open to the left. We cleaned the LG dryer interior and drum felt, moved the hinges from right to left, and reinstalled the door. Original photographs document the maintenance and hinge work.",
  "overviewEntries": [
    {
      "label": "Location",
      "value": "Carmel, Indiana"
    },
    {
      "label": "Appliance",
      "value": "LG dryer"
    },
    {
      "label": "Requested service",
      "value": "Internal cleaning and door reversal"
    },
    {
      "label": "Cleaning completed",
      "value": "Cabinet interior, accessible components and drum felt"
    },
    {
      "label": "Door change",
      "value": "Hinges moved from right to left, viewed from the front"
    },
    {
      "label": "Result",
      "value": "Cleaning completed and door reinstalled to open toward the left"
    }
  ],
  "photos": [
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/dryer.webp",
      "width": 1200,
      "height": 1600,
      "caption": "LG dryer serviced for internal cleaning and door reversal in Carmel, Indiana"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/cabinet-before.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Before cleaning: opened LG dryer cabinet with lint and debris beneath the removed drum"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/cabinet-after.webp",
      "width": 1200,
      "height": 1600,
      "caption": "After cleaning: cabinet floor and internal assemblies cleared of visible loose buildup"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/air-cover-before.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Before cleaning: accumulated lint inside the removed air-passage cover"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/air-cover-after.webp",
      "width": 1200,
      "height": 1600,
      "caption": "After cleaning: the same air-passage cover with the lint deposits removed"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/felt-detail.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Close-up of the existing felt around the removed dryer drum during maintenance"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/drum-cleaned.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Removed LG dryer drum with the felt edge accessible for cleaning"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/felt-cleaned.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Drum rim and felt following cleaning during the Carmel service visit"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/front-support.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Cleaned front drum support and grille during dryer maintenance"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/door-disassembled.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Dryer door separated into sections to access its hinge hardware"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/hinge-detail.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Close-up of the hinge mounting hardware inside the door frame"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/door-hinges.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Door frame and hinges during the change to left-side mounting"
    },
    {
      "src": "images/repair-cases/lg-dryer-cleaning-carmel/door-reassembled.webp",
      "width": 1200,
      "height": 1600,
      "caption": "Reassembled dryer door before reinstallation after the hinge change"
    }
  ]
};
export function lgMaintenanceArticle(c,image,esc){
 const figure=(i,paired=false)=>{const p=c.photos[i],max=paired?480:Math.min(p.width,520*p.width/p.height);return `<figure class="lg-fan-photo" style="--photo-max:${max}px"><a class="gallery-item" href="/${p.src}">${image(p,i!==0).replace('<img ',`<img style="aspect-ratio:${p.width}/${p.height};object-fit:contain!important" `)}</a><figcaption>${esc(p.caption)}</figcaption></figure>`;};
 const row=(i,h,ps)=>`<section class="repair-story-section lg-fan-row${i%2?' lg-fan-row--right':''}">${figure(i)}<div class="lg-fan-copy"><h2>${h}</h2>${ps.map(p=>`<p>${p}</p>`).join('')}</div></section>`;

 return `<article class="case-body editorial-story">
 ${row(0,'Two Requests for One Maintenance Visit',[
 'A homeowner in <strong>Carmel, Indiana</strong>, contacted Alex Appliance Repair to schedule maintenance for an LG dryer. The request had two parts: clean the appliance inside and move the door hinges from the right side to the left, so the door would open toward the left.',
 'We opened the dryer for internal cleaning, cleaned the felt around the drum and the accessible components, and changed the door hinge arrangement. The door was then reassembled and installed again. The original service photographs below follow the work, from the exposed cabinet and lint deposits to the door hardware during the reversal.'
 ])}
 <section class="repair-story-section"><h2>Inside the Cabinet: Before and After Cleaning</h2>
 <p>The dryer was opened and the drum removed to reach the interior. The first photograph shows lint and debris on the cabinet floor and around the internal assemblies. These areas sit beneath the drum and behind the front panel, so the buildup was not visible with the appliance assembled.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(1,true)}${figure(2,true)}</div>
 <p>The second photograph shows the cabinet after cleaning. The floor and surrounding surfaces are visible without the loose deposits shown in the first view. Opening the dryer made it possible to clean these areas as part of the maintenance the customer requested.</p></section>
 <section class="repair-story-section"><h2>Clearing Lint from the Air-Passage Cover</h2>
 <p>A removed metal air-passage cover held a noticeable layer of lint. In the before photograph, deposits cover the inside surface and collect along the edge of the opening. The matching after photograph shows that same component with the accumulated material removed.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(3,true)}${figure(4,true)}</div>
 <p>This pair illustrates the internal cleaning performed during the visit. The cover and the other accessible parts were cleaned while the dryer was disassembled. The work documented here concerns the dryer itself; these photographs show the internal components reached during service.</p></section>
 ${row(5,'Cleaning the Existing Drum Felt',[
 'The felt around the drum was cleaned as part of the maintenance. Removing the drum made its rim and felt edge accessible, allowing attention to areas that are difficult to reach with the dryer assembled. The close-up photograph records the existing felt during the work.',
 'The service performed was cleaning of the felt. It remained part of the existing drum assembly. The wider photographs below show the drum out of the cabinet and the felt around its edge after cleaning, documenting this part of the job separately from the cabinet cleanup.'
 ])}
 <section class="repair-story-section"><h2>The Drum and Felt After Cleaning</h2>
 <p>With the drum out, both the inside of the drum and its felt edge could be reached during maintenance. These photographs show the cleaned drum and a closer view of the rim. Cleaning the felt was one of the specific tasks completed during this Carmel visit.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(6,true)}${figure(7,true)}</div>
 <p>The photographs preserve the actual appearance of the existing material. They document cleaning of the installed components rather than a new drum or felt installation.</p></section>
 ${row(8,'Cleaning the Front Support and Grille',[
 'The removed front support and grille were also cleaned while the dryer was open. The photograph shows the inside face of that assembly during service, with its support rollers and grille visible.',
 'The internal cleaning covered the accessible components as well as the cabinet and drum felt. Once that work was completed, the removed dryer assemblies could be returned to their operating positions. The remaining part of the request was changing the door opening direction.'
 ])}
 ${row(9,'Taking the Door Apart for the Hinge Change',[
 'The homeowner wanted the door to swing toward the left. We removed the door from the appliance and separated its sections to reach the hinge hardware inside the frame. The photograph shows those sections laid out during the work.',
 'The hinge change was part of the requested service, alongside the internal cleaning. The door needed to be reconfigured and put back together before it could be installed in the new orientation. The following close-ups document the hardware and its mounting areas during that process.'
 ])}
 <section class="repair-story-section"><h2>Moving the Hinges from Right to Left</h2>
 <p>The hinges were moved from the right side to the left side, viewed from the front of the dryer. This changed the side on which the door pivots, giving the customer the leftward opening direction requested when booking the service.</p>
 <div class="case-photo-grid lg-fan-pair">${figure(10,true)}${figure(11,true)}</div>
 <p>The photographs show the hinge hardware inside the door frame during the change. After the hinge work, the door sections were reassembled and the door was installed on the dryer again.</p></section>
 ${row(12,'Door Reassembled and Reinstalled',[
 'The reassembled door is shown here before reinstallation. The completed service included internal dryer cleaning, cleaning of the drum felt and components, and relocation of the door hinges to the left side.',
 'The door was installed again so it would open toward the left. This completed the two tasks requested by the Carmel homeowner: maintenance inside the appliance and a change to the door opening direction.'
 ])}
 <section class="repair-story-section"><h2>Questions About This Dryer Service</h2>
 <h3>What did the internal cleaning include?</h3><p>The cabinet interior, accessible components and felt around the drum were cleaned during the service visit.</p>
 <h3>Was the drum felt replaced?</h3><p>The existing felt was cleaned during this job.</p>
 <h3>Which way does the door open now?</h3><p>The hinges were moved from right to left, viewed from the front, and the door was reinstalled to swing toward the left.</p>
 </section>
 <section class="repair-story-section"><h2>LG Dryer Service in Carmel, Indiana</h2>
 <p>When requesting dryer maintenance or a door reversal, describe the work you want completed and share the appliance information available. Learn about our <a href="/carmel/dryer-repair-services.html">dryer repair service in Carmel</a>, explore our <a href="/brands/lg-appliance-repair.html">LG appliance repair services</a>, or browse more <a href="/recent-work.html">service stories with original photographs</a>.</p>
 <p>Alex Appliance Repair is an independent appliance repair service operated by Aksenov LLC. <a href="tel:+14632488429">Call (463) 248-8429</a> to discuss dryer cleaning or a change to the door opening direction.</p><a class="local-button" href="https://aleksappliancerepair.com/booking">Book dryer service</a></section>
 </article>`;
}
