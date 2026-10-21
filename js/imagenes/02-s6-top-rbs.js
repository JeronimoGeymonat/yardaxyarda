/* ===== Semana 6 · Top RBs con fotografía (14 Grandes · Overview) ===== */
const RB6_PHOTO="assets/images/a51078c80d.webp";
const renderBeforeRB6=render;
render=function(){renderBeforeRB6();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w6'))return;
 const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent==='Top RBs');if(!card||card.querySelector('.card-photo'))return;
 card.classList.add('photo-card');
 const ph=document.createElement('div');ph.className='card-photo px-photo';
 ph.innerHTML='<img src="'+RB6_PHOTO+'" alt="Corredor de Borregos CEM con el balón, estilo bloques de construcción">';
 card.insertBefore(ph,card.firstChild);
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
