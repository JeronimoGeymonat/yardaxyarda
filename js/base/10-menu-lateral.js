/* ===== Menú lateral Yarda × Yarda ===== */
(function(){
const nav=$('yxy-nav'),scrim=$('yxy-scrim'),openBtn=$('yxy-open'),q=$('yxy-q'),res=$('yxy-results'),teamsBox=$('yxy-teams');
let lastFocus=null;
function openNav(){lastFocus=document.activeElement;scrim.hidden=false;requestAnimationFrame(()=>{scrim.classList.add('on');nav.classList.add('open')});nav.removeAttribute('inert');nav.setAttribute('aria-hidden','false');openBtn.setAttribute('aria-expanded','true');document.body.classList.add('yxy-lock');sync();setTimeout(()=>$('yxy-close').focus(),60)}
function closeNav(){nav.classList.remove('open');scrim.classList.remove('on');nav.setAttribute('inert','');nav.setAttribute('aria-hidden','true');openBtn.setAttribute('aria-expanded','false');document.body.classList.remove('yxy-lock');setTimeout(()=>{scrim.hidden=true},220);if(lastFocus&&lastFocus.focus)lastFocus.focus()}
openBtn.onclick=openNav;$('yxy-close').onclick=closeNav;scrim.onclick=closeNav;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))closeNav()});
const latest=()=>typeof LATEST_WEEK!=='undefined'?LATEST_WEEK:'w6';
const nextCal=()=>{const n=+latest().slice(1)+1;return [...$('season').options].some(o=>o.value==='w'+n)?'w'+n:latest()};
function leaveTeamPage(){if(location.hash.startsWith('#equipo-')){history.pushState(null,'',location.pathname+location.search);routeTeam()}}
function setConf(c){if(division!==c){const b=document.querySelector('[data-division="'+c+'"]');if(b)b.click()}}
function setWeek(w){if($('season').value!==w){$('season').value=w;render()}}
function setTab(tb){const b=document.querySelector('[data-tab="'+tb+'"]');if(b&&tab!==tb)b.click();else render()}
function goTo(el){if(!el)return;const y=el.getBoundingClientRect().top+scrollY-12;scrollTo({top:Math.max(0,y),behavior:'smooth'})}
function current(){if(location.hash.startsWith('#equipo-'))return 'equipos';const w=$('season').value;if(['w7','w8','w9','w10'].includes(w))return 'calendario';if(tab==='teams')return 'tabla';if(tab==='players')return 'lideres';return 'inicio'}
function sync(){document.querySelectorAll('.yxy-conf [data-conf]').forEach(b=>b.classList.toggle('on',b.dataset.conf===division));
 const cur=current();document.querySelectorAll('.yxy-sec [data-nav]').forEach(b=>b.classList.toggle('on',b.dataset.nav===cur));
 $('yxy-week').textContent='SEMANA '+$('season').value.slice(1);if(!teamsBox.hidden)fillTeams()}
const actions={
 inicio(){leaveTeamPage();setWeek(latest());setTab('overview');scrollTo({top:0,behavior:'smooth'})},
 calendario(){leaveTeamPage();setWeek(nextCal());render();goTo($('calendar').hidden?$('heading'):$('calendar'))},
 lideres(){leaveTeamPage();setWeek(latest());setTab('players');goTo($('heading'))},
 resultados(){leaveTeamPage();setWeek(latest());setTab('overview');setTimeout(()=>{const wr=$('weekly-results');goTo(wr&&!wr.hidden&&wr.offsetParent?wr:$('heading'))},80)},
 tabla(){leaveTeamPage();setWeek(latest());setTab('teams');if(typeof teamSub!=='undefined'&&teamSub!=='tabla'){const s=document.querySelector('#team-subnav [data-sub="tabla"]');if(s)s.click()}goTo($('heading'))}
};
function confTeams(c){return c==='nacional'?latestStandingsN.map(g=>({group:g.name,rows:g.rows})):[{group:'14 Grandes',rows:latestStandings}]}
function fillTeams(){teamsBox.innerHTML=confTeams(division).map(g=>(division==='nacional'?`<h5>${esc(g.group)}</h5>`:'')+g.rows.map(r=>`<a href="#equipo-${teamSlug(r.team)}" data-team><img src="${logoFor(r.team)}" alt=""><b>${esc(r.team)}</b><span>${r.w}-${r.l}</span></a>`).join('')).join('')}
document.querySelectorAll('.yxy-sec [data-nav],.yxy-nav-brand').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const k=b.dataset.nav;
 if(k==='equipos'){const open=teamsBox.hidden;teamsBox.hidden=!open;b.setAttribute('aria-expanded',open);if(open)fillTeams();return}
 closeNav();setTimeout(()=>actions[k](),60)}));
