
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = ["All", "Web Development", "Design", "Technology", "Career"];
  
  const posts = [
    {
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies that are shaping the future of web development.",
      date: "April 3, 2025",
      readTime: "5 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "Web Dev"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      url: "#"
    },
    {
      title: "Mastering Responsive Design",
      excerpt: "Tips and tricks for creating responsive layouts that work seamlessly across all devices.",
      date: "March 21, 2025",
      readTime: "7 min read",
      category: "Design",
      tags: ["CSS", "Responsive", "Mobile First"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      url: "#"
    },
    {
      title: "AI Tools for Developers",
      excerpt: "Discover how artificial intelligence is transforming the way developers work and code.",
      date: "February 14, 2025",
      readTime: "6 min read",
      category: "Technology",
      tags: ["AI", "Tools", "Productivity"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      url: "#"
    },
  ];
  
  const filteredPosts = selectedCategory && selectedCategory !== "All" 
    ? posts.filter(post => post.category === selectedCategory) 
    : posts;

  return (
    <section id="blog" className="section-padding">
      <div className="container">
        <SectionHeader
          title="Blog"
          subtitle="Thoughts, ideas, and insights"
        />
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
              className={`cursor-pointer px-4 py-1.5 text-sm ${
                selectedCategory === category || (category === "All" && !selectedCategory)
                  ? "bg-purple hover:bg-purple-dark"
                  : "hover:bg-muted"
              }`}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="group"
            asChild
          >
            <a href="#" className="flex items-center gap-2">
              View All Posts
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    url: string;
  };
}

const BlogPostCard = ({ post }: BlogPostProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardContent className="flex-grow pt-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        
        <Badge className="bg-purple hover:bg-purple-dark">
          {post.category}
        </Badge>
        
        <h3 className="text-xl font-bold line-clamp-2">
          <a href={post.url} className="hover:text-purple transition-colors">
            {post.title}
          </a>
        </h3>
        
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="flex-wrap gap-2 pt-2 pb-6">
        {post.tags.map((tag, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default BlogSection;
