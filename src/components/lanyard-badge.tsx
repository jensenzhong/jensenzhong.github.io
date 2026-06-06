"use client";

import Image from "next/image";
import {
  Award,
  Bot,
  Braces,
  Building2,
  Database,
  Workflow,
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
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] lg:mx-0 lg:max-w-[340px]">
      <article className="lanyard-card relative z-10 w-full overflow-hidden rounded-2xl bg-white shadow-[0_22px_52px_-34px_rgba(0,0,0,0.45),0_10px_28px_-14px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-black/[0.06]">
        <div className="px-5 pb-1.5 pt-4 text-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-orange-600">
            Guangzhou University
          </span>
        </div>

        <div className="relative mx-5 overflow-hidden rounded-xl bg-neutral-100">
          <div className="relative h-[210px] w-full overflow-hidden sm:h-[216px] lg:h-[210px]">
            <Image
              src="/images/profile/zhong-zhengshen-avatar.webp"
              alt="钟政燊头像"
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        <div className="px-5 pb-1.5 pt-3 text-center">
          <h3 className="text-lg font-bold tracking-tight text-neutral-900">钟政燊</h3>
          <p className="mt-0.5 text-[11px] text-neutral-400">工程管理 · 2023级</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 px-5 pb-2.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[9px] font-semibold text-neutral-600">
            <Award className="h-2.5 w-2.5 text-orange-500" />
            中共党员
          </span>
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[9px] font-semibold text-neutral-600">
            元宇宙智能决策与人机交互微专业
          </span>
        </div>

        <div className="mx-5 mb-3 flex items-center justify-center gap-5 rounded-xl bg-neutral-50 px-3 py-2.5">
          <div className="text-center">
            <p className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">GPA</p>
            <p className="text-base font-bold text-neutral-900">3.88</p>
            <p className="text-[9px] text-neutral-400">/ 4.00</p>
          </div>
          <div className="h-7 w-px bg-neutral-200" />
          <div className="text-center">
            <p className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">排名</p>
            <p className="text-base font-bold text-neutral-900">1</p>
            <p className="text-[9px] text-neutral-400">/ 112</p>
          </div>
          <div className="h-7 w-px bg-neutral-200" />
          <div className="text-center">
            <p className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">技能</p>
            <p className="text-base font-bold text-neutral-900">4</p>
            <p className="text-[9px] text-neutral-400">领域</p>
          </div>
        </div>

        <div className="border-t border-neutral-100 px-5 pb-3 pt-2">
          <div className="mb-2 flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600">
              能力栈
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {skillCategories.map(({ label, Icon, tools }) => (
              <div key={label} className="rounded-lg bg-neutral-50 p-1.5">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <Icon className="h-3 w-3 text-neutral-500" />
                  <p className="text-[10px] font-bold text-neutral-700">{label}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded bg-white px-1.5 py-0.5 text-[9px] font-medium text-neutral-500"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-100 px-5 pb-3 pt-2.5 text-center">
          <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-neutral-300">
            Elevating Experiences · www.gzhu.edu.cn
          </p>
        </div>
      </article>
    </div>
  );
}
