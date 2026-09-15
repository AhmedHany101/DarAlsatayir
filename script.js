const header=document.getElementById('header');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Hero slider
const slides=[...document.querySelectorAll('.slide')], dotsBox=document.getElementById('dots');
let current=0, timer;
slides.forEach((_,i)=>{const d=document.createElement('span');d.className='dot'+(i===0?' active':'');d.onclick=()=>goSlide(i);dotsBox.appendChild(d)});
const dots=[...document.querySelectorAll('.dot')];
function goSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));}
function restart(){clearInterval(timer);timer=setInterval(()=>goSlide(current+1),5500)}
document.getElementById('next').onclick=()=>{goSlide(current+1);restart()};
document.getElementById('prev').onclick=()=>{goSlide(current-1);restart()};
restart();

// Reveal animation
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Gallery filters
const items=[...document.querySelectorAll('.gallery-item')];
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  items.forEach((item,i)=>{const show=f==='all'||item.dataset.category===f;item.style.display=show?'block':'none';if(show)item.style.animation=`fadeUp .5s ${i*.04}s both`});
}));

// Lightbox
const lightbox=document.getElementById('lightbox'), lbImg=document.getElementById('lightboxImg'), lbTitle=document.getElementById('lightboxTitle');
let lbIndex=0;
function openLightbox(i){lbIndex=i;const item=items[i],img=item.querySelector('img');lbImg.src=img.src;lbImg.alt=img.alt;lbTitle.textContent=item.querySelector('b')?.textContent||'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
items.forEach((item,i)=>item.addEventListener('click',()=>openLightbox(i)));
function lbMove(dir){openLightbox((lbIndex+dir+items.length)%items.length)}
document.getElementById('lightboxClose').onclick=closeLightbox;
document.getElementById('lbPrev').onclick=()=>lbMove(1);
document.getElementById('lbNext').onclick=()=>lbMove(-1);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowRight')lbMove(1);if(e.key==='ArrowLeft')lbMove(-1)});

// Contact form demo
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const msg=document.getElementById('formMessage');msg.textContent='تم استلام طلبك — سنتواصل معك قريبًا.';
  e.target.reset();
});

// Simple active nav by section
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}
}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));
