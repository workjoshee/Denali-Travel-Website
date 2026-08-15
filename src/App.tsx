/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import AboutDenali from './components/AboutDenali';
import DenaliExperiences from './components/DenaliExperiences';
import PlanYourJourney from './components/PlanYourJourney';
import FinalCTA from './components/FinalCTA';
import CinematicBackground from './components/CinematicBackground';

export default function App() {
  return (
    <>
      {/* Scroll-controlled cinematic background (fixed canvas, behind all content) */}
      <CinematicBackground />
      <main className="relative z-10 text-white min-h-screen">
        <Hero />
        <AboutDenali />
        <DenaliExperiences />
        <PlanYourJourney />
        <FinalCTA />
      </main>
    </>
  );
}
