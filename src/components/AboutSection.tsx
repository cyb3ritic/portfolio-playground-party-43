
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./SectionHeader";
import { Heart, Lightbulb, Coffee, Rocket } from "lucide-react";

const AboutSection = () => {
  const funFacts = [
    { 
      icon: <Coffee className="h-6 w-6 text-neon-orange" />, 
      text: "I've consumed over 1,000 cups of coffee while coding" 
    },
    { 
      icon: <Lightbulb className="h-6 w-6 text-neon-orange" />, 
      text: "I solved my first coding challenge at age 12" 
    },
    { 
      icon: <Heart className="h-6 w-6 text-neon-pink" />, 
      text: "I love creating digital art in my free time" 
    },
    { 
      icon: <Rocket className="h-6 w-6 text-neon-pink" />, 
      text: "I've contributed to 15+ open source projects" 
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <SectionHeader 
          title="About Me"
          subtitle="Get to know me a little better"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div className="space-y-6 order-2 lg:order-1 animate-slide-up">
            <h3 className="text-2xl font-bold">
              I'm a <span className="text-purple">Full Stack Developer</span> with a passion for creating beautiful and functional web applications.
            </h3>
            
            <div className="text-muted-foreground space-y-4">
              <p>
                I specialize in building modern web applications using React, Next.js, and Node.js. 
                With over 5 years of experience in the industry, I've had the opportunity to work on 
                a wide variety of projects, from small business websites to complex enterprise applications.
              </p>
              
              <p>
                My approach to development is centered around user experience and performance. 
                I believe that the best websites are not just visually appealing, but also 
                fast, accessible, and enjoyable to use.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open source projects, or creating digital art.
              </p>
            </div>
            
            <div className="pt-4">
              <h4 className="text-xl font-semibold mb-4">Fun Facts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/40"
                  >
                    {fact.icon}
                    <span className="text-sm">{fact.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:pl-10 order-1 lg:order-2">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-purple shadow-xl animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 -right-5 bg-background rounded-full p-4 shadow-lg border border-border">
                <Card className="bg-gradient-to-br from-purple to-neon-pink text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-2xl font-bold">5+ Years</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="absolute -top-5 -left-5 bg-background rounded-full p-4 shadow-lg border border-border">
                <Card className="bg-gradient-to-br from-purple to-neon-pink text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">Projects</p>
                      <p className="text-2xl font-bold">50+</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
