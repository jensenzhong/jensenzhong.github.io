"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * 全局滚动跟随光晕
 *
 * 三个大面积模糊渐变球体以 fixed 定位跟随视口，
 * 颜色随滚动进度平滑过渡，匹配各 section 的主题色。
 */
export function ScrollGlow() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  // ── 主光球 (大) ──
  const y1 = useTransform(smooth, [0, 1], ["-5%", "70%"]);
  const x1 = useTransform(
    smooth,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["45%", "0%", "50%", "5%", "50%", "25%"]
  );
  const bg1 = useTransform(
    smooth,
    [0, 0.12, 0.28, 0.48, 0.68, 0.85, 1],
    [
      "rgba(255, 159, 67, 0.22)", // Hero — 橙
      "rgba(168, 85, 247, 0.18)", // Code — 紫
      "rgba(99, 102, 241, 0.15)", // Portfolio — 靛蓝
      "rgba(245, 158, 11, 0.18)", // Reading — 琥珀
      "rgba(99, 102, 241, 0.20)", // Music — 靛蓝
      "rgba(239, 68, 68, 0.16)",  // Movies — 红
      "rgba(107, 114, 128, 0.10)" // Footer — 灰
    ]
  );

  // ── 副光球 (中) ──
  const y2 = useTransform(smooth, [0, 1], ["10%", "80%"]);
  const x2 = useTransform(
    smooth,
    [0, 0.3, 0.6, 1],
    ["5%", "55%", "10%", "50%"]
  );
  const bg2 = useTransform(
    smooth,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(168, 85, 247, 0.14)",
      "rgba(99, 102, 241, 0.16)",
      "rgba(245, 158, 11, 0.14)",
      "rgba(99, 102, 241, 0.15)",
      "rgba(239, 68, 68, 0.12)"
    ]
  );

  // ── 第三光球 (小 · 补充层次) ──
  const y3 = useTransform(smooth, [0, 1], ["30%", "90%"]);
  const x3 = useTransform(
    smooth,
    [0, 0.4, 0.7, 1],
    ["70%", "20%", "65%", "40%"]
  );
  const bg3 = useTransform(
    smooth,
    [0, 0.3, 0.6, 1],
    [
      "rgba(255, 159, 67, 0.10)",
      "rgba(168, 85, 247, 0.12)",
      "rgba(245, 158, 11, 0.10)",
      "rgba(99, 102, 241, 0.12)"
    ]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[650px] h-[650px] md:w-[850px] md:h-[850px] rounded-full blur-[160px] transform-gpu"
        style={{ top: y1, left: x1, backgroundColor: bg1 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[130px] transform-gpu"
        style={{ top: y2, left: x2, backgroundColor: bg2 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full blur-[120px] transform-gpu"
        style={{ top: y3, left: x3, backgroundColor: bg3 }}
      />
    </div>
  );
}
