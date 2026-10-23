/* ===== Semana 7 · 14 Grandes · Player Stats: dos videos en el cuadro amarillo ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const w=document.createElement('div');w.className='spot-w7p';
 w.innerHTML='<video src="assets/videos/8aee761941.mp4" poster="assets/images/d0b97e1a6a.jpg" muted loop playsinline controls preload="none" aria-label="Video destacado de la semana 7 (1)"></video><small class="spot-credit">📸 <a href="https://www.instagram.com/mqzsports/" target="_blank" rel="noopener noreferrer">@mqzsports</a></small>'
  +'<h4 class="spot-headline w7-head">¡GRAN NOCHE EN SU REGRESO A CASA! PATRICIO HERNÁNDEZ IMPARABLE ANTE LEONES ANÁHUAC</h4><p class="spot-w6t-txt w7-txt">Patricio Hernández tuvo un regreso a casa para recordar. El receptor, originario de Cancún, fue una de las grandes figuras en la contundente victoria de Borregos Puebla por 75-0 ante Leones Anáhuac Cancún, registrando <b>5 recepciones, 118 yardas y 2 touchdowns</b>.</p><p class="spot-w6t-txt w7-txt">Con esta actuación, Hernández lideró el espectáculo ofensivo de los poblanos, quienes ahora ponen la mira en sus últimos dos compromisos de temporada ante Águilas Blancas y Aztecas UDLAP.</p>'
  +'<video src="assets/videos/48426f78af.mp4" poster="assets/images/b57044b78f.jpg" muted loop playsinline controls preload="none" aria-label="Video destacado de la semana 7 (2)"></video><small class="spot-credit">📸 <a href="https://www.instagram.com/dashonlights/" target="_blank" rel="noopener noreferrer">@dashonlights</a></small>'
  +'<h4 class="spot-headline w7-head">BORREGOS CEM MANTIENE VIVO EL SUEÑO DE PLAYOFFS TRAS VENCER A LINCES</h4><p class="spot-w6t-txt w7-txt">La carrera por la postemporada sigue encendida para Borregos CEM quienes consiguieron una importante victoria ante Linces UVM en el Corral de Plástico, impulsados por una destacada actuación de Kareem Ochoa, quien acumuló <b>233 yardas y 2 pases de touchdown</b>.</p><p class="spot-w6t-txt w7-txt">Con dos partidos restantes ante Borregos Guadalajara y Zorros CETYS, el CEM buscará cerrar con paso perfecto para asegurar su lugar entre los equipos clasificados a playoffs.</p>';
 box.appendChild(w);const vids=[...w.querySelectorAll('video')];
 const prev=render;render=function(){prev();
  const on=$('season').value==='w7'&&division==='grandes'&&tab==='players'&&!currentTeam;
  box.classList.toggle('w7pmode',on);if(on)box.classList.remove('empty');
  vids.forEach(v=>{try{on?v.play().catch(()=>{}):v.pause()}catch(e){}})};
 render();
})();
