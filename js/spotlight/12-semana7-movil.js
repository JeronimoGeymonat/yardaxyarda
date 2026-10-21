/* Semana 7 (pantallas angostas): el cuadro amarillo va antes de "Resultados de la semana" */
(function(){const box=document.querySelector('.aside-card.insight'),home=box.parentNode,anchor=box.nextSibling,mq=matchMedia('(max-width:1100px)');
 function place(){const wr=$('weekly-results'),on=mq.matches&&$('season').value==='w7'&&!currentTeam&&wr&&!wr.hidden&&wr.parentNode&&!box.classList.contains('empty');
  if(on){if(box.nextSibling!==wr)wr.parentNode.insertBefore(box,wr);box.classList.add('box-inline')}
  else if(box.parentNode!==home){home.insertBefore(box,anchor);box.classList.remove('box-inline')}}
 const prev=render;render=function(){prev();place()};mq.addEventListener('change',place);place();
})();
