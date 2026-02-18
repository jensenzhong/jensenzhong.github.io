"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  Play,
  X,
  Heart,
  Users,
  Cloud,
  TrendingUp,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";
import { FederatedLearning } from "@/components/federated-learning";

/* ─────────────────────────────────────────────
   Screenshot Data
   ───────────────────────────────────────────── */

/** iPhone 内自动轮播截图（全部 7 张） */
const PHONE_SCREENSHOTS = [
  { src: "/images/miniapp/home.png", label: "小程序首页" },
  { src: "/images/miniapp/teacher.png", label: "AI 小红老师" },
  { src: "/images/miniapp/assessment-entry.png", label: "活力评估入口" },
  { src: "/images/miniapp/cohesion.png", label: "凝聚力分析" },
  { src: "/images/miniapp/guidance.png", label: "引导力分析" },
  { src: "/images/miniapp/pioneer.png", label: "模范性分析" },
  { src: "/images/miniapp/connection.png", label: "联系度分析" },
];

/** Hover 扇形展开 5 张截图 */
const FAN_SCREENSHOTS = [
  { src: "/images/miniapp/connection.png", label: "联系度分析" },
  { src: "/images/miniapp/assessment-entry.png", label: "活力评估" },
  { src: "/images/miniapp/home.png", label: "首页总览" },
  { src: "/images/miniapp/teacher.png", label: "AI 小红老师" },
  { src: "/images/miniapp/pioneer.png", label: "模范性分析" },
];

/* ─────────────────────────────────────────────
   CountUp Hook
   ───────────────────────────────────────────── */
function useCountUp(end: number, duration = 2000, start = false) {
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
  }, [end, duration, start]);

  return count;
}

/* ─────────────────────────────────────────────
   iPhone Mockup (CSS-only)
   ───────────────────────────────────────────── */
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[200px] h-[400px] md:w-[240px] md:h-[480px]">
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] p-[3px]">
        <div className="relative w-full h-full rounded-[37px] bg-white overflow-hidden">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-20" />
          <div className="absolute inset-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute -right-[2px] top-[120px] w-[3px] h-[48px] bg-[#3a3a3a] rounded-r-sm" />
      <div className="absolute -left-[2px] top-[96px] w-[3px] h-[28px] bg-[#3a3a3a] rounded-l-sm" />
      <div className="absolute -left-[2px] top-[138px] w-[3px] h-[48px] bg-[#3a3a3a] rounded-l-sm" />
      <div className="absolute -left-[2px] top-[194px] w-[3px] h-[48px] bg-[#3a3a3a] rounded-l-sm" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Phone Carousel
   ───────────────────────────────────────────── */
function PhoneCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHONE_SCREENSHOTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={PHONE_SCREENSHOTS[current].src}
            alt={PHONE_SCREENSHOTS[current].label}
            fill
            className="object-cover object-top"
            sizes="240px"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* 底部指示点 */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {PHONE_SCREENSHOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              i === current
                ? "bg-[#6D28D9] w-3.5"
                : "bg-black/20 hover:bg-black/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 1: AI App Showcase (Main) — 5 张扇形
   ───────────────────────────────────────────── */
function AppShowcaseCard({ onExpand }: { onExpand: () => void }) {
  /** 5 张扇形展开配置 */
  const fanConfigs = [
    { rotate: -24, x: -150, y: 24 },
    { rotate: -12, x: -75, y: 8 },
    { rotate: 0, x: 0, y: -5 },
    { rotate: 12, x: 75, y: 8 },
    { rotate: 24, x: 150, y: 24 },
  ];

  return (
    <motion.div
      layoutId="showcase-card"
      className="group relative h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* 标题 */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            AI 智慧党建小程序
          </h3>
          <p className="text-xs text-slate-400">
            LLM-powered WeChat Mini Program
          </p>
        </div>

        {/* iPhone + 5 张扇形 */}
        <div className="relative flex items-center justify-center flex-1 w-full">
          {FAN_SCREENSHOTS.map((shot, i) => (
            <motion.div
              key={i}
              className="absolute w-[200px] h-[400px] md:w-[240px] md:h-[480px] rounded-2xl overflow-hidden shadow-lg"
              style={{ zIndex: i === 2 ? 2 : i === 1 || i === 3 ? 1 : 0, originY: 1 }}
              initial={{
                rotate: 0,
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                rotate: fanConfigs[i].rotate,
                x: fanConfigs[i].x,
                y: fanConfigs[i].y,
                opacity: 1,
                scale: 0.82,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: i * 0.04,
              }}
            >
              <Image
                src={shot.src}
                alt={shot.label}
                fill
                className="object-cover object-top"
                sizes="240px"
              />
              {/* 底部标签 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                <span className="text-[9px] text-white/90 font-medium">
                  {shot.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* iPhone 主体 */}
          <div className="relative z-10">
            <IPhoneMockup>
              <PhoneCarousel />
            </IPhoneMockup>
          </div>
        </div>

        {/* Play 按钮 */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="mt-6 flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7c3aed] text-white text-base font-semibold shadow-lg shadow-purple-200/50 hover:shadow-purple-300/60 transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Play className="w-5 h-5" fill="white" />
          观看演示
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Sparkline — 小红书增长趋势线
   ───────────────────────────────────────────── */
function Sparkline({ isInView }: { isInView: boolean }) {
  const linePath =
    "M 0 26 C 8 24, 14 27, 22 20 C 30 13, 38 17, 46 12 C 54 8, 62 11, 70 6 C 78 3, 84 5, 90 2";
  const areaPath = linePath + " L 90 30 L 0 30 Z";

  return (
    <svg
      viewBox="0 0 90 30"
      className="w-full h-10"
      preserveAspectRatio="none"
    >
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

      {/* 面积填充 */}
      <motion.path
        d={areaPath}
        fill="url(#xhs-sparkArea)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      {/* 发光底线 */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#FF2442"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#xhs-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      {/* 主线 */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#FF2442"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      {/* 末端亮点 */}
      <motion.circle
        cx="90"
        cy="2"
        r="2.5"
        fill="#FF2442"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.8 }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Card 2: 小红书 — 暗色暖调重设计
   ───────────────────────────────────────────── */
function SocialInsightCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const followers = useCountUp(12800, 2200, isInView);
  const likes = useCountUp(58600, 2500, isInView);
  const notes = useCountUp(186, 1800, isInView);

  return (
    <motion.div
      ref={ref}
      className="relative h-full rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #1c1418 0%, #2a1c22 45%, #1e1519 100%)",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 40px -8px rgba(255,36,66,0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* 暖色光晕 */}
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#FF2442]/8 rounded-full blur-2xl" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FF2442]/5 rounded-full blur-2xl" />

      {/* 流星效果 */}
      <Meteors number={12} className="opacity-30" />

      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Header + 跳转按钮 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#FF2442]/30 ring-offset-1 ring-offset-[#1c1418]">
            <Image
              src="/images/social_photo.jpg"
              alt="Profile"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-white/90">小红书</p>
              <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[8px] font-medium bg-[#FF2442]/15 text-[#FF2442] leading-none">
                Creator
              </span>
            </div>
            <p className="text-[10px] text-white/30 mt-0.5">
              AI Content · RedNote
            </p>
          </div>
          <a
            href="https://www.xiaohongshu.com/user/profile/5d37140a0000000012038e9f"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-[#FF2442]/20 flex items-center justify-center transition-colors duration-200"
            aria-label="访问小红书主页"
          >
            <ExternalLink className="w-3 h-3 text-white/60 hover:text-[#FF2442]" />
          </a>
        </div>

        {/* Stats 三列 */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <p className="text-lg font-black text-white tabular-nums tracking-tight leading-none">
              {(followers / 1000).toFixed(1)}
              <span className="text-[10px] font-medium text-white/40 ml-0.5">
                K
              </span>
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-2.5 h-2.5 text-white/25" />
              <span className="text-[9px] text-white/30">粉丝</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-black text-white tabular-nums tracking-tight leading-none">
              {(likes / 1000).toFixed(1)}
              <span className="text-[10px] font-medium text-white/40 ml-0.5">
                K
              </span>
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Heart className="w-2.5 h-2.5 text-white/25" />
              <span className="text-[9px] text-white/30">获赞</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-black text-white tabular-nums tracking-tight leading-none">
              {notes}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <BookOpen className="w-2.5 h-2.5 text-white/25" />
              <span className="text-[9px] text-white/30">笔记</span>
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="flex-1 flex flex-col justify-end">
          <Sparkline isInView={isInView} />
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#FF2442]" />
              <span className="text-[10px] font-semibold text-[#FF2442]">
                +23.5%
              </span>
              <span className="text-[9px] text-white/25">本月增长</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[9px] text-white/20">
              持续创作中
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Card 3: Research Visualization (Right Bottom)
   ───────────────────────────────────────────── */
function ResearchCard() {
  return (
    <motion.div
      className="relative h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] overflow-hidden p-6 flex flex-col"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 40px -8px rgba(109,40,217,0.15)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-100/30 rounded-full blur-2xl" />

      <div className="relative z-10 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Cloud className="w-4 h-4 text-[#6D28D9]" />
          <h3 className="text-sm font-bold text-slate-800">
            Federated Learning
          </h3>
        </div>
        <p className="text-[11px] text-slate-400">
          Privacy-preserving distributed ML
        </p>
      </div>

      <div className="relative z-10 flex-1 min-h-0">
        <FederatedLearning />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Modal: Demo Video (竖屏全屏弹窗)
   ───────────────────────────────────────────── */
function DemoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        layoutId="showcase-card"
        className="relative z-10 w-[90vw] max-w-lg rounded-3xl bg-black shadow-2xl overflow-hidden"
        style={{ aspectRatio: "9/16", maxHeight: "85vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <video
          ref={videoRef}
          src="/images/miniapp/demo.mp4"
          className="w-full h-full object-contain"
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Export: AI Bento Grid
   ───────────────────────────────────────────── */
export function AIBentoGrid() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-[minmax(220px,auto)]"
      >
        <div className="lg:col-span-2 min-h-[560px]">
          <AppShowcaseCard onExpand={() => setModalOpen(true)} />
        </div>

        <div className="lg:col-span-1 grid grid-rows-2 gap-5 min-h-[560px]">
          <SocialInsightCard />
          <ResearchCard />
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <DemoModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
