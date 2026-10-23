/* ===== Semana 7 · 14 Grandes: portada de la nota "¿Y si la final de ONEFA se jugara en campo neutral?" arriba de ONEFA / 14 GRANDES / Semana 7 ===== */
(function(){const before=document.getElementById('league');if(!before)return;
 const NOTA='notas/final-campo-neutral.html',TIT='¿Y si la final de ONEFA se jugara en campo neutral?';
 const f=document.createElement('figure');f.className='hero8 hero-nota';f.id='hero-final-neutral';f.hidden=true;
 f.setAttribute('role','link');f.setAttribute('tabindex','0');f.setAttribute('aria-label','Leer la nota: '+TIT);
 f.innerHTML='<img class="hero8-img" src="assets/images/final-neutral-portada.webp" alt="Pintura estilo fresco de un estadio universitario visto desde lo alto, enmarcado por columnas y ángeles">'
  +'<figcaption class="hero8-cap"><p class="hero8-kicker">Opinión y análisis · ONEFA</p><h2>'+TIT+'</h2>'
  +'<p class="hero8-vs">Una oportunidad para transformar el fútbol americano universitario en México.</p>'
  
  +'<span class="hero8-leer">Leer la nota →</span></figcaption>';
 before.parentNode.insertBefore(f,before);
 const view=document.createElement('div');view.className='yxy-note-view';view.setAttribute('role','dialog');view.setAttribute('aria-modal','true');view.setAttribute('aria-label',TIT);view.setAttribute('aria-hidden','true');
 const frame=document.createElement('iframe');frame.title=TIT;frame.className='yxy-note-frame';frame.setAttribute('allow','web-share; clipboard-write');view.appendChild(frame);document.body.appendChild(view);
 let prevOverflow='';
 function open(){if(!frame.getAttribute('src'))frame.setAttribute('src',NOTA);
  prevOverflow=document.body.style.overflow;view.classList.add('yxy-open');view.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';frame.focus();
  try{gtag('event','cronica_abrir',{titulo:TIT})}catch(e){}}
 function close(){if(!view.classList.contains('yxy-open'))return;view.classList.remove('yxy-open');view.setAttribute('aria-hidden','true');document.body.style.overflow=prevOverflow;f.focus()}
 f.addEventListener('click',e=>{if(e.target.closest('a'))return;e.preventDefault();open()});
 f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 window.addEventListener('message',e=>{if(e.source===frame.contentWindow&&e.data==='yxy-close-article')close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 const prev=render;render=function(){prev();f.hidden=!(division==='grandes'&&$('season').value==='w7'&&!currentTeam)};
 render();
})();
