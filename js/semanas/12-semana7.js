/* ===== SEMANA 7: líderes (copia de semana 6, sin imágenes) + Overview / Player Stats / Team Stats + resultados ===== */
/* Marcadores de la semana 7: se leen de data/calendario.json */
function w7Tile(g,i,logo,label){const done=g.pl!=null&&g.pv!=null,p=v=>String(v).padStart(2,'0'),wl=done?(g.pl>g.pv?'win':'loss'):'',wv=done?(g.pv>g.pl?'win':'loss'):'';
 return `<article class="match"><div class="match-head"><span>Juego ${i+1}</span><span>${done?'Final':esc((g.f||'')+(g.h?' · '+g.h:''))}</span></div><div class="match-body"><img class="match-logo ${label} ${wl}" src="${logo(g.l)}" alt="${esc(g.l)}" title="${esc(g.l)}"><span class="match-score ${done?wl:'nr'}">${done?p(g.pl):'—'}</span><span class="match-sep" aria-hidden="true">–</span><span class="match-score ${done?wv:'nr'}">${done?p(g.pv):'—'}</span><img class="match-logo ${label} ${wv}" src="${logo(g.v)}" alt="${esc(g.v)}" title="${esc(g.v)}"></div></article>`}
const renderBeforeW7=render;
render=function(){renderBeforeW7();
 if($('season').value!=='w7'||currentTeam)return;
 const nac=division==='nacional',layout=document.querySelector('.layout'),left=layout.firstElementChild,box=document.querySelector('.aside-card.insight');
 const datos=[...document.querySelectorAll('.aside-card')].find(c=>c.querySelector('h3')?.textContent==='Datos del tablero');
 $('calendar').hidden=true;layout.style.display='';left.classList.add('w4col');
 if(w4Nodes.wr.parentNode!==left)left.appendChild(w4Nodes.wr);
 if(w4Nodes.st.parentNode!==left)left.appendChild(w4Nodes.st);
 if(datos)datos.style.display='none';
 document.querySelector('.tabs').style.display='';
 document.querySelector('.filters').style.display='';['group','category','search'].forEach(id=>{if($(id))$(id).style.display='none'});
 const ov=tab==='overview',pl=tab==='players',tm=tab==='teams';
 $('cards').classList.toggle('hidden',tm);$('cards').classList.add('plain');
 $('st4').hidden=!tm;$('team-subnav').hidden=true;['insights','offense6','defense6','fd6'].forEach(id=>{if($(id))$(id).hidden=true});
 box.classList.remove('w4mode','w6mode','w6pmode','w6tmode','w6imode','w4tmode');box.classList.add('empty');
 /* resultados de la semana: Overview y Team Stats */
 const wr=$('weekly-results'),showR=ov||tm;wr.hidden=!showR;
 if(showR){$('wr-w5').style.display='none';$('wr-past').style.display='';
  $('weekly-results-title').textContent='RESULTADOS DE LA SEMANA';$('wr-pill').textContent=(nac?'NACIONAL':'14 GRANDES')+' · Semana 7';
  let games,bye='';
  if(nac){const w=nacWeek(7);games=w.g;bye=w.bye}else{games=teamSchedule.find(w=>w.w===7).g;const cw=calendarData.grandes.w7;bye=(cw&&!Array.isArray(cw)&&cw.bye)||''}
  const tk=n=>nac?logoFor(n):(resultTiles[tileKey[n]||n]||logoFor(n));
  $('wr-past').innerHTML=games.map((g,i)=>w7Tile(g,i,tk,nac?'nac':'')).join('');
  const pend=games.filter(g=>g.pl==null||g.pv==null).length;
  $('wr-note').innerHTML=(bye?`<span class="bye">Descansan: <b>${esc(bye)}</b></span>`:'')+(pend?`<br><span class="bye">${pend} ${pend===1?'marcador pendiente':'marcadores pendientes'} de captura.</span>`:'');
  if(tm&&$('st4').compareDocumentPosition(wr)&Node.DOCUMENT_POSITION_PRECEDING)$('st4').after(wr);
  if(!tm&&wr.compareDocumentPosition($('cards'))&Node.DOCUMENT_POSITION_PRECEDING&&false){}
 }
 if(tm){$('st4-title').textContent='Tabla general · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes');$('st4-note').textContent='JJ = juegos jugados · G = ganados · P = perdidos · % = porcentaje de victorias · P.A. = puntos a favor · P.C. = puntos en contra · DIF = diferencia · PTS = puntos en la tabla. Tabla al cierre de la semana 6; se actualizará con los resultados de la semana 7.'}
 $('heading').textContent=tm?'Estadísticas por equipo · Tabla general':pl?'Estadísticas de jugadores · Semana 7':(nac?'Líderes y resultados · Semana 7':'Líderes y resultados · Semana 7');
 $('league').textContent='ONEFA / '+(nac?'NACIONAL':'14 GRANDES')+' / Semana 7';
 $('source-note').textContent='Fuente: ONEFA · Liga Mayor 2026 · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes')+' · Semana 7';
 $('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Estadísticas de la semana 7.';
 const opt=[...$('season').options].find(o=>o.value==='w7');if(opt)opt.textContent='Semana 7';
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
