/* Banner Clásico Regio: solo en Semana 5 (14 Grandes), arriba de ONEFA EN NÚMEROS */
const renderBeforeClasico5=render;
render=function(){renderBeforeClasico5();$('clasico5').hidden=!(division==='grandes'&&$('season').value==='w5')};
render();
