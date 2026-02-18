"use client";

import { Music2, Play, Headphones, ListMusic } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { genres, playlists, nowPlayingInfo } from "@/data/music";

// --- Radar Chart 常量 ---
const CHART_SIZE = 280;
const CENTER = CHART_SIZE / 2;
const MAX_RADIUS = 100;
const GRID_LEVELS = 5;
const ANGLE_STEP = 360 / genres.length;

// 音频可视化跳动条参数 (固定值避免 SSR hydration 不匹配)
const audioBarAnimations = [
  { max: 14, duration: 0.8 },
  { max: 20, duration: 1.0 },
  { max: 12, duration: 0.7 },
  { max: 18, duration: 0.9 },
  { max: 16, duration: 1.1 },
];

// 浮动音符粒子参数
const floatingNotes = [
  { note: "♪", x: "8%", delay: 0, duration: 18, size: 24, top: "15%" },
  { note: "♫", x: "22%", delay: 4, duration: 22, size: 18, top: "55%" },
  { note: "♬", x: "45%", delay: 2, duration: 16, size: 28, top: "35%" },
  { note: "♩", x: "62%", delay: 6, duration: 20, size: 16, top: "75%" },
  { note: "♪", x: "78%", delay: 1, duration: 24, size: 22, top: "25%" },
  { note: "♫", x: "93%", delay: 3, duration: 19, size: 20, top: "65%" },
];

// --- Radar Chart 辅助函数 ---
function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getDataPolygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const { x, y } = polarToXY(i * ANGLE_STEP, (v / 100) * MAX_RADIUS);
      return `${x},${y}`;
    })
    .join(" ");
}

function getGridPolygonPoints(level: number) {
  const r = ((level + 1) / GRID_LEVELS) * MAX_RADIUS;
  return Array.from({ length: genres.length }, (_, i) => {
    const { x, y } = polarToXY(i * ANGLE_STEP, r);
    return `${x},${y}`;
  }).join(" ");
}

function getLabelAnchor(angleDeg: number): "start" | "middle" | "end" {
  if (angleDeg > 20 && angleDeg < 160) return "start";
  if (angleDeg > 200 && angleDeg < 340) return "end";
  return "middle";
}

// --- 子组件：雷达图 ---
function RadarChart({ isInView }: { isInView: boolean }) {
  return (
    <div className="flex justify-center px-2">
      <svg
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
        className="w-full max-w-[280px] h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="radarGradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* 网格线 */}
        {Array.from({ length: GRID_LEVELS }, (_, level) => (
          <polygon
            key={level}
            points={getGridPolygonPoints(level)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={level === GRID_LEVELS - 1 ? 1.5 : 0.7}
            strokeDasharray={level < GRID_LEVELS - 1 ? "4,4" : "none"}
          />
        ))}

        {/* 轴线 */}
        {genres.map((_, i) => {
          const { x, y } = polarToXY(i * ANGLE_STEP, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth={0.7}
            />
          );
        })}

        {/* 数据区域（动画组） */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", damping: 20, stiffness: 80 }}
        >
          <polygon
            points={getDataPolygonPoints(genres.map((g) => g.value))}
            fill="url(#radarGradientFill)"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* 数据点 */}
          {genres.map((g, i) => {
            const { x, y } = polarToXY(i * ANGLE_STEP, (g.value / 100) * MAX_RADIUS);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="#6366f1"
                stroke="white"
                strokeWidth={2.5}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
              />
            );
          })}
        </motion.g>

        {/* 标签 */}
        {genres.map((g, i) => {
          const labelR = MAX_RADIUS + 26;
          const { x, y } = polarToXY(i * ANGLE_STEP, labelR);
          const anchor = getLabelAnchor(i * ANGLE_STEP);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
            >
              <text
                x={x}
                y={y - 2}
                textAnchor={anchor}
                dominantBaseline="central"
                className="fill-gray-600"
                style={{ fontSize: 13, fontWeight: 500 }}
              >
                {g.label}
              </text>
              <text
                x={x}
                y={y + 14}
                textAnchor={anchor}
                dominantBaseline="central"
                className="fill-indigo-500"
                style={{ fontSize: 11, fontFamily: "monospace" }}
              >
                {g.value}%
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// --- 子组件：正在播放指示器 ---
function NowPlayingBar() {
  return (
    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
      {/* 专辑封面指示 */}
      <div className="relative flex-shrink-0">
        <motion.div
          className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <motion.div
          className="absolute -inset-1 border-2 border-indigo-400/50 rounded-full"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 歌曲信息 */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-indigo-500 font-semibold tracking-wider uppercase">
          正在播放
        </p>
        <p className="text-sm font-medium text-gray-700 truncate">
          {nowPlayingInfo.title} — {nowPlayingInfo.artist}
        </p>
      </div>

      {/* 音频可视化 */}
      <div className="flex items-end gap-[3px] h-5 flex-shrink-0">
        {audioBarAnimations.map((bar, i) => (
          <motion.div
            key={i}
            className="w-[3px] bg-indigo-500 rounded-full"
            animate={{ height: [3, bar.max, 3] }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// --- 子组件：歌单卡片 ---
function PlaylistCard({
  playlist: pl,
  index,
  isInView,
}: {
  playlist: (typeof playlists)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <div
        className={`relative bg-gradient-to-br ${pl.gradient} rounded-2xl p-5 h-[140px] flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:-translate-y-1`}
      >
        {/* 装饰圆 */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-125" />

        <div className="relative z-10">
          <h4 className="text-white font-bold text-base leading-tight mb-1">
            {pl.name}
          </h4>
          <p className="text-white/65 text-xs">{pl.description}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-white/55 text-xs font-medium">
            {pl.songCount} 首
          </span>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- 主组件 ---
export function Music() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="music"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* 浮动音符粒子 */}
      {floatingNotes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute text-indigo-400/[0.06] pointer-events-none select-none"
          style={{ left: n.x, top: n.top, fontSize: n.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.03, 0.07, 0.03],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: n.duration,
            repeat: Infinity,
            delay: n.delay,
            ease: "easeInOut",
          }}
        >
          {n.note}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section 标题 */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center border border-indigo-200">
            <Music2 className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800">Music</h2>
        </div>

        {/* 主内容区 */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：雷达图卡片 */}
          <motion.div
            className="lg:w-5/12 w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100/80 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Headphones className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-gray-700">音乐口味</h3>
              </div>

              <div className="flex-1 flex items-center">
                <RadarChart isInView={isInView} />
              </div>

              <NowPlayingBar />
            </div>
          </motion.div>

          {/* 右侧：收藏歌单 */}
          <div className="lg:w-7/12 w-full">
            <div className="flex items-center gap-2 mb-6">
              <ListMusic className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-gray-700">收藏歌单</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {playlists.map((pl, i) => (
                <PlaylistCard
                  key={pl.name}
                  playlist={pl}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
