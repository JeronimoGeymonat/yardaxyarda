const standingsData=YXY.semana5.tabla.grandes;
const standingsNacional=YXY.semana5.tabla.nacional;
function standingsTable(rows,withPts){return `<div class="table-wrap"><table class="standings-table"><thead><tr><th>POS</th><th>EQUIPO</th><th title="Juegos jugados">JJ</th><th title="Ganados">G</th><th title="Perdidos">P</th><th title="Porcentaje de victorias">%</th><th title="Puntos a favor">P.A.</th><th title="Puntos en contra">P.C.</th><th title="Diferencia de puntos">DIF</th>${withPts?'<th title="Puntos en la tabla">PTS</th>':''}</tr></thead><tbody>${rows.map((r,i)=>{const gp=r.w+r.l,d=r.pf-r.pc,pct=gp?(r.w/gp).toFixed(3).replace(/^0/,''):'—';return `<tr><td class="st-pos">${r.pos??i+1}</td><td><div class="st-team"><img src="${r.logo}" alt="" loading="lazy">${`<a class="team-link" href="#equipo-${teamSlug(r.team)}">${esc(r.team)}</a>`}</div></td><td>${gp}</td><td class="st-strong">${r.w}</td><td>${r.l}</td><td>${pct}</td><td>${r.pf}</td><td>${r.pc}</td><td class="${d>0?'st-pos-dif':d<0?'st-neg-dif':''}">${d>0?'+':''}${d}</td>${withPts?`<td class="st-strong">${r.pts}</td>`:''}</tr>`}).join('')}</tbody></table></div>`}
function renderStandings(){const nac=division==='nacional';
 $('standings-title').textContent='Liga Mayor 2026 · '+(nac?'Conferencia Nacional':'Conferencia 14 Grandes');
 $('standings').querySelector('.pill').textContent='Semana 5 · '+(nac?standingsNacional.reduce((s,g)=>s+g.rows.length,0)+' equipos · '+standingsNacional.length+' grupos':standingsData.length+' equipos');
 $('standings-table').innerHTML=nac?standingsNacional.map(g=>`<h4 class="st-group">${esc(g.name)}</h4>${standingsTable(g.rows,true)}`).join(''):standingsTable(standingsData,false);
 $('standings-note').textContent='JJ = juegos jugados · G = ganados · P = perdidos · % = porcentaje de victorias · P.A. = puntos a favor · P.C. = puntos en contra · DIF = diferencia'+(nac?' · PTS = puntos en la tabla (2 por victoria)':'')+'. JJ y % se calculan a partir de G y P. El orden es el de la tabla oficial de ONEFA.';
}
const renderStats=render;
render=function(){
 
 if(false){tab='overview';document.querySelectorAll('[data-tab]').forEach(x=>{x.classList.toggle('active',x.dataset.tab==='overview');x.setAttribute('aria-pressed',x.dataset.tab==='overview')})}
 renderStats();
 const st=tab==='teams';
 $('standings').hidden=!st;$('table').hidden=st;$('table-title').parentElement.style.display=st?'none':'';[...document.querySelectorAll('.aside-card')].filter(c=>c.querySelector('h3')&&c.querySelector('h3').textContent==='Datos del tablero').forEach(c=>c.style.display=st?'none':'');document.querySelector('.filters').style.display=st?'none':'';
 if(st){$('heading').textContent='Estadísticas por equipo · Tabla general';$('source-note').textContent='Fuente: ONEFA · Liga Mayor 2026 · '+(division==='nacional'?'Conferencia Nacional':'Conferencia 14 Grandes')+' · Semana 5';renderStandings()}
};
render();
