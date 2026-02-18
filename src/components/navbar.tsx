"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";

// ── 导航项 ──
const navItems = [
    { name: "AI", href: "#ai", icon: "🤖" },
    { name: "Management", href: "#management", icon: "📊" },
    { name: "Books", href: "#books", icon: "📚" },
    { name: "Music", href: "#music", icon: "🎵" },
    { name: "Movies", href: "#movies", icon: "🎬" },
];

// ── 社交链接 ──
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

// ── 自定义图标：Bilibili ──
function BilibiliIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386z" />
        </svg>
    );
}

// ── 自定义图标：小红书 ──
function XiaohongshuIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5zm4.2 4.4h2.1l-.5 2.8h2.1l.5-2.8h2.1l-.5 2.8H17v1.8h-2.2l-.4 2.4H17v1.8h-2.8l-.5 2.8h-2.1l.5-2.8h-2.1l-.5 2.8H7.4l.5-2.8H6v-1.8h2.1l.4-2.4H6V9.2h2.7l.5-2.8zm1.7 4.6l-.4 2.4h2.1l.4-2.4h-2.1z" />
        </svg>
    );
}

// ── CSS 过渡曲线 ──
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

// ── 主组件 ──
export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll(); // 初始化
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            className="fixed top-0 inset-x-0 z-50 pointer-events-none"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            role="navigation"
            aria-label="Main navigation"
        >
            {/* ── 变形容器：全宽 ↔ 居中收缩 ── */}
            <div
                className="mx-auto w-full pointer-events-auto"
                style={{
                    maxWidth: scrolled ? "56rem" : "100%",
                    paddingLeft: scrolled ? 12 : 0,
                    paddingRight: scrolled ? 12 : 0,
                    paddingTop: scrolled ? 10 : 0,
                    transition: `max-width 0.55s ${EASE}, padding 0.55s ${EASE}`,
                }}
            >
                <div className="relative">
                    {/* ── 背景层：纯色直角 → 毛玻璃圆角胶囊 ── */}
                    <div
                        className="absolute inset-0"
                        style={{
                            borderRadius: scrolled ? 16 : 0,
                            backgroundColor: scrolled
                                ? "rgba(255, 255, 255, 0.45)"
                                : "rgba(255, 255, 255, 0.35)",
                            boxShadow: scrolled
                                ? "0 4px 30px -4px rgba(0,0,0,0.10), 0 1.5px 4px -1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 0.5px rgba(0,0,0,0.04)"
                                : "0 1px 0 0 rgba(0,0,0,0.04)",
                            backdropFilter: "blur(20px) saturate(190%)",
                            WebkitBackdropFilter: "blur(20px) saturate(190%)",
                            transition: `border-radius 0.55s ${EASE}, background-color 0.55s ${EASE}, box-shadow 0.55s ${EASE}`,
                        }}
                    />

                    {/* ── 内容层：三列 Grid ── */}
                    <div className="relative z-10 h-14 px-5 grid grid-cols-[1fr_auto_1fr] items-center">
                        {/* 左侧：品牌 */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="group relative font-bold text-[15px] text-gray-800 tracking-tight"
                                aria-label="Home"
                            >
                                <span className="relative z-10 transition-colors duration-200 group-hover:text-gray-950">
                                    Jenson
                                </span>
                                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#ff9f43] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                            </Link>
                        </div>

                        {/* 中间：Dock 导航 */}
                        <Dock magnification={60} distance={100} className="bg-transparent border-0 p-0 h-10 gap-3">
                            {navItems.map((item) => (
                                <DockIcon
                                    key={item.name}
                                    size={38}
                                    magnification={65}
                                    className="bg-transparent hover:bg-white/40 transition-colors duration-200 rounded-xl"
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center w-full h-full px-1.5 whitespace-nowrap transition-colors duration-200"
                                        aria-label={`Navigate to ${item.name} section`}
                                    >
                                        <span className="text-[17px]" aria-hidden="true">{item.icon}</span>
                                    </a>
                                </DockIcon>
                            ))}
                        </Dock>

                        {/* 右侧：社交图标 */}
                        <div className="flex items-center justify-end gap-0.5" role="list" aria-label="Social media links">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="
                                        group/icon relative inline-flex items-center justify-center
                                        w-8 h-8 rounded-full
                                        text-gray-400
                                        hover:text-gray-800
                                        transition-all duration-250
                                        hover:bg-black/[0.04]
                                        active:scale-90
                                    "
                                    aria-label={link.name}
                                    title={link.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <link.Icon className="w-[16px] h-[16px] transition-transform duration-250 group-hover/icon:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
