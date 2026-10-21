(function(){
const defense7Data=window.defense7Data=YXY.semana7.defensiva;
const cols=['Equipo','Pass Yds','Rush Yds','Total Yds','1st 10','Score','Int','Fumble','Flags'];
let sortCol=3,sortAsc=true;
const section=document.getElementById('yxy-defense7');

function defLogo(team){
 let logo=logoFor(team);
 if(logo)return logo;
 const norm=x=>String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const aliases={
  'borregosmty':'Borregos Monterrey','borregospue':'Borregos Puebla',
  'borregosgdl':'Borregos Guadalajara','borregoscem':'Borregos CEM',
  'borregosccm':'Borregos CCM','autenticostigres':'Auténticos Tigres UANL',
  'aguilasblancas':'Águilas Blancas IPN','pumas':'Pumas CU',
  'burrosblancos':'Burros Blancos IPN','aztecas':'Aztecas UDLAP',
  'linces':'Linces UVM','leonescan':'Leones Anáhuac Cancún',
  'leones':'Leones Anáhuac México','zorros':'Zorros CETYS'
 };
 const key=norm(team);
 if(aliases[key])logo=logoFor(aliases[key]);
 if(logo)return logo;
 const all=[...standingsData,...standingsNacional.flatMap(g=>g.rows)];
 const found=all.find(r=>norm(r.team)===key || norm(r.team).startsWith(key) || key.startsWith(norm(r.team)));
 return found?found.logo:'';
}
function draw(){
 const data=[...(defense7Data[division]||[])].sort((a,b)=>{
  const av=sortCol===0?a.team:a.v[sortCol-1],bv=sortCol===0?b.team:b.v[sortCol-1];
  return (typeof av==='string'?av.localeCompare(bv,'es'):av-bv)*(sortAsc?1:-1);
 });
 section.querySelector('h3').textContent='Defensiva por equipo · '+(division==='nacional'?'Nacional':'14 Grandes');
 const def7cols=[['Pass Yds','Yardas por aire permitidas'],['Rush Yds','Yardas por tierra permitidas'],['Total Yds','Yardas totales permitidas'],['1st &amp; 10','Primeros downs permitidos'],['Pts','Puntos permitidos'],['INT','Intercepciones'],['FUM','Balones sueltos recuperados'],['Castigos','Castigos']];
 section.querySelector('#yxy-def7-table').innerHTML=`<table class="standings-table off-table" aria-label="Defensiva por equipo, semana 7"><thead><tr><th>#</th><th>EQUIPO</th>${def7cols.map((c,i)=>`<th title="${c[1]}"><button data-def7sort="${i+1}">${c[0].toUpperCase()} ${sortCol===i+1?(sortAsc?'↑':'↓'):'↕'}</button></th>`).join('')}</tr></thead><tbody>${data.map((r,i)=>`<tr><td class="st-pos">${i+1}</td><td><div class="st-team">${defLogo(r.team)?`<img src="${defLogo(r.team)}" alt="" loading="lazy">`:''}<a class="team-link" href="#equipo-${teamSlug(r.team)}">${esc(r.team)}</a></div></td>${r.v.map((v,k)=>`<td class="${sortCol===k+1?'st-strong':''}">${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
 section.querySelectorAll('[data-def7sort]').forEach(b=>b.onclick=()=>{const c=+b.dataset.def7sort;sortAsc=c===sortCol?!sortAsc:true;sortCol=c;draw()});
}
const prevRender=render;
render=function(){
 prevRender();
 const isW7=$('season').value==='w7'&&tab==='teams'&&!currentTeam;
 section.hidden=!(isW7&&teamSub==='insights');
 if(!isW7)return;
 $('team-subnav').hidden=false;
 const ins=teamSub==='insights';
 $('st4').hidden=ins;
 $('weekly-results').hidden=ins;
 $('heading').textContent=ins?'Estadísticas por equipo · Insights · Semana 7':'Estadísticas por equipo · Tabla general';
 if(ins)draw();
};
render();
})();
