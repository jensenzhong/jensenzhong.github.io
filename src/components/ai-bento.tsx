"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  Github,
  GitFork,
  GraduationCap,
  Heart,
  Home,
  Info,
  Leaf,
  MessageCircle,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";
import { aiImageAssets } from "@/data/ai-image-assets";

type DetailItem = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  status?: string;
};

type ProjectItem = DetailItem & {
  accent: string;
  visual: "network" | "federated" | "fire" | "dorm" | "risk" | "eco" | "literature";
  featured?: boolean;
  icon: typeof Network;
  detailHref?: string;
};

const miniAppScreenshots = [
  { src: aiImageAssets.miniappConnection.src, blur: aiImageAssets.miniappConnection.blurDataURL, label: "联系度分析" },
  { src: aiImageAssets.miniappAssessmentEntry.src, blur: aiImageAssets.miniappAssessmentEntry.blurDataURL, label: "活力评估" },
  { src: aiImageAssets.miniappHome.src, blur: aiImageAssets.miniappHome.blurDataURL, label: "首页总览" },
  { src: aiImageAssets.miniappTeacher.src, blur: aiImageAssets.miniappTeacher.blurDataURL, label: "AI 小红老师" },
  { src: aiImageAssets.miniappPioneer.src, blur: aiImageAssets.miniappPioneer.blurDataURL, label: "模范性分析" },
];

const miniAppFeatures = [
  {
    title: "小红老师交互",
    desc: "以可爱的 AI 党建助手完成对话学习、数据记录与个性化引导。",
    icon: MessageCircle,
  },
  {
    title: "个性化资源推荐",
    desc: "根据用户数字画像推荐理论、时政、党史、党规等学习资源。",
    icon: Sparkles,
  },
  {
    title: "AI 试卷批改",
    desc: "支持多格式材料，逐题批改并给出依据、易错点和知识拓展。",
    icon: BookOpen,
  },
  {
    title: "活力指数评估",
    desc: "四维度并行分析，自动生成评分、图表、亮点和风险建议。",
    icon: Network,
  },
];

const socialMetrics = [
  { label: "笔记数", value: 8, suffix: "", icon: BookOpen },
  { label: "获赞数", value: 716, suffix: "", icon: Heart },
  { label: "观看量", value: 27365, suffix: "", icon: Eye },
];

const openSourceSkills = [
  {
    name: "礼物抽奖界面设计 Skill",
    description: "面向活动抽奖页面的 Codex Skill，沉淀可复用的前端生成流程。",
    meta: "UI Skill",
    href: "https://github.com/jensenzhong/gift-draw-page-skills",
  },
  {
    name: "文献分析可视化 Skill",
    description: "把文献阅读、结构提炼和可视化表达整理成可执行工作流。",
    meta: "Research Skill",
  },
];

