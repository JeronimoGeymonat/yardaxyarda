const renderBeforeOverview=render;
render=function(){renderBeforeOverview();
 if(!['w5','w6'].includes($('season').value))return;
 const ov=tab==='overview';
 if(tab!=='teams'){$('table').hidden=true;$('table-title').parentElement.style.display='none';}
 $('category').style.display='none';$('cards').classList.toggle('plain',!ov);
};
render();
