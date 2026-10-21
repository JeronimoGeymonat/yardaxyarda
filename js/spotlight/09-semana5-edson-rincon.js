/* Semana 5 · Spotlight: nombre debajo del video + nota de Edson Rincón */
(function(){const box=document.querySelector('.aside-card.insight'),v=box.querySelector(':scope>.spot-w5vid'),nm=$('featured-name');if(v&&nm)v.after(nm)})();
const renderBeforeW5Copy=render;
render=function(){renderBeforeW5Copy();
 if(division==='grandes'&&tab==='overview'&&$('season').value==='w5'&&$('featured-name').textContent.trim()==='Edson Rincon')
  $('featured-copy').innerHTML='<strong>Edson Rincón brilla en la Semana 5 y se consolida como líder por aire de la liga</strong><br><br>Edson Rincón se adueñó del <em>spotlight</em> en la Semana 5 con una actuación consagratoria. El mariscal de campo comandó una serie ofensiva magistral en los minutos finales para sellar el <em>game-winning touchdown</em>, asegurando la victoria y consolidándose como la gran figura del encuentro.<br><br>Con este desempeño, Rincón alcanzó las 1,295 yardas por pase en lo que va de la temporada, cifra que lo posiciona en la cima como el líder absoluto en yardas por aire de toda la liga.';
};
render();
