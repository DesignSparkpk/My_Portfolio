/* =====================================================================
   BELLA'S — APP
   Renders the menu from js/menu-data.js, runs the WhatsApp order cart,
   table booking, live open/closed status and the mobile navigation.
   No frameworks, no build step.
   ===================================================================== */
(() => {
  'use strict';

  const D = window.BELLAS;
  if (!D) { console.error("Bella's: menu-data.js did not load."); return; }
  const B = D.business;

  /* ---------- Helpers ---------- */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => `${B.currency} ${Number(n).toLocaleString('en-US')}`;
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const waUrl = (text) => `https://wa.me/${B.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  const GREETING = `Assalam-o-Alaikum ${B.name}! `;

  const catById = Object.fromEntries(D.categories.map((c) => [c.id, c]));
  const itemById = Object.fromEntries(D.items.map((i) => [i.id, i]));

  /* =====================================================================
     1. Business details → page (phone, links, hours, rating…)
     ===================================================================== */
  const LINKS = {
    call: `tel:${B.phoneIntl}`,
    whatsapp: waUrl(`${GREETING}I'd like to place an order / book a table.`),
    maps: B.mapsUrl
  };
  $$('[data-link]').forEach((a) => { if (LINKS[a.dataset.link]) a.href = LINKS[a.dataset.link]; });

  const BINDINGS = {
    phoneDisplay: B.phoneDisplay,
    hours: B.hours.label.replace(/ (AM|PM)/g, '\u00A0$1'),
    days: B.hours.days,
    address: B.address,
    area: B.area,
    rating: Number(B.rating).toFixed(1),
    reviewCount: Number(B.reviewCount).toLocaleString('en-US'),
    year: String(new Date().getFullYear())
  };
  $$('[data-bind]').forEach((el) => { const v = BINDINGS[el.dataset.bind]; if (v != null) el.textContent = v; });

  const creditEl = $('[data-credit]');
  if (creditEl) {
    if (B.credit && B.credit.name) {
      creditEl.innerHTML = B.credit.url
        ? `Website by <a href="${esc(B.credit.url)}" target="_blank" rel="noopener">${esc(B.credit.name)}</a>`
        : `Website by ${esc(B.credit.name)}`;
    } else {
      creditEl.remove();
    }
  }

  /* =====================================================================
     2. Open / closed status — always in Pakistan time
     ===================================================================== */
  const toMinutes = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const formatTime = (mins) => {
    const m = ((mins % 1440) + 1440) % 1440;
    let h = Math.floor(m / 60); const mm = m % 60;
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return mm ? `${h}:${String(mm).padStart(2, '0')}\u00A0${ap}` : `${h}\u00A0${ap}`;
  };
  function nowInTimezone() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: B.timezone, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    }).formatToParts(new Date());
    const get = (t) => (parts.find((p) => p.type === t) || {}).value;
    return { minutes: Number(get('hour')) * 60 + Number(get('minute')), isoDate: `${get('year')}-${get('month')}-${get('day')}` };
  }
  const OPEN = toMinutes(B.hours.open);
  const CLOSE = toMinutes(B.hours.close);
  const isOpenAt = (mins) => (CLOSE > OPEN ? mins >= OPEN && mins < CLOSE : mins >= OPEN || mins < CLOSE);

  function updateStatus() {
    const open = isOpenAt(nowInTimezone().minutes);
    const text = open ? `Open now · closes ${formatTime(CLOSE)}` : `Closed now · opens ${formatTime(OPEN)}`;
    $$('[data-status]').forEach((el) => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      const t = $('[data-status-text]', el);
      if (t) t.textContent = text;
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* =====================================================================
     3. Navigation
     ===================================================================== */
  const nav = $('[data-nav]');
  const navToggle = $('[data-nav-toggle]');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('use', navToggle).setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  navToggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  $$('#nav-links a').forEach((a) => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); navToggle.focus(); } });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

  /* =====================================================================
     4. Cart (stored on this device so a refresh doesn't lose the order)
     ===================================================================== */
  const CART_STORAGE = 'bellas-cart-v1';
  const cartKey = (id, size) => (size ? `${id}|${size}` : id);
  const cart = new Map();

  const unitPrice = (item, sizeLabel) => {
    if (item.sizes) { const s = item.sizes.find((z) => z.label === sizeLabel) || item.sizes[0]; return s.price; }
    return item.price;
  };
  const lineTotal = (line) => unitPrice(itemById[line.id], line.size) * line.qty;
  const lineLabel = (line) => `${itemById[line.id].name}${line.size ? ` (${line.size})` : ''}`;

  (function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE) || '[]');
      saved.forEach((l) => {
        const item = itemById[l.id];
        if (!item || item.available === false) return;                       // removed or sold out since
        if (item.sizes ? !item.sizes.some((s) => s.label === l.size) : l.size) return; // size no longer offered
        const qty = Math.max(1, Math.min(99, parseInt(l.qty, 10) || 1));
        cart.set(cartKey(l.id, l.size), { id: l.id, size: l.size || null, qty });
      });
    } catch (_) { /* storage unavailable or corrupt — start empty */ }
  })();

  function saveCart() {
    try { localStorage.setItem(CART_STORAGE, JSON.stringify(Array.from(cart.values()))); } catch (_) { /* private mode */ }
  }
  function cartTotals() {
    let count = 0; let total = 0;
    cart.forEach((l) => { count += l.qty; total += lineTotal(l); });
    return { count, total };
  }
  function addToCart(item, sizeLabel) {
    const key = cartKey(item.id, sizeLabel);
    const line = cart.get(key) || { id: item.id, size: sizeLabel || null, qty: 0 };
    line.qty = Math.min(99, line.qty + 1);
    cart.set(key, line);
    cartChanged(true);
  }
  function changeQty(key, delta) {
    const line = cart.get(key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart.delete(key); else line.qty = Math.min(99, line.qty);
    cartChanged(delta > 0);
  }

  /* =====================================================================
     5. Menu — tabs, search, dish cards
     ===================================================================== */
  const state = { cat: 'all', q: '' };
  const selectedSize = {};                   // itemId → size label
  const tabsEl = $('[data-tabs]');
  const tabsWrap = $('[data-tabs-wrap]');
  const menuEl = $('[data-menu]');
  const summaryEl = $('[data-menu-summary]');
  const searchEl = $('[data-search]');

  const TAGS = {
    popular: ['star', 'Popular'],
    signature: ['sparkles', 'Signature'],
    spicy: ['flame', 'Spicy'],
    new: ['heart', 'New']
  };
  const normalise = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function renderTabs() {
    const tabs = [{ id: 'all', name: 'All', icon: 'utensils-crossed' }]
      .concat(D.categories.filter((c) => D.items.some((i) => i.category === c.id)));
    tabsEl.innerHTML = tabs.map((c) => {
      const on = state.cat === c.id;
      return `<button class="tab" type="button" role="tab" id="tab-${c.id}" data-cat="${c.id}"
        aria-controls="menu-panel" aria-selected="${on}" tabindex="${on ? 0 : -1}">${icon(c.icon)}<span>${esc(c.tab || c.name)}</span></button>`;
    }).join('');
  }

  function matches(item) {
    if (state.cat !== 'all' && item.category !== state.cat) return false;
    if (!state.q) return true;
    const cat = catById[item.category];
    const hay = normalise(`${item.name} ${item.description} ${cat ? cat.name : ''} ${(item.tags || []).join(' ')}`);
    const hayWords = hay.split(/[^a-z0-9]+/).filter(Boolean);
    return normalise(state.q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w)
      || (w.length >= 4 && hayWords.some((h) => withinOneEdit(w, h) || withinOneEdit(w, h.slice(0, w.length)))));
  }

  // Forgiving search: "nutela" finds Nutella, "piza" finds Pizza.
  function withinOneEdit(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0; let j = 0; let edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  function currentSize(item) {
    if (!item.sizes) return null;
    const picked = item.sizes.find((s) => s.label === selectedSize[item.id]);
    if (picked) return picked;
    // No size picked yet: show the size that's already in the order (e.g. after a page refresh), else the first.
    return item.sizes.find((s) => cart.has(cartKey(item.id, s.label))) || item.sizes[0];
  }

  function actionHTML(item, size) {
    if (item.available === false) return '<button class="add-btn" type="button" disabled>Sold out</button>';
    const key = cartKey(item.id, size && size.label);
    const qty = cart.has(key) ? cart.get(key).qty : 0;
    const label = esc(`${item.name}${size ? ` (${size.label})` : ''}`);
    if (!qty) {
      return `<button class="add-btn" type="button" data-add aria-label="Add ${label} to order">${icon('plus')}<span>Add</span></button>`;
    }
    return `<div class="stepper" role="group" aria-label="${label} in your order">
      <button type="button" data-dec aria-label="Remove one ${label}">${icon('minus')}</button>
      <output aria-live="polite">${qty}</output>
      <button type="button" data-inc aria-label="Add one more ${label}">${icon('plus')}</button>
    </div>`;
  }

  function dishHTML(item) {
    const size = currentSize(item);
    const soldOut = item.available === false;
    const tags = (item.tags || []).filter((t) => TAGS[t])
      .map((t) => `<span class="tag tag--${t}">${icon(TAGS[t][0])}${TAGS[t][1]}</span>`).join('')
      + (soldOut ? '<span class="tag tag--soldout">Sold out</span>' : '');
    const sizes = item.sizes
      ? `<div class="sizes" role="group" aria-label="Size for ${esc(item.name)}">${item.sizes.map((s) =>
          `<button class="size" type="button" data-size="${esc(s.label)}" aria-pressed="${s.label === size.label}">${esc(s.label)}</button>`).join('')}</div>`
      : '';
    const inCart = Array.from(cart.values()).some((l) => l.id === item.id);
    return `<article class="dish${soldOut ? ' is-soldout' : ''}${inCart ? ' is-in-cart' : ''}" data-id="${esc(item.id)}">
      <div class="dish__top">
        <h4 class="dish__name">${esc(item.name)}</h4>
        <span class="dish__price" data-price>${money(size ? size.price : item.price)}</span>
      </div>
      ${tags ? `<div class="dish__tags">${tags}</div>` : ''}
      <p class="dish__desc">${esc(item.description)}</p>
      <div class="dish__foot">${sizes}<div class="dish__action" data-action>${actionHTML(item, size)}</div></div>
    </article>`;
  }

  function renderMenu() {
    const groups = D.categories
      .map((c) => ({ c, items: D.items.filter((i) => i.category === c.id && matches(i)) }))
      .filter((g) => g.items.length);
    const total = groups.reduce((n, g) => n + g.items.length, 0);

    summaryEl.textContent = state.q
      ? `${total} ${total === 1 ? 'dish' : 'dishes'} found for “${state.q}”${state.cat !== 'all' ? ` in ${catById[state.cat].name}` : ''}`
      : '';

    if (!groups.length) {
      const wider = state.cat !== 'all'
        ? '<button class="btn btn--ghost" type="button" data-search-all>Search the whole menu</button>'
        : '<button class="btn btn--ghost" type="button" data-clear-search>Clear search</button>';
      menuEl.innerHTML = `<div class="menu__empty"><strong>Nothing found</strong>Try “pizza”, “shake” or “mango” — or ask us on WhatsApp.<br>${wider}</div>`;
      return;
    }

    menuEl.innerHTML = groups.map((g) => `
      <section class="menu-group" aria-labelledby="grp-${g.c.id}">
        <div class="menu-group__head">
          <span class="menu-group__icon">${icon(g.c.icon)}</span>
          <h3 class="menu-group__title" id="grp-${g.c.id}">${esc(g.c.name)}</h3>
          <span class="menu-group__line" aria-hidden="true"></span>
          <span class="menu-group__count">${g.items.length} ${g.items.length === 1 ? 'item' : 'items'}</span>
        </div>
        <div class="dish-grid">${g.items.map(dishHTML).join('')}</div>
      </section>`).join('');
  }

  function refreshCard(card, focusSel) {
    const item = itemById[card.dataset.id];
    if (!item) return;
    const size = currentSize(item);
    $('[data-price]', card).textContent = money(size ? size.price : item.price);
    $$('[data-size]', card).forEach((b) => b.setAttribute('aria-pressed', String(!!size && b.dataset.size === size.label)));
    $('[data-action]', card).innerHTML = actionHTML(item, size);
    card.classList.toggle('is-in-cart', Array.from(cart.values()).some((l) => l.id === item.id));
    if (focusSel) { const f = $(focusSel, card); if (f) f.focus(); }
  }
  const refreshCardFor = (itemId) => {
    const card = menuEl.querySelector(`.dish[data-id="${CSS.escape(itemId)}"]`);
    if (card) refreshCard(card);
  };

  function scrollTabIntoView(btn) {
    if (tabsEl.scrollWidth <= tabsEl.clientWidth) return;
    const left = btn.offsetLeft - (tabsEl.clientWidth - btn.offsetWidth) / 2;
    tabsEl.scrollTo({ left: Math.max(0, left), behavior: scrollBehavior });
  }
  function keepMenuInView() {
    // If the visitor has scrolled down into the menu, bring the top of the results back under the sticky tabs.
    const stickyBottom = tabsWrap.getBoundingClientRect().bottom;
    const top = menuEl.getBoundingClientRect().top;
    if (top < stickyBottom) window.scrollTo({ top: window.scrollY + top - stickyBottom - 8, behavior: scrollBehavior });
  }
  function selectCategory(id, { focus = false } = {}) {
    state.cat = catById[id] ? id : 'all';
    $$('[data-cat]', tabsEl).forEach((b) => {
      const on = b.dataset.cat === state.cat;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on) { scrollTabIntoView(b); if (focus) b.focus({ preventScroll: true }); }
    });
    renderMenu();
    keepMenuInView();
  }

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (b) selectCategory(b.dataset.cat);
  });
  tabsEl.addEventListener('keydown', (e) => {
    const tabs = $$('[data-cat]', tabsEl);
    const i = tabs.findIndex((t) => t.dataset.cat === state.cat);
    let next = null;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (next) { e.preventDefault(); selectCategory(next.dataset.cat, { focus: true }); }
  });

  let searchTimer;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.q = searchEl.value.trim(); renderMenu(); }, 120);
  });
  searchEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(searchTimer); state.q = searchEl.value.trim(); renderMenu(); } });

  menuEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-search-all]')) { selectCategory('all'); return; }
    if (e.target.closest('[data-clear-search]')) { searchEl.value = ''; state.q = ''; renderMenu(); searchEl.focus(); return; }

    const card = e.target.closest('.dish');
    if (!card) return;
    const item = itemById[card.dataset.id];
    if (!item || item.available === false) return;

    const sizeBtn = e.target.closest('[data-size]');
    if (sizeBtn) { selectedSize[item.id] = sizeBtn.dataset.size; refreshCard(card); return; }

    const size = currentSize(item);
    const sizeLabel = size ? size.label : null;
    const key = cartKey(item.id, sizeLabel);

    if (e.target.closest('[data-add]')) {
      addToCart(item, sizeLabel);
      refreshCard(card, '[data-inc]');
      toast(`Added ${item.name}${sizeLabel ? ` (${sizeLabel})` : ''}`);
    } else if (e.target.closest('[data-inc]')) {
      changeQty(key, +1);
      refreshCard(card, '[data-inc]');
    } else if (e.target.closest('[data-dec]')) {
      changeQty(key, -1);
      refreshCard(card, cart.has(key) ? '[data-dec]' : '[data-add]');
    }
  });

  /* =====================================================================
     6. Order drawer + WhatsApp message
     ===================================================================== */
  const dialog = $('[data-cart-dialog]');
  const linesEl = $('[data-cart-lines]');
  const orderForm = $('[data-order-form]');
  const addressField = $('[data-address-field]');
  const addressInput = $('#order-address');
  const pill = $('[data-cart-pill]');
  const pillText = $('[data-cart-pill-text]');
  const actionOrder = $('[data-action-order]');
  const actionOrderLabel = $('[data-action-order-label]');
  const TYPE_LABEL = { delivery: 'Delivery', pickup: 'Pickup', dinein: 'Dine-in' };

  function renderCart() {
    const lines = Array.from(cart.entries());
    $('[data-cart-empty]').hidden = lines.length > 0;
    $('[data-cart-filled]').hidden = lines.length === 0;
    $('[data-cart-foot]').hidden = lines.length === 0;

    linesEl.innerHTML = lines.map(([key, l]) => {
      const item = itemById[l.id];
      const label = esc(lineLabel(l));
      return `<li class="cart-line" data-key="${esc(key)}">
        <div>
          <p class="cart-line__name">${esc(item.name)}</p>
          <p class="cart-line__meta">${l.size ? `${esc(l.size)} · ` : ''}${money(unitPrice(item, l.size))} each</p>
        </div>
        <p class="cart-line__total">${money(lineTotal(l))}</p>
        <div class="cart-line__controls">
          <div class="stepper stepper--sm" role="group" aria-label="${label} quantity">
            <button type="button" data-line-dec aria-label="Remove one ${label}">${icon('minus')}</button>
            <output>${l.qty}</output>
            <button type="button" data-line-inc aria-label="Add one more ${label}">${icon('plus')}</button>
          </div>
          <button class="link-btn" type="button" data-line-remove>${icon('trash-2')}Remove</button>
        </div>
      </li>`;
    }).join('');

    $('[data-cart-total]').textContent = money(cartTotals().total);
  }

  function updateCartUI(bump) {
    const { count, total } = cartTotals();
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
      if (bump && count) { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    });
    pill.classList.toggle('is-visible', count > 0);
    pillText.textContent = count ? `${count} ${count === 1 ? 'item' : 'items'} · ${money(total)}` : 'Your order';
    actionOrder.classList.toggle('has-order', count > 0);
    actionOrderLabel.textContent = count ? 'Your order' : 'WhatsApp';
    $('use', actionOrder).setAttribute('href', count ? '#i-shopping-bag' : '#i-whatsapp');
    if (dialog.open) renderCart();
  }

  function cartChanged(bump) { saveCart(); updateCartUI(bump); }

  function openCart() {
    setNav(false);
    renderCart();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function closeCart() { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); }

  $$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart));
  $$('[data-close-cart]').forEach((b) => b.addEventListener('click', closeCart));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeCart(); });   // backdrop click
  $('[data-browse-menu]').addEventListener('click', () => {
    closeCart();
    $('#menu').scrollIntoView({ behavior: scrollBehavior });
  });
  actionOrder.addEventListener('click', (e) => { if (cart.size) { e.preventDefault(); openCart(); } });

  linesEl.addEventListener('click', (e) => {
    const li = e.target.closest('[data-key]');
    if (!li) return;
    const key = li.dataset.key;
    const line = cart.get(key);
    if (!line) return;
    let focusSel = null;
    if (e.target.closest('[data-line-inc]')) { changeQty(key, +1); focusSel = '[data-line-inc]'; }
    else if (e.target.closest('[data-line-dec]')) { changeQty(key, -1); focusSel = '[data-line-dec]'; }
    else if (e.target.closest('[data-line-remove]')) { cart.delete(key); cartChanged(false); }
    else return;
    refreshCardFor(line.id);
    const again = linesEl.querySelector(`[data-key="${CSS.escape(key)}"]`);
    if (again && focusSel) $(focusSel, again).focus();
    else if (!cart.size) $('[data-browse-menu]').focus();
    else { const first = linesEl.querySelector('button'); if (first) first.focus(); }
  });

  $('[data-clear-cart]').addEventListener('click', () => {
    const ids = Array.from(cart.values()).map((l) => l.id);
    cart.clear();
    cartChanged(false);
    ids.forEach(refreshCardFor);
    $('[data-browse-menu]').focus();
    toast('Order cleared');
  });

  function syncOrderType() {
    const type = new FormData(orderForm).get('type');
    const delivery = type === 'delivery';
    addressField.hidden = !delivery;
    addressInput.required = delivery;
  }
  orderForm.addEventListener('change', (e) => { if (e.target.name === 'type') syncOrderType(); });
  syncOrderType();

  function firstInvalid(form) {
    const fields = $$('input, select, textarea', form).filter((f) => !f.closest('[hidden]'));
    fields.forEach((f) => f.classList.toggle('is-invalid', !f.checkValidity()));
    return fields.find((f) => !f.checkValidity());
  }
  $$('.input').forEach((f) => f.addEventListener('input', () => { if (f.checkValidity()) f.classList.remove('is-invalid'); }));

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!cart.size) return;
    const bad = firstInvalid(orderForm);
    if (bad) { bad.focus(); toast(bad.id === 'order-address' ? 'Please add your delivery address' : 'Please add your name'); return; }

    const fd = new FormData(orderForm);
    const type = fd.get('type');
    const name = String(fd.get('name') || '').trim();
    const address = String(fd.get('address') || '').trim();
    const note = String(fd.get('note') || '').trim();
    const { total } = cartTotals();

    const message = [
      `${GREETING}I'd like to place an order:`,
      '',
      ...Array.from(cart.values()).map((l) => `• ${l.qty} × ${lineLabel(l)} — ${money(lineTotal(l))}`),
      '',
      `Subtotal: ${money(total)}`,
      `Order type: ${TYPE_LABEL[type] || type}`,
      `Name: ${name}`,
      type === 'delivery' ? `Address: ${address}` : null,
      note ? `Note: ${note}` : null
    ].filter((v) => v !== null).join('\n');

    window.open(waUrl(message), '_blank', 'noopener');
    toast('Opening WhatsApp…');
  });

  /* =====================================================================
     7. Table booking → WhatsApp
     ===================================================================== */
  const bookForm = $('[data-book-form]');
  const bookDate = $('[data-book-date]');
  const bookTime = $('[data-book-time]');

  (function setupBooking() {
    const { isoDate } = nowInTimezone();
    bookDate.min = isoDate;
    bookDate.value = isoDate;
    const end = CLOSE > OPEN ? CLOSE : CLOSE + 1440;
    const options = [];
    for (let m = OPEN; m <= end - 60; m += 30) options.push(m);  // last booking 1 hour before closing
    const preferred = options.includes(20 * 60) ? 20 * 60 : options[0];
    bookTime.innerHTML = options.map((m) => `<option value="${formatTime(m)}"${m === preferred ? ' selected' : ''}>${formatTime(m)}</option>`).join('');
  })();

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = firstInvalid(bookForm);
    if (bad) { bad.focus(); toast(bad.id === 'book-name' ? 'Please add your name' : 'Please check the booking details'); return; }

    const fd = new FormData(bookForm);
    const dateText = new Date(`${fd.get('date')}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    const note = String(fd.get('note') || '').trim();
    const message = [
      `${GREETING}I'd like to book a table.`,
      '',
      `Name: ${String(fd.get('name')).trim()}`,
      `Date: ${dateText}`,
      `Time: ${fd.get('time')}`,
      `Guests: ${fd.get('guests')}`,
      `Occasion: ${fd.get('occasion')}`,
      note ? `Note: ${note}` : null
    ].filter((v) => v !== null).join('\n');

    window.open(waUrl(message), '_blank', 'noopener');
    toast('Opening WhatsApp…');
  });

  /* =====================================================================
     8. Toast
     ===================================================================== */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(text) {
    $('span', toastEl).textContent = text;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
  }

  /* ---------- Go ---------- */
  renderTabs();
  renderMenu();
  updateCartUI(false);
})();
