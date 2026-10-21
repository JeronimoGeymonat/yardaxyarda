/* ===== Conferencia Nacional: calendario completo (Semanas 0–9, fuente: nacional_calendario.xlsx) ===== */
const nacSchedule=YXY.calendario.nacional;
function nacWeek(n){return nacSchedule.find(w=>w.w===n)}
function nacMatch(g,label){const nr=g.pl===null||g.pv===null,p=v=>String(v).padStart(2,'0'),wl=nr?'':(g.pl>g.pv?'win':'loss'),wv=nr?'':(g.pv>g.pl?'win':'loss');
 return `<article class="match"><div class="match-head"><span>${label}</span><span>${nr?'Sin marcador':'Final'}</span></div><div class="match-body"><img class="match-logo nac ${wl}" src="${logoFor(g.l)}" alt="${esc(g.l)}" title="${esc(g.l)}"><span class="match-score ${nr?'nr':wl}">${nr?'—':p(g.pl)}</span><span class="match-sep" aria-hidden="true">–</span><span class="match-score ${nr?'nr':wv}">${nr?'—':p(g.pv)}</span><img class="match-logo nac ${wv}" src="${logoFor(g.v)}" alt="${esc(g.v)}" title="${esc(g.v)}"></div></article>`}
/* calendario de semanas restantes (7–9) en la vista Calendario */
[7,8,9].forEach(n=>{const w=nacWeek(n);calendarData.nacional['w'+n]={games:w.g.map(g=>({local:g.l,visitante:g.v,fecha:g.f,hora:g.h,estadio:g.s,localLogo:logoFor(g.l),visitanteLogo:logoFor(g.v)})),bye:w.bye}});
/* resultados de la semana (Nacional, semanas 1–6) */
const renderBeforeNacRes=render;
render=function(){renderBeforeNacRes();
 if(division!=='nacional')return;
 const wk=$('season').value,n=+wk.slice(1),w=nacWeek(n);if(!w||n<1||n>6)return;
 const past=n<=2,show=past||tab==='overview'||(tab==='teams'&&!(n===6&&teamSub==='insights')),wr=$('weekly-results'),w5=$('wr-w5'),pa=$('wr-past');
 if(past){const layout=document.querySelector('.layout');layout.style.display='none';document.querySelector('.tabs').style.display='none';
  document.querySelector('.filters').style.display='';['group','category','search'].forEach(id=>$(id).style.display='none');
  $('calendar').hidden=true;$('st4').hidden=true;
  if(wr.parentNode===layout.firstElementChild)w4Nodes.parent.insertBefore(wr,w4Nodes.anchor);
  $('heading').textContent='Resultados · Semana '+n;$('source-note').textContent='Resultados oficiales · Liga Mayor 2026 · Conferencia Nacional';
  $('league').textContent='ONEFA / NACIONAL / Semana '+n;$('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · Resultados de la semana '+n+'.';}
 wr.hidden=!show;if(!show)return;
 if(tab==='teams'){const st=[$('standings'),$('st4')].find(x=>x&&!x.hidden&&x.offsetParent);if(st&&st.parentNode===wr.parentNode&&(st.compareDocumentPosition(wr)&Node.DOCUMENT_POSITION_PRECEDING))st.after(wr)}
 w5.style.display='none';pa.style.display='';
 $('weekly-results-title').textContent=past?'RESULTADOS · SEMANA '+n:'RESULTADOS DE LA SEMANA';$('wr-pill').textContent='NACIONAL · Semana '+n;
 pa.innerHTML=w.g.map((g,i)=>nacMatch(g,'Juego '+(i+1))).join('');
 const w0=n===1?nacWeek(0):null;
 $('wr-note').innerHTML=(w.bye?`<span class="bye">Descansan: <b>${esc(w.bye)}</b></span>`:'')+(w.g.some(g=>g.pl===null)?'<br><span class="bye">Juego sin marcador registrado en el calendario oficial.</span>':'')+(w0?`<div class="wr-wk0"><div class="section-title"><h3>Semana 0</h3></div><div class="matches">${w0.g.map(g=>nacMatch(g,'Juego 1 · Semana 0')).join('')}</div></div>`:'');
};
/* página de equipo: calendario Semanas 0–9 con resultados */
const _renderTeamPageNacCal=renderTeamPage;
renderTeamPage=function(team){_renderTeamPageNacCal(team);if(!isNacTeam(team))return;
 const sec=[...$('team-page').querySelectorAll('.tp-section')].find(s=>s.querySelector('.tp-sched'));if(!sec)return;
 let nextMarked=false;
 const rows=nacSchedule.filter(w=>w.w>0||w.g.some(x=>x.l===team||x.v===team)).map(w=>{const g=w.g.find(x=>x.l===team||x.v===team);
  if(!g){const f=w.ff===team;return `<tr class="tp-bye"><td>Semana ${w.w}</td><td colspan="4">Descanso${f?'<span class="tp-ff">· victoria por forfeit</span>':''}</td><td>${f?'<span class="tp-res w">G</span>Forfeit':'—'}</td></tr>`}
  const home=g.l===team,opp=home?g.v:g.l;let res,cls='';
  if(g.pl!==null&&g.pv!==null){const my=home?g.pl:g.pv,th=home?g.pv:g.pl;res=`<span class="tp-res ${my>th?'w':'l'}">${my>th?'G':'P'}</span>${my}-${th}`}
  else if(g.nr)res='<span class="tp-res p">Sin marcador</span>';
  else{res='<span class="tp-res p">Por jugar</span>';if(!nextMarked){nextMarked=true;cls=' class="tp-next"'}}
  return `<tr${cls}><td>Semana ${w.w}</td><td>${esc(g.f)}</td><td>${esc(g.h)}</td><td><div class="tp-opp"><span class="tp-ha">${home?'vs':'@'}</span><img src="${logoFor(opp)}" alt=""><a class="team-link" href="#equipo-${teamSlug(opp)}">${esc(opp)}</a></div></td><td>${esc(g.s)}${home?' · Local':' · Visita'}</td><td>${res}</td></tr>`}).join('')
  +'<tr class="tp-bye"><td>Semana 10</td><td colspan="4">Por confirmar</td><td>—</td></tr>';
 sec.querySelector('tbody').innerHTML=rows;
 sec.querySelector('h3').textContent='Calendario · Semanas '+(nacWeek(0).g.some(x=>x.l===team||x.v===team)?'0':'1')+'–10';
 sec.querySelector('.note').textContent='vs = local · @ = visitante. Horarios sujetos a cambios por parte de ONEFA.';
};
render();
if(location.hash.startsWith('#equipo-'))routeTeam();
$('group').onchange=()=>render();$('search').oninput=()=>render();
