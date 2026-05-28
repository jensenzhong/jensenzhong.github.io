// ========== 众包报修模块 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Crowdsource = (function() {
  const { createElementFromHTML, renderWithFragment } = SmartDorm.Utils;
  const { LEADERBOARD_DATA, HISTORY_DATA } = SmartDorm.Constants;

  // 排行榜
  function initLeaderboard() {
    const container = document.getElementById('leaderboardList');
    if (!container) return;

    const rankClass = ['gold', 'silver', 'bronze'];

    renderWithFragment(container, LEADERBOARD_DATA, (d, i) => {
      const html = `
        <div class="lb-item">
          <div class="lb-rank ${i < 3 ? rankClass[i] : 'normal'}">${i + 1}</div>
          <div class="lb-info">
            <div class="lb-name">${d.name}</div>
            <div class="lb-dorm">${d.dorm}</div>
          </div>
          <div>
            <div class="lb-points">${d.points} 分</div>
            <span class="lb-money">减免 ${d.money} 元</span>
          </div>
        </div>
      `;
      return createElementFromHTML(html);
    });
  }

  // 历史记录
  function initHistory() {
    const container = document.getElementById('historyList');
    if (!container) return;

    const severityMap = {
      high: '高危',
      medium: '中危',
      low: '低危'
    };

    renderWithFragment(container, HISTORY_DATA, (h) => {
      const html = `
        <div class="history-item">
          <div class="history-thumb" style="background: linear-gradient(135deg, ${h.color}20, ${h.color}08); border: 1px solid ${h.color}30; display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" fill="none" stroke="${h.color}" stroke-width="2" width="20" height="20">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <div class="history-info">
            <strong>${h.room} ${h.type}</strong>
            <span>${h.time}</span>
          </div>
          <span class="history-severity ${h.severity}">${severityMap[h.severity]}</span>
        </div>
      `;
      return createElementFromHTML(html);
    });
  }

  // 手机演示
  function initPhoneDemo() {
    const uploadArea = document.getElementById('phoneUpload');
    const resultArea = document.getElementById('phoneResult');
    if (!uploadArea || !resultArea) return;

    uploadArea.onclick = () => {
      uploadArea.style.display = 'none';
      resultArea.style.display = 'block';
    };
  }

  // 初始化众包报修
  function init() {
    initLeaderboard();
    initHistory();
    initPhoneDemo();
  }

  return { init };
})();
