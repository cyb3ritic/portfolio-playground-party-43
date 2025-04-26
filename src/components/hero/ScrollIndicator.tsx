
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-10 w-full flex justify-center"
      animate={{ 
        y: [0, 8, 0],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <a 
        href="#about" 
        aria-label="Scroll to About section"
        className="text-muted-foreground hover:text-purple transition-colors"
      >
        <ArrowDown size={28} />
      </a>
    </motion.div>
  );
};

export default ScrollIndicator;
