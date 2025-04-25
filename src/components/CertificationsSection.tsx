import { motion, useAnimation, Variants } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";
import { ExternalLink, Award, Database, Brain, ChartPie } from "lucide-react";
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const certifications = [
  {
    title: "Machine Learning Specialization",
    provider: "Stanford University / Coursera",
    date: "2023",
    link: "#",
    tags: ["Machine Learning", "Neural Networks", "AI"],
    icon: <Brain className="h-5 w-5" />,
    color: "#9b87f5",
  },
  {
    title: "Big Data Engineering",
    provider: "IBM",
    date: "2024",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    link: "#",
    tags: ["Hadoop", "Spark", "NoSQL"],
    icon: <Database className="h-5 w-5" />,
    color: "#33C3F0",
  },
  {
    title: "Advanced Data Science",
    provider: "MIT",
    date: "2024",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    link: "#",
    tags: ["Statistics", "ML", "Python"],
    icon: <ChartPie className="h-5 w-5" />,
    color: "#D946EF",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
  };

  if (isInView) {
    controls.start("show");
  }

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <SectionHeader
          title="Certifications"
          subtitle="Professional achievements and credentials"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          {certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.4, type: "spring" }
              }}
              style={{ perspective: "1000px" }}
            >
              <Card className="relative h-full overflow-hidden backdrop-blur-sm border-2 group hover:border-purple/50 transition-all duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple/10 via-blue/5 to-transparent"
                    style={{
                      transform: "translateZ(-10px)",
                      backfaceVisibility: "hidden"
                    }}
                  />
                </div>

                <CardHeader className="relative">
                  <motion.div 
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7 }}
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: cert.color }}
                      >
                        {cert.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold line-clamp-2">{cert.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{cert.provider}</span>
                      <span>{cert.date}</span>
                    </div>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="bg-accent/50 group-hover:bg-accent transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-purple hover:text-purple-dark transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </CardContent>

                <div className="absolute top-2 right-2">
                  <motion.div 
                    className="bg-accent/50 p-1.5 rounded-full"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="h-4 w-4 text-purple" />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background: `radial-gradient(circle at center, ${cert.color}, transparent)`,
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
