(function(){
const card=document.getElementById('hero6'),view=document.getElementById('yxy-article-view'),frame=document.getElementById('yxy-article-frame');
if(!card||!view||!frame)return;
let previousOverflow='';
function openArticle(){previousOverflow=document.body.style.overflow;view.classList.add('yxy-open');view.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';frame.focus()}
function closeArticle(){view.classList.remove('yxy-open');view.setAttribute('aria-hidden','true');document.body.style.overflow=previousOverflow;card.focus()}
card.addEventListener('click',function(e){if(e.target.closest('a'))return;e.preventDefault();e.stopImmediatePropagation();openArticle()},true);
card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopImmediatePropagation();openArticle()}},true);

window.addEventListener('message',function(e){if(e.source===frame.contentWindow&&e.data==='yxy-close-article')closeArticle()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&view.classList.contains('yxy-open'))closeArticle()});
})();
