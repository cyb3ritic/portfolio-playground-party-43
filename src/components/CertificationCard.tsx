
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Award } from "lucide-react";
import { Certification } from "@/types/certification";
import { itemVariants } from "@/animations/certificationAnimations";

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

const CertificationCard = ({ certification, index }: CertificationCardProps) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        rotateY: 10,
        scale: 1.05,
        transition: { duration: 0.4, type: "spring" }
      }}
      style={{ perspective: "1000px" }}
    >
      <Card className="relative h-full overflow-hidden backdrop-blur-sm border-2 group hover:border-purple/50 transition-all duration-500">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple/10 via-blue/5 to-transparent"
            style={{
              transform: "translateZ(-10px)",
              backfaceVisibility: "hidden"
            }}
          />
        </div>

        <CardHeader className="relative">
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="p-2 rounded-lg"
                style={{ backgroundColor: certification.color }}
              >
                {certification.icon}
              </motion.div>
              <h3 className="text-xl font-bold line-clamp-2">{certification.title}</h3>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{certification.provider}</span>
              <span>{certification.date}</span>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {certification.tags.map((tag, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="bg-accent/50 group-hover:bg-accent transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <motion.a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-purple hover:text-purple-dark transition-colors"
            whileHover={{ x: 5 }}
          >
            <span>View Certificate</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </CardContent>

        <div className="absolute top-2 right-2">
          <motion.div 
            className="bg-accent/50 p-1.5 rounded-full"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Award className="h-4 w-4 text-purple" />
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            background: `radial-gradient(circle at center, ${certification.color}, transparent)`,
          }}
        />
      </Card>
    </motion.div>
  );
};

export default CertificationCard;
