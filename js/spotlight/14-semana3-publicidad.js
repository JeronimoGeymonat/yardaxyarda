/* ===== Semana 3 · 14 Grandes · Overview: publicidad en el cuadro amarillo (post de Instagram "Offense Drip Watch" · anunciante @snap.mx_) ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const POST='https://www.instagram.com/p/DdsaycgIEXW/';
 const w=document.createElement('div');w.className='spot-w3ad';
 w.innerHTML='<a class="w3ad" href="'+POST+'" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicidad de @snap.mx_: ver el post Offense Drip Watch en Instagram">'
  +'<span class="w3ad-tag">Publicidad</span>'
  +'<img src="assets/images/publicidad-s3-offense-drip-watch.webp" alt="Receptor número 0 de Águilas Blancas IPN celebrando con el texto Offense Drip Watch, 14 Grandes" loading="lazy">'
  +'<span class="w3ad-handle">@snap.mx_</span>'
  +'<span class="w3ad-ttl">Offense Drip Watch · 14 Grandes</span>'
  +'<span class="w3ad-btn">Ver post en Instagram ↗</span></a>'
  +'<small class="w3ad-note">Contenido patrocinado por <a href="https://www.instagram.com/snap.mx_/" target="_blank" rel="noopener noreferrer sponsored">@snap.mx_</a></small>';
 box.appendChild(w);
 const prev=render;render=function(){prev();
  const on=$('season').value==='w3'&&division==='grandes'&&tab==='overview'&&!currentTeam;
  box.classList.toggle('w3admode',on);if(on)box.classList.remove('empty')};
 render();
})();
