import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    placeholderData: [
      {
        _id: "1",
        title: "E-commerce Platform",
        description: "A fully functional e-commerce website with shopping cart, checkout, and payment processing.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "#",
        githubLink: "#",
      },
      {
        _id: "2",
        title: "AI Chatbot Assistant",
        description: "An intelligent chatbot that uses natural language processing to answer questions and provide assistance.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Python", "TensorFlow", "React", "Flask"],
        demoLink: "#",
        githubLink: "#",
      },
      {
        _id: "3",
        title: "Fitness Tracking App",
        description: "A mobile-responsive app to track workouts, nutrition, and health metrics with data visualization.",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["React Native", "Firebase", "Redux", "D3.js"],
        demoLink: "#",
        githubLink: "#",
      },
      {
        _id: "4",
        title: "Social Media Dashboard",
        description: "A comprehensive analytics dashboard for social media management and performance tracking.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        tags: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
        demoLink: "#",
        githubLink: "#",
      },
    ]
  });

  const projectsList = projects || [];

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projectsList.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projectsList.length - 1 : prev - 1));
  };

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

  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-muted/30">
        <div className="container">
          <SectionHeader
            title="My Projects"
            subtitle="Loading projects..."
          />
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container">
        <SectionHeader
          title="My Projects"
          subtitle="Check out some of my recent work"
        />

        <div className="mt-10">
          {/* Desktop View - Grid */}
          <motion.div 
            className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projectsList.map((project) => (
              <motion.div key={project._id} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile View - Carousel */}
          {projectsList.length > 0 && (
            <div className="md:hidden">
              <ProjectCard project={projectsList[currentProject]} />
              
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevProject}
                  aria-label="Previous project"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2">
                  {projectsList.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        currentProject === index ? "w-6 bg-purple" : "w-2 bg-muted-foreground/30"
                      }`}
                      onClick={() => setCurrentProject(index)}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextProject}
                  aria-label="Next project"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface ProjectProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <CardHeader className="relative -mt-12 pt-0">
        <div className="bg-card p-4 rounded-t-lg shadow-md">
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="bg-accent/50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="default" 
          size="sm"
          className="w-full bg-purple hover:bg-purple-dark"
          asChild
        >
          <a 
            href={project.demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> Live Demo
          </a>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full"
          asChild
        >
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectsSection;
