"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with Next.js, TypeScript, and Tailwind CSS. Features include authentication, real-time updates, and a beautiful UI.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Project Two",
    description:
      "An innovative mobile-first application that delivers seamless user experiences across all devices with advanced animations and interactions.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Project Three",
    description:
      "A powerful analytics dashboard with real-time data visualization, built to handle large datasets with optimized performance.",
    tags: ["React", "D3.js", "Firebase", "Material-UI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    github: "https://github.com",
    demo: "https://example.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing various technologies and
            problem-solving approaches.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -10 }}
              className={cn(
                "group rounded-2xl overflow-hidden border border-border",
                "bg-card hover:bg-card/80 transition-all duration-300",
                "backdrop-blur-sm"
              )}
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 border border-accent/20 text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-accent hover:bg-accent/90"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
