/* ===== Google Analytics 4 (G-XP9Q2SMLVE) · se carga en <head> antes que todo ===== */
window.YXY_GA_ID='G-XP9Q2SMLVE';
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
(function(){
 let no=false;try{no=localStorage.getItem('yxy-cookies')==='no'}catch(e){}
 /* Consentimiento: medición activada salvo que el visitante la rechace en el aviso; nunca publicidad */
 gtag('consent','default',{analytics_storage:no?'denied':'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 gtag('js',new Date());
 gtag('config',window.YXY_GA_ID);
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+window.YXY_GA_ID;document.head.appendChild(s);
})();
