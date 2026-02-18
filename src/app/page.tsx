import { Hero } from "@/components/hero";
import { Code } from "@/components/code";
import { Portfolio } from "@/components/portfolio";
import { Reading } from "@/components/reading";
import { Music } from "@/components/music";
import { Movies } from "@/components/movies";
import { Footer } from "@/components/footer";
import { ScrollGlow } from "@/components/scroll-glow";

export default function Home() {
  return (
    <main className="bg-[#fafafa]">
      <ScrollGlow />
      <div className="relative z-10">
        <Hero />
        <Code />
        <Portfolio />
        <Reading />
        <Music />
        <Movies />
        <Footer />
      </div>
    </main>
  );
}
