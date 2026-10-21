/* ===== Semana 7 · 14 Grandes · Overview: imagen en Top WRs ===== */
const W7_WR_PHOTO="assets/images/191651eb0e.webp";
const renderBeforeW7WR=render;
render=function(){renderBeforeW7WR();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w7'&&!currentTeam))return;
 const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent==='Top WRs');
 if(card&&!card.querySelector('.card-photo')){card.classList.remove('wide-card');card.classList.add('photo-card');const d=document.createElement('div');d.className='card-photo px-photo';d.innerHTML='<img src="'+W7_WR_PHOTO+'" alt="Receptor número 7 de Borregos con el balón, pintura estilo renacentista">';card.insertBefore(d,card.firstChild)}
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
