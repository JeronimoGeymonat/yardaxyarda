/* pie de página sigue la semana seleccionada */
const renderBeforeFooter=render;
render=function(){renderBeforeFooter();const f=document.querySelector('footer .yxy-fweek');if(f)f.textContent='ONEFA · 14 GRANDES / NACIONAL · Semana '+$('season').value.slice(1)};
render();
