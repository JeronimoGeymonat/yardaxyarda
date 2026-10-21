/* ===== Conferencia Nacional: landing page por equipo + tira de récords por conferencia ===== */
const latestStandingsN=JSON.parse(JSON.stringify(YXY.tablaActual.nacional));
const statTeamMapN={'Acatlan':'Pumas Acatlán','Anahuac Q':'Leones Anáhuac QRO','ITSON':'Potros ITSON','Panteras S21':'Panteras S21','Red Wolves':'Red Wolves QRO','Tepeyac':'Frailes Tepeyac','UABC':'Cimarrones UABC','UACH':'Águilas UACH','UACJ':'Indios UACJ','UADEC':'Lobos UAdeC','UAEM':'Potros Salvajes UAEM','UAG':'Tecos UAG','UAT':'Correcaminos UAT','UIW':'Cardinals UIW','UV':'Halcones UV','ULM':'Lobos ULM'};
function nacRow(team){for(const g of latestStandingsN){const r=g.rows.find(x=>x.team===team);if(r)return {...r,group:g.name}}return null}
function isNacTeam(team){return !!nacRow(team)}
/* tira de récords: 14 Grandes o Nacional según la conferencia activa (standings más recientes) */
function buildTicker(){const nac=division==='nacional',tr=$('ticker-track'),key=nac?'n':'g';if(tr.dataset.conf===key)return;tr.dataset.conf=key;
 const rows=nac?latestStandingsN.flatMap(g=>g.rows):latestStandings;
 tr.innerHTML=rows.map(r=>`<a class="ticker-item" href="#equipo-${teamSlug(r.team)}"><span class="ticker-team">${esc(r.team)}</span><span class="ticker-rec">${r.w}-${r.l}</span></a>`).join('');tr.scrollLeft=0;
 const lab=document.querySelector('.ticker-label span:last-child');if(lab)lab.textContent=nac?'Nacional':'14 Grandes';
 document.querySelector('.ticker').setAttribute('aria-label','Récord de los equipos de '+(nac?'la Conferencia Nacional':'14 Grandes'));}
const _teamBySlugG=teamBySlug;
teamBySlug=function(s){return _teamBySlugG(s)||latestStandingsN.flatMap(g=>g.rows).find(r=>teamSlug(r.team)===s)};
/* estadísticas ofensivas/defensivas para ambas conferencias */
teamOffDef=function(team){
 const nac=isNacTeam(team),OFF=nac?offense6N:offense6,DEF=nac?defense6N:defense6;
 const o=OFF.find(r=>r.team===team),d=DEF.find(r=>r.team===team);if(!o&&!d)return '';
 const rank=(arr,idx,v,hb)=>1+arr.filter(r=>hb?r.v[idx]>v:r.v[idx]<v).length,n=OFF.length;
 const offDef=[['Yds por aire',0,true],['Yds por tierra',1,true],['Yds totales',2,true],['Primeros downs',3,true],['Puntos anotados',4,true],['Intercepciones',5,false],['Balones sueltos',6,false],['Castigos',7,false]];
 const defDef=[['Yds por aire permitidas',0,false],['Yds por tierra permitidas',1,false],['Yds totales permitidas',2,false],['Primeros downs permitidos',3,false],['Puntos permitidos',4,false],['Intercepciones',5,true],['Balones recuperados',6,true],['Castigos',7,false]];
 const tiles=(row,arr,defs)=>defs.map(([lbl,i,hb])=>{const r=rank(arr,i,row.v[i],hb);return `<div class="tp-stat${r<=3?' best':''}"><span>${lbl}</span><b>${fmt(row.v[i])}</b><em>#${r} de ${n}</em></div>`}).join('');
 return `<section class="tp-section"><div class="section-title"><h3>Estadísticas ofensivas</h3><span class="pill">Acumulado · Semana 6</span></div>${o?`<div class="tp-stats">${tiles(o,OFF,offDef)}</div>`:'<div class="tp-empty">Sin datos.</div>'}</section>
 <section class="tp-section"><div class="section-title"><h3>Estadísticas defensivas</h3><span class="pill">Acumulado · Semana 6</span></div>${d?`<div class="tp-stats">${tiles(d,DEF,defDef)}</div>`:'<div class="tp-empty">Sin datos.</div>'}<p class="note">El ranking (#) compara al equipo con los ${n} de la conferencia; en defensiva, menos yardas y puntos permitidos es mejor.</p></section>`;
};
/* líderes: dato más reciente por categoría, en la conferencia del equipo */
teamLeaders=function(team){
 const conf=isNacTeam(team)?'nacional':'grandes',map=conf==='nacional'?statTeamMapN:statTeamMap;
 const weeks=[[7,divisionData7||divisionData6],[6,divisionData6],[5,divisionData],[4,divisionData4],[3,divisionData3]];
 const titles=[];weeks.forEach(([,d])=>(d[conf]||[]).forEach(c=>{if(!titles.includes(c.title))titles.push(c.title)}));
 const out=[];
 titles.forEach(title=>{for(const [wk,d] of weeks){const cat=(d[conf]||[]).find(c=>c.title===title);if(!cat)continue;
  const rs=[...cat.rows].sort((a,b)=>b.values[0]-a.values[0]),mine=rs.filter(r=>map[r.team]===team);if(!mine.length)continue;
  mine.forEach(r=>{const rank=rs.findIndex(x=>x.values[0]===r.values[0])+1;out.push({cat:cat.title,metric:cat.metrics[0],name:r.name,val:r.values[0],rank,total:rs.length,week:wk,extra:cat.metrics.slice(1).map((m,i)=>m+': '+fmt(r.values[i+1])).join(' · ')})});break;}});
 return out};
