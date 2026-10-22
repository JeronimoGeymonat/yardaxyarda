/* ===== Consentimiento de cookies para Google Analytics · se carga en <head> ANTES de la etiqueta de Google =====
   Medición activada salvo que el visitante la rechace en el aviso de cookies; nunca publicidad de Google. */
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
(function(){let no=false;try{no=localStorage.getItem('yxy-cookies')==='no'}catch(e){}
 gtag('consent','default',{analytics_storage:no?'denied':'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});})();
