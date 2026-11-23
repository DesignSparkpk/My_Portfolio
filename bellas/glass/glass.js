/* =====================================================================
   BELLA'S · LIQUID GLASS EXTRAS
   Runs after ../js/app.js (menu, cart, WhatsApp, booking, nav).
   Adds: live kitchen countdown, "jump to category" links,
   and the specular light that follows the pointer on glass.
   ===================================================================== */
(() => {
  'use strict';
  const D = window.BELLAS;
  if (!D) return;
  const B = D.business;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Live kitchen countdown (Pakistan time) ---------- */
  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const OPEN = toMin(B.hours.open);
  const CLOSE = toMin(B.hours.close);
  const fmtClock = (mins) => {
    const m = ((mins % 1440) + 1440) % 1440;
    let h = Math.floor(m / 60); const mm = m % 60; const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return mm ? `${h}:${String(mm).padStart(2, '0')} ${ap}` : `${h} ${ap}`;
  };
  const fmtLeft = (mins) => {
    const h = Math.floor(mins / 60); const m = mins % 60;
    return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
  };
  function nowMinutes() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: B.timezone, hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date());
    const get = (t) => Number((parts.find((p) => p.type === t) || {}).value);
    return get('hour') * 60 + get('minute');
  }
  const until = (from, to) => ((to - from) % 1440 + 1440) % 1440;
  const isOpen = (n) => (CLOSE > OPEN ? n >= OPEN && n < CLOSE : n >= OPEN || n < CLOSE);

  const clockEl = document.querySelector('[data-countdown]');
  const clockSub = document.querySelector('[data-countdown-sub]');
  function tick() {
    if (!clockEl) return;
    const n = nowMinutes();
    if (isOpen(n)) {
      clockEl.textContent = `Closes in ${fmtLeft(until(n, CLOSE))}`;
      if (clockSub) clockSub.textContent = `Kitchen is open now, until ${fmtClock(CLOSE)} tonight.`;
    } else {
      clockEl.textContent = `Opens in ${fmtLeft(until(n, OPEN))}`;
      if (clockSub) clockSub.textContent = `We're back at ${fmtClock(OPEN)}. Pre-order on WhatsApp any time.`;
    }
  }
  tick();
  setInterval(tick, 30 * 1000);

  /* ---------- 2. "See pizzas" / "See bubble tea" open that menu tab ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-jump-cat]');
    if (!link) return;
    const tab = document.querySelector(`.tab[data-cat="${CSS.escape(link.dataset.jumpCat)}"]`);
    if (!tab) return;               // fall back to the normal #menu jump
    e.preventDefault();
    const search = document.querySelector('[data-search]');
    if (search && search.value) { search.value = ''; search.dispatchEvent(new Event('input', { bubbles: true })); }
    document.getElementById('menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    tab.click();
  });

  /* ---------- 3. Specular highlight follows the pointer (mouse only) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    let frame = 0; let last = null;
    document.addEventListener('pointermove', (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = last.target.closest && last.target.closest('.lg, .dish');
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${last.clientX - r.left}px`);
        el.style.setProperty('--my', `${last.clientY - r.top}px`);
      });
    }, { passive: true });
  }
})();
