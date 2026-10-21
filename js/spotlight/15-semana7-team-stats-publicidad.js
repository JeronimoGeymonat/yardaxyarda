/* ===== Semana 7 · Team Stats (14 Grandes y Nacional): publicidad en el cuadro amarillo (post "¿Cuánto cuesta un jugador de 14 G?") ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const POST='https://www.instagram.com/p/DevM5JDGg1x/';
 const w=document.createElement('div');w.className='spot-w7tad';
 w.innerHTML='<a class="w3ad" href="'+POST+'" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicidad: ver el post ¿Cuánto cuesta un jugador de 14 G? en Instagram">'
  +'<span class="w3ad-tag">Publicidad</span>'
  +'<img src="assets/images/publicidad-s7-cuanto-cuesta-jugador.webp" alt="Jugador número 0 de Borregos con el texto ¿Cuánto cuesta un jugador de 14 G? y los costos de uniformes, alimentos, viajes y equipo" loading="lazy">'
  +'<span class="w3ad-ttl">¿Cuánto cuesta un jugador de 14 G?</span>'
  +'<span class="w3ad-btn">Ver post en Instagram ↗</span></a>'
  +'<small class="w3ad-note">Contenido patrocinado.</small>';
 box.appendChild(w);
 const prev=render;render=function(){prev();
  const on=$('season').value==='w7'&&tab==='teams'&&!currentTeam;
  box.classList.toggle('w7tadmode',on);if(on)box.classList.remove('empty');
  if(typeof window.yxyPlaceBox==='function')window.yxyPlaceBox()};
 render();
 document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>setTimeout(render,0)));
})();
