import { Hero } from "@/components/hero";
import { Code } from "@/components/code";
import { Portfolio } from "@/components/portfolio";
import { Reading } from "@/components/reading";
import { Experience, Hobbies } from "@/components/personal-sections";
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
        <Experience />
        <Hobbies />
        <Footer />
      </div>
    </main>
  );
}
