(() => {
  const brandMark = '<span class="demo-brand-mark" aria-hidden="true">N</span>';
  const demoStamp = '<span class="demo-stamp">MUESTRA · DATOS FICTICIOS</span>';

  const appShell = (brand, nav, content, extraClass = '') => `
    <div class="demo-project demo-app ${extraClass}" data-demo-service="${brand.service}">
      <header class="demo-app-header">
        <div class="demo-app-brand">${brandMark}<span>${brand.name}</span></div>
        <div class="demo-app-top-right">${demoStamp}<span class="demo-avatar" aria-label="Perfil de demostración">ND</span></div>
      </header>
      <div class="demo-app-layout">
        <div class="demo-sidebar">
          <p class="demo-side-caption">ESPACIO DE TRABAJO</p>
          <nav class="demo-tablist" role="tablist" aria-label="Pantallas de ${brand.name}">
            ${nav}
          </nav>
          <div class="demo-sidebar-footer"><span class="demo-status-dot"></span> Datos de muestra</div>
        </div>
        <main class="demo-workspace">${content}</main>
      </div>
    </div>`;

  const tab = (name, label, active = false) => `<button class="demo-tab${active ? ' is-active' : ''}" type="button" role="tab" aria-selected="${active}" tabindex="${active ? '0' : '-1'}" aria-controls="${name}-panel" data-demo-tab="${name}"><span class="demo-tab-icon" aria-hidden="true">${label.icon}</span>${label.text}</button>`;
  const pageHead = (eyebrow, title, subtitle, action = '') => `<header class="demo-page-head"><div><p class="demo-eyebrow">${eyebrow}</p><h3>${title}</h3><p class="demo-page-subtitle">${subtitle}</p></div>${action}</header>`;
  const kpi = (label, value, change, tone = 'blue') => `<article class="demo-kpi demo-kpi-${tone}"><div class="demo-kpi-head"><span>${label}</span><span class="demo-kpi-icon" aria-hidden="true">↗</span></div><strong>${value}</strong><small>${change}</small></article>`;
  const status = (label, tone = 'green') => `<span class="demo-status demo-status-${tone}"><i></i>${label}</span>`;
  const searchBox = (label = 'Buscar en la tabla') => `<label class="demo-search"><span aria-hidden="true">⌕</span><input type="search" data-demo-filter aria-label="${label}" placeholder="Buscar..." /></label>`;

  const demos = {
    website: {
      title: 'Sitio web para una panadería',
      description: 'Una página de ejemplo para Pan de Barrio, una panadería inventada. Muestra horarios, menú y opciones para pedir; no representa a un cliente real.',
      markup: `
        <div class="demo-project demo-website" data-demo-service="Página web">
          <div class="demo-browser-chrome"><span></span><span></span><span></span><div>vista previa · sitio de muestra</div></div>
          <header class="demo-website-nav">
            <div class="demo-web-brand" aria-label="Marca ficticia Pan de Barrio">${brandMark}<span>PANADERÍA<br /><b>PAN DE BARRIO</b></span></div>
            <nav class="demo-web-tabs" role="tablist" aria-label="Secciones de Pan de Barrio">
              <button class="demo-web-tab is-active" type="button" role="tab" aria-selected="true" tabindex="0" aria-controls="web-home-panel" data-demo-tab="web-home">Inicio</button>
              <button class="demo-web-tab" type="button" role="tab" aria-selected="false" tabindex="-1" aria-controls="web-services-panel" data-demo-tab="web-services">Menú</button>
              <button class="demo-web-tab" type="button" role="tab" aria-selected="false" tabindex="-1" aria-controls="web-contact-panel" data-demo-tab="web-contact">Contacto</button>
            </nav>
            <span class="demo-web-status">${demoStamp}</span>
          </header>
          <main class="demo-website-body">
            <section class="demo-screen demo-web-screen" id="web-home-panel" role="tabpanel" aria-labelledby="web-home-tab" data-demo-screen="web-home" tabindex="0">
              <div class="demo-web-hero">
                <div class="demo-web-copy"><span class="demo-web-overline">PAN RECIÉN HECHO CADA MAÑANA</span><h3>Pan recién hecho,<br /><em>a la vuelta de casa.</em></h3><p>Mira el menú de hoy, revisa el horario y pide para recoger.</p><button class="demo-cta demo-cta-coral" type="button" data-demo-action="contact">Preguntar por WhatsApp <span aria-hidden="true">↗</span></button><span class="demo-web-micro">Muestra de diseño · Marca imaginaria</span></div>
                <div class="demo-web-art" aria-hidden="true"><div class="demo-web-art-card"><span>DEL HORNO A TU MESA</span><div class="demo-art-circle"></div><div class="demo-art-block"></div><b>01 — 03</b></div><span class="demo-art-tag">Pan del día</span></div>
              </div>
              <div class="demo-web-proof"><div><b>01</b><span>Menú de hoy</span></div><div><b>02</b><span>Horario y ubicación</span></div><div><b>03</b><span>Pedido por WhatsApp</span></div></div>
              <div class="demo-web-feature"><div><span class="demo-web-overline">PARA QUIENES VIVEN CERCA</span><h4>Pasa por tu pan<br />sin perder tiempo.</h4></div><p>Un menú sencillo ayuda a elegir antes de salir de casa, desde el teléfono o la computadora.</p></div>
            </section>
            <section class="demo-screen demo-web-screen" id="web-services-panel" role="tabpanel" aria-labelledby="web-services-tab" data-demo-screen="web-services" tabindex="0" hidden>
              <div class="demo-web-section-head"><span class="demo-web-overline">DEL HORNO A TU MESA</span><h3>Lo que sale hoy.</h3><p>Una muestra de cómo presentar productos, horarios y encargos.</p></div>
              <div class="demo-web-service-grid"><article><span>01</span><h4>Pan dulce</h4><p>Conchas, cuernitos y piezas recién horneadas cada mañana.</p><b>Explorar servicio ↗</b></article><article><span>02</span><h4>Pasteles</h4><p>Encargos para cumpleaños y reuniones con varios días de anticipación.</p><b>Explorar servicio ↗</b></article><article><span>03</span><h4>Café y algo más</h4><p>Opciones para acompañar el pan y recoger en el local.</p><b>Explorar servicio ↗</b></article></div>
              <div class="demo-web-process"><span>01 · PREGUNTA</span><span>02 · ELIGE</span><span>03 · RECOGE</span></div>
            </section>
            <section class="demo-screen demo-web-screen" id="web-contact-panel" role="tabpanel" aria-labelledby="web-contact-tab" data-demo-screen="web-contact" tabindex="0" hidden>
              <div class="demo-web-contact-card"><span class="demo-web-overline">SIGUIENTE PASO</span><h3>¿Qué te gustaría llevar?</h3><p>Consulta por los productos del día o pregunta por un pastel para una fecha especial.</p><div class="demo-contact-fields"><span>Tu nombre</span><span>Tu teléfono</span><span>¿Qué quieres pedir?</span></div><button class="demo-cta demo-cta-coral" type="button" data-demo-action="contact">Consultar por un pedido <span aria-hidden="true">↗</span></button><small>Esta pantalla es una muestra visual; no envía información.</small></div>
            </section>
          </main>
          <footer class="demo-web-footer"><span>PAN DE BARRIO · NEGOCIO FICTICIO</span><span>MENÚ · HORARIO · PEDIDOS</span></footer>
        </div>`,
    },

    records: {
      title: 'Sistema de pedidos y registro',
      description: 'Una herramienta conceptual para registrar pedidos, buscar clientes y dar seguimiento al estado de cada entrega. Los nombres, totales y registros son ficticios.',
      markup: appShell(
        { name: 'PAN DE BARRIO', service: 'Registrar clientes, ventas o inventario' },
        `${tab('records-summary', { icon: '⌂', text: 'Resumen' }, true)}${tab('records-orders', { icon: '▤', text: 'Pedidos' })}${tab('records-clients', { icon: '◉', text: 'Clientes' })}`,
        `<section class="demo-screen" id="records-summary-panel" role="tabpanel" aria-labelledby="records-summary" data-demo-screen="records-summary" tabindex="0">
          ${pageHead('CONTROL DIARIO', 'Pedidos de un vistazo', 'Pedidos recibidos esta semana y los que faltan preparar.', '<span class="demo-quiet-tag">Semana de muestra</span>')}
          <div class="demo-kpi-grid">${kpi('Pedidos esta semana', '32', 'registros ficticios', 'blue')}${kpi('Por preparar', '05', 'hay que revisar', 'amber')}${kpi('Entregados', '27', 'esta semana', 'green')}</div>
          <div class="demo-two-col"><section class="demo-panel"><div class="demo-panel-head"><div><span class="demo-eyebrow">ACTIVIDAD</span><h4>Últimos pedidos</h4></div><button class="demo-text-tab" type="button" data-demo-tab="records-orders">Ver pedidos <span aria-hidden="true">↗</span></button></div>
            <div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Folio</th><th>Cliente</th><th>Entrega</th><th>Estado</th></tr></thead><tbody><tr data-demo-row data-demo-search="pedido 2084 mariana ruiz preparar"><td><b>#2084</b><small>Hoy · 10:42</small></td><td>Mariana Ruiz</td><td>Hoy</td><td>${status('Preparar', 'amber')}</td></tr><tr data-demo-row data-demo-search="pedido 2083 diego mora listo"><td><b>#2083</b><small>Hoy · 09:16</small></td><td>Diego Mora</td><td>Hoy</td><td>${status('Listo')}</td></tr><tr data-demo-row data-demo-search="pedido 2082 lucía torres entregado"><td><b>#2082</b><small>Ayer · 16:05</small></td><td>Lucía Torres</td><td>Ayer</td><td>${status('Entregado')}</td></tr></tbody></table></div>
          </section><aside class="demo-panel demo-note-panel"><span class="demo-panel-icon">✓</span><span class="demo-eyebrow">SIGUIENTE ACCIÓN</span><h4>5 pedidos por preparar</h4><p>El equipo ve qué se prepara primero y a qué hora lo vienen a recoger.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Quiero ordenar mis pedidos <span aria-hidden="true">↗</span></button></aside></div>
        </section>
        <section class="demo-screen" id="records-orders-panel" role="tabpanel" aria-labelledby="records-orders" data-demo-screen="records-orders" tabindex="0" hidden>
          ${pageHead('SEGUIMIENTO', 'Todos los pedidos', 'Busca por folio, cliente de muestra o estado.', searchBox('Buscar pedidos de ejemplo'))}
          <div class="demo-panel"><div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Folio</th><th>Cliente</th><th>Productos</th><th>Total de ejemplo</th><th>Fecha</th><th>Estado</th></tr></thead><tbody><tr data-demo-row data-demo-search="2084 mariana ruiz 10 piezas surtidas preparar"><td><b>#2084</b></td><td>Mariana Ruiz</td><td>10 piezas surtidas</td><td>$ 280</td><td>Hoy</td><td>${status('Preparar', 'amber')}</td></tr><tr data-demo-row data-demo-search="2083 diego mora Pastel de chocolate listo"><td><b>#2083</b></td><td>Diego Mora</td><td>Pastel de chocolate</td><td>$ 450</td><td>Hoy</td><td>${status('Listo')}</td></tr><tr data-demo-row data-demo-search="2082 lucía torres 2 cafés y pan entregado"><td><b>#2082</b></td><td>Lucía Torres</td><td>2 cafés y pan</td><td>$ 190</td><td>Ayer</td><td>${status('Entregado')}</td></tr><tr data-demo-row data-demo-search="2081 carlos vega Pastel de chocolate pendiente"><td><b>#2081</b></td><td>Carlos Vega</td><td>Pastel de chocolate</td><td>$ 210</td><td>Ayer</td><td>${status('Pendiente', 'amber')}</td></tr></tbody></table></div><p class="demo-table-foot">4 registros visibles · datos ilustrativos</p></div>
        </section>
        <section class="demo-screen" id="records-clients-panel" role="tabpanel" aria-labelledby="records-clients" data-demo-screen="records-clients" tabindex="0" hidden>
          ${pageHead('DIRECTORIO', 'Clientes de la semana', 'Aquí se consulta la última compra y el nombre con que se registró.', searchBox('Buscar clientes de ejemplo'))}
          <div class="demo-client-grid"><article class="demo-client-card"><span class="demo-client-avatar">18</span><div><b>Mariana Ruiz</b><small>Último pedido · hoy</small></div>${status('Activo')}</article><article class="demo-client-card"><span class="demo-client-avatar demo-avatar-coral">23</span><div><b>Diego Mora</b><small>Último pedido · hoy</small></div>${status('Activo')}</article><article class="demo-client-card"><span class="demo-client-avatar demo-avatar-lime">11</span><div><b>Lucía Torres</b><small>Último pedido · ayer</small></div>${status('Activo')}</article></div>
          <div class="demo-panel demo-info-strip"><span class="demo-panel-icon">i</span><p>Los permisos, campos y avisos se definen según cómo trabaja cada negocio.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Diseñar mi registro <span aria-hidden="true">↗</span></button></div>
        </section>`
      ),
    },

    billing: {
      title: 'Control de facturas y pagos',
      description: 'Ejemplo de registro, seguimiento y captura de datos para facturación. Es una maqueta: no emite documentos fiscales válidos y requiere revisar las reglas del país y la integración correspondiente.',
      markup: appShell(
        { name: 'TALLER EL ROBLE', service: 'Sistema de facturación' },
        `${tab('billing-invoices', { icon: '▤', text: 'Facturas' }, true)}${tab('billing-create', { icon: '+', text: 'Nueva factura' })}${tab('billing-payments', { icon: '$', text: 'Pagos' })}`,
        `<div class="demo-fiscal-note"><strong>DEMO NO FISCAL</strong><span>La pantalla no emite, timbra ni envía documentos fiscales.</span></div>
        <section class="demo-screen" id="billing-invoices-panel" role="tabpanel" aria-labelledby="billing-invoices" data-demo-screen="billing-invoices" tabindex="0">
          ${pageHead('FACTURACIÓN · MUESTRA', 'Facturas', 'Consulta el estado de cada registro de ejemplo.', searchBox('Buscar facturas de ejemplo'))}
          <div class="demo-kpi-grid demo-kpi-grid-3">${kpi('Registradas', '46', 'en el periodo de muestra', 'blue')}${kpi('Por cobrar', '$ 3,650', 'importe ilustrativo', 'amber')}${kpi('Pagadas', '38', 'estado de demostración', 'green')}</div>
          <div class="demo-panel"><div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Folio</th><th>Cliente de muestra</th><th>Fecha</th><th>Importe ilustrativo</th><th>Estado</th></tr></thead><tbody><tr data-demo-row data-demo-search="fc 0248 mariana ruiz pendiente"><td><b>FC-0248</b></td><td>Mariana Ruiz</td><td>Hoy</td><td>$ 2,450</td><td>${status('Pendiente', 'amber')}</td></tr><tr data-demo-row data-demo-search="fc 0247 diego mora pagada"><td><b>FC-0247</b></td><td>Diego Mora</td><td>Ayer</td><td>$ 1,280</td><td>${status('Pagada')}</td></tr><tr data-demo-row data-demo-search="fc 0246 lucía torres revisar"><td><b>FC-0246</b></td><td>Lucía Torres</td><td>Hace 3 días</td><td>$ 890</td><td>${status('Revisar', 'coral')}</td></tr></tbody></table></div><p class="demo-table-foot">Montos ilustrativos · moneda por definir · sin efecto fiscal</p></div>
        </section>
        <section class="demo-screen" id="billing-create-panel" role="tabpanel" aria-labelledby="billing-create" data-demo-screen="billing-create" tabindex="0" hidden>
          ${pageHead('CAPTURA DE MUESTRA', 'Preparar un registro', 'Los campos se muestran para explicar el flujo; no se guardan.', '<span class="demo-quiet-tag">Borrador visual</span>')}
          <div class="demo-invoice-builder"><div class="demo-panel demo-invoice-form"><div class="demo-form-section"><span>01 · DATOS DEL CLIENTE</span><div class="demo-form-grid"><label>Cliente de ejemplo<span>Sofía Vega</span></label><label>Fecha<span>Hoy · muestra</span></label><label>Concepto<span>Cambio de aceite</span></label><label>Referencia<span>REF-0001</span></label></div></div><div class="demo-form-section"><span>02 · CONCEPTOS</span><div class="demo-line-item"><b>Cambio de aceite</b><small>1 × $ 2,000</small><strong>$ 2,000</strong></div><div class="demo-line-item"><b>Cargo por revisar</b><small>Configuración pendiente</small><strong>$ 450</strong></div></div><div class="demo-total-row"><span>Total de ejemplo</span><strong>$ 2,450</strong></div></div><aside class="demo-invoice-side"><span class="demo-eyebrow">ANTES DE IMPLEMENTAR</span><h4>Revisamos tus requisitos primero.</h4><p>El país, el proveedor y las obligaciones fiscales determinan qué integración hace falta.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Consultar mi caso <span aria-hidden="true">↗</span></button></aside></div>
        </section>
        <section class="demo-screen" id="billing-payments-panel" role="tabpanel" aria-labelledby="billing-payments" data-demo-screen="billing-payments" tabindex="0" hidden>
          ${pageHead('SEGUIMIENTO', 'Pagos pendientes', 'Una lista de ejemplo para ver qué requiere atención.', '<span class="demo-quiet-tag">Solo demostración</span>')}
          <div class="demo-payment-layout"><div class="demo-panel"><div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Cuenta</th><th>Vencimiento de muestra</th><th>Importe</th><th>Estado</th></tr></thead><tbody><tr><td>Mariana Ruiz</td><td>15 nov</td><td>$ 2,450</td><td>${status('Por cobrar', 'amber')}</td></tr><tr><td>Carlos Vega</td><td>18 nov</td><td>$ 1,200</td><td>${status('Por cobrar', 'amber')}</td></tr><tr><td>Diego Mora</td><td>09 nov</td><td>$ 1,280</td><td>${status('Pagada')}</td></tr></tbody></table></div></div><aside class="demo-panel demo-note-panel"><span class="demo-eyebrow">RESUMEN DE MUESTRA</span><strong class="demo-payment-total">$ 3,650</strong><p>Saldo ilustrativo por revisar</p><span class="demo-progress"><i style="width:72%"></i></span><small>Los avisos y recibos dependen de la integración elegida.</small></aside></div>
        </section>`
      ),
    },

    desktop: {
      title: 'Aplicación de escritorio para operaciones',
      description: 'Un ejemplo de aplicación local para organizar tareas y existencias del negocio. Su conexión a internet y sincronización se definirían según los requisitos; no asumas que funciona sin conexión.',
      markup: appShell(
        { name: 'TALLER EL ROBLE', service: 'Aplicación local o de escritorio' },
        `${tab('desktop-overview', { icon: '⌂', text: 'Resumen' }, true)}${tab('desktop-stock', { icon: '▦', text: 'Inventario' })}${tab('desktop-activity', { icon: '◷', text: 'Actividad' })}`,
        `<div class="demo-local-banner"><span class="demo-panel-icon">⌘</span><p>Vista conceptual para computadora · El modo sin internet se define según el proyecto.</p></div>
        <section class="demo-screen" id="desktop-overview-panel" role="tabpanel" aria-labelledby="desktop-overview" data-demo-screen="desktop-overview" tabindex="0">
          ${pageHead('OPERACIÓN LOCAL · MUESTRA', 'Hola, equipo', 'Vista de ejemplo para el inicio de una jornada en el taller.', '<span class="demo-date-pill">Jueves · muestra</span>')}
          <div class="demo-kpi-grid">${kpi('Órdenes abiertas', '12', '4 requieren atención', 'blue')}${kpi('Por entregar', '05', 'durante el día', 'amber')}${kpi('Productos activos', '84', 'en inventario ejemplo', 'green')}</div>
          <div class="demo-two-col"><section class="demo-panel"><div class="demo-panel-head"><div><span class="demo-eyebrow">PENDIENTES</span><h4>Trabajo en proceso</h4></div><button class="demo-text-tab" type="button" data-demo-tab="desktop-activity">Ver actividad ↗</button></div><div class="demo-task-list"><article><span class="demo-task-icon">01</span><div><b>Revisión de frenos · Versa</b><small>Revisión · prioridad normal</small></div>${status('En curso','blue')}</article><article><span class="demo-task-icon demo-task-icon-coral">02</span><div><b>Cambio de aceite · March</b><small>Entrega programada · hoy</small></div>${status('Pendiente','amber')}</article><article><span class="demo-task-icon demo-task-icon-lime">03</span><div><b>Diagnóstico eléctrico · Sentra</b><small>Validación del equipo</small></div>${status('Revisar','coral')}</article></div></section><aside class="demo-panel demo-desktop-note"><span class="demo-eyebrow">DISEÑADA PARA TU OPERACIÓN</span><h4>Lo importante, a la vista.</h4><p>La aplicación puede reunir órdenes, inventario y movimientos según el proceso real de tu equipo.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Explorar una app así <span aria-hidden="true">↗</span></button></aside></div>
        </section>
        <section class="demo-screen" id="desktop-stock-panel" role="tabpanel" aria-labelledby="desktop-stock" data-demo-screen="desktop-stock" tabindex="0" hidden>
          ${pageHead('CONTROL DE EXISTENCIAS', 'Inventario de muestra', 'Consulta niveles y movimientos desde una sola aplicación.', searchBox('Buscar producto de muestra'))}
          <div class="demo-kpi-grid demo-kpi-grid-3">${kpi('Artículos', '84', 'en catálogo ilustrativo', 'blue')}${kpi('Bajo mínimo', '06', 'requieren revisión', 'coral')}${kpi('Movimientos hoy', '19', 'entradas y salidas de muestra', 'green')}</div>
          <div class="demo-panel"><div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Artículo</th><th>Código de ejemplo</th><th>Existencia</th><th>Mínimo</th><th>Estado</th></tr></thead><tbody><tr data-demo-row data-demo-search="filtro de aceite rep-001 12 piezas disponible"><td><b>Filtro de aceite</b></td><td>REP-001</td><td>12 piezas</td><td>5</td><td>${status('Disponible')}</td></tr><tr data-demo-row data-demo-search="aceite 5w-30 rep-002 3 litros bajo mínimo"><td><b>Aceite 5W-30</b></td><td>REP-002</td><td>3 litros</td><td>8</td><td>${status('Bajo mínimo','coral')}</td></tr><tr data-demo-row data-demo-search="bujía estándar rep-003 21 piezas disponible"><td><b>Bujía estándar</b></td><td>REP-003</td><td>21 piezas</td><td>6</td><td>${status('Disponible')}</td></tr></tbody></table></div></div>
        </section>
        <section class="demo-screen" id="desktop-activity-panel" role="tabpanel" aria-labelledby="desktop-activity" data-demo-screen="desktop-activity" tabindex="0" hidden>
          ${pageHead('MOVIMIENTOS', 'Actividad reciente', 'Registros de ejemplo para consultar qué cambió y cuándo.', '<span class="demo-quiet-tag">Historial de muestra</span>')}
          <div class="demo-activity-timeline"><article><span class="demo-timeline-dot dot-green"></span><div><b>Orden #041 actualizada</b><p>Se marcó como “En curso” · Usuario de muestra</p><small>Hoy · 10:42</small></div></article><article><span class="demo-timeline-dot dot-blue"></span><div><b>Existencia ajustada</b><p>Repuesto REP-002 · salida de 2 litros</p><small>Hoy · 09:18</small></div></article><article><span class="demo-timeline-dot dot-amber"></span><div><b>Orden #040 registrada</b><p>Nuevo trabajo añadido a la cola</p><small>Ayer · 16:30</small></div></article></div>
        </section>`
      , 'demo-local'),
    },

    analytics: {
      title: 'Tablero de ventas tipo Power BI',
      description: 'Una muestra de tablero para explorar ventas, ticket promedio y categorías. El reporte puede hacerse con Power BI u otra herramienta; los datos visibles son ficticios.',
      markup: appShell(
        { name: 'PAN DE BARRIO', service: 'Ver reportes de ventas o inventario (Power BI o similar)' },
        `${tab('analytics-summary', { icon: '▥', text: 'Resumen' }, true)}${tab('analytics-products', { icon: '▦', text: 'Productos' })}${tab('analytics-channels', { icon: '◌', text: 'Canales' })}`,
        `<section class="demo-screen" id="analytics-summary-panel" role="tabpanel" aria-labelledby="analytics-summary" data-demo-screen="analytics-summary" tabindex="0">
          ${pageHead('TABLERO · EJEMPLO', 'Ventas de un vistazo', 'Indicadores ilustrativos para una conversación de negocio.', '<span class="demo-period-pill">Últimos 6 meses · ejemplo⌄</span>')}
          <div class="demo-kpi-grid demo-kpi-grid-4">${kpi('Ventas de junio', '$ 76 mil', '7% sobre mayo · muestra', 'blue')}${kpi('Pedidos', '324', 'en el periodo ilustrativo', 'green')}${kpi('Ticket promedio', '$ 235', 'cálculo de muestra', 'violet')}${kpi('Meta ilustrativa', '84%', 'avance de ejemplo', 'amber')}</div>
          <div class="demo-analytics-grid"><section class="demo-panel demo-chart-panel"><div class="demo-panel-head"><div><span class="demo-eyebrow">TENDENCIA</span><h4>Ventas mensuales · ejemplo</h4></div><span class="demo-legend"><i></i>Ventas · datos ficticios</span></div><div class="demo-chart"><div class="demo-chart-y"><span>$ 80k</span><span>$ 60k</span><span>$ 40k</span><span>$ 20k</span><span>$ 0</span></div><div class="demo-chart-bars"><div><i style="--bar:62%"></i><small>Ene</small></div><div><i style="--bar:68%"></i><small>Feb</small></div><div><i style="--bar:61%"></i><small>Mar</small></div><div><i style="--bar:82%"></i><small>Abr</small></div><div><i style="--bar:92%"></i><small>May</small></div><div><i style="--bar:100%"></i><small>Jun</small></div></div></div><div class="demo-chart-foot"><span>Importes ilustrativos</span><span>Moneda por definir</span></div></section><aside class="demo-panel demo-highlight-panel"><span class="demo-eyebrow">LECTURA RÁPIDA</span><div class="demo-highlight-number">+7<span>%</span></div><h4>El ejemplo muestra crecimiento frente al mes anterior.</h4><p>Los indicadores se eligen según las preguntas que quieras responder.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Crear un tablero así <span aria-hidden="true">↗</span></button></aside></div>
        </section>
        <section class="demo-screen" id="analytics-products-panel" role="tabpanel" aria-labelledby="analytics-products" data-demo-screen="analytics-products" tabindex="0" hidden>
          ${pageHead('ANÁLISIS DE MUESTRA', 'Productos con más movimiento', 'Ejemplo de lectura para entender qué productos impulsan el negocio.', '<span class="demo-quiet-tag">Cifras ficticias</span>')}
          <div class="demo-product-bars"><article><div><span>Conchas y pan dulce</span><b>$ 28.4 mil</b></div><span class="demo-meter"><i style="width:88%"></i></span></article><article><div><span>Pasteles por encargo</span><b>$ 18.1 mil</b></div><span class="demo-meter demo-meter-lime"><i style="width:69%"></i></span></article><article><div><span>Café y bebidas</span><b>$ 16.5 mil</b></div><span class="demo-meter demo-meter-coral"><i style="width:58%"></i></span></article><article><div><span>Cuernitos</span><b>$ 13 mil</b></div><span class="demo-meter demo-meter-violet"><i style="width:38%"></i></span></article></div>
          <div class="demo-panel demo-info-strip"><span class="demo-panel-icon">i</span><p>Un reporte necesita una fuente de datos confiable, reglas claras y actualización acordada.</p><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Revisar mis datos <span aria-hidden="true">↗</span></button></div>
        </section>
        <section class="demo-screen" id="analytics-channels-panel" role="tabpanel" aria-labelledby="analytics-channels" data-demo-screen="analytics-channels" tabindex="0" hidden>
          ${pageHead('CANALES · EJEMPLO', '¿De dónde vienen las ventas?', 'Un mismo dato puede verse por tienda, sitio o atención directa.', '<span class="demo-quiet-tag">Distribución ilustrativa</span>')}
          <div class="demo-channel-grid"><article class="demo-channel-card"><span class="demo-channel-mark channel-blue">01</span><div><b>Mostrador</b><small>Participación ilustrativa</small></div><strong>46%</strong></article><article class="demo-channel-card"><span class="demo-channel-mark channel-lime">02</span><div><b>Pedidos por WhatsApp</b><small>Participación ilustrativa</small></div><strong>32%</strong></article><article class="demo-channel-card"><span class="demo-channel-mark channel-coral">03</span><div><b>Pedidos del sitio</b><small>Participación ilustrativa</small></div><strong>22%</strong></article></div>
          <div class="demo-panel demo-info-strip"><span class="demo-panel-icon">i</span><p>Esta maqueta no está conectada a Power BI ni a una base real; solo muestra una posible estructura.</p></div>
        </section>`
      , 'demo-analytics'),
    },

    automation: {
      title: 'Flujo automático de pedidos',
      description: 'Ejemplo visual de un flujo: recibir un pedido, revisar datos, registrar el movimiento y avisar al equipo. No está conectado a plataformas ni envía mensajes.',
      markup: appShell(
        { name: 'PEDIDOS · PAN DE BARRIO', service: 'Automatización' },
        `${tab('flow-builder', { icon: '⌘', text: 'Flujo' }, true)}${tab('flow-history', { icon: '◷', text: 'Historial' })}${tab('flow-connections', { icon: '⎆', text: 'Conexiones' })}`,
        `<section class="demo-screen" id="flow-builder-panel" role="tabpanel" aria-labelledby="flow-builder" data-demo-screen="flow-builder" tabindex="0">
          ${pageHead('AUTOMATIZACIÓN · MUESTRA', 'De un pedido a una acción', 'Un flujo sencillo evita repetir pasos manuales.', '<span class="demo-live-label"><i></i>Diseño de ejemplo</span>')}
          <div class="demo-flow-canvas"><div class="demo-flow-line" aria-hidden="true"></div><article class="demo-flow-node flow-trigger"><span class="demo-flow-node-icon">01</span><div><small>CUANDO OCURRE</small><b>Llega pedido del sitio</b><span>Pedido web ficticio</span></div><i>✓</i></article><article class="demo-flow-node flow-check"><span class="demo-flow-node-icon">02</span><div><small>REVISAR</small><b>Confirmar productos</b><span>Revisar menú del día</span></div><i>✓</i></article><article class="demo-flow-node flow-save"><span class="demo-flow-node-icon">03</span><div><small>REGISTRAR</small><b>Anotar hora de recogida</b><span>Lista de preparación</span></div><i>✓</i></article><article class="demo-flow-node flow-notify"><span class="demo-flow-node-icon">04</span><div><small>DESPUÉS</small><b>Confirmar a la clienta</b><span>Mensaje de muestra</span></div><i>↗</i></article></div>
          <div class="demo-flow-bottom"><div><span class="demo-eyebrow">RESULTADO ESPERADO</span><b>Menos captura repetida; más claridad sobre el siguiente paso.</b></div><button class="demo-cta demo-cta-dark" type="button" data-demo-action="contact">Revisar mi proceso <span aria-hidden="true">↗</span></button></div>
        </section>
        <section class="demo-screen" id="flow-history-panel" role="tabpanel" aria-labelledby="flow-history" data-demo-screen="flow-history" tabindex="0" hidden>
          ${pageHead('EJECUCIONES DE MUESTRA', 'Historial del flujo', 'Ejemplos de seguimiento para saber qué ocurrió y qué requiere atención.', searchBox('Buscar ejecuciones de muestra'))}
          <div class="demo-panel"><div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Evento</th><th>Hora de ejemplo</th><th>Pasos completados</th><th>Resultado</th></tr></thead><tbody><tr data-demo-row data-demo-search="pedido web 0248 correcto 12:14"><td><b>Pedido web #0248</b></td><td>12:14</td><td>4 de 4</td><td>${status('Completado')}</td></tr><tr data-demo-row data-demo-search="pedido web 0247 revisar 11:42"><td><b>Pedido web #0247</b></td><td>11:42</td><td>3 de 4</td><td>${status('Revisión', 'amber')}</td></tr><tr data-demo-row data-demo-search="pedido web 0246 correcto 10:18"><td><b>Pedido web #0246</b></td><td>10:18</td><td>4 de 4</td><td>${status('Completado')}</td></tr></tbody></table></div><p class="demo-table-foot">Historial ilustrativo · no corresponde a ejecuciones reales</p></div>
        </section>
        <section class="demo-screen" id="flow-connections-panel" role="tabpanel" aria-labelledby="flow-connections" data-demo-screen="flow-connections" tabindex="0" hidden>
          ${pageHead('INTEGRACIONES', 'Herramientas del flujo', 'Cada conexión depende de las plataformas y permisos disponibles.', '<span class="demo-quiet-tag">Sin conexiones activas</span>')}
          <div class="demo-connection-grid"><article><span class="demo-connection-icon connection-coral">F</span><div><b>Pedido recibido en el sitio</b><small>Origen ilustrativo · por conectar</small></div><span class="demo-connection-state">Muestra</span></article><article><span class="demo-connection-icon connection-blue">R</span><div><b>Lista de preparación</b><small>Destino ilustrativo · por definir</small></div><span class="demo-connection-state">Muestra</span></article><article><span class="demo-connection-icon connection-lime">A</span><div><b>Confirmación por WhatsApp</b><small>Canal ilustrativo · por definir</small></div><span class="demo-connection-state">Muestra</span></article></div>
          <div class="demo-panel demo-info-strip"><span class="demo-panel-icon">i</span><p>Antes de automatizar revisamos reglas, excepciones, permisos y qué hacer cuando un paso falla.</p></div>
        </section>`
      , 'demo-automation'),
    },
  };

  window.NEXO_PROJECT_DEMOS = demos;
})();
