/* ===== Semana 4 (14 Grandes): columna con resultados + tabla y caja amarilla con el video ===== */
const w4Nodes={wr:$('weekly-results'),st:$('st4')};w4Nodes.parent=w4Nodes.st.parentNode;w4Nodes.anchor=w4Nodes.st.nextSibling;
const renderBeforeW4Video=render;
render=function(){renderBeforeW4Video();
 const on=division==='grandes'&&$('season').value==='w4';
 const layout=document.querySelector('.layout'),left=layout.firstElementChild,box=document.querySelector('.aside-card.insight'),vid=box.querySelector('.spot-video');
 const datos=[...document.querySelectorAll('.aside-card')].find(c=>c.querySelector('h3')?.textContent==='Datos del tablero');
 if(on){layout.style.display='';left.classList.add('w4col');left.appendChild(w4Nodes.wr);left.appendChild(w4Nodes.st);
  box.classList.remove('empty','w6mode');box.classList.add('w4mode');if(datos)datos.style.display='none';
  try{vid.play().catch(()=>{})}catch(e){}
 }else{
  if(w4Nodes.wr.parentNode===left){w4Nodes.parent.insertBefore(w4Nodes.wr,w4Nodes.anchor);w4Nodes.parent.insertBefore(w4Nodes.st,w4Nodes.anchor)}
  left.classList.remove('w4col');box.classList.remove('w4mode');try{vid.pause()}catch(e){}
 }
};
render();
