
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const SkillsSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = {
    "Frontend Development": [
      { name: "React", level: 90, color: "#61DAFB" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "Next.js", level: 80, color: "#000000" },
      { name: "Tailwind", level: 95, color: "#06B6D4" },
    ],
    "Backend Development": [
      { name: "Node.js", level: 85, color: "#339933" },
      { name: "Express", level: 80, color: "#000000" },
      { name: "MongoDB", level: 75, color: "#47A248" },
      { name: "GraphQL", level: 70, color: "#E10098" },
    ],
    "Other Skills": [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "Docker", level: 75, color: "#2496ED" },
      { name: "AWS", level: 70, color: "#FF9900" },
      { name: "UI/UX", level: 85, color: "#FF61F6" },
    ],
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Technologies I work with"
        />

        <div ref={ref} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: categoryIndex * 0.2 }}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-purple rounded-full"></span>
                {category}
              </h3>

              <div className="space-y-6">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={controls}
                    transition={{
                      delay: categoryIndex * 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="relative"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={controls}
                        transition={{
                          delay: categoryIndex * 0.2 + index * 0.1,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        variants={{
                          visible: { width: `${skill.level}%` },
                        }}
                        style={{ backgroundColor: skill.color }}
                        className="h-full rounded-full relative"
                      >
                        <div
                          className="absolute top-0 right-0 h-full w-4"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${skill.color}88)`,
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue/10 rounded-full blur-3xl" />
    </section>
  );
};

export default SkillsSection;
