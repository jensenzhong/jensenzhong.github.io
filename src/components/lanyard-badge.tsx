"use client";

import Image from "next/image";
import { useMotionValue, useTransform, motion } from "framer-motion";
import {
  Bot,
  Braces,
  Building2,
  Workflow,
  TrendingUp,
  Award,
  Database,
} from "lucide-react";

const skillCategories = [
  {
    label: "开发",
    Icon: Braces,
    tools: ["Python", "SQL", "HTML"],
  },
  {
    label: "智能体",
    Icon: Workflow,
    tools: ["Coze", "N8N", "Dify"],
  },
  {
    label: "工程",
    Icon: Building2,
    tools: ["Revit", "AutoCAD", "广联达"],
  },
  {
    label: "AI设计",
    Icon: Bot,
    tools: ["Cursor", "即时设计", "Lovart"],
  },
];

export function LanyardBadge() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-140, 0, 140], [-6, 0, 6]);
  const ropePath = useTransform([x, y], ([latestX, latestY]) => {
    const dx = Number(latestX);
    const dy = Number(latestY);
    const endX = 180 + dx;
    const endY = 86 + dy;
    const pull = Math.min(44, Math.hypot(dx, dy) * 0.14);
    const midX = 180 + dx * 0.42;
    return `M 180 0 C 180 ${30 + pull}, ${midX} ${68 + pull}, ${endX} ${endY}`;
  });

  return (
    <div className="relative mx-auto -mt-8 max-w-[380px] pt-2 lg:-mt-12">
      {/* Lanyard Cord */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 z-20 h-32 w-[360px] -translate-x-1/2 overflow-visible"
        viewBox="0 0 360 132"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lanyardCord" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#050505" />
            <stop offset="58%" stopColor="#111111" />
            <stop offset="100%" stopColor="#020202" />
          </linearGradient>
        </defs>
        <path d="M180 0 L180 52" stroke="#050505" strokeWidth="18" strokeLinecap="round" />
        <path d="M180 2 L180 50" stroke="rgba(255,255,255,0.16)" strokeWidth="4" strokeLinecap="round" />
        <motion.path
          d={ropePath}
          fill="none"
          stroke="url(#lanyardCord)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d={ropePath}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* ===== Back Card (skills) ===== */}
      <div className="absolute left-1/2 top-[108px] z-[1] w-full max-w-[340px] -translate-x-1/2 -rotate-[3deg]">
        <div className="overflow-hidden rounded-2xl bg-[rgb(242,241,238)] shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.03]">
          <div className="border-b border-neutral-200/50 px-5 py-3">
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-700">能力栈</span>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-2.5">
              {skillCategories.map(({ label, Icon, tools }) => (
                <div key={label} className="rounded-xl border border-neutral-200/40 bg-white/80 p-3">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Icon className="h-3 w-3 text-neutral-600" />
                    <p className="text-[10px] font-bold text-neutral-800">{label}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Card ===== */}
      <motion.article
        className="lanyard-card group absolute left-0 top-[84px] z-10 w-full cursor-grab touch-none overflow-visible rounded-2xl bg-[rgb(250,249,247)] shadow-[0_34px_80px_-48px_rgba(15,23,42,0.6),0_14px_40px_-12px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-black/[0.04] active:cursor-grabbing"
        drag
        dragConstraints={{ left: -72, right: 72, top: -46, bottom: 56 }}
        dragElastic={0.18}
        whileTap={{ scale: 1.012 }}
        dragTransition={{ bounceStiffness: 280, bounceDamping: 14 }}
        style={{ x, y, rotate, transformOrigin: "50% 0px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/50 px-5 pb-2.5 pt-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-700">
            广州大学
          </span>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-700">
            <TrendingUp className="h-3 w-3 text-blue-400" />
            <span>1 / 112</span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative mx-5 mt-4 overflow-hidden rounded-xl bg-neutral-100">
          <div className="relative h-[240px] w-full overflow-hidden">
            <Image
              src="/images/profile/zhong-zhengshen-avatar.jpg"
              alt="钟政燊头像"
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="absolute left-3 top-3">
            <div className="rounded-md border border-white/60 bg-white/80 px-2 py-1 backdrop-blur-sm">
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                GZU ID Card
              </span>
            </div>
          </div>
          <div className="absolute right-3 bottom-3">
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <Award className="h-3 w-3 text-blue-500" />
              <span className="text-[10px] font-bold text-neutral-800">GPA 3.88</span>
              <span className="text-[9px] text-neutral-600">/ 4.00</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 pb-3 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900">钟政燊</h3>
              <p className="mt-0.5 text-[11px] text-neutral-600">工程管理专业 · 2023级</p>
            </div>
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[9px] font-semibold text-neutral-600">
              <Award className="h-2.5 w-2.5 text-orange-400" />
              中共党员
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[9px] font-semibold text-neutral-600">
              工程管理
            </span>
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[9px] font-semibold text-neutral-600">
              元宇宙智能决策与人机交互微专业
            </span>
          </div>
        </div>

        {/* Skills grid - visible on main card */}
        <div className="border-t border-neutral-200/50 px-5 pb-5 pt-4">
          <div className="mb-2 flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600">能力栈</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skillCategories.map(({ label, Icon, tools }) => (
              <div
                key={label}
                className="rounded-xl border border-neutral-200/40 bg-white/80 p-2.5"
              >
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Icon className="h-3 w-3 text-neutral-600" />
                  <p className="text-[10px] font-bold text-neutral-800">{label}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
