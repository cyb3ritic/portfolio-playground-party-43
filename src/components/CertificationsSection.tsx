
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";
import { ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    date: "2025",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    link: "#",
    tags: ["Cloud", "AWS", "Architecture"],
  },
  {
    title: "React Advanced Certification",
    provider: "Meta",
    date: "2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    link: "#",
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    title: "AI & Machine Learning",
    provider: "Google",
    date: "2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad996?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    link: "#",
    tags: ["AI", "ML", "Python"],
  },
];

const CertificationsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <SectionHeader
          title="Certifications"
          subtitle="Professional achievements and credentials"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden card-hover group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>

                <CardHeader className="relative -mt-12">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold line-clamp-2">{cert.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{cert.provider}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-accent/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-purple hover:text-purple-dark transition-colors"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
