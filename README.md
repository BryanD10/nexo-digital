# Nexo Digital

Sitio estático en español hecho con HTML, CSS y JavaScript, sin dependencias para instalar.

> Este repositorio es **independiente** de cualquier otro dominio (incluyendo masterfumigacioneswd.com). Es el código fuente propio de Nexo Digital.

## Publicar con GitHub Pages

1. Abre **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona **main** y la carpeta **/ (root)**.
4. Guarda los cambios.

El sitio quedará en: **https://bryand10.github.io/nexo-digital/**

Las rutas de CSS, JavaScript e imágenes son relativas para que funcionen bajo esa subcarpeta.

## Archivos principales

- `index.html`: textos y estructura de la página.
- `styles.css`: diseño adaptable, robot CSS con perspectiva 3D y ventanas de previsualización.
- `script.js`: menú móvil, formulario, atajos del robot y botones para ampliar las demos.
- `site-config.js`: correo o WhatsApp del negocio.
- `assets/`: imágenes de la página y capturas que agregues.
- `favicon.svg`: icono del sitio.
- `manus-routes.json`: manifiesto de la página usado por la vista previa de Manus.

El robot ofrece atajos hacia el formulario; no es un chatbot ni una IA.

## Agregar una previsualización de proyecto

1. Añade una captura autorizada a `assets/`, por ejemplo `assets/mi-proyecto.webp`.
2. En `index.html`, duplica un bloque `<article class="project-card">` dentro de `<div class="project-grid">`.
3. Conserva las clases `project-preview` y `project-copy`. Para una captura usa `<img src="assets/mi-proyecto.webp" alt="" loading="lazy" />` dentro de `project-preview`; actualiza también la categoría, el título y la descripción.
4. Guarda: `script.js` añade automáticamente el botón para ampliar la vista con su título y descripción.

La ventana muestra la captura ampliada; no ejecuta el sitio del proyecto dentro de la página. Presenta ejemplos conceptuales como demos y muestra proyectos de clientes solo con autorización y sin datos privados.

## Demos interactivas

La sección **Ejemplos visuales** abre cinco demos funcionales desde el botón «Probar demo». Cada una es una página independiente en `demos/`, con datos inventados y una cinta que lo aclara:

- `demos/clientes.html`: registro de pedidos con búsqueda, filtros, cambio de estado y alta de pedidos.
- `demos/facturas.html`: facturas con cobros pendientes, vencidas y pagadas, y vista previa de la factura.
- `demos/escritorio.html`: programa de escritorio con tablero de trabajos y agenda semanal.
- `demos/reportes.html`: reporte de ventas con periodo, categorías, gráfico y vista de tabla.
- `demos/web.html`: página de un estudio ficticio, con alternador escritorio/móvil.

Cada demo tiene en su cinta superior el botón **Quiero algo así**: dentro del sitio cierra la demo y lleva al formulario con el servicio ya elegido; si la demo se abre sola, navega a `index.html#contacto`. Para que funcione, el valor de `data-cta` debe coincidir con una opción del selector del formulario.

`demos/demo.css` comparte la base visual. Para agregar otra demo: crea el HTML en `demos/` y añade `data-demo="demos/tu-demo.html"` al `<article class="project-card">`; `script.js` agrega el botón solo.

## Configurar el contacto

Edita `site-config.js`:

```js
window.NEXO_CONFIG = {
  whatsappNumber: '50373039172', // código de país + número, solo dígitos
  contactEmail: 'tucorreo@tudominio.com',
};
```

El formulario abre **WhatsApp** con el mensaje ya escrito. Si no hay número, abre un borrador de **correo**. Si no hay ninguno de los dos, muestra un aviso y no envía nada.

## Abrir en local

Desde la carpeta del repositorio ejecuta:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador.

## Imagen para compartir

`assets/og-image.jpg` (1200 × 630) es la imagen que aparece al pegar el enlace en WhatsApp, Facebook o X. Los metadatos de `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`) usan la dirección completa `https://bryand10.github.io/nexo-digital/`. Si más adelante publicas en un dominio propio, cámbiala en esas cuatro líneas. Las redes guardan la imagen en caché: si la cambias, vuelve a pegar el enlace en el depurador de Facebook para actualizarla.

## Cambios en CSS o JavaScript

`index.html` y las demos enlazan los archivos con un número de versión (`styles.css?v=20261115`). Cuando modifiques `styles.css`, `script.js`, `site-config.js`, `demos/demo.css` o `demos/demo.js`, cambia ese número para que los visitantes reciban la versión nueva y no la guardada en el navegador.
