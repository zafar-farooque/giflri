import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages & Section Components
import { HomePage } from '@/pages/HomePage';
import { OpeningPage } from '@/pages/OpeningPage';
import { SearchPage } from '@/pages/SearchPage';
import { VerifyPage } from '@/pages/VerifyPage';
import { LoginPage } from '@/pages/LoginPage';
import { AboutSection } from '@/sections/about-section';
import { PillarsSection } from '@/sections/pillars-section';
import { QualitySection } from '@/sections/quality-section';
import { AffiliationHubSection } from '@/sections/affiliation-hub-section';
import { GlobalRelationsSection } from '@/sections/global-relations-section';
import { ObservatorySection } from '@/sections/observatory-section';
import { ResearchSection } from '@/sections/research-section';
import { ProgramsSection } from '@/sections/programs-section';
import { EventsSection } from '@/sections/events-section';
import { ExpertNetworkSection } from '@/sections/expert-network-section';
import { AISection } from '@/sections/ai-section';
import { GlobalPresence } from '@/sections/global-presence';
import { AdminSection } from '@/sections/admin-section';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Layout wrapper for standalone section pages to ensure proper top spacing below fixed navbar
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-24 md:pt-28 pb-16 min-h-[calc(100vh-200px)]">
    {children}
  </div>
);

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Core & Home Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/opening" element={<OpeningPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Institutional & Strategic Pillars */}
        <Route path="/about" element={<PageWrapper><AboutSection /></PageWrapper>} />
        <Route path="/pillars" element={<PageWrapper><PillarsSection /></PageWrapper>} />
        <Route path="/quality" element={<PageWrapper><QualitySection /></PageWrapper>} />

        {/* Affiliation & Global Relations */}
        <Route path="/affiliation" element={<PageWrapper><AffiliationHubSection /></PageWrapper>} />
        <Route path="/affiliation/apply" element={<PageWrapper><AffiliationHubSection /></PageWrapper>} />
        <Route path="/relations" element={<PageWrapper><GlobalRelationsSection /></PageWrapper>} />

        {/* Global Observatory & Intelligence */}
        <Route path="/observatory" element={<PageWrapper><ObservatorySection /></PageWrapper>} />

        {/* Research Directorate & Academic Curricula */}
        <Route path="/research" element={<PageWrapper><ResearchSection /></PageWrapper>} />
        <Route path="/programs" element={<PageWrapper><ProgramsSection /></PageWrapper>} />
        <Route path="/programs/:id" element={<PageWrapper><ProgramsSection /></PageWrapper>} />

        {/* Events & Scholar Network */}
        <Route path="/events" element={<PageWrapper><EventsSection /></PageWrapper>} />
        <Route path="/events/:id" element={<PageWrapper><EventsSection /></PageWrapper>} />
        <Route path="/experts" element={<PageWrapper><ExpertNetworkSection /></PageWrapper>} />
        <Route path="/experts/:id" element={<PageWrapper><ExpertNetworkSection /></PageWrapper>} />
        <Route path="/directory" element={<PageWrapper><GlobalPresence /></PageWrapper>} />

        {/* AI Assistant & Intelligence */}
        <Route path="/ai" element={<PageWrapper><AISection /></PageWrapper>} />
        <Route path="/eservices" element={<Navigate to="/" replace />} />
        <Route path="/eservices/*" element={<Navigate to="/" replace />} />

        {/* Public Credential Verification */}
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/verify/:certId" element={<VerifyPage />} />

        {/* Executive CMS & Admin Console */}
        <Route path="/admin" element={<AdminSection />} />
        <Route path="/admin/*" element={<AdminSection />} />

        {/* Authentication & Portal Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
