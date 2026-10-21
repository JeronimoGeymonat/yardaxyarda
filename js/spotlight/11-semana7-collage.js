/* Semana 7 · cuadro amarillo: collage (14 Grandes · Overview) */
const renderBeforeW7Box=render;
render=function(){renderBeforeW7Box();const box=document.querySelector('.aside-card.insight');
 const on=$('season').value==='w7'&&division==='grandes'&&tab==='overview'&&!currentTeam;
 box.classList.toggle('w7mode',on);if(on)box.classList.remove('empty')};
render();
