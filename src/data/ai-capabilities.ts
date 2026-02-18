import { ReactNode } from "react";

export interface AICapability {
  title: string;
  desc: string;
  icon: ReactNode | null;
}

export interface TechSkill {
  title: string;
  color: string;
  delay: number;
}

export const aiCapabilities: Omit<AICapability, "icon">[] = [
  { title: "LLM Application", desc: "Building RAG systems and Agentic workflows" },
  { title: "AI Research Notes", desc: "Deep learning fundamentals and paper reviews" },
];

export const techSkills: TechSkill[] = [
  { title: "Python / PyTorch", color: "bg-purple-400", delay: 0.1 },
  { title: "Project Management", color: "bg-blue-400", delay: 0.3 },
  { title: "Data Analysis", color: "bg-emerald-400", delay: 0.4 },
];

export const aiDescription = {
  title: "AI Capabilities",
  subtitle: "Exploring the frontiers of Artificial Intelligence, from LLMs to Computer Vision.",
  highlight: "I focus on building intelligent systems that solve real-world problems.",
  statement: "I combine technical skills with management principles to deliver efficient and scalable solutions.",
};
