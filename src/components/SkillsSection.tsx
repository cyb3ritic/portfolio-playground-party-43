
import { SectionHeader } from "./SectionHeader";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const SkillsSection = () => {
  const frontendSkills = [
    { name: "React", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Next.js", level: 80 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "GraphQL", level: 65 },
  ];

  const otherSkills = [
    { name: "UI/UX Design", level: 80 },
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Testing", level: 75 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <SectionHeader
          title="My Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-purple rounded-full"></span>
              Frontend Development
            </h3>
            
            <div className="space-y-4">
              {frontendSkills.map((skill) => (
                <motion.div key={skill.name} variants={item}>
                  <SkillBar skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-neon-pink rounded-full"></span>
              Backend Development
            </h3>
            
            <div className="space-y-4">
              {backendSkills.map((skill) => (
                <motion.div key={skill.name} variants={item}>
                  <SkillBar skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-blue rounded-full"></span>
              Other Skills
            </h3>
            
            <div className="space-y-4">
              {otherSkills.map((skill) => (
                <motion.div key={skill.name} variants={item}>
                  <SkillBar skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface SkillProps {
  skill: {
    name: string;
    level: number;
  };
}

const SkillBar = ({ skill }: SkillProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2" />
    </div>
  );
};

export default SkillsSection;
