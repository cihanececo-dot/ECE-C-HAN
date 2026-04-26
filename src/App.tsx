import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';

import StoriesPage from './pages/StoriesPage';

const Footer: React.FC = () => (
  <footer className="bg-editorial-bg py-8 border-t border-editorial-border text-center text-sm text-gray-400">
    <p>© 2026 İstanbul Hafızası - Tarihi Esnaflar Rehberi</p>
    <p className="mt-2 text-xs italic opacity-70">Gelenek gelecektir.</p>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'map' | 'stories'>('landing');

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col font-serif selection:bg-editorial-accent selection:text-white transition-colors duration-500 bg-editorial-bg">
        <Navbar onPageChange={setCurrentPage} currentPage={currentPage} />
        
        <main className="flex-1">
          {currentPage === 'landing' ? (
            <>
              <LandingPage onStart={() => setCurrentPage('map')} />
              <Footer />
            </>
          ) : currentPage === 'map' ? (
            <MapPage />
          ) : (
            <>
              <StoriesPage />
              <Footer />
            </>
          )}
        </main>
      </div>
    </AppProvider>
  );
}
