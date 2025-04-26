
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
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

  // Initialize animations once page is loaded
  const setupAnimations = useCallback(() => {
    // This would contain any animation setup code
    console.info("Setting up animations");
  }, []);

  useEffect(() => {
    // Handle scroll progress for progress bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Set theme on initial load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    
    // Log for debugging
    console.info("Rendering Index component, loading state:", loading);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      setupAnimations();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isDarkMode, setupAnimations]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen onFinished={() => setLoading(false)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <ParticleBackground isDarkMode={isDarkMode} />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <CertificationsSection />
            <BlogSection />
            <ContactSection />
            <Footer />
            <NavDots />
            <EasterEgg />
            
            {/* Progress bar */}
            <motion.div 
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple to-neon-pink z-50"
              style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
