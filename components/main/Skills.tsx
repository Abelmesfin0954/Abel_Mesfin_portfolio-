"use client";
import { All_Skills } from "@/constants";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isIPhone, setIsIPhone] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Detect iPhone users
    const isAppleDevice = /iPhone|iPod|iPad/.test(navigator.userAgent);
    setIsIPhone(isAppleDevice);
    
    const handleResize = () => {
      if (containerRef.current) {
        setMaxScroll(
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        );
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (direction: "prev" | "next") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = isIPhone ? container.clientWidth * 0.85 : container.clientWidth * 0.5;
    const newPosition =
      direction === "next"
        ? Math.min(scrollPosition + scrollAmount, maxScroll)
        : Math.max(scrollPosition - scrollAmount, 0);

    container.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
    setScrollPosition(newPosition);
  };

  // Group skills by category
  const skillsByCategory = All_Skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof All_Skills>);

  return (
    <section 
      id="skills" 
      className="relative py-10 px-4 max-w-[100vw] overflow-hidden"
      style={{
        // iPhone notch/pill area padding
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        paddingBottom: 'env(safe-area-inset-bottom))'
      }}
    >
      {/* Gradient background optimized for iPhone screens */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[120vw] -translate-x-1/2 -translate-y-1/4">
          <div className="aspect-square w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      <SkillText />

      {/* Skills slider container */}
      <div className="relative">
        {/* Navigation buttons - iPhone optimized */}
        <button
          onClick={() => scrollTo("prev")}
          disabled={scrollPosition <= 0}
          className={`absolute -left-1 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 active:scale-90 transition-all ${
            scrollPosition <= 0 ? "opacity-40" : "opacity-100"
          }`}
          style={{
            // Avoid Home Indicator on newer iPhones
            bottom: 'env(safe-area-inset-bottom, 20px)'
          }}
          aria-label="Previous skills"
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <button
          onClick={() => scrollTo("next")}
          disabled={scrollPosition >= maxScroll}
          className={`absolute -right-1 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 active:scale-90 transition-all ${
            scrollPosition >= maxScroll ? "opacity-40" : "opacity-100"
          }`}
          style={{
            // Avoid Home Indicator on newer iPhones
            bottom: 'env(safe-area-inset-bottom, 20px)'
          }}
          aria-label="Next skills"
        >
          <ChevronRight className="h-7 w-7 text-white" />
        </button>

        {/* Skills track with iPhone specific tweaks */}
        <div
          ref={containerRef}
          className="overflow-x-auto no-scrollbar py-2 px-2"
          style={{
            // Account for iPhone notches
            paddingLeft: 'env(safe-area-inset-left, 0px)',
            paddingRight: 'env(safe-area-inset-right, 0px)',
            WebkitOverflowScrolling: 'touch' // Smooth iOS scrolling
          }}
          onScroll={(e) => {
            setScrollPosition((e.target as HTMLDivElement).scrollLeft);
          }}
        >
          <div className="flex space-x-4 w-max">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                className="flex-shrink-0 w-[85vw] max-w-[320px] bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                style={{
                  // Perfect width for all iPhones
                  width: 'calc(100vw - 3rem)',
                  maxWidth: 'min(320px, 85vw)'
                }}
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2" />
                  {category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <SkillDataProvider
                      key={`${skill.skill_name}-${index}`}
                      {...skill}
                      index={index}
                      isIPhone={isIPhone}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll position indicator (hidden on iPhones) */}
      {!isIPhone && (
        <div className="mt-6 flex justify-center">
          <div className="h-1 bg-gray-700 rounded-full w-64 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
              animate={{
                width: maxScroll > 0 ? `${(scrollPosition / maxScroll) * 100}%` : "0%"
              }}
              transition={{ type: "spring", damping: 20 }}
            />
          </div>
        </div>
      )}

      {/* Floating elements - positioned safely */}
      <div 
        className="absolute top-10 left-4 w-3 h-3 rounded-full bg-purple-500/30 blur-xl"
        style={{ left: 'max(1rem, env(safe-area-inset-left))' }}
      />
      <div 
        className="absolute bottom-6 right-4 w-4 h-4 rounded-full bg-blue-500/30 blur-xl"
        style={{ right: 'max(1rem, env(safe-area-inset-right))' }}
      />
    </section>
  );
};

export default Skills;