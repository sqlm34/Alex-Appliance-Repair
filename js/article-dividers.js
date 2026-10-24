/* Decorative section boundaries only; headings and article content stay intact. */
(()=>{
 document.querySelectorAll('.case-body,.alex-article-body').forEach(body=>{
  body.dataset.articleDividersReady='true';
  if(body.querySelector('.article-divider'))return;
  const children=[...body.children];
  const sections=children.filter(e=>e.matches('.repair-story-section'));
  let candidates=sections.length?sections:children.filter(e=>e.matches('h2'));
  // Older guides use h3 for their main topics; never split question/answer items.
  if(!sections.length&&candidates.length<2)candidates=children.filter(e=>{
   const heading=e.matches('h2,h3')?e:e.matches('ol')&&e.children.length===1?e.querySelector(':scope>li>h3'):null;
   return heading&&!/[?]/.test(heading.textContent)&&e.textContent.trim()===heading.textContent.trim();
  });
  const stride=Math.max(1,Math.ceil((candidates.length-1)/6));
  let words=0,count=0;
  for(const child of children){
   const index=candidates.indexOf(child);
   if(index>0 && index%stride===0 && words>=70 && count<6){
    const previous=child.previousElementSibling;
    const divider=document.createElement('div');
    divider.className='article-divider';
    divider.setAttribute('aria-hidden','true');
    divider.dataset.variant=count%2?'stripes':'wrench';
    previous.classList.add('article-divider-before');
    child.classList.add('article-divider-after');
    child.before(divider);
    words=0;count++;
   }
   words+=(child.textContent.trim().match(/\S+/g)||[]).length;
  }
 });
})();
