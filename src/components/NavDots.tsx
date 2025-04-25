
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NavDots = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Increased threshold for better detection
      rootMargin: '-10% 0px -10% 0px' // Adjusted margins for better visibility
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative"
        >
          <motion.a
            href={`#${section.id}`}
            className="group relative flex items-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple to-blue scale-125'
                  : 'bg-muted-foreground/30 hover:scale-110'
              }`}
              whileHover={{ 
                boxShadow: "0 0 12px rgba(139, 92, 246, 0.7)",
              }}
              layoutId="activeDot"
            />

            <motion.span 
              className="absolute left-0 -translate-x-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap px-2 py-1 rounded glass-effect"
              initial={{ x: 20, opacity: 0 }}
              whileHover={{ x: -12, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {section.label}
            </motion.span>
            
            {activeSection === section.id && (
              <motion.span
                className="absolute ml-5 h-px w-10 bg-gradient-to-r from-purple to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 40, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};

export default NavDots;
