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
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onFinished={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleBackground isDarkMode={isDarkMode} />
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <NavDots />
          
          <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />
          </motion.main>
          
          <Footer />
          <EasterEgg />
        </>
      )}
    </>
  );
};

export default Index;
