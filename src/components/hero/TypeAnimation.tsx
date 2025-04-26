
import { useEffect, useState, useRef } from 'react';

interface TypeAnimationProps {
  textArray: string[];
}

const TypeAnimation = ({ textArray }: TypeAnimationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1500;

  useEffect(() => {
    if (animationRef.current) clearTimeout(animationRef.current);

    if (!isDeleting && displayText === textArray[currentTextIndex]) {
      animationRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
    } else {
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
  }, [currentTextIndex, displayText, isDeleting, textArray]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypeAnimation;
