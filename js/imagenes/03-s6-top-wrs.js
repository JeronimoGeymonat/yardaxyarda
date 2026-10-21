/* ===== Semana 6 · Top WRs con fotografía (14 Grandes · Overview) ===== */
const WR6_PHOTO="assets/images/cdff5b40d0.webp";
const renderBeforeWR6=render;
render=function(){renderBeforeWR6();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w6'))return;
 const card=[...document.querySelectorAll('#cards .card')].find(c=>c.querySelector('h3')?.textContent==='Top WRs');if(!card||card.querySelector('.card-photo'))return;
 card.classList.add('photo-card');
 const ph=document.createElement('div');ph.className='card-photo wr6-photo';
 ph.innerHTML='<img src="'+WR6_PHOTO+'" alt="Receptor número 80 de Borregos CEM celebrando, estilo bloques de construcción">';
 card.insertBefore(ph,card.firstChild);
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
