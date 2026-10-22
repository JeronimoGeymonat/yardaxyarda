/* ===== Semana 7 · 14 Grandes · Insights: equipos con más castigos (ofensiva y defensiva) ===== */
(function(){
 const anchor=document.getElementById('yxy-defense7');if(!anchor)return;
 const sec=document.createElement('section');sec.id='yxy-pen7';sec.className='tp-section off6';sec.hidden=true;
 sec.innerHTML='<div class="section-title"><h3>¿Quién comete más castigos?</h3><span class="pill">Acumulado · Semana 7</span></div>'
  +'<div class="pen7-legend"><span><i style="background:#ffb000;border-radius:0"></i>Ranking</span><span><i style="background:#ffcf66"></i>Equipo</span><span><i style="background:#ffb000"></i>Castigos ofensiva</span><span><i style="background:#4f5fd6"></i>Castigos defensiva</span></div>'
  +'<div class="pen7-wrap" id="pen7-wrap"></div>'
  +'<p class="note">Los 6 equipos de 14 Grandes con más castigos cometidos por su ofensiva y por su defensiva, acumulados a la semana 7. El área de cada círculo es proporcional al número de castigos; en caso de empate se ordenan alfabéticamente. Fuente: tablas de Ofensiva y Defensiva por equipo.</p>';
 anchor.after(sec);
 const logo=t=>(t==='Pumas CU'&&typeof PUMAS7_LOGO!=='undefined')?PUMAS7_LOGO:(logoFor(t)||'');
 function panel(kind,title,sub,rows){
  const top=[...rows].map(r=>({team:r.team,v:r.v[7]})).sort((a,b)=>b.v-a.v||a.team.localeCompare(b.team,'es')).slice(0,6);
  const max=top[0].v,MAX=window.matchMedia('(max-width:800px)').matches?96:108;
  return `<div class="pen7-panel ${kind}"><div class="pen7-head"><b>${title}</b><span>${sub}</span></div><div class="pen7-grid" style="--max:${MAX}px">${top.map(r=>{
   const rank=top.indexOf(r)+1,d=Math.round(MAX*Math.sqrt(r.v/max));
   return `<div class="pen7-item"><div class="pen7-rank">${rank}</div><div class="pen7-team"><a class="team-link" href="#equipo-${teamSlug(r.team)}">${esc(r.team)}</a></div>${logo(r.team)?`<img class="pen7-logo" src="${logo(r.team)}" alt="">`:''}<div class="pen7-bub"><div class="pen7-dot" style="width:${d}px;height:${d}px" title="${esc(r.team)}: ${r.v} castigos">${r.v}</div></div></div>`}).join('')}</div></div>`}
 const prev=render;render=function(){prev();
  const on=$('season').value==='w7'&&division==='grandes'&&tab==='teams'&&teamSub==='insights'&&!currentTeam&&typeof offense7!=='undefined'&&window.defense7Data;
  sec.hidden=!on;if(!on)return;
  $('pen7-wrap').innerHTML=panel('off','Ofensiva','Castigos cometidos',offense7)+panel('def','Defensiva','Castigos cometidos',window.defense7Data.grandes);
 };
 render();
 document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>setTimeout(render,0)));
})();
