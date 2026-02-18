"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface HoverEffectItem {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  icon?: string;
}

export function HoverEffect({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => {
        const isLink = !!item.link && item.link !== "#";
        const Wrapper = isLink ? "a" : "div";
        const wrapperProps = isLink
          ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={idx}
            {...wrapperProps}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-amber-50/70 block rounded-2xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <HoverCard>
              <div className="flex items-start justify-between">
                {item.icon && (
                  <span className="text-3xl block select-none">{item.icon}</span>
                )}
                <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </div>
              <HoverCardTitle>{item.title}</HoverCardTitle>
              <HoverCardDescription>{item.description}</HoverCardDescription>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 font-medium border border-gray-100 group-hover:bg-white group-hover:border-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </HoverCard>
          </Wrapper>
        );
      })}
    </div>
  );
}

function HoverCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:border-gray-200/80 group-hover:shadow-md relative z-20 transition-all duration-200",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

function HoverCardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      className={cn(
        "text-gray-800 font-bold tracking-tight mt-3 group-hover:text-[#ff9f43] transition-colors duration-200",
        className
      )}
    >
      {children}
    </h4>
  );
}

function HoverCardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "mt-2 text-gray-500 leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
}
