import { ArrowUpRight, BarChart3, FileSpreadsheet, Kanban, Target } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: BarChart3,
    name: "System Analysis",
    description: "Comprehensive system design and requirements engineering for complex software projects.",
    href: "#",
    cta: "View Case Study",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] flex items-center justify-center opacity-50">
        <div className="w-24 h-24 bg-cyan-100 rounded-full blur-2xl"></div>
      </div>
    ),
  },
  {
    Icon: Target,
    name: "Product Roadmap",
    description: "Strategic planning and vision alignment. Translating business goals into actionable milestones.",
    href: "#",
    cta: "View Roadmap",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal-50 to-green-50 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] opacity-50">
         <div className="absolute right-10 top-10 w-32 h-32 bg-teal-100 rounded-full blur-3xl"></div>
      </div>
    ),
  },
  {
    Icon: FileSpreadsheet,
    name: "Risk Management",
    description: "Identifying, assessing, and mitigating project risks. Ensuring delivery reliability.",
    href: "#",
    cta: "View Analysis",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-slate-50 to-gray-100 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] opacity-50">
         <div className="absolute left-10 bottom-10 w-40 h-40 bg-slate-200 rounded-full blur-3xl"></div>
      </div>
    ),
  },
  {
    Icon: Kanban,
    name: "Agile Transformation",
    description: "Leading teams through Agile adoption. Scrum mastery and workflow optimization.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "View Process",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] opacity-50">
         <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl"></div>
      </div>
    ),
  },
];

export function Portfolio() {
    return (
        <section id="management" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Sidebar */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-gray-700">Engineering Management Portfolio</h2>
                        
                        {/* Profile Card */}
                        <div className="bg-[#2d333b] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shrink-0">
                             <div className="flex items-center gap-4 mb-4">
                                 <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl text-white">
                                     JZ
                                 </div>
                                 <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                                     Jenson Zhong <ArrowUpRight className="w-5 h-5" />
                                 </h2>
                             </div>
                             <div className="flex gap-6 text-sm font-medium text-gray-300">
                                 <span>12 Projects</span>
                                 <span>5 Years Exp</span>
                             </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm flex-1">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                I treat project management as an art. Through projects, I study team dynamics, resource allocation, risk management, and product delivery.
                            </p>
                            <div className="mb-4 font-bold text-gray-700 text-sm">Key Competencies:</div>
                            <div className="flex flex-wrap gap-2">
                                {["Agile/Scrum", "System Design", "Risk Assessment", "Stakeholder Mgmt", "JIRA/Confluence", "Data Analysis", "Strategic Planning"].map(tag => (
                                    <span key={tag} className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Bento Grid */}
                    <div className="lg:w-2/3">
                         <BentoGrid>
                            {features.map((feature, idx) => (
                                <BentoCard key={idx} {...feature} />
                            ))}
                         </BentoGrid>
                    </div>
                </div>
            </div>
        </section>
    );
}
