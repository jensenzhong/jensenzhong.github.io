// ========== 预测维护模块 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Predictive = (function() {
  // 四园设施对比
  function initCompareChart() {
    const container = document.getElementById('compareChart');
    if (!container) return;

    const items = [
      { label: '门锁', mei: 62, lan: 78, zhu: 85, ju: 70 },
      { label: '水管', mei: 70, lan: 82, zhu: 80, ju: 65 },
      { label: '电路', mei: 88, lan: 90, zhu: 86, ju: 82 },
      { label: '窗户', mei: 55, lan: 72, zhu: 78, ju: 60 },
      { label: '卫浴', mei: 58, lan: 75, zhu: 80, ju: 68 },
    ];

    const zones = [
      { key: 'mei', label: '梅园', color: '#C0392B' },
      { key: 'lan', label: '兰园', color: '#5B8A72' },
      { key: 'zhu', label: '竹园', color: '#2E7D5B' },
      { key: 'ju',  label: '菊园', color: '#C4820E' },
    ];

    const legendHTML = zones.map(z => `
      <div style="display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--text-secondary)">
        <span style="width:10px;height:10px;border-radius:3px;background:${z.color};display:inline-block"></span>${z.label}
      </div>
    `).join('');

    const itemsHTML = items.map(item => `
      <div class="compare-row" style="margin-bottom:8px">
        <div class="compare-label">${item.label}</div>
        <div class="compare-bars" style="gap:4px">
          ${zones.map(z => `
            <div class="compare-bar-row">
              <span class="zone-label" style="width:30px;font-size:0.65rem">${z.label.charAt(0)}</span>
              <div class="compare-bar-track" style="height:16px">
                <div class="compare-bar-value" style="width:${item[z.key]}%;background:linear-gradient(90deg,${z.color}40,${z.color});border-radius:4px;font-size:0.62rem">${item[z.key]}%</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="display:flex;gap:16px;margin-bottom:16px;flex-wrap:wrap">
        ${legendHTML}
      </div>
      ${itemsHTML}
    `;

    initAIPlanModal();
  }

  // AI 维修计划模态框
  function initAIPlanModal() {
    const btn = document.getElementById('showAIPlanBtn');
    const modal = document.getElementById('aiPlanModal');
    const closeBtn = document.getElementById('closePlanBtn');

    if (!btn || !modal || !closeBtn) return;

    btn.onclick = () => {
      modal.style.display = 'flex';
      renderAIPlan();
    };

    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    modal.querySelector('.ai-plan-overlay').onclick = () => {
      modal.style.display = 'none';
    };
  }

  // 渲染 AI 计划
  function renderAIPlan() {
    const urgentTasks = getUrgentTasks();
    const normalTasks = getNormalTasks();
    const longTermTasks = getLongTermTasks();

    renderTaskList('urgentTasks', urgentTasks);
    renderTaskList('normalTasks', normalTasks);
    renderTaskList('longTermTasks', longTermTasks);
  }

  function renderTaskList(containerId, tasks) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = tasks.map(task => `
      <div class="plan-task-card">
        <div class="plan-task-header">
          <div class="plan-task-title">
            <h4>${task.title}</h4>
            <div class="plan-task-location">📍 ${task.location}</div>
          </div>
          <div class="plan-task-priority ${task.priority}">
            ${getPriorityLabel(task.priority)}
          </div>
        </div>

        <div class="plan-task-meta">
          <div class="plan-task-meta-item">
            <div class="plan-task-meta-label">计划时间</div>
            <div class="plan-task-meta-value">${task.time}</div>
          </div>
          <div class="plan-task-meta-item">
            <div class="plan-task-meta-label">预计耗时</div>
            <div class="plan-task-meta-value">${task.duration} 分钟</div>
          </div>
          <div class="plan-task-meta-item">
            <div class="plan-task-meta-label">所需人员</div>
            <div class="plan-task-meta-value">${task.workers} 人</div>
          </div>
          <div class="plan-task-meta-item">
            <div class="plan-task-meta-label">任务类型</div>
            <div class="plan-task-meta-value">${containerId === 'longTermTasks' ? '长期' : '单次'}</div>
          </div>
        </div>

        <div style="margin-bottom:8px">
          <div class="plan-task-meta-label" style="margin-bottom:6px">所需工具</div>
          <div class="plan-task-tools">
            ${task.tools.map(tool => `<span class="plan-task-tool">${tool}</span>`).join('')}
          </div>
        </div>

        <div class="plan-task-schedule">
          <strong>AI 建议：</strong>${task.schedule}
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  function getPriorityLabel(priority) {
    const labels = {
      urgent: '紧急',
      high: '高优先级',
      normal: '常规',
      low: '低优先级'
    };
    return labels[priority] || '常规';
  }

  // 任务数据
  function getUrgentTasks() {
    return [
      {
        title: '梅4 · 502 天花板霉点处理',
        location: '梅园 4 栋 5 楼',
        priority: 'urgent',
        time: '今日 09:30',
        duration: 90,
        workers: 2,
        tools: ['防水涂料', '刮刀', '喷枪', '梯子', '防护服'],
        schedule: '建议上午完成，避开学生午休时间'
      },
      {
        title: '菊2 · 401 管道渗水紧急修复',
        location: '菊园 2 栋 4 楼',
        priority: 'urgent',
        time: '今日 10:00',
        duration: 60,
        workers: 2,
        tools: ['管道扳手', '密封胶', '水管', '切割器'],
        schedule: 'AI 检测到渗水加剧，需立即处理'
      },
      {
        title: '兰4 · 301 窗户密封条更换',
        location: '兰园 4 栋 3 楼',
        priority: 'high',
        time: '今日 11:30',
        duration: 45,
        workers: 1,
        tools: ['密封条 x8', '美工刀', '清洁剂'],
        schedule: '顺路任务，与兰4其他维修合并'
      },
      {
        title: '竹3 · 走廊照明镇流器更换',
        location: '竹园 3 栋公共区域',
        priority: 'high',
        time: '今日 13:00',
        duration: 30,
        workers: 1,
        tools: ['镇流器 x3', '螺丝刀', '电笔', '梯子'],
        schedule: '午后学生外出率高，适合施工'
      },
      {
        title: '梅2 · 204 插座面板更换',
        location: '梅园 2 栋 2 楼',
        priority: 'high',
        time: '今日 14:00',
        duration: 20,
        workers: 1,
        tools: ['插座面板 x2', '螺丝刀', '电笔'],
        schedule: '快速任务，可与梅4任务同批次'
      },
      {
        title: '菊5 · 3F 窗户密封条批量更换',
        location: '菊园 5 栋 3 楼',
        priority: 'high',
        time: '今日 14:30',
        duration: 50,
        workers: 1,
        tools: ['密封条 x12', '美工刀', '清洁剂'],
        schedule: 'AI 建议与菊2任务顺路处理'
      },
      {
        title: '兰1 · 103 门锁润滑维护',
        location: '兰园 1 栋 1 楼',
        priority: 'normal',
        time: '今日 15:30',
        duration: 15,
        workers: 1,
        tools: ['润滑油', '清洁布'],
        schedule: '预防性维护，延长门锁寿命'
      },
      {
        title: '竹5 · 405 墙面裂缝检测',
        location: '竹园 5 栋 4 楼',
        priority: 'normal',
        time: '今日 16:00',
        duration: 25,
        workers: 1,
        tools: ['裂缝测量仪', '相机', '记录本'],
        schedule: '观察任务，评估是否需要修复'
      }
    ];
  }

  function getNormalTasks() {
    return [
      {
        title: '梅园 1-10 栋门锁统一润滑',
        location: '梅园全区',
        priority: 'normal',
        time: '本周三 09:00',
        duration: 180,
        workers: 3,
        tools: ['润滑油 x20', '清洁布', '梯子'],
        schedule: '预防性维护，建议分批次完成'
      },
      {
        title: '兰园公共区域照明检查',
        location: '兰园 1-5 栋',
        priority: 'normal',
        time: '本周四 10:00',
        duration: 120,
        workers: 2,
        tools: ['灯管', '镇流器', '梯子', '电笔'],
        schedule: '定期巡检，更换老化灯管'
      },
      {
        title: '竹园水管系统压力测试',
        location: '竹园 1-4 栋',
        priority: 'normal',
        time: '本周五 08:00',
        duration: 150,
        workers: 2,
        tools: ['压力表', '检测仪', '记录本'],
        schedule: '季度例行检测，评估管道健康'
      },
      {
        title: '菊园窗户密封条批量检查',
        location: '菊园 1-5 栋',
        priority: 'normal',
        time: '本周五 14:00',
        duration: 90,
        workers: 2,
        tools: ['密封条', '美工刀', '清洁剂'],
        schedule: '发现老化立即更换'
      },
      {
        title: '梅3 · 全楼消防设施检测',
        location: '梅园 3 栋',
        priority: 'high',
        time: '本周六 09:00',
        duration: 120,
        workers: 2,
        tools: ['消防检测仪', '灭火器', '记录本'],
        schedule: '安全检查，不可延期'
      }
    ];
  }

  function getLongTermTasks() {
    return [
      {
        title: '梅园门锁系统定期润滑',
        location: '梅园 1-10 栋',
        priority: 'low',
        time: '每周一 09:00',
        duration: 60,
        workers: 2,
        tools: ['润滑油', '清洁布'],
        schedule: '长期计划：每周一次，持续 3 个月'
      },
      {
        title: '四园公共区域卫生巡检',
        location: '梅兰竹菊全区',
        priority: 'low',
        time: '每日 07:00',
        duration: 45,
        workers: 1,
        tools: ['清洁工具', '记录本'],
        schedule: '日常巡检，发现问题及时上报'
      },
      {
        title: '兰园电路系统月度检测',
        location: '兰园 1-5 栋',
        priority: 'normal',
        time: '每月 1 号 08:00',
        duration: 180,
        workers: 2,
        tools: ['万用表', '电笔', '记录本'],
        schedule: '月度例行，确保用电安全'
      },
      {
        title: '竹园水管防冻检查',
        location: '竹园 1-4 栋',
        priority: 'normal',
        time: '每周五 10:00',
        duration: 90,
        workers: 2,
        tools: ['保温材料', '温度计'],
        schedule: '冬季专项，防止管道冻裂'
      },
      {
        title: '菊园窗户密封性季度检查',
        location: '菊园 1-5 栋',
        priority: 'low',
        time: '每季度首日 09:00',
        duration: 120,
        workers: 2,
        tools: ['密封条', '检测仪'],
        schedule: '季度例行，提前发现隐患'
      },
      {
        title: '全区消防设施月度检测',
        location: '梅兰竹菊全区',
        priority: 'high',
        time: '每月 15 号 08:00',
        duration: 240,
        workers: 3,
        tools: ['消防检测仪', '灭火器', '记录本'],
        schedule: '安全第一，严格执行'
      }
    ];
  }

  // 按钮交互
  function initPredictButtons() {
    // "安排预防维护" → 打开AI维修计划弹窗
    document.querySelectorAll('.btn-predict.schedule').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.getElementById('aiPlanModal');
        if (modal) {
          modal.style.display = 'flex';
          renderAIPlan();
        }
      });
    });

    // "查看详情" → 显示Toast提示
    document.querySelectorAll('.btn-predict.detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.predict-card');
        const name = card?.querySelector('h4')?.textContent || '设施';
        const loc = card?.querySelector('.facility-location')?.textContent || '';
        const risk = card?.querySelector('.predict-risk')?.textContent || '';
        showToast(`${name} (${loc}) — ${risk}，详细数据面板开发中`);
      });
    });
  }

  // Toast提示
  function showToast(message) {
    const existing = document.querySelector('.smartdorm-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'smartdorm-toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--text-primary);color:var(--bg-primary);padding:12px 24px;border-radius:12px;font-size:0.85rem;box-shadow:var(--shadow-lg);z-index:2000;animation:fadeIn 0.3s ease;max-width:90vw;text-align:center';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // 初始化预测维护
  function init() {
    initCompareChart();
    initPredictButtons();
  }

  return { init };
})();
