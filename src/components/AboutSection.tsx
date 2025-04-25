
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./SectionHeader";
import { Database, Brain, ChartPie, TrendingUp, BarChart, Lightbulb } from "lucide-react";

const AboutSection = () => {
  const funFacts = [
    { 
      icon: <Database className="h-6 w-6 text-neon-orange" />, 
      text: "Processed over 10TB of data in my largest project" 
    },
    { 
      icon: <BarChart className="h-6 w-6 text-neon-orange" />, 
      text: "Created dashboards viewed by 50K+ users monthly" 
    },
    { 
      icon: <Brain className="h-6 w-6 text-neon-pink" />, 
      text: "Developed NLP models with 94% accuracy" 
    },
    { 
      icon: <Lightbulb className="h-6 w-6 text-neon-pink" />, 
      text: "Published 5 papers on ML applications" 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-purple/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          delay: 4,
          repeat: Infinity,
        }}
      />
      
      <div className="container relative z-10">
        <SectionHeader 
          title="About Me"
          subtitle="My journey in data science and AI"
        />
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="space-y-6 order-2 lg:order-1"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold">
              I'm a <span className="text-purple">Data Scientist & ML Engineer</span> passionate about transforming data into intelligent solutions.
            </h3>
            
            <div className="text-muted-foreground space-y-4">
              <p>
                With over 5 years of experience in AI/ML and data analytics, I specialize in developing 
                machine learning models and data-driven applications that solve complex business problems. 
                My expertise spans predictive analytics, natural language processing, computer vision, and 
                big data technologies.
              </p>
              
              <p>
                I've collaborated with teams across various industries—from healthcare to finance—to implement 
                scalable AI solutions that drive meaningful insights and business value. My approach combines 
                technical expertise with a deep understanding of domain-specific challenges.
              </p>
              
              <p>
                When I'm not immersed in data, I enjoy contributing to open-source ML projects, 
                mentoring aspiring data scientists, and staying updated with the latest research in AI.
              </p>
            </div>
            
            <motion.div 
              className="pt-4"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold mb-4">Fun Facts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border border-border/50 hover:shadow-lg hover:shadow-purple/10 transition-all"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
                      scale: 1.02
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {fact.icon}
                    <span className="text-sm">{fact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:pl-10 order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <motion.div 
                className="aspect-square rounded-3xl overflow-hidden border-4 border-purple shadow-xl relative"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 10 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Data visualization patterns overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-blue/10 mix-blend-overlay"></div>
                
                <motion.div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(30, 174, 219, 0.3) 100%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Data Scientist Profile" 
                  className="w-full h-full object-cover"
                />
                
                {/* Decorative elements - data nodes and connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <motion.circle cx="20" cy="30" r="1.5" fill="#8B5CF6" 
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle cx="70" cy="40" r="1.5" fill="#8B5CF6" 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle cx="50" cy="75" r="1.5" fill="#8B5CF6" 
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                  <motion.path d="M20,30 L70,40" stroke="#8B5CF6" strokeWidth="0.3" opacity="0.6"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.path d="M70,40 L50,75" stroke="#8B5CF6" strokeWidth="0.3" opacity="0.6"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.path d="M50,75 L20,30" stroke="#8B5CF6" strokeWidth="0.3" opacity="0.6"
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  />
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -right-5 bg-background rounded-full p-4 shadow-lg border border-border"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <Card className="bg-gradient-to-br from-purple to-neon-pink text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-2xl font-bold">5+ Years</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                className="absolute -top-5 -left-5 bg-background rounded-full p-4 shadow-lg border border-border"
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <Card className="bg-gradient-to-br from-purple to-neon-pink text-white">
                  <CardContent className="p-4">
                    <div className="text-center flex flex-col items-center">
                      <p className="text-sm font-medium">AI Models</p>
                      <p className="text-2xl font-bold">30+</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
