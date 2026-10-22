/* ===== Semana 8 · 14 Grandes: la portada "Guerra Civil" abre la nota previa (notas/previa-guerra-civil.html) ===== */
(function(){const card=document.getElementById('hero8');if(!card)return;
 const NOTA='notas/previa-guerra-civil.html',TIT='Todo listo para la “Guerra Civil”: El clásico choque entre instituciones del IPN';
 card.setAttribute('role','link');card.setAttribute('tabindex','0');card.setAttribute('aria-label','Leer la previa: '+TIT);
 const cap=card.querySelector('.hero8-cap');if(cap&&!cap.querySelector('.hero8-leer'))cap.insertAdjacentHTML('beforeend','<span class="hero8-leer">Leer la previa →</span>');
 const view=document.createElement('div');view.className='yxy-note-view';view.setAttribute('role','dialog');view.setAttribute('aria-modal','true');view.setAttribute('aria-label','Previa de la Guerra Civil');view.setAttribute('aria-hidden','true');
 const frame=document.createElement('iframe');frame.title=TIT;frame.className='yxy-note-frame';view.appendChild(frame);document.body.appendChild(view);
 let prevOverflow='';
 function open(){if(!frame.getAttribute('src'))frame.setAttribute('src',NOTA);
  prevOverflow=document.body.style.overflow;view.classList.add('yxy-open');view.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  try{frame.contentWindow&&frame.contentWindow.scrollTo(0,0)}catch(e){}frame.focus();
  try{gtag('event','cronica_abrir',{titulo:TIT})}catch(e){}}
 function close(){if(!view.classList.contains('yxy-open'))return;view.classList.remove('yxy-open');view.setAttribute('aria-hidden','true');document.body.style.overflow=prevOverflow;card.focus()}
 card.addEventListener('click',e=>{if(e.target.closest('a'))return;e.preventDefault();open()});
 card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 window.addEventListener('message',e=>{if(e.source===frame.contentWindow&&e.data==='yxy-close-article')close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
