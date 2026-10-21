/* ===== Semana 7 · 14 Grandes · Overview: imagen en Top RBs ===== */
const W7_RB_PHOTO="assets/images/0ddac26c29.webp";
const renderBeforeW7Photos=render;
render=function(){renderBeforeW7Photos();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w7'&&!currentTeam))return;
 document.querySelectorAll('#cards .card').forEach(card=>{const h=card.querySelector('h3')?.textContent;
  if(h==='Top RBs'&&!card.querySelector('.card-photo')){card.classList.add('photo-card');const d=document.createElement('div');d.className='card-photo px-photo';d.innerHTML='<img src="'+W7_RB_PHOTO+'" alt="Corredor número 21 de Borregos con el balón, pintura estilo renacentista">';card.insertBefore(d,card.firstChild)}
  if(h==='Top WRs')card.classList.add('wide-card')});
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
