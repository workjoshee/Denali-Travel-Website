import React, { useState } from 'react';
import { ArrowRight, Compass, Mountain, ShieldCheck, Mail, Instagram, ExternalLink, X, Check } from 'lucide-react';
import Reveal from './Reveal';

export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState<'contact' | 'guide' | 'terms' | null>(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail.trim()) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactEmail('');
        setContactMessage('');
        setModalOpen(null);
      }, 2000);
    }
  };

  return (
    <section 
      id="final-cta"
      className="relative w-full text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 font-['Outfit'] selection:bg-teal-500 selection:text-black"
    >
      {/* Outer subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(26,100,130,0.12)_0%,_transparent_70%)] pointer-events-none" />

      {/* Subtle depth scrim — transparent section; the cinematic end frame shows
          through directly, with a light wash keeping the text readable (same
          treatment as the neighboring sections) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(3,5,8,0.18) 0%, rgba(3,5,8,0.48) 100%)',
        }}
      />

      {/* Main Container — transparent over the cinematic end frame */}
      <Reveal y={40}>
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col justify-between min-h-[850px] md:min-h-[920px]">
        
        {/* Top Section: Centered Editorial Headline & Call To Actions */}
        <div className="relative z-20 pt-16 sm:pt-20 md:pt-28 px-6 sm:px-12 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight uppercase leading-[0.95] text-white mb-6">
            GO WHERE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400">
              ROAD ENDS.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-[15px] sm:text-[17px] md:text-[18px] text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-10 text-balance">
            Some journeys are measured in miles. Others stay with you long after you return.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            
            {/* Primary CTA */}
            <button
              onClick={() => scrollToSection('plan-journey')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-teal-50 text-black px-8 py-4 rounded-full text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-white/10 active:scale-[0.98]"
            >
              <span>PLAN YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollToSection('experiences')}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white border border-white/15 hover:border-white/30 px-7 py-4 rounded-full text-[13px] sm:text-[14px] font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-sm active:scale-[0.98]"
            >
              EXPLORE DENALI
            </button>
          </div>

        </div>

        {/* Bottom Section: Integrated Minimalist Footer & Signature Micro-Copy */}
        <div className="relative z-20 mt-auto pt-24 sm:pt-36 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16">
          
          {/* Subtle separator line with center diamond */}
          <div className="relative flex items-center justify-center mb-10">
            <div className="w-full h-px bg-white/[0.08]" />
            <div className="absolute px-3 bg-[#0A0E14]/75 text-gray-500 text-[10px] font-mono tracking-widest uppercase">
              63.1148° N · 151.1926° W
            </div>
          </div>

          {/* Three-Column Minimal Footer Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-[13px]">
            
            {/* Brand/Identity note */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2 font-semibold tracking-wider text-white uppercase text-sm">
                <Mountain className="w-4 h-4 text-teal-400" />
                <span>DENALI WILDERNESS</span>
              </div>
              <p className="text-[12px] text-gray-400 font-light leading-relaxed max-w-xs">
                Six million acres of wild land, untamed wildlife, and North America’s highest summit.
              </p>
            </div>

            {/* Explore Column */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                Explore
              </div>
              <ul className="space-y-2 text-gray-300 font-light">
                <li>
                  <button 
                    onClick={() => scrollToSection('hero')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    About Denali
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('experiences')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Experiences
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('plan-journey')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Plan Your Journey
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                Connect
              </div>
              <ul className="space-y-2 text-gray-300 font-light">
                <li>
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-gray-400" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setModalOpen('contact')} 
                    className="hover:text-white transition-colors text-left inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>Contact Rangers</span>
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.nps.gov/dena" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-teal-300/80 hover:text-teal-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>NPS Official Portal</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Information Column */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                Information
              </div>
              <ul className="space-y-2 text-gray-300 font-light">
                <li>
                  <button 
                    onClick={() => setModalOpen('guide')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Travel & Safety Guide
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalOpen('terms')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Park Regulations & Privacy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('plan-journey')} 
                    className="hover:text-white transition-colors text-left text-gray-400 hover:text-gray-200"
                  >
                    Seasonal Transit Map
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Micro-Copy Bottom Signature */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-light">
            <div>
              © {new Date().getFullYear()} Denali National Park & Preserve. Crafted for wilderness exploration.
            </div>
            <div className="font-mono tracking-widest text-gray-300 uppercase font-medium">
              DENALI NATIONAL PARK · ALASKA
            </div>
          </div>

        </div>

      </div>
      </Reveal>

      {/* Interactive Modal for Contact / Guide / Terms */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalOpen(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0C1017] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {modalOpen === 'contact' && (
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Connect with Expedition Rangers</h3>
                <p className="text-[13px] text-gray-300 font-light mb-6">
                  Have questions about backcountry permits, road access, or seasonal conditions? Send an inquiry to our ranger team.
                </p>

                {contactSubmitted ? (
                  <div className="bg-teal-950/40 border border-teal-500/30 rounded-xl p-6 text-center text-teal-200 flex flex-col items-center gap-2">
                    <Check className="w-8 h-8 text-teal-400" />
                    <span className="font-medium text-white">Inquiry Received</span>
                    <span className="text-[12px] text-gray-300">A backcountry coordinator will reach out within 24 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">Your Email</label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="explorer@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">Expedition Query</label>
                      <textarea 
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Inquiring about late August hiking conditions and shuttle permits..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 transition-colors resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#1A6482] hover:bg-[#1A6482]/90 text-white rounded-lg text-sm font-semibold tracking-wide transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            )}

            {modalOpen === 'guide' && (
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Travel & Safety Guide</h3>
                <p className="text-[13px] text-gray-300 font-light mb-4">
                  Denali is a true wilderness environment with minimal human infrastructure. Review essential field rules:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 text-[12px] text-gray-200 mb-6">
                  <div>
                    <strong className="text-white">Bear Safety: </strong>
                    Carry EPA-approved bear spray in quick-reach holster; maintain at least 300 yards distance from bears.
                  </div>
                  <div>
                    <strong className="text-white">Leave No Trace: </strong>
                    Pack out all trash and waste. Camp at least 1/2 mile from the Park Road.
                  </div>
                  <div>
                    <strong className="text-white">Subarctic Weather: </strong>
                    Temperatures can drop below freezing overnight even in July. Always carry waterproof shell layers.
                  </div>
                </div>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  Close Guide
                </button>
              </div>
            )}

            {modalOpen === 'terms' && (
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Park Regulations</h3>
                <p className="text-[13px] text-gray-300 font-light mb-4">
                  Denali National Park and Preserve was established in 1917 to protect wildlife and pristine subarctic ecosystems.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[12px] text-gray-300 space-y-2 mb-6">
                  <p>• Private vehicles are permitted only to Mile 15 (Savage River) during summer season.</p>
                  <p>• Drones and motorized watercraft are strictly prohibited across all 6 million acres.</p>
                  <p>• Backcountry camping requires an in-person permit issued at the Backcountry Information Center.</p>
                </div>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  Understood
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
