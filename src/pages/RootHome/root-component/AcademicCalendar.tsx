import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from "../SectionHeading.tsx";

const dates = [
    {
        dateKey: 'dateSep20',
        eventKey: 'fallSemesterBegins',
        type: 'start'
    },
    {
        dateKey: 'dateOct06',
        eventKey: 'armedForcesDay',
        type: 'holiday'
    },
    {
        dateKey: 'dateNov15_25',
        eventKey: 'midtermExams',
        type: 'exam'
    },
    {
        dateKey: 'dateJan05_20',
        eventKey: 'finalExams',
        type: 'exam'
    },
    {
        dateKey: 'dateJan25',
        eventKey: 'revolutionDay',
        type: 'holiday'
    },
    {
        dateKey: 'dateFeb15',
        eventKey: 'springSemesterBegins',
        type: 'start'
    }];

export function AcademicCalendar() {
    const { t } = useTranslation();
    
    return (
        <section className="py-20 bg-white dark:bg-navy-500 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('academicCalendarTitleRoot')}
                    subtitle={t('academicCalendarSubtitle')} />


                <div className="bg-gray-50 dark:bg-navy-600 rounded-2xl p-8 border border-gray-100 dark:border-navy-500">
                    <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-navy-500">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {t('semesterStart')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {t('examinations')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {t('holidays')}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {dates.map((item, index) =>
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: -20
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
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-navy-500 rounded-xl shadow-sm border-l-4 transition-all hover:shadow-md"
                                style={{
                                    borderLeftColor:
                                        item.type === 'start' ?
                                            '#00AC5C' :
                                            item.type === 'exam' ?
                                                '#f97316' :
                                                '#3b82f6'
                                }}>

                                <div className="font-bold text-navy-600 dark:text-white mb-2 sm:mb-0">
                                    {t(item.dateKey)}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">
                                    {t(item.eventKey)}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>);
}