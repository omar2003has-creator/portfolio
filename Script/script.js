
/* LOADER */
    let pct=0;
    const ldpct=document.getElementById('ldpct');
const ldiv=setInterval(()=>{
        pct += Math.random() * 12;
  if(pct>=100){pct = 100;clearInterval(ldiv);}
    ldpct.textContent=Math.floor(pct)+'%';
},80);
window.addEventListener('load',()=>{
        setTimeout(() => document.getElementById('loader').classList.add('gone'), 2200);
});

    /* CURSOR */
    const cur=document.getElementById('cur');
    const curRing=document.getElementById('cur-ring');
    let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{cx = e.clientX;cy=e.clientY;});
    (function animCur(){
        cur.style.left = cx + 'px';cur.style.top=cy+'px';
    rx+=(cx-rx)*.1;ry+=(cy-ry)*.1;
    curRing.style.left=rx+'px';curRing.style.top=ry+'px';
    requestAnimationFrame(animCur);
})();
document.querySelectorAll('a,button,.sk-card,.pc,.cc,.stat-c').forEach(el=>{
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
});

    /* CANVAS */
    const canvas=document.getElementById('bgCanvas');
    const ctx=canvas.getContext('2d');
    let W,H,pts=[];
    function initCanvas(){
        W = canvas.width = window.innerWidth;H=canvas.height=window.innerHeight;pts=[];
    const n=Math.floor((W*H)/16000);
    for(let i=0;i<n;i++) pts.push({
        x:Math.random()*W,y:Math.random()*H,
    vx:(Math.random()-.5)*.55,vy:(Math.random()-.5)*.55,
    r:Math.random()*1.4+.4,
    c:Math.random()>.65?'cyan':'orange'
  });
}
    window.addEventListener('resize',initCanvas);
    const mouse={x:null,y:null};
window.addEventListener('mousemove',e=>{mouse.x = e.clientX;mouse.y=e.clientY;});
    (function draw(){
        ctx.clearRect(0, 0, W, H);
    for(let i=0;i<pts.length;i++){
    const p=pts[i];
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c==='cyan'?'rgba(0,255,224,.4)':'rgba(255,77,0,.35)';
    ctx.fill();
    for(let j=i+1;j<pts.length;j++){
      const p2=pts[j];
    const dx=p.x-p2.x,dy=p.y-p2.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){
        ctx.beginPath();
    ctx.strokeStyle=`rgba(255,77,0,${.18 * (1 - d / 110)})`;
    ctx.lineWidth=.5;ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
      }
    }
    if(mouse.x!=null){
      const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<170){
        ctx.beginPath();
    ctx.strokeStyle=`rgba(0,255,224,${.45 * (1 - d / 170)})`;
    ctx.lineWidth=.9;ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();
      }
    }
  }
    requestAnimationFrame(draw);
})();
    initCanvas();

    /* TERMINAL TYPING */
    const tlines=document.querySelectorAll('.term-line');
tlines.forEach((ln,i)=>setTimeout(()=>ln.classList.add('typed'),2400+i*90));

/* SCROLL REVEAL */
const obs=new IntersectionObserver(entries=>{
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                e.target.style.transitionDelay = (i % 5) * 70 + 'ms';
                e.target.classList.add('visible'); obs.unobserve(e.target);
            }
        });
},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

    /* COUNTER */
    function countUp(el){
  const t=+el.dataset.target;if(!t)return;
    let c=0;const step=Math.ceil(t/30);
  const iv=setInterval(()=>{c += step;if(c>=t){c = t;clearInterval(iv);}el.textContent=c;},40);
}
new IntersectionObserver(entries=>{
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.querySelectorAll('.stat-n[data-target]').forEach(countUp); }
        });
},{threshold:.5}).observe(document.querySelector('.stats-strip'));

    /* ACTIVE NAV */
    const secs=document.querySelectorAll('section[id]');
    const navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
        let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id;});
  navAs.forEach(a=>{a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--orange)' : '';});
});

/* 3D TILT */
document.querySelectorAll('.pc,.sk-card').forEach(card=>{
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
            card.style.transition = 'transform .08s';
        });
  card.addEventListener('mouseleave',()=>{
        card.style.transform = '';card.style.transition='transform .4s ease';
  });
});
