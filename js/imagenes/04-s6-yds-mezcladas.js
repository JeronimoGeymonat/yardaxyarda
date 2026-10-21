/* ===== Semana 6 · Lider Yds Mezcladas con fotografía (14 Grandes · Overview) ===== */
const YM6_PHOTO="assets/images/b3c0275a39.webp";
const renderBeforeYM6=render;
render=function(){renderBeforeYM6();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w6'))return;
 const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent==='Lider Yds Mezcladas');if(!card||card.querySelector('.card-photo'))return;
 card.classList.add('photo-card');
 const ph=document.createElement('div');ph.className='card-photo px-photo';
 ph.innerHTML='<img src="'+YM6_PHOTO+'" alt="Jugador de Borregos con el balón corriendo, estilo bloques de construcción">';
 card.insertBefore(ph,card.firstChild);
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
