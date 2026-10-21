/* ===== OFENSIVA POR EQUIPO · Semana 7 (14 Grandes y Nacional) · Insights — Total Yds = Pass + Rush; puntos = tabla semana 7 ===== */
var offense7=YXY.semana7.ofensiva.grandes,offense7N=YXY.semana7.ofensiva.nacional;
const renderBeforeIns7=render;
render=function(){renderBeforeIns7();
 document.querySelector('.layout').firstElementChild.classList.remove('w7col');
 {const pl=$('offense6').querySelector('.pill');if(pl)pl.textContent='Acumulado · Semana '+($('season').value==='w7'?'7':'6')}
 if($('season').value!=='w7'||currentTeam||tab!=='teams')return;
 $('team-subnav').hidden=false;document.querySelector('.layout').firstElementChild.classList.add('w7col');
 document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>{const on=b.dataset.sub===teamSub;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)});
 const ins=teamSub==='insights';
 $('st4').hidden=ins;['defense6','fd6','insights','standings'].forEach(id=>{if($(id))$(id).hidden=true});
 $('offense6').hidden=!ins;if(ins){$('weekly-results').hidden=true;renderOffense();$('heading').textContent='Estadísticas por equipo · Insights'}
 else $('heading').textContent='Estadísticas por equipo · Tabla general';
 const pill=$('offense6').querySelector('.pill');if(pill)pill.textContent='Acumulado · Semana 7';
 const h=$('offense6').querySelector('h3');if(h)h.textContent='Ofensiva por equipo · '+(division==='nacional'?'Nacional':'14 Grandes');
};
render();
document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>render()));
