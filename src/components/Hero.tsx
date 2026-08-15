import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import ImageLabModal from './ImageLabModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden font-['Outfit'] selection:bg-teal-900/50">
      {/* Readability scrim over the cinematic background (keeps the animation visible) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,5,8,0.55) 0%, rgba(3,5,8,0.18) 20%, rgba(3,5,8,0.06) 45%, rgba(3,5,8,0.30) 78%, rgba(3,5,8,0.58) 100%),' +
            'radial-gradient(ellipse at center, rgba(3,5,8,0.30) 0%, rgba(3,5,8,0) 58%)',
        }}
      />
      
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 max-w-[1920px] mx-auto w-full"
      >
        <div className="text-[17px] md:text-[19px] font-medium tracking-wide">
          Astralynx
        </div>
        <div className="hidden md:flex items-center gap-10 text-[13px] md:text-[14px] text-gray-200 font-light">
          <a href="#about-denali" className="hover:text-white transition-colors">Discover</a>
          <a href="#about-denali" className="hover:text-white transition-colors">Missions</a>
          <a href="#about-denali" className="hover:text-white transition-colors">About Us</a>
        </div>
      </motion.nav>

      {/* Main Center Content */}
      <main className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex flex-col items-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-[2.5rem] md:text-[4rem] font-medium tracking-tight leading-[1.05] mb-5 text-white"
        >
          Beyond the Horizon <br />
          Discover Denali
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-gray-300 font-light text-[13px] md:text-[14px] max-w-[440px] leading-[1.6] mb-8"
        >
          Journey into Alaska's wild heart, where towering peaks,<br className="hidden md:block" />
          endless wilderness, and unforgettable encounters await.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 bg-[#1A6482] hover:bg-[#1A6482]/90 text-white px-6 py-2.5 rounded-[4px] text-[13px] font-medium transition-all"
        >
          Explore Denali
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </main>

      {/* Bottom Content */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 px-6 py-8 md:px-12 md:py-12 max-w-[1920px] mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-10">
        
        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="w-full max-w-[500px]"
        >
          <h2 className="text-[1.5rem] md:text-[2rem] font-medium leading-[1.25] text-gray-100 tracking-tight">
            Where every horizon<br />
            <span className="text-gray-300">
              reveals something <span className="font-['Playfair_Display'] italic tracking-normal text-teal-100/90 font-normal">extraordinary.</span>
            </span>
          </h2>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.72 }}
          className="w-full max-w-[320px] text-left md:text-right flex flex-col items-start md:items-end"
        >
          <p className="text-[12px] md:text-[13px] text-gray-400 font-light leading-[1.65] mb-4">
            From towering mountain ranges to untouched wilderness,<br className="hidden md:block" />
            Denali invites you to slow down, look closer, and<br className="hidden md:block" />
            experience Alaska at its most remarkable.
          </p>
          <a href="#about-denali" className="relative text-[12px] md:text-[13px] text-gray-300 hover:text-white transition-colors font-light tracking-wide flex items-center justify-end border-b border-gray-600/60 pb-1 hover:border-white/60">
            Plan Your Journey
          </a>
        </motion.div>
      </footer>

      {/* Image Lab Modal */}
      <ImageLabModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
