// ========== DOM 工具函数 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Utils = (function() {
  function createElement(tag, className, content = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.textContent = content;
    return el;
  }

  function createElementFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  // 性能优化：使用 DocumentFragment
  function renderWithFragment(container, items, renderFn) {
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => {
      const element = renderFn(item, index);
      if (element) fragment.appendChild(element);
    });
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  // 防抖函数
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 节流函数
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // 随机选择
  function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // 格式化时间
  function formatTime(date) {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // 数字动画
  function animateNumber(element, target, duration = 1500) {
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  // 清理定时器
  class IntervalManager {
    constructor() {
      this.intervals = new Map();
    }

    set(name, callback, delay) {
      this.clear(name);
      const id = setInterval(callback, delay);
      this.intervals.set(name, id);
      return id;
    }

    clear(name) {
      if (this.intervals.has(name)) {
        clearInterval(this.intervals.get(name));
        this.intervals.delete(name);
      }
    }

    clearAll() {
      this.intervals.forEach(id => clearInterval(id));
      this.intervals.clear();
    }
  }

  return {
    createElement,
    createElementFromHTML,
    renderWithFragment,
    debounce,
    throttle,
    randomChoice,
    formatTime,
    animateNumber,
    IntervalManager
  };
})();
