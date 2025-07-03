'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiSearch, FiX, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';

const certificatesData = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    issuer: "Udacity",
    year: "2025",
    description: "Verified Nanodegree program covering core AI concepts, including machine learning, neural networks, and AI model optimization.",
    category: "Artificial Intelligence",
    link: "/certificates/AI___Udacity_4.pdf",
    featured: true,
    imageUrl: "/certificates/AI.jpg",
    skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "NLP"]
  },
  {
    id: 2,
    title: "Android Developer Fundamentals",
    issuer: "Udacity",
    year: "2024",
    description: "Completed Nanodegree program in Android development, covering mobile app design, development, and best practices.",
    category: "Mobile Development",
    link: "/certificates/android_fundamental.pdf",
    imageUrl: "/certificates/android developer.jpg",
    skills: ["Android", "Mobile Development", "Java/Kotlin", "UI/UX"]
  },
  {
    id: 3,
    title: "Data Analysis Fundamentals",
    issuer: "Udacity",
    year: "2024",
    description: "Verified Nanodegree program in data analysis, including data wrangling, visualization, and statistical methods.",
    category: "Data Science",
    link: "/certificates/data_analysis.pdf",
    imageUrl: "/certificates/data analysis.jpg",
    skills: ["Data Analysis", "Python", "Pandas", "Data Visualization"]
  },
  {
    id: 4,
    title: "Programming Fundamentals (HTML, CSS, JS)",
    issuer: "Udacity",
    year: "2024",
    description: "Nanodegree program covering foundational web development technologies.",
    category: "Web Development",
    link: "/certificates/fundamental_html.pdf",
    imageUrl: "/certificates/fundamental html css js.jpg",
    skills: ["HTML", "CSS", "JavaScript", "Frontend"]
  },
  {
    id: 5,
    title: "Data Science with Python",
    issuer: "Great Learning Academy",
    year: "2024",
    description: "Free online course covering Python for data science, including libraries like NumPy and Pandas.",
    category: "Data Science",
    link: "/certificates/AI___Udacity_4.pdf",
    imageUrl: "/certificates/Data Science.jpg",
    skills: ["Python", "Data Science", "NumPy", "Pandas"]
  },
  {
    id: 6,
    title: "Front End Development - HTML",
    issuer: "Great Learning Academy",
    year: "2024",
    description: "Free online course on HTML for building web interfaces.",
    category: "Web Development",
    link: "/certificates/AI___Udacity_4.pdf",
    imageUrl: "/certificates/great learn html front end .jpg",
    skills: ["HTML", "Web Development"]
  },
  {
    id: 7,
    title: "Java Programming",
    issuer: "Great Learning Academy",
    year: "2024",
    description: "Free online course covering Java programming basics and OOP concepts.",
    category: "Programming",
    imageUrl: "/certificates/java programing .jpg",
    skills: ["Java", "OOP", "Algorithms"]
  },
  {
    id: 8,
    title: "QR Code Generator in Python",
    issuer: "Great Learning Academy",
    year: "2024",
    description: "Free online course on generating QR codes using Python.",
    category: "Programming",
    imageUrl: "/certificates/qr generat with python.jpg",
    skills: ["Python", "QR Generation"]
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'Artificial Intelligence', name: 'AI' },
  { id: 'Mobile Development', name: 'Mobile' },
  { id: 'Data Science', name: 'Data Science' },
  { id: 'Web Development', name: 'Web' },
  { id: 'Programming', name: 'Programming' }
];

const CertificatesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCertificates = certificatesData.filter(cert => {
    const matchesCategory = activeFilter === 'all' || cert.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Certificates & Awards
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional certifications demonstrating expertise across multiple domains
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === category.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex gap-2 ml-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Certificates Display */}
        {filteredCertificates.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                    cert.featured ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {cert.featured && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
                  
                  <div className="relative h-48 overflow-hidden">
                    {cert.imageUrl ? (
                      <Image
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
                        <FiAward className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 p-3 rounded-lg">
                        <FiAward size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, index) => (
                        <span key={`${cert.id}-${index}`} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {cert.link && (
                      <a
                        href={cert.link}
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View certificate
                        <FiExternalLink className="ml-2" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCertificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                    cert.featured ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      {cert.imageUrl ? (
                        <Image
                          src={cert.imageUrl}
                          alt={`${cert.title} certificate`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        />
                      ) : (
                        <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
                          <FiAward className="text-gray-400 text-4xl" />
                        </div>
                      )}
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                        {cert.featured && (
                          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedCard === cert.id ? 'max-h-[500px]' : 'max-h-20'
                      }`}>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {cert.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cert.skills.map((skill, index) => (
                            <span key={`${cert.id}-${index}`} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleExpand(cert.id)}
                          className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                        >
                          {expandedCard === cert.id ? (
                            <>
                              Show less <FiChevronUp className="ml-1" />
                            </>
                          ) : (
                            <>
                              Read more <FiChevronDown className="ml-1" />
                            </>
                          )}
                        </button>
                        {cert.link && (
                          <a
                            href={cert.link}
                            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View certificate
                            <FiExternalLink className="ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center py-20"
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 dark:bg-gray-700 flex items-center justify-center">
              <FiAward className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No certificates found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;