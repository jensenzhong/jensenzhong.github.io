// ========== 智能调度模块 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Dispatch = (function() {
  // 校区地图
  function initCampusMap() {
    const container = document.getElementById('campusMap');
    if (!container) return;

    const routePoints = [
      { x: 50, y: 88, label: '维修站' },
      { x: 15, y: 15, label: '菊2 · 管道渗水' },
      { x: 40, y: 22, label: '兰4 · 窗户密封条' },
      { x: 78, y: 72, label: '梅4 · 天花板霉点' },
    ];

    let html = '';

    // 真实地图背景
    html += `<img src="assets/intro/campus-map.png" loading="lazy" alt="楼栋分布地图" style="
      position:absolute;top:0;left:0;width:100%;height:100%;
      object-fit:contain;z-index:0;
    "/>`;

    // SVG 路径层
    html += `<svg style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;pointer-events:none;">`;
    html += `<defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
        <polygon points="0 0, 10 4, 0 8" fill="#D4714E" opacity="0.9"/>
      </marker>
      <filter id="textShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>`;

    // 维修路径连线
    for (let i = 0; i < routePoints.length - 1; i++) {
      const p1 = routePoints[i], p2 = routePoints[i + 1];
      html += `<line x1="${p1.x}%" y1="${p1.y}%" x2="${p2.x}%" y2="${p2.y}%"
        stroke="#D4714E" stroke-width="5" stroke-dasharray="12,8"
        opacity="0.9" marker-end="url(#arrowhead)">
        <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite"/>
      </line>`;

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      html += `<circle cx="${midX}%" cy="${midY}%" r="18" fill="#D4714E" opacity="0.95"/>`;
      html += `<text x="${midX}%" y="${midY}%" text-anchor="middle" dominant-baseline="central"
        fill="white" font-size="16" font-weight="700" font-family="JetBrains Mono">${i + 1}</text>`;
    }

    // 路径节点标记
    routePoints.forEach((point, index) => {
      html += `<circle cx="${point.x}%" cy="${point.y}%" r="12" fill="#D4714E" opacity="0.95"/>`;
      html += `<circle cx="${point.x}%" cy="${point.y}%" r="12" fill="none" stroke="white" stroke-width="3"/>`;

      const labelY = index === 0 ? point.y + 6 : point.y - 4;
      html += `<text x="${point.x}%" y="${labelY}%" text-anchor="middle"
        font-size="14" font-weight="700" font-family="var(--font-body)"
        fill="white" filter="url(#textShadow)">${point.label}</text>`;

      // 脉冲动画
      html += `<circle cx="${point.x}%" cy="${point.y}%" r="12" fill="none"
        stroke="#D4714E" stroke-width="3" opacity="0.8">
        <animate attributeName="r" from="12" to="24" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite"/>
      </circle>`;
    });

    html += `</svg>`;

    // 工人位置
    html += `<div style="
      position:absolute;left:15%;top:15%;
      transform:translate(-50%, -50%);
      width:50px;height:50px;
      background:linear-gradient(135deg, #D4714E, #E8956F);
      border:3px solid white;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:1.1rem;font-weight:700;color:white;
      box-shadow:0 4px 16px rgba(212,113,78,0.5);
      z-index:25;
    ">张</div>`;

    // 图例
    html += `<div style="
      position:absolute;right:12px;bottom:12px;
      background:rgba(255,255,255,0.95);border:1px solid var(--border);
      border-radius:12px;padding:12px 16px;
      font-size:0.75rem;color:var(--text-muted);
      z-index:15;display:flex;flex-direction:column;gap:6px;
      box-shadow:var(--shadow-md);
    ">
      <div style="font-weight:700;color:var(--text-secondary);margin-bottom:4px;font-size:0.8rem">图例</div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="width:20px;height:4px;border-top:4px dashed #D4714E;display:inline-block"></span>
        AI 维修路径
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="width:14px;height:14px;border-radius:50%;background:#D4714E;display:inline-block"></span>
        任务节点
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg, #D4714E, #E8956F);border:2px solid white;display:inline-block"></span>
        维修人员
      </div>
    </div>`;

    container.innerHTML = html;
  }

  // 路线时间线
  function initTimeline() {
    const container = document.getElementById('routeTimeline');
    if (!container) return;

    const steps = [
      { status: 'completed', time: '09:00', title: '出发 - 维修站', desc: '领取工具和材料', tag: '' },
      { status: 'current', time: '09:30', title: '菊2 · 401 - 管道渗水检查', desc: 'AI 自动派单 · 处理中', tag: 'AI 派单' },
      { status: 'pending', time: '10:40', title: '菊5 · 3F - 窗户密封条 x2', desc: 'AI 建议顺路处理，同在菊苑', tag: 'AI 合并' },
      { status: 'pending', time: '11:30', title: '兰4 · 201 - 窗户密封条更换', desc: 'AI 建议午前处理', tag: 'AI 合并' },
      { status: 'pending', time: '13:30', title: '梅4 · 502 - 天花板霉点处理', desc: 'AI 自动派单 · 防水施工', tag: 'AI 派单' },
      { status: 'pending', time: '14:30', title: '梅4 · 3F 走廊 - 密封条 x4', desc: '最优时间窗口：住户外出率 87%', tag: 'AI 优化' },
    ];

    container.innerHTML = steps.map(s => `
      <div class="route-step ${s.status}">
        <div class="step-marker">${s.status === 'completed' ? '&#10003;' : s.status === 'current' ? '&#9679;' : '&#9675;'}</div>
        <div class="step-content">
          <span class="step-time">${s.time}</span>
          <strong>${s.title}</strong>
          <p>${s.desc}</p>
          ${s.tag ? `<span class="step-tag ai">${s.tag}</span>` : ''}
        </div>
      </div>
    `).join('');

    // 3秒后插入紧急任务
    setTimeout(() => {
      const emergencyStep = document.createElement('div');
      emergencyStep.className = 'route-step emergency';
      emergencyStep.innerHTML = `
        <div class="step-marker emergency-marker">!</div>
        <div class="step-content">
          <span class="step-time">09:42</span>
          <strong>菊5 · 633 - 水管爆裂紧急抢修</strong>
          <p>学生上报：卫生间主水管接口爆裂，大量漏水，已蔓延至走廊。需立即关闭区域阀门并更换管件。</p>
          <span class="step-tag emergency">紧急派单</span>
        </div>
      `;

      // 插入到第二个任务后面（当前任务之后）
      const secondStep = container.children[1];
      if (secondStep) {
        secondStep.after(emergencyStep);
      } else {
        container.appendChild(emergencyStep);
      }

      // 容器内滚动到新任务位置
      setTimeout(() => {
        container.scrollTo({
          top: emergencyStep.offsetTop - container.offsetTop,
          behavior: 'smooth'
        });
      }, 100);
    }, 3000);
  }

  // 初始化调度
  function init() {
    initCampusMap();
    initTimeline();
  }

  return { init };
})();
