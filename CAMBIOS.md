# Cambios

## 22 nov 2026 · Barra del club entre las dos mallas

La versión anterior queda en el commit `32dd51f` ("malla interactiva"). No se borró nada.

**Nuevo**
- `club-bar.js`: barra sticky compartida con el león del club, el nombre y el cambio entre mallas. Para sumar otra página se agrega una línea al arreglo `PAGINAS`.
- `assets/club-leon-blanco.png`: león recortado de `propuesta-imagotipo-01-blanco.png` (Drive del club).
- `assets/favicon-64.png` y `assets/apple-touch-icon.png`: ícono de pestaña, sacado de `avatar-linkedin-club-finanzas-fae.png`.

**Modificado** (cada línea queda marcada con `[22 nov · barra del club]` y el valor anterior en comentario)
- `index.html`: carga `club-bar.js`; `nav.sections`, `.detail` y `scroll-padding-top` se corren bajo la barra con `var(--clubbar-h)`; enlace desde "Semestre tipo" a la malla semana a semana.
- `malla-curricular-fae-usach-2027.html`: carga `club-bar.js`; margen lateral de la barra alineado con `.app`.
