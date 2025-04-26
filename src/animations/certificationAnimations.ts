
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateY: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.4)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const animateSections = () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  });
};
