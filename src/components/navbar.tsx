"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { LanguageToggle } from "@/components/language-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "AI能力", href: "#ai" },
  { label: "工程专业", href: "#management" },
  { label: "荣誉奖项", href: "#awards" },
  { label: "志愿服务", href: "#experience" },
  { label: "生活碎片", href: "#hobbies" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/jensenzhong",
    Icon: Github,
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/404687871",
    Icon: BilibiliIcon,
  },
  {
    name: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/5d37140a0000000012038e9f",
    Icon: XiaohongshuIcon,
  },
];

function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386z" />
    </svg>
  );
}

function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5zm4.2 4.4h2.1l-.5 2.8h2.1l.5-2.8h2.1l-.5 2.8H17v1.8h-2.2l-.4 2.4H17v1.8h-2.8l-.5 2.8h-2.1l.5-2.8h-2.1l-.5 2.8H7.4l.5-2.8H6v-1.8h2.1l.4-2.4H6V9.2h2.7l.5-2.8zm1.7 4.6l-.4 2.4h2.1l.4-2.4h-2.1z" />
    </svg>
  );
}

function LiquidGlassNav({
  activeHref,
  hoverHref,
  onHover,
  onNavigate,
}: {
  activeHref: string;
  hoverHref: string | null;
  onHover: (href: string | null) => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const selectedHref = hoverHref ?? activeHref;

  return (
    <div
      className="relative hidden rounded-full border border-white/70 bg-white/35 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_34px_-28px_rgba(15,23,42,0.8)] backdrop-blur-2xl md:block"
      onMouseLeave={() => onHover(null)}
    >
      <ul className="relative flex items-center gap-1">
        {navItems.map((item) => {
          const selected = selectedHref === item.href;

          return (
            <li key={item.href} className="relative">
              {selected && (
                <motion.span
                  layoutId="liquid-nav-pill"
                  className="absolute -inset-1 overflow-hidden rounded-full border border-white/85 bg-slate-900/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-10px_22px_rgba(255,255,255,0.28),0_18px_36px_-24px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
                  transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
                >
                  <span className="absolute inset-x-3 bottom-1.5 h-4 rounded-full bg-[#ff9f43]/45 blur-md" />
                  <span className="absolute inset-x-4 top-1 h-px rounded-full bg-white/95" />
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.16)_46%,rgba(255,159,67,0.22))]" />
                </motion.span>
              )}
              <a
                href={item.href}
                onMouseEnter={() => onHover(item.href)}
                onFocus={() => onHover(item.href)}
                onBlur={() => onHover(null)}
                onClick={(event) => onNavigate(event, item.href)}
                className={cn(
                  "relative z-10 block rounded-full px-5 py-2 text-sm font-black tracking-tight transition-[color,transform,text-shadow] duration-200",
                  selected
                    ? "scale-105 text-[#ff9f43] [text-shadow:0_1px_12px_rgba(255,159,67,0.45)]"
                    : "text-[#ff9f43]/70 hover:scale-105 hover:text-[#ff9f43]",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(navItems[0].href);
  const [hoverHref, setHoverHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveHref(href);
    setHoverHref(null);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3"
      role="navigation"
      aria-label="Main navigation"
    >
      <motion.div
        className="pointer-events-auto w-full"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        style={{
          maxWidth: scrolled ? "62rem" : "70rem",
          paddingTop: scrolled ? 10 : 12,
          transition: `max-width 0.55s ${EASE}, padding-top 0.55s ${EASE}`,
        }}
      >
        <div
          className="relative overflow-hidden border border-white/65 bg-white/50 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.72)] backdrop-blur-2xl"
          style={{
            borderRadius: scrolled ? 24 : 18,
            transition: `border-radius 0.55s ${EASE}, box-shadow 0.55s ${EASE}`,
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-white/95" />
          <div className="relative z-10 grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-5">
            <div className="flex items-center">
              <Link
                href="/"
                className="group relative text-[15px] font-black tracking-tight text-[#f2a85b]"
                aria-label="Home"
              >
                <span className="relative z-10 transition-colors duration-200 group-hover:text-[#c96a10]">
                  Jenson
                </span>
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-[#ff9f43] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </div>

            <LiquidGlassNav
              activeHref={activeHref}
              hoverHref={hoverHref}
              onHover={setHoverHref}
              onNavigate={scrollToSection}
            />

            <div className="flex items-center justify-end gap-1.5" role="list" aria-label="Social media links">
              <LanguageToggle />
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group/icon relative inline-flex h-8 w-8 items-center justify-center rounded-full text-[#f2a85b] transition-all duration-200 hover:bg-[#ff9f43]/10 hover:text-[#c96a10] active:scale-90"
                  aria-label={link.name}
                  title={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.Icon className="h-4 w-4 transition-transform duration-200 group-hover/icon:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
