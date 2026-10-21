/* ===== SEMANA 6 (mismo template que la semana 5) ===== */
standingsByWeek.w6=YXY.semana6.tabla;
standingsByWeek.w7=YXY.semana7.tabla;
/* Marcadores de la semana 6 (14 Grandes): se leen de data/calendario.json */
const results6=YXY.calendario.grandes.find(w=>w.w===6).g.filter(g=>g.pl!=null&&g.pv!=null).map(g=>[g.l,g.pl,g.pv,g.v]);
/* Standings más recientes: alimentan la tira de récords y las páginas de equipo */
const latestStandings=JSON.parse(JSON.stringify(YXY.tablaActual.grandes));
(function(){ $('ticker-track').innerHTML=latestStandings.map(r=>`<a class="ticker-item" href="#equipo-${teamSlug(r.team)}"><span class="ticker-team">${esc(r.team)}</span><span class="ticker-rec">${r.w}-${r.l}</span></a>`).join('');})();
const renderBeforeW6=render;
render=function(){renderBeforeW6();
 const w6=$('season').value==='w6',nac=division==='nacional';
 if(!w6){$('w6-note').hidden=true;return}
 const sd=standingsByWeek.w6,withLogos=rows=>rows.map(r=>({...r,logo:logoFor(r.team)}));
 // encabezados
 $('league').textContent='ONEFA / '+(nac?'NACIONAL':'14 GRANDES')+' / Semana 6';
 $('source-note').textContent='Fuente: ONEFA · Liga Mayor 2026 · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes')+' · Semana 6';
 $('heading').textContent=tab==='teams'?'Estadísticas por equipo · Tabla general':tab==='players'?'Estadísticas de jugadores · Semana 6':'Resultados · Semana 6';
 $('w6-note').hidden=true;$('cards').classList.toggle('plain',true);
 if(nac)$('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Estadísticas y tabla general de la semana 6.';
 // tabla general (Team Stats)
 if(tab==='teams'){
  $('standings-title').textContent='Liga Mayor 2026 · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes');
  $('standings').querySelector('.pill').textContent='Semana 6 · '+(nac?'18 equipos · 3 grupos':'14 equipos');
  $('standings-table').innerHTML=nac?sd.nacional.map(g=>`<h4 class="st-group">${esc(g.name)}</h4>${standingsTable(withLogos(g.rows),true)}`).join(''):standingsTable(withLogos(sd.grandes),true);
  $('standings-note').textContent='JJ = juegos jugados · G = ganados · P = perdidos · % = porcentaje de victorias · P.A. = puntos a favor · P.C. = puntos en contra · DIF = diferencia · PTS = puntos en la tabla (2 por victoria). Los equipos con la misma posición están empatados. Tabla al cierre de la semana 6.';
 }
 // resultados de la semana (solo 14 Grandes)
 const w5=$('wr-w5'),pa=$('wr-past');
 if(!nac){$('weekly-results').hidden=false;w5.style.display='none';pa.style.display='';
  $('weekly-results-title').textContent='RESULTADOS DE LA SEMANA';$('wr-pill').textContent='14 GRANDES · Semana 6';$('wr-note').innerHTML='';
  const tk=n=>resultTiles[tileKey[n]||n],p=v=>String(v).padStart(2,'0');
  pa.innerHTML=results6.map(([l,pl,pv,v],i)=>{const wl=pl>pv?'win':'loss',wv=pv>pl?'win':'loss';return `<article class="match"><div class="match-head"><span>Juego ${i+1}</span><span>Final</span></div><div class="match-body"><img class="match-logo ${wl}" src="${tk(l)}" alt="${esc(l)}" title="${esc(l)}"><span class="match-score ${wl}">${p(pl)}</span><span class="match-sep" aria-hidden="true">–</span><span class="match-score ${wv}">${p(pv)}</span><img class="match-logo ${wv}" src="${tk(v)}" alt="${esc(v)}" title="${esc(v)}"></div></article>`}).join('');
 }else{$('weekly-results').hidden=true}
};
render();
