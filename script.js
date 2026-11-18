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
      if (!name || !email || !service || !message) { status.classList.add('is-error'); status.textContent='Completa los campos con datos válidos.'; return; }
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

      if (whatsappNumber) {
        window.open('https://wa.me/'+whatsappNumber+'?text='+encodeURIComponent(subject+'\n\n'+body), '_blank', 'noopener,noreferrer');
        status.textContent = 'Se preparó tu solicitud en WhatsApp. Revisa el mensaje y pulsa Enviar allí.';
        return;
      }
      if (businessEmail) {
        window.location.href = `mailto:${encodeURIComponent(businessEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = 'Se preparó tu correo. Revisa tu aplicación de email para enviarlo.';
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
  const modalKicker = document.querySelector('.project-modal-kicker');
  const modalNote = document.querySelector('#project-demo-note');
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
      projectModalPreview.scrollTop = 0;
      selectedTab.focus({ preventScroll: true });
    };
    const updateDemoInvoice = (form) => {
      if (!form) return;
      const amounts = Array.from(form.querySelectorAll('[data-demo-invoice-amount]'))
        .map((input) => Math.max(0, Number(input.value) || 0));
      const total = amounts.reduce((sum, amount) => sum + amount, 0);
      const totalOutput = form.querySelector('[data-demo-invoice-total]');
      if (totalOutput) totalOutput.textContent = `$ ${new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(total)}`;
      const concept = form.querySelector('[data-demo-invoice-concept]')?.value.trim();
      const conceptOutput = form.querySelector('[data-demo-invoice-line-label]');
      if (conceptOutput) conceptOutput.textContent = concept || 'Concepto de muestra';
    };
    const updateDemoAnalytics = (selector) => {
      const root = selector?.closest('.demo-project');
      const points = Array.from(root?.querySelectorAll('[data-demo-sales-point]') || []);
      const point = points[Number(selector?.value)];
      if (!root || !point) return;
      points.forEach((item) => item.classList.toggle('is-active', item === point));
      const metrics = {
        sales: point.dataset.sales,
        orders: point.dataset.orders,
        average: point.dataset.average,
        goal: point.dataset.goal,
      };
      Object.entries(metrics).forEach(([name, value]) => {
        const metric = root.querySelector(`[data-demo-analytics-kpi="${name}"]`);
        const output = metric?.querySelector(':scope > strong');
        if (output && value) output.textContent = value;
      });
      const salesKpi = root.querySelector('[data-demo-analytics-kpi="sales"]');
      const salesLabel = salesKpi?.querySelector('.demo-kpi-head > span:first-child');
      const salesNote = salesKpi?.querySelector(':scope > small');
      if (salesLabel) salesLabel.textContent = `Ventas de ${point.dataset.month.toLocaleLowerCase('es')}`;
      if (salesNote) salesNote.textContent = point.dataset.note || 'Muestra ilustrativa';
      const monthOutput = root.querySelector('[data-demo-analytics-month-output]');
      if (monthOutput) monthOutput.textContent = `${point.dataset.month} · ${point.dataset.note || 'muestra'}`;
    };
    const formatMareaPrice = amount => new Intl.NumberFormat('es-SV', {style:'currency', currency:'USD'}).format(amount)+' USD';
    const updateMareaEstimate = (root) => {
      const output = root?.querySelector('[data-demo-hotel-estimate]');
      if (!output) return;
      const start = root.querySelector('[data-demo-hotel-start]')?.value;
      const end = root.querySelector('[data-demo-hotel-end]')?.value;
      if (!start || !end) {
        output.textContent = 'Elige fechas para estimar el total de muestra.';
        return;
      }
      const startTime = Date.parse(`${start}T00:00:00Z`);
      const endTime = Date.parse(`${end}T00:00:00Z`);
      if (!(endTime > startTime)) {
        output.textContent = 'La salida debe ser posterior a la entrada.';
        return;
      }
      const nights = Math.round((endTime - startTime) / 86400000);
      const rate = Number(root.dataset.selectedRoomPrice) || 0;
      output.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'} × ${formatMareaPrice(rate)} = ${formatMareaPrice(rate * nights)} · estimación ficticia`;
    };

    document.querySelectorAll('.project-card').forEach((card) => {
      const copy = card.querySelector('.project-copy');
      const preview = card.querySelector('.project-preview');
      const title = copy?.querySelector('h3')?.textContent.trim();
      if (!copy || !title || (!preview && !demoLibrary[card.dataset.projectDemo]?.markup) || copy.querySelector('.preview-open')) return;

      const openButton = document.createElement('button');
      openButton.className = 'preview-open';
      openButton.type = 'button';
      const websiteDemo = demoLibrary[card.dataset.projectDemo]?.kind === 'website' || card.dataset.projectDemo === 'website';
      openButton.textContent = websiteDemo ? 'Probar sitio' : 'Probar demo';
      openButton.setAttribute('aria-label', `Ampliar vista previa: ${title}`);
      copy.append(openButton);

      openButton.addEventListener('click', () => {
        const demo = demoLibrary[card.dataset.projectDemo];
        const isWebsiteDemo = demo?.kind === 'website' || card.dataset.projectDemo === 'website';
        modalTitle.textContent = title;
        modalType.textContent = copy.querySelector('.project-type')?.textContent.trim() || 'VISTA PREVIA';
        modalDescription.textContent = demo?.description || copy.querySelector('p')?.textContent.trim() || '';
        if (modalKicker) modalKicker.textContent = isWebsiteDemo ? 'SITIO WEB · PRUEBA INTERACTIVA' : 'DEMO VISUAL · PRUEBA INTERACTIVA';
        if (modalNote) modalNote.textContent = isWebsiteDemo
          ? 'Marca y datos ficticios. Las interacciones son locales: no se procesan compras, no se envían reservas ni se contacta a ningún negocio.'
          : 'Datos ficticios. Las acciones solo cambian esta muestra; no se guardan registros ni se conectan servicios externos.';
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

      const galleryButton = target?.closest('[data-demo-gallery-step]');
      if (galleryButton) {
        const gallery = galleryButton.closest('[data-demo-room-gallery]');
        const photo = gallery?.querySelector('[data-demo-room-photo]');
        const images = gallery?.dataset.demoGallerySrcs?.split('|').filter(Boolean) || [];
        const alts = gallery?.dataset.demoGalleryAlts?.split('|') || [];
        if (!gallery || !photo || !images.length) return;
        const current = Number(gallery.dataset.demoGalleryIndex) || 0;
        const step = Number(galleryButton.dataset.demoGalleryStep) || 1;
        const next = (current + step + images.length) % images.length;
        gallery.dataset.demoGalleryIndex = String(next);
        photo.src = images[next];
        photo.alt = alts[next] || 'Fotografía de habitación de muestra';
        const count = gallery.querySelector('[data-demo-gallery-count]');
        if (count) count.textContent = `${next + 1} / ${images.length}`;
        return;
      }

      const roomButton = target?.closest('[data-demo-room-select]');
      if (roomButton) {
        const root = roomButton.closest('.demo-project');
        const roomName = roomButton.dataset.demoRoomSelect || 'Habitación de muestra';
        if (!root) return;
        root.dataset.selectedRoom = roomName;const guestSelect=root.querySelector('[data-demo-hotel-guests]');const capacity=Number(roomButton.dataset.demoRoomCapacity)||2;if(guestSelect){const prior=Number(guestSelect.value)||2;guestSelect.innerHTML=Array.from({length:capacity},(_,i)=>'<option '+(i+1===Math.min(prior,capacity)?'selected':'')+'>'+(i+1)+'</option>').join('');}
        root.querySelectorAll('[data-demo-room-select]').forEach((button) => {
          const selected = button === roomButton;
          button.setAttribute('aria-pressed', String(selected));
          button.closest('.marea-room-card')?.classList.toggle('is-selected', selected);
          button.innerHTML = selected ? 'Elegida <span>✓</span>' : 'Elegir esta suite <span>↗</span>';
        });
        const feedback = root.querySelector('[data-demo-room-feedback]');
        const summary = root.querySelector('[data-demo-room-summary]');
        const price = Number(roomButton.dataset.demoRoomPrice) || 0;
        root.dataset.selectedRoomPrice = String(price);
        const priceOutput = root.querySelector('[data-demo-selected-rate]');
        if (priceOutput) priceOutput.textContent = formatMareaPrice(price);
        if (feedback) feedback.textContent = `${roomName} seleccionada · solo muestra`;
        if (summary) summary.textContent = roomName;
        const result = root.querySelector('[data-demo-hotel-result]');
        if (result) result.textContent = `Suite seleccionada: ${roomName}. Todavía no se ha reservado nada.`;
        updateMareaEstimate(root);
        return;
      }

      const hotelCheckButton = target?.closest('[data-demo-hotel-check]');
      if (hotelCheckButton) {
        const root = hotelCheckButton.closest('.demo-project');
        const start = root?.querySelector('[data-demo-hotel-start]')?.value;
        const end = root?.querySelector('[data-demo-hotel-end]')?.value;
        const guests = root?.querySelector('[data-demo-hotel-guests]')?.value || '2';
        const room = root?.dataset.selectedRoom || 'Suite Marea';
        const output = root?.querySelector('[data-demo-hotel-result]');
        if (!output) return;
        if (!start || !end) output.textContent = `Elige entrada y salida para preparar una consulta de muestra para ${room}.`;
        else if (end <= start) output.textContent = 'La fecha de salida debe ser posterior a la fecha de entrada.';
        else {
          const formatDate = (value) => new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`));
          const guestLabel = Number(guests) === 1 ? 'huésped' : 'huéspedes';
          const nights = Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000);
          const rate = Number(root.dataset.selectedRoomPrice) || 0;
          output.textContent = `Consulta de prueba: ${room}, ${formatDate(start)}–${formatDate(end)}, ${guests} ${guestLabel}, ${nights} ${nights === 1 ? 'noche' : 'noches'} · total estimado ${formatMareaPrice(rate * nights)}. No se reservó nada.`;
        }
        updateMareaEstimate(root);
        return;
      }

      const addToBagButton = target?.closest('[data-demo-add-to-bag]');
      if (addToBagButton) {
        const root = addToBagButton.closest('.demo-project');
        const card = addToBagButton.closest('[data-demo-product-card]');
        const countOutput = root?.querySelector('[data-demo-bag-count]');
        if (!root || !countOutput) return;
        const nextCount = (Number(root.dataset.demoBagCount) || 0) + 1;
        root.dataset.demoBagCount = String(nextCount);
        countOutput.textContent = String(nextCount);
        const productName = addToBagButton.dataset.demoAddToBag || 'Artículo de muestra';
        const selection = card?.querySelector('[data-demo-product-size]')?.value;
        const status = root.querySelector('[data-demo-bag-status]');
        if (status) status.textContent = `La bolsa de muestra incluye ${productName}${selection ? ` · ${selection}` : ''}. No se realiza ninguna compra.`;
        addToBagButton.innerHTML = 'Agregado a la muestra <span>✓</span>';
        return;
      }

      const restaurantPreviewButton = target?.closest('[data-demo-restaurant-preview]');
      if (restaurantPreviewButton) {
        const root = restaurantPreviewButton.closest('.demo-project');
        const date = root?.querySelector('[data-demo-reservation-date]')?.value;
        const time = root?.querySelector('[data-demo-reservation-time]')?.selectedOptions[0]?.textContent || '7:00 p. m.';
        const guests = root?.querySelector('[data-demo-reservation-guests]')?.selectedOptions[0]?.textContent || '2 personas';
        const name = root?.querySelector('[data-demo-reservation-name]')?.value.trim() || 'Invitado/a de muestra';
        const output = root?.querySelector('[data-demo-restaurant-result]');
        if (!output) return;
        if (!date) output.textContent = 'Elige un día para ver la confirmación de prueba. No se contactará al restaurante.';
        else {
          const formattedDate = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long' }).format(new Date(`${date}T12:00:00`));
          output.textContent = `Vista previa: ${name}, ${guests}, ${formattedDate} a las ${time} — no se envió ni reservó nada.`;
        }
        return;
      }

      const runFlowButton = target?.closest('[data-demo-run-flow]');
      if (runFlowButton) {
        const root = runFlowButton.closest('.demo-project');
        const nodes = Array.from(root?.querySelectorAll('#flow-builder-panel .demo-flow-node') || []);
        const statusOutput = root?.querySelector('[data-demo-run-status]');
        if (!nodes.length || !statusOutput) return;
        runFlowButton.disabled = true;
        runFlowButton.textContent = 'Ejecutando muestra…';
        nodes.forEach((node, index) => {
          node.classList.remove('is-run-complete');
          const mark = node.querySelector(':scope > i');
          if (mark) mark.textContent = index === nodes.length - 1 ? '↗' : '✓';
          window.setTimeout(() => {
            if (!node.isConnected) return;
            node.classList.add('is-run-complete');
            if (mark) mark.textContent = '✓';
            const stepName = node.querySelector('b')?.textContent.trim() || `Paso ${index + 1}`;
            statusOutput.textContent = `Paso ${index + 1} de ${nodes.length}: ${stepName} · simulación local`;
            if (index === nodes.length - 1) {
              runFlowButton.disabled = false;
              runFlowButton.textContent = 'Simular de nuevo ↻';
              statusOutput.textContent = 'Recorrido de ejemplo completado · no se envió nada.';
            }
          }, index * 480);
        });
        return;
      }

      const recalculateButton = target?.closest('[data-demo-invoice-recalc]');
      if (recalculateButton) {
        updateDemoInvoice(recalculateButton.closest('.demo-invoice-form'));
        return;
      }

      const orderStatusButton = target?.closest('[data-demo-order-status]');
      if (orderStatusButton) {
        const row = orderStatusButton.closest('tr');
        const badge = row?.querySelector('.demo-status');
        const label = orderStatusButton.dataset.nextLabel || 'Listo';
        const tone = orderStatusButton.dataset.nextTone || 'green';
        if (!badge) return;
        badge.className = `demo-status${tone === 'green' ? '' : ` demo-status-${tone}`}`;
        const indicator = document.createElement('i');
        badge.replaceChildren(indicator, document.createTextNode(label));
        badge.setAttribute('aria-live', 'polite');
        const folio = row.querySelector('td b')?.textContent.trim() || 'pedido';
        const nextLabel = label === 'Preparar' ? 'Listo' : label === 'Listo' ? 'Entregado' : '';
        if (nextLabel) {
          orderStatusButton.dataset.nextLabel = nextLabel;
          orderStatusButton.dataset.nextTone = 'green';
          orderStatusButton.textContent = nextLabel === 'Listo' ? 'Marcar listo' : 'Marcar entregado';
          orderStatusButton.setAttribute('aria-label', `Marcar ${folio} como ${nextLabel.toLocaleLowerCase('es')}`);
        } else {
          orderStatusButton.disabled = true;
          orderStatusButton.textContent = 'Completado';
          orderStatusButton.setAttribute('aria-label', `${folio} entregado en la demostración`);
        }
        return;
      }

      const receiveStockButton = target?.closest('[data-demo-stock-add]');
      if (receiveStockButton) {
        const row = receiveStockButton.closest('tr');
        const quantity = row?.querySelector('[data-demo-stock-quantity]');
        const badge = row?.querySelector('[data-demo-stock-status] .demo-status');
        if (!quantity || !badge) return;
        const updated = (Number(quantity.textContent) || 0) + (Number(receiveStockButton.dataset.demoStockAdd) || 0);
        const minimum = Number(row.querySelector('[data-demo-stock-min]')?.textContent) || 0;
        quantity.textContent = String(updated);
        const nextStatus = updated < minimum ? 'Bajo mínimo' : 'Disponible';
        badge.className = `demo-status${updated < minimum ? ' demo-status-coral' : ''}`;
        badge.replaceChildren(document.createElement('i'), document.createTextNode(nextStatus));
        badge.setAttribute('aria-live', 'polite');
        row.dataset.demoSearch = row.textContent.toLocaleLowerCase('es');
        receiveStockButton.disabled = true;
        receiveStockButton.textContent = 'Recepción aplicada';
        return;
      }

      const contactButton = target?.closest('[data-demo-action="contact"]');
      if (contactButton) {
        const service = contactButton.closest('.demo-project')?.dataset.demoService;
        projectModal.close();
        if (!serviceSelect) { window.location.href = 'contacto.html?servicio=' + encodeURIComponent(service || 'Necesito orientación') + '#contacto'; return; }
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
      const target = event.target instanceof Element ? event.target : null;
      const hotelDate = target?.closest('[data-demo-hotel-start], [data-demo-hotel-end]');
      if (hotelDate) {
        updateMareaEstimate(hotelDate.closest('.demo-project'));
        return;
      }
      const analyticsMonth = target?.closest('[data-demo-analytics-month]');
      if (analyticsMonth) {
        updateDemoAnalytics(analyticsMonth);
        return;
      }
      const invoiceInput = target?.closest('[data-demo-invoice-amount], [data-demo-invoice-concept]');
      if (invoiceInput) {
        updateDemoInvoice(invoiceInput.closest('.demo-invoice-form'));
        return;
      }
      const input = target?.closest('[data-demo-filter]');
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
    projectModalPreview.addEventListener('change', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const analyticsMonth = target?.closest('[data-demo-analytics-month]');
      if (analyticsMonth) {
        updateDemoAnalytics(analyticsMonth);
        return;
      }
      const shopFilter = target?.closest('[data-demo-shop-filter]');
      if (shopFilter) {
        const root = shopFilter.closest('.demo-project');
        const cards = Array.from(root?.querySelectorAll('[data-demo-product-card]') || []);
        let visible = 0;
        cards.forEach((card) => {
          card.hidden = shopFilter.value !== 'all' && card.dataset.demoProductCategory !== shopFilter.value;
          if (!card.hidden) visible += 1;
        });
        const heading = root?.querySelector('.onda-shop-top .site-overline');
        if (heading) heading.textContent = `${visible} PIEZA${visible === 1 ? '' : 'S'} · FILTRO DE MUESTRA`;
        return;
      }
      const menuFilter = target?.closest('[data-demo-menu-filter]');
      if (menuFilter) {
        const root = menuFilter.closest('.demo-project');
        const items = Array.from(root?.querySelectorAll('[data-demo-menu-item]') || []);
        items.forEach((item) => {
          item.hidden = menuFilter.value !== 'all' && item.dataset.demoMenuCategory !== menuFilter.value;
        });
      }
    });

    modalClose?.addEventListener('click', () => projectModal.close());
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) projectModal.close();
    });
    projectModal.addEventListener('close', () => {
      if (!projectModal.open) projectModalPreview.replaceChildren();
    });
  }

  const assistantWidget = document.querySelector('#assistant-widget');
  const assistantToggle = document.querySelector('#assistant-launch');
  const assistantPanel = document.querySelector('#assistant-panel');
  const assistantClose = document.querySelector('.assistant-close');
  const assistantConversation = document.querySelector('#assistant-conversation');
  const assistantForm = document.querySelector('#assistant-form');
  const assistantMessage = document.querySelector('#assistant-message');
  const assistantResultActions = document.querySelector('#assistant-result-actions');
  const serviceSelect = document.querySelector('#contact-service');
  const packageSelect = document.querySelector('#contact-package');
  const contactMessage = document.querySelector('#contact-form [name="message"]');


  if (serviceSelect && packageSelect) {
    const params = new URLSearchParams(window.location.search);
    const selectedPackage = params.get('paquete');
    const requestedService = params.get('servicio');
    const requestedSystem = params.get('sistema');
    if (requestedSystem && contactMessage) contactMessage.value = 'Me interesa ' + requestedSystem.slice(0,80) + '. Quisiera adaptarlo a mi negocio.';
    if (selectedPackage && Array.from(packageSelect.options).some(o => o.value === selectedPackage)) { packageSelect.value = selectedPackage; serviceSelect.value = 'Página web'; }
    if (requestedService && Array.from(serviceSelect.options).some(o => o.value === requestedService)) serviceSelect.value = requestedService;
    try { const draft = JSON.parse(sessionStorage.getItem('nexo-contact-draft') || 'null'); if (draft && contactMessage) { contactMessage.value = String(draft.message || '').slice(0,1800); if (!selectedPackage && Array.from(serviceSelect.options).some(o => o.value === draft.service)) serviceSelect.value = draft.service; sessionStorage.removeItem('nexo-contact-draft'); } } catch {}
  }

  document.querySelectorAll('[data-package-choice]').forEach((link) => {
    link.addEventListener('click', () => {
      const choice = link.dataset.packageChoice || '';
      if (packageSelect) packageSelect.value = choice;
      if (serviceSelect) serviceSelect.value = 'Página web';
      window.setTimeout(() => packageSelect?.focus({ preventScroll: true }), 450);
    });
  });

  if (assistantWidget && assistantToggle && assistantPanel) {
    const assistantState = { phase: 'start', first: '', followup: '', extras: [], summary: '', service: 'Necesito orientación' };
    const assistantIntents = [
      { id: 'billing', service: 'Sistema de facturación', terms: ['factura', 'facturacion', 'cfdi', 'cobrar', 'cobro', 'pago', 'pagos'] },
      { id: 'local', service: 'Aplicación local o de escritorio', terms: ['programa de escritorio', 'aplicacion local', 'aplicacion de escritorio', 'sin internet', 'computadora'] },
      { id: 'automation', service: 'Automatización', terms: ['automat', 'repetir', 'manual', 'recordatorio', 'notificacion', 'avisar', 'whatsapp', 'copiar datos', 'dar seguimiento', 'conectar herramientas'] },
      { id: 'analytics', service: 'Ver reportes de ventas o inventario (Power BI o similar)', terms: ['reporte', 'reportes', 'tablero', 'dashboard', 'indicador', 'grafica', 'analizar', 'comparar meses', 'mis numeros'] },
      { id: 'operations', service: 'Registrar clientes, ventas o inventario', terms: ['inventario', 'stock', 'existencias', 'pedidos', 'pedido', 'clientes', 'ventas', 'excel', 'registros', 'productos'] },
      { id: 'website', service: 'Página web', terms: ['pagina web', 'sitio web', 'pagina', 'internet', 'tienda en linea', 'ecommerce', 'catalogo', 'reservas', 'reservar', 'citas', 'menu online', 'presencia digital', 'atraer', 'promocionar', 'clientes por internet', 'marketing', 'publicidad', 'vender por internet'] },
    ];
    const assistantStarters = [
      'Quiero atraer más clientes por internet y explicar mejor lo que vendo.',
      'Paso tiempo registrando ventas, pedidos o inventario a mano.',
      'Tengo tareas repetidas y quiero saber qué convendría automatizar.',
    ];
    const normalizeAssistantText = (text) => String(text || '').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const classifyAssistantNeed = (text) => {
      const normalized = normalizeAssistantText(text);
      const scored = assistantIntents.map((intent) => ({
        ...intent,
        score: intent.terms.reduce((score, term) => score + (normalized.includes(normalizeAssistantText(term)) ? 1 : 0), 0),
      })).sort((a, b) => b.score - a.score);
      return scored[0]?.score ? scored[0] : { id: 'general', service: 'Necesito orientación', score: 0 };
    };
    const addAssistantMessage = (role, text) => {
      if (!assistantConversation) return;
      const article = document.createElement('article');
      article.className = `assistant-message assistant-message-${role}`;
      const speaker = document.createElement('span');
      speaker.className = 'assistant-message-speaker';
      speaker.textContent = role === 'user' ? 'TÚ' : 'NEXO · ORIENTACIÓN';
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      article.append(speaker, paragraph);
      assistantConversation.append(article);
      assistantConversation.scrollTop = assistantConversation.scrollHeight;
      return article;
    };
    const addAssistantSuggestions = (question, suggestions) => {
      if (!assistantConversation) return;
      const group = document.createElement('div');
      group.className = 'assistant-suggestion-group';
      if (question) {
        const prompt = document.createElement('p');
        prompt.textContent = question;
        group.append(prompt);
      }
      const choices = document.createElement('div');
      choices.className = 'assistant-suggestions';
      suggestions.forEach((suggestion) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'assistant-suggestion';
        button.dataset.assistantSuggestion = suggestion;
        button.textContent = suggestion;
        choices.append(button);
      });
      group.append(choices);
      assistantConversation.append(group);
      assistantConversation.scrollTop = assistantConversation.scrollHeight;
    };
    const getAssistantFollowup = (intentId) => {
      const followups = {
        website: ['¿Qué debería lograr primero la página?', ['Mostrar mis servicios y recibir consultas', 'Recibir pedidos o reservas', 'Vender productos en línea']],
        operations: ['¿Qué te urge ordenar primero?', ['Inventario y existencias', 'Pedidos y seguimiento', 'Clientes y ventas']],
        billing: ['¿Qué parte de la facturación te quita más tiempo?', ['Emitir y organizar facturas', 'Dar seguimiento a pagos pendientes', 'Consultar ingresos y saldos']],
        automation: ['¿Qué tarea te gustaría dejar de hacer manualmente?', ['Capturar el mismo dato varias veces', 'Enviar avisos o recordatorios', 'Conectar herramientas que ya uso']],
        analytics: ['¿Qué te gustaría entender mejor con tus números?', ['Qué producto vende más', 'Cómo cambian ventas entre meses', 'Ventas e inventario juntos']],
        local: ['¿Qué debería resolver la aplicación en tu computadora?', ['Registrar operaciones sin internet', 'Crear documentos o reportes', 'Organizar archivos y datos']],
        general: ['¿Cuál de estas áreas se parece más a lo que quieres resolver?', ['Una página o tienda en línea', 'Ventas, clientes o inventario', 'Tareas repetidas, facturas o reportes']],
      };
      return followups[intentId] || followups.general;
    };
    const makeAssistantPlan = (text) => {
      const intent = classifyAssistantNeed(text);
      const normalized = normalizeAssistantText(text);
      if (intent.id === 'website') {
        if (['tienda', 'vender', 'producto', 'pago', 'comprar'].some((term) => normalized.includes(term))) {
          return { service: 'Página web', title: 'Una tienda en línea con catálogo y un flujo de compra claro', ideas: ['Ordenar productos, precios, variantes y existencias.', 'Definir entregas, pagos y quién atenderá los pedidos.', 'Empezar con una colección pequeña y medir consultas y ventas.'] };
        }
        if (['reserva', 'cita', 'agenda', 'pedido'].some((term) => normalized.includes(term))) {
          return { service: 'Página web', title: 'Una página con información clara y un flujo de citas o reservas', ideas: ['Presentar servicios, horarios y ubicación desde el inicio.', 'Pedir solo los datos necesarios para una solicitud.', 'Aclarar qué ocurre después de que llega cada consulta.'] };
        }
        return { service: 'Página web', title: 'Una página web enfocada en explicar tu negocio y recibir consultas', ideas: ['Priorizar qué vendes, para quién y cómo contactarte.', 'Mostrar ejemplos, horarios y respuestas a dudas frecuentes.', 'Empezar con una página simple antes de agregar funciones.'] };
      }
      if (intent.id === 'operations') {
        return { service: 'Registrar clientes, ventas o inventario', title: 'Un registro sencillo para ordenar operaciones y evitar capturas repetidas', ideas: ['Definir primero qué datos se anotan y quién los actualiza.', 'Elegir una vista rápida de pedidos, existencias o clientes.', 'Probar alertas de mínimos y un reporte básico antes de crecer.'] };
      }
      if (intent.id === 'billing') {
        return { service: 'Sistema de facturación', title: 'Un flujo de facturación con seguimiento de pagos', ideas: ['Identificar si necesitas emitir, consultar o solo registrar facturas.', 'Separar facturas pendientes, pagadas y vencidas.', 'Validar requisitos fiscales y la herramienta autorizada antes de automatizar.'] };
      }
      if (intent.id === 'automation') {
        return { service: 'Automatización', title: 'Automatizar un paso repetitivo, empezando por un solo proceso', ideas: ['Dibujar qué inicia el proceso, qué datos usa y cuál es el resultado.', 'Conectar solo herramientas que permitan integración segura.', 'Probar excepciones y aprobaciones antes de activar avisos reales.'] };
      }
      if (intent.id === 'analytics') {
        return { service: 'Ver reportes de ventas o inventario (Power BI o similar)', title: 'Un tablero corto con indicadores que ayuden a decidir', ideas: ['Elegir tres o cuatro preguntas concretas del negocio.', 'Acordar una fuente confiable y cómo se actualizan los datos.', 'Comparar periodos y metas sin saturar la pantalla de gráficas.'] };
      }
      if (intent.id === 'local') {
        return { service: 'Aplicación local o de escritorio', title: 'Una herramienta de escritorio pequeña para el proceso que describiste', ideas: ['Precisar qué debe funcionar sin conexión y qué no.', 'Acordar dónde se guardan los archivos y quién tendrá acceso.', 'Probar respaldo y recuperación antes de usar datos importantes.'] };
      }
      return { service: 'Necesito orientación', title: 'Un diagnóstico breve antes de elegir una herramienta', ideas: ['Anotar el paso que más tiempo consume en una semana normal.', 'Identificar qué información se repite o se pierde.', 'Elegir una mejora pequeña que se pueda probar antes de construir más.'] };
    };
    const renderAssistantPlan = (updated) => {
      const allUserText = [assistantState.first, assistantState.followup, ...assistantState.extras].filter(Boolean).join(' ');
      const plan = makeAssistantPlan(allUserText);
      assistantState.service = plan.service;
      assistantState.summary = [
        `Necesidad inicial: ${assistantState.first}`,
        `Prioridad: ${assistantState.followup}`,
        assistantState.extras.length ? `Detalles adicionales: ${assistantState.extras.join(' · ')}` : '',
        `Recomendación inicial: ${plan.title}.`,
        `Ideas para empezar: ${plan.ideas.join(' ')}`,
      ].filter(Boolean).join('\n').slice(0, 1800);
      assistantConversation?.querySelector('.assistant-recommendation')?.remove();
      if (updated) addAssistantMessage('bot', 'Sumé ese detalle y ajusté la propuesta. Si quieres, puedes seguir agregando contexto.');
      else addAssistantMessage('bot', `Por lo que cuentas, empezaría con: ${plan.title.toLocaleLowerCase('es')}.`);
      const card = document.createElement('article');
      card.className = 'assistant-recommendation';
      const kicker = document.createElement('span');
      kicker.textContent = 'PRIMERA IDEA · SE PUEDE AJUSTAR';
      const heading = document.createElement('h3');
      heading.textContent = plan.title;
      const description = document.createElement('p');
      description.textContent = 'Para no construir de más, empezaría por estas decisiones:';
      const list = document.createElement('ul');
      plan.ideas.forEach((idea) => {
        const item = document.createElement('li');
        item.textContent = idea;
        list.append(item);
      });
      card.append(kicker, heading, description, list);
      assistantConversation?.append(card);
      assistantConversation.scrollTop = assistantConversation.scrollHeight;
      if (assistantResultActions) assistantResultActions.hidden = false;
    };
    const addAssistantWelcome = () => {
      assistantConversation?.replaceChildren();
      addAssistantMessage('bot', '¡Hola! Cuéntame qué te gustaría mejorar en tu negocio. No hace falta que sepas qué sistema necesitas.');
      const starters = document.createElement('div');
      starters.className = 'assistant-starter-prompts';
      starters.setAttribute('aria-label', 'Ideas para empezar');
      assistantStarters.forEach((text, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.assistantStarter = text;
        button.textContent = ['Quiero atraer clientes por internet', 'Me cuesta ordenar ventas o inventario', 'Quiero dejar de repetir tareas'][index];
        starters.append(button);
      });
      assistantConversation?.append(starters);
    };
    const setAssistantOpen = (open, returnFocus = false) => {
      assistantPanel.hidden = !open;
      assistantToggle.setAttribute('aria-expanded', String(open));
      assistantToggle.setAttribute('aria-label', open
        ? 'Cerrar asistente Nexo'
        : 'Abrir el asesor interactivo Nexo');
      if (open) window.requestAnimationFrame(() => assistantMessage?.focus({ preventScroll: true }));
      else if (returnFocus) assistantToggle.focus();
    };

    assistantToggle.addEventListener('click', () => {
      setAssistantOpen(assistantPanel.hidden);
    });
    assistantClose?.addEventListener('click', () => setAssistantOpen(false, true));

    assistantForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = assistantMessage?.value.trim();
      if (!text || !assistantConversation) return;
      assistantConversation.querySelector('.assistant-starter-prompts')?.remove();
      addAssistantMessage('user', text);
      assistantMessage.value = '';
      if (assistantState.phase === 'start') {
        assistantState.first = text;
        assistantState.phase = 'followup';
        const intent = classifyAssistantNeed(text);
        const [question, suggestions] = getAssistantFollowup(intent.id);
        addAssistantMessage('bot', question);
        addAssistantSuggestions('', suggestions);
      } else if (assistantState.phase === 'followup') {
        assistantState.followup = text;
        assistantState.phase = 'result';
        renderAssistantPlan(false);
      } else {
        assistantState.extras.push(text);
        renderAssistantPlan(true);
      }
      assistantMessage?.focus({ preventScroll: true });
    });
    assistantPanel.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const quickReply = target?.closest('[data-assistant-starter], [data-assistant-suggestion]');
      if (quickReply && assistantForm && assistantMessage) {
        event.stopPropagation();
        assistantMessage.value = quickReply.dataset.assistantStarter || quickReply.dataset.assistantSuggestion || '';
        assistantForm.requestSubmit();
        return;
      }
      if (target?.closest('[data-assistant-use-summary]')) {
        if (!contactMessage) {
          try { sessionStorage.setItem('nexo-contact-draft', JSON.stringify({service: assistantState.service, message: assistantState.summary})); } catch {}
          window.location.href = 'contacto.html?servicio=' + encodeURIComponent(assistantState.service) + '#contacto';
          return;
        }
        if (serviceSelect) {
          const optionExists = Array.from(serviceSelect.options).some((option) => option.value === assistantState.service);
          serviceSelect.value = optionExists ? assistantState.service : 'Necesito orientación';
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        if (contactMessage) {
          contactMessage.value = assistantState.summary;
          contactMessage.dispatchEvent(new Event('input', { bubbles: true }));
        }
        setAssistantOpen(false);
        document.querySelector('#contacto')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        window.setTimeout(() => contactMessage?.focus({ preventScroll: true }), 450);
        return;
      }
      if (target?.closest('[data-assistant-reset]')) {
        Object.assign(assistantState, { phase: 'start', first: '', followup: '', extras: [], summary: '', service: 'Necesito orientación' });
        assistantMessage.value = '';
        if (assistantResultActions) assistantResultActions.hidden = true;
        addAssistantWelcome();
        assistantMessage.focus({ preventScroll: true });
      }
    });

    document.addEventListener('click', (event) => {
      if (!assistantPanel.hidden && !assistantWidget.contains(event.target)) setAssistantOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !assistantPanel.hidden) setAssistantOpen(false, true);
    });
  }
  document.querySelectorAll('.code-curtain > span').forEach((column) => {
    const pattern = column.innerHTML;
    column.innerHTML = Array(4).fill(pattern).join('<br />');
  });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealTargets = document.querySelectorAll('.service-card, .package-card, .project-card, .guide-item, .benefit-list article, .process-panel, .contact-panel');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealTargets.forEach((element, index) => {
      element.classList.add('nexo-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
      revealObserver.observe(element);
    });
  }
})();
