
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLoadingComplete = () => {
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

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onFinished={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleBackground isDarkMode={isDarkMode} />
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <NavDots />
          
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple via-blue to-neon-pink z-50"
            style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
          />
          
          <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={sectionVariants}>
              <HeroSection />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <AboutSection />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <ProjectsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <SkillsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <CertificationsSection />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
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
