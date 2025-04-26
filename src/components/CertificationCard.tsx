
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ExternalLink } from "lucide-react";
import { Certification } from "@/types/certification";
import { cardVariants } from "@/animations/certificationAnimations";

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="perspective-[1000px]"
    >
      <motion.div
        className="w-full h-full"
        animate={{ 
          rotateY: isHovered ? 15 : 0,
          transition: { duration: 0.5 }
        }}
      >
        <Card className="h-full hover:shadow-xl hover:shadow-purple/20 transition-all duration-500 overflow-hidden relative border-2 border-border">
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{certification.title}</h3>
                  <p className="text-muted-foreground">{certification.issuer}</p>
                </div>
                <motion.div
                  animate={{ 
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-purple/20 p-2 rounded-full"
                >
                  <GraduationCap className="h-6 w-6 text-purple" />
                </motion.div>
              </div>
              
              <p className="text-sm text-muted-foreground">{certification.date}</p>
              <p className="text-sm">{certification.description}</p>
              
              <Button asChild variant="outline" className="w-full mt-4 group overflow-hidden relative">
                <a 
                  href={certification.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">View Certificate</span>
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple to-blue"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </Button>
            </div>
          </CardContent>
          
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple/10 via-blue/5 to-transparent"
            animate={{ 
              opacity: isHovered ? 1 : 0.2,
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
            transition={{ duration: 0.5 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CertificationCard;
