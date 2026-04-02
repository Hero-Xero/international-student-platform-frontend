import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AnimatePresence, motion } from 'framer-motion';
import { MustHeader } from './components/MustHeader/MustHeader';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { FloatingSocialBar } from './components/FloatingSocialBar';
import { LinksBar } from './components/LinksBar';
// Pages
import { Dashboard } from './pages/Dashboard';
import { Academics } from './pages/Academics';
import Questionnaires from './pages/Questionnaires';
import { Resources } from './pages/Resources';
import { Announcements } from './pages/Announcements';
import { Notifications } from './pages/Notifications';
import { ContactUs } from './pages/ContactUs';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { SubmitRequest } from './pages/SubmitRequest';
import { MyRequests } from './pages/MyRequests';
import { RootPage } from './pages/RootHome/RootPage';
import { Schedule } from './pages/Schedule';
import { ProfileProvider } from './contexts/ProfileContext';
import { RequestsProvider } from './contexts/RequestsContext';
import { LanguageProvider, Language, useLanguage } from './contexts/LanguageContext';

export type PageType = 'dashboard' | 'academics' | 'questionnaires' | 'resources' | 'announcements' | 'notifications' | 'contact-us' | 'profile' | 'settings' | 'submit-request' | 'my-requests';

export type { Language } from './contexts/LanguageContext';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const { language, dispatch: languageDispatch } = useLanguage();
  const location = useLocation();

  const toggleLanguage = (lang: Language) => {
    languageDispatch({ type: 'SET_LANGUAGE', payload: lang });
    i18n.changeLanguage(lang);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode !== darkMode) {
      setDarkMode(savedDarkMode);
      document.documentElement.classList.toggle('dark', savedDarkMode);
    }
  }, []);

  const currentPage = location.pathname.slice(1) as PageType || 'dashboard';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-comfortDark-bg text-comfortDark-text' : 'bg-white text-gray-900'}`}>
<MustHeader language={language as any} onToggleLanguage={toggleLanguage as any} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <HeroSlider />
      <main className="flex-1 pt-24 md:pt-28 lg:pt-32">
        <AnimatePresence mode="wait" key={location.pathname}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-[calc(100vh-140px)]">
            <Routes>
              <Route path="/" element={<RootPage />} />
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/questionnaires" element={<Questionnaires darkMode={darkMode} />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/submit-request" element={<SubmitRequest />} />
  <Route path="/my-requests" element={<MyRequests />} />
  <Route path="/schedule" element={<Schedule darkMode={darkMode} />} />
            </Routes>

          </motion.div>
        </AnimatePresence>
      </main>
      <Footer darkMode={darkMode} />
      <FloatingSocialBar />
    </div>
  );
}

export function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ProfileProvider>
          <RequestsProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </RequestsProvider>
        </ProfileProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

