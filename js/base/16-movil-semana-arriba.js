/* ===== Celular/tablet: al cambiar de semana, la página vuelve hasta arriba (logo y botón del menú lateral visibles) ===== */
(function(){const s=$('season');if(!s)return;const mq=matchMedia('(max-width:1100px)');
 s.addEventListener('change',()=>{if(!mq.matches)return;
  try{s.blur()}catch(e){}
  requestAnimationFrame(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0);document.documentElement.style.scrollBehavior=''});});
})();
