/* ===== Semana 8 · 14 Grandes: portada "Guerra Civil" (Águilas Blancas IPN vs Burros Blancos IPN) arriba de ONEFA en números ===== */
(function(){const after=document.getElementById('hero6');if(!after)return;
 const f=document.createElement('figure');f.className='hero8';f.id='hero8';f.hidden=true;
 f.innerHTML='<img class="hero8-img" src="assets/images/d24f99c7ab.webp" alt="Jugadores número 91 de Burros Blancos y número 15 de Águilas Blancas se saludan en un mural estilo egipcio, con un mariscal de Águilas lanzando bajo presión">'
  +'<figcaption class="hero8-cap"><p class="hero8-kicker">Semana 8 · 14 Grandes</p><h2>Todo listo para la “Guerra Civil”: El clásico choque entre instituciones del IPN</h2>'
  +'<p class="hero8-vs">Águilas Blancas IPN vs Burros Blancos IPN</p>'
  +'<ul class="hero8-info"><li>📅 Sábado 24 de octubre</li><li>⏰ 12:00 p.m.</li><li>🏟️ Estadio Wilfrido Massieu</li></ul></figcaption>';
 after.after(f);
 const prev=render;render=function(){prev();f.hidden=!(division==='grandes'&&$('season').value==='w8'&&!currentTeam)};
 render();
})();
