# Nexo Digital

Sitio estático en español para promocionar páginas web, tiendas en línea, automatizaciones y sistemas de registro y control.

> Este repositorio es independiente de otros dominios, incluido `masterfumigacioneswd.com`; contiene el código fuente de Nexo Digital.

## Publicar con GitHub Pages

El repositorio está preparado para publicarse desde `main` y la carpeta `/ (root)` en **Settings → Pages**. URL de Pages: <https://bryand10.github.io/nexo-digital/>.

Las rutas de estilos, scripts e imágenes son relativas para que funcionen bajo `/nexo-digital/`.

## Paquetes de páginas web

| Paquete | Renovación anual indicada |
| --- | ---: |
| Básico emprendedor | $120 |
| Mediano negocio | $150 |
| Empresarial | $220 |
| E-Commerce completo | $250 |

Son importes de renovación anual, no el precio inicial de diseño y puesta en marcha. La referencia no especifica la moneda. Para Básico y Mediano, indica dominio + hosting; para Empresarial y E-Commerce, no detalla el alcance de la renovación. Confirma esos puntos al cotizar.

## Archivos principales

- `index.html`: contenido de la página, servicios, paquetes y portafolio.
- `styles.css`: diseño del sitio, navegación adaptable y robot visual.
- `project-demos.css` y `project-demos.js`: seis demos conceptuales que se abren desde el portafolio.
- `script.js`: menú, formulario, atajos del robot, navegación y búsquedas de ejemplo.
- `site-config.js`: configuración existente de correo o WhatsApp; se conserva al actualizar la página.
- `assets/`: imagen para compartir y otros recursos visuales.
- `favicon.svg`: icono del sitio.
- `manus-routes.json`: manifiesto utilizado por la vista previa de Manus.
- `demos/`: demos HTML independientes que ya estaban en el repositorio y se conservan.

## Abrir en tu computadora

Desde la carpeta del repositorio ejecuta:

```bash
python3 -m http.server 8000
```

Después visita <http://localhost:8000>.

## Contacto

La versión del repositorio ya tiene configurado el canal de contacto en `site-config.js`. Conserva los datos actuales al editar otros archivos; el formulario prepara el mensaje en correo o WhatsApp y no almacena las solicitudes en una base de datos.

## Sobre los ejemplos

El portafolio incluye ejemplos ficticios de una panadería y un taller, además de pantallas conceptuales de pedidos, facturación, aplicación local, tablero de ventas y automatización. No son proyectos reales ni sistemas conectados. La demo de facturación no emite documentos fiscales válidos. Revisa las pantallas en `project-demos.js`; cambia los ejemplos únicamente si tienes datos autorizados y marca las cifras ficticias como ilustrativas.

Al cambiar CSS o JavaScript, incrementa el número `v=20261117` de las rutas de recursos en `index.html` para que visitantes reciban la versión nueva y no archivos guardados en caché.
