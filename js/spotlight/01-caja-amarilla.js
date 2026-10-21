const renderBeforeSpot=render;
render=function(){renderBeforeSpot();
 const box=document.querySelector('.aside-card.insight'),show=division==='grandes'&&tab==='overview'&&$('season').value==='w5';
 box.classList.toggle('empty',!show);
 box.querySelectorAll('video').forEach(v=>{try{if(show){if(v.autoplay)v.play().catch(()=>{})}else v.pause()}catch(e){}});
};
render();
