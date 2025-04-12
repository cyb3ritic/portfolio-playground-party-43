import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const EasterEgg = () => {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();
  
  const konamiSequence = [
    "ArrowUp", "ArrowUp", 
    "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", 
    "ArrowLeft", "ArrowRight", 
    "b", "a"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the sequence
      const newSequence = [...konamiCode, e.key];
      
      // Keep only the last N keys (where N is the length of the Konami code)
      if (newSequence.length > konamiSequence.length) {
        newSequence.shift();
      }
      
      setKonamiCode(newSequence);
      
      // Check if the sequence matches the Konami code
      const isKonamiCode = newSequence.join(",") === konamiSequence.join(",");
      
      if (isKonamiCode && !isActivated) {
        setIsActivated(true);
        activateEasterEgg();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [konamiCode, isActivated]);

  const activateEasterEgg = () => {
    // Show a toast message
    toast({
      title: "🎮 Konami Code Activated!",
      description: "You found the Easter egg! You're awesome!",
      duration: 5000,
    });
    
    // Add some fun effects to the page
    document.body.classList.add("easter-egg-active");
    
    // Add confetti effect
    createConfetti();
    
    // Reset after a while
    setTimeout(() => {
      document.body.classList.remove("easter-egg-active");
      setIsActivated(false);
    }, 10000);
  };

  const createConfetti = () => {
    const confettiCount = 150;
    const container = document.createElement("div");
    container.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute rounded-sm";
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.top = "-20px";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = Math.random().toString();
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s ease-in-out forwards`;
      
      container.appendChild(confetti);
    }
    
    setTimeout(() => {
      container.remove();
    }, 5000);
  };

  const getRandomColor = () => {
    const colors = ["#8B5CF6", "#D946EF", "#F97316", "#1EAEDB", "#33C3F0"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return null; // This component doesn't render anything visible
};

export default EasterEgg;
