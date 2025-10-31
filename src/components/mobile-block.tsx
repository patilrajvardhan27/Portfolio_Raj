"use client";

import { useEffect, useState } from "react";

export function MobileBlock() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Block viewport widths less than 768px (tablet and mobile)
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener with debounce for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedCheck);

    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="text-center space-y-4 sm:space-y-6 max-w-md">
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-8">💻</div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          Don&apos;t ruin your experience on mobile
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          See it on desktop
        </p>
      </div>
    </div>
  );
}
