/* ===== Semana 5 · 14 Grandes · Overview: video de publicidad de @snap.mx_ en el cuadro amarillo
   (la nota de Puebla, el video anterior y la nota de Edson Rincón pasaron a Player stats) ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const POST='https://www.instagram.com/p/Deh6e-PSg4M/';
 const w=document.createElement('div');w.className='spot-w5ad';
 w.innerHTML='<span class="w3ad-tag">Publicidad</span>'
  +'<video src="assets/videos/publicidad-s5-snap.mp4" poster="assets/images/publicidad-s5-snap-poster.jpg" muted loop playsinline controls preload="none" aria-label="Publicidad de @snap.mx_ · semana 5"></video>'
  +'<small class="spot-credit">📸 <a href="https://www.instagram.com/snap.mx_/" target="_blank" rel="noopener noreferrer sponsored">@snap.mx_</a></small>'
  +'<a class="w3ad" href="'+POST+'" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicidad de @snap.mx_: ver el post en Instagram"><span class="w3ad-handle">@snap.mx_</span><span class="w3ad-btn">Ver post en Instagram ↗</span></a>'
  +'<small class="w3ad-note">Contenido patrocinado por <a href="https://www.instagram.com/snap.mx_/" target="_blank" rel="noopener noreferrer sponsored">@snap.mx_</a></small>';
 box.appendChild(w);const vid=w.querySelector('video'),old=box.querySelector('.spot-w5vid');
 const prev=render;render=function(){prev();
  const on=$('season').value==='w5'&&division==='grandes'&&tab==='overview'&&!currentTeam;
  box.classList.toggle('w5admode',on);if(on)box.classList.remove('empty');
  try{if(on){old&&old.pause();vid.play().catch(()=>{})}else vid.pause()}catch(e){}
  if(typeof window.yxyPlaceBox==='function')window.yxyPlaceBox()};
 render();
})();
