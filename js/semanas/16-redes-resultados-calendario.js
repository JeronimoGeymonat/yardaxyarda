/* ===== Compartir en X e historia de Instagram: Resultados de la semana 7 y Calendario de la semana 8 (14 Grandes y Nacional) ===== */
(function(){if(typeof yxyRedes!=='function')return;
 const DIV={grandes:'14 Grandes',nacional:'Nacional'},TAG={grandes:'#14Grandes',nacional:'#ConferenciaNacional'};
 const wr=$('weekly-results'),cal=$('calendar');
 /* Resultados · Semana 7 */
 const barR=wr&&yxyRedes(wr,()=>{const dv=division,w=dv==='nacional'?nacWeek(7):teamSchedule.find(x=>x.w===7);
  const games=(w&&w.g||[]).map(g=>({l:g.l,v:g.v,pl:g.pl,pv:g.pv}));
  const cw=dv==='nacional'?w:calendarData.grandes.w7,bye=(cw&&!Array.isArray(cw)&&cw.bye)||'';
  const top=games.filter(g=>g.pl!=null).map(g=>g.pl>g.pv?`${g.l} ${g.pl}-${g.pv} ${g.v}`:`${g.v} ${g.pv}-${g.pl} ${g.l}`).slice(0,3).join(' · ');
  return {titulo:'Resultados · Semana 7',etiqueta:'ONEFA · Liga Mayor 2026 · '+DIV[dv],partidos:games,nota:bye?'Descansan: '+bye:'',
   texto:`🏈 Resultados de la semana 7 · ${DIV[dv]} (ONEFA): ${top}… Todos los marcadores aquí 👇 #ONEFA ${TAG[dv]}`,
   hash:'#semana-7/'+dv+'/resultados',pie:'Todos los resultados en yardaxyarda.com',archivo:'yardaxyarda-resultados-s7-'+dv}});
 /* Calendario · Semana 8 */
 const barC=cal&&yxyRedes(cal,()=>{const dv=division,wd=(calendarData[dv]||{}).w8||[],games=Array.isArray(wd)?wd:(wd.games||[]),bye=Array.isArray(wd)?'':(wd.bye||'');
  const partidos=games.map(g=>({l:g.local||'Por definir',v:g.visitante||'Por definir',info:[g.fecha,g.hora,g.estadio].filter(Boolean).join(' · ')}));
  return {titulo:'Calendario · Semana 8',etiqueta:'ONEFA · Liga Mayor 2026 · '+DIV[dv],partidos,nota:bye?'Descansan: '+bye:'',
   texto:`📅 Así se juega la semana 8 · ${DIV[dv]} (ONEFA). Fechas, horarios y estadios 👇 #ONEFA ${TAG[dv]}`,
   hash:'#semana-8/'+dv+'/calendario',pie:'Calendario completo en yardaxyarda.com',archivo:'yardaxyarda-calendario-s8-'+dv}});
 const prev=render;render=function(){prev();const wk=$('season').value;
  if(barR){barR.hidden=wk!=='w7';if(barR.parentNode!==wr)wr.appendChild(barR)}
  if(barC){barC.hidden=wk!=='w8';if(barC.parentNode!==cal)cal.appendChild(barC)}};
 render();
})();
