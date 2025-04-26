
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import EasterEgg from "@/components/EasterEgg";
import LoadingScreen from "@/components/LoadingScreen";
import NavDots from "@/components/NavDots";
import { initScrollAnimations } from "@/utils/animationHelpers";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme");
      if (savedMode) {
        return savedMode === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize GSAP animations once page is loaded
  const setupAnimations = useCallback(() => {
    // Wait for a bit to ensure DOM is fully ready
    setTimeout(() => {
      initScrollAnimations();
    }, 500);
  }, []);

  useEffect(() => {
    // Handle scroll progress for progress bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initialize animations when loading is complete
    if (!loading) {
      setupAnimations();
      
      // Re-initialize animations on window resize
      window.addEventListener("resize", setupAnimations);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setupAnimations);
    };
  }, [loading, setupAnimations]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    
    // Reinitialize animations when theme changes
    if (!loading) {
      setupAnimations();
    }
  }, [isDarkMode, loading, setupAnimations]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLoadingComplete = () => {
    console.log("Loading complete, showing main content");
    setLoading(false);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    },
  };

  // Add cursor trail effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPoints, setCursorPoints] = useState<{ x: number, y: number }[]>([]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const interval = setInterval(() => {
      setCursorPoints(prev => {
        const newPoints = [...prev, mousePosition];
        if (newPoints.length > 10) {
          return newPoints.slice(newPoints.length - 10);
        }
        return newPoints;
      });
    }, 50);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePosition]);

  console.log("Rendering Index component, loading state:", loading);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onFinished={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Mouse trail effect */}
          <div className="pointer-events-none fixed inset-0 z-50">
            {cursorPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 rounded-full"
                style={{
                  left: point.x,
                  top: point.y,
                  backgroundColor: `rgba(139, 92, 246, ${0.2 - i * 0.02})`,
                  scale: 1 - i * 0.08,
                }}
              />
            ))}
          </div>
          
          <ParticleBackground isDarkMode={isDarkMode} />
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <NavDots />
          
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple via-blue to-neon-pink z-50"
            style={{ 
              scaleX: scrollProgress, 
              transformOrigin: "0%",
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.7)"
            }}
          />
          
          <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-x-hidden"
          >
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <HeroSection />
            </motion.div>
            
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <AboutSection />
            </motion.div>
            
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <ProjectsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <SkillsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <CertificationsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants} className="animate-on-scroll">
              <ContactSection />
            </motion.div>
          </motion.main>
          
          <Footer />
          <EasterEgg />
        </>
      )}
    </>
  );
};

export default Index;
