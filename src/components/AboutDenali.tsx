import React, { useState } from 'react';
import { Compass, Maximize2, MapPin } from 'lucide-react';
import Reveal from './Reveal';

interface AboutDenaliProps {
  onOpenImageLab?: () => void;
}

export default function AboutDenali({ onOpenImageLab }: AboutDenaliProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // High-resolution authentic Denali National Park photography
  const topLandscapeImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"; // Alaskan braided river valley & golden tundra
  const mainFeatureImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"; // Dramatic snow-capped Mount Denali peak

  return (
    <section 
      id="about-denali" 
      className="relative w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 lg:px-12 flex items-center justify-center overflow-hidden font-['Outfit'] selection:bg-[#191D18] selection:text-[#E8ECD8]"
    >
      {/* Cinematic scrim (light — lets the animated background show through clearly) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(3,5,8,0.12) 0%, rgba(3,5,8,0.42) 100%)',
        }}
      />

      {/* Main Asymmetrical Editorial Card Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        
        {/* DESKTOP / LARGE SCREEN ASYMMETRICAL STEPPED LAYOUT (Matches reference precisely) */}
        <div className="hidden lg:block relative">
          
          {/* Main Top-Left Ivory Panel */}
          <Reveal>
          <div className="relative bg-[#E8ECD8]/60 backdrop-blur-2xl text-[#1E231E] pt-12 pb-14 pl-12 pr-10 w-[68%] rounded-[2px] shadow-2xl">
            
            {/* Display Heading */}
            <div className="relative mb-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.02] text-[#161A15] uppercase select-none">
                ABOUT <span className="text-[#6B7268] font-light">DENALI</span>
              </h2>
            </div>

            {/* Left Content Column */}
            <div className="grid grid-cols-12 gap-8 pt-2">
              
              {/* Primary copy on the left */}
              <div className="col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-[14px] font-light text-[#191D18] leading-[1.65] mb-2.5">
                    Where the road ends, the wilderness begins.
                  </p>
                  <p className="text-[12.5px] text-[#4A5546] leading-[1.7] font-light">
                    Denali is a place defined by scale — immense mountains, endless tundra, winding rivers, and wildlife moving freely across a landscape that feels untouched by time.
                  </p>
                  <p className="text-[12.5px] text-[#4A5546] leading-[1.7] font-light mt-4">
                    At its heart stands Denali, North America&apos;s highest peak, rising above one of Alaska&apos;s most extraordinary wildernesses.
                  </p>
                </div>

                {/* Bottom Left Metadata / Year & Emblem Block */}
                <div className="pt-10">
                  <div className="flex items-center gap-3">
                    {/* Minimalist Pennant / Alaska Marker Emblem */}
                    <div className="flex items-center justify-center w-6 h-6 text-[#C86438]">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                        <path d="M4 2v20h2V14h14l-4-6 4-6H6V2H4z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold tracking-wider text-[#1E231E] uppercase">
                        01 — ALASKA&apos;S WILD HEART
                      </span>
                      <span className="text-[10px] text-[#4F574C] tracking-wide">
                        Denali National Park & Preserve
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </Reveal>

          {/* Top-Right Horizontal Photo Frame (Inset with thin Ivory Border) */}
          <Reveal delay={0.15} y={18} className="absolute top-0 right-0 w-[42%] h-[115px] xl:h-[125px] z-20">
          <div className="w-full h-full bg-[#E8ECD8] p-[7px] rounded-[2px] shadow-xl">
            <div 
              className="relative w-full h-full overflow-hidden group cursor-pointer"
              onClick={() => setActivePhoto(topLandscapeImage)}
            >
              <img 
                src={topLandscapeImage} 
                alt="Denali braided river and mountain valley landscape"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs p-1 rounded text-white text-[10px] flex items-center gap-1">
                <Maximize2 className="w-2.5 h-2.5" />
                <span>View</span>
              </div>
            </div>
          </div>
          </Reveal>

          {/* Bottom-Right Large Vertical / Overlapping Photo & Offset Ivory Base */}
          {/* Offset Ivory Base Plate extending right and down */}
          <Reveal delay={0.22} y={20} className="absolute bottom-[-32px] right-0 w-[51%] h-[320px] z-10">
            <div className="w-full h-full bg-[#E8ECD8]/50 backdrop-blur-xl rounded-[2px]" />
          </Reveal>

          {/* Overlapping Main Portrait Photo Frame */}
          <Reveal delay={0.3} y={24} className="absolute top-[138px] xl:top-[148px] right-[24px] w-[46%] h-[380px] xl:h-[410px] z-30">
          <div className="w-full h-full shadow-2xl overflow-hidden group cursor-pointer border-[8px] border-[#191D18]">
            <div 
              className="relative w-full h-full overflow-hidden"
              onClick={() => setActivePhoto(mainFeatureImage)}
            >
              <img 
                src={mainFeatureImage} 
                alt="Dramatic snow-capped peak of Mount Denali, Alaska"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              
              {/* Photo Caption Tag */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-[2px] text-white text-[11px] font-light tracking-wide border border-white/10">
                <MapPin className="w-3 h-3 text-[#D8784E]" />
                <span>Mount Denali • 20,310 ft</span>
              </div>

              <button 
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Expand image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          </Reveal>

        </div>

        {/* RESPONSIVE TABLET & MOBILE LAYOUT */}
        <Reveal className="lg:hidden">
        <div className="bg-[#E8ECD8]/70 backdrop-blur-xl text-[#1E231E] rounded-[2px] p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.02] text-[#161A15] uppercase mb-6">
            ABOUT <span className="text-[#6B7268] font-light">DENALI</span>
          </h2>

          {/* Top Horizontal Image */}
          <div className="w-full h-44 sm:h-56 overflow-hidden rounded-[2px] mb-6 shadow-md border-4 border-[#E8ECD8]">
            <img 
              src={topLandscapeImage} 
              alt="Denali braided river and tundra"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Lead & Main Text */}
          <div className="space-y-4 mb-8">
            <p className="text-[15px] font-light text-[#191D18] leading-snug">
              Where the road ends, the wilderness begins.
            </p>
            <p className="text-[13.5px] text-[#4A5546] leading-relaxed font-light">
              Denali is a place defined by scale — immense mountains, endless tundra, winding rivers, and wildlife moving freely across a landscape that feels untouched by time.
            </p>
            <p className="text-[13.5px] text-[#4A5546] leading-relaxed font-light">
              At its heart stands Denali, North America&apos;s highest peak, rising above one of Alaska&apos;s most extraordinary wildernesses.
            </p>
          </div>

          {/* Main Portrait Feature Image */}
          <div className="w-full h-72 sm:h-96 overflow-hidden rounded-[2px] mb-8 shadow-xl relative">
            <img 
              src={mainFeatureImage} 
              alt="Mount Denali Peak"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-[2px] text-white text-[11px] flex items-center gap-1.5 font-light">
              <MapPin className="w-3 h-3 text-[#D8784E]" />
              <span>Mount Denali • 20,310 ft</span>
            </div>
          </div>

          {/* Bottom Metadata */}
          <div className="border-t border-[#1E231E]/15 pt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 text-[#C86438]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M4 2v20h2V14h14l-4-6 4-6H6V2H4z" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[#1E231E] uppercase">
                  01 — ALASKA&apos;S WILD HEART
                </div>
                <div className="text-[10px] text-[#4F574C]">
                  Denali National Park & Preserve
                </div>
              </div>
            </div>
            
            <span className="text-[11px] font-medium text-[#2E352C]">
              6,045,153 ACRES
            </span>
          </div>
        </div>
        </Reveal>

      </div>

      {/* Lightbox Modal for Full View */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={activePhoto} 
              alt="Expanded view" 
              className="w-full h-full object-contain max-h-[85vh]"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs tracking-wide transition-colors"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
