(function(){const tr=$('ticker-track');tr.innerHTML=standingsData.map(r=>`<div class="ticker-item"><span class="ticker-team">${esc(r.team)}</span><span class="ticker-rec">${r.w}-${r.l}</span></div>`).join('');
const prev=$('ticker-prev'),next=$('ticker-next');const upd=()=>{prev.disabled=tr.scrollLeft<=2;next.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-2};
prev.onclick=()=>tr.scrollBy({left:-tr.clientWidth*.8});next.onclick=()=>tr.scrollBy({left:tr.clientWidth*.8});tr.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();})();
