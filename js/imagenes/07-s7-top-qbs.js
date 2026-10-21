/* ===== Semana 7 · 14 Grandes · Overview: imagen en Top QBs ===== */
const W7_QB_PHOTO="assets/images/fa600e0f64.webp";
const renderBeforeW7QB=render;
render=function(){renderBeforeW7QB();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w7'&&!currentTeam))return;
 const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent==='Top QBs');
 if(card&&!card.querySelector('.card-photo')){card.classList.add('photo-card');const d=document.createElement('div');d.className='card-photo px-photo';d.innerHTML='<img src="'+W7_QB_PHOTO+'" alt="Mariscal número 9 con uniforme naranja corriendo con el balón, pintura estilo renacentista">';card.insertBefore(d,card.firstChild)}
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
