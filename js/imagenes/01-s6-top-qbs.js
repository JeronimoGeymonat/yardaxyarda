/* ===== Semana 6 · Top QBs con fotografía (14 Grandes · Overview) ===== */
const QB6_PHOTO="assets/images/7ed7b842be.webp";
const renderBeforeQB6=render;
render=function(){renderBeforeQB6();
 if(!(division==='grandes'&&tab==='overview'&&$('season').value==='w6'))return;
 const card=document.querySelector('#cards .card');if(!card||card.querySelector('.card-photo'))return;
 card.classList.add('photo-card');
 const ph=document.createElement('div');ph.className='card-photo px-photo';
 ph.innerHTML='<img src="'+QB6_PHOTO+'" alt="Quarterback número 3 lanzando un pase, estilo bloques de construcción">';
 card.insertBefore(ph,card.firstChild);
};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();$('category').onchange=()=>{selected=+$('category').value;sort=0;ascending=false;render()};
