import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Calendar, Compass, Home, ShieldCheck, X, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

interface PlanCard {
  id: string;
  label: string;
  title: string;
  description: string;
  supportingInfo?: string;
  ctaText: string;
  image: string;
  type: 'wide' | 'portrait' | 'compact';
  details: {
    overview: string;
    highlights: string[];
    recommendation: string;
  };
}

const PLANNING_CHAPTERS: PlanCard[] = [
  {
    id: 'season',
    label: '01 — SEASON',
    title: 'SUMMER IN DENALI',
    description: 'Long daylight, accessible roads, abundant wildlife, and ideal conditions for exploring the park.',
    supportingInfo: 'JUNE — SEPTEMBER',
    ctaText: 'EXPLORE SEASON',
    image: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?auto=format&fit=crop&w=1200&q=85',
    type: 'wide',
    details: {
      overview: 'Summer brings 18–24 hours of golden daylight, vibrant tundra blooms, and peak activity across all mammal species in the Alaska Range.',
      highlights: [
        'Late June: Peak wildflowers & active caribou herds',
        'July: Warmest temperatures (65°F–75°F) & clear alpine trails',
        'Late August: Dramatic crimson & gold autumn tundra foliage',
        'September: Northern lights begin & first dusting of snow on peaks',
      ],
      recommendation: 'Reserve transit permits and backcountry accommodations 4–6 months in advance for July & August.',
    },
  },
  {
    id: 'arrival',
    label: '02 — ARRIVAL',
    title: 'YOUR JOURNEY NORTH',
    description: 'From Anchorage or Fairbanks, follow the routes that lead toward the heart of Denali.',
    supportingInfo: 'ANCHORAGE / FAIRBANKS',
    ctaText: 'PLAN YOUR ROUTE',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
    type: 'portrait',
    details: {
      overview: 'Denali National Park entrance is situated along Alaska Route 3 (George Parks Highway), midway between Anchorage and Fairbanks.',
      highlights: [
        'Alaska Railroad (Denali Star): Historic panoramic dome train route',
        'Scenic Drive from Anchorage: ~240 miles (4.5 hours) via Parks Highway',
        'Scenic Drive from Fairbanks: ~120 miles (2 hours) south',
        'Park Entrance: Mile 237 on Parks Highway with full visitor amenities',
      ],
      recommendation: 'Taking the Alaska Railroad northbound and returning via private vehicle offers the definitive scenic loop.',
    },
  },
  {
    id: 'stay',
    label: '03 — STAY',
    title: 'CLOSE TO THE WILD',
    description: 'Choose a comfortable base near the wilderness, from intimate cabins to remote lodges.',
    supportingInfo: 'LODGES / CABINS',
    ctaText: 'FIND YOUR STAY',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
    type: 'portrait',
    details: {
      overview: 'Accommodations range from deep-backcountry fly-in wilderness lodges to architectural timber cabins along the Nenana River canyon.',
      highlights: [
        'Backcountry Lodges: Located at Kantishna (Mile 90) inside the park',
        'Park Entrance & Canyon: Riverside cabins, boutique expedition chalets',
        'Campgrounds: Riley Creek (year-round), Savage River, & Sanctuary River',
        'Healy Valley: Quiet alpine retreats just 11 miles north of the gate',
      ],
      recommendation: 'For complete immersion without crowds, look into private cabins along the Nenana Gorge or Kantishna valley.',
    },
  },
  {
    id: 'prepare',
    label: '04 — PREPARE',
    title: 'WHAT TO BRING',
    description: 'Layers, sturdy footwear, rain protection, water, and an openness to changing conditions.',
    ctaText: 'SEE THE ESSENTIALS',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85',
    type: 'compact',
    details: {
      overview: 'Subarctic weather fluctuates rapidly. Layering and waterproof gear ensure you remain comfortable across changing microclimates.',
      highlights: [
        'Layering System: Merino wool base, fleece mid-layer, Gore-Tex shell',
        'Footwear: Broken-in waterproof hiking boots with ankle support',
        'Optics: High-quality 8x42 or 10x42 binoculars for wildlife viewing',
        'Backcountry Safety: Bear spray, topo map, and high-SPF UV protection',
      ],
      recommendation: 'Pack light, durable, breathable gear suitable for temperatures ranging from 35°F to 75°F in a single 24-hour cycle.',
    },
  },
];

