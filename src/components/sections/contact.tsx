"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 relative bg-black">
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
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Contact Information
                </h3>
              </motion.div>

              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                    <info.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-foreground">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "p-8 rounded-2xl border border-border",
                "bg-background/60 backdrop-blur-sm"
              )}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-background border border-border",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                      "transition-all"
                    )}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "bg-background border border-border",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                      "transition-all"
                    )}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg resize-none",
                      "bg-background border border-border",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                      "transition-all"
                    )}
                    placeholder="Your message here..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
