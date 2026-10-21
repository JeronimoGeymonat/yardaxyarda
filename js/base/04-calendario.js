/* CALENDARIO — llena cada semana con objetos {local, visitante, fecha, hora, estadio}. Logos opcionales: localLogo / visitanteLogo (url o data URI). */
const calendarData={
 grandes:YXY.calendario.proximas.grandes,
 nacional:{w6:[],w7:[],w8:[],w9:[],w10:[]}
};
const GAMES_PER_WEEK={grandes:7,nacional:7};
function teamLogo(n){const r=(typeof standingsData!=='undefined'?standingsData:[]).find(s=>s.team===n);return r?r.logo:''}
function slot(name,logo,role){logo=logo||teamLogo(name);return name?`<div class="match-team">${logo?`<img src="${logo}" alt="">`:''}<span class="mt-name">${esc(name)}</span><span class="mt-role">${role}</span></div>`:'<div class="match-slot">Por definir</div>'}
function renderCalendar(wk){const n=wk.slice(1),wd=(calendarData[division]||{})[wk]||[],games=Array.isArray(wd)?wd:wd.games,bye=Array.isArray(wd)?'':wd.bye,div=division==='nacional'?'NACIONAL':'14 GRANDES';
 const list=games.length?games:Array.from({length:GAMES_PER_WEEK[division]||7},()=>({}));
 $('calendar-title').textContent='JUEGOS DE LA SEMANA';$('calendar-pill').textContent=div+' · Semana '+n;
 $('calendar-games').innerHTML=list.map((g,i)=>`<article class="match"><div class="match-head"><span>Juego ${i+1}${g.tag?' · '+esc(g.tag):''}</span><span class="${g.fecha?'':'pending'}">${g.fecha?esc(g.fecha):'Por confirmar'}</span></div><div class="match-body">${slot(g.local,g.localLogo,'Local')}<span class="match-vs">VS</span>${slot(g.visitante,g.visitanteLogo,'Visita')}</div><div class="match-foot"><span>Hora: <b>${esc(g.hora||'—')}</b></span><span>Estadio: <b>${esc(g.estadio||'—')}</b></span></div></article>`).join('');
 $('calendar-note').innerHTML=games.length?(bye?`<span class="bye">Descansan: <b>${esc(bye)}</b></span>`:'')+'Horarios sujetos a cambios por parte de ONEFA.':'El calendario de la semana '+n+' se publicará próximamente.';
}
const renderBeforeCalendar=render;
render=function(){
 renderBeforeCalendar();
 const wk=$('season').value,cal=['w7','w8','w9','w10'].includes(wk);
 $('calendar').hidden=!cal;document.querySelector('.layout').style.display=cal?'none':'';document.querySelector('.tabs').style.display=cal?'none':'';
 if(cal)$('weekly-results').hidden=true;
 const f=document.querySelector('.filters');if(cal)f.style.display='';['group','category','search'].forEach(id=>$(id).style.display=cal?'none':'');
 if(cal){const n=wk.slice(1);$('heading').textContent='Calendario · Semana '+n;$('source-note').textContent='Calendario de juegos · Liga Mayor 2026';$('league').textContent='ONEFA / '+(division==='nacional'?'NACIONAL':'14 GRANDES')+' / Semana '+n;renderCalendar(wk)}
};
$('season').onchange=()=>render();
render();
