
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const SocialLinks = () => {
  return (
    <motion.div 
      className="pt-8 flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-purple transition-colors transform hover:scale-110 duration-300"
        aria-label="GitHub"
      >
        <Github size={24} />
      </a>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-purple transition-colors transform hover:scale-110 duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-purple transition-colors transform hover:scale-110 duration-300"
        aria-label="Twitter"
      >
        <Twitter size={24} />
      </a>
    </motion.div>
  );
};

export default SocialLinks;
