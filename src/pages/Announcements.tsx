import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Megaphone,
  Calendar,
  Paperclip,
  Search
} from 'lucide-react';

export function Announcements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [visibleCount, setVisibleCount] = useState(5);
  const { t } = useLanguage();

  const allAnnouncements = [
    {
      id: 1,
      title: 'Important: Visa Renewal Deadline for Fall 2025',
      excerpt: 'All international students must ensure their residency visas are renewed before November 1st to avoid registration holds for the Spring semester.',
      fullText: 'All international students must ensure their residency visas are renewed before November 1st to avoid registration holds for the Spring semester. Please visit the International Students Affairs office with your current visa and passport. Late submissions will incur a processing fee.',
      date: 'Oct 15, 2025',
      category: 'Immigration',
      hasAttachment: true,
      urgent: true
    },
    {
      id: 2,
      title: 'Midterm Examination Schedule Released',
      excerpt: 'The official midterm examination schedule for Fall 2025 is now available.',
      fullText: 'The official midterm examination schedule for Fall 2025 is now available. Please check your individual schedules on the portal. Exams will begin on October 20th.',
      date: 'Oct 10, 2025',
      category: 'Academics',
      hasAttachment: true,
      urgent: false
    },
    // ... (rest of announcements)
  ];

  const filteredAnnouncements = allAnnouncements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadMore = useCallback((id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + 3);
  }, []);

  const hasMore = filteredAnnouncements.length > visibleCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-white dark:bg-slate-900 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">{t('announcementsTitle' as any)}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{t('announcementsPageDesc' as any)}</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchAnnouncements' as any)}
            className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.slice(0, visibleCount).map((ann, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={ann.id}
            className={`p-6 cursor-pointer border-l-4 rounded-xl shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 ${ann.urgent ? 'border-l-red-500' : 'border-l-green-500'}`}
            onClick={() => handleReadMore(ann.id)}>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-green-600 dark:text-green-400 text-xs font-semibold rounded-md">
                    {ann.category}
                  </span>
                  {ann.urgent && (
                    <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-md flex items-center gap-1">
                      <Megaphone className="w-3 h-3" /> {t('urgent' as any)}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">{ann.title}</h2>
                <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-2xl ${expandedIds.has(ann.id) ? '' : 'line-clamp-2'}`}>
                  {expandedIds.has(ann.id) ? ann.fullText : ann.excerpt}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5" /> {ann.date}
                </div>
                {ann.hasAttachment && (
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <Paperclip className="w-3.5 h-3.5" /> {t('attachment' as any)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button 
            onClick={handleLoadMore}
            className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white px-8 py-3 rounded-xl font-medium transition-colors">
            {t('loadMore' as any)} ({filteredAnnouncements.length - visibleCount} {t('leftItems' as any)})
          </button>
        </div>
      )}

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black dark:text-white mb-2">{t('noAnnouncementsTitle' as any)}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t('noAnnouncementsDesc' as any)}</p>
        </div>
      )}
    </div>
  );
}

