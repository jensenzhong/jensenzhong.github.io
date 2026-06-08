"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import styles from "./flowing-menu.module.css";

export type FlowingMenuItem = {
  link: string;
  text: string;
  image: string;
};

type FlowingMenuProps = {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

type MenuItemProps = FlowingMenuItem &
  Required<Pick<FlowingMenuProps, "speed" | "textColor" | "marqueeBgColor" | "marqueeTextColor" | "borderColor">>;

function distMetric(x: number, y: number, x2: number, y2: number) {
  const xDiff = x - x2;
  const yDiff = y - y2;

  return xDiff * xDiff + yDiff * yDiff;
}

function findClosestEdge(mouseX: number, mouseY: number, width: number, height: number) {
  const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
  const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);

  return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [repetitions, setRepetitions] = useState(4);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(`.${styles.marqueePart}`);
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      const needed = Math.ceil(window.innerWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);

    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    return () => mediaQuery.removeEventListener("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(`.${styles.marqueePart}`);
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      animationRef.current?.kill();
      if (isReducedMotion) {
        gsap.set(marqueeInnerRef.current, { x: 0 });
        return;
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    }, 50);

    return () => {
      window.clearTimeout(timer);
      animationRef.current?.kill();
      hoverTimelineRef.current?.kill();
    };
  }, [text, image, repetitions, speed, isReducedMotion]);

  const createHoverTimeline = () => {
    hoverTimelineRef.current?.kill();
    hoverTimelineRef.current = gsap.timeline({
      defaults: {
        duration: isReducedMotion ? 0 : 0.6,
        ease: "expo.out",
        overwrite: "auto",
      },
    });

    return hoverTimelineRef.current;
  };

  const showMarquee = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    const fromMarquee = edge === "top" ? "-101%" : "101%";
    const fromInner = edge === "top" ? "101%" : "-101%";

    createHoverTimeline()
      .set(marqueeRef.current, { y: fromMarquee }, 0)
      .set(marqueeInnerRef.current, { y: fromInner }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const hideMarquee = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    createHoverTimeline()
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div className={styles.menuItem} ref={itemRef} style={{ borderColor }}>
      <a
        className={styles.menuItemLink}
        href={link}
        onMouseEnter={showMarquee}
        onMouseLeave={hideMarquee}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className={styles.marquee} ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className={styles.marqueeInnerWrap}>
          <div className={styles.marqueeInner} ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, idx) => (
              <div className={styles.marqueePart} key={`${text}-${idx}`} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className={styles.marqueeImg} style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff",
}: FlowingMenuProps) {
  return (
    <div className={styles.menuWrap} style={{ backgroundColor: bgColor }}>
      <nav className={styles.menu} aria-label="Flowing portfolio menu">
        {items.map((item) => (
          <MenuItem
            key={item.text}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

export default FlowingMenu;
