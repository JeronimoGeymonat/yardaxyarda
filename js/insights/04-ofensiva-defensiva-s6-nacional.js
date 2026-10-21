/* ===== OFENSIVA / DEFENSIVA · Nacional · Semana 6 (fuente: statistics-football.com) — Total Yds = Pass + Rush ===== */
const offense6N=YXY.semana6.ofensiva.nacional;
const defense6N=YXY.semana6.defensiva.nacional;
const renderBeforeNacIns=render;
render=function(){renderBeforeNacIns();
 const nac=division==='nacional';
 document.querySelector('#offense6 h3').textContent='Ofensiva por equipo'+(nac?' · Nacional':' · 14 Grandes');
 document.querySelector('#defense6 h3').textContent='Defensiva por equipo'+(nac?' · Nacional':' · 14 Grandes');
};
render();
document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>render()));
$('group').onchange=()=>render();$('search').oninput=()=>render();
