# Yarda × Yarda

Estadísticas de fútbol americano universitario de la ONEFA · Liga Mayor 2026 (conferencias **14 Grandes** y **Nacional**): líderes por semana, estadísticas de jugadores y equipos, tablas generales, resultados, calendario y páginas de cada equipo con su roster.

Sitio estático: se publica tal cual en Hostinger o GitHub Pages, **sin compilar nada**.

## Estructura

```
index.html              Estructura de la página (HTML)
privacidad.html         Aviso de privacidad (enlazado desde el aviso de cookies y el pie de página)
css/styles.css          Estilos
data/                   ← LOS DATOS. Para actualizar estadísticas, edita estos archivos
  semana3.json … semana7.json
  calendario.json
  rosters.json
js/                     Código, separado por tema
  cargar.js             Carga los datos y luego los scripts, en orden
  base/                 Funciones principales, menú, banners, logos, crónica
  semanas/              Lógica de cada semana (vistas, tablas, portadas)
  equipos/              Páginas de equipo (calendario, líderes, ofensiva/defensiva)
  insights/             Tablas de ofensiva/defensiva y gráficas de Insights
  spotlight/            Cuadro amarillo (notas, videos, collage)
  imagenes/             Fotos/ilustraciones en las tarjetas de líderes
assets/images/          Logos, fotos, banners e ilustraciones
assets/videos/          Videos
.nojekyll               Indica a GitHub Pages que publique los archivos tal cual
```

## Cómo actualizar los datos

Todo se edita en `data/`. Guarda el archivo, súbelo a GitHub y la página se actualiza sola.

| Quiero cambiar… | Archivo | Dónde |
|---|---|---|
| Líderes (Top QBs, RBs, WRs, Tackleador, Yds Mezcladas) | `data/semanaN.json` | `"lideres"` → `"grandes"` o `"nacional"` → cada categoría tiene `"rows"` con `"team"`, `"name"` y `"values"` (en el orden de `"metrics"`) |
| Tabla general (G, P, P.A., P.C., PTS, posición) | `data/semanaN.json` | `"tabla"` → `"grandes"` (lista de equipos) o `"nacional"` (lista de grupos con `"rows"`) |
| Ofensiva / Defensiva por equipo (Insights) | `data/semana6.json`, `data/semana7.json` | `"ofensiva"` / `"defensiva"` → `"v"`: `[Pass Yds, Rush Yds, Total Yds, 1st & 10, Pts, INT, FUM, Castigos]` |
| Marcadores y calendario | `data/calendario.json` | `"grandes"` y `"nacional"` → cada semana `"w"` tiene juegos `"g"`: `"l"` local, `"v"` visita, `"pl"` puntos local, `"pv"` puntos visita (`null` si no se ha jugado), `"f"` fecha, `"h"` hora, `"s"` estadio |
| Roster de un equipo | `data/rosters.json` | Nombre del equipo → lista de jugadores (`"num"`, `"nombre"`, `"pos"`, `"estatura"`, `"peso"`…) |

Reglas útiles:
- **Total Yds = Pass Yds + Rush Yds.** Si cambias una, actualiza el total.
- Los puntos de las tablas de ofensiva/defensiva deben coincidir con P.A./P.C. de la tabla general.
- La tira de récords de arriba y las páginas de equipo usan la tabla general de la **semana más reciente** (`semanaN.json` con el número más alto).
- Los nombres de equipo deben escribirse exactamente igual en todos los archivos (por ejemplo `"Borregos Monterrey"`, `"Leones Anáhuac MEX"`).
- Los archivos JSON no aceptan comas al final de una lista ni comentarios. Si la página no carga, revisa el archivo en <https://jsonlint.com>.

Una **semana nueva** (por ejemplo la 8) necesita su `data/semana8.json` y agregarla a la lista `DATOS` en `js/cargar.js`. Si esa semana muestra algo nuevo en pantalla, también lleva su archivo en `js/semanas/`.

## Ver el sitio en tu computadora

Por seguridad, el navegador no deja leer los archivos `data/*.json` si abres `index.html` con doble clic. Para verlo en tu computadora, usa un servidor local:

- **VS Code:** instala la extensión *Live Server* y da clic en **Go Live**.
- **Terminal:** dentro de esta carpeta ejecuta `python3 -m http.server 8000` y abre <http://localhost:8000>.

En GitHub Pages funciona directamente.

## Publicar en GitHub Pages

1. Sube **todo el contenido de esta carpeta** a la raíz de tu repositorio (rama `main`). Ningún archivo pasa de 25 MB, así que puedes arrastrarlos en la web de GitHub.
2. Ve a **Settings → Pages → Build and deployment → Source: Deploy from a branch**, elige `main` y la carpeta `/ (root)`, y guarda.
3. En uno o dos minutos GitHub Pages mostrará la URL (por ejemplo `https://tu-usuario.github.io/yardaxyarda/`).

