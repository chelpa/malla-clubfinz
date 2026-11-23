# Cambios

## 23 nov 2026 · Panel de detalle sobre la barra

- `actividades.html`: el panel de detalle quedaba bajo la barra del club y tapaba el título y el botón de cerrar. Ahora va encima (z-index 49, antes 31). Marcado con `[23 nov · panel]`.

## 23 nov 2026 · Columna izquierda en celular

- `malla-curricular-fae-usach-2027.html` y `actividades.html`: bajo 600px la columna fija de la izquierda pasa a ~112–118px; se ocultan el subtítulo y el conteo de sesiones (1er semestre) y el responsable (Actividades), que siguen en el panel de detalle. Marcado con `[23 nov · celular]`.

## 23 nov 2026 · Sección Actividades (carta Gantt v11)

La versión anterior queda en el commit `9931490`. No se borró nada.

**Nuevo**
- `actividades.html`: la carta Gantt v11 del Fondo León como página interactiva, con vistas Gantt, Calendario y Lista, filtros por hito, dirección y gasto, botón «+ Google Calendar» por fecha y copia del .ics. Las fechas de sesión son estimadas desde la semana marcada (≈).

**Modificado** (marcado con `[23 nov · actividades]`)
- `club-bar.js`: tercera pestaña «Actividades 2027»; el nombre del club se oculta desde 960px en vez de 760px para que quepan las tres pestañas.

## 22 nov 2026 · Barra del club entre las dos mallas

La versión anterior queda en el commit `32dd51f` ("malla interactiva"). No se borró nada.

**Nuevo**
- `club-bar.js`: barra sticky compartida con el león del club, el nombre y el cambio entre mallas. Para sumar otra página se agrega una línea al arreglo `PAGINAS`.
- `assets/club-leon-blanco.png`: león recortado de `propuesta-imagotipo-01-blanco.png` (Drive del club).
- `assets/favicon-64.png` y `assets/apple-touch-icon.png`: ícono de pestaña, sacado de `avatar-linkedin-club-finanzas-fae.png`.

**Modificado** (cada línea queda marcada con `[22 nov · barra del club]` y el valor anterior en comentario)
- `index.html`: carga `club-bar.js`; `nav.sections`, `.detail` y `scroll-padding-top` se corren bajo la barra con `var(--clubbar-h)`; enlace desde "Semestre tipo" a la malla semana a semana.
- `malla-curricular-fae-usach-2027.html`: carga `club-bar.js`; margen lateral de la barra alineado con `.app`.
