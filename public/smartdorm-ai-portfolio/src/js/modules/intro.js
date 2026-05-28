(function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealSections() {
    const sections = document.querySelectorAll('.section-reveal');

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      sections.forEach(section => section.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    sections.forEach(section => observer.observe(section));
  }

  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    function runCounter(counter) {
      const target = Number(counter.dataset.count || 0);
      if (!target || counter.dataset.done === 'true') return;
      counter.dataset.done = 'true';

      if (prefersReducedMotion) {
        counter.textContent = String(target);
        return;
      }

      const duration = 1100;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
  }

  function initActiveNav() {
    const links = Array.from(document.querySelectorAll('.intro-nav a[href^="#"]'));
    const sections = links
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (!links.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.remove('is-active'));
        const active = links.find(link => link.getAttribute('href') === `#${entry.target.id}`);
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 });

    sections.forEach(section => observer.observe(section));
  }

  function initFlowHighlight() {
    const track = document.querySelector('.flow-track');
    const steps = Array.from(document.querySelectorAll('.flow-step'));
    if (!track || !steps.length) return;

    let activeIndex = 0;

    function setActive(index) {
      activeIndex = index % steps.length;
      steps.forEach((step, stepIndex) => {
        step.classList.toggle('is-active', stepIndex === activeIndex);
      });
      const progress = steps.length <= 1 ? 100 : (activeIndex / (steps.length - 1)) * 88;
      track.style.setProperty('--progress', `${progress}%`);
    }

    setActive(0);

    if (prefersReducedMotion) return;

    let timer = null;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some(entry => entry.isIntersecting);
      if (visible && !timer) {
        timer = window.setInterval(() => setActive(activeIndex + 1), 1300);
      }
      if (!visible && timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }, { threshold: 0.35 });

    observer.observe(track);
  }

  function init() {
    revealSections();
    animateCounters();
    initActiveNav();
    initFlowHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
