/* ===== Semana 4: pestañas Overview / Player stats / Team stats (igual que semana 5) ===== */
const renderBeforeW4Tabs=render;
render=function(){renderBeforeW4Tabs();
 if($('season').value!=='w4')return;
 const nac=division==='nacional',box=document.querySelector('.aside-card.insight'),vid=box.querySelector('.spot-video');
 document.querySelector('.tabs').style.display='';
 const ov=tab==='overview',pl=tab==='players',tm=tab==='teams';
 $('cards').classList.toggle('hidden',tm);
 $('weekly-results').hidden=!(ov&&!nac);
 $('st4').hidden=!tm;
 const showVid=ov&&!nac;
 box.classList.toggle('w4mode',showVid);box.classList.toggle('empty',!showVid);
 try{showVid?vid.play().catch(()=>{}):vid.pause()}catch(e){}
 $('heading').textContent=tm?'Estadísticas por equipo · Tabla general':pl?'Estadísticas de jugadores · Semana 4':(nac?'Líderes · Semana 4':'Líderes y resultados · Semana 4');
 $('league').textContent='ONEFA / '+(nac?'NACIONAL':'14 GRANDES')+' / Semana 4';
 $('source-note').textContent='Fuente: ONEFA · Liga Mayor 2026 · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes')+' · Semana 4';
 $('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Estadísticas de la semana 4.';
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
