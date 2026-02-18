"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface DynamicHaloProps {
  className?: string;
  size?: number;
  blur?: string;
  color?: string;
}

export function DynamicHalo({ className, size = 600, blur = "blur-3xl", color = "rgba(255,255,255,0.6)" }: DynamicHaloProps) {
  const { scrollY } = useScroll();
  // Parallax effect: moves slower than scroll to create depth
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const smoothY = useSpring(y, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{ y: smoothY }}
      className={cn(
        "pointer-events-none fixed z-0 flex items-center justify-center will-change-transform",
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn("rounded-full will-change-transform", blur)}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0.05) 60%, transparent 80%)`,
        }}
      />
    </motion.div>
  );
}
