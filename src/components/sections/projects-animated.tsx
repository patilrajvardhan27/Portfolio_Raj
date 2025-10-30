"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  number: string;
  image: string;
  bgColor: string;
  textColor: string;
}

const projectCards: ProjectCard[] = [
  {
    id: "zero-to-one",
    title: "Messit",
    description: "A campus utility app with 4.5☆ rating and active 13000+ users",
    icon: "☆",
    number: "01",
    image: "/card_cover_1.jpg",
    bgColor: "bg-zinc-200",
    textColor: "text-zinc-900",
  },
  {
    id: "scaling",
    title: "Gradbro",
    description: "Get personalised university recommendations based on your profile and test scores. Supports a user base of 15000+ users. Community of 200+ paid users",
    icon: "○○○",
    number: "02",
    image: "/card_cover_2.jpg",
    bgColor: "bg-brand",
    textColor: "text-brand-foreground",
  },
  {
    id: "quick-solutions",
    title: "MDairy",
    description: "Built an app for milk dairy owners to track the daily milk transactions.",
    icon: "𐃯",
    number: "03",
    image: "/card_cover_3.jpg",
    bgColor: "bg-zinc-900",
    textColor: "text-zinc-100",
  },
];

export function ProjectsAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !headerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Header fade in (10% - 25%)
          if (progress >= 0.1 && progress <= 0.25) {
            const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

            gsap.set(header, {
              y: yValue,
              opacity: opacityValue,
            });
          } else if (progress < 0.1) {
            gsap.set(header, { y: 40, opacity: 0 });
          } else if (progress > 0.25) {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          // Container width shrink (0% - 25%)
          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
            gsap.set(container, { width: `${widthPercentage}%` });
          } else {
            gsap.set(container, { width: "60%" });
          }

          // Gap and border radius animation (35%)
          if (progress >= 0.35 && !isGapAnimationCompleted) {
            gsap.to(container, {
              gap: "40px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to(".project-card", {
              borderRadius: "20px",
              duration: 0.5,
              ease: "power3.out",
            });

            isGapAnimationCompleted = true;
          } else if (progress < 0.35 && isGapAnimationCompleted) {
            gsap.to(container, {
              gap: "0px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-zero-to-one", {
              borderRadius: "20px 0 0 20px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-scaling", {
              borderRadius: "0px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-quick-solutions", {
              borderRadius: "0 20px 20px 0",
              duration: 0.5,
              ease: "power3.out",
            });

            isGapAnimationCompleted = false;
          }

          // Flip animation (70%)
          if (progress >= 0.7 && !isFlipAnimationCompleted) {
            gsap.to(".project-card", {
              rotationY: 180,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: 0.1,
            });

            gsap.to(["#card-zero-to-one", "#card-quick-solutions"], {
              y: 30,
              rotationZ: (i: number) => [-15, 15][i],
              duration: 0.75,
              ease: "power3.inOut",
            });

            setIsFlipped(true);
            isFlipAnimationCompleted = true;
          } else if (progress < 0.7 && isFlipAnimationCompleted) {
            gsap.to(".project-card", {
              rotationY: 0,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: -0.1,
            });

            gsap.to(["#card-zero-to-one", "#card-quick-solutions"], {
              y: 0,
              rotationZ: 0,
              duration: 0.75,
              ease: "power3.inOut",
            });

            setIsFlipped(false);
            isFlipAnimationCompleted = false;
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Slide up animation overlay */}
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black -z-10"
      />
      {/* Header */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <h2
          ref={headerRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center whitespace-nowrap"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <span className="text-foreground">Projects </span>
          <span className="italic font-serif text-muted-foreground">in</span>
          <span className="text-foreground"> my journey?</span>
        </h2>
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="relative flex"
        style={{
          width: "75%",
          perspective: "1000px",
          transform: "translateY(40px)",
          gap: "0px",
        }}
      >
        {projectCards.map((card, index) => (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className="project-card relative flex-1 aspect-[5/7] cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "top",
              borderRadius:
                index === 0
                  ? "20px 0 0 20px"
                  : index === 2
                  ? "0 20px 20px 0"
                  : "0px",
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Front (Image) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                borderRadius: "inherit",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Card Back (Content) */}
            <div
              className={`absolute inset-0 w-full h-full flex flex-col justify-between text-left p-8 ${card.bgColor} ${card.textColor}`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "inherit",
              }}
            >
              {/* Top Section - Icon and Number */}
              <div className="flex justify-between items-start">
                <div className="text-3xl opacity-60">
                  {card.icon}
                </div>
                <span className="text-xs font-medium opacity-40">
                  {card.number}
                </span>
              </div>

              {/* Bottom Section - Title and Description */}
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button - appears after flip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFlipped ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isFlipped ? 0.5 : 0 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
      </motion.div>
    </section>
  );
}
