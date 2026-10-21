/* ===== IN THE SPOTLIGHT · Semana 6 (14 Grandes · Overview) ===== */
const renderBeforeSpot6=render;
render=function(){renderBeforeSpot6();
 const box=document.querySelector('.aside-card.insight'),on=division==='grandes'&&tab==='overview'&&$('season').value==='w6';
 box.querySelector('.spot-w6').hidden=!on;box.classList.toggle('w6mode',on);
 if(on)box.classList.remove('empty');
};
render();
