/* ═══════════════════════════════════════════
   MTAL — Main JavaScript
═══════════════════════════════════════════ */

/* ── Theme toggle (option2=default / option1=alternate) ── */
(function () {
  const STORAGE_KEY = 'mtal-theme';
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Restore saved preference — option1 (Deep Seam) is the non-default
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'option1') html.dataset.theme = 'option1';

  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOption1 = html.dataset.theme === 'option1';
    if (isOption1) {
      delete html.dataset.theme;
      localStorage.setItem(STORAGE_KEY, 'option2');
    } else {
      html.dataset.theme = 'option1';
      localStorage.setItem(STORAGE_KEY, 'option1');
    }
  });
})();

/* ── Nav scroll behaviour ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile burger ── */
(function () {
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── Service card bar animation ── */
(function () {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
})();

/* ── Counter animation ── */
(function () {
  const stats = document.querySelectorAll('.stat');
  if (!stats.length) return;

  function animateCounter(el, target, duration) {
    const counter = el.querySelector('.counter');
    if (!counter) return;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      counter.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        animateCounter(entry.target, target, 1800);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();

/* ── Project bar fill on scroll ── */
(function () {
  const bars = document.querySelectorAll('.project-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ── Topo SVG subtle parallax on hero ── */
(function () {
  const topoSvg = document.querySelector('.topo-svg');
  if (!topoSvg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let rafId;
  const onMove = (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      topoSvg.style.transform = `translate(${cx * 12}px, ${cy * 8}px)`;
    });
  };

  document.querySelector('.hero')?.addEventListener('mousemove', onMove, { passive: true });
})();
