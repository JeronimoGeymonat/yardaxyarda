/* ===== IN THE SPOTLIGHT · Semana 6 · Player Stats (14 Grandes) ===== */
const renderBeforeW6PVid=render;
render=function(){renderBeforeW6PVid();const box=document.querySelector('.aside-card.insight'),v=box.querySelector('.spot-w6pvid');
 const on=division==='grandes'&&tab==='players'&&$('season').value==='w6';
 v.hidden=!on;box.classList.toggle('w6pmode',on);if(on)box.classList.remove('empty');
 try{on?v.play().catch(()=>{}):v.pause()}catch(e){}};
render();
