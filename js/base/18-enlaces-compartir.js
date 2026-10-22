/* =========================================================================
   Enlaces por semana / conferencia / vista + botón "Compartir"
   Formato:  #semana-7/nacional/team-stats
     vistas: overview · player-stats · team-stats · insights · top-qbs · top-rbs · top-wrs · tackleador · yds-mezcladas
   - Al abrir un enlace, la página cambia a esa semana/conferencia/vista y baja a la sección.
   - Mientras navegas, la dirección del navegador se actualiza sola (se puede copiar).
   - Botones "Compartir" en Top QBs / Top RBs / Top WRs / Lider Tackleador / Lider Yds Mezcladas y en la Tabla general.
   ========================================================================= */
(function(){
 const RE=/^#semana-(\d+)\/(grandes|nacional)(?:\/([a-z0-9-]+))?\/?$/;
 const CARDS={'top-qbs':'Top QBs','top-rbs':'Top RBs','top-wrs':'Top WRs','tackleador':'Lider Tackleador','yds-mezcladas':'Lider Yds Mezcladas'};
 const DIV={grandes:'14 Grandes',nacional:'Nacional'};
 const VISTA={'overview':'Overview','player-stats':'Player stats','team-stats':'Tabla general','insights':'Insights'};
 const SITIO='https://yardaxyarda.com/'; /* los enlaces de Compartir siempre usan el dominio oficial */
 const base=()=>SITIO;
 const linkFor=(wk,dv,view)=>base()+'#semana-'+String(wk).replace(/^w/,'')+'/'+dv+(view?'/'+view:'');
 const visible=el=>el&&!el.hidden&&el.offsetParent!==null;
 const currentView=()=>tab==='players'?'player-stats':tab==='teams'?(teamSub==='insights'?'insights':'team-stats'):'overview';
 const card=title=>[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('.card-title h3')?.textContent.trim()===title);
 const tableSection=()=>['st4','standings'].map(id=>$(id)).find(visible);

 /* ---------- ir a un enlace ---------- */
 let applying=false,lastHash=''; /* último enlace aplicado o escrito por la página */
 function go(view,target,quiet){
  const off=matchMedia('(max-width:1100px)').matches?78:16;
  const el=target||(view==='team-stats'?tableSection():view==='insights'?$('team-subnav'):CARDS[view]?card(CARDS[view]):$('heading'));
  if(!el)return;
  const y=el.getBoundingClientRect().top+scrollY-off;
  document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,Math.max(0,y));document.documentElement.style.scrollBehavior='';
  if(quiet)return;
  el.classList.add('yxy-flash');setTimeout(()=>el.classList.remove('yxy-flash'),1800);
 }
 function apply(hash,scroll){
  const m=(hash||'').match(RE);if(!m)return false;
  const wk='w'+m[1],dv=m[2],view=m[3]||'overview',sel=$('season');
  applying=true;lastHash=hash;
  if(division!==dv)document.querySelector(`[data-division="${dv}"]`)?.click();
  if([...sel.options].some(o=>o.value===wk)&&sel.value!==wk){sel.value=wk;sel.dispatchEvent(new Event('change',{bubbles:true}))}
  const wantTab=view==='player-stats'?'players':(view==='team-stats'||view==='insights')?'teams':'overview';
  const t=document.querySelector(`[data-tab="${wantTab}"]`);if(t&&t.offsetParent!==null&&tab!==wantTab)t.click();
  if(wantTab==='teams'){const s=document.querySelector(`#team-subnav [data-sub="${view==='insights'?'insights':'tabla'}"]`);if(s&&s.offsetParent!==null)s.click()}
  applying=false;
  if(scroll){requestAnimationFrame(()=>requestAnimationFrame(()=>go(view)));
   /* las imágenes de arriba pueden terminar de cargar después y mover la página: reajustar mientras el visitante no se mueva */
   let moved=false;const stop=()=>{moved=true};['wheel','touchstart','keydown','mousedown'].forEach(ev=>addEventListener(ev,stop,{once:true,passive:true}));
   [700,1600,3000].forEach(ms=>setTimeout(()=>{if(!moved)go(view,null,true)},ms));
   addEventListener('load',()=>{if(!moved)go(view,null,true)},{once:true});}
  return true;
 }
 const initialHash=location.hash;
 /* si cambian el enlace con la página abierta */
 window.addEventListener('hashchange',()=>{if(RE.test(location.hash))apply(location.hash,true)});

 /* ---------- la dirección sigue a lo que ves (después de que el visitante interactúa) ---------- */
 let touched=false; /* la dirección solo se actualiza cuando el visitante navega */
 ['click','change'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('[data-division],[data-tab],[data-sub],#season,.yxy-weeks'))touched=true},true));
 function syncUrl(){
  if(applying||currentTeam||!touched)return;
  if(location.hash&&!RE.test(location.hash))return; /* no tocar otros enlaces (#equipo-…, #stats-start) */
  if(location.hash&&location.hash!==lastHash)return; /* llegó un enlace nuevo: lo aplica el evento hashchange */
  const h='#semana-'+$('season').value.replace(/^w/,'')+'/'+division+'/'+currentView();
  if(location.hash!==h)try{history.replaceState(null,'',h);lastHash=h}catch(e){}
 }

 /* ---------- botón Compartir ---------- */
 function toast(msg){let t=document.getElementById('yxy-toast');if(!t){t=document.createElement('div');t.id='yxy-toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2200)}
 async function share(url,title){
  try{gtag('event','compartir',{destino:url.split('#')[1]||'',titulo:title})}catch(e){}
  if(navigator.share&&matchMedia('(pointer:coarse)').matches){try{await navigator.share({title:title+' · Yarda × Yarda',text:title+' · Yarda × Yarda',url});return}catch(e){if(e&&e.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(url);toast('Enlace copiado ✓')}
  catch(e){const i=document.createElement('input');i.value=url;document.body.appendChild(i);i.select();try{document.execCommand('copy');toast('Enlace copiado ✓')}catch(x){prompt('Copia este enlace:',url)}i.remove()}
 }
 function btn(view,title){const b=document.createElement('button');b.type='button';b.className='yxy-share';b.dataset.view=view;b.dataset.title=title;
  b.setAttribute('aria-label','Compartir enlace: '+title);b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Compartir</span>';return b}
 document.addEventListener('click',e=>{const b=e.target.closest('.yxy-share');if(!b)return;e.preventDefault();e.stopPropagation();
  const wk=$('season').value,dv=division,url=linkFor(wk,dv,b.dataset.view);
  share(url,b.dataset.title+' · '+DIV[dv]+' · Semana '+wk.replace(/^w/,''))});
 function addButtons(){
  const wk=$('season').value;
  Object.entries(CARDS).forEach(([view,title])=>{const c=card(title);if(!c)return;const head=c.querySelector('.card-title');
   if(head&&!head.querySelector('.yxy-share'))head.appendChild(btn(view,title))});
  const st=tableSection();if(st){const head=st.querySelector('.section-title');if(head&&!head.querySelector('.yxy-share'))head.appendChild(btn('team-stats','Tabla general'))}
  const ins=$('offense6');if(visible(ins)){const head=ins.querySelector('.section-title');if(head&&!head.querySelector('.yxy-share'))head.appendChild(btn('insights','Insights'))}
 }

 const prev=render;render=function(){prev();addButtons();syncUrl()};
 /* las tarjetas se vuelven a dibujar en varios momentos: volver a poner los botones cuando cambien */
 let pend=false;new MutationObserver(()=>{if(pend)return;pend=true;requestAnimationFrame(()=>{pend=false;addButtons()})}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
 /* al cargar: si llegó con un enlace #semana-…, abrir esa vista */
 if(RE.test(initialHash))apply(initialHash,true);
 render();
})();
