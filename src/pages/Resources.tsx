import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  GraduationCap,
  Monitor,
  Mail,
  Library,
  Home,
  Bus,
  HeartPulse
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ResourceFile {
  name: string;
  size: string;
}

interface ResourceCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  files: ResourceFile[];
}

interface QuickLink {
  title: string;
  icon: React.ElementType;
  color: string;
  url: string;
}

const categories: ResourceCategory[] = [
  {
    title: "Housing",
    icon: Home,
    color: "text-blue-500",
    files: [
      { name: "Housing Application Form.pdf", size: "420 KB" },
      { name: "Dormitory Rules & Regulations.pdf", size: "1.1 MB" },
      { name: "Housing Fee Schedule 2025-2026.pdf", size: "380 KB" },
    ]
  },
  {
    title: "Transportation",
    icon: Bus,
    color: "text-orange-500",
    files: [
      { name: "Bus Routes & Schedule.pdf", size: "2.1 MB" },
      { name: "Transportation Registration Form.pdf", size: "350 KB" },
      { name: "Pickup Points Map.pdf", size: "4.5 MB" },
    ]
  },
  {
    title: "Medical Insurance",
    icon: HeartPulse,
    color: "text-red-500",
    files: [
      { name: "Insurance Policy Details.pdf", size: "1.8 MB" },
      { name: "Affiliated Hospitals List.pdf", size: "520 KB" },
      { name: "Medical Claim Form.pdf", size: "290 KB" },
    ]
  }
];

const quickLinks: QuickLink[] = [
  { title: "MUST Official Website", icon: GraduationCap, color: "text-blue-500", url: 'https://must.edu.eg' },
  { title: "Student Information System (SIS)", icon: Monitor, color: "text-green-500", url: 'https://sis.must.edu.eg' },
  { title: "MUST Email (Outlook)", icon: Mail, color: "text-orange-500", url: 'https://mail.must.edu.eg' },
  { title: "Library Digital Catalog", icon: Library, color: "text-purple-500", url: 'https://library.must.edu.eg' },
];

interface ResourceSectionProps {
  category: ResourceCategory;
  isOpen: boolean;
  onToggle: () => void;
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ category, isOpen, onToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden transition-all">
    <div className="p-5 flex justify-between items-center border-b border-gray-50 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" onClick={onToggle}>
      <div className="flex items-center gap-4">
        <span className={`w-10 h-10 flex items-center justify-center rounded-xl ${category.color} bg-opacity-20`}>
          <category.icon className="w-6 h-6" />
        </span>
        <h3 className="font-bold text-gray-800 dark:text-white">{category.title}</h3>
      </div>
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
        {category.files.length} files
      </span>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 p-4' : 'max-h-0 p-0'}`}>
      {category.files.map((file, idx) => (
        <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 dark:text-gray-500 text-lg group-hover:text-emerald-500 transition-colors">📄</span>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-white group-hover:text-emerald-600">{file.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">{file.size}</p>
            </div>
          </div>
          <button className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity text-xl p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50" onClick={(e) => {
            e.stopPropagation();
            alert(`Downloading ${file.name}`);
          }}>
            📥
          </button>
        </div>
      ))}
    </div>
  </div>
);

export function Resources() {
  const { t } = useTranslation();
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.files.some(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-20">
      {/* Header */}
      <div className="text-center py-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          {t('resourcesTitle', { defaultValue: 'Resources' })}
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed text-lg">
          {t('resourcesDesc', { defaultValue: 'Download important documents and access useful links for international students at MUST.' })}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchDocuments', { defaultValue: 'Search documents...' })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50 shadow-sm transition-all text-lg placeholder-gray-400"
            />
            <Download className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          {filteredCategories.map((cat) => (
            <ResourceSection 
              key={cat.title}
              category={cat}
              isOpen={openCategories[cat.title] || false}
              onToggle={() => toggleCategory(cat.title)}
            />
          ))}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noDocumentsFound', { defaultValue: 'No documents found matching your search' })}</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-emerald-500 text-2xl">🔗</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('importantLinks', { defaultValue: 'Important Links' })}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-40 overflow-hidden cursor-pointer"
              >
                <div className={`p-4 rounded-2xl mb-4 w-16 h-16 flex items-center justify-center ${link.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                  <link.icon className="w-8 h-8" />
                </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-tight line-clamp-2 px-2">{link.title}</h3>
                <ExternalLink className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all ml-1 absolute bottom-2 right-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 text-white shadow-2xl"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('cantFindNeed', { defaultValue: "Can't find what you need?" })}</h3>
            <p className="text-lg opacity-90">{t('contactAffairsDesc', { defaultValue: 'Contact International Students Affairs for additional resources' })}</p>
          </div>
          <button 
            className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 hover:scale-105 transition-all shadow-lg"
            onClick={() => {
              window.location.href = '/contact-us';
            }}
          >
            {t('contactUsBtn', { defaultValue: 'Contact Us' })}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

