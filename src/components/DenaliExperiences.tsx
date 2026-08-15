import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Compass, X } from 'lucide-react';
import Reveal from './Reveal';

interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  aspect: 'tall' | 'square';
  tag: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-01',
    number: '01',
    title: 'WILDLIFE ENCOUNTERS',
    description:
      'Meet the wild residents of Denali — from grizzlies and moose to caribou and Dall sheep — moving freely through one of Alaska’s most remarkable landscapes.',
    image:
      'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall',
    tag: 'Fauna & Habitats',
  },
  {
    id: 'exp-02',
    number: '02',
    title: 'THE LONG WAY NORTH',
    description:
      'Follow the road deep into the park, where every bend opens onto another vast Alaskan horizon.',
    image:
      'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square',
    tag: 'Park Road • Mile 0–92',
  },
  {
    id: 'exp-03',
    number: '03',
    title: 'WILDERNESS TRAILS',
    description:
      'Leave the road behind and walk into the silence of tundra, valleys, and open wilderness.',
    image:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall',
    tag: 'Backcountry Expedition',
  },
  {
    id: 'exp-04',
    number: '04',
    title: 'BENEATH THE ALASKAN SKY',
    description:
      'From endless summer light to winter’s aurora, Denali changes dramatically beneath the sky above it.',
    image:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square',
    tag: 'Aurora & Celestial Light',
  },
];

export default function DenaliExperiences() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  return (
    <section 
      id="experiences" 
      className="relative w-full text-white py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden font-['Outfit']"
    >
      {/* Subtle depth scrim (keeps white text readable while the cinematic background shows through) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(3,8,14,0.42) 0%, rgba(3,5,8,0.60) 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1760px] mx-auto">
        
        {/* Section Header: Left Editorial Headline, Right Paragraph & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-20">
          
          {/* Left Column: Large Display Heading */}
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.02] text-white uppercase">
              WAYS INTO <br />
              <span className="text-gray-300 font-light">THE WILD</span>
            </h2>
          </Reveal>

          {/* Right Column: Narrative Intro + Understated Pill CTA */}
          <Reveal delay={0.12} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-end lg:items-start xl:items-end justify-between gap-6 max-w-xl">
            <p className="text-[13px] md:text-[14px] text-white/90 font-light leading-[1.7] max-w-md">
              Discover Denali through experiences shaped by immense landscapes, untamed wildlife, winding wilderness roads, and skies that transform with the seasons.
            </p>
            
            <a
              href="#explore"
              onClick={(e) => {
                e.preventDefault();
                setSelectedExperience(EXPERIENCES[0]);
              }}
              className="group inline-flex items-center gap-2.5 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white px-5 py-2.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-wide transition-all duration-300 shrink-0 whitespace-nowrap"
            >
              <span>EXPLORE DENALI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Reveal>
        </div>

        {/* Editorial Gallery Grid: Asymmetrical Cards Layout matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 items-start">
          {EXPERIENCES.map((exp, idx) => {
            const isTall = exp.aspect === 'tall';
            return (
              <Reveal key={exp.id} delay={idx * 0.08} y={34}>
              <div 
                className="group flex flex-col cursor-pointer"
                onClick={() => setSelectedExperience(exp)}
              >
                {/* Image Container with alternating aspect ratios */}
                <div 
                  className={`relative w-full overflow-hidden rounded-[2px] bg-[#10141B] transition-all duration-500 border border-white/[0.06] group-hover:border-teal-500/30 ${
                    isTall 
                      ? 'aspect-[3.6/4.8] sm:aspect-[3.4/4.6]' 
                      : 'aspect-[3.6/3.6] sm:aspect-[3.4/3.4]'
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle tonal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

                  {/* Top-Right Index Badge */}
                  <div className="absolute top-3 right-3 text-[10px] tracking-widest text-white/70 font-mono bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-[2px] border border-white/10">
                    {exp.number}
                  </div>

                  {/* Bottom Tag */}
                  <div className="absolute bottom-3 left-3 text-[10px] text-gray-300 font-light tracking-wide bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-[2px] opacity-90 group-hover:text-white transition-colors">
                    {exp.tag}
                  </div>
                </div>

                {/* Typography & Caption Block directly beneath image */}
                <div className="mt-5 flex flex-col flex-1">
                  <h3 className="text-[15px] md:text-[16px] font-medium tracking-normal text-white group-hover:text-teal-200 transition-colors mb-2">
                    {exp.title}
                  </h3>
                  
                  <p className="text-[12px] md:text-[13px] text-white/90 font-light leading-[1.65] mb-4 flex-1 line-clamp-3">
                    {exp.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-[11px] md:text-[12px] text-white group-hover:text-white font-light tracking-wider uppercase transition-colors pt-1">
                    <span>DISCOVER EXPERIENCE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

      </div>

      {/* Experience Details Modal / Lightbox */}
      {selectedExperience && (
        <div 
          className="fixed inset-0 z-50 bg-[#030508]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedExperience(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#090D13] border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-gray-300 hover:text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
              <img 
                src={selectedExperience.image} 
                alt={selectedExperience.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-white text-[11px] font-mono">
                {selectedExperience.number} • {selectedExperience.tag}
              </div>
            </div>

            {/* Modal Text Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] tracking-[0.2em] text-teal-300 uppercase font-medium mb-2">
                  Denali Expedition Experience
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
                  {selectedExperience.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-gray-300 font-light leading-relaxed mb-6">
                  {selectedExperience.description}
                </p>
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-[4px] space-y-2 mb-6">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Terrain Type</span>
                    <span className="text-gray-200">Subarctic Tundra & Alpine</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Access Season</span>
                    <span className="text-gray-200">Late May – Mid September</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Recommended Duration</span>
                    <span className="text-gray-200">Full Day Expedition</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="flex-1 py-2.5 bg-[#1A6482] hover:bg-[#1A6482]/90 text-white rounded text-[13px] font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Plan This Expedition</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded text-[13px] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
