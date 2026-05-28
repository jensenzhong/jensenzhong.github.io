"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

type DragBounds = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export function DraggableCardBody({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const velocityX = useVelocity(dragX);
  const velocityY = useVelocity(dragY);
  const [hasFlownAway, setHasFlownAway] = useState(false);
  const [constraints, setConstraints] = useState<DragBounds>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const springConfig = {
    stiffness: 110,
    damping: 19,
    mass: 0.45,
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-20, 20]), springConfig);
  const opacity = useSpring(useTransform(dragX, [-420, 0, 420], [0.82, 1, 0.82]), springConfig);
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.18, 0, 0.18]),
    springConfig,
  );

  useEffect(() => {
    const updateConstraints = () => {
      setConstraints({
        top: -window.innerHeight * 1.15,
        left: -window.innerWidth * 1.15,
        right: window.innerWidth * 1.15,
        bottom: window.innerHeight * 1.15,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;

    mouseX.set(event.clientX - (bounds.left + bounds.width / 2));
    mouseY.set(event.clientY - (bounds.top + bounds.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const flyAway = () => {
    if (hasFlownAway) return;

    setHasFlownAway(true);
    document.body.style.cursor = "default";
    mouseX.set(0);
    mouseY.set(0);

    const bounds = cardRef.current?.getBoundingClientRect();
    const centerX = bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2;
    const direction = centerX < window.innerWidth / 2 ? -1 : 1;
    const targetX = dragX.get() + direction * window.innerWidth * 0.95;
    const targetY = dragY.get() - window.innerHeight * 0.22;

    controls.start({
      rotateX: 0,
      rotateY: 0,
      scale: 0.96,
      transition: { duration: 0.18 },
    });

    animate(dragX, targetX, {
      type: "spring",
      stiffness: 38,
      damping: 18,
      mass: 1.05,
    });
    animate(dragY, targetY, {
      type: "spring",
      stiffness: 38,
      damping: 18,
      mass: 1.05,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragMomentum
      dragElastic={0.28}
      dragConstraints={constraints}
      onDragStart={() => {
        if (hasFlownAway) return;
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={() => {
        if (hasFlownAway) return;

        document.body.style.cursor = "default";
        mouseX.set(0);
        mouseY.set(0);

        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });

        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();
        const throwX = Math.max(-520, Math.min(520, currentVelocityX * 0.26));
        const throwY = Math.max(-420, Math.min(420, currentVelocityY * 0.26));

        animate(dragX, dragX.get() + throwX, {
          type: "spring",
          stiffness: 42,
          damping: 17,
          mass: 0.95,
        });
        animate(dragY, dragY.get() + throwY, {
          type: "spring",
          stiffness: 42,
          damping: 17,
          mass: 0.95,
        });
      }}
      style={{
        x: dragX,
        y: dragY,
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 1.045 }}
      onTap={flyAway}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-0 overflow-hidden rounded-md bg-white p-5 shadow-2xl transform-3d",
        hasFlownAway && "pointer-events-none",
        className,
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
}

export function DraggableCardContainer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn("[perspective:3000px]", className)}>{children}</div>;
}