const projects: ProjectItem[] = [
  {
    title: "基于多智能体协同的联邦学习造价研究",
    category: "毕业设计 · Federated Learning",
    description:
      "以多智能体协同和联邦学习为核心，探索工程造价数据在隐私保护约束下的协同建模与智能预测。",
    tags: ["毕业设计", "多智能体", "联邦学习", "工程造价"],
    status: "点击打开详情页",
    accent: "#7C3AED",
    visual: "federated",
    featured: true,
    icon: GraduationCap,
    detailHref: "/federated-learning-portfolio/index.html",
  },
  {
    title: "可交互的文献分析图",
    category: "智能建造课程作品 · Literature Visualization",
    description:
      "围绕智能建造技术在建筑消防领域中的应用研究，将 CNKI 文献互引、应用场景聚类和技术演化整理成可点击、可放大的交互式图谱作品。",
    tags: ["文献分析", "交互图谱", "CNKI", "建筑消防"],
    status: "点击打开详情页",
    accent: "#8B5CF6",
    visual: "literature",
    icon: FileText,
    detailHref: "/literature-fire-portfolio/index.html",
  },
  {
    title: "基于本质安全理念的建筑施工火灾智能预警方案",
    category: "智能建造 · 建筑施工防火",
    description:
      "面向香港城市更新施工场景，围绕本质安全理念展示风险感知、智能预警和施工防火管理流程。",
    tags: ["消防安全", "智能建造", "本质安全"],
    status: "点击打开详情页",
    accent: "#EF4444",
    visual: "fire",
    icon: ShieldCheck,
    detailHref: "/intrinsic-fire-protection/index.html",
  },
  {
    title: "SmartDorm.AI-基于AI赋能的宿舍运维管理系统demo",
    category: "设施管理 · Campus Operations",
    description:
      "围绕宿舍设施报修、资源调度和运维优化设计的系统 Demo，强调校园场景下的流程效率。",
    tags: ["设施管理", "流程优化", "校园场景"],
    status: "点击打开详情页",
    accent: "#0EA5E9",
    visual: "dorm",
    icon: Home,
    detailHref: "/smartdorm-ai-portfolio/index.html",
  },
  {
    title: "基于 RAG-LLM 的施工安全风险分析系统",
    category: "创新创业计划 · Safety Risk",
    description:
      "校级创新创业计划项目，基于 RAG 检索增强与 DeepSeek 大模型的施工安全研判系统，覆盖 53,000+ 历史事故案例，支持事前风险预判与实时预警。",
    tags: ["校创", "RAG-LLM", "安全风险"],
    status: "点击打开详情页",
    accent: "#F97316",
    visual: "risk",
    icon: Building2,
    detailHref: "/construction-safety-rag/index.html",
  },
  {
    title: "重大工程生态风险识别与预测算法",
    category: "国家级创新训练计划 · Eco Risk",
    description:
      "国家级创新训练计划项目，研究重大工程生态风险的特征识别、预测建模和可视化表达。",
    tags: ["国创", "生态风险", "预测算法"],
    status: "点击打开详情页",
    accent: "#10B981",
    visual: "eco",
    featured: true,
    icon: Leaf,
    detailHref: "/eco-risk-portfolio/portfolio.html",
  },
];

const demoVideoUrl =
  "https://www.bilibili.com/video/BV11XeFz2EXW/?share_source=copy_web&vd_source=a1d078e9508719259cc9e8c9a8c69072";

const containerVariants: Variants = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 10, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

function useCountUp(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [duration, end, start]);

  return count;
}

