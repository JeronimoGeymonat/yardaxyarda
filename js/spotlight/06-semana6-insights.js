/* ===== IN THE SPOTLIGHT · Team Stats · Insights · Semana 6 (video + ad @snap.mx_) ===== */
const renderBeforeW6I=render;
render=function(){renderBeforeW6I();const box=document.querySelector('.aside-card.insight'),v=box.querySelector('.spot-w6ivid');
 const on=tab==='teams'&&($('season').value==='w6'||($('season').value==='w5'&&division==='grandes'))&&teamSub==='insights';
 box.classList.toggle('w6imode',on);if(on)box.classList.remove('empty');
 try{on?v.play().catch(()=>{}):v.pause()}catch(e){}};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