## Publicar en Hostinger

1. En hPanel abre **Sitios web → Administrar → Administrador de archivos** y entra a la carpeta **`public_html`** (si hay un `default.php` o `index.php` de Hostinger, bórralo).
2. Da clic en **Subir** y sube `yardaxyarda-hostinger.zip`. Luego clic derecho sobre el zip → **Extraer** → déjalo en `public_html`. Al terminar, `index.html` debe quedar directamente dentro de `public_html` junto a las carpetas `css`, `data`, `js` y `assets`. Borra el zip.
3. El archivo `.htaccess` (incluido) activa la compresión y la caché; los datos (`data/*.json`) y la página siempre se sirven en su versión más reciente.
4. Activa el **SSL** gratuito del dominio (hPanel → Seguridad → SSL) para que el sitio abra con `https://`.
5. En Google Analytics actualiza la URL del flujo en **Administrar → Flujos de datos** con tu nuevo dominio (ID de medición `G-KNM0MF1JTT`).

Para actualizar después, sube solo los archivos que cambiaron (por ejemplo `data/semana7.json`) encima de los anteriores.

## Enlaces para compartir

Cada semana, conferencia y vista tiene su propio enlace (ideal para Instagram):

```
https://yardaxyarda.com/#semana-7/grandes/top-qbs
https://yardaxyarda.com/#semana-7/nacional/top-rbs
https://yardaxyarda.com/#semana-7/grandes/top-wrs
https://yardaxyarda.com/#semana-7/grandes/tackleador
https://yardaxyarda.com/#semana-7/nacional/yds-mezcladas
https://yardaxyarda.com/#semana-7/nacional/team-stats      (tabla general)
https://yardaxyarda.com/#semana-7/grandes/insights
https://yardaxyarda.com/#semana-7/grandes/overview
https://yardaxyarda.com/#semana-7/nacional/player-stats
```

- Al abrir el enlace, la página cambia sola a esa semana, conferencia y vista y baja a la sección (con un destello ámbar).
- Los botones **Compartir** de Top QBs, Top RBs, Top WRs, Lider Tackleador, Lider Yds Mezcladas, la Tabla general e Insights abren el menú de compartir del celular o copian el enlace en computadora.
- Mientras navegas, la dirección del navegador se actualiza; también puedes copiarla de ahí.
- Código: `js/base/18-enlaces-compartir.js`. Cada uso del botón se registra en Google Analytics como `compartir`.

## Analítica (Google Analytics 4 · `G-KNM0MF1JTT`)

- La etiqueta de Google está en el `<head>` de `index.html`, `privacidad.html` y `notas/*.html`. Antes se carga `js/base/00-consentimiento.js` (respeta "Rechazar" del aviso de cookies; publicidad de Google desactivada).
- Vistas de página: GA4 cuenta cada cambio de sección (la dirección cambia a `#semana-7/grandes/team-stats`, `#equipo-pumas-cu`…) y cada vista lleva su propio título, p. ej. "Semana 7 · 14 Grandes · Team stats · Yarda × Yarda".
- Enlaces compartidos llevan UTM (`utm_source=x`, `instagram` o `compartir`, `utm_medium=social`, `utm_campaign=yardaxyarda`) para saber de qué red llega cada visita.
- Eventos: `js/base/15-analitica-eventos.js`, `js/base/20-analitica-avanzada.js` y el script al final de cada nota.

| Evento | Cuándo | Parámetros |
|---|---|---|
| `enlace_entrada` | llega con un enlace a una sección o con UTM | `destino`, `fuente` |
| `semana_cambio` | elige una semana (selector o barra) | `semana`, `origen` |
| `conferencia_cambio` | 14 GRANDES / NACIONAL | `conferencia` |
| `pestana_cambio` | Overview / Player stats / Team stats | `pestana` |
| `team_stats_vista` | Tabla general / Insights | `vista` |
| `seccion_vista` | ve Resultados, Calendario, Tabla, Castigos, etc. | `seccion` |
| `lideres_ver_todos` | abre la lista completa de una categoría | `categoria` |
| `tabla_ordenar` | ordena una tabla | `tabla`, `columna` |
| `busqueda` / `filtro_cambio` | busca o filtra | `termino` / `filtro`, `valor` |
| `equipo_ver` | abre la página de un equipo | `equipo`, `conferencia` |
| `cronica_abrir` | abre una nota desde el sitio | `titulo` |
| `nota_abierta` · `nota_lectura` · `nota_leida` · `nota_tiempo` | lectura de una nota (25/50/75/100 %, segundos) | `nota`, `porcentaje`, `segundos`, `abierta_desde` |
| `compartir` | botón Compartir, X o historia IG | `destino`, `titulo`, `red` |
| `publicidad_impresion` / `publicidad_clic` | un anuncio se ve / recibe clic | `anunciante`, `ubicacion`, `post` |
| `video_reproducir` / `video_sonido` | play / activa el sonido | `video` |
| `credito_clic` | clic a un crédito de fotógrafo u otro enlace externo | `cuenta`, `url` |
| `menu_clic` | menú lateral | `opcion` |
| `consentimiento` | acepta / rechaza cookies | `decision` |

