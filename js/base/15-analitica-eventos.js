/* =========================================================================
   Analítica · eventos de clic que se envían a Google Analytics 4
   (los ves en GA4 → Informes → Interacción → Eventos)
   semana_cambio        · eligió una semana              → semana
   conferencia_cambio   · 14 GRANDES / NACIONAL          → conferencia
   pestana_cambio       · Overview / Player / Team stats → pestana
   team_stats_vista     · Tabla general / Insights       → vista
   equipo_ver           · abrió la página de un equipo   → equipo, conferencia
   cronica_abrir        · abrió una crónica              → titulo
   video_reproducir     · el visitante le dio play       → video
   credito_clic         · clic a un crédito / Instagram  → cuenta, url
   menu_clic            · clic en el menú lateral        → opcion
   ========================================================================= */
(function(){
 const ev=(name,params)=>{try{gtag('event',name,Object.assign({semana_actual:$('season')?.value||'',conferencia_actual:division||''},params||{}))}catch(e){}};
 /* semana */
 $('season')?.addEventListener('change',e=>ev('semana_cambio',{semana:e.target.value}));
 /* conferencia, pestañas, vista de Team Stats, menú y créditos: un solo listener */
 document.addEventListener('click',e=>{
  const d=e.target.closest('[data-division]');if(d){ev('conferencia_cambio',{conferencia:d.dataset.division});return}
  const t=e.target.closest('[data-tab]');if(t){ev('pestana_cambio',{pestana:t.dataset.tab});return}
  const s=e.target.closest('#team-subnav [data-sub]');if(s){ev('team_stats_vista',{vista:s.dataset.sub});return}
  const n=e.target.closest('#yxy-nav a, #yxy-nav button');if(n){ev('menu_clic',{opcion:(n.textContent||'').trim().replace(/\s+/g,' ').slice(0,60)});}
  const a=e.target.closest('a[href^="http"]');
  if(a&&a.host!==location.host){const ig=a.href.match(/instagram\.com\/([^/?#]+)/i);ev('credito_clic',{cuenta:ig?'@'+ig[1]:(a.textContent||'').trim().slice(0,60),url:a.href})}
 },true);
 /* crónica (portada del Clásico) */
 const hero=$('hero6');
 if(hero){hero.addEventListener('click',()=>ev('cronica_abrir',{titulo:hero.getAttribute('aria-label')||'Crónica'}));
  hero.addEventListener('keydown',k=>{if(k.key==='Enter'||k.key===' ')ev('cronica_abrir',{titulo:hero.getAttribute('aria-label')||'Crónica'})})}
 /* páginas de equipo: evento + vista de página virtual */
 let lastTeam='';
 function teamView(){const m=location.hash.match(/^#equipo-(.+)$/);if(!m){lastTeam='';return}
  const r=typeof teamBySlug==='function'?teamBySlug(decodeURIComponent(m[1])):null,name=r?r.team:decodeURIComponent(m[1]);
  if(name===lastTeam)return;lastTeam=name;
  const conf=typeof isNacTeam==='function'&&isNacTeam(name)?'nacional':'grandes';
  ev('equipo_ver',{equipo:name,conferencia:conf});
  try{gtag('event','page_view',{page_title:name+' · Yarda × Yarda',page_location:location.href})}catch(e){}}
 window.addEventListener('hashchange',teamView);teamView();
 /* videos: solo cuando el visitante le da play (no la reproducción automática) */
 const nativePlay=HTMLMediaElement.prototype.play;
 HTMLMediaElement.prototype.play=function(){this._yxyAuto=true;const r=nativePlay.apply(this,arguments);setTimeout(()=>{this._yxyAuto=false},300);return r};
 document.addEventListener('play',e=>{const v=e.target;if(!(v instanceof HTMLVideoElement)||v._yxyAuto)return;
  ev('video_reproducir',{video:v.getAttribute('aria-label')||(v.currentSrc||v.src||'').split('/').pop()})},true);
 document.addEventListener('volumechange',e=>{const v=e.target;if(v instanceof HTMLVideoElement&&!v.muted&&!v._yxyUnmuted){v._yxyUnmuted=true;ev('video_sonido',{video:v.getAttribute('aria-label')||(v.currentSrc||v.src||'').split('/').pop()})}},true);
 /* aviso de cookies (solo la primera vez) */
 let pref=null;try{pref=localStorage.getItem('yxy-cookies')}catch(e){}
 if(!pref){const bar=document.createElement('div');bar.id='yxy-cookies';bar.setAttribute('role','region');bar.setAttribute('aria-label','Aviso de cookies');
  bar.innerHTML='<p>Usamos cookies de Google Analytics para saber cuántas personas visitan Yarda × Yarda y qué secciones usan. Sí usamos publicidad. <a href="privacidad.html">Aviso de privacidad</a></p><div><button type="button" data-ck="si">Aceptar</button><button type="button" data-ck="no">Rechazar</button></div>';
  document.body.appendChild(bar);
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-ck]');if(!b)return;const ok=b.dataset.ck==='si';
   try{localStorage.setItem('yxy-cookies',ok?'si':'no')}catch(x){}
   if(!ok){try{gtag('consent','update',{analytics_storage:'denied'})}catch(x){}}
   bar.remove()});}
})();
