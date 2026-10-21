# Yarda × Yarda

Estadísticas de fútbol americano universitario de la ONEFA · Liga Mayor 2026 (conferencias **14 Grandes** y **Nacional**): líderes por semana, estadísticas de jugadores y equipos, tablas generales, resultados, calendario y páginas de cada equipo con su roster.

Sitio estático: se publica en GitHub Pages tal cual, **sin compilar nada**.

## Estructura

```
index.html              Estructura de la página (HTML)
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
