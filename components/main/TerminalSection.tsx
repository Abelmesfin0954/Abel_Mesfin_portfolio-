'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTerminal, FiCode, FiCpu, FiServer, FiUser, FiMail, 
  FiGithub, FiLinkedin, FiExternalLink, FiBriefcase,
  FiAward, FiBook, FiGlobe, FiPhone, FiMapPin, FiDownload
} from 'react-icons/fi';

// Define command function type
type CommandFunction = (args: string[]) => React.ReactNode;

const TerminalSection = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    { 
      cmd: '', 
      output: (
        <div className="text-green-400">
          <div className="flex items-center mb-2">
            <FiTerminal className="mr-2" />
            <p className="text-xl font-bold">Abel Mesfin - Interactive Portfolio v3.0</p>
          </div>
          <p className="text-lg">Senior Full Stack Developer | Cloud Architect | TypeScript Expert</p>
          <p className="mt-3">Type <span className="text-yellow-300 font-mono">help</span> to see available commands</p>
          <div className="mt-4 p-3 bg-gray-700 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm">💡 <span className="font-bold">Quick Start:</span> Try <span className="font-mono text-yellow-300">about</span>, <span className="font-mono text-yellow-300">skills</span>, or <span className="font-mono text-yellow-300">projects --all</span></p>
          </div>
        </div>
      ) 
    }
  ]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Complete Abel Rodriguez profile data
  const profile = {
    personal: {
      name: "Abel Mesfin",
      title: "Senior Full Stack Developer",
      email: "abel.rodriguez@dev.io",
      phone: "+251954889050",
      location: "Addis Ababa, Ethiopan",
      availability: "Open to new opportunities",
      website: "https://abel-dev.io",
      github: "https://github.com/abel-dev",
      linkedin: "https://linkedin.com/in/abel-rodriguez-dev",
      resume: "/abel-rodriguez-resume.pdf"
    },
    education: {
      degree: "B.Sc. Computer Science",
      university: "Stanford University",
      year: "2024",
      honors: "Graduated with Honors (GPA: 3.8/4.0)",
      thesis: "Optimizing React Rendering Performance in Large-Scale Applications"
    },
    about: {
      bio: "Passionate full-stack engineer with 7+ years of experience building scalable web applications. Specializing in TypeScript, React, Node.js, and cloud architectures. Strong advocate for clean code, performance optimization, and mentoring junior developers.",
      specialties: [
        "TypeScript/JavaScript Ecosystem",
        "React & Next.js Optimization",
        "Cloud-Native Architectures",
        "DevOps & CI/CD Pipelines",
        "Technical Leadership"
      ],
      certifications: [
        "AWS Certified Solutions Architect - Professional",
        "Google Cloud Professional Engineer",
        "Microsoft Certified: TypeScript Developer",
        "Docker Certified Associate"
      ]
    },
    skills: {
      languages: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
      frontend: ["React", "Next.js", "Redux", "Tailwind CSS", "GraphQL"],
      backend: ["Node.js", "Express", "NestJS", "Django", "Spring Boot"],
      databases: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma"],
      devops: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform"],
      tools: ["Git", "Webpack", "Jest", "Cypress", "Postman"]
    },
    experience: [
      {
        role: "Lead Full Stack Developer",
        company: "TechNova Inc.",
        period: "2024 - Present",
        location: "San Francisco, CA",
        achievements: [
          "Led migration from monolithic to microservices architecture, improving scalability by 300%",
          "Implemented performance optimizations that reduced page load times by 65%",
          "Mentored 5 junior developers, promoting 2 to mid-level positions",
          "Architected CI/CD pipeline reducing deployment times from 30min to 3min"
        ],
        tech: ["TypeScript", "React", "Node.js", "AWS", "MongoDB"]
      },
      {
        role: "Senior Frontend Engineer",
        company: "Digital Solutions LLC",
        period: "2022 - 2024",
        location: "Remote",
        achievements: [
          "Spearheaded TypeScript adoption across all frontend projects",
          "Created design system used by 30+ products with 95% component reuse",
          "Reduced bundle size by 40% through code splitting and lazy loading",
          "Implemented automated visual regression testing saving 20h/week"
        ],
        tech: ["JavaScript", "React", "Redux", "Webpack", "Jest"]
      },
      {
        role: "Full Stack Developer",
        company: "WebCraft Studios",
        period: "2023 - 2024",
        location: "Palo Alto, CA",
        achievements: [
          "Developed 15+ client websites with 100% on-time delivery",
          "Introduced automated testing reducing production bugs by 60%",
          "First employee promoted to mid-level within 1 year",
          "Optimized database queries improving API response times by 75%"
        ],
        tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"]
      }
    ],
    projects: [
      {
        name: "NovaCommerce Platform",
        description: "Full-stack e-commerce solution handling 50k+ monthly transactions with real-time analytics dashboard",
        role: "Lead Developer",
        tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
        year: "2023",
        link: "https://novacommerce.abel-dev.io",
        features: [
          "Real-time inventory management",
          "Personalized recommendation engine",
          "Multi-vendor marketplace support",
          "Advanced analytics dashboard"
        ]
      },
      {
        name: "AI Content Studio",
        description: "GPT-4 powered content creation platform with collaborative editing and version control",
        role: "Architect",
        tech: ["React", "Python", "OpenAI API", "Firebase", "GCP"],
        year: "2024",
        link: "https://aicontent.abel-dev.io",
        features: [
          "Real-time collaborative editing",
          "Content version history",
          "AI style transfer",
          "Multi-format export"
        ]
      },
      {
        name: "CloudOps Dashboard",
        description: "Centralized monitoring for cloud infrastructure across AWS, GCP and Azure",
        role: "Sole Developer",
        tech: ["React", "WebSockets", "AWS", "Terraform", "Kubernetes"],
        year: "2024",
        link: "https://cloudops.abel-dev.io",
        features: [
          "Real-time resource monitoring",
          "Cost optimization alerts",
          "Incident management system",
          "Automated reporting"
        ]
      }
    ],
    achievements: [
      "Promoted to Lead Developer in 2.5 years at TechNova",
      "Recipient of TechNova Innovation Award 2022",
      "Speaker at ReactConf 2021 on Performance Optimization",
      "Open source contributor to Next.js and Prisma"
    ]
  };

  // Define commands with proper typing
  const commands: Record<string, CommandFunction> = {
    help: () => (
      <div className="space-y-3">
        <div className="flex items-center text-green-400">
          <FiTerminal className="mr-2" />
          <p className="font-bold">Available Commands</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-1">
            <p><span className="text-yellow-300 font-mono">about</span> - Professional summary</p>
            <p><span className="text-yellow-300 font-mono">skills</span> - Technical capabilities</p>
            <p><span className="text-yellow-300 font-mono">experience</span> - Work history</p>
            <p><span className="text-yellow-300 font-mono">education</span> - Academic background</p>
          </div>
          <div className="space-y-1">
            <p><span className="text-yellow-300 font-mono">projects</span> - Portfolio work</p>
            <p><span className="text-yellow-300 font-mono">contact</span> - Get in touch</p>
            <p><span className="text-yellow-300 font-mono">resume</span> - Download CV</p>
            <p><span className="text-yellow-300 font-mono">clear</span> - Reset terminal</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            <span className="font-bold">Tip:</span> Press <span className="font-mono">↑/↓</span> to navigate command history
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Try <span className="font-mono text-yellow-300">theme --light</span> for light mode
          </p>
        </div>
      </div>
    ),
    
    about: () => (
      <div className="space-y-6">
        <div className="flex items-center text-green-400">
          <FiUser className="mr-2" />
          <p className="font-bold">Professional Profile</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 p-5 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{profile.personal.name}</h3>
            <p className="text-blue-400 mb-3">{profile.personal.title}</p>
            <p className="mb-4">{profile.about.bio}</p>
            
            <div className="space-y-3">
              <div>
                <p className="font-bold text-sm text-gray-400">SPECIALTIES</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {profile.about.specialties.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="font-bold text-sm text-gray-400">RECENT ACHIEVEMENTS</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {profile.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="p-5 bg-gray-700 rounded-lg">
              <p className="font-bold text-sm text-gray-400 mb-3">CORE TECHNOLOGIES</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.languages.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-600 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-5 bg-gray-700 rounded-lg">
              <p className="font-bold text-sm text-gray-400 mb-3">CERTIFICATIONS</p>
              <ul className="space-y-2">
                {profile.about.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">▹</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    
    skills: () => (
      <div className="space-y-6">
        <div className="flex items-center text-green-400">
          <FiCode className="mr-2" />
          <p className="font-bold">Technical Skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(profile.skills).map(([category, skills]) => (
            <div key={category} className="p-5 bg-gray-700 rounded-lg">
              <p className="font-bold text-blue-400 mb-3 capitalize">{category}</p>
              <ul className="space-y-2">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-400 mr-2">▸</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    
    experience: () => (
      <div className="space-y-8">
        <div className="flex items-center text-green-400">
          <FiBriefcase className="mr-2" />
          <p className="font-bold">Professional Experience</p>
        </div>
        
        {profile.experience.map((job, i) => (
          <div key={i} className="p-6 bg-gray-700 rounded-lg border-l-4 border-purple-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-lg font-bold">{job.role}</h3>
                <p className="text-blue-400">{job.company}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {job.period} | {job.location}
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech, j) => (
                    <span key={j} className="px-2 py-1 bg-gray-600 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <ul className="mt-5 space-y-3">
              {job.achievements.map((achievement, k) => (
                <li key={k} className="flex">
                  <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▸</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
    
    education: () => (
      <div className="space-y-6">
        <div className="flex items-center text-green-400">
          <FiBook className="mr-2" />
          <p className="font-bold">Education & Training</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-bold">{profile.education.degree}</h3>
            <p className="text-blue-400">{profile.education.university}</p>
            <p className="text-gray-400 mt-1">Graduated: {profile.education.year}</p>
            
            <div className="mt-5 space-y-3">
              <div>
                <p className="font-bold text-sm text-gray-400">THESIS</p>
                <p className="mt-1">{profile.education.thesis}</p>
              </div>
              
              <div>
                <p className="font-bold text-sm text-gray-400">ACHIEVEMENTS</p>
                <p className="mt-1">{profile.education.honors}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-bold">Professional Development</h3>
            <p className="text-blue-400">Continuous Learning</p>
            
            <div className="mt-5 space-y-4">
              {profile.about.certifications.map((cert, i) => (
                <div key={i} className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                  <div>
                    <p className="font-medium">{cert}</p>
                    {i === 0 && (
                      <p className="text-sm text-gray-400 mt-1">Current through 2025</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    
    projects: (args: string[]) => {
      const showAll = args.includes('--all');
      const projectsToShow = showAll ? profile.projects : [profile.projects[0]];
      
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-400">
              <FiTerminal className="mr-2" />
              <p className="font-bold">
                {showAll ? 'Project Portfolio' : 'Featured Project'}
              </p>
            </div>
            {!showAll && (
              <button 
                onClick={() => {
                  const newCmd = 'projects --all';
                  setInput(newCmd);
                  setCmdHistory(prev => [...prev, newCmd]);
                  setHistory(prev => [...prev, { 
                    cmd: newCmd, 
                    output: commands.projects(['--all']) 
                  }]);
                  inputRef.current?.focus();
                }}
                className="text-sm text-blue-400 hover:underline flex items-center"
              >
                View All Projects <FiExternalLink className="ml-1" />
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {projectsToShow.map((project, i) => (
              <div key={i} className="p-6 bg-gray-700 rounded-lg border-l-4 border-yellow-500">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-blue-400">{project.role} | {project.year}</p>
                    <p className="mt-2">{project.description}</p>
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 md:mt-0 inline-flex items-center text-sm text-gray-300 hover:text-white"
                  >
                    Live Demo <FiExternalLink className="ml-1" />
                  </a>
                </div>
                
                <div className="mt-5">
                  <p className="font-bold text-sm text-gray-400 mb-2">KEY FEATURES</p>
                  <ul className="space-y-2">
                    {project.features.map((feature, j) => (
                      <li key={j} className="flex">
                        <span className="text-green-400 mr-2">▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-5">
                  <p className="font-bold text-sm text-gray-400 mb-2">TECHNOLOGY STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, k) => (
                      <span key={k} className="px-3 py-1 bg-gray-600 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
    
    contact: () => (
      <div className="space-y-6">
        <div className="flex items-center text-green-400">
          <FiMail className="mr-2" />
          <p className="font-bold">Contact Information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 bg-gray-700 rounded-lg flex items-start">
            <div className="bg-blue-500/20 p-3 rounded-full mr-4">
              <FiMail className="text-blue-400" />
            </div>
            <div>
              <p className="font-bold">Email</p>
              <p className="text-gray-300">{profile.personal.email}</p>
              <p className="text-xs text-gray-500 mt-2">Preferred contact method</p>
            </div>
          </div>
          
          <div className="p-5 bg-gray-700 rounded-lg flex items-start">
            <div className="bg-green-500/20 p-3 rounded-full mr-4">
              <FiPhone className="text-green-400" />
            </div>
            <div>
              <p className="font-bold">Phone</p>
              <p className="text-gray-300">{profile.personal.phone}</p>
              <p className="text-xs text-gray-500 mt-2">Available 9AM-5PM PST</p>
            </div>
          </div>
          
          <div className="p-5 bg-gray-700 rounded-lg flex items-start">
            <div className="bg-yellow-500/20 p-3 rounded-full mr-4">
              <FiGlobe className="text-yellow-400" />
            </div>
            <div>
              <p className="font-bold">Website & Profiles</p>
              <div className="mt-2 space-y-2">
                <a href={profile.personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-white">
                  <FiExternalLink className="mr-2" /> Portfolio
                </a>
                <a href={profile.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-white">
                  <FiGithub className="mr-2" /> GitHub
                </a>
                <a href={profile.personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-white">
                  <FiLinkedin className="mr-2" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-700 rounded-lg flex items-start">
            <div className="bg-purple-500/20 p-3 rounded-full mr-4">
              <FiMapPin className="text-purple-400" />
            </div>
            <div>
              <p className="font-bold">Location</p>
              <p className="text-gray-300">{profile.personal.location}</p>
              <p className="text-xs text-gray-500 mt-2">Open to remote or hybrid roles</p>
            </div>
          </div>
        </div>
      </div>
    ),
    
    resume: () => {
      window.open(profile.personal.resume, '_blank');
      return (
        <p className="text-green-400">
          Opening resume in new tab... <span className="text-gray-400">(If download doesn&apos;t start, check pop-up blocker)</span>
        </p>
      );
    },
    
    github: () => {
      window.open(profile.personal.github, '_blank');
      return <p className="text-green-400">Opening GitHub profile in new tab...</p>;
    },
    
    linkedin: () => {
      window.open(profile.personal.linkedin, '_blank');
      return <p className="text-green-400">Opening LinkedIn profile in new tab...</p>;
    },
    
    theme: (args: string[]) => {
      if (args.includes('--dark')) {
        setTheme('dark');
        return <p className="text-green-400">Terminal theme set to dark mode</p>;
      } else if (args.includes('--light')) {
        setTheme('light');
        return <p className="text-green-400">Terminal theme set to light mode</p>;
      }
      return <p className="text-red-400">Usage: theme --dark or theme --light</p>;
    },
    
    clear: () => {
      setHistory([]);
      return null;
    },
    
    // Easter egg command
    sudo: () => {
      return (
        <div className="text-red-400">
          <p>Permission denied: unable to escalate privileges</p>
          <p className="mt-2">But you can try:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><span className="font-mono text-yellow-300">contact</span> to connect directly</li>
            <li><span className="font-mono text-yellow-300">resume</span> to download my CV</li>
          </ul>
        </div>
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const inputParts = input.split(' ');
    const cmd = inputParts[0].toLowerCase();
    const args = inputParts.slice(1);

    // Add to command history
    setCmdHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    let output: React.ReactNode;
    
    if (commands[cmd]) {
      output = commands[cmd](args);
    } else {
      output = (
        <div className="text-red-400">
          <p>Command not found: {cmd}</p>
          <p>Type <span className="text-yellow-300 font-mono">help</span> for available commands</p>
        </div>
      );
    }

    if (cmd !== 'clear') {
      setHistory(prev => [...prev, { cmd: input, output }]);
    }

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && cmdHistory.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : cmdHistory.length - 1;
      setHistoryIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.toLowerCase();
      const matchingCmd = Object.keys(commands).find(c => c.startsWith(currentInput));
      if (matchingCmd) {
        setInput(matchingCmd);
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <FiTerminal className="inline mr-3 text-green-400" />
            {profile.personal.name.split(' ')[0].toLowerCase()}@portfolio:~$
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Interactive developer console - type <span className="font-mono text-yellow-500">help</span> to explore
          </p>
        </motion.div>

        <div className={`rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`flex items-center px-5 py-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {profile.personal.name} - Interactive Portfolio
            </div>
          </div>

          <div 
            ref={terminalRef}
            className={`p-5 font-mono h-[34rem] overflow-y-auto terminal-scrollbar ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
          >
            <AnimatePresence>
              {history.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5"
                >
                  {item.cmd && (
                    <div className="flex items-baseline mb-2">
                      <span className="text-green-400">user@portfolio:~$</span>
                      <span className="ml-2">{item.cmd}</span>
                    </div>
                  )}
                  <div>{item.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex items-baseline mt-6">
              <span className="text-green-400">user@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`bg-transparent border-none outline-none ml-2 flex-grow ${theme === 'dark' ? 'text-white' : 'text-gray-900'} caret-green-400`}
                autoFocus
                aria-label="Terminal input"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1f2937' : '#f3f4f6'};
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#4b5563' : '#d1d5db'};
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default TerminalSection;