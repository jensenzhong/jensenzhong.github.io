"use client";

import { motion } from "framer-motion";

/**
 * 联邦学习可视化组件
 *
 * 中心云模型 + 周围 5 个 Agent 节点 + SVG 连线 + 数据包流动动画
 *
 * Bug fix: linearGradient 使用 gradientUnits="userSpaceOnUse"，
 * 避免垂直线 (x1=x2) 时 objectBoundingBox 退化导致连线不可见。
 */

const AGENTS = [
  { cx: 50, cy: 12 },
  { cx: 88, cy: 38 },
  { cx: 80, cy: 78 },
  { cx: 20, cy: 78 },
  { cx: 12, cy: 38 },
];

const CENTER = { cx: 50, cy: 48 };

export function FederatedLearning() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full max-w-[280px] max-h-[280px]"
        fill="none"
      >
        <defs>
          {/*
           * 关键修复：gradientUnits="userSpaceOnUse"
           * 坐标使用 SVG 视口绝对坐标而非元素包围盒百分比，
           * 从而避免垂直/水平线包围盒退化问题。
           */}
          <linearGradient
            id="fl-lineGrad"
            gradientUnits="userSpaceOnUse"
            x1="12"
            y1="12"
            x2="88"
            y2="78"
          >
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="fl-packetGrad">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="100%" stopColor="#6D28D9" />
          </radialGradient>
          <radialGradient id="fl-cloudGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 中心光晕 */}
        <circle cx={CENTER.cx} cy={CENTER.cy} r="18" fill="url(#fl-cloudGlow)" />

        {/* 连线 + 数据包（5 条） */}
        {AGENTS.map((agent, i) => (
          <g key={i}>
            <line
              x1={agent.cx}
              y1={agent.cy}
              x2={CENTER.cx}
              y2={CENTER.cy}
              stroke="url(#fl-lineGrad)"
              strokeWidth="0.5"
            />
            <DataPacket
              fromX={agent.cx}
              fromY={agent.cy}
              toX={CENTER.cx}
              toY={CENTER.cy}
              delay={i * 0.6}
            />
          </g>
        ))}

        {/* 中心云模型图标 */}
        <g transform={`translate(${CENTER.cx - 7}, ${CENTER.cy - 6})`}>
          <path
            d="M3.5 10.5C1.5 10.5 0 9 0 7.2c0-1.5 1-2.8 2.4-3.2C2.8 1.7 4.6 0 6.8 0c2 0 3.6 1.3 4.2 3 .3-.1.6-.1.9-.1 1.8 0 3.2 1.4 3.2 3.1 0 1.7-1.4 3.1-3.2 3.1H3.5z"
            fill="#6D28D9"
            fillOpacity="0.85"
          />
          <path
            d="M5.5 8.5V5l-1.5 1.5M5.5 5l1.5 1.5"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M8.5 4V7.5l1.5-1.5M8.5 7.5l-1.5-1.5"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Agent 节点（5 个） */}
        {AGENTS.map((agent, i) => (
          <g key={`agent-${i}`}>
            <motion.circle
              cx={agent.cx}
              cy={agent.cy}
              r="4"
              fill="none"
              stroke="#6D28D9"
              strokeWidth="0.3"
              strokeOpacity="0.3"
              animate={{ r: [3.5, 5.5, 3.5], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
            <circle
              cx={agent.cx}
              cy={agent.cy}
              r="3"
              fill="white"
              stroke="#6D28D9"
              strokeWidth="0.6"
            />
            <circle
              cx={agent.cx}
              cy={agent.cy}
              r="1.2"
              fill="#6D28D9"
              fillOpacity="0.6"
            />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span className="text-[10px] text-slate-400 tracking-widest uppercase">
          Parameter Aggregation
        </span>
      </div>
    </div>
  );
}

/** 沿直线运动的数据包，直接动画 cx/cy */
function DataPacket({
  fromX,
  fromY,
  toX,
  toY,
  delay,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
}) {
  return (
    <motion.circle
      r="1.2"
      fill="url(#fl-packetGrad)"
      animate={{
        cx: [fromX, toX],
        cy: [fromY, toY],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
