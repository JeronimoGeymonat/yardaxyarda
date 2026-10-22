/* ===== Aviso de Fase Beta: debajo de "Resultados de la semana" (y del calendario en semanas sin resultados) ===== */
(function(){
 const html='<b>Aviso de Fase Beta:</b> Le informamos que el presente sitio web está operando bajo una versión Beta en fase de pruebas. En consecuencia, la información y datos estadísticos presentados pueden contener errores o estar sujetos a actualizaciones sin previo aviso. Para cualquier reporte de fallas, sugerencias o contacto directo, por favor remita su mensaje a <a href="mailto:clientes@yardaxyarda.com">clientes@yardaxyarda.com</a>.';
 ['weekly-results','calendar'].forEach(id=>{const s=$(id);if(!s)return;const p=document.createElement('p');p.className='yxy-beta';p.innerHTML=html;s.appendChild(p)});
 /* que quede siempre al final, aunque se agreguen botones de compartir después */
 const prev=render;render=function(){prev();document.querySelectorAll('.yxy-beta').forEach(p=>{if(p.nextElementSibling)p.parentNode.appendChild(p)})};
 render();
})();
