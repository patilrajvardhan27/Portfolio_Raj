"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Github, Linkedin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "X (Twitter)",
    href: "https://x.com/radian_27",
    icon: X,
    handle: "radian_27",
  },
  {
    name: "GitHub",
    href: "https://github.com/patilrajvardhan27",
    icon: Github,
    handle: "patilrajvardhan27",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/patilrajvardhan27/",
    icon: Linkedin,
    handle: "patilrajvardhan27",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{
        backgroundColor: headerBackground,
        backdropFilter: headerBlur,
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-4 md:mt-6 lg:mt-8",
        isScrolled && "shadow-lg"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 px-8 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            {/* Social Links */}
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">@{social.handle}</span>
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-white/20" />

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </motion.a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
