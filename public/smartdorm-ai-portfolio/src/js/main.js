// ========== 主应用入口 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.App = (function() {
  function showSection(target, updateHash = false) {
    if (!target) return;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === target);
    });

    document.querySelectorAll('.section').forEach(section => {
      section.classList.toggle('active', section.id === target);
    });

    const section = document.getElementById(target);
    if (!section) return;

    switch(target) {
      case 'cv-diagnosis':
        SmartDorm.Crowdsource.init();
        break;
      case 'predictive':
        SmartDorm.Predictive.init();
        break;
      case 'dispatch':
        SmartDorm.Dispatch.init();
        break;
    }

    if (updateHash) {
      history.replaceState(null, '', `#${target}`);
    }
  }

  // 导航切换
  function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.section;
        showSection(target, true);

        // 移动端：点击导航项后关闭菜单
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('open');
      });
    });

    // 移动端菜单切换
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // 通知下拉面板
    const bell = document.getElementById('notificationBell');
    const dropdown = document.getElementById('notificationDropdown');
    if (bell && dropdown) {
      bell.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!bell.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    }
  }

  // 页面可见性监听
  function initVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 页面隐藏时清理定时器
        SmartDorm.Dashboard.cleanup();
      } else {
        // 页面显示时重新初始化
        if (document.getElementById('dashboard')?.classList.contains('active')) {
          SmartDorm.Dashboard.initRealtimeFeed();
        }
      }
    });
  }

  // 初始化应用
  function init() {
    // 导航
    initNavigation();

    // 仪表盘
    SmartDorm.Dashboard.initTimeDisplay();
    SmartDorm.Dashboard.initNumberAnimation();
    SmartDorm.Dashboard.initRealtimeFeed();
    SmartDorm.Dashboard.initHeatmap();
    SmartDorm.Dashboard.initTrendChart();
    SmartDorm.Dashboard.initWorkOrderModal();

    const initialTarget = location.hash.replace('#', '');
    if (document.getElementById(initialTarget)) {
      showSection(initialTarget, false);
    }

    // 页面可见性监听
    initVisibilityListener();

    // Escape键关闭所有模态框
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.workorder-modal, .ai-plan-modal').forEach(modal => {
          if (modal.style.display !== 'none') {
            modal.style.display = 'none';
          }
        });
      }
    });
  }

  return { init };
})();

// ========== 启动应用 ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SmartDorm.App.init);
} else {
  SmartDorm.App.init();
}
