(() => {
  const hotel = {
    title: 'Hospedaje boutique: Casa Marea',
    kind: 'website',
    description: 'Un sitio editorial para un refugio ficticio junto al Pacífico. Prueba sus pantallas, selecciona una habitación y prepara una consulta de fechas de muestra; no confirma reservas.',
    markup: `
      <div class="demo-project site-demo site-demo-marea" data-demo-service="Página web" data-selected-room="Suite Marea" data-selected-room-price="2450">
        <div class="site-window-bar"><span></span><span></span><span></span><div>casa-marea.example</div><b>CONCEPTO · DESTINO FICTICIO</b></div>
        <header class="site-header site-header-marea">
          <button class="site-wordmark site-wordmark-marea" type="button" data-demo-tab="marea-home" aria-label="Volver a La casa"><i>CM</i><span>CASA<br />MAREA</span></button>
          <nav class="site-nav-tabs" role="tablist" aria-label="Secciones de Casa Marea">
            <button type="button" role="tab" aria-selected="true" tabindex="0" data-demo-tab="marea-home">La casa</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="marea-rooms">Habitaciones</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="marea-booking">Fechas</button>
          </nav>
          <span class="site-demo-pill">MUESTRA INTERACTIVA</span>
        </header>
        <main class="site-pages">
          <section class="demo-screen site-screen" data-demo-screen="marea-home" tabindex="0">
            <div class="site-hero site-hero-marea">
              <img src="assets/web-demos/casa-marea-hero.webp" alt="Refugio de piedra frente al mar al caer la noche" loading="lazy" />
              <div class="site-hero-shade"></div>
              <div class="site-hero-copy">
                <span class="site-overline">COSTA DEL PACÍFICO · DESTINO CONCEPTUAL</span>
                <h3>El mar, sin<br /><em>horarios.</em></h3>
                <p>Un refugio pequeño para volver a escuchar el día. Cuatro suites, una costa quieta y espacio para no hacer nada.</p>
                <button class="site-button site-button-light" type="button" data-demo-tab="marea-rooms">Explorar la estancia <span aria-hidden="true">↗</span></button>
              </div>
              <div class="site-hero-caption"><span>16° 02′ N · 96° 43′ O</span><span>UBICACIÓN FICTICIA</span></div>
              <div class="site-hero-side-note">NO HAY PRISA<br />POR LLEGAR</div>
            </div>
            <div class="site-proof-strip site-proof-marea"><span>04 <small>SUITES</small></span><span>01 <small>PLAYA TRANQUILA</small></span><span>∞ <small>TIEMPO LENTO</small></span><span class="site-proof-link">UN LUGAR PARA QUEDARSE <b>↓</b></span></div>
            <section class="site-editorial-block"><span class="site-overline">EL RITMO DE AQUÍ</span><h4>Una estancia que<br /><em>no compite contigo.</em></h4><p>Arquitectura sencilla, materiales de la costa y mañanas que empiezan cuando quieres. Un concepto visual, todavía sin operación real.</p><button type="button" class="site-text-link" data-demo-tab="marea-booking">Consultar fechas de muestra ↗</button></section>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="marea-rooms" tabindex="0" hidden>
            <div class="site-page-heading site-page-heading-marea"><span class="site-overline">HABITAR EL SILENCIO · 03 OPCIONES</span><h3>Elige tu manera<br /><em>de estar aquí.</em></h3><p>Recorre tres fotos por suite y compara las tarifas ficticias por noche.</p><p class="marea-price-disclaimer">Precios de muestra en MXN; no son tarifas reales ni confirman disponibilidad.</p></div>
            <div class="marea-room-grid">
              <article class="marea-room-card room-sal">
                <div class="marea-room-art marea-room-gallery" data-demo-room-gallery data-demo-gallery-index="0" data-demo-gallery-srcs="assets/web-demos/suite-sal.webp|assets/web-demos/suite-sal-gallery-2.webp|assets/web-demos/suite-sal-gallery-3.webp" data-demo-gallery-alts="Suite Sal con cama de lino y patio privado|Vista de Suite Sal desde el patio hacia el dormitorio|Ducha exterior y patio privado de Suite Sal">
                  <img data-demo-room-photo src="assets/web-demos/suite-sal.webp" alt="Suite Sal con cama de lino y patio privado" loading="lazy" /><span>01 / SAL</span><b>sal</b><span class="marea-gallery-count" data-demo-gallery-count aria-live="polite">1 / 3</span><button type="button" class="marea-gallery-arrow marea-gallery-prev" data-demo-gallery-step="-1" aria-label="Ver foto anterior de Suite Sal">‹</button><button type="button" class="marea-gallery-arrow marea-gallery-next" data-demo-gallery-step="1" aria-label="Ver foto siguiente de Suite Sal">›</button>
                </div>
                <div class="marea-room-copy"><span>PLANTA BAJA · PATIO</span><h4>Suite Sal</h4><p>Una sombra fresca, ducha exterior y un patio privado para leer sin señal.</p><div class="marea-room-price"><b>$ 1,850</b><span>MXN / noche</span></div><small class="marea-price-label">Tarifa ficticia de muestra</small><button type="button" data-demo-room-select="Suite Sal" data-demo-room-price="1850" aria-pressed="false">Elegir esta suite <span>↗</span></button></div>
              </article>
              <article class="marea-room-card room-marea is-selected">
                <div class="marea-room-art marea-room-gallery" data-demo-room-gallery data-demo-gallery-index="0" data-demo-gallery-srcs="assets/web-demos/suite-marea.webp|assets/web-demos/suite-marea-gallery-2.webp|assets/web-demos/suite-marea-gallery-3.webp" data-demo-gallery-alts="Suite Marea con terraza abierta y vista al mar|Vista desde el dormitorio de Suite Marea hacia la terraza y el Pacífico|Rincón de descanso en la terraza de Suite Marea con vista al océano">
                  <img data-demo-room-photo src="assets/web-demos/suite-marea.webp" alt="Suite Marea con terraza abierta y vista al mar" loading="lazy" /><span>02 / MAREA</span><b>marea</b><span class="marea-gallery-count" data-demo-gallery-count aria-live="polite">1 / 3</span><button type="button" class="marea-gallery-arrow marea-gallery-prev" data-demo-gallery-step="-1" aria-label="Ver foto anterior de Suite Marea">‹</button><button type="button" class="marea-gallery-arrow marea-gallery-next" data-demo-gallery-step="1" aria-label="Ver foto siguiente de Suite Marea">›</button>
                </div>
                <div class="marea-room-copy"><span>VISTA AL MAR · TERRAZA</span><h4>Suite Marea</h4><p>Luz de tarde, una terraza abierta y el sonido del agua como único plan.</p><div class="marea-room-price"><b>$ 2,450</b><span>MXN / noche</span></div><small class="marea-price-label">Tarifa ficticia de muestra</small><button type="button" data-demo-room-select="Suite Marea" data-demo-room-price="2450" aria-pressed="true">Elegida <span>✓</span></button></div>
              </article>
              <article class="marea-room-card room-luna">
                <div class="marea-room-art marea-room-gallery" data-demo-room-gallery data-demo-gallery-index="0" data-demo-gallery-srcs="assets/web-demos/suite-luna.webp|assets/web-demos/suite-luna-gallery-2.webp|assets/web-demos/suite-luna-gallery-3.webp" data-demo-gallery-alts="Suite Luna elevada con terraza privada al anochecer|Interior de Suite Luna con puertas abiertas a la terraza en el atardecer|Terraza elevada de Suite Luna iluminada al caer la noche">
                  <img data-demo-room-photo src="assets/web-demos/suite-luna.webp" alt="Suite Luna elevada con terraza privada al anochecer" loading="lazy" /><span>03 / LUNA</span><b>luna</b><span class="marea-gallery-count" data-demo-gallery-count aria-live="polite">1 / 3</span><button type="button" class="marea-gallery-arrow marea-gallery-prev" data-demo-gallery-step="-1" aria-label="Ver foto anterior de Suite Luna">‹</button><button type="button" class="marea-gallery-arrow marea-gallery-next" data-demo-gallery-step="1" aria-label="Ver foto siguiente de Suite Luna">›</button>
                </div>
                <div class="marea-room-copy"><span>ESQUINA · CIELO ABIERTO</span><h4>Suite Luna</h4><p>Un rincón elevado para mirar las estrellas y empezar el día tarde.</p><div class="marea-room-price"><b>$ 3,100</b><span>MXN / noche</span></div><small class="marea-price-label">Tarifa ficticia de muestra</small><button type="button" data-demo-room-select="Suite Luna" data-demo-room-price="3100" aria-pressed="false">Elegir esta suite <span>↗</span></button></div>
              </article>
            </div>
            <div class="site-selection-bar"><span data-demo-room-feedback role="status" aria-live="polite">Suite Marea seleccionada · solo muestra</span><button class="site-button site-button-dark" type="button" data-demo-tab="marea-booking">Consultar fechas de muestra <span aria-hidden="true">→</span></button></div>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="marea-booking" tabindex="0" hidden>
            <div class="site-page-heading site-page-heading-marea"><span class="site-overline">SOLICITUD DE MUESTRA · SIN RESERVA</span><h3>¿Cuándo te gustaría<br /><em>desconectarte?</em></h3><p>Prueba el formulario. No consulta disponibilidad ni envía una solicitud.</p></div>
            <div class="site-booking-layout"><div class="site-booking-form" data-demo-hotel-form>
              <label>Entrada<input type="date" data-demo-hotel-start /></label><label>Salida<input type="date" data-demo-hotel-end /></label><label>Huéspedes<select data-demo-hotel-guests><option>2</option><option>1</option><option>3</option><option>4</option></select></label>
              <button class="site-button site-button-dark" type="button" data-demo-hotel-check>Preparar consulta de prueba <span aria-hidden="true">↗</span></button>
              <p data-demo-hotel-result role="status" aria-live="polite">Suite seleccionada: Suite Marea. Todavía no se ha reservado nada.</p>
            </div><aside class="site-booking-note"><span class="site-overline">TU ELECCIÓN</span><strong data-demo-room-summary>Suite Marea</strong><div class="site-booking-rate"><b data-demo-selected-rate>$ 2,450 MXN</b><span>por noche · tarifa ficticia</span></div><p class="site-booking-estimate" data-demo-hotel-estimate role="status" aria-live="polite">Elige fechas para estimar el total de muestra.</p><div>CASA MAREA · CONCEPTO DIGITAL</div></aside></div>
          </section>
        </main>
        <footer class="site-footer site-footer-marea"><span>CASA MAREA · DESTINO FICTICIO</span><span>HOSPEDAJE · COSTA · PAUSA</span><span>NO SE REALIZAN RESERVAS</span></footer>
      </div>`,
  };

  const fashion = {
    title: 'Tienda de moda de autor: ONDA',
    kind: 'website',
    description: 'Una tienda de moda ficticia con dirección editorial, filtros de colección y bolsa de muestra. Puedes probar filtros, tallas y añadir artículos; no hay checkout ni compra real.',
    markup: `
      <div class="demo-project site-demo site-demo-onda" data-demo-service="Página web" data-demo-bag-count="0">
        <div class="site-window-bar site-window-bar-dark"><span></span><span></span><span></span><div>onda.studio</div><b>MODA DE AUTOR · FICTICIA</b></div>
        <header class="site-header site-header-onda">
          <button class="onda-wordmark" type="button" data-demo-tab="onda-home" aria-label="Volver a la campaña ONDA">ONDA<span>®</span><small>ESTUDIO DE ROPA</small></button>
          <nav class="site-nav-tabs site-nav-tabs-onda" role="tablist" aria-label="Secciones de ONDA">
            <button type="button" role="tab" aria-selected="true" tabindex="0" data-demo-tab="onda-home">Campaña</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="onda-shop">Tienda</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="onda-about">Manifiesto</button>
          </nav>
          <div class="onda-bag-label">BOLSA <span data-demo-bag-count>0</span></div>
        </header>
        <main class="site-pages site-pages-onda">
          <section class="demo-screen site-screen" data-demo-screen="onda-home" tabindex="0">
            <div class="onda-campaign-hero"><div class="onda-campaign-copy"><span class="site-overline">DROP 01 · OBJETOS PARA MOVERSE</span><h3>No vinimos<br />a <em>combinar.</em></h3><p>Ropa hecha para quien mezcla la ciudad, el taller y lo que todavía no tiene nombre.</p><button class="site-button site-button-onda" type="button" data-demo-tab="onda-shop">Ver la colección <span aria-hidden="true">↗</span></button><span class="onda-campaign-index">COLECCIÓN 01 / 26</span></div><div class="onda-campaign-image"><img src="assets/web-demos/onda-fashion-hero.webp" alt="Campaña de moda con prendas azules y acentos naranja en un patio de concreto" loading="lazy" /><span>NO SEGUIR<br />LA LÍNEA</span><b>OND / 001</b></div></div>
            <div class="onda-marquee" aria-hidden="true"><span>HECHO PARA MOVERSE · HECHO PARA MOVERSE · HECHO PARA MOVERSE ·</span></div>
            <div class="onda-feature-row"><div><span>01</span><b>Series pequeñas</b><small>Prendas de edición limitada</small></div><div><span>02</span><b>Hecho cerca</b><small>Producción independiente</small></div><div><span>03</span><b>Sin uniforme</b><small>Tu combinación, tus reglas</small></div></div>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="onda-shop" tabindex="0" hidden>
            <div class="onda-shop-top"><div><span class="site-overline">COLECCIÓN 01 · MOCK STORE</span><h3>La ropa no pide permiso.</h3><p>Filtra, elige talla y prueba la bolsa de muestra.</p></div><label class="onda-filter-label">VER<select data-demo-shop-filter aria-label="Filtrar productos de la colección"><option value="all">Todo el drop</option><option value="ropa">Ropa</option><option value="accesorios">Accesorios</option></select></label></div>
            <div class="onda-product-grid">
              <article class="onda-product-card" data-demo-product-card data-demo-product-category="ropa"><div class="onda-product-art onda-art-jacket"><img src="assets/web-demos/onda-jacket.webp" alt="Chamarra azul con vivos naranja" loading="lazy" /><span>01</span></div><div class="onda-product-info"><div><span>TEXTIL · SERIE CORTA</span><b>$ 2,890</b></div><h4>Chamarra Interferencia</h4><p>Azul profundo · vivos naranja</p><label>Talla<select data-demo-product-size aria-label="Talla de Chamarra Interferencia"><option>S</option><option>M</option><option>L</option><option>XL</option></select></label><button type="button" data-demo-add-to-bag="Chamarra Interferencia">Añadir a bolsa de muestra <span>+</span></button></div></article>
              <article class="onda-product-card" data-demo-product-card data-demo-product-category="ropa"><div class="onda-product-art onda-art-tee"><img src="assets/web-demos/onda-tee.webp" alt="Playera color hueso con gráfica abstracta azul y naranja" loading="lazy" /><span>02</span></div><div class="onda-product-info"><div><span>TEXTIL · ALGODÓN PESADO</span><b>$ 980</b></div><h4>Playera Desfase</h4><p>Hueso · gráfica asimétrica</p><label>Talla<select data-demo-product-size aria-label="Talla de Playera Desfase"><option>M</option><option>S</option><option>L</option><option>XL</option></select></label><button type="button" data-demo-add-to-bag="Playera Desfase">Añadir a bolsa de muestra <span>+</span></button></div></article>
              <article class="onda-product-card" data-demo-product-card data-demo-product-category="accesorios"><div class="onda-product-art onda-art-bag"><img src="assets/web-demos/onda-bag.webp" alt="Bolsa cruzada de tela técnica color óxido" loading="lazy" /><span>03</span></div><div class="onda-product-info"><div><span>ACCESORIO · TEXTIL TÉCNICO</span><b>$ 760</b></div><h4>Bolsa Tránsito</h4><p>Naranja óxido · dos formas</p><label>Versión<select data-demo-product-size aria-label="Versión de Bolsa Tránsito"><option>Óxido</option><option>Azul</option><option>Negro</option></select></label><button type="button" data-demo-add-to-bag="Bolsa Tránsito">Añadir a bolsa de muestra <span>+</span></button></div></article>
            </div>
            <p class="onda-bag-feedback" data-demo-bag-status role="status" aria-live="polite">La bolsa es solo una simulación: no se procesa ninguna compra.</p>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="onda-about" tabindex="0" hidden>
            <div class="onda-manifesto"><span class="site-overline">MANIFIESTO · NÚMERO 01</span><h3>Vestirse también<br />es <em>tomar espacio.</em></h3><p>No hacemos básicos para desaparecer. Diseñamos series pequeñas, elegimos materiales con carácter y dejamos que cada persona termine la pieza a su manera.</p><div><span>DISEÑO INDEPENDIENTE</span><span>PRODUCCIÓN LIMITADA</span><span>CIUDAD FICTICIA</span></div><button class="site-button site-button-onda" type="button" data-demo-tab="onda-shop">Explorar piezas <span aria-hidden="true">↗</span></button></div>
          </section>
        </main>
        <footer class="site-footer site-footer-onda"><span>ONDA® · MARCA CONCEPTUAL</span><span>NO HAY CHECKOUT REAL</span><span>DROP 01 / 26</span></footer>
      </div>`,
  };

  const restaurant = {
    title: 'Restaurante contemporáneo: Mesa Nativa',
    kind: 'website',
    description: 'Un sitio de restaurante ficticio con identidad cálida, menú por categorías y un formulario que prepara una reserva de prueba. No se envían solicitudes ni se confirma una mesa.',
    markup: `
      <div class="demo-project site-demo site-demo-nativa" data-demo-service="Página web">
        <div class="site-window-bar site-window-bar-dark"><span></span><span></span><span></span><div>mesanativa.example</div><b>RESTAURANTE · CONCEPTO</b></div>
        <header class="site-header site-header-nativa">
          <button class="nativa-wordmark" type="button" data-demo-tab="nativa-home" aria-label="Volver a Mesa Nativa"><span>MN</span><b>MESA<br />NATIVA</b></button>
          <nav class="site-nav-tabs site-nav-tabs-nativa" role="tablist" aria-label="Secciones de Mesa Nativa">
            <button type="button" role="tab" aria-selected="true" tabindex="0" data-demo-tab="nativa-home">La mesa</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="nativa-menu">Menú</button>
            <button type="button" role="tab" aria-selected="false" tabindex="-1" data-demo-tab="nativa-reserve">Mesa de prueba</button>
          </nav>
          <span class="site-nativa-location">COCINA DE TEMPORADA · FICTICIA</span>
        </header>
        <main class="site-pages site-pages-nativa">
          <section class="demo-screen site-screen" data-demo-screen="nativa-home" tabindex="0">
            <div class="nativa-hero"><img src="assets/web-demos/mesa-nativa-hero.webp" alt="Tostada de maíz azul con ingredientes de temporada sobre cerámica artesanal" loading="lazy" /><div class="nativa-hero-overlay"></div><div class="nativa-hero-copy"><span class="site-overline">COCINA DE TEMPORADA · CIUDAD CONCEPTUAL</span><h3>La tierra<br />también <em>habla.</em></h3><p>Maíz, fuego y producto cercano. Un menú que cambia cuando cambia la estación.</p><button class="site-button site-button-nativa" type="button" data-demo-tab="nativa-menu">Descubrir el menú <span aria-hidden="true">↗</span></button></div><div class="nativa-hero-stamp">COCINA<br />CON RAÍZ</div></div>
            <div class="nativa-home-note"><span>01 / INGREDIENTE</span><b>Primero, lo que da la tierra.</b><span>02 / FUEGO</span><b>Después, lo que hacemos con él.</b></div>
            <div class="nativa-home-foot"><p>Un espacio inventado para mostrar una web con menú y reservas de prueba.</p><button type="button" class="site-text-link site-text-link-nativa" data-demo-tab="nativa-reserve">Preparar una visita ficticia ↗</button></div>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="nativa-menu" tabindex="0" hidden>
            <div class="nativa-menu-heading"><div><span class="site-overline">COCINA VIVA · CARTA FICTICIA</span><h3>Al centro<br />de la mesa.</h3></div><label class="nativa-filter-label">MIRAR<select data-demo-menu-filter aria-label="Filtrar platos de muestra"><option value="all">Toda la carta</option><option value="para-compartir">Al centro</option><option value="platos">Platos</option><option value="bebidas">Bebidas</option></select></label></div>
            <div class="nativa-menu-list">
              <article data-demo-menu-item data-demo-menu-category="para-compartir"><img class="nativa-menu-photo" src="assets/web-demos/nativa-maiz.webp" alt="Tostada de maíz azul con tomate tatemado" loading="lazy" /><div class="nativa-menu-item-info"><span>01 · PARA COMPARTIR</span><h4>Maíz azul, tomate tatemado</h4><p>Quelites, aceite de chile seco · 2 piezas</p></div><b>$ 185</b></article>
              <article data-demo-menu-item data-demo-menu-category="platos"><img class="nativa-menu-photo" src="assets/web-demos/nativa-calabaza.webp" alt="Calabaza asada con pepitas, hoja santa y crema" loading="lazy" /><div class="nativa-menu-item-info"><span>02 · PLATO</span><h4>Calabaza al fuego</h4><p>Semillas, hoja santa, crema de rancho</p></div><b>$ 260</b></article>
              <article data-demo-menu-item data-demo-menu-category="platos"><img class="nativa-menu-photo" src="assets/web-demos/nativa-pesca.webp" alt="Pesca a la parrilla con frijol blanco, limón y hierbas" loading="lazy" /><div class="nativa-menu-item-info"><span>03 · PLATO</span><h4>Pesca del día</h4><p>Frijol blanco, limón real, hierbas</p></div><b>$ 390</b></article>
              <article data-demo-menu-item data-demo-menu-category="bebidas"><img class="nativa-menu-photo" src="assets/web-demos/nativa-agua.webp" alt="Agua fría de hoja de limón servida en vaso" loading="lazy" /><div class="nativa-menu-item-info"><span>04 · BEBIDA</span><h4>Agua de hoja de limón</h4><p>Infusión fría · sin alcohol</p></div><b>$ 75</b></article>
            </div>
            <p class="nativa-menu-disclaimer">Carta y precios inventados para esta prueba visual.</p><button type="button" class="site-button site-button-nativa" data-demo-tab="nativa-reserve">Preparar una visita <span aria-hidden="true">↗</span></button>
          </section>
          <section class="demo-screen site-screen" data-demo-screen="nativa-reserve" tabindex="0" hidden>
            <div class="nativa-reserve-intro"><span class="site-overline">RESERVA SIMULADA · NO SE ENVÍA</span><h3>Guarda un lugar<br />en la <em>conversación.</em></h3><p>Completa los datos para ver una confirmación de prueba. No se contacta al restaurante.</p></div>
            <div class="nativa-reservation-card"><div class="nativa-reservation-form"><label>Nombre de muestra<input type="text" data-demo-reservation-name placeholder="Tu nombre" /></label><div class="nativa-reservation-row"><label>Día<input type="date" data-demo-reservation-date /></label><label>Hora<select data-demo-reservation-time><option value="19:00">7:00 p. m.</option><option value="19:30">7:30 p. m.</option><option value="20:00">8:00 p. m.</option><option value="20:30">8:30 p. m.</option></select></label></div><label>Personas<select data-demo-reservation-guests><option value="2">2 personas</option><option value="1">1 persona</option><option value="3">3 personas</option><option value="4">4 personas</option><option value="5">5 personas</option></select></label><button type="button" class="site-button site-button-nativa" data-demo-restaurant-preview>Ver confirmación de prueba <span aria-hidden="true">↗</span></button><p data-demo-restaurant-result role="status" aria-live="polite">No se ha solicitado ni reservado ninguna mesa.</p></div><aside class="nativa-reservation-aside"><span>MN / 01</span><b>La mesa se hace<br />entre todos.</b><small>MENÚ DE TEMPORADA<br />DESTINO FICTICIO</small></aside></div>
          </section>
        </main>
        <footer class="site-footer site-footer-nativa"><span>MESA NATIVA · MARCA CONCEPTUAL</span><span>MAÍZ · FUEGO · TEMPORADA</span><span>NO SE HACEN RESERVAS REALES</span></footer>
      </div>`,
  };

  Object.assign(window.NEXO_PROJECT_DEMOS, { hotel, fashion, restaurant });
})();
