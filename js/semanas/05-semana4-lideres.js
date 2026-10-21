/* ===== Semana 4: líderes (mismo template que semana 5) + resultados + tabla, en 14 Grandes y Nacional ===== */
const renderBeforeW4Stats=render;
render=function(){renderBeforeW4Stats();
 const w4=$('season').value==='w4',layout=document.querySelector('.layout'),left=layout.firstElementChild,box=document.querySelector('.aside-card.insight');
 const datos=[...document.querySelectorAll('.aside-card')].find(c=>c.querySelector('h3')?.textContent==='Datos del tablero');
 if(w4){layout.style.display='';left.classList.add('w4col');
  $('cards').classList.remove('hidden');$('cards').classList.add('plain');
  if(w4Nodes.st.parentNode!==left)left.appendChild(w4Nodes.st);
  if(division==='nacional'){box.classList.add('empty');box.classList.remove('w4mode');$('heading').textContent='Líderes y tabla general · Semana 4'}
  else $('heading').textContent='Líderes, resultados y tabla general · Semana 4';
  if(datos)datos.style.display='none';
 }else if(w4Nodes.st.parentNode===left){w4Nodes.parent.insertBefore(w4Nodes.st,w4Nodes.anchor);left.classList.remove('w4col');if(datos)datos.style.display=''}
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
