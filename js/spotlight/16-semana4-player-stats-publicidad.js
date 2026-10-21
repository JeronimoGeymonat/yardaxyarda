/* ===== Semana 4 · Player Stats (14 Grandes y Nacional): publicidad en el cuadro amarillo (post "OL Drip Watch") ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const POST='https://www.instagram.com/p/Ddhl8I5Ephj/';
 const w=document.createElement('div');w.className='spot-w4pad';
 w.innerHTML='<a class="w3ad" href="'+POST+'" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicidad: ver el post OL Drip Watch en Instagram">'
  +'<span class="w3ad-tag">Publicidad</span>'
  +'<img src="assets/images/publicidad-s4-ol-drip-watch.webp" alt="Liniero ofensivo número 73 de Borregos CEM saliendo al campo con una bandera, con el texto OL Drip Watch, 14 Grandes" loading="lazy">'
  +'<span class="w3ad-ttl">OL Drip Watch · 14 Grandes</span>'
  +'<span class="w3ad-btn">Ver post en Instagram ↗</span></a>'
  +'<small class="w3ad-note">Contenido patrocinado.</small>';
 box.appendChild(w);
 const prev=render;render=function(){prev();
  const on=$('season').value==='w4'&&tab==='players'&&!currentTeam;
  box.classList.toggle('w4padmode',on);if(on)box.classList.remove('empty');
  if(typeof window.yxyPlaceBox==='function')window.yxyPlaceBox()};
 render();
})();
