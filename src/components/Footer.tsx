
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-muted/50 py-10 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <span className="text-2xl text-purple">{"<"}</span>
              <span className="gradient-text">Portfolio</span>
              <span className="text-2xl text-neon-pink">{"/>"}</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm max-w-md">
              A creative developer passionate about building beautiful and functional web experiences.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-2"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="mt-1">Made with <span className="text-neon-pink">♥</span> and React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
