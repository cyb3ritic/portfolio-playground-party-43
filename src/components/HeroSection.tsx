import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import HeroScene from './3d/HeroScene';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const textArray = ["Data Scientist", "ML Engineer", "AI Specialist", "Analytics Expert"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1500;
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    // Typing animation
    if (animationRef.current) clearTimeout(animationRef.current);

    if (!isDeleting && displayText === textArray[currentTextIndex]) {
      // Complete word - wait before deleting
      animationRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } else if (isDeleting && displayText === '') {
      // Deleted - move to next word
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
    } else {
      // Typing or deleting
      const timeout = setTimeout(() => {
        const text = textArray[currentTextIndex];
        if (isDeleting) {
          setDisplayText(text.substring(0, displayText.length - 1));
        } else {
          setDisplayText(text.substring(0, displayText.length + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
      
      animationRef.current = timeout;
    }

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [currentTextIndex, displayText, isDeleting]);

  // Floating animation for data nodes
  const floatingNodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10
  }));

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* 3D Hero Scene */}
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
              <span className="gradient-text">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
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
      </div>
    </section>
  );
};

export default HeroSection;
