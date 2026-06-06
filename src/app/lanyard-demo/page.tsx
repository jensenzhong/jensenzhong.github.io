"use client";

import Lanyard from "@/components/lanyard-3d/lanyard";

export default function LanyardDemoPage() {
  return (
    <main className="min-h-[calc(100vh-72px)] overflow-hidden bg-[#030403] text-white">
      <div className="relative min-h-[calc(100vh-72px)]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,61,52,0.34),transparent_34rem)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 text-xs uppercase tracking-[0.24em] text-white/45 sm:px-8">
          <span>Lanyard Physics Demo</span>
          <span>Drag the card</span>
        </div>
        <div className="relative z-10">
          <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={20} />
        </div>
      </div>
    </main>
  );
}
