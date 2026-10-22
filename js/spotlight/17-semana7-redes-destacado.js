/* ===== Semana 7 · 14 Grandes · cuadro amarillo (Alvarado y Chaib): compartir en X e historia de Instagram ===== */
(function(){const box=document.querySelector('.aside-card.insight .spot-w7');if(!box||typeof yxyRedes!=='function')return;
 const titulo=box.querySelector('.w7-head')?.textContent.trim()||'Yarda × Yarda';
 yxyRedes(box,{
  titulo,
  etiqueta:'In the spotlight · Semana 7 · 14 Grandes',
  texto:titulo+' 🐯 Ángel Alvarado y Jorge Chaib: 468 yardas por tierra. #ONEFA #14Grandes',
  resumen:'Ángel Alvarado y Jorge Chaib suman 468 yardas por tierra y mantienen invicto a Auténticos Tigres.',
  hash:'#semana-7/grandes/destacado',
  imagenes:[...box.querySelectorAll('.w7-collage img')].map(i=>i.getAttribute('src')),
  archivo:'yardaxyarda-alvarado-chaib'
 });
})();
