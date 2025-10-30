"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy } from "lucide-react";

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

const affiliations = [
  "VIT",
  "Valsco Tech.",
  "Walstar Tech.",
  "QuickHeal Tech.",
  "Konark Computer's",
  "CU - Boulder",
];

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

export function ProjectsAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("patilrajvardhan27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !headerRef.current || !heroRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    const hero = heroRef.current;
    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Hero fade out (0% - 15%)
          if (progress <= 0.15) {
            const heroProgress = gsap.utils.mapRange(0, 0.15, 1, 0, progress);
            gsap.set(hero, {
              opacity: heroProgress,
            });
          } else {
            gsap.set(hero, { opacity: 0 });
          }

          // Header fade in (15% - 30%)
          if (progress >= 0.15 && progress <= 0.3) {
            const headerProgress = gsap.utils.mapRange(0.15, 0.3, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

            gsap.set(header, {
              y: yValue,
              opacity: opacityValue,
            });
          } else if (progress < 0.15) {
            gsap.set(header, { y: 40, opacity: 0 });
          } else if (progress > 0.3) {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          // Container width shrink (15% - 35%)
          if (progress >= 0.15 && progress <= 0.35) {
            const widthPercentage = gsap.utils.mapRange(0.15, 0.35, 75, 60, progress);
            gsap.set(container, { width: `${widthPercentage}%` });
          } else if (progress < 0.15) {
            gsap.set(container, { width: "75%" });
          } else {
            gsap.set(container, { width: "60%" });
          }

          // Gap and border radius animation (45%)
          if (progress >= 0.45 && !isGapAnimationCompleted) {
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
          } else if (progress < 0.45 && isGapAnimationCompleted) {
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

          // Flip animation (75%)
          if (progress >= 0.75 && !isFlipAnimationCompleted) {
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
          } else if (progress < 0.75 && isFlipAnimationCompleted) {
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
      id="home"
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

      {/* Hero Content */}
     {/* Hero Content */}
<motion.div
  ref={heroRef}
  className="absolute inset-0 flex flex-col items-center justify-start pt-[22%] z-10" // reduced top padding for top alignment
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col items-center">
    {/* Main Heading - "This is Raj" */}
    <motion.h1
      variants={itemVariants}
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-2"
    >
      <span className="block text-foreground">
        This is{" "}
        <span className="text-foreground text-brand hover:underline">
          Raj
        </span>
      </span>
    </motion.h1>

    {/* Email Section */}
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center justify-center gap-3 text-foreground"
    >
      <button
        onClick={copyEmail}
        className="inline-flex items-center gap-2 px-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group"
      >
        <span className="font-mono text-sm">patilrajvardhan27@gmail.com</span>
        <Copy className="w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
      {copied && <span className="text-sm text-green-500">Copied!</span>}
    </motion.div>
        </div>

        {/* Bottom Content - Building Gradbro and Affiliations */}
        <motion.div
          variants={itemVariants}
          className="w-full pb-16 px-4 space-y-2 absolute bottom-[18%] text-center  "
        >
          {/* Main Content */}
          <div className="text-center">
            <p className="text-foreground text-lg">
              Building <a href="#" className="text-brand hover:underline font-medium">Gradbro</a> to 1M MRR.
            </p>
          </div>

          {/* Affiliations */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {affiliations.map((affiliation) => (
              <span
                key={affiliation}
                className="px-4 py-2 bg-brand/90 hover:bg-brand text-brand-foreground rounded-lg text-sm font-medium transition-colors cursor-default"
              >
                {affiliation}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Header - Projects in my journey */}
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
    </section>
  );
}
