'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.a
      href="/"
      className={`flex items-center gap-2 ${className} cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Mountain Logo */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle outline */}
          <circle cx="50" cy="50" r="45" stroke="#000000" strokeWidth="3" fill="white"/>
          
          {/* Mountain range - three peaks */}
          {/* Left peak */}
          <path d="M20 70 L35 45 L50 55 L50 70 Z" fill="#000000"/>
          {/* Center peak (tallest) */}
          <path d="M35 70 L50 35 L65 45 L65 70 Z" fill="#000000"/>
          {/* Right peak */}
          <path d="M50 70 L65 50 L80 60 L80 70 Z" fill="#000000"/>
          
          {/* Snow caps/highlights on peaks */}
          <path d="M35 45 L40 40 L45 45 L50 55 L50 50 L45 45 Z" fill="white"/>
          <path d="M50 35 L55 30 L60 35 L65 45 L65 40 L60 35 Z" fill="white"/>
          <path d="M65 50 L70 45 L75 50 L80 60 L80 55 L75 50 Z" fill="white"/>
          
          {/* Sun/Moon in upper right */}
          <circle cx="75" cy="25" r="8" fill="#000000"/>
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 text-lg leading-none">Hill</span>
        <span className="font-medium text-gray-600 text-sm leading-none">Hub</span>
      </div>
    </motion.a>
  );
} 