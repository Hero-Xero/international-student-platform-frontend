import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPinIcon, ClockIcon, CalendarIcon } from 'lucide-react';

const eventsData = [
    {
        id: '01',
        titleKey: 'orientationWeek',
        locationKey: 'mainAuditorium',
        timeKey: '',
        time: '09:00 AM',
        date: 'Sep 15, 2025'
    },
    {
        id: '02',
        titleKey: 'culturalFestival',
        locationKey: 'campusSquare',
        timeKey: '',
        time: '10:00 AM',
        date: 'Oct 20, 2025'
    },
    {
        id: '03',
        titleKey: 'careerFair',
        locationKey: 'exhibitionHall',
        timeKey: '',
        time: '11:00 AM',
        date: 'Nov 05, 2025'
    }];

const newsData = [
    {
        id: '01',
        titleKey: 'top10Ranking',
        locationKey: 'uniNews',
        time: '',
        timeKey: 'published',
        date: 'Aug 10, 2025'
    },
    {
        id: '02',
        titleKey: 'researchCenterOpen',
        locationKey: 'engDept',
        time: '',
        timeKey: 'published',
        date: 'Aug 05, 2025'
    },
    {
        id: '03',
        titleKey: 'scholarshipWinners',
        locationKey: 'admissions',
        time: '',
        timeKey: 'published',
        date: 'Jul 28, 2025'
    }];

export function EventsNews() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');
    const items = activeTab === 'events' ? eventsData : newsData;

    return (
        <section
            id="buzz"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-12">
                    <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
                        {t('eventsNewsTitle')}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-navy-600 dark:text-white max-w-2xl leading-tight">
                        {t('buzzSubtitle')}
                    </h3>
                </div>

                <div className="flex gap-8 mb-8 border-b border-gray-200 dark:border-navy-500">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`pb-4 text-lg font-bold transition-colors relative ${activeTab === 'events' ? 'text-navy-600 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>

                        {t('events')}
                        {activeTab === 'events' &&
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-md"></span>
                        }
                    </button>
                    <button
                        onClick={() => setActiveTab('news')}
                        className={`pb-4 text-lg font-bold transition-colors relative ${activeTab === 'news' ? 'text-navy-600 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>

                        {t('news')}
                        {activeTab === 'news' &&
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-md"></span>
                        }
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Featured Image */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1
                        }}
                        viewport={{
                            once: true
                        }}
                        className="relative rounded-2xl overflow-hidden bg-navy-500 min-h-[400px] group">

                        <div className="absolute inset-0 bg-gradient-to-br from-navy-600 to-navy-500 flex items-center justify-center">
              <span className="text-white/20 font-bold text-2xl tracking-widest uppercase">
                {t('mustCampus')}
              </span>
                        </div>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded mb-3">
                {t('featured')}
              </span>
                            <h4 className="text-2xl font-bold text-white mb-2">
                                {t('campusVibe')}
                            </h4>
                            <p className="text-gray-300 text-sm">
                                {t('communityGrowth')}
                            </p>
                        </div>
                    </motion.div>

                    {/* List */}
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) =>
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: 20
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0
                                }}
                                viewport={{
                                    once: true
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                                className="bg-white dark:bg-navy-500 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-600 flex gap-6 items-center group cursor-pointer">

                                <div className="text-5xl font-bold text-gray-100 dark:text-navy-600 group-hover:text-accent/20 transition-colors">
                                    {item.id}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-navy-600 dark:text-white mb-3 group-hover:text-accent transition-colors">
                                        {t(item.titleKey)}
                                    </h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPinIcon className="w-4 h-4" />
                                            {t(item.locationKey)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-4 h-4" />
                                            {item.timeKey ? t(item.timeKey) : item.time}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <button className="mt-4 py-4 rounded-xl border-2 border-navy-600 dark:border-white text-navy-600 dark:text-white font-bold hover:bg-navy-600 hover:text-white dark:hover:bg-white dark:hover:text-navy-600 transition-colors">
                            {t('discoverMore')}
                        </button>
                    </div>
                </div>
            </div>
        </section>);
}