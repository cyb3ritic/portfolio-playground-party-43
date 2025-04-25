
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section) => (
        <motion.a
          key={section.id}
          href={`#${section.id}`}
          className="relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-purple scale-125'
                : 'bg-muted-foreground/30 hover:scale-110'
            }`}
          />
          <span className="absolute left-0 -translate-x-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap px-2 py-1 rounded bg-background border text-muted-foreground">
            {section.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default NavDots;
