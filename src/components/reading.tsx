"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight, Award, BarChart3, BriefcaseBusiness, ClipboardList, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "商业精英挑战赛",
    display: "Working\nStrategy",
    grade: "大一",
    result: "全国二等奖",
    field: "商业表达",
    color: "bg-[#ee4f12]",
    text: "text-white",
    visual: "bars",
    Icon: BriefcaseBusiness,
    summary: "基于瑞贝卡公司开展系统性财务分析与商业策略研究，从资产质量、盈利能力与运营效率等维度构建分析框架，并结合行业趋势提出优化商业模式、拓展国内市场及供应链升级等策略，最终完成三年财务预测与可执行落地方案设计。我主要负责财务预测部分",
    meta: ["商业策略", "路演表达", "全国二等奖"],
    href: "/images/awards/business-elite-accounting-national-second-prize-2024.jpg",
  },
  {
    title: "正大杯市场调研分析大赛",
    display: "Practical\nResearch",
    grade: "大二",
    result: "国家级三等奖",
    field: "市场调研",
    color: "bg-[#f4ead6]",
    text: "text-[#342b22]",
    visual: "grid",
    Icon: ClipboardList,
    summary: "围绕真实市场问题完成调研设计、问卷分析和结论呈现，将分散样本整理成可读的商业洞察。",
    meta: ["市场调研", "数据分析", "国家级三等奖"],
    href: "/literature-fire-portfolio/",
  },
  {
    title: "数字媒体创新大赛",
    display: "Creative\nMedia",
    grade: "大三",
    result: "全国二等奖",
    field: "创新作品",
    color: "bg-[#1598d4]",
    text: "text-white",
    visual: "lines",
    Icon: Sparkles,
    summary: "以数字媒体作品为载体，完成从概念设定、交互表达到视觉包装的创新作品设计。",
    meta: ["创新作品", "数字媒体", "全国二等奖"],
    href: "/xiaohong-ai/xiaohong-ai.html",
  },
  {
    title: "职业规划大赛",
    display: "Career\nPath",
    grade: "大三",
    result: "铜奖",
    field: "职业叙事",
    color: "bg-[#55ed91]",
    text: "text-[#07351d]",
    visual: "matrix",
    Icon: Award,
    summary: "把个人经历、能力证据和职业目标组织成一条清晰叙事，呈现可持续成长路径。",
    meta: ["职业叙事", "成长路径", "铜奖"],
    href: "/intrinsic-fire-protection/",
  },
  {
    title: "三年竞赛能力图谱",
    display: "Award\nSystem",
    grade: "总览",
    result: "4项荣誉",
    field: "综合成长",
    color: "bg-[#1f1d1b]",
    text: "text-[#f4ead6]",
    visual: "panels",
    Icon: BarChart3,
    summary: "把三年竞赛经历整理成能力图谱，沉淀从调研、表达、创作到规划的复合能力结构。",
    meta: ["能力图谱", "综合成长", "4项荣誉"],
    href: "/literature-fire-portfolio/",
  },
];

const placements = [
  { left: 20, top: 58, rotate: -7, y: -5, duration: 5.6 },
  { left: 35, top: 63, rotate: 3, y: 5, duration: 6.1 },
  { left: 50, top: 50, rotate: -1, y: -5, duration: 5.8 },
  { left: 65, top: 62, rotate: 1, y: 5, duration: 6.4 },
  { left: 80, top: 56, rotate: 6, y: -5, duration: 6 },
];

const CARD_HEIGHT = 400;
const DEFAULT_SCALE = 0.82;
const SELECTED_SCALE = 1.08;
const COMPACT_SCALE = 0.46;
const SELECTED_TOP = 220;
const STACK_TUCK = 24;
const STACK_TOP = SELECTED_TOP + CARD_HEIGHT * SELECTED_SCALE - STACK_TUCK;

function BarsVisual() {
  return (
    <div className="absolute left-8 right-8 top-8 flex h-36 items-end gap-1.5 opacity-90">
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.span
          key={index}
          className="w-1.5 rounded-full bg-white/90"
          animate={{ height: [`${22 + (index % 9) * 5}%`, `${46 + (index % 7) * 5}%`, `${28 + (index % 6) * 6}%`] }}
          transition={{ duration: 2.2 + (index % 4) * 0.18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.03 }}
        />
      ))}
    </div>
  );
}

function GridVisual() {
  return (
    <div className="absolute left-9 right-9 top-8 grid grid-cols-12 gap-1.5">
      {Array.from({ length: 84 }).map((_, index) => (
        <motion.span
          key={index}
          className="aspect-square rounded-[2px] bg-[#8f8779]"
          animate={{ opacity: [0.22, index % 6 === 0 ? 0.9 : 0.46, 0.28] }}
          transition={{ duration: 1.7 + (index % 5) * 0.16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: (index % 14) * 0.06 }}
        />
      ))}
    </div>
  );
}