export default function PlanYourJourney() {
  const [selectedPlan, setSelectedPlan] = useState<PlanCard | null>(null);

  const card1 = PLANNING_CHAPTERS[0];
  const card2 = PLANNING_CHAPTERS[1];
  const card3 = PLANNING_CHAPTERS[2];
  const card4 = PLANNING_CHAPTERS[3];

  return (
    <section 
      id="plan-journey"
      className="relative w-full text-white py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden font-['Outfit'] selection:bg-[#191D18] selection:text-[#EBEFE0]"
    >
      {/* Subtle depth scrim (keeps white text readable while the cinematic background shows through) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(3,8,14,0.30) 0%, rgba(3,5,8,0.52) 60%, rgba(3,5,8,0.68) 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1760px] mx-auto">
        
        {/* Header Section: Editorial Layout matching reference */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-20">
          
          {/* Left Column: Primary Display Heading + Subheading */}
          <Reveal className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.02] text-white uppercase mb-4">
              PLAN YOUR <br />
              JOURNEY
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-normal tracking-tight">
              Everything you need to know before you go.
            </p>
          </Reveal>

          {/* Right Column: Introductory text aligned with layout */}
          <Reveal delay={0.12} className="max-w-md lg:text-right">
            <p className="text-[13px] md:text-[14.5px] text-white/70 font-normal leading-[1.7]">
              Choose your season, find your way north, settle into the wilderness, and prepare for the landscape ahead.
            </p>
          </Reveal>
        </div>

        {/* Asymmetrical Cards Hierarchy (Matches reference: 1 Dominant Wide + 2 Portrait Cards + 1 Compact Supporting Image Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          
          {/* CARD 01: SUMMER IN DENALI (Dominant Wide Card on Left - lg:col-span-4) */}
          <Reveal delay={0.05} className="lg:col-span-4">
          <div 
            className="h-full bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group cursor-pointer border border-[#191D18]/[0.06] hover:border-[#191D18]/15"
            onClick={() => setSelectedPlan(card1)}
          >
            <div>
              {/* Wide Landscape Image Frame */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#D8DEC9]">
                <img 
                  src={card1.image} 
                  alt={card1.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10.5px] tracking-wider uppercase font-medium">
                  {card1.label}
                </div>
                {card1.supportingInfo && (
                  <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#191D18] text-[10.5px] font-semibold tracking-wider">
                    {card1.supportingInfo}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#161A15] group-hover:text-[#255060] transition-colors">
                  {card1.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#4A5546] font-normal leading-relaxed">
                  {card1.description}
                </p>
              </div>
            </div>

            {/* Understated Expedition CTA */}
            <div className="pt-4 border-t border-[#191D18]/[0.08] flex items-center justify-between">
              <span className="text-[11.5px] font-bold tracking-wider text-[#2B3428] uppercase group-hover:text-[#1A6482] transition-colors">
                {card1.ctaText}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#191D18]/[0.04] group-hover:bg-[#1A6482] text-[#191D18] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
          </Reveal>

          {/* CARD 02: YOUR JOURNEY NORTH (Portrait Card - lg:col-span-3) */}
          <Reveal delay={0.12} className="lg:col-span-3">
          <div 
            className="h-full bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group cursor-pointer border border-[#191D18]/[0.06] hover:border-[#191D18]/15"
            onClick={() => setSelectedPlan(card2)}
          >
            <div>
              {/* Portrait Photo Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#D8DEC9]">
                <img 
                  src={card2.image} 
                  alt={card2.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10.5px] tracking-wider uppercase font-medium">
                  {card2.label}
                </div>
                {card2.supportingInfo && (
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-center text-[#191D18] text-[10px] font-semibold tracking-wider truncate">
                    {card2.supportingInfo}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#161A15] group-hover:text-[#255060] transition-colors">
                  {card2.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-[#4A5546] font-normal leading-relaxed line-clamp-3">
                  {card2.description}
                </p>
              </div>
            </div>

            {/* Understated Expedition CTA */}
            <div className="pt-4 border-t border-[#191D18]/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-[#2B3428] uppercase group-hover:text-[#1A6482] transition-colors">
                {card2.ctaText}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#191D18]/[0.04] group-hover:bg-[#1A6482] text-[#191D18] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
          </Reveal>

          {/* CARD 03: CLOSE TO THE WILD (Portrait Card - lg:col-span-3) */}
          <Reveal delay={0.19} className="lg:col-span-3">
          <div 
            className="h-full bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group cursor-pointer border border-[#191D18]/[0.06] hover:border-[#191D18]/15"
            onClick={() => setSelectedPlan(card3)}
          >
            <div>
              {/* Portrait Photo Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#D8DEC9]">
                <img 
                  src={card3.image} 
                  alt={card3.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10.5px] tracking-wider uppercase font-medium">
                  {card3.label}
                </div>
                {card3.supportingInfo && (
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-center text-[#191D18] text-[10px] font-semibold tracking-wider truncate">
                    {card3.supportingInfo}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#161A15] group-hover:text-[#255060] transition-colors">
                  {card3.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-[#4A5546] font-normal leading-relaxed line-clamp-3">
                  {card3.description}
                </p>
              </div>
            </div>

            {/* Understated Expedition CTA */}
            <div className="pt-4 border-t border-[#191D18]/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-[#2B3428] uppercase group-hover:text-[#1A6482] transition-colors">
                {card3.ctaText}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#191D18]/[0.04] group-hover:bg-[#1A6482] text-[#191D18] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
          </Reveal>

          {/* CARD 04: IMAGE-ONLY SUPPORTING CARD (lg:col-span-2) - Matches reference layout */}
          <Reveal delay={0.26} className="lg:col-span-2">
          <div 
            className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer border border-[#191D18]/[0.06] hover:border-[#191D18]/20 bg-[#D8DEC9]"
            onClick={() => setSelectedPlan(card4)}
          >
            <img 
              src={card4.image} 
              alt={card4.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Centered circular action button matching reference */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/95 group-hover:bg-white text-[#191D18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-black/5">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Subtle bottom tag */}
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="inline-block bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white/90 text-[10px] tracking-wider uppercase font-medium">
                {card4.label}
              </span>
            </div>
          </div>
          </Reveal>

        </div>

      </div>

      {/* Interactive Expedition Planning Modal / Drawer */}
      {selectedPlan && (
        <div 
          className="fixed inset-0 z-50 bg-[#030508]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedPlan(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#0E1217] border border-white/10 text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-gray-300 hover:text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Column */}
            <div className="w-full md:w-5/12 h-56 md:h-auto relative bg-black">
              <img 
                src={selectedPlan.image} 
                alt={selectedPlan.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs px-3 py-1 rounded text-white text-[11px] font-mono">
                {selectedPlan.label}
              </div>
            </div>

            {/* Modal Content Column */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] tracking-[0.2em] text-teal-300 uppercase font-semibold mb-1.5">
                  Expedition Planning Chapter
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                  {selectedPlan.title}
                </h3>
                
                <p className="text-[13px] text-gray-300 font-light leading-relaxed mb-5">
                  {selectedPlan.details.overview}
                </p>

                {/* Key Guidance Highlights */}
                <div className="space-y-2 mb-5">
                  <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    Key Recommendations
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3.5 space-y-2">
                    {selectedPlan.details.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12px] text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-teal-950/30 border border-teal-500/20 rounded-lg text-[11.5px] text-teal-200/90 leading-relaxed">
                  <strong className="text-teal-100 font-semibold">Field Note: </strong>
                  {selectedPlan.details.recommendation}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-2.5 bg-[#1A6482] hover:bg-[#1A6482]/90 text-white rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Download Expedition Checklist</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-[13px] transition-colors"
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
