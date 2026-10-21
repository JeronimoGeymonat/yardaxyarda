/* ===== Semana 7 · 14 Grandes · Overview: imágenes en Lider Yds Mezcladas y Lider Tackleador ===== */
const W7_YM_PHOTO="assets/images/34186178ad.webp",W7_TK_PHOTO="assets/images/37679ba5fd.webp";
const renderBeforeW7YMTK=render;
render=function(){renderBeforeW7YMTK();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w7'&&!currentTeam))return;
 [['Lider Yds Mezcladas',W7_YM_PHOTO,'Corredor número 2 de Borregos con uniforme azul coronado con laureles por querubines, pintura estilo renacentista'],
  ['Lider Tackleador',W7_TK_PHOTO,'Jugador número 30 de blanco tackleando entre jugadores de azul, pintura estilo renacentista']].forEach(([title,src,alt])=>{
  const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent===title);
  if(card&&!card.querySelector('.card-photo')){card.classList.add('photo-card');const d=document.createElement('div');d.className='card-photo px-photo';d.innerHTML='<img src="'+src+'" alt="'+alt+'">';card.insertBefore(d,card.firstChild)}});
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
