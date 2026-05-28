// ========== 配置常量 ==========
window.SmartDorm = window.SmartDorm || {};

SmartDorm.Constants = (function() {
  const CONFIG = {
    FEED_UPDATE_INTERVAL: 5000,
    MAX_FEED_ITEMS: 12,
    ANIMATION_DURATION: 1500,
    TIME_UPDATE_INTERVAL: 1000,
  };

  const COLORS = {
    HIGH_RISK: '#C0392B',
    MEDIUM_RISK: '#C4820E',
    LOW_RISK: '#5B8A72',
    SAGE: '#5B8A72',
    CORAL: '#D4714E',
    AMBER: '#C4820E',
    PLUM: '#8B6EA2',
  };

  const FEED_DATA = [
    { type: 'danger', title: '梅4 · 502 天花板检测到大面积霉点', meta: '2 分钟前 · AI 自动派单', time: 2 },
    { type: 'warning', title: '兰4 · 301 窗户密封条老化预警', meta: '8 分钟前 · 已加入观察', time: 8 },
    { type: 'success', title: '梅2 · 204 插座维修已完成', meta: '15 分钟前 · 张师傅', time: 15 },
    { type: 'info', title: '竹3 走廊灯光亮度异常，疑似镇流器老化', meta: '22 分钟前 · 已记录', time: 22 },
    { type: 'danger', title: '菊2 · 601 卫生间管道渗水风险', meta: '35 分钟前 · AI 自动派单', time: 35 },
    { type: 'success', title: '兰1 · 103 门锁润滑维护完成', meta: '42 分钟前 · 李师傅', time: 42 },
    { type: 'warning', title: '竹5 · 405 墙面出现细微裂缝', meta: '1 小时前 · 待复查', time: 60 },
    { type: 'info', title: 'AI 模型更新完成，识别准确率提升至 96.2%', meta: '1.5 小时前 · 系统', time: 90 },
  ];

  const FEED_MESSAGES = [
    '菊3 · 302 检测到墙面渗水痕迹',
    '梅4 · 105 门锁使用频次异常偏高',
    '兰1 公共区域照明系统正常',
    '竹2 · 408 空调外机噪音异常',
    '梅3 · 201 窗户玻璃密封检测通过',
    '菊5 · 506 热水器温控异常预警',
  ];

  const FEED_TYPES = ['danger', 'warning', 'info', 'success'];

  const BUILDINGS = [
    { name: '梅1', score: 96, color: '#5B8A72' },
    { name: '梅4', score: 68, color: '#C0392B' },
    { name: '兰2', score: 91, color: '#5B8A72' },
    { name: '兰4', score: 82, color: '#C4820E' },
    { name: '竹1', score: 95, color: '#5B8A72' },
    { name: '竹5', score: 88, color: '#C4820E' },
    { name: '菊2', score: 74, color: '#C0392B' },
    { name: '菊4', score: 93, color: '#5B8A72' },
  ];

  const TREND_DATA = {
    values: [12, 19, 8, 15, 22, 14, 10],
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  };

  const LEADERBOARD_DATA = [
    { name: '张同学', dorm: '梅3 · 402', points: 185, money: 37 },
    { name: '李同学', dorm: '兰2 · 301', points: 152, money: 30.4 },
    { name: '王同学', dorm: '竹1 · 508', points: 128, money: 25.6 },
    { name: '赵同学', dorm: '菊4 · 203', points: 115, money: 23 },
    { name: '陈同学', dorm: '梅1 · 106', points: 98, money: 19.6 },
    { name: '刘同学', dorm: '兰5 · 412', points: 87, money: 17.4 },
    { name: '周同学', dorm: '竹3 · 305', points: 76, money: 15.2 },
    { name: '吴同学', dorm: '菊1 · 201', points: 65, money: 13 },
  ];

  const HISTORY_DATA = [
    { room: '梅4·502', type: '天花板霉点', severity: 'high', time: '今天 14:32', color: '#C0392B' },
    { room: '菊2·601', type: '管道渗水', severity: 'high', time: '今天 11:15', color: '#C0392B' },
    { room: '兰4·301', type: '窗户老化', severity: 'medium', time: '昨天 16:40', color: '#C4820E' },
    { room: '竹3·204', type: '墙面裂缝', severity: 'low', time: '昨天 09:22', color: '#8B6EA2' },
    { room: '梅2·103', type: '门框变形', severity: 'medium', time: '前天 14:08', color: '#C4820E' },
    { room: '竹5·405', type: '地面起泡', severity: 'low', time: '前天 10:55', color: '#8B6EA2' },
    { room: '菊3·302', type: '天花板渗水', severity: 'high', time: '3天前 08:30', color: '#C0392B' },
    { room: '兰1·205', type: '墙面污渍', severity: 'low', time: '3天前 15:20', color: '#8B6EA2' },
  ];

  return {
    CONFIG,
    COLORS,
    FEED_DATA,
    FEED_MESSAGES,
    FEED_TYPES,
    BUILDINGS,
    TREND_DATA,
    LEADERBOARD_DATA,
    HISTORY_DATA
  };
})();
