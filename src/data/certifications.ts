
import { Brain, Database, ChartPie } from "lucide-react";
import { Certification } from "@/types/certification";

export const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    provider: "Stanford University / Coursera",
    date: "2023",
    link: "#",
    tags: ["Machine Learning", "Neural Networks", "AI"],
    icon: <Brain className="h-5 w-5" />,
    color: "#9b87f5"
  },
  {
    title: "Big Data Engineering",
    provider: "IBM",
    date: "2024", 
    link: "#",
    tags: ["Hadoop", "Spark", "NoSQL"],
    icon: <Database className="h-5 w-5" />,
    color: "#33C3F0"
  },
  {
    title: "Advanced Data Science",
    provider: "MIT",
    date: "2024",
    link: "#", 
    tags: ["Statistics", "ML", "Python"],
    icon: <ChartPie className="h-5 w-5" />,
    color: "#D946EF"
  }
];
