/* ===== TABLA GENERAL · SEMANA 4 ===== */
const standingsByWeek={};standingsByWeek.w4=YXY.semana4.tabla;
standingsByWeek.w3=YXY.semana3.tabla;
function logoFor(team){const a=standingsData.find(r=>r.team===team);if(a)return a.logo;for(const g of standingsNacional){const b=g.rows.find(r=>r.team===team);if(b)return b.logo}return ''}
const renderBeforeSt4=render;
render=function(){renderBeforeSt4();
 const wkS=$('season').value,sd=wkS!=='w6'&&standingsByWeek[wkS],w4=!!sd,nac=division==='nacional',sn=wkS.slice(1);$('st4').hidden=!w4;
 if(!w4){$('st4-table').innerHTML='';return}
 const withLogos=rows=>rows.map(r=>({...r,logo:logoFor(r.team)}));
 $('st4-title').textContent='Tabla general · Semana '+sn+' · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes');
 $('st4-pill').textContent=nac?'18 equipos · 3 grupos':'14 equipos';
 $('st4-table').innerHTML=nac?sd.nacional.map(g=>`<h4 class="st-group">${esc(g.name)}</h4>${standingsTable(withLogos(g.rows),true)}`).join(''):standingsTable(withLogos(sd.grandes),true);
 $('st4-note').textContent='JJ = juegos jugados · G = ganados · P = perdidos · % = porcentaje de victorias · P.A. = puntos a favor · P.C. = puntos en contra · DIF = diferencia · PTS = puntos en la tabla (2 por victoria). Los equipos con la misma posición están empatados. Tabla al cierre de la semana '+sn+'.';
 if(nac){document.querySelector('.layout').style.display='none';document.querySelector('.tabs').style.display='none';document.querySelector('.filters').style.display='';['group','category','search'].forEach(id=>$(id).style.display='none');
  $('calendar').hidden=true;$('weekly-results').hidden=true;
  $('heading').textContent='Tabla general · Semana '+sn;$('source-note').textContent='Liga Mayor 2026 · Conferencia Nacional';$('league').textContent='ONEFA / NACIONAL / Semana '+sn;
  $('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Tabla general de la semana '+sn+'.';
 }else{$('heading').textContent='Resultados y tabla general · Semana '+sn;$('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Resultados y tabla general de la semana '+sn+'.';}
};
render();
