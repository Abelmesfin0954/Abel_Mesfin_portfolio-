'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiUser, FiStar } from 'react-icons/fi';
import Image from 'next/image';

const TestimonialsAndBlog = () => {
  // Testimonial data with enhanced details
  const testimonials = [
    {
      id: 1,
      name: "Addis Ababa Science and Technology University:AASTU",
      role: "CEO, TechSolutions Inc.",
      content: "Abel's mobile app design increased our user retention by 35%. His attention to accessibility standards was particularly impressive.",
      rating: 5,
      image: "/testimonials/aastu.jpg",
      project: "Mobile Banking App",
      date: "March 2024"
    },
    {
    id: 2,
    name: "Ministry of Education, Ethiopia",
    role: "Digital Transformation Consultant",
    content: "Abel built a nationwide school directory platform with advanced filtering and role-based admin control. Highly efficient and reliable.",
    rating: 5,
    image: "/testimonials/moe.jpeg",
    project: "National School Directory System",
    date: "January 2025"
  },
    {
      id: 3,
      name: "Gelan General Secondary School",
      role: "School TechSolutions, InnovateCo",
      content: "Abel delivered our School web platform 2 weeks ahead of schedule with pixel-perfect implementation. His React optimizations improved our load times by 40%.",
      rating: 5,
      image: "/testimonials/Gelan logo.jpg",
      project: "School Platform",
      date: "January 2024"
    },
   {
  id: 4,
  name: "Google Launchpad ",
  role: "Mentorship & Acceleration Team",
  content: "Abel’s e-commerce and delivery platform showed exceptional promise during the Launchpad mentorship sprint. His ability to merge front-end excellence with real-world business needs was commendable.",
  rating: 5,
  image: "/testimonials/google-launchpad-barcelona.png",
  project: "E-Commerce Platform Acceleration",
  date: "August 2024"
},
 
  {
    id: 5,
    name: "Deratu Secondary School",
    role: "School Board Representative",
    content: "Abel’s work ethic is unmatched. He delivered a full-featured website with admin tools and student dashboards that exceeded our expectations.",
    rating: 5,
    image: "/testimonials/derartu.jpg",
    project: "Interactive School Web App",
    date: "May 2024"
  },
    // Add 3-5 more
  ];

  // Blog articles with richer data
  const articles = [
  {
    id: 1,
    title: "Advanced React Performance Patterns",
    excerpt: "Explore cutting-edge techniques for optimizing React applications using memoization, concurrent rendering, and bundle splitting.",
    date: "May 15, 2024",
    category: "Frontend",
    readTime: "8 min read",
    image: "/blog/burger.jpg",
    tags: ["React", "Performance", "JavaScript"]
  },
  {
    id: 2,
    title: "Building AI-Powered Web Applications",
    excerpt: "A practical guide to integrating GPT-4 into your web apps while maintaining performance and user privacy.",
    date: "April 28, 2024",
    category: "AI",
    readTime: "12 min read",
    image: "/blog/company profiel.jpg",
    tags: ["AI", "Next.js", "Web Development"]
  },
  {
    id: 3,
    title: "Designing Scalable E-Commerce Systems in Ethiopia",
    excerpt: "Learn how to architect full-stack platforms for Ethiopian marketplaces with local payment integration and delivery workflows.",
    date: "April 10, 2024",
    category: "Full-Stack",
    readTime: "10 min read",
    image: "/blog/ecommerce.jpg",
    tags: ["E-Commerce", "Architecture", "Payment Integration"]
  },
  {
    id: 4,
    title: "Creating a Multilingual Chatbot UI with React",
    excerpt: "A step-by-step guide to building a user interface for multilingual AI chatbots like AbelGPT using React and Tailwind.",
    date: "March 30, 2024",
    category: "Frontend",
    readTime: "7 min read",
    image: "/blog/protfolio.jpg",
    tags: ["Chatbot", "Multilingual", "React"]
  },
  {
    id: 5,
    title: "Deploying Full-Stack Apps with Vite + Node.js",
    excerpt: "Speed up your dev workflow by deploying modern full-stack applications using Vite, Express, and PostgreSQL.",
    date: "March 12, 2024",
    category: "DevOps",
    readTime: "9 min read",
    image: "/blog/school derartu.jpg",
    tags: ["Vite", "Node.js", "Deployment"]
  },
  // New additions below
  {
    id: 6,
    title: "Ethiopian Digital Payment Systems: A Developer's Guide",
    excerpt: "Deep dive into implementing CBE Birr, Telebirr, and other local payment gateways in web applications.",
    date: "February 25, 2024",
    category: "Backend",
    readTime: "11 min read",
    image: "/blog/school gelan.jpg",
    tags: ["Payments", "Ethiopia", "Fintech"]
  },
  {
    id: 7,
    title: "Real-Time Dashboards with Socket.io and React",
    excerpt: "Build responsive admin dashboards with live data updates using Socket.io for Ethiopian logistics applications.",
    date: "February 8, 2024",
    category: "Full-Stack",
    readTime: "6 min read",
    image: "/blog/slade food.jpg",
    tags: ["Socket.io", "Data Visualization", "React"]
  },
];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState('testimonials');
  const [direction, setDirection] = useState(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <section id="testimonials-blog" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-600 mb-4">
            Client Voices & Technical Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional endorsements and thought leadership in modern web development
          </p>
        </motion.div>

        {/* Animated Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'testimonials' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Client Testimonials
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'blog' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Technical Articles
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        {activeTab === 'testimonials' ? (
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-indigo-500"></div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {testimonials[currentTestimonial].project} • {testimonials[currentTestimonial].date}
                      </p>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6 relative pl-4 border-l-2 border-teal-400">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i}
                            className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].rating}/5 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" /> {article.date}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {article.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium group transition-colors"
                  >
                    Read article
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsAndBlog;