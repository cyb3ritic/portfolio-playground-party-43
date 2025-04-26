
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Certification } from "@/types/certification";
import { cardVariants } from "@/animations/certificationAnimations";

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{certification.title}</h3>
                <p className="text-muted-foreground">{certification.issuer}</p>
              </div>
              <GraduationCap className="h-6 w-6 text-purple" />
            </div>
            
            <p className="text-sm text-muted-foreground">{certification.date}</p>
            <p className="text-sm">{certification.description}</p>
            
            <Button asChild variant="outline" className="w-full mt-4">
              <a 
                href={certification.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Certificate
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificationCard;
