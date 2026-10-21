/* ===== Gráfica 1st & 10 obtenidos vs permitidos · Insights Semana 6 ===== */
function renderFD6(){const nac=division==='nacional',off=nac?offense6N:offense6,def=nac?defense6N:defense6;
 const rows=off.map(o=>{const d=def.find(x=>x.team===o.team);return{team:o.team,g:o.v[3],a:d?d.v[3]:0}}).sort((x,y)=>y.g-x.g||(y.g-y.a)-(x.g-x.a));
 $('fd6-title').innerHTML='¿Cuántos 1st &amp; 10 consiguen y permiten? · '+(nac?'Nacional':'14 Grandes');
 $('fd6-chart').innerHTML=rows.map(r=>{const tot=r.g+r.a||1,pg=r.g/tot*100,pa=100-pg,dif=r.g-r.a;
  return `<div class="fd6-row" title="${esc(r.team)}: ${r.g} obtenidos (${pg.toFixed(0)}%) · ${r.a} permitidos (${pa.toFixed(0)}%)"><div class="fd6-team"><img src="${logoFor(r.team)}" alt="${esc(r.team)}" loading="lazy"><span>${esc(r.team)}</span></div><div class="fd6-bar"><div class="fd6-seg fd6-g" style="width:${pg}%">${r.g}</div><div class="fd6-seg fd6-a" style="width:${pa}%">${r.a}</div></div><div class="fd6-net ${dif>0?'pos':dif<0?'neg':''}">${dif>0?'+':''}${dif}</div></div>`}).join('');}
const renderBeforeFD6=render;
render=function(){renderBeforeFD6();
 const on=tab==='teams'&&$('season').value==='w6'&&teamSub==='insights';
 $('fd6').hidden=!on;if(on)renderFD6();
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
