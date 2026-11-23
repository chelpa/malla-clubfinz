/*
 * Barra del Club de Finanzas FAE USACH · compartida por todas las mallas
 * [nuevo · 22 nov 2026]
 *
 * Uso: en cada página, justo después de <body>:
 *     <script src="club-bar.js"></script>
 *
 * Para sumar una página nueva, agrega una línea a PAGINAS. Nada más.
 *
 * La barra define --clubbar-h (alto de la barra). Los elementos sticky de cada
 * página usan top: var(--clubbar-h, 0px) para quedar justo debajo. Si el
 * script no carga, el valor cae a 0 y la página se ve igual que antes.
 *
 * Variables opcionales en el :root de cada página, para alinear la barra con
 * el ancho de su contenido:
 *     --clubbar-max  ancho máximo (por defecto 1520px)
 *     --clubbar-pad  margen lateral (por defecto 16px)
 */
(function () {
  'use strict';

  var PAGINAS = [
    { href: 'index.html', largo: 'Malla flexible', detalle: '5 años', corto: 'Flexible' },
    { href: 'malla-curricular-fae-usach-2027.html', largo: '1er semestre 2027', detalle: '16 semanas', corto: '1er semestre' },
    // [23 nov · actividades] carta Gantt v11 del Fondo León con calendario
    { href: 'actividades.html', largo: 'Actividades 2027', detalle: 'carta Gantt', corto: 'Actividades' }
  ];
  var SITIO = 'https://clubfinanzasfae.cl';

  // Rutas relativas al propio script, así funciona aunque una página viva en una subcarpeta.
  var script = document.currentScript;
  var base = new URL('.', (script && script.src) || location.href);
  var asset = function (p) { return new URL(p, base).href; };

  // "/", "/index.html", "/malla.html" y "/malla" (Cloudflare quita el .html) se comparan igual.
  var norm = function (path) { return path.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '/'); };
  var aqui = norm(location.pathname);

  var CSS = [
    ':root{--clubbar-h:56px}',
    '.clubbar{position:sticky;top:0;z-index:40;height:var(--clubbar-h);background:rgba(11,11,10,.94);',
    '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid rgba(201,168,76,.35);',
    'color:#F3F1EA;font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}',
    '.clubbar__in{box-sizing:border-box;max-width:var(--clubbar-max,1520px);height:100%;margin:0 auto;',
    'padding:0 var(--clubbar-pad,16px);display:flex;align-items:center;justify-content:space-between;gap:12px}',
    '.clubbar__brand{display:flex;align-items:center;gap:10px;min-width:0;color:inherit;text-decoration:none;border-radius:6px}',
    '.clubbar__brand img{display:block;height:32px;width:auto}',
    '.clubbar__name{display:flex;flex-direction:column;gap:2px;line-height:1.1}',
    '.clubbar__name b{font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}',
    '.clubbar__name span{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.2em;color:#C9A84C}',
    '.clubbar__tabs{display:flex;gap:2px;padding:3px;border:1px solid rgba(243,241,234,.12);border-radius:999px}',
    '.clubbar__tabs a{display:flex;align-items:baseline;gap:6px;padding:7px 14px;border-radius:999px;font-size:13.5px;',
    'font-weight:500;line-height:1.2;color:#A6A194;text-decoration:none;white-space:nowrap;transition:color .15s,background .15s}',
    '.clubbar__tabs small{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:10.5px;opacity:.8}',
    '.clubbar__tabs a:hover{color:#F3F1EA;background:rgba(243,241,234,.07)}',
    '.clubbar__tabs a[aria-current="page"]{background:#C9A84C;color:#0B0B0A}',
    '.clubbar a:focus-visible{outline:2px solid #C9A84C;outline-offset:2px}',
    '.clubbar .c-corto{display:none}',
    // [23 nov · actividades] antes 760px: con tres pestañas el nombre se oculta antes
    '@media (max-width:960px){.clubbar__name{display:none}}',
    '@media (max-width:760px){:root{--clubbar-h:52px}.clubbar__name,.clubbar__tabs small{display:none}.clubbar__brand img{height:28px}}',
    '@media (max-width:420px){.clubbar .c-largo{display:none}.clubbar .c-corto{display:inline}.clubbar__tabs a{padding:7px 11px;font-size:13px}}',
    '@media (prefers-reduced-motion:reduce){.clubbar__tabs a{transition:none}}',
    '@media print{.clubbar{display:none}:root{--clubbar-h:0px}}'
  ].join('');

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  function montar() {
    if (document.querySelector('.clubbar')) return;

    document.head.appendChild(el('style', { id: 'clubbar-css' }, CSS));

    // Favicon del club, solo si la página no trae uno propio.
    if (!document.querySelector('link[rel~="icon"]')) {
      document.head.appendChild(el('link', { rel: 'icon', type: 'image/png', href: asset('assets/favicon-64.png') }));
      document.head.appendChild(el('link', { rel: 'apple-touch-icon', href: asset('assets/apple-touch-icon.png') }));
    }

    var tabs = PAGINAS.map(function (p) {
      var url = new URL(p.href, base);
      var actual = norm(url.pathname) === aqui;
      return '<a href="' + url.href + '"' + (actual ? ' aria-current="page"' : '') + '>' +
        '<span class="c-largo">' + p.largo + '</span><span class="c-corto">' + p.corto + '</span>' +
        (p.detalle ? '<small>' + p.detalle + '</small>' : '') + '</a>';
    }).join('');

    var barra = el('div', { class: 'clubbar' },
      '<div class="clubbar__in">' +
        '<a class="clubbar__brand" href="' + SITIO + '" aria-label="Club de Finanzas FAE USACH: ir al sitio del club">' +
          '<img src="' + asset('assets/club-leon-blanco.png') + '" alt="" width="39" height="32">' +
          '<span class="clubbar__name"><b>Club de Finanzas</b><span>FAE USACH</span></span>' +
        '</a>' +
        '<nav class="clubbar__tabs" aria-label="Mallas del club">' + tabs + '</nav>' +
      '</div>');

    document.body.insertBefore(barra, document.body.firstChild);
  }

  if (document.body) montar();
  else document.addEventListener('DOMContentLoaded', montar);
})();
