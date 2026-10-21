/* ===== PÁGINAS DE EQUIPO (solo 14 Grandes) ===== */
const teamSchedule=YXY.calendario.grandes;
/* ROSTER — llena cada equipo con objetos {num, nombre, pos, anio, estatura, peso, origen} */
/* FOTO DE EQUIPO — se muestra arriba del calendario */
const teamPhotos={"Borregos Puebla":"assets/images/96f2e1cf43.webp","Borregos CEM":"assets/images/5fe2398c67.webp","Borregos Monterrey":"assets/images/6ce2876538.webp"};
/* Fotos que se muestran completas (sin recorte) */
const teamPhotoFull={"Borregos CEM":true,"Borregos Puebla":true};
const teamPhotoCredit={"Borregos CEM":[["@borregoscem_","https://www.instagram.com/borregoscem_/"]],"Borregos Monterrey":[["@jorge_chaavez","https://www.instagram.com/jorge_chaavez/"],["@emparrilladomty","https://www.instagram.com/emparrilladomty/"]],"Borregos Puebla":[["@marialuisahp","https://www.instagram.com/marialuisahp/"],["@catorce28studio","https://www.instagram.com/catorce28studio/"]]};
const rosterData=YXY.rosters;
const statTeamMap={'Tec Pue':'Borregos Puebla','UNAM':'Pumas CU','Tec Mty':'Borregos Monterrey','Anahuac N':'Leones Anáhuac MEX','Burros Blancos':'Burros Blancos IPN','Tec Cem':'Borregos CEM','UDLAP':'Aztecas UDLAP','Anahuac C':'Leones Anáhuac Cancún','UANL':'Auténticos Tigres UANL','Tec Ccm':'Borregos CCM','Tec Gdl':'Borregos Guadalajara','Águilas IPN':'Águilas Blancas IPN','Cetys':'Zorros CETYS','UVM':'Linces UVM'};
const tileKey={'Borregos Guadalajara':'Borregos GDL','Borregos Monterrey':'Borregos MTY','Borregos Puebla':'Borregos PUE','Leones Anáhuac MEX':'Leones Anáhuac MX'};
function teamSlug(n){return n.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function teamBySlug(s){return standingsData.find(r=>teamSlug(r.team)===s)}
function teamLeaders(team){const out=[];divisionData.grandes.forEach(cat=>{const rs=[...cat.rows].sort((a,b)=>b.values[0]-a.values[0]);rs.forEach(r=>{if(statTeamMap[r.team]===team){const rank=rs.findIndex(x=>x.values[0]===r.values[0])+1;out.push({cat:cat.title,metric:cat.metrics[0],name:r.name,val:r.values[0],rank,total:rs.length,extra:cat.metrics.slice(1).map((m,i)=>m+': '+fmt(r.values[i+1])).join(' · ')})}})});return out}
function renderTeamPage(team){
 const stSrc=(typeof latestStandings!=='undefined')?latestStandings:standingsData,st=stSrc.find(r=>r.team===team),pos=st.pos??(stSrc.indexOf(st)+1),d=st.pf-st.pc;
 const tile=resultTiles[tileKey[team]||team];
 let nextMarked=false;
 const rows=teamSchedule.map(w=>{const g=w.g.find(x=>x.l===team||x.v===team);
  if(!g)return `<tr class="tp-bye"><td>Semana ${w.w}</td><td colspan="4">Descanso</td><td>—</td></tr>`;
  const home=g.l===team,opp=home?g.v:g.l,oppRow=standingsData.find(r=>r.team===opp);
  let res='<span class="tp-res p">Por jugar</span>',cls='';
  if(g.pl!==null&&g.pv!==null){const my=home?g.pl:g.pv,their=home?g.pv:g.pl;res=`<span class="tp-res ${my>their?'w':'l'}">${my>their?'G':'P'}</span>${my}-${their}`}
  else if(g.rp){res='<span class="tp-res p">Por jugar</span>'}else if(w.w<=5){res='<span class="tp-res p">Pospuesto</span>'}
  else if(!nextMarked){nextMarked=true;cls=' class="tp-next"'}
  return `<tr${cls}><td>Semana ${w.w}</td><td>${esc(g.f)}${g.rp?'<br><span class="tp-ha">Reprogramado</span>':''}</td><td>${esc(g.h||'Por definir')}</td><td><div class="tp-opp"><span class="tp-ha">${home?'vs':'@'}</span>${oppRow?`<img src="${oppRow.logo}" alt="">`:''}<a class="team-link" href="#equipo-${teamSlug(opp)}">${esc(opp)}</a></div></td><td>${esc(g.s)}${home?' · Local':' · Visita'}</td><td>${res}</td></tr>`}).join('');
 const leaders=teamLeaders(team);
 const roster=rosterData[team]||[];
 $('team-page').innerHTML=`<button type="button" class="tp-back" id="tp-back">‹ Volver</button>
 <div class="tp-hero">${tile?`<img class="tp-tile" src="${tile}" alt="">`:''}<div><div class="tp-eyebrow">ONEFA / 14 Grandes / Equipo</div><h1 class="tp-name">${esc(team)}</h1>
 <div class="tp-chips"><div class="tp-chip"><span>Récord</span><b>${st.w}-${st.l}</b></div><div class="tp-chip"><span>Posición</span><b>${pos}º</b></div><div class="tp-chip"><span>P.A.</span><b>${st.pf}</b></div><div class="tp-chip"><span>P.C.</span><b>${st.pc}</b></div><div class="tp-chip"><span>DIF</span><b class="${d<0?'neg':''}">${d>0?'+':''}${d}</b></div></div></div></div>
 ${teamPhotos[team]?`<figure class="tp-photo${teamPhotoFull[team]?' full':''}"><img src="${teamPhotos[team]}" alt="${esc(team)}">${teamPhotoCredit[team]?`<figcaption class="tp-credit">📸 ${teamPhotoCredit[team].map(c=>`<a href="${c[1]}" target="_blank" rel="noopener">${esc(c[0])}</a>`).join(' · ')}</figcaption>`:''}</figure>`:''}<section class="tp-section"><div class="section-title"><h3>Calendario · Semanas 1–10</h3><span class="pill">Liga Mayor 2026</span></div>
 <div class="table-wrap"><table class="tp-sched"><thead><tr><th>Semana</th><th>Fecha</th><th>Hora</th><th>Rival</th><th>Estadio</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table></div>
 <p class="note">vs = local · @ = visitante. Horarios sujetos a cambios por parte de ONEFA.</p></section>
 ${typeof teamOffDef==='function'?teamOffDef(team):''}<section class="tp-section"><div class="section-title"><h3>Líderes en stats</h3><span class="pill">Datos más recientes</span></div>
 ${leaders.length?`<div class="tp-leaders">${leaders.map(l=>`<div class="tp-leader"><div class="cat">${esc(l.cat)} · ${esc(l.metric)}</div><div class="pl">${esc(l.name)}</div><div class="val">${fmt(l.val)}</div>${l.extra?`<div class="sub">${esc(l.extra)}</div>`:''}<div class="rk">#${l.rank} de la conferencia${l.week?' · Semana '+l.week:''}</div></div>`).join('')}</div>`:'<div class="tp-empty">Ningún jugador de este equipo aparece en los rankings de líderes más recientes.</div>'}</section>
 <section class="tp-section"><div class="section-title"><h3>Roster</h3><span class="pill">${roster.length?roster.length+' jugadores':'Próximamente'}</span></div>
 <div class="table-wrap">${(()=>{const cols=[['num','#'],['nombre','Jugador'],['pos','Posición'],['gen','Generación'],['anio','Año'],['estatura','Estatura'],['peso','Peso'],['carrera','Carrera'],['origen','Origen']];const use=roster.length?cols.filter(([k])=>roster.some(p=>p[k])):cols.filter(([k])=>!['anio','origen'].includes(k));return `<table class="tp-roster${roster.length?' filled':''}"><thead><tr>${use.map(c=>`<th>${c[1]}</th>`).join('')}</tr></thead><tbody>`+(roster.length?roster.map(p=>`<tr>${use.map(([k])=>k==='nombre'?`<td><b>${esc(p[k])}</b></td>`:`<td>${esc(p[k]??'')}</td>`).join('')}</tr>`).join(''):Array.from({length:5},()=>'<tr>'+use.map(()=>'<td>—</td>').join('')+'</tr>').join(''))+'</tbody></table>'})()}</div>
 ${roster.length?'':'<p class="note">El roster de este equipo se publicará próximamente.</p>'}</section>`;
 $('tp-back').onclick=()=>{try{history.pushState(null,'',location.pathname+location.search)}catch(e){location.hash=''}routeTeam()};
}
let currentTeam=null;
function routeTeam(){const m=location.hash.match(/^#equipo-(.+)$/),r=m&&teamBySlug(decodeURIComponent(m[1]));
 const hero=document.querySelector('.hero'),main=document.querySelector('main');
 if(r){if(division!=='grandes'){division='grandes';document.querySelectorAll('[data-division]').forEach(x=>{x.classList.toggle('active',x.dataset.division==='grandes');x.setAttribute('aria-pressed',x.dataset.division==='grandes')});setup()}
  currentTeam=r.team;renderTeamPage(r.team);$('team-page').hidden=false;hero.style.display='none';main.style.display='none';
  document.querySelectorAll('.spot-video').forEach(v=>{try{v.pause()}catch(e){}});
  window.scrollTo({top:Math.max(0,$('team-page').getBoundingClientRect().top+window.scrollY-10)});
 }else{currentTeam=null;$('team-page').hidden=true;$('team-page').innerHTML='';hero.style.display='';main.style.display='';render()}}
window.addEventListener('hashchange',routeTeam);
document.querySelectorAll('[data-division]').forEach(b=>b.addEventListener('click',()=>{if(currentTeam){history.replaceState(null,'',location.pathname+location.search);routeTeam()}}));
/* tira de récords: cada equipo enlaza a su página */
(function(){const tr=$('ticker-track');tr.innerHTML=standingsData.map(r=>`<a class="ticker-item" href="#equipo-${teamSlug(r.team)}"><span class="ticker-team">${esc(r.team)}</span><span class="ticker-rec">${r.w}-${r.l}</span></a>`).join('')})();
render();routeTeam();
