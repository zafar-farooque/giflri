import React from 'react';
import { Hero } from '@/sections/hero';
import { QuickActions } from '@/sections/quick-actions';
import { PillarsSection } from '@/sections/pillars-section';
import { ProgramsSection } from '@/sections/programs-section';
import { ResearchSection } from '@/sections/research-section';
import { OpeningExperience } from '@/components/opening-experience';
import { GlobalPresence } from '@/sections/global-presence';
import { QualitySection } from '@/sections/quality-section';
import { ObservatorySection } from '@/sections/observatory-section';
import { ExpertNetworkSection } from '@/sections/expert-network-section';
import { EventsSection } from '@/sections/events-section';
import { AISection } from '@/sections/ai-section';

export function HomePage() {
  return (
    <>
      <OpeningExperience disableStorage={true} />
      <div className="flex flex-col gap-0 overflow-hidden">
        <Hero />
        <QuickActions />
        <PillarsSection />
        <GlobalPresence />
        <ProgramsSection />
        <QualitySection />
        <ResearchSection />
        <ObservatorySection />
        <ExpertNetworkSection />
        <EventsSection />
        <AISection />
      </div>
    </>
  );
}

export default HomePage;
