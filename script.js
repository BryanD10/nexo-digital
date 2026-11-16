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

  const demoModal = document.querySelector('#demo-modal');
  const demoFrame = document.querySelector('#demo-frame');
  const demoTitle = document.querySelector('#demo-modal-title');
  const demoNewTab = document.querySelector('#demo-newtab');
  let demoOpener = null;

  function openDemo(src, title, opener) {
    if (!demoModal || !demoFrame) return;
    demoOpener = opener;
    demoTitle.textContent = title;
    demoFrame.title = `Demo interactiva: ${title}`;
    demoFrame.src = src;
    if (demoNewTab) demoNewTab.href = src;
    demoModal.showModal();
  }

  if (demoModal) {
    document.querySelector('#demo-close')?.addEventListener('click', () => demoModal.close());
    demoModal.addEventListener('click', (event) => {
      if (event.target === demoModal) demoModal.close();
    });
    demoModal.addEventListener('close', () => {
      demoFrame.src = 'about:blank';
      demoOpener?.focus();
    });
  }

  const projectModal = document.querySelector('#project-modal');
  const projectModalPreview = document.querySelector('#project-modal-preview');
  const modalTitle = document.querySelector('#project-modal-title');
  const modalType = document.querySelector('#project-modal-type');
  const modalDescription = document.querySelector('#project-modal-description');
  const modalClose = document.querySelector('.project-modal-close');

  if (projectModal && projectModalPreview && modalTitle && modalType && modalDescription) {
    document.querySelectorAll('.project-card').forEach((card) => {
      const copy = card.querySelector('.project-copy');
      const preview = card.querySelector('.project-preview');
      const title = copy?.querySelector('h3')?.textContent.trim();
      if (!copy || !preview || !title || copy.querySelector('.preview-open')) return;

      const openButton = document.createElement('button');
      openButton.className = 'preview-open';
      openButton.type = 'button';
      openButton.textContent = 'Ampliar vista previa';
      openButton.setAttribute('aria-label', `Ampliar vista previa: ${title}`);
      const actions = document.createElement('div');
      actions.className = 'project-actions';
      if (card.dataset.demo) {
        const demoButton = document.createElement('button');
        demoButton.className = 'demo-open';
        demoButton.type = 'button';
        demoButton.textContent = 'Probar demo';
        demoButton.setAttribute('aria-label', `Probar la demo interactiva: ${title}`);
        demoButton.addEventListener('click', () => openDemo(card.dataset.demo, title, demoButton));
        actions.append(demoButton);
      }
      actions.append(openButton);
      copy.append(actions);

      openButton.addEventListener('click', () => {
        modalTitle.textContent = title;
        modalType.textContent = copy.querySelector('.project-type')?.textContent.trim() || 'VISTA PREVIA';
        modalDescription.textContent = copy.querySelector('p')?.textContent.trim() || '';
        projectModalPreview.replaceChildren(preview.cloneNode(true));
        projectModal.showModal();
      });
    });

    modalClose?.addEventListener('click', () => projectModal.close());
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) projectModal.close();
    });
    projectModal.addEventListener('close', () => projectModalPreview.replaceChildren());
  }

  const assistantWidget = document.querySelector('#assistant-widget');
  const assistantToggle = document.querySelector('#assistant-launch');
  const assistantPanel = document.querySelector('#assistant-panel');
  const assistantClose = document.querySelector('.assistant-close');
  const serviceSelect = document.querySelector('#contact-service');

  if (assistantWidget && assistantToggle && assistantPanel) {
    const setAssistantOpen = (open, returnFocus = false) => {
      assistantPanel.hidden = !open;
      assistantToggle.setAttribute('aria-expanded', String(open));
      assistantToggle.setAttribute('aria-label', open
        ? 'Cerrar asistente Nexo'
        : 'Abrir asistente Nexo: ayuda rápida para elegir un servicio');
      if (open) assistantPanel.querySelector('.assistant-options button')?.focus();
      else if (returnFocus) assistantToggle.focus();
    };

    assistantToggle.addEventListener('click', () => {
      setAssistantOpen(assistantPanel.hidden);
    });
    assistantClose?.addEventListener('click', () => setAssistantOpen(false, true));

    assistantPanel.querySelectorAll('[data-service]').forEach((option) => {
      option.addEventListener('click', () => {
        if (serviceSelect) {
          serviceSelect.value = option.dataset.service;
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        setAssistantOpen(false);
        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), 450);
      });
    });

    document.addEventListener('click', (event) => {
      if (!assistantPanel.hidden && !assistantWidget.contains(event.target)) setAssistantOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !assistantPanel.hidden) setAssistantOpen(false, true);
    });
  }
})();
