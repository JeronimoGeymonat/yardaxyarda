/* ===== Semana 4 · 14 Grandes · Overview: fotografías en Top QBs y Top WRs ===== */
const W4_PHOTOS={'Top RBs':["assets/images/034389ba1c.webp","Corredor número 31 de Auténticos Tigres con el balón, ilustración estilo cómic"],'Top QBs':["assets/images/6c76d561cd.webp","Mariscal número 15 de Borregos detrás de la línea, ilustración estilo cómic"],'Top WRs':["assets/images/b1b0af1f88.webp","Jugador número 11 de Borregos con el balón, ilustración estilo cómic"]};
const renderBeforeW4Photos=render;
render=function(){renderBeforeW4Photos();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w4'))return;
 document.querySelectorAll('#cards .card').forEach(card=>{const ph=W4_PHOTOS[card.querySelector('h3')?.textContent];if(!ph||card.querySelector('.card-photo'))return;
  card.classList.add('photo-card');const d=document.createElement('div');d.className='card-photo px-photo';d.innerHTML='<img src="'+ph[0]+'" alt="'+ph[1]+'">';card.insertBefore(d,card.firstChild)});
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
