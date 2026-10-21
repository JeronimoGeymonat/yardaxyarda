/* ===== IN THE SPOTLIGHT · Semana 4 · Team Stats (14 Grandes): video ===== */
const renderBeforeW4T=render;
render=function(){renderBeforeW4T();const box=document.querySelector('.aside-card.insight'),v=box.querySelector('.spot-w4tvid');
 const on=division==='grandes'&&tab==='teams'&&$('season').value==='w4';
 box.classList.toggle('w4tmode',on);if(on)box.classList.remove('empty');
 try{on?v.play().catch(()=>{}):v.pause()}catch(e){}};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
