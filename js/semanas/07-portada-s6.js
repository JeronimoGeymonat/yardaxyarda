const renderBeforeHero6=render;
render=function(){renderBeforeHero6();$('hero6').hidden=!(division==='grandes'&&$('season').value==='w6')};
render();
$('group').onchange=()=>render();$('search').oninput=()=>render();
