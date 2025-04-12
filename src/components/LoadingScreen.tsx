
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");
  const [currentQuote, setCurrentQuote] = useState(0);

  const loadingQuotes = [
    "Brewing creative code...",
    "Polishing pixels to perfection...",
    "Assembling awesome animations...",
    "Crafting digital experiences...",
    "Generating genius ideas..."
  ];

  useEffect(() => {
    // Update loading text with dots
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500);

    // Change quote every 3 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % loadingQuotes.length);
    }, 3000);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 500);

    // Clear intervals when done
    return () => {
      clearInterval(textInterval);
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    // When progress reaches 100%, wait a bit then finish
    if (progress === 100) {
      const timer = setTimeout(() => {
        onFinished();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onFinished]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="text-4xl font-bold font-display flex items-center justify-center gap-2">
            <span className="text-4xl text-purple">{"<"}</span>
            <span className="gradient-text">Portfolio</span>
            <span className="text-4xl text-neon-pink">{"/>"}</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-lg">
            <Loader2 className="h-6 w-6 animate-spin text-purple" />
            <span>{loadingText}</span>
          </div>

          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple to-neon-pink"
            />
          </div>

          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm text-muted-foreground italic"
              >
                {loadingQuotes[currentQuote]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
