/* Banner superior por semana: Semana 6 = estilo bloques · Semana 7 = mural */
const renderBeforeTopBanner=render;
render=function(){renderBeforeTopBanner();const wk=$('season').value;$('banner-w4').hidden=wk!=='w4';$('banner-w5').hidden=wk!=='w5';$('banner-w6').hidden=wk!=='w6';$('banner-w7').hidden=wk!=='w7';$('banner-w8').hidden=wk!=='w8'};
render();
