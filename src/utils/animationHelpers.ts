
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const initScrollAnimations = () => {
  // Reset any previous ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
  
  // Animate sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    const sectionChildren = section.querySelectorAll('.animate-on-scroll');
    
    gsap.from(sectionChildren, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true
      }
    });
  });
  
  // Animate headings with text reveal effect
  const headings = document.querySelectorAll('.section-title');
  headings.forEach(heading => {
    const chars = heading.textContent?.split('') || [];
    heading.textContent = '';
    
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      heading.appendChild(span);
    });
    
    gsap.to(heading.childNodes, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        once: true
      }
    });
  });
};

export const smoothScrollTo = (id: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: `#${id}`,
      offsetY: 80
    },
    ease: "power3.inOut"
  });
};
