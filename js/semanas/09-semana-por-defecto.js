/* ===== Semana por defecto: la más reciente con resultados (se actualiza sola al capturar marcadores) ===== */
var LATEST_WEEK=(function(){const ws=teamSchedule.filter(w=>w.g.some(g=>g.pl!==null&&g.pv!==null)).map(w=>w.w);return 'w'+Math.max(...ws)})();
(function(){const s=$('season');if([...s.options].some(o=>o.value===LATEST_WEEK)&&s.value!==LATEST_WEEK){s.value=LATEST_WEEK;render()}})();
