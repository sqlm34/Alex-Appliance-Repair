document.querySelectorAll('[data-diagram-slider]').forEach(slider=>{
 const slides=Array.from(slider.querySelectorAll('.repair-diagram-slide'));
 if(slides.length<2)return;
 const count=slider.querySelector('[data-diagram-count]');
 let index=0;
 const show=next=>{
  index=(next+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.hidden=i!==index;});
  count.textContent=`${index+1} / ${slides.length}`;
 };
 show(0);
 slider.classList.add('is-enhanced');
 slider.querySelector('.repair-diagrams-controls').hidden=false;
 slider.querySelector('[data-diagram-prev]').addEventListener('click',()=>show(index-1));
 slider.querySelector('[data-diagram-next]').addEventListener('click',()=>show(index+1));
 slider.addEventListener('keydown',event=>{
  if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
  event.preventDefault();
  const slideFocused=slides.includes(document.activeElement);
  show(index+(event.key==='ArrowRight'?1:-1));
  if(slideFocused)slides[index].focus({preventScroll:true});
 });
 const stage=slider.querySelector('.repair-diagrams-stage');
 let start=null;
 let swiped=false;
 stage.addEventListener('touchstart',event=>{
  swiped=false;
  start=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;
 },{passive:true});
 stage.addEventListener('touchend',event=>{
  if(!start)return;
  const dx=event.changedTouches[0].clientX-start.x;
  const dy=event.changedTouches[0].clientY-start.y;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){show(index+(dx<0?1:-1));swiped=true;}
  start=null;
 },{passive:true});
 stage.addEventListener('touchcancel',()=>{start=null;},{passive:true});
 stage.addEventListener('click',event=>{
  if(swiped){event.preventDefault();event.stopPropagation();swiped=false;}
 },true);
});
