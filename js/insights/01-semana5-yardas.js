/* ===== INSIGHTS · Team Stats (14 Grandes · Semana 5) ===== */
/* Yardas por partido: data/semana5.json → "insights" */
const insightsData=YXY.semana5.insights;
const insightsDiv={rush:129,pass:193};
const insShort={'Borregos Puebla':'PUE','Borregos Monterrey':'MTY','Pumas CU':'PUMAS','Leones Anáhuac MEX':'ANÁHUAC MX','Auténticos Tigres UANL':'TIGRES','Burros Blancos IPN':'BURROS','Linces UVM':'UVM','Zorros CETYS':'CETYS','Borregos Guadalajara':'GDL','Borregos CEM':'CEM','Borregos CCM':'CCM','Águilas Blancas IPN':'ÁGUILAS','Leones Anáhuac Cancún':'CANCÚN','Aztecas UDLAP':'UDLAP'};
const insLabelPos={'Burros Blancos IPN':'left','Linces UVM':'right','Zorros CETYS':'top'};
let teamSub='tabla';
function renderInsights(){
 const W=680,H=560,m={l:70,r:24,t:44,b:66},x0=75,x1=250,y0=80,y1=420;
 const X=v=>m.l+(v-x0)/(x1-x0)*(W-m.l-m.r),Y=v=>H-m.b-(v-y0)/(y1-y0)*(H-m.t-m.b);
 let g='';
 for(let v=75;v<=250;v+=25)g+=`<line class="ins-grid" x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${H-m.b}"/><text class="ins-axis" x="${X(v)}" y="${H-m.b+22}" text-anchor="middle">${v}</text>`;
 for(let v=100;v<=400;v+=50)g+=`<line class="ins-grid" x1="${m.l}" x2="${W-m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ins-axis" x="${m.l-10}" y="${Y(v)+4}" text-anchor="end">${v}</text>`;
 g+=`<line class="ins-div" x1="${X(insightsDiv.rush)}" x2="${X(insightsDiv.rush)}" y1="${m.t}" y2="${H-m.b}"/><line class="ins-div" x1="${m.l}" x2="${W-m.r}" y1="${Y(insightsDiv.pass)}" y2="${Y(insightsDiv.pass)}"/>`;
 g+=`<text class="ins-quad" x="${m.l+8}" y="${m.t-16}">Ataque vía aérea</text><text class="ins-quad" x="${W-m.r-8}" y="${m.t-16}" text-anchor="end">Ataque multidimensional</text><text class="ins-quad" x="${m.l+8}" y="${H-m.b-10}">Sin sincronía</text><text class="ins-quad" x="${W-m.r-8}" y="${H-m.b-10}" text-anchor="end">Ataque vía terrestre</text>`;
 g+=`<text class="ins-title" x="${(m.l+W-m.r)/2}" y="${H-12}" text-anchor="middle">YARDAS POR TIERRA POR PARTIDO</text><text class="ins-title" transform="translate(18 ${(m.t+H-m.b)/2}) rotate(-90)" text-anchor="middle">YARDAS POR AIRE POR PARTIDO</text>`;
 const r=19;
 g+=insightsData.map(d=>{const logo=logoFor(d.team),cx=X(d.rush),cy=Y(d.pass);return `<g class="ins-pt" tabindex="0" role="link" data-team="${esc(d.team)}" data-rush="${d.rush}" data-pass="${d.pass}" aria-label="${esc(d.team)}: ${d.rush} yardas por tierra, ${d.pass} por aire"><circle cx="${cx}" cy="${cy}" r="${r}"/>${logo?`<image href="${logo}" x="${cx-r*0.78}" y="${cy-r*0.62}" width="${r*1.56}" height="${r*1.24}" preserveAspectRatio="xMidYMid meet"/>`:''}${(()=>{const pos=insLabelPos[d.team]||'bottom',lx=pos==='left'?cx-r-6:pos==='right'?cx+r+6:cx,ly=pos==='top'?cy-r-8:pos==='bottom'?cy+r+14:cy+4,an=pos==='left'?'end':pos==='right'?'start':'middle';return `<text class="ins-lbl" x="${lx}" y="${ly}" text-anchor="${an}">${insShort[d.team]||''}</text>`})()}</g>`}).join('');
 $('ins-chart').style.position='relative';
 $('ins-chart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Yardas por tierra contra yardas por aire por partido, 14 Grandes, semana 5">${g}</svg><div class="ins-tip" hidden></div>`;
 const tip=$('ins-chart').querySelector('.ins-tip');
 $('ins-chart').querySelectorAll('.ins-pt').forEach(el=>{
  const show=()=>{const b=el.getBoundingClientRect(),c=$('ins-chart').getBoundingClientRect();tip.innerHTML=`<b>${esc(el.dataset.team)}</b><br>Tierra: ${el.dataset.rush} yds/partido<br>Aire: ${el.dataset.pass} yds/partido`;tip.hidden=false;let lx=b.left-c.left+b.width+8;if(lx+190>c.width)lx=b.left-c.left-198;tip.style.left=Math.max(0,lx)+'px';tip.style.top=(b.top-c.top-6)+'px'};
  el.addEventListener('mouseenter',show);el.addEventListener('focus',show);el.addEventListener('mouseleave',()=>tip.hidden=true);el.addEventListener('blur',()=>tip.hidden=true);
  el.addEventListener('click',()=>{location.hash='#equipo-'+teamSlug(el.dataset.team)});el.addEventListener('keydown',e=>{if(e.key==='Enter')location.hash='#equipo-'+teamSlug(el.dataset.team)})});
}
document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.onclick=()=>{teamSub=b.dataset.sub;document.querySelectorAll('#team-subnav [data-sub]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});render()});
const renderBeforeInsights=render;
render=function(){renderBeforeInsights();
 const avail=tab==='teams'&&division==='grandes'&&$('season').value==='w5';
 $('team-subnav').hidden=!avail;
 const ins=avail&&teamSub==='insights';
 $('insights').hidden=!ins;
 if(avail)$('standings').hidden=ins;
 if(ins){renderInsights();$('heading').textContent='Estadísticas por equipo · Insights'}
};
render();
