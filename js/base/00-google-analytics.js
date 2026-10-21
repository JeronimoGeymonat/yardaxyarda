/* ===== Google Analytics 4 (G-XP9Q2SMLVE) · se carga en <head> antes que todo ===== */
window.YXY_GA_ID='G-XP9Q2SMLVE';
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
(function(){
  const stored = (() => {
    try { return localStorage.getItem('yxy-cookies'); }
    catch (e) { return null; }
  })();
  const consentState = stored === 'si' ? 'granted' : 'denied';

  /* Consentimiento: por defecto, no medir hasta que el usuario acepte. */
  gtag('consent','default',{analytics_storage:consentState,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',window.YXY_GA_ID,{anonymize_ip:true,send_page_view:true});

  const s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+window.YXY_GA_ID;
  s.onload=()=>{
    if (stored === 'si') {
      gtag('consent','update',{analytics_storage:'granted'});
    } else if (stored === 'no') {
      gtag('consent','update',{analytics_storage:'denied'});
    }
  };
  document.head.appendChild(s);
})();
