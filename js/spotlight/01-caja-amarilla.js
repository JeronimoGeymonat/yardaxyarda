const renderBeforeSpot=render;
render=function(){renderBeforeSpot();
 const box=document.querySelector('.aside-card.insight'),show=division==='grandes'&&(tab==='overview'||tab==='players')&&$('season').value==='w5'; /* contenido de semana 5: Player stats (en Overview lo reemplaza la publicidad) */
 box.classList.toggle('empty',!show);
 box.querySelectorAll('video').forEach(v=>{try{if(show){if(v.autoplay)v.play().catch(()=>{})}else v.pause()}catch(e){}});
};
render();
