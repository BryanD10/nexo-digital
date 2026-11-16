/* Nexo Digital · botón "Quiero algo así" de las demos.
 * Dentro del modal del sitio avisa a la página principal; abierta sola, navega al formulario. */
(() => {
  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const service = link.dataset.cta || '';

      if (window.parent !== window) {
        const origin = window.location.origin === 'null' ? '*' : window.location.origin;
        window.parent.postMessage({ type: 'nexo-demo-cta', service }, origin);
        return;
      }

      window.location.href = `../index.html?servicio=${encodeURIComponent(service)}#contacto`;
    });
  });
})();
