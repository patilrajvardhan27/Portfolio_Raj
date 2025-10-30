"use client";

import { motion } from "framer-motion";
import { ArrowDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const affiliations = [
  "VIT",
  "Valsco Tech.",
  "Walstar Tech.",
  "QuickHeal Tech.",
  "Konark Computer's",
  "CU - Boulder",
];


export function Hero() {
  const [copied, setCopied] = useState(false);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("patilrajvardhan27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-12">
          {/* Main Heading - "This is Raj" */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center"
          >
            <span className="block text-foreground">
              This is{" "}
              <span className="text-foreground text-brand hover:underline">
                Raj
              </span>
            </span>
          </motion.h1>

          {/* Content Section */}
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            {/* Email Section */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 text-foreground">
              <span className="text-base">I read every email:</span>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group"
              >
                <span className="font-mono text-sm">patilrajvardhan27@gmail.com</span>
                <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
              {copied && (
                <span className="text-sm text-green-500">Copied!</span>
              )}
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants} className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                Building <a href="#" className="text-brand hover:underline font-medium">Gradbro</a> to 1M MRR.
              </p>

              {/* Location and Affiliations */}
              <div className="space-y-4 pt-4">
                <p className="text-foreground">Kolhapur - Boulder</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {affiliations.map((affiliation) => (
                    <span
                      key={affiliation}
                      className="px-4 py-2 bg-brand/90 hover:bg-brand text-brand-foreground rounded-lg text-sm font-medium transition-colors cursor-default"
                    >
                      {affiliation}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="pt-12 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              }}
            >
              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <span className="text-sm text-foreground">Scroll to explore</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
