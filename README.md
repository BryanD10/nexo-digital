# Nexo Digital

Sitio estático en español hecho con HTML, CSS y JavaScript, sin instalar dependencias.

## Ver el sitio en vivo

Una vez habilitado GitHub Pages (Settings → Pages → Source: Deploy from a branch → main / root), el sitio estará en:

**https://bryand10.github.io/nexo-digital/**

## Abrir en tu computadora

1. Clona el repositorio o descarga el ZIP.
2. Abre una terminal dentro de la carpeta.
3. Ejecuta: `python3 -m http.server 8000`
4. En tu navegador, visita `http://localhost:8000`.

## Archivos principales

- `index.html`: textos, secciones y contenido del sitio.
- `styles.css`: colores, diseño y adaptación a celular.
- `script.js`: menú móvil, año del pie y comportamiento del formulario.
- `site-config.js`: correo o WhatsApp del negocio.
- `assets/`: ilustraciones utilizadas en la página.
- `favicon.svg`: icono del sitio.

## Configurar el contacto

Antes de publicar, abre `site-config.js` y llena **solo una** opción con datos reales:

```js
window.NEXO_CONFIG = {
  contactEmail: 'tucorreo@tudominio.com',
  whatsappNumber: '',
};
```

O bien configura WhatsApp con el prefijo internacional y solo dígitos (sin `+`, espacios ni guiones), por ejemplo `5215512345678`:

```js
window.NEXO_CONFIG = {
  contactEmail: '',
  whatsappNumber: '5215512345678',
};
```

El formulario prepara un borrador en la aplicación de correo o abre WhatsApp; no almacena ni envía los datos a una base de datos.
