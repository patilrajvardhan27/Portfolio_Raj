"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
];

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              </span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Love working working with passionate people to build products that people love.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-current" /> using
              Next.js & Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
