/* Pumas CU: logo especial solo en Semana 7 (resultados de la semana y Team Stats) */
const PUMAS7_LOGO="assets/images/1bdeaa34e6.png",PUMAS7_TILE="assets/images/f78492d5c7.webp";
const renderBeforePumas7=render;
render=function(){renderBeforePumas7();
 if($('season').value!=='w7'||currentTeam||division!=='grandes')return;
 document.querySelectorAll('#wr-past img.match-logo').forEach(i=>{if(i.alt==='Pumas CU'||i.title==='Pumas CU')i.src=PUMAS7_TILE});
 document.querySelectorAll('#st4-table tr, #off6-table tr, #yxy-def7-table tr').forEach(tr=>{const a=tr.querySelector('.team-link');if(a&&a.textContent.trim()==='Pumas CU'){const i=tr.querySelector('.st-team img');if(i)i.src=PUMAS7_LOGO}});
};
render();
document.querySelectorAll('#team-subnav [data-sub]').forEach(b=>b.addEventListener('click',()=>setTimeout(render,0)));
