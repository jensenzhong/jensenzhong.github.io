"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const experiences = [
  {
    title: "十五运会志愿者",
    role: "大型赛会服务 / 秩序引导 / 热情接待",
    description:
      "我参与了 2025 年第十五届全国运动会开幕式志愿服务，在门洞外站岗，用最饱满的热情欢迎全国各地前来观演的观众，指引他们有序入场、观演愉快，并获得广州大学优秀志愿者称号。",
    image: "/images/experiences/national-games-volunteer.jpg",
  },
  {
    title: "古浪古韵风华队",
    role: "队长经历 / 乡村调研 / 农产品包装设计",
    description:
      "大一时我第一次担任队长，组织同学参与大型社会实践活动，帮助甘肃省古浪县农产品设计包装，调研当地电商部门、面条等工厂，团队获得学院优秀社会实践调研团队。",
    image: "/images/experiences/gulang-team.png",
  },
  {
    title: "小红船实践队",
    role: "红色宣讲 / 小学课堂 / 微党课设计",
    description:
      "我和队员前往华阳小学，为小学生们开展四次微党课，内容包括中共一大、小兵张嘎、小英雄雨来、红领巾的由来，让红色种子播撒在他们的心中。",
    image: "/images/experiences/xiaohong-practice.jpg",
  },
  {
    title: "岭南兴潮突击队",
    role: "三下乡实践 / 乡镇调研 / 报告主笔",
    description:
      "2025 年暑假，我参与三下乡社会实践，助力清远阳山县杜步镇发展，深入调研当地风景区、生态农业等资源，提出“一轴两翼三激活”融合方案并被当地部门采用。我主导调研报告撰写，获得学校优秀调研报告奖，调研成果被当地新闻报道。",
    image: "/images/experiences/lingnan-commando.jpg",
  },
];

const lifePhotos = [
  {
    title: "爱弹吉他",
    image: "/images/life/life-01.webp",
    className: "absolute left-[20%] top-14 z-20 rotate-[-8deg]",
  },
  {
    title: "爱踢足球",
    image: "/images/life/life-02.webp",
    className: "absolute left-[31%] top-32 z-40 rotate-[5deg]",
  },
  {
    title: "测量实习",
    image: "/images/life/life-03.webp",
    className: "absolute left-[42%] top-8 z-50 rotate-[-3deg]",
  },
  {
    title: "大一排球赛",
    image: "/images/life/life-04.webp",
    className: "absolute left-[22%] top-72 z-30 rotate-[8deg]",
  },
  {
    title: "逛逛江门",
    image: "/images/life/life-05.webp",
    className: "absolute right-[18%] top-36 z-30 rotate-[-6deg]",
  },
  {
    title: "哈尔滨路演",
    image: "/images/life/life-06.webp",
    className: "absolute left-[46%] top-80 z-20 rotate-[3deg]",
  },
  {
    title: "十五运会",
    image: "/images/life/life-07.webp",
    className: "absolute left-[58%] top-16 z-20 rotate-[10deg]",
  },
  {
    title: "玩玩脑机",
    image: "/images/life/life-08.webp",
    className: "absolute left-[34%] top-[25rem] z-10 rotate-[-10deg]",
  },
];

