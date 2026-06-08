"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { OrbitSystem, OrbitConfig } from "@/components/ui/orbit-system";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

const displayFontClassName = "font-[var(--font-display)]";
const typewriterNames = ["钟政燊", "JensenZhong"];

const ChatGPTIcon = () => (
  <div className="w-full h-full rounded-full bg-[#74aa9c] flex items-center justify-center shadow-sm">
    <div className="text-white font-bold text-xs">GPT</div>
  </div>
);

const GeminiIcon = () => (
  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4E85FF] via-[#E4A5FF] to-[#FF8C76] flex items-center justify-center shadow-sm">
    <div className="text-white font-bold text-xs">AI</div>
  </div>
);

function TypewriterName() {
  const [nameIndex, setNameIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(typewriterNames[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentName = typewriterNames[nameIndex];
    const isComplete = characterCount === currentName.length;
    const isEmpty = characterCount === 0;
    const delay = deleting ? 70 : isComplete ? 1200 : 110;

    const timer = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setNameIndex((index) => (index + 1) % typewriterNames.length);
        return;
      }

      setCharacterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [characterCount, deleting, nameIndex]);

  const typedName = typewriterNames[nameIndex].slice(0, characterCount);

  return (
    <span className="inline-flex min-h-[0.9em] w-full min-w-0 items-center justify-center md:min-w-[390px]">
      <span className="text-[clamp(40px,12vw,60px)] max-md:portrait:text-[clamp(32px,10vw,44px)] md:text-[60px]">
        {typedName || "\u00A0"}
      </span>
    </span>
  );
}

export function Hero() {
  const [scale, setScale] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setScale(0.5);
      else if (width < 1024) setScale(0.8);
      else setScale(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const orbits: OrbitConfig[] = [
    {
      radiusX: 340 * scale,
      radiusY: 170 * scale,
      itemSize: 56,
      duration: 8,
      icons: [
        <div key="chatgpt" className="flex items-center justify-center w-14 h-14"><ChatGPTIcon /></div>,
        <div key="gemini" className="flex items-center justify-center w-14 h-14"><GeminiIcon /></div>,
      ]
    },
    {
      radiusX: 500 * scale,
      radiusY: 260 * scale,
      itemSize: 176,
      duration: 10,
      reverse: true,
      icons: [
        <div key="social-avatar" className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white">
          <Image
            src="/images/social_photo.webp"
            alt="Avatar"
            fill
            className="object-cover"
            priority
            sizes="176px"
          />
        </div>,
        <div key="chrome" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-xl">🌐</div>
      ]
    }
  ];

  const roleCopy = {
    zh: [
      "中国共产党员",
      "广州大学优秀学生",
      "广州大学管理学院十佳学生",
      "工程管理专业学生",
      "Vibe Coding 爱好者",
      "内容创作者",
      "十五运会志愿者",
    ],
    en: [
      "Member of the Communist Party of China",
      "Outstanding Student at Guangzhou University",
      "Top 10 Student, School of Management, Guangzhou University",
      "Engineering Management Student",
      "Vibe Coding Enthusiast",
      "Content Creator",
      "Volunteer for the 15th National Games",
    ],
  };

  const roles = roleCopy[language];
  const heroLabels = {
    zh: {
      name: "我的名字是:",
      role: "我是:",
    },
    en: {
      name: "My name is:",
      role: "I'm a:",
    },
  };

  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden font-sans pt-12 md:overflow-visible">
      <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto px-4 -mt-32 max-md:portrait:-mt-24">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <OrbitSystem orbits={orbits} />
        </div>

        <CardContainer containerClassName="relative z-10 inter-var w-[min(450px,calc(100vw-2rem))] scale-[0.93] max-md:portrait:w-[min(360px,calc(100vw-2.5rem))] max-md:portrait:scale-[0.82] md:w-[450px]">
          <CardBody className="relative group/card h-auto w-full rounded-[20px] border border-white/40 bg-white/70 px-7 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 dark:hover:shadow-2xl max-md:portrait:rounded-[16px] max-md:portrait:px-5 max-md:portrait:py-6 min-[390px]:px-9 md:w-[450px]">

            {/* 左下角圆球 */}
            <CardItem translateZ="100" className="absolute -bottom-8 -left-8 z-20 pointer-events-none max-md:portrait:-bottom-5 max-md:portrait:-left-5">
              <div className="w-24 h-24 rounded-full bg-[#ff9f43] shadow-[0_20px_40px_rgba(255,159,67,0.6)] max-md:portrait:h-16 max-md:portrait:w-16" />
            </CardItem>

            <div className="relative z-10 flex h-full flex-col">

              {/* 名字区域 */}
              <div className="w-full mb-2">
                <CardItem translateZ="50" className="text-[18px] font-extrabold text-slate-400 tracking-tight mb-1 uppercase max-md:portrait:text-[14px]">
                  {heroLabels[language].name}
                </CardItem>

                {/* 修改点：
                    1. translateZ="200"：大幅增加 Z 轴高度。当没有阴影时，高度带来的视差移动（Parallax）是体现“浮空感”的唯一方式。200 会让它比小球移动得更明显。
                    2. 移除了 drop-shadow 类：让字体看起来干净、纯粹。
                */}
                <CardItem translateZ="200" className="w-full">
                  <h1 className={cn("mt-5 text-center font-extrabold leading-[0.85] tracking-tighter text-[#ff9f43] max-md:portrait:mt-3 min-[390px]:-ml-4", displayFontClassName)}>
                    <TypewriterName />
                  </h1>
                </CardItem>
              </div>

              {/* 分割线 */}
              <CardItem translateZ="80" className="w-full pt-2 pb-5 flex justify-center max-md:portrait:pb-3 max-md:portrait:pt-1">
                <div className="w-[min(100%,360px)] h-1.5 bg-slate-900 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] max-md:portrait:h-1" />
              </CardItem>

              {/* 列表区域 */}
              <div className="w-full">
                <CardItem translateZ="60" className="text-[18px] font-extrabold text-slate-400 tracking-tight mb-4 uppercase max-md:portrait:mb-3 max-md:portrait:text-[14px]">
                  {heroLabels[language].role}
                </CardItem>

                <div className="flex flex-col items-end gap-1 w-full font-['Inter']">
                  {roles.map((role, index) => {
                    const isHovered = hoveredIndex === index;
                    const isAnyHovered = hoveredIndex !== null;

                    return (
                      <div
                        key={index}
                        className="w-full flex justify-end"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <CardItem
                          as="div"
                          // 列表选中时也给予较高的层级，产生浮起感
                          translateZ={isHovered ? 150 : (50 + index * 10)}
                          className={`
                            cursor-default transition-all duration-300 ease-out origin-right
                            text-right text-[24px] font-bold tracking-tight leading-snug max-md:portrait:text-[19px] max-md:portrait:leading-tight
                            ${language === "en" ? "text-[20px] leading-tight max-md:portrait:text-[16px]" : ""}
                            ${isHovered
                              ? "text-[#ff9f43] scale-110 z-50" // 选中：去掉了 drop-shadow，依靠 scale 和颜色
                              : isAnyHovered
                                ? "text-slate-300 blur-[0.5px] scale-95"
                                : "text-slate-900"
                            }
                          `}
                        >
                          {role}
                        </CardItem>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </CardBody>
        </CardContainer>

      </div>
    </section>
  );
}
