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
  const textRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const copyEmail = () => {
    navigator.clipboard.writeText("patilrajvardhan27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !headerRef.current || !heroRef.current || !textRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    const hero = heroRef.current;
    const textSection = textRef.current;
    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    // Calculate responsive values based on viewport
    const getResponsiveValues = () => {
      const vw = window.innerWidth;
      if (vw >= 1536) { // 2xl
        return { initialWidth: 70, finalWidth: 55, gap: 50, yOffset: 50 };
      } else if (vw >= 1280) { // xl
        return { initialWidth: 75, finalWidth: 60, gap: 40, yOffset: 40 };
      } else if (vw >= 1024) { // lg
        return { initialWidth: 80, finalWidth: 65, gap: 35, yOffset: 35 };
      } else { // md
        return { initialWidth: 85, finalWidth: 70, gap: 30, yOffset: 30 };
      }
    };

    const responsiveValues = getResponsiveValues();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        scrub: 2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Hero fade out (0% - 20%)
          if (progress <= 0.2) {
            const heroProgress = gsap.utils.mapRange(0, 0.2, 1, 0, progress);
            gsap.set(hero, {
              opacity: heroProgress,
            });
          } else {
            gsap.set(hero, { opacity: 0 });
          }

          // Header fade in (20% - 35%)
          if (progress >= 0.2 && progress <= 0.35) {
            const headerProgress = gsap.utils.mapRange(0.2, 0.35, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

            gsap.set(header, {
              y: yValue,
              opacity: opacityValue,
            });
          } else if (progress < 0.2) {
            gsap.set(header, { y: 40, opacity: 0 });
          } else if (progress > 0.35) {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          // Container width shrink (20% - 45%) - Dynamic based on viewport
          if (progress >= 0.2 && progress <= 0.45) {
            const widthPercentage = gsap.utils.mapRange(0.2, 0.45, responsiveValues.initialWidth, responsiveValues.finalWidth, progress);
            gsap.set(container, { width: `${widthPercentage}%` });
          } else if (progress < 0.2) {
            gsap.set(container, { width: `${responsiveValues.initialWidth}%` });
          } else {
            gsap.set(container, { width: `${responsiveValues.finalWidth}%` });
          }

          // Gap and border radius animation (55%) - Dynamic based on viewport
          if (progress >= 0.55 && !isGapAnimationCompleted) {
            gsap.to(container, {
              gap: `${responsiveValues.gap}px`,
              duration: 0.8,
              ease: "power2.out",
            });

            gsap.to(".project-card", {
              borderRadius: "20px",
              duration: 0.8,
              ease: "power2.out",
            });

            isGapAnimationCompleted = true;
          } else if (progress < 0.55 && isGapAnimationCompleted) {
            gsap.to(container, {
              gap: "0px",
              duration: 0.8,
              ease: "power2.out",
            });

            gsap.to("#card-zero-to-one", {
              borderRadius: "20px 0 0 20px",
              duration: 0.8,
              ease: "power2.out",
            });

            gsap.to("#card-scaling", {
              borderRadius: "0px",
              duration: 0.8,
              ease: "power2.out",
            });

            gsap.to("#card-quick-solutions", {
              borderRadius: "0 20px 20px 0",
              duration: 0.8,
              ease: "power2.out",
            });

            isGapAnimationCompleted = false;
          }

          // Flip animation (72%)
          if (progress >= 0.72 && !isFlipAnimationCompleted) {
            gsap.to(".project-card", {
              rotationY: 180,
              duration: 1,
              ease: "power2.inOut",
              stagger: 0.15,
            });

            gsap.to(["#card-zero-to-one", "#card-quick-solutions"], {
              y: responsiveValues.yOffset,
              rotationZ: (i: number) => [-15, 15][i],
              duration: 1,
              ease: "power2.inOut",
            });

            setIsFlipped(true);
            isFlipAnimationCompleted = true;
          } else if (progress < 0.72 && isFlipAnimationCompleted) {
            gsap.to(".project-card", {
              rotationY: 0,
              duration: 1,
              ease: "power2.inOut",
              stagger: -0.15,
            });

            gsap.to(["#card-zero-to-one", "#card-quick-solutions"], {
              y: 0,
              rotationZ: 0,
              duration: 1,
              ease: "power2.inOut",
            });

            setIsFlipped(false);
            isFlipAnimationCompleted = false;
          }

          // Text reveal animation (88% - 100%)
          if (progress >= 0.88) {
            const textProgress = gsap.utils.mapRange(0.88, 1, 0, 1, progress);

            // Hide cards smoothly
            const fadeProgress = gsap.utils.mapRange(0.88, 0.92, 1, 0, progress);
            gsap.set(container, { opacity: Math.max(0, fadeProgress) });
            gsap.set(header, { opacity: Math.max(0, fadeProgress) });

            gsap.set(textSection, {
              opacity: 1,
            });

            // Animate text words progressively
            const words = textSection.querySelectorAll('.reveal-word');
            const totalWords = words.length;
            words.forEach((word, index) => {
              // Normalize the index to 0-1 range based on total words
              const normalizedIndex = index / totalWords;
              // Calculate word progress - words appear as scroll progresses
              const wordProgress = gsap.utils.clamp(0, 1, (textProgress - normalizedIndex * 0.5) * 2);
              gsap.set(word, {
                opacity: wordProgress,
                y: (1 - wordProgress) * 10, // slight upward movement
              });
            });
          } else {
            gsap.set(textSection, { opacity: 0 });
            // Show cards when scrolling back
            if (progress >= 0.35) {
              gsap.set(container, { opacity: 1 });
              gsap.set(header, { opacity: 1 });
            }
          }
        },
      });
    }, section);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll indicator visibility
  useEffect(() => {
    if (!textRef.current) return;

    const textSection = textRef.current;

    const handleScroll = () => {
      if (textSection.scrollTop > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    textSection.addEventListener('scroll', handleScroll);

    return () => {
      textSection.removeEventListener('scroll', handleScroll);
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
  className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] md:pt-[18vh] lg:pt-[32vh] z-10"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl flex flex-col items-center">
    {/* Main Heading - "This is Raj" */}
    <motion.h1
      variants={itemVariants}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center"
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
        className="inline-flex items-center gap-2 px-3 py-2 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group"
      >
        <span className="font-mono text-xs sm:text-sm md:text-base">patilrajvardhan27@gmail.com</span>
        <Copy className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
      {copied && <span className="text-xs sm:text-sm text-green-500">Copied!</span>}
    </motion.div>
        </div>

        {/* Bottom Content - Building Gradbro and Affiliations */}
        <motion.div
          variants={itemVariants}
          className="w-full pb-12 md:pb-16 px-4 space-y-2 md:space-y-2 absolute bottom-[12vh] md:bottom-[12vh] text-center"
        >
          {/* Main Content */}
          <div className="text-center">
            <p className="text-foreground text-sm sm:text-base md:text-lg">
              Building <a href="#" className="text-brand hover:underline font-medium">Gradbro</a> to 1M MRR.
            </p>
          </div>

          {/* Affiliations */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            {affiliations.map((affiliation) => (
              <span
                key={affiliation}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-brand/90 hover:bg-brand text-brand-foreground rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-default"
              >
                {affiliation}
             </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Header - Projects in my journey */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4">
        <h2
          ref={headerRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center whitespace-nowrap"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <span className="text-foreground">Projects </span>
          <span className="italic font-serif text-muted-foreground">in </span>
          <span className="text-foreground">my journey?</span>
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
              className={`absolute inset-0 w-full h-full flex flex-col justify-between text-left p-8 ${card.bgColor} ${card.textColor} overflow-hidden`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "inherit",
              }}
            >
              {/* Gradient Shine Effect */}
              {isFlipped && (
                <div
                  className="absolute inset-0 pointer-events-none animate-shine"
                  style={{
                    background: "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: `shine-${card.id} 2.5s ease-in-out ${index * 0.15}s`,
                  }}
                />
              )}

              {/* Top Section - Icon and Number */}
              <div className="flex justify-between items-start relative z-10">
                <div className="text-2xl sm:text-3xl md:text-4xl opacity-60">
                  {card.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium opacity-40">
                  {card.number}
               </span>
              </div>

              {/* Bottom Section - Title and Description */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base opacity-70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scrolling Text Section */}
      <div
        ref={textRef}
        className="absolute inset-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-y-auto scroll-smooth flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto py-8 md:py-12 lg:py-16">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed tracking-normal font-bold text-justify border-t-2 border-b-2 border-foreground/20 py-8 md:py-10 lg:py-12">
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">scored</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">81.20%</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">in</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">my</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">school</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">exams,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">aimed</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">for</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">the</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">best</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">high</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">school</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">on</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">scholarship—cutoff</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">was</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">81.10%.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Missed</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">it</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">by</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">0.10%.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Fast</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">forward</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">to</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">masters</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">applications:</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">applied</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">to</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">6</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">universities,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">only</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">CU</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Boulder</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">said</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">yes.</span>
            <br />
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">History</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">repeated</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">itself,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">but</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I've</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">learned</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">that</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">what</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">looks</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">like</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">delay</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">is</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">often</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">depth.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Despite</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">the</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">rigorous</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">2025</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">visa</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">process</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">with</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">all</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">the</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">uncertainty</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">around</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">immigration,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">was</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">certain</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">about</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">one</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">thing—I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">will</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">build</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">roots</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">to</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">stand</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">tall.</span>
            <br />
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Now</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I'm</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">here</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">in</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Boulder</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">with</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">a</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">track</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">record:</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">built</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">a</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">dairy</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">automation</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">app</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">serving</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">5+</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">cooperatives</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">(40%</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">efficiency</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">gain),</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">created</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">GradBro</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">serving</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">1500+</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">students,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">increased</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">user</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">engagement</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">by</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">35%</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">at</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">VinnovateIT,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">shipped</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">features</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">that</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">boosted</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">session</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">time</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">by</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">18%.</span>
            <br />
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I've</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">worked</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">across</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">React,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Node.js,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">AWS,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">FastAPI,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">LLMs—building</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">products</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">that</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">solve</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">real</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">problems.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I'm</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">not</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">looking</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">for</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">just</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">any</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">opportunity;</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I'm</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">looking</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">for</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">a</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">place</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">where</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">belong,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">where</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">can</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">write</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">code</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">that</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">matters</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">build</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">something</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">people</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">need.</span>
            <br />
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">Life</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">isn't</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">a</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">race,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">it's</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">a</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">garden—some</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">flowers</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">bloom</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">early,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">some</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">late.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">The</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">time</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">spend</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">learning,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">healing,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">struggling</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">quietly</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">builds</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">the</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">roots</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">that</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">others</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">can't</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">see.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">When</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">it's</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">my</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">season,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">won't</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">just</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">grow,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">will</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">stand</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">tall.</span>
            <br />
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">missed</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">scholarships</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">got</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">rejected</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">by</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">5</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">universities,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">but</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">didn't</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">miss</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">my</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">purpose.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">I'm</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">not</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">late</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">to</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">my</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">season—I'm</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">preparing</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">to</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">last.</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">If</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">you're</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">building</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">something</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">meaningful</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">and</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">need</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">someone</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">who</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">ships</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">with</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">ownership,</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">let's</span>
            <span className="reveal-word inline-block text-foreground opacity-0 mr-2">talk.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
