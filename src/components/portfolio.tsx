import {
  Calculator,
  Cuboid,
  FileSpreadsheet,
  Ruler,
} from "lucide-react";
import { LanyardBadge } from "@/components/lanyard-badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FileSpreadsheet,
    name: "房地产投资分析",
    description: "结合现金流、成本收益与市场判断，训练从数据到投资决策的分析框架。",
    href: "/images/management/real-estate.png",
    cta: "查看详情",
    className: "col-span-3 lg:col-span-1",
    imageBackground: {
      src: "/images/management/real-estate.png",
      alt: "房地产投资分析作品预览",
    },
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-lime-50 opacity-50 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
      </div>
    ),
  },
  {
    Icon: Cuboid,
    name: "BIM技术应用",
    description: "围绕Revit建模、BIM协同表达与工程信息整合，持续沉淀可复用的数字建造能力。",
    href: "/images/management/bim-hover.png",
    cta: "查看详情",
    className: "col-span-3 lg:col-span-2",
    imageBackground: {
      src: "/images/management/bim-hover.png",
      alt: "BIM技术应用作品预览",
    },
    background: (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 opacity-50 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        <div className="h-24 w-24 rounded-full bg-cyan-100 blur-2xl" />
      </div>
    ),
  },
  {
    Icon: Calculator,
    name: "工程造价",
    description: "熟悉土建与钢筋算量流程，关注清单计价、材料成本与施工方案之间的联动。",
    href: "/images/management/cost.jpg",
    cta: "查看详情",
    className: "col-span-3 lg:col-span-2",
    imageBackground: {
      src: "/images/management/cost.jpg",
      alt: "工程造价作品预览",
    },
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-50 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
      </div>
    ),
  },
  {
    Icon: Ruler,
    name: "工程测量",
    description: "以测量实习和工程现场认知为基础，理解空间数据、放线复核与施工控制的关系。",
    className: "col-span-3 lg:col-span-1",
    href: "/images/management/survey.jpg",
    cta: "查看详情",
    imageBackground: {
      src: "/images/management/survey.jpg",
      alt: "工程测量作品预览",
    },
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-slate-100 opacity-50 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-rose-100 blur-2xl" />
      </div>
    ),
  },
];

export function Portfolio() {
  return (
    <section id="management" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          <div className="lg:w-1/3">
            <LanyardBadge />
          </div>

          <div className="lg:w-2/3">
            <BentoGrid>
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