function formatMetric(value: number, suffix: string) {
  if (suffix === "K") return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

function useIsPortraitViewport() {
  const [isPortraitViewport, setIsPortraitViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    const update = () => setIsPortraitViewport(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isPortraitViewport;
}

function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[330px] w-[174px] max-md:portrait:h-[300px] max-md:portrait:w-[158px] min-[390px]:h-[360px] min-[390px]:w-[190px] md:h-[430px] md:w-[226px]">
      <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-[#303030] to-[#171717] p-[3px] shadow-[0_24px_70px_-14px_rgba(0,0,0,0.35)]">
        <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-white">
          <div className="absolute left-1/2 top-3 z-20 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-0 overflow-hidden">{children}</div>
        </div>
      </div>
      <div className="absolute -right-[2px] top-[108px] h-[44px] w-[3px] rounded-r-sm bg-[#3a3a3a]" />
      <div className="absolute -left-[2px] top-[86px] h-[26px] w-[3px] rounded-l-sm bg-[#3a3a3a]" />
      <div className="absolute -left-[2px] top-[124px] h-[44px] w-[3px] rounded-l-sm bg-[#3a3a3a]" />
      <div className="absolute -left-[2px] top-[175px] h-[44px] w-[3px] rounded-l-sm bg-[#3a3a3a]" />
    </div>
  );
}

function PhonePreview() {
  return (
    <Image
      src={aiImageAssets.miniappHome.src}
      alt="AI 智慧党建小程序首页"
      fill
      className="object-cover object-top"
      sizes="(min-width: 768px) 226px, (min-width: 390px) 190px, 174px"
      placeholder="blur"
      blurDataURL={aiImageAssets.miniappHome.blurDataURL}
      priority
    />
  );
}

function MiniAppShowcaseCard({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateCompactState = () => {
      setIsCompact(window.innerWidth < 768);
    };

    updateCompactState();
    window.addEventListener("resize", updateCompactState);
    return () => window.removeEventListener("resize", updateCompactState);
  }, []);

  const collapsedFan = [
    { rotate: -8, x: -34, y: 14, scale: 0.8, opacity: 0.5 },
    { rotate: -4, x: -18, y: 9, scale: 0.82, opacity: 0.58 },
    { rotate: 0, x: 0, y: 0, scale: 0.86, opacity: 0 },
    { rotate: 4, x: 18, y: 9, scale: 0.82, opacity: 0.58 },
    { rotate: 8, x: 34, y: 14, scale: 0.8, opacity: 0.5 },
  ];
  const expandedFan = [
    { rotate: -23, x: -250, y: 34, scale: 0.72, opacity: 1 },
    { rotate: -12, x: -132, y: 10, scale: 0.78, opacity: 1 },
    { rotate: 0, x: 0, y: -4, scale: 0.86, opacity: 0 },
    { rotate: 12, x: 118, y: 10, scale: 0.78, opacity: 1 },
    { rotate: 23, x: 220, y: 34, scale: 0.72, opacity: 1 },
  ];
  const compactExpandedFan = [
    { rotate: -18, x: -78, y: 24, scale: 0.72, opacity: 1 },
    { rotate: -8, x: -40, y: 8, scale: 0.78, opacity: 1 },
    { rotate: 0, x: 0, y: -4, scale: 0.86, opacity: 0 },
    { rotate: 8, x: 40, y: 8, scale: 0.78, opacity: 1 },
    { rotate: 18, x: 78, y: 24, scale: 0.72, opacity: 1 },
  ];
  const fanState = expanded
    ? isCompact
      ? compactExpandedFan
      : expandedFan
    : collapsedFan;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group relative min-h-[560px] overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_18px_60px_-28px_rgba(76,29,149,0.55)] backdrop-blur-xl max-md:portrait:min-h-[500px]"
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-200/35 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-orange-100/35 blur-3xl" />
      <div className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 shadow-sm ring-1 ring-purple-100">
        <Sparkles className="h-6 w-6 text-[#6D28D9]" />
      </div>

      <div className="relative z-10 grid h-full gap-6 p-6 max-md:portrait:gap-4 max-md:portrait:p-5 md:p-8 lg:grid-cols-[0.9fr_1.25fr]">
        <div className="relative z-10 flex flex-col justify-between gap-5">
          <div className="pt-16 max-md:portrait:pt-14 md:pt-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-3 py-1 text-xs font-black text-white shadow-sm shadow-red-200">
              数字媒体创新作品大赛 · 国家级二等奖
            </div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#6D28D9]">
              小红AI云引擎 · 智慧党建创新平台
            </p>
            <h3 className="text-2xl font-black tracking-tight text-slate-900 max-md:portrait:text-[22px] md:text-[34px]">
              智慧党建小程序
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 max-md:portrait:text-[13px]">
              利用 Coze 平台设计智能体工作流，独立开发支部党建小程序，已上线微信小程序平台，目前准备进行全代码化的重构。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {miniAppFeatures.map((item) => {
              const Icon = item.icon;
              return (
              <div
                key={item.title}
                className="rounded-2xl bg-white/78 px-3 py-3 shadow-sm ring-1 ring-slate-200/70"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6D28D9]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-black leading-tight text-slate-800">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                window.open(demoVideoUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7c3aed] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200/60 min-[390px]:w-auto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="h-4 w-4" fill="white" />
              观看演示
            </motion.button>
            <motion.a
              href="/xiaohong-ai/xiaohong-ai.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200/80 min-[390px]:w-auto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Info className="h-4 w-4 text-[#6D28D9]" />
              了解项目详情
            </motion.a>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="relative z-20 flex min-h-[390px] items-center justify-center overflow-visible rounded-[28px] bg-gradient-to-b from-white/20 to-purple-50/20 outline-none max-md:portrait:min-h-[350px] min-[390px]:min-h-[440px]"
          aria-pressed={expanded}
          aria-label="展开或收拢小程序截图"
        >
          <div className="absolute bottom-6 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-full bg-slate-900/15 blur-2xl" />

          {miniAppScreenshots.map((shot, index) => {
            const position = fanState[index];
            const isCenter = index === 2;

            return (
              <motion.div
                key={shot.src}
                className={cn(
                  "absolute h-[330px] w-[174px] overflow-hidden rounded-[28px] shadow-xl ring-1 ring-black/5 max-md:portrait:h-[300px] max-md:portrait:w-[158px] min-[390px]:h-[360px] min-[390px]:w-[190px] md:h-[430px] md:w-[226px]",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={{
                  x: position.x,
                  y: position.y,
                  rotate: position.rotate,
                  scale: position.scale,
                  opacity: position.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 24,
                  delay: index * 0.03,
                }}
                style={{
                  transformOrigin: "50% 96%",
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  className="object-cover object-top"
                  sizes="226px"
                  placeholder="blur"
                  blurDataURL={shot.blur}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2 text-left">
                  <span className="text-[10px] font-semibold text-white/90">
                    {shot.label}
                  </span>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="relative z-30"
            initial={false}
            animate={{ y: expanded ? -4 : 4, scale: expanded ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <IPhoneMockup>
              <PhonePreview />
            </IPhoneMockup>
          </motion.div>

          <div className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/80">
            {expanded ? "点击收拢" : "点击展开"}
          </div>
        </button>
      </div>
    </motion.div>
  );
}

function Sparkline({ isInView }: { isInView: boolean }) {
  const linePath =
    "M 0 28 C 12 25, 19 27, 30 20 C 42 12, 50 18, 62 12 C 74 5, 84 9, 96 3";
  const areaPath = `${linePath} L 96 34 L 0 34 Z`;

  return (
    <svg viewBox="0 0 96 34" className="h-11 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="xhs-sparkArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF2442" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF2442" stopOpacity="0" />
        </linearGradient>
        <filter id="xhs-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#xhs-sparkArea)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="#FF2442"
        strokeLinecap="round"
        strokeWidth="2"
        filter="url(#xhs-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.7, ease: "easeOut" }}
      />
      <motion.circle
        cx="96"
        cy="3"
        r="3"
        fill="#FF2442"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.5 }}
      />
    </svg>
  );
}

function SocialStatsCard() {
  const ref = useRef<HTMLDivElement>(null);
 const isInView = useInView(ref, { once: true, margin: "-50px" });
 const noteCount = useCountUp(socialMetrics[0].value, 1500, isInView);
 const likeCount = useCountUp(socialMetrics[1].value, 2100, isInView);
 const viewCount = useCountUp(socialMetrics[2].value, 2100, isInView);
 const counts = [noteCount, likeCount, viewCount];

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="relative min-h-[258px] overflow-hidden rounded-3xl border border-white/10 bg-[#1c1418] shadow-[0_18px_55px_-24px_rgba(255,36,66,0.55)]"
      style={{
        background:
          "linear-gradient(145deg, #1c1418 0%, #2a1c22 48%, #171013 100%)",
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <Meteors number={10} className="opacity-30" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FF2442]/10 blur-2xl" />
      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#FF2442]/35 ring-offset-2 ring-offset-[#1c1418]">
            <Image
              src="/images/social_photo.webp"
              alt="小红书头像"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Jensen</h3>
              <span className="rounded bg-[#FF2442]/15 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-[#FF2442]">
                小红书 Creator
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-white/35">AI Content · RedNote</p>
          </div>
          <a
            href="https://www.xiaohongshu.com/user/profile/5d37140a0000000012038e9f"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF2442]/20"
            aria-label="访问小红书主页"
          >
            <ExternalLink className="h-3.5 w-3.5 text-white/60" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {socialMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5">
                <p className="text-lg font-black leading-none tracking-tight text-white">
                  {formatMetric(counts[index], metric.suffix)}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-white/35">
                  <Icon className="h-3 w-3" />
                  <span>{metric.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-4">
          <Sparkline isInView={isInView} />
          <div className="mt-1 flex items-center justify-between text-[10px]">
            <span className="font-bold text-[#FF2442]">+23.5% 本月增长</span>
            <span className="text-white/25">持续创作中</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OpenSourceSkillsCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="relative min-h-[258px] overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 shadow-[0_18px_55px_-28px_rgba(76,29,149,0.55)] backdrop-blur-xl"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-purple-100/60 blur-3xl" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-white">
              <Github className="h-3 w-3" />
              Open Source
            </div>
            <h3 className="text-base font-black text-slate-900">GitHub Skills</h3>
          </div>
          <GitFork className="h-5 w-5 text-[#6D28D9]" />
        </div>

        <div className="space-y-3">
          {openSourceSkills.map((skill) => {
            const content = (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#6D28D9]">
                  <Code2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-bold text-slate-800">
                    {skill.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                    {skill.description}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                    {skill.meta}
                  </span>
                </div>
              </div>
            );

            if (skill.href) {
              return (
                <motion.a
                  key={skill.name}
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl bg-white/75 p-3 shadow-sm ring-1 ring-slate-200/70"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <motion.div
                key={skill.name}
                className="group rounded-2xl bg-white/75 p-3 shadow-sm ring-1 ring-slate-200/70"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectVisual({
  visual,
  accent,
  featured,
}: {
  visual: ProjectItem["visual"];
  accent: string;
  featured?: boolean;
}) {
  if (visual === "federated") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectFederated.src}
          alt="基于多智能体协同的联邦学习造价研究框架图"
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectFederated.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (visual === "network") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white/45 ring-1 ring-white/70">
        <motion.div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 50px ${accent}66` }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            className="absolute h-4 w-4 rounded-full bg-white shadow-md ring-4"
            style={{
              left: `${18 + (item % 3) * 32}%`,
              top: `${18 + Math.floor(item / 3) * 46}%`,
              color: accent,
              borderColor: accent,
            }}
            animate={{ y: [0, item % 2 ? -8 : 8, 0] }}
            transition={{ duration: 3.5 + item * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <svg className="absolute inset-0 h-full w-full opacity-40">
          <path d="M90 70 L190 145 L315 70 M190 145 L120 250 M190 145 L300 250" stroke={accent} strokeWidth="2" fill="none" />
        </svg>
        {featured && (
          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/75 px-4 py-2.5 text-xs font-bold text-slate-600 backdrop-blur">
            Multi-Agent Federated Cost Modeling
          </div>
        )}
      </div>
    );
  }

  if (visual === "fire") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectFire.src}
          alt="建筑施工火灾智能预警方案详情页预览"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectFire.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (visual === "dorm") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectDorm.src}
          alt="SmartDorm.AI 宿舍运维管理系统预览图"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectDorm.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (visual === "risk") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectRisk.src}
          alt="基于 RAG-LLM 的施工安全风险分析系统预览"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectRisk.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (visual === "literature") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectLiterature.src}
          alt="可交互的文献分析图预览"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectLiterature.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/45 via-transparent to-transparent" />
      </div>
    );
  }

  if (visual === "eco") {
    return (
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white ring-1 ring-white/70">
        <Image
          src={aiImageAssets.projectEco.src}
          alt="重大工程生态风险技术路线图预览"
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={aiImageAssets.projectEco.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-emerald-50 ring-1 ring-white/70">
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          className="absolute rounded-full border-2 border-emerald-300/70"
          style={{
            height: `${44 + item * 30}px`,
            width: `${44 + item * 30}px`,
            left: `${12 + item * 12}%`,
            top: `${42 - item * 5}%`,
          }}
          animate={{ rotate: [0, 8, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 4 + item * 0.25, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <Leaf className="absolute left-5 top-5 h-10 w-10 text-emerald-500" />
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
  compact = false,
  className,
}: {
  project: ProjectItem;
  onOpen: (item: DetailItem) => void;
  compact?: boolean;
  className?: string;
}) {
  const Icon = project.icon;

  const sharedClassName = cn(
    "group relative flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-4 text-left shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl outline-none",
    project.featured ? "min-h-[390px]" : "min-h-[310px]",
    compact && "min-h-[285px]",
    className
  );

  const sharedMotionProps = {
    variants: cardVariants,
    whileHover: {
      y: -6,
      scale: 1.01,
      boxShadow: `0 24px 70px -34px ${project.accent}AA`,
    },
    transition: { type: "spring" as const, stiffness: 360, damping: 30 },
  };

  const cardContent = (
    <>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${project.accent}33` }}
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3">
        <div className="rounded-[22px] bg-white/88 p-4 shadow-sm ring-1 ring-white/80 backdrop-blur">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70"
              style={{ color: project.accent }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: project.accent }}
            />
          </div>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            {project.category}
          </p>
          <h3
            className={cn(
              "break-words font-black leading-tight tracking-tight text-slate-900",
              project.featured ? "text-2xl md:text-[28px]" : compact ? "text-[16px]" : "text-[17px]"
            )}
          >
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, project.featured ? 4 : compact ? 2 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={cn("min-h-[150px] flex-1", project.featured && "min-h-[170px]", compact && "min-h-[135px]")}>
          <ProjectVisual
            visual={project.visual}
            accent={project.accent}
            featured={project.featured}
          />
        </div>
      </div>
    </>
  );

  if (project.detailHref) {
    return (
      <motion.a
        href={project.detailHref}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        {...sharedMotionProps}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      className={sharedClassName}
      {...sharedMotionProps}
    >
      {cardContent}
    </motion.button>
  );
}

function ProjectMatrix({ onOpen }: { onOpen: (item: DetailItem) => void }) {
  const featuredProjects = projects.filter((project) => project.featured);
  const supportingProjects = projects.filter((project) => !project.featured);

  return (
    <motion.div variants={containerVariants} className="mt-5 space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={onOpen}
            className={cn(
              "lg:min-h-[420px]",
              index === 1 && "lg:translate-y-5"
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {supportingProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={onOpen}
            compact
            className={cn(
              index % 2 === 0 ? "xl:-translate-y-2" : "xl:translate-y-5",
              index === 1 && "xl:translate-y-1",
              index === 3 && "xl:translate-y-3"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectDetailModal({
  item,
  onClose,
}: {
  item: DetailItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
          aria-label="关闭详情弹窗"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#6D28D9]">
          <FileText className="h-3.5 w-3.5" />
          {item.status ?? "详情页建设中"}
        </div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {item.category}
        </p>
        <h3 className="mt-2 pr-8 text-2xl font-black tracking-tight text-slate-900">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
          后续可以在这里接入真实详情页、GitHub 链接或完整项目报告。
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AIBentoGrid() {
  const [expanded, setExpanded] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const isPortraitViewport = useIsPortraitViewport();
  const gridMotionProps = isPortraitViewport
    ? { initial: false, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <>
      <motion.div
        variants={containerVariants}
        {...gridMotionProps}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
          <MiniAppShowcaseCard
            expanded={expanded}
            onToggle={() => setExpanded((value) => !value)}
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            <SocialStatsCard />
            <OpenSourceSkillsCard />
          </div>
        </div>

        <ProjectMatrix onOpen={setSelectedDetail} />
      </motion.div>

      <AnimatePresence>
        {selectedDetail && (
          <ProjectDetailModal
            item={selectedDetail}
            onClose={() => setSelectedDetail(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