export function Experience() {
  const [active, setActive] = useState(0);
  const activeExperience = experiences[active];

  const showPrevious = () => {
    setActive((current) => (current - 1 + experiences.length) % experiences.length);
  };

  const showNext = () => {
    setActive((current) => (current + 1) % experiences.length);
  };

  return (
    <section id="experience" className="relative scroll-mt-32 overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-slate-400">
            Volunteer Service
          </p>
          <h2 className="font-serif text-5xl tracking-tight text-[#1d1a18] md:text-7xl">
            志愿服务
          </h2>
        </div>

        <div className="origin-top scale-[0.92]">
          <div className="grid min-h-[560px] gap-20 lg:grid-cols-[0.95fr_1fr] lg:items-center">
            <div className="relative mx-auto aspect-[1.06/1] w-full max-w-[520px]">
              <AnimatePresence initial={false}>
                {experiences.map((item, index) => {
                  const offset = (index - active + experiences.length) % experiences.length;
                  const isActive = index === active;
                  const isNext = offset === 1;
                  const isPrevious = offset === experiences.length - 1;

                  return (
                    <motion.button
                      aria-label={`切换到${item.title}`}
                      className="absolute inset-0 overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_34px_80px_-55px_rgba(15,23,42,0.7)]"
                      key={item.title}
                      type="button"
                      initial={false}
                      animate={{
                        opacity: isActive || isNext || isPrevious ? 1 : 0,
                        rotate: isActive ? 0 : isNext ? 4 : -4,
                        scale: isActive ? 1 : 0.92,
                        x: isActive ? 0 : isNext ? 24 : -24,
                        y: isActive ? 0 : 18,
                        zIndex: isActive ? 30 : isNext ? 20 : 10,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActive(index)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 520px, 90vw"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="relative flex min-h-[420px] flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeExperience.title}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.36, ease: "easeOut" }}
                  className="max-w-xl"
                >
                  <h3 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                    {activeExperience.title}
                  </h3>
                  <p className="mt-2 text-base font-medium leading-relaxed text-slate-500 md:text-lg">
                    {activeExperience.role}
                  </p>
                  <p className="mt-12 text-xl font-normal leading-[1.85] text-slate-500 md:text-2xl">
                    {activeExperience.description}
                  </p>
                </motion.article>
              </AnimatePresence>

              <div className="mt-16 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="上一段经历"
                  onClick={showPrevious}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition hover:-translate-x-0.5 hover:bg-slate-950 hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="下一段经历"
                  onClick={showNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition hover:translate-x-0.5 hover:bg-slate-950 hover:text-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div className="ml-4 flex gap-2">
                  {experiences.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      aria-label={`切换到${item.title}`}
                      onClick={() => setActive(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === active ? "w-8 bg-slate-950" : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hobbies() {
  return (
    <section id="hobbies" className="relative scroll-mt-32 overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ff9f43]/12 px-4 py-2 text-sm font-black text-[#9a4d00]">
                <Sparkles className="h-4 w-4" />
                Life & Moments
              </div>
                  <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                    生活碎片
                  </h2>
                </div>
                <p className="max-w-xl text-lg leading-relaxed text-slate-500">
                  把生活里散落的片刻铺成可以拖开的卡片。挪开照片时，藏在后面的句子也会慢慢露出来。
                </p>
          </div>

          <DraggableCardContainer className="relative flex min-h-[720px] w-full items-center justify-center overflow-clip rounded-[8px] bg-[#fbfbfb] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] md:min-h-[760px]">
            <div className="absolute left-1/2 top-1/2 w-[86%] max-w-2xl -translate-x-1/2 -translate-y-[64%] text-center">
              <p className="text-balance text-3xl font-black leading-tight text-neutral-300 sm:text-5xl lg:text-6xl">
                Tomorrow is another day.
              </p>
              <p className="mt-4 text-base font-black text-neutral-300 sm:text-xl">
                Gone with the Wind · Margaret Mitchell
              </p>
            </div>

            {lifePhotos.map((photo, index) => (
              <DraggableCardBody
                key={photo.title}
                className={`hidden h-auto min-h-0 w-60 cursor-grab touch-none select-none rounded-md bg-white p-4 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.32)] active:cursor-grabbing sm:block lg:w-72 ${photo.className}`}
              >
                <div className="relative z-10 h-64 w-full overflow-hidden rounded-[3px] bg-neutral-100 lg:h-80">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(min-width: 1024px) 288px, 240px"
                    className="object-cover"
                    priority={index < 3}
                    draggable={false}
                  />
                </div>
                <h3 className="relative z-10 mt-4 text-center text-xl font-bold text-neutral-700">
                  {photo.title}
                </h3>
              </DraggableCardBody>
            ))}

            {lifePhotos.slice(0, 5).map((photo, index) => (
              <DraggableCardBody
                key={`mobile-${photo.title}`}
                className={`absolute h-auto min-h-0 w-44 cursor-grab touch-none select-none rounded-md bg-white p-2.5 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.32)] active:cursor-grabbing sm:hidden ${
                  [
                    "left-[12%] top-24 z-20 rotate-[-8deg]",
                    "left-[34%] top-36 z-40 rotate-[6deg]",
                    "left-[18%] top-60 z-30 rotate-[-3deg]",
                    "left-[44%] top-72 z-20 rotate-[8deg]",
                    "left-[28%] top-[25rem] z-10 rotate-[-6deg]",
                  ][index]
                }`}
              >
                <div className="relative z-10 h-52 w-full overflow-hidden rounded-[3px] bg-neutral-100">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="208px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <h3 className="relative z-10 mt-2.5 text-center text-base font-bold text-neutral-700">
                  {photo.title}
                </h3>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </div>
    </section>
  );
}
