import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { AppRoutes } from '@/Routes/AppRoutes';

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="min-h-screen bg-[#02100E] text-white">
        <AppRoutes />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#051F1C] text-ivory">
      <ScrollProgress />
      <Navbar />

      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
