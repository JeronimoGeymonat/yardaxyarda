const renderBeforeW5Vid=render;
render=function(){renderBeforeW5Vid();const v=document.querySelector('.spot-w5vid'),box=document.querySelector('.aside-card.insight');
 const on=!box.classList.contains('w4mode')&&!box.classList.contains('w6mode')&&!box.classList.contains('empty');
 try{on?v.play().catch(()=>{}):v.pause()}catch(e){}};
render();
