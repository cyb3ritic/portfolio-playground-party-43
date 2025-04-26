
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import HeroScene from './3d/HeroScene';
import TypeAnimation from './hero/TypeAnimation';
import SocialLinks from './hero/SocialLinks';
import ScrollIndicator from './hero/ScrollIndicator';
import HeroButtons from './hero/HeroButtons';

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const textArray = ["Data Scientist", "ML Engineer", "AI Specialist", "Analytics Expert"];

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <HeroScene isDarkMode={isDarkMode} />
      
      <div className="container flex flex-col items-center text-center space-y-8 z-10">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold"
            animate={{ 
              textShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 10px rgba(139,92,246,0.5)", "0 0 0px rgba(139,92,246,0)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hello, I'm <span className="gradient-text">Alex Chen</span>
          </motion.h1>
          
          <div className="h-12 md:h-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
              I'm a{' '}
              <TypeAnimation textArray={textArray} />
            </h2>
          </div>
          
          <motion.p 
            className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transforming complex data into actionable insights and building intelligent 
            systems that solve real-world problems with cutting-edge AI and ML technologies.
          </motion.p>
        </motion.div>

        <HeroButtons />
        <SocialLinks />
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
