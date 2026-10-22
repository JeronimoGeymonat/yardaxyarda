/* ===== Landing de equipo: Líderes en stats con el dato más reciente por categoría (Semana 6 → 5 → 4 → 3) ===== */
teamLeaders=function(team){
 const weeks=[[7,divisionData7||divisionData6],[6,divisionData6],[5,divisionData],[4,divisionData4],[3,divisionData3]];
 const titles=[];weeks.forEach(([,d])=>d.grandes.forEach(c=>{if(!titles.includes(c.title))titles.push(c.title)}));
 const out=[];
 titles.forEach(title=>{
  for(const [wk,d] of weeks){const cat=d.grandes.find(c=>c.title===title);if(!cat)continue;
   const rs=[...cat.rows].sort((a,b)=>b.values[0]-a.values[0]);const mine=rs.filter(r=>statTeamMap[r.team]===team);
   if(!mine.length)continue;
   mine.forEach(r=>{const rank=rs.indexOf(r)+1;out.push({cat:cat.title,metric:cat.metrics[0],name:r.name,val:r.values[0],rank,total:rs.length,week:wk,extra:cat.metrics.slice(1).map((m,i)=>m+': '+fmt(r.values[i+1])).join(' · ')})});
   break;}
 });
 return out};
render();
