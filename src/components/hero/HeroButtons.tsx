
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroButtons = () => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <Button 
        size="lg" 
        className="group relative overflow-hidden"
        asChild
      >
        <a href="#projects">
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-purple to-blue opacity-80"
            animate={{ 
              x: ["0%", "100%", "0%"],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <span className="relative z-10">View My Projects</span>
        </a>
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="gap-2 group relative overflow-hidden"
        asChild
      >
        <a href="#contact">
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-purple/20 to-blue/20 opacity-0 group-hover:opacity-100"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <span className="relative z-10">Get In Touch</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
