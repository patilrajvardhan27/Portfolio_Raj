"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Building robust applications with React, Next.js, Node.js, and modern frameworks.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating beautiful, intuitive interfaces with attention to detail and user experience.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Delivering lightning-fast applications optimized for speed and efficiency.",
  },
  {
    icon: Rocket,
    title: "Modern Technologies",
    description: "Leveraging cutting-edge tools and best practices for scalable solutions.",
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

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32 relative bg-black">
      {/* Slide up animation overlay */}
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black -z-10"
      />
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
              About Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a keen eye for detail and a love for creating
            exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className={cn(
                "p-6 sm:p-8 rounded-2xl border border-border",
                "bg-background/60 hover:bg-background/80 transition-colors",
                "backdrop-blur-sm"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <skill.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
