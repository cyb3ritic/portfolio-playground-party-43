
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from "./SectionHeader";
import CertificationCard from "./CertificationCard";
import { certifications } from "@/data/certifications";
import { containerVariants } from "@/animations/certificationAnimations";

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  if (isInView) {
    controls.start("show");
  }

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <SectionHeader
          title="Certifications"
          subtitle="Professional achievements and credentials"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          {certifications.map((cert, index) => (
            <CertificationCard 
              key={index}
              certification={cert}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
