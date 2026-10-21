/* ===== Semana más reciente: tira de récords y semana por defecto (datos en data/semanaN.json y data/calendario.json) ===== */
(function(){
 const tr=$('ticker-track');if(tr){tr.dataset.conf='';buildTicker()}
 if(!location.hash.startsWith('#equipo-')){$('season').value=LATEST_WEEK;}
 render();if(location.hash.startsWith('#equipo-'))routeTeam();
})();
const renderBeforeW7Note=render;
render=function(){renderBeforeW7Note();if($('season').value==='w7'&&tab==='teams'&&$('st4-note'))$('st4-note').textContent='JJ = juegos jugados · G = ganados · P = perdidos · % = porcentaje de victorias · P.A. = puntos a favor · P.C. = puntos en contra · DIF = diferencia · PTS = puntos en la tabla (2 por victoria). Los equipos con la misma posición están empatados. Tabla al cierre de la semana 7.'};
render();
