"use client";

import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import { aiDescription } from "@/data/ai-capabilities";
import { AIBentoGrid } from "@/components/ai-bento";

export function Code() {
  return (
    <section id="ai" className="relative py-24 z-30 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-purple-50">
              <Brain className="w-6 h-6 text-[#6D28D9]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              {aiDescription.title}
            </h2>
          </div>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            {aiDescription.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <AIBentoGrid />
      </div>
    </section>
  );
}
