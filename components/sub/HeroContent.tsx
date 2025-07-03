'use client';
import { FaReact, FaNodeJs, FaAws, FaPython } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { SparklesIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

// Type definitions
type Bubble = {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  delay: number;
};

type TechIcon = {
  icon: React.ReactNode;
  top: string;
  left: string;
  delay: number;
  title: string;
};

type TechStack = {
  name: string;
  icon: string;
  color: string;
};

const HeroContent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Constants
  const bubbles: Bubble[] = [
    { id: 1, top: '15%', left: '10%', width: '150px', height: '150px', delay: 0 },
    { id: 2, top: '25%', left: '80%', width: '120px', height: '120px', delay: 0.2 },
    { id: 3, top: '60%', left: '15%', width: '180px', height: '180px', delay: 0.4 },
    { id: 4, top: '70%', left: '75%', width: '100px', height: '100px', delay: 0.6 },
    { id: 5, top: '85%', left: '50%', width: '160px', height: '160px', delay: 0.8 }
  ];

  const techIcons: TechIcon[] = [
    { 
      icon: <i className="fas fa-server text-purple-400 text-xl" />, 
      top: '10%', 
      left: '20%', 
      delay: 0.2,
      title: 'Backend'
    },
    { 
      icon: <i className="fas fa-cloud text-cyan-400 text-xl" />, 
      top: '15%', 
      left: '75%', 
      delay: 0.4,
      title: 'Cloud'
    },
    { 
      icon: <i className="fas fa-cogs text-purple-300 text-xl" />, 
      top: '50%', 
      left: '10%', 
      delay: 0.6,
      title: 'DevOps'
    },
    { 
      icon: <i className="fas fa-code text-cyan-300 text-xl" />, 
      top: '70%', 
      left: '80%', 
      delay: 0.8,
      title: 'Frontend'
    },
    { 
      icon: <i className="fas fa-database text-cyan-400 text-xl" />, 
      top: '85%', 
      left: '35%', 
      delay: 1.0,
      title: 'Database'
    },
    { 
      icon: <div className="text-purple-400 font-bold text-sm">API</div>, 
      top: '45%', 
      left: '85%', 
      delay: 1.2,
      title: 'API'
    },
  ];

  const techStack: TechStack[] = [
    { name: 'React', icon: 'react', color: 'text-cyan-400' },
    { name: 'Node.js', icon: 'node-js', color: 'text-green-500' },
    { name: 'AWS', icon: 'aws', color: 'text-amber-500' },
    { name: 'Python', icon: 'python', color: 'text-blue-400' },
  ];

  // Animation variants
  const slideInFromTop: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const createSlideInFromLeft = (delay = 0): Variants => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay, ease: "easeOut" }
    }
  });

  const createSlideInFromRight = (delay = 0): Variants => ({
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay, ease: "easeOut" }
    }
  });

  const createFadeIn = (delay = 0): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay }
    }
  });

  const floatAnimation: Variants = {
    float: {
      y: ["0%", "-15%", "0%"],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const bubbleAnimation: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 1,
        delay: i * 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };

  // Render functions
  const renderBubbles = () => (
    <div className="absolute inset-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={bubbleAnimation}
          custom={bubble.id}
          style={{
            top: bubble.top,
            left: bubble.left,
            width: bubble.width,
            height: bubble.height,
          }}
        />
      ))}
    </div>
  );

  const renderTechIcons = () => (
    <>
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute bg-gray-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-full w-12 h-12 flex items-center justify-center shadow-lg tech-icon"
          style={{ top: item.top, left: item.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isMounted ? { 
            opacity: 1, 
            scale: [0.8, 1.1, 1],
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{
            duration: 0.5,
            delay: item.delay,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          title={item.title}
        >
          {item.icon}
        </motion.div>
      ))}
    </>
  );

  const renderTechStack = () => (
    <div className="flex -space-x-4">
      {techStack.map((tech, index) => (
        <motion.div 
          key={index}
          className={`w-10 h-10 rounded-full border-2 border-[#0f0c29] bg-gray-800 flex items-center justify-center tech-icon ${tech.color}`}
          whileHover={{ scale: 1.1, y: -5 }}
          title={tech.name}
        >
          <i className={`fab fa-${tech.icon} ${tech.color} text-xl`} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0d0a1f] via-[#1d1a40] to-[#0d0a1f]">
      {renderBubbles()}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          className="lg:w-1/2 w-full flex flex-col gap-6 lg:gap-8"
        >
          <motion.div
            variants={slideInFromTop}
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-[#7042f88b] rounded-full py-2.5 px-4 max-w-fit"
          >
            <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
            <span className="text-sm md:text-base font-medium text-white">
              Fullstack Developer Portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={createSlideInFromLeft(0.2)}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">digital experiences</span> that users love
          </motion.h1>

          <motion.p
            variants={createSlideInFromLeft(0.4)}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl"
          >
            I create performant web applications with modern stacks. Specializing in React, Node.js, and cloud solutions to craft seamless user experiences.
          </motion.p>

          <motion.div
            variants={createSlideInFromLeft(0.6)}
            className="flex flex-wrap gap-4 mt-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
              </svg>
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div 
            variants={createFadeIn(1)}
            className="mt-10 flex items-center gap-4"
          >
            {renderTechStack()}
            <p className="text-gray-400 text-sm">
              Working with modern tech stacks
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={createSlideInFromRight(0.4)}
          className="lg:w-1/2 w-full flex justify-center mt-16 lg:mt-0"
        >
          <div className="relative">
            <motion.div
              variants={floatAnimation}
              animate={isMounted ? "float" : {}}
              className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-tr from-[#1a1446] to-[#0c0a2f]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
                    <div className="bg-gray-800 border-2 border-cyan-500/20 rounded-full w-48 h-48 flex items-center justify-center">
                      <div className="bg-gray-900 border border-cyan-500/10 rounded-full w-40 h-40 flex items-center justify-center overflow-hidden">
                        <div className="bg-gradient-to-br from-purple-700/10 to-cyan-500/10 w-full h-full flex items-center justify-center">
                          <div className="text-5xl text-cyan-400 font-bold">JS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {renderTechIcons()}
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <span className="font-bold">5+ years</span> experience
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="font-bold">50+ projects</span> delivered
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-gray-400 mb-2 text-sm">Scroll to explore</p>
        <motion.div
          animate={isMounted ? { y: [0, 10, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDownIcon className="h-6 w-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;