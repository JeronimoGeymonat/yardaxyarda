/* ===== OFENSIVA POR EQUIPO · 14 Grandes · Semana 6 (fuente: statistics-football.com) ===== */
const offense6=YXY.semana6.ofensiva.grandes;
const offCols=[['Pass Yds','Yardas por aire'],['Rush Yds','Yardas por tierra'],['Total Yds','Yardas totales'],['1st &amp; 10','Primeros downs'],['Pts','Puntos anotados'],['INT','Intercepciones'],['FUM','Balones sueltos'],['Castigos','Castigos']];
let offSort=2,offAsc=false;
function renderOffense(){const w7o=$('season').value==='w7'&&typeof offense7!=='undefined',rs=[...(division==='nacional'?(w7o?offense7N:offense6N):(w7o?offense7:offense6))].sort((a,b)=>(a.v[offSort]-b.v[offSort])*(offAsc?1:-1));
 $('off6-table').innerHTML=`<table class="standings-table off-table"><thead><tr><th>#</th><th>EQUIPO</th>${offCols.map((c,i)=>`<th title="${c[1]}"><button data-osort="${i}">${c[0].toUpperCase()} ${offSort===i?(offAsc?'↑':'↓'):'↕'}</button></th>`).join('')}</tr></thead><tbody>${rs.map((r,i)=>`<tr><td class="st-pos">${i+1}</td><td><div class="st-team"><img src="${logoFor(r.team)}" alt="" loading="lazy">${`<a class="team-link" href="#equipo-${teamSlug(r.team)}">${esc(r.team)}</a>`}</div></td>${r.v.map((x,k)=>`<td class="${k===offSort?'st-strong':''}">${fmt(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
 $('off6-table').querySelectorAll('[data-osort]').forEach(b=>b.onclick=()=>{const n=+b.dataset.osort;offAsc=offSort===n?!offAsc:false;offSort=n;renderOffense()});}
const renderBeforeOff=render;
render=function(){renderBeforeOff();const on=tab==='teams'&&division==='grandes'&&$('season').value==='w6';$('offense6').hidden=!on;if(on)renderOffense()};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
