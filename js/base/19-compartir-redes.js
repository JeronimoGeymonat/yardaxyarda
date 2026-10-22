/* =========================================================================
   Compartir en redes: X (post) e Instagram (historia)
   yxyRedes(contenedor, {titulo, texto, hash, imagenes:[...], etiqueta})
   - X: abre la ventana para publicar con el texto y el enlace de yardaxyarda.com
   - Instagram: crea una imagen vertical para historia (1080×1920) con la nota,
     copia el enlace (para el sticker de enlace) y abre el menú de compartir del
     celular; si no se puede, descarga la imagen.
   ========================================================================= */
window.yxyRedes=function(box,cfgIn){
 /* cfgIn puede ser un objeto o una función que regresa el objeto (para contenido que cambia con la semana/conferencia) */
 const SITIO='https://yardaxyarda.com/';
 const conf=()=>typeof cfgIn==='function'?cfgIn():cfgIn;
 const linkOf=c=>c.url||(SITIO+(c.hash||''));
 const ico={
  x:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.9L18.9 2Zm-1.1 18.1h1.7L6.3 3.8H4.5l13.3 16.3Z"/></svg>',
  ig:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.6" cy="6.4" r="1.4" fill="currentColor"/></svg>'};
 const bar=document.createElement('div');bar.className='yxy-redes';
 bar.innerHTML='<span class="yxy-redes-lbl">Compartir</span>'
  +'<button type="button" class="yxy-red x" aria-label="Publicar en X">'+ico.x+'<span>Post en X</span></button>'
  +'<button type="button" class="yxy-red ig" aria-label="Compartir en historia de Instagram">'+ico.ig+'<span>Historia IG</span></button>';
 box.appendChild(bar);
 const ga=(red)=>{const cfg=conf();try{gtag('event','compartir',{destino:(cfg.hash||cfg.url||'').replace(/^#/,''),titulo:cfg.titulo,red})}catch(e){}};
 function toast(msg){let t=document.getElementById('yxy-toast');if(!t){t=document.createElement('div');t.id='yxy-toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),3800)}
 /* ---- X ---- */
 bar.querySelector('.x').addEventListener('click',()=>{ga('x');const cfg=conf(),url=linkOf(cfg);
  const u='https://x.com/intent/post?text='+encodeURIComponent(cfg.texto||cfg.titulo)+'&url='+encodeURIComponent(url);
  window.open(u,'_blank','noopener,noreferrer')});
 /* ---- imagen para historia ---- */
 let blob=null,building=null,key='';
 const load=src=>new Promise((ok,ko)=>{const i=new Image();i.decoding='async';i.onload=()=>ok(i);i.onerror=ko;i.src=src});
 function wrap(ctx,text,maxW){const words=text.split(/\s+/),lines=[];let l='';for(const w of words){const tt=l?l+' '+w:w;if(ctx.measureText(tt).width>maxW&&l){lines.push(l);l=w}else l=tt}if(l)lines.push(l);return lines}
 function cover(ctx,img,x,y,w,h){const r=Math.max(w/img.naturalWidth,h/img.naturalHeight),sw=w/r,sh=h/r;ctx.drawImage(img,(img.naturalWidth-sw)/2,Math.max(0,(img.naturalHeight-sh)*.25),sw,sh,x,y,w,h)}
 function build(){const cfg=conf(),k=JSON.stringify(cfg);if(k!==key){key=k;blob=null;building=null}
  if(building)return building;building=(async()=>{
  const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d');
  const F="'Courier New',Courier,monospace";
  ctx.fillStyle='#0a0700';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#ffb000';ctx.fillRect(40,40,W-80,H-80);ctx.fillStyle='#0a0700';ctx.fillRect(52,52,W-104,H-104);
  /* marca */
  ctx.fillStyle='#ffb000';ctx.fillRect(96,104,74,74);ctx.fillStyle='#0a0700';ctx.font='bold 58px '+F;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('×',133,144);
  ctx.textAlign='left';ctx.fillStyle='#ffb000';ctx.font='bold 46px '+F;ctx.fillText('YARDA×YARDA.',196,142);
  ctx.fillStyle='#d99400';ctx.font='bold 28px '+F;ctx.fillText((cfg.etiqueta||'IN THE SPOTLIGHT').toUpperCase(),96,236);
  if(cfg.partidos){
   ctx.fillStyle='#ffb000';ctx.font='bold 60px '+F;let ty=330;wrap(ctx,cfg.titulo,W-192).slice(0,2).forEach(l=>{ctx.fillText(l,96,ty);ty+=70});
   const ps=cfg.partidos,top0=ty+10,avail=H-300-top0-(cfg.nota?50:0),rh=Math.min(176,Math.floor(avail/Math.max(1,ps.length))),fs=Math.min(38,Math.floor(rh*.24));
   ps.forEach((g,i)=>{const y0=top0+i*rh;ctx.fillStyle=i%2?'#120d00':'#1a1300';ctx.fillRect(96,y0,W-192,rh-10);
    ctx.fillStyle='#ffb000';ctx.fillRect(96,y0,8,rh-10);
    const done=g.pl!=null&&g.pv!=null,lw=done&&g.pl>g.pv,vw=done&&g.pv>g.pl;
    const line=(name,score,win,yy)=>{ctx.textAlign='left';ctx.font=(win?'bold ':'')+fs+'px '+F;ctx.fillStyle=win?'#ffffff':(done?'#c9b27a':'#efe6cf');
     let n=name;while(ctx.measureText(n).width>W-192-200&&n.length>4)n=n.slice(0,-2)+'…';ctx.fillText(n,128,yy);
     if(done){ctx.textAlign='right';ctx.font='bold '+(fs+4)+'px '+F;ctx.fillStyle=win?'#ffb000':'#8a7440';ctx.fillText(String(score),W-128,yy)}};
    const info=g.info?1:0,l1=y0+(rh-10)*(info?.30:.38),l2=y0+(rh-10)*(info?.58:.74);
    line(g.l,g.pl,lw,l1);line(g.v,g.pv,vw,l2);
    if(info){ctx.textAlign='left';ctx.font=Math.floor(fs*.66)+'px '+F;ctx.fillStyle='#d99400';ctx.fillText(g.info,128,y0+(rh-10)*.86)}
   });
   ctx.textAlign='left';
   if(cfg.nota){ctx.fillStyle='#d99400';ctx.font='26px '+F;ctx.fillText(cfg.nota,96,top0+ps.length*rh+30)}
  }else{
  /* imágenes */
  const imgs=await Promise.all((cfg.imagenes||[]).slice(0,2).map(s=>load(s).catch(()=>null)));
  const top=280,ih=760,gap=16,n=imgs.filter(Boolean).length||1,iw=(W-192-gap*(n-1))/n;let x=96;
  imgs.filter(Boolean).forEach(im=>{cover(ctx,im,x,top,iw,ih);ctx.strokeStyle='#ffb000';ctx.lineWidth=4;ctx.strokeRect(x,top,iw,ih);x+=iw+gap});
  /* título */
  let y=top+ih+90;ctx.fillStyle='#ffb000';ctx.font='bold 62px '+F;
  wrap(ctx,cfg.titulo,W-192).slice(0,6).forEach(l=>{ctx.fillText(l,96,y);y+=74});
  /* texto */
  if(cfg.resumen){y+=20;ctx.fillStyle='#efe6cf';ctx.font='34px '+F;wrap(ctx,cfg.resumen,W-192).slice(0,6).forEach(l=>{ctx.fillText(l,96,y);y+=48})}
  }
  /* pie */
  ctx.fillStyle='#ffb000';ctx.fillRect(96,H-250,W-192,120);ctx.fillStyle='#0a0700';ctx.textAlign='center';{let fz=40;do{ctx.font='bold '+fz+'px '+F;fz-=2}while(fz>20&&ctx.measureText(cfg.pie||'Lee la nota en yardaxyarda.com').width>W-240)}
  ctx.fillText(cfg.pie||'Lee la nota en yardaxyarda.com',W/2,H-190);ctx.textAlign='left';
  blob=await new Promise(r=>c.toBlob(r,'image/jpeg',.9));return blob})();return building}
 /* se prepara antes del clic para que el celular permita abrir el menú de compartir */
 const prep=()=>{if(box.offsetParent!==null)build()};
 ['pointerenter','touchstart','focusin'].forEach(ev=>bar.addEventListener(ev,prep,{passive:true}));
 if('IntersectionObserver' in window){new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))prep()}).observe(bar)}
 bar.querySelector('.ig').addEventListener('click',async()=>{ga('instagram');const cfg=conf(),url=linkOf(cfg);
  try{navigator.clipboard&&navigator.clipboard.writeText(url).catch(()=>{})}catch(e){}
  const b=(key===JSON.stringify(cfg)&&blob)||await build();if(!b){toast('No se pudo crear la imagen');return}
  const file=new File([b],(cfg.archivo||'yardaxyarda-historia')+'.jpg',{type:'image/jpeg'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){
   try{await navigator.share({files:[file],title:cfg.titulo});toast('Elige Instagram → Historia. El enlace ya está copiado para el sticker 🔗');return}
   catch(e){if(e&&e.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=file.name;document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
  toast('Imagen descargada y enlace copiado: súbela a tu historia y agrega el sticker de enlace 🔗')});
 return bar;
};
