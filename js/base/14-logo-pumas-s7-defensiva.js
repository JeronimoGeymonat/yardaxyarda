/* re-aplicar logo de Pumas (semana 7) después de dibujar la tabla defensiva */
(function(){const prev=render;render=function(){prev();if($('season').value==='w7'&&division==='grandes'&&!currentTeam&&typeof PUMAS7_LOGO!=='undefined')document.querySelectorAll('#yxy-def7-table tr').forEach(tr=>{const a=tr.querySelector('.team-link');if(a&&a.textContent.trim()==='Pumas CU'){const i=tr.querySelector('.st-team img');if(i)i.src=PUMAS7_LOGO}})};render();
 document.getElementById('yxy-def7-table').addEventListener('click',()=>setTimeout(()=>render(),0));})();