Todos llevan además `semana_actual` y `conferencia_actual`. Para verlos en informes, regístralos en GA4 → Administrar → Definiciones personalizadas (ámbito: evento).

## Aviso de privacidad

`privacidad.html` es una página independiente con el aviso de privacidad (datos de navegación, Google Analytics, publicidad, derechos ARCO) y botones para que el visitante acepte o rechace la medición. El correo de contacto es `clientes@yardaxyarda.com`: créalo en Hostinger (Correos electrónicos) o cámbialo en el archivo.

## Rankings

Las posiciones en líderes, páginas de equipo y gráficas son consecutivas (1, 2, 3, 4, 5…). Si dos jugadores empatan, va primero el que aparece primero en `data/semanaN.json`; para cambiar quién va antes, cambia el orden de las filas en el archivo.

## Versión de archivos (caché)

Para que los visitantes —y el caché de Hostinger— no se queden con estilos o código viejos, los archivos se cargan con un número de versión (`?v=20261022r`).
Cada vez que subas cambios de **código o estilos** (`css/`, `js/`), cambia ese número por uno nuevo (por ejemplo `20261029`) en:

- `js/cargar.js` → `const VERSION='…'`
- `index.html` → `css/styles.css?v=…`, `js/base/00-consentimiento.js?v=…` y `js/cargar.js?v=…`
- `privacidad.html` → `js/base/00-consentimiento.js?v=…`

Los datos (`data/*.json`) no necesitan versión: siempre se descargan frescos.
Si después de subir algo sigues viendo la versión anterior en Hostinger, en hPanel ve a **Rendimiento → CDN / Caché** y da clic en **Purgar caché**.

## Compartir en X e historia de Instagram

`js/base/19-compartir-redes.js` agrega los botones **Post en X** e **Historia IG** a un recuadro. Hoy están en el cuadro amarillo de la semana 7 (Alvarado y Chaib), configurado en `js/spotlight/17-semana7-redes-destacado.js`; para otra nota, copia ese archivo y cambia título, texto, imágenes y enlace.
- **X:** abre la ventana para publicar con el texto y el enlace `https://yardaxyarda.com/#semana-7/grandes/destacado`.
- **Historia IG:** crea una imagen vertical 1080×1920 con las fotos y el título, copia el enlace (para el sticker de enlace) y abre el menú de compartir del celular → Instagram → Historia. En computadora descarga la imagen.
- También están en **Resultados de la semana 7**, **Calendario de la semana 8** (14 Grandes y Nacional, en `js/semanas/16-redes-resultados-calendario.js`) y al final de la **nota de la Guerra Civil** (`notas/previa-guerra-civil.html`). En resultados y calendario la imagen de la historia se arma con los marcadores u horarios.
- Enlaces: `#semana-7/grandes/resultados`, `#semana-8/nacional/calendario`, `notas/previa-guerra-civil.html`.
- **Top 5 por posición** (Top QBs, RBs, WRs, Tackleador, Yds Mezcladas) en las semanas 4–7, 14 Grandes y Nacional: cada tarjeta tiene **Post en X** (con el top 5 en el texto) e **Historia IG**, que crea la imagen de la tabla (`js/spotlight/19-top5-redes.js`). Para agregar una semana, súmala a `SEMANAS`.
- Antes de compartir en Instagram se muestra una **vista previa** de la imagen con los botones "Compartir en Instagram" y "Descargar imagen".

### Visitas desde Instagram y otras redes

`js/base/00-consentimiento.js` detecta si la visita llega desde la app de Instagram (su navegador interno), Facebook, X, TikTok, WhatsApp o LinkedIn —por el navegador de la app, la página de origen (`l.instagram.com`, `t.co`…) o la etiqueta `utm_source`— y:
- hace que GA4 la cuente en el canal **Organic Social** con fuente `instagram` (aunque Instagram no mande la página de origen);
- envía el evento `llegada_red_social` (una vez por visita) con `red`, `metodo` (app / referencia / utm) y `en_app`;
- guarda las propiedades de usuario `red_origen` y `navegador_app`.

Dónde verlo: GA4 → Informes → Adquisición → **Adquisición de tráfico** (Grupo de canales = Organic Social; Fuente/medio = `instagram / social`) y Eventos → `llegada_red_social`.
Enlace recomendado para la biografía de Instagram: `https://yardaxyarda.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio`
