'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' }
    }
  });

  return (
    <div
      id="about"
      className="relative w-full min-h-screen bg-gradient-to-br from-[#0d0a1f] via-[#1d1a40] to-[#0d0a1f] py-20 px-6 sm:px-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
        {/* Text */}
        <motion.div
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
          variants={fadeInUp(0)}
          className="lg:w-2/3 w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="h-6 w-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">About Me</h2>
          </div>

          <motion.p
            variants={fadeInUp(0.2)}
            className="text-gray-300 max-w-3xl text-lg mb-6"
          >
            I m <span className="text-white font-semibold">Abel Mesfin</span>, a full-stack web developer based in Ethiopia. I build responsive and powerful websites using React, Node.js, TailwindCSS, and modern cloud solutions.
          </motion.p>

          {/* Skills Cards */}
          <motion.div
            variants={fadeInUp(0.4)}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {[
              {
                title: 'Front-End Development',
                desc: 'React, Tailwind CSS, Vue, and more.',
                icon: 'fas fa-paint-brush'
              },
              {
                title: 'Back-End & APIs',
                desc: 'Node.js, Express, REST APIs.',
                icon: 'fas fa-server'
              },
              {
                title: 'Cloud & DevOps',
                desc: 'AWS, CI/CD, Docker & GitHub Actions.',
                icon: 'fas fa-cloud'
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp(0.5 + i * 0.2)}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <i className={`${card.icon} text-3xl text-cyan-400`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={fadeInUp(1.2)}
            className="mt-12 border-l-2 border-cyan-500/30 pl-6"
          >
            <h3 className="text-2xl text-white font-semibold mb-6">Experience & Education</h3>
            {[
              {
                year: '2025 - Present',
                title: 'Freelance Full-Stack Developer',
                desc: 'Delivering web solutions under Abel Mesfin Digital Solutions.'
              },
              {
                year: '2024 - 2025',
                title: 'Gelan Secondary School',
                desc: 'Grade 11 – Science Track + Web & Data Science Certifications.'
              },
              {
                year: '2023',
                title: 'Data Science with Python - Great Learning',
                desc: 'Completed foundational and intermediate data science courses.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="mb-8 relative"
                variants={fadeInUp(1.3 + i * 0.2)}
              >
                <div className="absolute left-[-33px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow" />
                <h4 className="text-white text-lg font-semibold">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.year}</p>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Download CV Button */}
          <motion.div
            variants={fadeInUp(1.9)}
            className="mt-10"
          >
            <a
              href="/Abel-Mesfin-CV.pdf" // Place this file in /public
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-transform hover:scale-105"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Photo */}
       
<motion.div
  initial="hidden"
  animate={isMounted ? 'visible' : 'hidden'}
  variants={fadeInUp(0.8)}
  className="lg:w-1/3 w-full flex justify-center"
>
  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-lg">
    <img
      src="abel.jpg" // Replace with your actual file in /public
      alt="Abel Mesfin"
      className="object-cover w-full h-full"
    />
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default About;
