'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear submit error when user types
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d0a1f] to-[#1a1446] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-[#7042f88b] rounded-full py-2 px-4 mb-4"
          >
            <span className="text-sm font-medium text-white">
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            variants={fadeIn}
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Connect</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Have a project in mind or want to discuss opportunities? Reach out and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-gradient-to-br from-[#0f0c29]/50 to-[#302b63]/50 border border-white/10 backdrop-blur-sm rounded-2xl p-8 h-full"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <motion.div className="flex items-start" variants={fadeIn}>
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl flex-shrink-0 mr-4">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <a href="mailto:abel@amwic.com" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      abel@amwic.com
                    </a><br />
                    <a href="mailto:mesfinabel511@gmail.com" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      mesfinabel511@gmail.com
                    </a><br />
                  </div>
                </motion.div>
                
                <motion.div className="flex items-start" variants={fadeIn}>
                  <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-3 rounded-xl flex-shrink-0 mr-4">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                    <a href="tel:+251954889050" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      +251 954-88-90-50
                    </a> <br />
                    <a href="tel:+251990353338" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      +251 990-35-33-38
                    </a>
                  </div>
                </motion.div>
                
                <motion.div className="flex items-start" variants={fadeIn}>
                  <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-3 rounded-xl flex-shrink-0 mr-4">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-300">
                      Addis Aababa, Ethiopa
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12"
                variants={fadeIn}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'GitHub', icon: 'github', color: 'hover:text-gray-300', link: '#' },
                    { name: 'LinkedIn', icon: 'linkedin', color: 'hover:text-blue-400', link: '#' },
                    { name: 'Twitter', icon: 'twitter', color: 'hover:text-cyan-400', link: '#' },
                    { name: 'Dribbble', icon: 'dribbble', color: 'hover:text-pink-400', link: '#' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 text-xl ${social.color} transition-colors`}
                      whileHover={{ y: -5 }}
                      variants={fadeIn}
                    >
                      <i className={`fab fa-${social.icon}`}></i>
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-gradient-to-br from-[#0f0c29]/50 to-[#302b63]/50 border border-white/10 backdrop-blur-sm rounded-2xl p-8 h-full"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Send me a message</h3>
              
              {submitSuccess ? (
                <motion.div 
                  className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-green-400 text-5xl mb-4">✓</div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-300">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : null}
              
              {submitError && (
                <motion.div 
                  className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-circle text-red-400 text-xl mr-3"></i>
                    <p className="text-red-300">{submitError}</p>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
                <input type="hidden" name="redirect" value="https://yourdomain.com/thank-you" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[#0f0c29]/30 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <span className="absolute right-3 top-3 text-red-500">
                          <i className="fas fa-exclamation-circle"></i>
                        </span>
                      )}
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-[#0f0c29]/30 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <span className="absolute right-3 top-3 text-red-500">
                          <i className="fas fa-exclamation-circle"></i>
                        </span>
                      )}
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0f0c29]/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="What's this about?"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-[#0f0c29]/30 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Your message here..."
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && (
                      <span className="absolute right-3 top-3 text-red-500">
                        <i className="fas fa-exclamation-circle"></i>
                      </span>
                    )}
                  </div>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-cyan-600 hover:shadow-lg'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5 mr-2 rotate-45" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;