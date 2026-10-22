/* ===== Semana 7 · 14 Grandes · Player Stats: dos videos en el cuadro amarillo ===== */
(function(){const box=document.querySelector('.aside-card.insight');if(!box)return;
 const w=document.createElement('div');w.className='spot-w7p';
 w.innerHTML='<video src="assets/videos/8aee761941.mp4" poster="assets/images/d0b97e1a6a.jpg" muted loop playsinline controls preload="none" aria-label="Video destacado de la semana 7 (1)"></video><small class="spot-credit">📸 <a href="https://www.instagram.com/mqzsports/" target="_blank" rel="noopener noreferrer">@mqzsports</a></small>'
  +'<video src="assets/videos/48426f78af.mp4" poster="assets/images/b57044b78f.jpg" muted loop playsinline controls preload="none" aria-label="Video destacado de la semana 7 (2)"></video><small class="spot-credit">📸 <a href="https://www.instagram.com/dashonlights/" target="_blank" rel="noopener noreferrer">@dashonlights</a></small>';
 box.appendChild(w);const vids=[...w.querySelectorAll('video')];
 const prev=render;render=function(){prev();
  const on=$('season').value==='w7'&&division==='grandes'&&tab==='players'&&!currentTeam;
  box.classList.toggle('w7pmode',on);if(on)box.classList.remove('empty');
  vids.forEach(v=>{try{on?v.play().catch(()=>{}):v.pause()}catch(e){}})};
 render();
})();
