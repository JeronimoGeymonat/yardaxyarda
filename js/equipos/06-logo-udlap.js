/* Aztecas UDLAP: logo nuevo solo en su página de equipo */
const UDLAP_TP_TILE="assets/images/2abb5d726e.webp";
const _renderTeamPageUdlap=renderTeamPage;
renderTeamPage=function(team){_renderTeamPageUdlap(team);if(team!=='Aztecas UDLAP')return;
 const img=document.querySelector('#team-page .tp-tile');if(img){img.src=UDLAP_TP_TILE;img.alt='Aztecas UDLAP'}};
if(location.hash.startsWith('#equipo-'))routeTeam();
