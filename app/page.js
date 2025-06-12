"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiMail, FiClock, FiSend, FiTwitter, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set your launch date here (YYYY, MM-1, DD)
  const launchDate = new Date(2025, 11, 31).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Replace with your actual email sending service
      // This is a mock implementation - in production, use a service like EmailJS, SendGrid, etc.
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        name,
        email,
        message
      });
      
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      <motion.div
        className="w-full max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
            className="inline-flex items-center justify-center mb-6"
          >
            <FaRocket className="text-5xl text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-300">
            Edge Sphere
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
            We're building something extraordinary! 🚀 Our platform will revolutionize how you interact with technology.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FiClock className="text-2xl text-cyan-300" />
            <h2 className="text-2xl font-semibold">Launching Soon</h2>
          </div>
          <div className="flex justify-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-bold bg-black bg-opacity-30 rounded-lg px-4 py-2 min-w-[70px] text-center">
                {days}
              </div>
              <div className="text-sm mt-2 text-purple-200">Days</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-bold bg-black bg-opacity-30 rounded-lg px-4 py-2 min-w-[70px] text-center">
                {hours}
              </div>
              <div className="text-sm mt-2 text-purple-200">Hours</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-bold bg-black bg-opacity-30 rounded-lg px-4 py-2 min-w-[70px] text-center">
                {minutes}
              </div>
              <div className="text-sm mt-2 text-purple-200">Minutes</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-bold bg-black bg-opacity-30 rounded-lg px-4 py-2 min-w-[70px] text-center">
                {seconds}
              </div>
              <div className="text-sm mt-2 text-purple-200">Seconds</div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FiMail className="text-2xl text-cyan-300" />
            <h2 className="text-2xl font-semibold">Get Notified</h2>
          </div>
          <motion.div 
            className="bg-black bg-opacity-20 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto border border-purple-500 border-opacity-30"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-purple-100">We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-purple-100 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-purple-900 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-purple-900 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-purple-100 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg bg-purple-900 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                {submitError && (
                  <p className="mt-3 text-sm text-pink-300">{submitError}</p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-purple-200 mb-4">Connect with us</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-2xl hover:text-cyan-400 transition-colors">
              <FiTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 transition-colors">
              <FiLinkedin />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 transition-colors">
              <FiGithub />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 transition-colors">
              <FiInstagram />
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-16 text-sm text-purple-300">
          <p>© {new Date().getFullYear()} Edge Sphere. All rights reserved.</p>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ComingSoonPage;