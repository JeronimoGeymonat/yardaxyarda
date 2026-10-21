/* ===== Barra de semanas debajo de 14 GRANDES / NACIONAL (Overview, Player stats y Team stats) =====
   Usa las mismas opciones que el selector "Semana" (#season) y lo mantiene sincronizado. */
(function(){const sel=$('season'),top=document.querySelector('header .top');if(!sel||!top)return;
 const bar=document.createElement('nav');bar.className='yxy-weeks';bar.setAttribute('aria-label','Seleccionar semana');
 top.after(bar);
 function build(){
  const opts=[...sel.options],key=opts.map(o=>o.value+o.textContent).join('|');
  if(bar.dataset.key!==key){bar.dataset.key=key;
   bar.innerHTML='<span class="yxy-weeks-lbl" aria-hidden="true">Semana</span>'+opts.map(o=>{const n=o.value.replace(/^w/,''),tag=/calendario/i.test(o.textContent)?'cal':/resultados/i.test(o.textContent)?'res':'';
    return `<button type="button" data-week="${o.value}" class="${tag}" title="${esc(o.textContent)}"><span class="lbl">Semana</span> ${n}</button>`}).join('');}
  bar.querySelectorAll('[data-week]').forEach(b=>{const on=b.dataset.week===sel.value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)});
  bar.hidden=!!currentTeam;
  const a=bar.querySelector('.active');if(a&&bar.scrollWidth>bar.clientWidth){const l=a.offsetLeft-bar.clientWidth/2+a.offsetWidth/2;bar.scrollLeft=Math.max(0,l)}
 }
 bar.addEventListener('click',e=>{const b=e.target.closest('[data-week]');if(!b||b.dataset.week===sel.value)return;
  sel.value=b.dataset.week;sel.dispatchEvent(new Event('change',{bubbles:true}));build()});
 const prev=render;render=function(){prev();build()};
 window.addEventListener('hashchange',()=>setTimeout(build,0));
 build();
})();
