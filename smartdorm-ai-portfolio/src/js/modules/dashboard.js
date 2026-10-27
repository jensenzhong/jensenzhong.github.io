// ========== 仪表盘模块 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Dashboard = (function() {
  const { createElementFromHTML, renderWithFragment, animateNumber, IntervalManager } = SmartDorm.Utils;
  const { CONFIG, FEED_DATA, FEED_MESSAGES, FEED_TYPES, BUILDINGS, TREND_DATA } = SmartDorm.Constants;

  const intervalManager = new IntervalManager();

  // 时间显示
  function initTimeDisplay() {
    function updateTime() {
      const now = new Date();
      const el = document.getElementById('currentTime');
      if (el) {
        el.textContent = now.toLocaleString('zh-CN', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      }
    }

    updateTime();
    intervalManager.set('timeUpdate', updateTime, CONFIG.TIME_UPDATE_INTERVAL);
  }

  // 数字动画
  function initNumberAnimation() {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      animateNumber(el, target, CONFIG.ANIMATION_DURATION);
    });
  }

  // 实时动态
  function initRealtimeFeed() {
    const container = document.getElementById('realtimeFeed');
    if (!container) return;

    function renderFeed() {
      renderWithFragment(container, FEED_DATA, (item, i) => {
        const html = `
          <div class="feed-item" style="animation-delay: ${i * 0.1}s">
            <div class="feed-dot ${item.type}"></div>
            <div class="feed-content">
              <div class="feed-title">${item.title}</div>
              <div class="feed-meta">${item.meta}</div>
            </div>
          </div>
        `;
        return createElementFromHTML(html);
      });
    }

    renderFeed();

    // 模拟新消息 - 优化：只在页面激活时更新
    intervalManager.set('feedUpdate', () => {
      if (!document.getElementById('dashboard')?.classList.contains('active')) return;

      const type = FEED_TYPES[Math.floor(Math.random() * FEED_TYPES.length)];
      const msg = FEED_MESSAGES[Math.floor(Math.random() * FEED_MESSAGES.length)];

      const newItem = createElementFromHTML(`
        <div class="feed-item">
          <div class="feed-dot ${type}"></div>
          <div class="feed-content">
            <div class="feed-title">${msg}</div>
            <div class="feed-meta">刚刚 · AI 识别</div>
          </div>
        </div>
      `);

      container.insertBefore(newItem, container.firstChild);
      if (container.children.length > CONFIG.MAX_FEED_ITEMS) {
        container.removeChild(container.lastChild);
      }
    }, CONFIG.FEED_UPDATE_INTERVAL);
  }

  // 热力图
  function initHeatmap() {
    const container = document.getElementById('buildingHeatmap');
    if (!container) return;

    renderWithFragment(container, BUILDINGS, (b) => {
      const html = `
        <div class="heatmap-cell" style="background: ${b.color}15; border-color: ${b.color}30">
          <span class="health-score" style="color: ${b.color}">${b.score}</span>
          <span class="building-name">${b.name}</span>
        </div>
      `;
      return createElementFromHTML(html);
    });
  }

  // 趋势图 (SVG) - 交互版
  function initTrendChart() {
    const container = document.getElementById('trendChart');
    if (!container) return;

    const { values: data, labels: days } = TREND_DATA;
    const maxVal = Math.max(...data) * 1.2;
    const w = 100, h = 100;

    const points = data.map((v, i) => ({
      x: (i / (data.length - 1)) * (w - 10) + 5,
      y: h - 10 - (v / maxVal) * (h - 20)
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaD = pathD + ` L${points[points.length-1].x},${h-5} L${points[0].x},${h-5} Z`;

    container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="trend-svg">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(212,113,78,0.2)"/>
            <stop offset="100%" stop-color="rgba(212,113,78,0)"/>
          </linearGradient>
        </defs>
        <path d="${areaD}" fill="url(#areaGrad)"/>
        <path d="${pathD}" fill="none" stroke="#D4714E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${points.map((p, i) => `
          <g class="trend-point" data-value="${data[i]}" data-day="${days[i]}">
            <rect x="${p.x - 7}" y="0" width="14" height="${h}" fill="transparent" class="trend-hitarea"/>
            <circle cx="${p.x}" cy="${p.y}" r="2.5" fill="#FFFFFF" stroke="#D4714E" stroke-width="1.2" class="trend-dot"/>
            <text x="${p.x}" y="${h - 1}" text-anchor="middle" fill="#9C8E82" font-size="4" font-family="Noto Sans SC" class="trend-label">${days[i]}</text>
            <text x="${p.x}" y="${p.y - 5}" text-anchor="middle" fill="#5C524A" font-size="3.5" font-family="JetBrains Mono" class="trend-value">${data[i]}</text>
          </g>
        `).join('')}
      </svg>
      <div class="trend-tooltip" id="trendTooltip"></div>
    `;

    // 绑定交互事件
    initTrendInteractions(container);
  }

  // 趋势图交互
  function initTrendInteractions(container) {
    const tooltip = container.querySelector('#trendTooltip');
    const points = container.querySelectorAll('.trend-point');

    points.forEach(point => {
      const dot = point.querySelector('.trend-dot');
      const value = point.querySelector('.trend-value');
      const day = point.dataset.day;
      const val = point.dataset.value;

      point.addEventListener('mouseenter', () => {
        // 放大圆点
        dot.setAttribute('r', '4');
        dot.setAttribute('stroke-width', '2');
        value.setAttribute('font-size', '5');
        value.setAttribute('fill', '#D4714E');

        // 显示提示框
        tooltip.innerHTML = `<strong>${day}</strong><br>维修工单 <span>${val}</span> 件`;
        tooltip.classList.add('visible');
      });

      point.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.style.left = `${x + 12}px`;
        tooltip.style.top = `${y - 10}px`;
      });

      point.addEventListener('mouseleave', () => {
        dot.setAttribute('r', '2.5');
        dot.setAttribute('stroke-width', '1.2');
        value.setAttribute('font-size', '3.5');
        value.setAttribute('fill', '#5C524A');
        tooltip.classList.remove('visible');
      });
    });
  }

  // 维修工单弹窗
  function initWorkOrderModal() {
    const card = document.getElementById('workOrderCard');
    const modal = document.getElementById('workOrderModal');
    const closeBtn = document.getElementById('closeWorkOrderBtn');
    const list = document.getElementById('workOrderList');

    if (!card || !modal || !closeBtn || !list) return;

    // 工单数据
    const orders = [
      { title: '梅4 · 502 天花板霉点处理', location: '梅园 4 栋 5 楼', time: '今天 14:32', status: 'completed', handler: '张师傅' },
      { title: '菊2 · 601 管道渗水修复', location: '菊园 2 栋 6 楼', time: '今天 11:15', status: 'completed', handler: '李师傅' },
      { title: '兰4 · 301 窗户密封条更换', location: '兰园 4 栋 3 楼', time: '今天 09:30', status: 'processing', handler: '张师傅' },
      { title: '竹3 · 走廊照明镇流器更换', location: '竹园 3 栋公共区域', time: '昨天 16:40', status: 'completed', handler: '王师傅' },
      { title: '梅2 · 204 插座面板更换', location: '梅园 2 栋 2 楼', time: '昨天 14:08', status: 'completed', handler: '张师傅' },
      { title: '菊5 · 3F 窗户密封条批量更换', location: '菊园 5 栋 3 楼', time: '昨天 10:55', status: 'completed', handler: '李师傅' },
      { title: '兰1 · 103 门锁润滑维护', location: '兰园 1 栋 1 楼', time: '前天 15:20', status: 'completed', handler: '王师傅' },
      { title: '竹5 · 405 墙面裂缝检测', location: '竹园 5 栋 4 楼', time: '前天 09:22', status: 'pending', handler: '待分配' },
      { title: '梅3 · 全楼消防设施检测', location: '梅园 3 栋', time: '3天前 08:30', status: 'completed', handler: '张师傅' },
      { title: '菊3 · 302 天花板渗水处理', location: '菊园 3 栋 3 楼', time: '3天前 14:15', status: 'completed', handler: '李师傅' },
      { title: '兰2 · 405 空调外机异响检修', location: '兰园 2 栋 4 楼', time: '4天前 10:30', status: 'completed', handler: '王师傅' },
      { title: '竹1 · 走廊墙面粉刷', location: '竹园 1 栋公共区域', time: '4天前 09:00', status: 'pending', handler: '待分配' },
    ];

    const statusMap = { completed: '已完成', processing: '处理中', pending: '待处理' };

    // 渲染工单列表
    list.innerHTML = orders.map(o => `
      <div class="workorder-item">
        <div class="workorder-status ${o.status}"></div>
        <div class="workorder-info">
          <div class="workorder-title">${o.title}</div>
          <div class="workorder-meta">
            <span>📍 ${o.location}</span>
            <span>🕐 ${o.time}</span>
            <span>👤 ${o.handler}</span>
          </div>
        </div>
        <span class="workorder-tag ${o.status}">${statusMap[o.status]}</span>
      </div>
    `).join('');

    // 打开弹窗
    card.onclick = () => {
      modal.style.display = 'flex';
    };

    // 关闭弹窗
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    modal.querySelector('.workorder-overlay').onclick = () => {
      modal.style.display = 'none';
    };
  }

  // 清理函数
  function cleanup() {
    intervalManager.clearAll();
  }

  return {
    initTimeDisplay,
    initNumberAnimation,
    initRealtimeFeed,
    initHeatmap,
    initTrendChart,
    initWorkOrderModal,
    cleanup
  };
})();
