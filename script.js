(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
      navigation.classList.toggle('is-open', !expanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menú');
        navigation.classList.remove('is-open');
      });
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const config = window.NEXO_CONFIG || {};

  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.classList.remove('is-error');

      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const service = String(formData.get('service') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const businessEmail = String(config.contactEmail || '').trim();
      const whatsappNumber = String(config.whatsappNumber || '').replace(/\D/g, '');
      const subject = `Consulta para Nexo Digital: ${service}`;
      const body = [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Servicio de interés: ${service}`,
        '',
        'Mensaje:',
        message,
      ].join('\n');

      if (businessEmail) {
        window.location.href = `mailto:${encodeURIComponent(businessEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = 'Se preparó tu correo. Revisa tu aplicación de email para enviarlo.';
        return;
      }

      if (whatsappNumber) {
        const whatsappText = `${subject}\n\n${body}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank', 'noopener,noreferrer');
        status.textContent = 'Se abrió WhatsApp con los detalles de tu solicitud.';
        return;
      }

      status.classList.add('is-error');
      status.textContent = 'Aún falta configurar el correo o WhatsApp de recepción del negocio; tu solicitud no se ha enviado.';
    });
  }
})();
