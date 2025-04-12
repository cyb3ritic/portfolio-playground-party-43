
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, GitHub, Linkedin, Twitter } from "lucide-react";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const textArray = ["Developer", "Designer", "Creator", "Innovator"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1500;
  const animationRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <div className="container flex flex-col items-center text-center space-y-8 z-10">
        <div className="space-y-4 animate-slide-down">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            Hello, I'm <span className="gradient-text">Your Name</span>
          </h1>
          
          <div className="h-12 md:h-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
              I'm a{' '}
              <span className="gradient-text">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
          </div>
          
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
            Welcome to my digital playground! I create engaging web experiences 
            that blend creativity with cutting-edge technology.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Button 
            size="lg" 
            className="gap-2 bg-purple hover:bg-purple-dark"
            asChild
          >
            <a href="#projects">View My Work</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2"
            asChild
          >
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>

        <div className="pt-8 flex items-center gap-4 animate-fade-in">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-purple transition-colors"
            aria-label="GitHub"
          >
            <GitHub size={24} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-purple transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-purple transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={24} />
          </a>
        </div>

        <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
          <a 
            href="#about" 
            aria-label="Scroll to About section"
            className="text-muted-foreground hover:text-purple transition-colors"
          >
            <ArrowDown size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
