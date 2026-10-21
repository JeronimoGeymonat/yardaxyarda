/* Semana 5 · caja amarilla: sin nombre ni cifra grande (solo nota) */
const renderBeforeW5NoName=render;
render=function(){renderBeforeW5NoName();
 const on=division==='grandes'&&$('season').value==='w5';
 $('featured-name').style.display=on?'none':'';$('featured-value').style.display=on?'none':'';
 /* el selector de semana siempre visible */
 const f=document.querySelector('.filters');if(f&&!currentTeam&&f.style.display==='none'){f.style.display='';['group','category','search'].forEach(id=>{if($(id))$(id).style.display='none'})}
};
render();