function LinesVisual() {
  return (
    <div className="absolute inset-x-8 top-8 space-y-1.5 opacity-70">
      {Array.from({ length: 26 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-px rounded-full bg-white/80"
          animate={{ x: [0, index % 2 ? 7 : -7, 0], opacity: [0.25, 0.82, 0.32] }}
          transition={{ duration: 3 + (index % 4) * 0.22, repeat: Infinity, ease: "easeInOut", delay: index * 0.04 }}
          style={{ width: `${72 + (index % 5) * 5}%` }}
        />
      ))}
    </div>
  );
}

function MatrixVisual() {
  return (
    <div className="absolute left-8 right-8 top-8 grid max-h-[170px] grid-cols-15 gap-1 overflow-hidden">
      {Array.from({ length: 120 }).map((_, index) => (
        <motion.span
          key={index}
          className="h-4 rounded-sm bg-[#062916]"
          animate={{ opacity: [0.45, index % 7 === 0 ? 1 : 0.68, 0.48] }}
          transition={{ duration: 1.8 + (index % 6) * 0.12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: (index % 15) * 0.04 }}
        />
      ))}
    </div>
  );
}

function PanelsVisual() {
  return (
    <div className="absolute inset-x-8 top-8 h-40 rounded-2xl border border-[#f4ead6]/20">
      {[0, 1, 2, 3].map((item) => (
        <motion.div
          key={item}
          className="absolute top-6 rounded-xl border border-[#f4ead6]/30"
          style={{ left: `${8 + item * 22}%`, width: `${18 - item * 1.5}%`, height: `${72 - item * 8}%` }}
          animate={{ opacity: [0.28, 0.64, 0.35] }}
          transition={{ duration: 3 + item * 0.24, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CardVisual({ type }: { type: string }) {
  if (type === "bars") return <BarsVisual />;
  if (type === "grid") return <GridVisual />;
  if (type === "lines") return <LinesVisual />;
  if (type === "matrix") return <MatrixVisual />;
  return <PanelsVisual />;
}

export function Reading() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!stageRef.current) return;

    const ctx = gsap.context(() => {
      tweensRef.current = gsap.utils.toArray<HTMLElement>(".award-float-inner").map((card, index) =>
        gsap.to(card, {
          y: placements[index].y,
          duration: placements[index].duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        })
      );
    }, stageRef);

    return () => {
      tweensRef.current = [];
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    tweensRef.current.forEach((tween) => {
      if (selectedIndex === null) {
        tween.resume();
      } else {
        tween.pause();
      }
    });

  }, [selectedIndex]);

  const pauseCard = (index: number) => {
    if (selectedIndex !== null) return;
    setActiveIndex(index);
    const tween = tweensRef.current[index];
    tween?.pause();
  };

  const resumeCard = (index: number) => {
    if (selectedIndex !== null) return;
    setActiveIndex(null);
    const tween = tweensRef.current[index];
    tween?.resume();
  };

  const getCardAnimation = (index: number) => {
    const placement = placements[index];

    if (selectedIndex === null) {
      return {
        left: `${placement.left}%`,
        top: `${placement.top}%`,
        x: "-50%",
        y: "-50%",
        rotate: placement.rotate,
        scale: DEFAULT_SCALE,
        opacity: 1,
        zIndex: 10 + index,
      };
    }

    if (selectedIndex === index) {
      return {
        left: "50%",
        top: SELECTED_TOP,
        x: "-50%",
        y: 0,
        rotate: 0,
        scale: SELECTED_SCALE,
        opacity: 1,
        zIndex: 80,
      };
    }

    const compactIndex = cards
      .map((_, itemIndex) => itemIndex)
      .filter((itemIndex) => itemIndex !== selectedIndex)
      .indexOf(index);

    return {
      left: `${34 + compactIndex * 10.5}%`,
      top: STACK_TOP,
      x: "-50%",
      y: 0,
      rotate: [-5, -1, 2, 6][compactIndex],
      scale: COMPACT_SCALE,
      opacity: 0.98,
      zIndex: 35 + compactIndex,
    };
  };

  return (
    <section id="awards" className="relative overflow-hidden py-24 scroll-mt-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mx-auto mb-8 h-px w-24 bg-slate-200" />
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Awards Portfolio</p>
          <h2 className="font-serif text-5xl tracking-tight text-[#1d1a18] md:text-7xl">竞赛荣誉</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
            三个国家级奖项与一个省级奖项，涵盖财务分析、市场调研、软件开发与职业发展四个方向。
          </p>
        </motion.div>

        <div
          ref={stageRef}
          className="relative mx-auto hidden h-[660px] max-w-6xl overflow-visible md:block"
          onClick={() => {
            if (selectedIndex !== null) setSelectedIndex(null);
          }}
        >
          {cards.map((card, index) => {
            const Icon = card.Icon;
            const active = activeIndex === index || selectedIndex === index;
            const selected = selectedIndex === index;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  left: `${placements[index].left}%`,
                  top: `${placements[index].top}%`,
                  x: "-50%",
                  y: "20%",
                  rotate: placements[index].rotate,
                  scale: DEFAULT_SCALE * 0.96,
                }}
                whileInView={{ opacity: 1, y: "-50%" }}
                animate={getCardAnimation(index)}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: selectedIndex === null ? 150 : 135,
                  damping: selectedIndex === null ? 22 : 30,
                  mass: 0.9,
                  delay: selectedIndex === null ? index * 0.04 : 0,
                }}
                style={{ transformOrigin: "50% 0%" }}
                className={cn("award-float absolute h-[400px]", selected ? "w-[330px]" : "w-[270px]")}
                onMouseEnter={() => pauseCard(index)}
                onMouseLeave={() => resumeCard(index)}
                onFocus={() => pauseCard(index)}
                onBlur={() => resumeCard(index)}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(null);
                  setSelectedIndex((current) => (current === index ? null : index));
                }}
              >
                <div className="award-float-inner h-full w-full">
                  <motion.div
                    className="h-full w-full"
                    animate={{
                      y: activeIndex === index && selectedIndex === null ? -10 : 0,
                      scale: activeIndex === index && selectedIndex === null ? 1.025 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 230,
                      damping: 20,
                      mass: 0.55,
                    }}
                  >
                    <article
                      tabIndex={0}
                      className={cn(
                        "group relative h-full w-full cursor-pointer overflow-hidden rounded-[22px] p-7 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.58)] ring-1 ring-black/5 transition-[box-shadow,filter] duration-300",
                        active ? "shadow-[0_34px_92px_-38px_rgba(15,23,42,0.76)] brightness-[1.03]" : "",
                        selected ? "ring-2 ring-white/70" : "",
                        card.color,
                        card.text
                      )}
                    >
                      <CardVisual type={card.visual} />
                      <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="inline-flex w-fit rounded-full bg-black/12 px-3 py-1 text-xs font-black backdrop-blur">
                          {card.grade}
                        </div>
                        {selected && (
                          <a
                            href={card.href}
                            onClick={(event) => event.stopPropagation()}
                            className="group/link absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/88 text-[#1d1a18] shadow-[0_14px_34px_-18px_rgba(15,23,42,0.7)] ring-1 ring-black/5 backdrop-blur transition-transform duration-200 hover:scale-105"
                            aria-label={`查看${card.title}详情`}
                          >
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                        )}

                        <div className={cn(selected ? "space-y-5" : "space-y-4")}>
                          <h3
                            className={cn(
                              "whitespace-pre-line font-serif leading-[0.95] tracking-tight",
                              selected ? "text-[38px]" : "text-[42px]"
                            )}
                          >
                            {card.display}
                          </h3>
                          <div className={cn(selected ? "space-y-3" : "space-y-2")}>
                            <p className={cn("font-black leading-tight", selected ? "text-[22px]" : "text-[17px]")}>
                              {card.title}
                            </p>
                            <p className={cn("font-black opacity-80", selected ? "text-[16px]" : "text-[13px]")}>
                              {card.result}
                            </p>
                            {selected && (
                              <p className="max-h-[7rem] max-w-[16.5rem] overflow-y-auto pr-2 text-sm font-semibold leading-relaxed opacity-70 [scrollbar-width:thin]">
                                {card.summary}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-4 md:hidden">
          {cards.map((card, index) => {
            const Icon = card.Icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={cn("relative min-h-[280px] overflow-hidden rounded-[22px] p-6", card.color, card.text)}
              >
                <CardVisual type={card.visual} />
                <Icon className="absolute right-6 top-6 h-6 w-6" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <span className="w-fit rounded-full bg-black/12 px-3 py-1 text-xs font-black">{card.grade}</span>
                  <div>
                    <h3 className="whitespace-pre-line font-serif text-4xl leading-none">{card.display}</h3>
                    <p className="mt-4 text-sm font-black">{card.title}</p>
                    <p className="mt-2 text-xs opacity-75">{card.result} 路 {card.field}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

