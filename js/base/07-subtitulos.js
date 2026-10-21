const renderBeforeSub=render;
render=function(){renderBeforeSub();const wk=$('season').value,n=wk.slice(1),num=+n;
 const kind=num<5?'Resultados':num===6?'Resultados y tabla general':num>6?'Calendario':'Estadísticas';
 $('hero-sub').textContent='Los líderes de 14 GRANDES y NACIONAL · '+kind+' de la semana '+n+'.';
};
render();
