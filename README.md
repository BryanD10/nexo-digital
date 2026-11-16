# Nexo Digital

Sitio estático en español hecho con HTML, CSS y JavaScript, sin instalar dependencias.

> Este repositorio es **independiente** de cualquier otro dominio (incluyendo masterfumigacioneswd.com). Es el código fuente propio de Nexo Digital.

## Ver el sitio en vivo (GitHub Pages)

1. Ve a **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Guarda

El sitio quedará en:

**https://bryand10.github.io/nexo-digital/**

## Archivos principales

- `index.html` – textos y estructura
- `styles.css` – diseño completo
- `script.js` – menú móvil y formulario
- `site-config.js` – correo o WhatsApp
- `assets/` – imágenes (sube `hero-systems.webp` y `process-flow.webp` aquí)
- `favicon.svg`

## Completar las imágenes

Para que se vean las ilustraciones:

1. Entra al repo → **Add file → Upload files**
2. Arrastra desde el ZIP original:
   - `public/assets/hero-systems.webp`
   - `public/assets/process-flow.webp`
3. Ponlos dentro de la carpeta `assets/`

## Configurar el contacto

Edita `site-config.js` y pon **solo una** opción real:

```js
window.NEXO_CONFIG = {
  contactEmail: 'tucorreo@tudominio.com',
  whatsappNumber: '',
};
```

o

```js
window.NEXO_CONFIG = {
  contactEmail: '',
  whatsappNumber: '5215512345678',
};
```

## Abrir en local

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000
