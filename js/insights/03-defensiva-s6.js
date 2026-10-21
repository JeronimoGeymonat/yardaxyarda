/* ===== DEFENSIVA POR EQUIPO · 14 Grandes · Semana 6 (fuente: statistics-football.com) ===== */
const defense6=YXY.semana6.defensiva.grandes;
const defCols=[['Pass Yds','Yardas por aire permitidas'],['Rush Yds','Yardas por tierra permitidas'],['Total Yds','Yardas totales permitidas'],['1st &amp; 10','Primeros downs permitidos'],['Pts','Puntos permitidos'],['INT','Intercepciones'],['FUM','Balones sueltos recuperados'],['Castigos','Castigos']];
let defSort=2,defAsc=true;
function renderDefense(){const rs=[...(division==='nacional'?defense6N:defense6)].sort((a,b)=>(a.v[defSort]-b.v[defSort])*(defAsc?1:-1));
 $('def6-table').innerHTML=`<table class="standings-table off-table"><thead><tr><th>#</th><th>EQUIPO</th>${defCols.map((c,i)=>`<th title="${c[1]}"><button data-dsort="${i}">${c[0].toUpperCase()} ${defSort===i?(defAsc?'↑':'↓'):'↕'}</button></th>`).join('')}</tr></thead><tbody>${rs.map((r,i)=>`<tr><td class="st-pos">${i+1}</td><td><div class="st-team"><img src="${logoFor(r.team)}" alt="" loading="lazy">${`<a class="team-link" href="#equipo-${teamSlug(r.team)}">${esc(r.team)}</a>`}</div></td>${r.v.map((x,k)=>`<td class="${k===defSort?'st-strong':''}">${fmt(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
 $('def6-table').querySelectorAll('[data-dsort]').forEach(b=>b.onclick=()=>{const n=+b.dataset.dsort;defAsc=defSort===n?!defAsc:(n<5);defSort=n;renderDefense()});}
/* ===== Pestaña INSIGHTS en Team Stats · Semana 6 ===== */
const renderBeforeIns6=render;
render=function(){renderBeforeIns6();
 const w6=tab==='teams'&&$('season').value==='w6';
 if(!w6){$('defense6').hidden=true;return}
 $('team-subnav').hidden=false;
 const ins=teamSub==='insights';
 $('standings').hidden=ins;$('insights').hidden=true;
 $('offense6').hidden=!ins;$('defense6').hidden=!ins;
 if(ins){renderOffense();renderDefense();$('heading').textContent='Estadísticas por equipo · Insights'}
 else $('heading').textContent='Estadísticas por equipo · Tabla general';
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
