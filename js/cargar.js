/* =========================================================================
   Yarda × Yarda · cargador
   1) Lee los datos de /data (*.json).
   2) Carga los scripts de /js en el orden de la lista SCRIPTS (el orden importa).
   Para agregar una semana nueva: crea data/semanaN.json, agrégala a DATOS y,
   si necesita código nuevo, agrega su archivo .js al final de SCRIPTS.
   ========================================================================= */
(function(){
 const DATOS=["semana3", "semana4", "semana5", "semana6", "semana7", "calendario", "rosters"];
 const SCRIPTS=[
   "js/base/01-app.js",
   "js/base/02-logos-tabla-s5.js",
   "js/base/03-ticker.js",
   "js/base/04-calendario.js",
   "js/base/05-overview.js",
   "js/spotlight/01-caja-amarilla.js",
   "js/base/06-resultados-tiles.js",
   "js/base/07-subtitulos.js",
   "js/equipos/01-paginas-equipo.js",
   "js/semanas/01-tablas-s3-s4.js",
   "js/semanas/02-semana6.js",
   "js/insights/01-semana5-yardas.js",
   "js/spotlight/02-semana6-overview.js",
   "js/semanas/03-semana4-layout.js",
   "js/semanas/04-semana6-lideres.js",
   "js/spotlight/03-semana5-video.js",
   "js/spotlight/04-semana6-player-stats.js",
   "js/imagenes/01-s6-top-qbs.js",
   "js/imagenes/02-s6-top-rbs.js",
   "js/imagenes/03-s6-top-wrs.js",
   "js/imagenes/04-s6-yds-mezcladas.js",
   "js/equipos/02-ruta-inicial.js",
   "js/semanas/05-semana4-lideres.js",
   "js/semanas/06-semana4-pestanas.js",
   "js/semanas/07-portada-s6.js",
   "js/insights/02-ofensiva-s6.js",
   "js/insights/03-defensiva-s6.js",
   "js/equipos/03-ofensiva-defensiva.js",
   "js/spotlight/05-semana6-team-stats.js",
   "js/insights/04-ofensiva-defensiva-s6-nacional.js",
   "js/insights/05-grafica-1st-and-10.js",
   "js/spotlight/06-semana6-insights.js",
   "js/semanas/08-semana3.js",
   "js/equipos/04-lideres-recientes.js",
   "js/equipos/05-nacional.js",
   "js/semanas/09-semana-por-defecto.js",
   "js/base/08-footer.js",
   "js/semanas/10-banner-clasico-s5.js",
   "js/semanas/11-calendario-nacional.js",
   "js/base/09-banners-superiores.js",
   "js/imagenes/05-s4-fotos.js",
   "js/spotlight/07-semana4-team-stats.js",
   "js/spotlight/08-semana5-nota-puebla.js",
   "js/spotlight/09-semana5-edson-rincon.js",
   "js/spotlight/10-semana5-sin-nombre.js",
   "js/base/10-menu-lateral.js",
   "js/semanas/12-semana7.js",
   "js/semanas/13-semana-mas-reciente.js",
   "js/spotlight/11-semana7-collage.js",
   "js/imagenes/06-s7-top-rbs.js",
   "js/base/11-logos-grises.js",
   "js/equipos/06-logo-udlap.js",
   "js/imagenes/07-s7-top-qbs.js",
   "js/imagenes/08-s7-top-wrs.js",
   "js/insights/06-ofensiva-s7.js",
   "js/spotlight/12-semana7-movil.js",
   "js/base/12-logo-pumas-s7.js",
   "js/base/13-cronica-clasico.js",
   "js/insights/07-defensiva-s7.js",
   "js/base/14-logo-pumas-s7-defensiva.js",
   "js/imagenes/09-s7-tackleador-yds-mezcladas.js",
   "js/spotlight/13-semana7-player-stats-videos.js",
   "js/insights/08-castigos-s7.js",
   "js/semanas/14-portada-s8.js",
   "js/semanas/15-nota-guerra-civil.js",
   "js/semanas/17-nota-final-neutral.js",
   "js/spotlight/14-semana3-publicidad.js",
   "js/spotlight/15-semana7-team-stats-publicidad.js",
   "js/spotlight/16-semana4-player-stats-publicidad.js",
   "js/base/17-barra-semanas.js",
   "js/base/16-movil-semana-arriba.js",
   "js/base/15-analitica-eventos.js",
   "js/base/18-enlaces-compartir.js",
   "js/base/19-compartir-redes.js",
   "js/spotlight/17-semana7-redes-destacado.js",
   "js/spotlight/18-semana5-overview-publicidad.js",
   "js/spotlight/19-top5-redes.js",
   "js/semanas/16-redes-resultados-calendario.js",
   "js/base/20-analitica-avanzada.js",
   "js/base/21-aviso-beta.js"
 ];
 /* Versión de los archivos: súbela (por ejemplo 20261029) cada vez que actualices código o estilos,
    así los navegadores y el caché de Hostinger descargan la versión nueva en lugar de la vieja.
    Cámbiala también en index.html (styles.css, 00-consentimiento.js y cargar.js). */
 const VERSION='20261022o';
 window.YXY={};
 Promise.all(DATOS.map(n=>fetch('data/'+n+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error('data/'+n+'.json');return r.json()}).then(j=>{YXY[n]=j})))
  .then(()=>{
   /* la tabla general más reciente (semana con número más alto que tenga "tabla") alimenta la tira de récords y las páginas de equipo */
   const sem=DATOS.filter(n=>/^semana\d+$/.test(n)&&YXY[n].tabla).sort((a,b)=>a.slice(6)-b.slice(6));
   YXY.tablaActual=YXY[sem[sem.length-1]].tabla;
   SCRIPTS.forEach(src=>{const s=document.createElement('script');s.src=src+'?v='+VERSION;s.async=false;document.body.appendChild(s)});
  })
  .catch(e=>{console.error(e);const p=document.createElement('p');p.style.cssText='position:fixed;left:0;right:0;top:0;z-index:99999;margin:0;padding:12px 16px;background:#ffb000;color:#0a0700;font:bold 13px Arial,sans-serif';
   p.textContent='No se pudieron cargar los datos ('+e.message+'). Abre el sitio desde GitHub Pages o con un servidor local (ver README).';document.body.appendChild(p)});
})();
