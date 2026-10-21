/* ===== Semana 6: usa divisionData6 y sin fotografías ===== */
const renderBeforeW6Stats=render;
render=function(){const w6=$('season').value==='w6',w4s=$('season').value==='w4',w3s=$('season').value==='w3',w7s=$('season').value==='w7';noPhotos=w6||w4s||w3s||w7s;
 const src=w6?divisionData6:w4s?divisionData4:w3s?divisionData3:w7s?(divisionData7||divisionData6):divisionData;if(categories!==src[division]){categories=src[division];expanded=-1}
 renderBeforeW6Stats();
 if(w6){$('cards').classList.toggle('hidden',tab==='teams');$('cards').classList.add('plain');
  if(tab!=='teams')$('heading').textContent=tab==='players'?'Estadísticas de jugadores · Semana 6':'Líderes · Semana 6';}
};
render();
