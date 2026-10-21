/* ===== IN THE SPOTLIGHT · Semana 6 · Team Stats · Tabla general (14 Grandes) ===== */
const renderBeforeW6T=render;
render=function(){renderBeforeW6T();const box=document.querySelector('.aside-card.insight');
 const on=division==='grandes'&&tab==='teams'&&$('season').value==='w6'&&teamSub==='tabla';
 box.classList.toggle('w6tmode',on);if(on)box.classList.remove('empty');else if(tab==='teams'&&!box.classList.contains('w6pmode')&&!box.classList.contains('w6mode')&&!box.classList.contains('w4mode'))box.classList.add('empty');};
render();
document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>render()));
$('group').onchange=()=>render();$('search').oninput=()=>render();
