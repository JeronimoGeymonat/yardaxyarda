/* ===== Estadísticas ofensivas y defensivas en la página de cada equipo ===== */
function teamOffDef(team){
 const o=offense6.find(r=>r.team===team),d=defense6.find(r=>r.team===team);if(!o&&!d)return '';
 const rank=(arr,idx,row,hb)=>{const v=row.v[idx];return 1+arr.filter(r=>hb?r.v[idx]>v:r.v[idx]<v).length+arr.slice(0,arr.indexOf(row)).filter(r=>r.v[idx]===v).length};
 const n=offense6.length;
 const offDef=[['Yds por aire',0,true],['Yds por tierra',1,true],['Yds totales',2,true],['Primeros downs',3,true],['Puntos anotados',4,true],['Intercepciones',5,false],['Balones sueltos',6,false],['Castigos',7,false]];
 const defDef=[['Yds por aire permitidas',0,false],['Yds por tierra permitidas',1,false],['Yds totales permitidas',2,false],['Primeros downs permitidos',3,false],['Puntos permitidos',4,false],['Intercepciones',5,true],['Balones recuperados',6,true],['Castigos',7,false]];
 const tiles=(row,arr,defs)=>defs.map(([lbl,i,hb])=>{const r=rank(arr,i,row,hb);return `<div class="tp-stat${r<=3?' best':''}"><span>${lbl}</span><b>${fmt(row.v[i])}</b><em>#${r} de ${n}</em></div>`}).join('');
 return `<section class="tp-section"><div class="section-title"><h3>Estadísticas ofensivas</h3><span class="pill">Acumulado · Semana 6</span></div>${o?`<div class="tp-stats">${tiles(o,offense6,offDef)}</div>`:'<div class="tp-empty">Sin datos.</div>'}</section>
 <section class="tp-section"><div class="section-title"><h3>Estadísticas defensivas</h3><span class="pill">Acumulado · Semana 6</span></div>${d?`<div class="tp-stats">${tiles(d,defense6,defDef)}</div>`:'<div class="tp-empty">Sin datos.</div>'}<p class="note">El ranking (#) compara al equipo con los 14 de la conferencia; en defensiva, menos yardas y puntos permitidos es mejor.</p></section>`;
}
if(location.hash.startsWith('#equipo-'))routeTeam();
