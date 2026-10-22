/* ===== Top 5 de cada posición (semanas 4, 5, 6 y 7 · 14 Grandes y Nacional): Post en X e historia de Instagram con la tabla ===== */
(function(){if(typeof yxyRedes!=='function')return;
 const SEMANAS=['w4','w5','w6','w7'],DIV={grandes:'14 Grandes',nacional:'Nacional'},TAG={grandes:'#14Grandes',nacional:'#ConferenciaNacional'};
 const SLUG={'Top QBs':'top-qbs','Top RBs':'top-rbs','Top WRs':'top-wrs','Lider Tackleador':'tackleador','Lider Yds Mezcladas':'yds-mezcladas'};
 const NOMBRE={'Lider Tackleador':'Líderes en tackles','Lider Yds Mezcladas':'Líderes en yardas mezcladas'};
 function filas(card){
  const out=[],sp=card.querySelector('.spotlight');
  const leer=(el,rank)=>{const t=[...el.querySelectorAll('.person .team')].map(x=>x.textContent.trim());return {rank,name:el.querySelector('.name')?.textContent.trim()||'',team:t[0]||'',extra:t.slice(1).join(' · '),value:el.querySelector('.value')?.textContent.trim()||''}};
  if(sp)out.push(leer(sp,1));
  card.querySelectorAll('.rank-row').forEach(r=>out.push(leer(r,+(r.querySelector('.rank')?.textContent)||out.length+1)));
  return out.slice(0,5);
 }
 function add(){
  const wk=$('season').value,on=SEMANAS.includes(wk)&&(tab==='overview'||tab==='players')&&!currentTeam;
  document.querySelectorAll('#cards .card').forEach(card=>{
   const ttl=card.querySelector('.card-title h3')?.textContent.trim(),slug=SLUG[ttl];if(!slug)return;
   let bar=card.querySelector(':scope .yxy-redes');
   if(!bar&&on){const host=card.querySelector('.card-content')||card;
    bar=yxyRedes(host,()=>{const w=$('season').value,n=w.slice(1),dv=division,f=filas(card),metric=card.querySelector('.card-title .stat-unit')?.textContent.trim()||'';
     const nombre=NOMBRE[ttl]||ttl;
     const foto=card.querySelector('.card-photo img')?.getAttribute('src')||'';
     return {compacto:true,titulo:ttl,lideres:{sub:'Semana '+n+' · '+DIV[dv],metrica:metric,filas:f,foto},etiqueta:'ONEFA · Liga Mayor 2026',
      texto:'🏈 '+nombre+' · Semana '+n+' · '+DIV[dv]+' (ONEFA)\n'+f.map(r=>r.rank+'. '+r.name+' ('+r.team+') '+r.value).join('\n')+'\n#ONEFA '+TAG[dv],
      hash:'#semana-'+n+'/'+dv+'/'+slug,pie:'Todos los líderes en yardaxyarda.com',archivo:'yardaxyarda-'+slug+'-s'+n+'-'+dv}})}
   if(bar)bar.hidden=!on;
  });
 }
 const prev=render;render=function(){prev();add()};
 let pend=false;new MutationObserver(()=>{if(pend)return;pend=true;requestAnimationFrame(()=>{pend=false;add()})}).observe($('cards'),{childList:true});
 add();
})();
