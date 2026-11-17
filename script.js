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
      const packageChoice = String(formData.get('package') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const businessEmail = String(config.contactEmail || '').trim();
      const whatsappNumber = String(config.whatsappNumber || '').replace(/\D/g, '');
      const subject = `Consulta para Nexo Digital: ${service}${packageChoice ? ` — ${packageChoice}` : ''}`;
      const body = [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Servicio de interés: ${service}`,
        ...(packageChoice ? [`Paquete de interés: ${packageChoice}`] : []),
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

  const projectModal = document.querySelector('#project-modal');
  const projectModalPreview = document.querySelector('#project-modal-preview');
  const modalTitle = document.querySelector('#project-modal-title');
  const modalType = document.querySelector('#project-modal-type');
  const modalDescription = document.querySelector('#project-modal-description');
  const modalClose = document.querySelector('.project-modal-close');

  if (projectModal && projectModalPreview && modalTitle && modalType && modalDescription) {
    const demoLibrary = window.NEXO_PROJECT_DEMOS || {};
    const initializeDemoTabs = () => {
      const root = projectModalPreview.querySelector('.demo-project');
      if (!root) return;
      root.querySelectorAll('[role="tab"][data-demo-tab]').forEach((tab) => {
        const name = tab.dataset.demoTab;
        const screen = root.querySelector(`[data-demo-screen="${name}"]`);
        if (!screen) return;
        tab.id = `${name}-tab`;
        tab.setAttribute('aria-controls', `${name}-panel`);
        screen.id = `${name}-panel`;
        screen.setAttribute('aria-labelledby', tab.id);
        screen.setAttribute('role', 'tabpanel');
        screen.hidden = tab.getAttribute('aria-selected') !== 'true';
      });
    };
    const syncDemoTabOrientation = () => {
      const mobile = window.innerWidth <= 760;
      projectModalPreview.querySelectorAll('[role="tablist"]').forEach((tablist) => {
        const horizontal = mobile || tablist.classList.contains('demo-web-tabs');
        tablist.setAttribute('aria-orientation', horizontal ? 'horizontal' : 'vertical');
      });
    };
    window.addEventListener('resize', syncDemoTabOrientation);
    const activateDemoTab = (button) => {
      const root = button.closest('.demo-project');
      const name = button.dataset.demoTab;
      if (!root || !name) return;
      const selectedTab = root.querySelector(`[role="tab"][data-demo-tab="${name}"]`);
      const selectedScreen = root.querySelector(`[data-demo-screen="${name}"]`);
      if (!selectedTab || !selectedScreen) return;
      root.querySelectorAll('[role="tab"][data-demo-tab]').forEach((tab) => {
        const selected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      root.querySelectorAll('[data-demo-screen]').forEach((screen) => {
        screen.hidden = screen === selectedScreen ? false : true;
      });
      selectedTab.focus({ preventScroll: true });
    };

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
      copy.append(openButton);

      openButton.addEventListener('click', () => {
        const demo = demoLibrary[card.dataset.projectDemo];
        modalTitle.textContent = title;
        modalType.textContent = copy.querySelector('.project-type')?.textContent.trim() || 'VISTA PREVIA';
        modalDescription.textContent = demo?.description || copy.querySelector('p')?.textContent.trim() || '';
        if (demo?.markup) {
          projectModalPreview.innerHTML = demo.markup;
          initializeDemoTabs();
          syncDemoTabOrientation();
        } else {
          projectModalPreview.replaceChildren(preview.cloneNode(true));
        }
        projectModal.showModal();
      });
    });

    projectModalPreview.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const requestedTab = target?.closest('[data-demo-tab]');
      if (requestedTab && projectModalPreview.contains(requestedTab)) {
        activateDemoTab(requestedTab);
        return;
      }

      const contactButton = target?.closest('[data-demo-action="contact"]');
      if (contactButton) {
        const service = contactButton.closest('.demo-project')?.dataset.demoService;
        projectModal.close();
        if (serviceSelect) {
          const optionExists = Array.from(serviceSelect.options).some((option) => option.value === service);
          serviceSelect.value = optionExists ? service : 'Necesito orientación';
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), 450);
      }
    });

    projectModalPreview.addEventListener('keydown', (event) => {
      const currentTab = event.target instanceof Element
        ? event.target.closest('[role="tab"][data-demo-tab]')
        : null;
      if (!currentTab) return;
      const root = currentTab.closest('.demo-project');
      const orientation = currentTab.closest('[role="tablist"]')?.getAttribute('aria-orientation');
      const tabs = Array.from(root?.querySelectorAll('[role="tab"][data-demo-tab]') || []);
      const index = tabs.indexOf(currentTab);
      if (index < 0) return;
      let nextIndex = index;
      if ((orientation === 'vertical' && event.key === 'ArrowDown') || (orientation !== 'vertical' && event.key === 'ArrowRight')) nextIndex = (index + 1) % tabs.length;
      else if ((orientation === 'vertical' && event.key === 'ArrowUp') || (orientation !== 'vertical' && event.key === 'ArrowLeft')) nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activateDemoTab(tabs[nextIndex]);
    });

    projectModalPreview.addEventListener('input', (event) => {
      const input = event.target instanceof Element ? event.target.closest('[data-demo-filter]') : null;
      if (!input) return;
      const screen = input.closest('[data-demo-screen]');
      if (!screen) return;
      const query = input.value.trim().toLocaleLowerCase('es');
      const rows = Array.from(screen.querySelectorAll('[data-demo-row], .demo-client-card'));
      let visibleRows = 0;
      rows.forEach((row) => {
        const searchable = `${row.dataset.demoSearch || ''} ${row.textContent || ''}`.toLocaleLowerCase('es');
        row.hidden = Boolean(query) && !searchable.includes(query);
        if (!row.hidden) visibleRows += 1;
      });
      let emptyState = screen.querySelector('.demo-search-empty');
      if (!emptyState) {
        emptyState = document.createElement('p');
        emptyState.className = 'demo-search-empty';
        emptyState.setAttribute('role', 'status');
        emptyState.textContent = 'No encontramos registros con esa búsqueda.';
        screen.append(emptyState);
      }
      emptyState.hidden = !query || visibleRows > 0;
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
  const packageSelect = document.querySelector('#contact-package');

  document.querySelectorAll('[data-package-choice]').forEach((link) => {
    link.addEventListener('click', () => {
      const choice = link.dataset.packageChoice || '';
      if (packageSelect) packageSelect.value = choice;
      if (serviceSelect) serviceSelect.value = 'Página web';
      window.setTimeout(() => packageSelect?.focus({ preventScroll: true }), 450);
    });
  });

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
