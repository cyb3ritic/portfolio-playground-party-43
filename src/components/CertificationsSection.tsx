
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import CertificationCard from "./CertificationCard";
import { containerVariants } from "@/animations/certificationAnimations";
import { Certification } from "@/types/certification";

const certifications: Certification[] = [
  {
    title: "React Advanced Developer",
    issuer: "Meta",
    date: "April 2025",
    description: "Advanced certification in React development covering advanced patterns, performance optimization, and modern React practices.",
    image: "/certificates/react-cert.png",
    link: "#"
  },
  {
    title: "Full Stack Development",
    issuer: "freeCodeCamp",
    date: "March 2025",
    description: "Comprehensive certification covering both frontend and backend development using modern web technologies.",
    image: "/certificates/fullstack-cert.png",
    link: "#"
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February 2025",
    description: "Foundation level certification demonstrating cloud expertise and AWS service knowledge.",
    image: "/certificates/aws-cert.png",
    link: "#"
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <SectionHeader
          title="Certifications"
          subtitle="Professional achievements and credentials"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