teamsBox.addEventListener('click',e=>{if(e.target.closest('[data-team]'))closeNav()});
document.querySelectorAll('.yxy-conf [data-conf]').forEach(b=>b.onclick=()=>{leaveTeamPage();setConf(b.dataset.conf);sync()});
/* búsqueda: equipos, jugadores (líderes) y partidos */
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function allTeams(){return [...latestStandings.map(r=>({team:r.team,conf:'grandes'})),...latestStandingsN.flatMap(g=>g.rows.map(r=>({team:r.team,conf:'nacional'})))]}
function allPlayers(){const out=new Map();[[divisionData6,6],[divisionData,5],[divisionData4,4],[divisionData3,3]].forEach(([d,wk])=>['grandes','nacional'].forEach(c=>(d[c]||[]).forEach(cat=>cat.rows.forEach(r=>{const k=r.name+'|'+r.team;if(!out.has(k)){const full=(c==='nacional'?statTeamMapN:statTeamMap)[r.team]||null;out.set(k,{name:r.name,abbr:r.team,team:full,conf:c,cat:cat.title,wk})}}))));return [...out.values()]}
function allGames(){const g=[];teamSchedule.forEach(w=>w.g.forEach(x=>g.push({w:w.w,l:x.l,v:x.v,f:x.f,pl:x.pl,pv:x.pv})));if(typeof nacSchedule!=='undefined')nacSchedule.forEach(w=>w.g.forEach(x=>g.push({w:w.w,l:x.l,v:x.v,f:x.f,pl:x.pl,pv:x.pv})));return g}
let P=null;
q.addEventListener('input',()=>{const s=norm(q.value.trim());if(s.length<2){res.hidden=true;res.innerHTML='';return}
 P=P||allPlayers();
 const teams=allTeams().filter(x=>norm(x.team).includes(s)).slice(0,6);
 const players=P.filter(x=>norm(x.name).includes(s)).slice(0,6);
 const games=allGames().filter(x=>norm(x.l+' '+x.v).includes(s)||s.split(/\s+/).filter(w=>w&&!['vs','v','contra','-'].includes(w)).every(w=>norm(x.l+' '+x.v).includes(w))).slice(0,5);
 const it=[];
 teams.forEach(x=>it.push(`<button type="button" data-go="team" data-team="${esc(x.team)}"><img src="${logoFor(x.team)}" alt=""><span>${esc(x.team)}<small>Equipo · ${x.conf==='nacional'?'Nacional':'14 Grandes'}</small></span></button>`));
 players.forEach(x=>it.push(`<button type="button" data-go="player" data-team="${esc(x.team||'')}" data-conf="${x.conf}"><img src="${x.team?logoFor(x.team):''}" alt=""><span>${esc(x.name)}<small>${esc(x.team||x.abbr)} · ${esc(x.cat)} · Semana ${x.wk}</small></span></button>`));
 games.forEach(x=>it.push(`<button type="button" data-go="team" data-team="${esc(x.l)}"><img src="${logoFor(x.l)}" alt=""><span>${esc(x.l)} vs ${esc(x.v)}<small>Semana ${x.w} · ${esc(x.f)}${x.pl!=null&&x.pv!=null?' · '+x.pl+'-'+x.pv:''}</small></span></button>`));
 res.innerHTML=it.length?it.join(''):'<div class="none">Sin resultados para “'+esc(q.value)+'”.</div>';res.hidden=false});
q.addEventListener('keydown',e=>{if(e.key==='Enter'){const f=res.querySelector('button');if(f)f.click()}});
res.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;closeNav();q.value='';res.hidden=true;
 if(b.dataset.team){setTimeout(()=>{location.hash='#equipo-'+teamSlug(b.dataset.team)},60)}
 else{setTimeout(()=>{leaveTeamPage();setConf(b.dataset.conf);setWeek(latest());setTab('players');goTo($('heading'))},60)}});
const renderBeforeNav=render;render=function(){renderBeforeNav();if(nav.classList.contains('open'))sync()};
window.addEventListener('hashchange',()=>{if(nav.classList.contains('open'))sync()});
})();