function setDivision(dv){if(division===dv)return;division=dv;document.querySelectorAll('[data-division]').forEach(x=>{x.classList.toggle('active',x.dataset.division===dv);x.setAttribute('aria-pressed',x.dataset.division===dv)});$('search').value='';setup()}
const _renderTeamPageG=renderTeamPage;
renderTeamPage=function(team){
 if(!isNacTeam(team)){_renderTeamPageG(team);buildTicker();return}
 setDivision('nacional');buildTicker();
 const st=nacRow(team),d=st.pf-st.pc,logo=logoFor(team),leaders=teamLeaders(team),roster=rosterData[team]||[];
 $('team-page').innerHTML=`<button type="button" class="tp-back" id="tp-back">‹ Volver</button>
 <div class="tp-hero">${logo?`<img class="tp-tile tp-logo" src="${logo}" alt="">`:''}<div><div class="tp-eyebrow">ONEFA / Nacional / ${esc(st.group)} / Equipo</div><h1 class="tp-name">${esc(team)}</h1>
 <div class="tp-chips"><div class="tp-chip"><span>Récord</span><b>${st.w}-${st.l}</b></div><div class="tp-chip"><span>Posición</span><b>${st.pos}º</b></div><div class="tp-chip"><span>Grupo</span><b>${esc(st.group.replace(/^Grupo\s*/,''))}</b></div><div class="tp-chip"><span>P.A.</span><b>${st.pf}</b></div><div class="tp-chip"><span>P.C.</span><b>${st.pc}</b></div><div class="tp-chip"><span>DIF</span><b class="${d<0?'neg':''}">${d>0?'+':''}${d}</b></div></div></div></div>
 ${teamPhotos[team]?`<figure class="tp-photo${teamPhotoFull[team]?' full':''}"><img src="${teamPhotos[team]}" alt="${esc(team)}">${teamPhotoCredit[team]?`<figcaption class="tp-credit">📸 ${teamPhotoCredit[team].map(c=>`<a href="${c[1]}" target="_blank" rel="noopener">${esc(c[0])}</a>`).join(' · ')}</figcaption>`:''}</figure>`:''}
 <section class="tp-section"><div class="section-title"><h3>Calendario · Semanas 1–10</h3><span class="pill">Liga Mayor 2026</span></div>
 <div class="table-wrap"><table class="tp-sched"><thead><tr><th>Semana</th><th>Fecha</th><th>Hora</th><th>Rival</th><th>Estadio</th><th>Resultado</th></tr></thead><tbody>${Array.from({length:10},(_,i)=>`<tr><td>Semana ${i+1}</td><td>—</td><td>—</td><td>—</td><td>—</td><td><span class="tp-res p">Próximamente</span></td></tr>`).join('')}</tbody></table></div>
 <p class="note">El calendario de la Conferencia Nacional se publicará próximamente.</p></section>
 ${teamOffDef(team)}<section class="tp-section"><div class="section-title"><h3>Líderes en stats</h3><span class="pill">Datos más recientes</span></div>
 ${leaders.length?`<div class="tp-leaders">${leaders.map(l=>`<div class="tp-leader"><div class="cat">${esc(l.cat)} · ${esc(l.metric)}</div><div class="pl">${esc(l.name)}</div><div class="val">${fmt(l.val)}</div>${l.extra?`<div class="sub">${esc(l.extra)}</div>`:''}<div class="rk">#${l.rank} de la conferencia${l.week?' · Semana '+l.week:''}</div></div>`).join('')}</div>`:'<div class="tp-empty">Ningún jugador de este equipo aparece en los rankings de líderes más recientes.</div>'}</section>
 <section class="tp-section"><div class="section-title"><h3>Roster</h3><span class="pill">${roster.length?roster.length+' jugadores':'Próximamente'}</span></div>
 <div class="table-wrap"><table class="tp-roster"><thead><tr><th>#</th><th>Jugador</th><th>Posición</th><th>Generación</th><th>Estatura</th><th>Peso</th><th>Carrera</th></tr></thead><tbody>${Array.from({length:5},()=>'<tr>'+'<td>—</td>'.repeat(7)+'</tr>').join('')}</tbody></table></div>
 <p class="note">El roster de este equipo se publicará próximamente.</p></section>`;
 $('tp-back').onclick=()=>{try{history.pushState(null,'',location.pathname+location.search)}catch(e){location.hash=''}routeTeam()};
};
const renderBeforeTicker=render;
render=function(){renderBeforeTicker();buildTicker()};
buildTicker();
if(location.hash.startsWith('#equipo-'))routeTeam();
