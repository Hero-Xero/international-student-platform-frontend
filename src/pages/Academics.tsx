import { motion } from 'framer-motion';
import { FileText, Download, GraduationCap, Calendar, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Academics() {
  const { t } = useTranslation();

  const documents = [
    { name: t('fall2025Timetable', { defaultValue: 'Fall 2025 Semester Timetable' }), type: t('timetable', { defaultValue: 'Timetable' }), size: '1.2 MB', date: 'Sep 01, 2025' },
    { name: t('spring2025Timetable', { defaultValue: 'Spring 2025 Semester Timetable' }), type: t('timetable', { defaultValue: 'Timetable' }), size: '1.1 MB', date: 'Jan 15, 2025' },
    { name: t('academicCalendarTitle', { defaultValue: 'Academic Calendar 2025-2026' }), type: t('calendarType', { defaultValue: 'Calendar' }), size: '850 KB', date: 'Aug 20, 2025' },
    { name: t('courseRegistrationGuide', { defaultValue: 'Course Registration Guide' }), type: t('guideType', { defaultValue: 'Guide' }), size: '2.4 MB', date: 'Aug 15, 2025' },
    { name: t('examRegulations', { defaultValue: 'Exam Regulations & Policies' }), type: t('policyType', { defaultValue: 'Policy' }), size: '1.8 MB', date: 'Jul 10, 2025' },
    { name: t('gradingSystem', { defaultValue: 'Grading System Overview' }), type: t('guideType', { defaultValue: 'Guide' }), size: '620 KB', date: 'Jul 05, 2025' },
  ];

  const majors = [
    { title: t('csMajor', { defaultValue: 'Computer and Information Major' }), faculty: t('fitFaculty', { defaultValue: 'Faculty of Information Technology' }), credits: 140, years: 4 },
    { title: t('itMajor', { defaultValue: 'Information Technology Major' }), faculty: t('fitFaculty', { defaultValue: 'Faculty of Information Technology' }), credits: 140, years: 4 },
    { title: t('aiMajor', { defaultValue: 'Artificial Intelligence Major' }), faculty: t('fitFaculty', { defaultValue: 'Faculty of Information Technology' }), credits: 140, years: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-slate-900 text-black dark:text-white min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200 dark:border-slate-700">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">{t('academicsTitle', { defaultValue: 'Academics' })}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{t('academicsDesc', { defaultValue: 'Download academic documents, timetables, and explore major tracks' })}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg border border-green-200 dark:border-green-500/30 font-medium text-sm">
          <Calendar className="w-4 h-4" /> {t('fallSemester', { defaultValue: 'Fall 2025 Semester' })}
        </div>
      </div>

      {/* 1. Academic Documents Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-black dark:text-white font-bold text-xl">
          <FileText className="w-6 h-6 text-green-500" />
          <h2>{t('academicDocuments', { defaultValue: 'Academic Documents' })}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 flex items-center justify-between h-36 shadow-sm dark:shadow-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-black dark:text-white leading-tight line-clamp-2 px-1">{doc.name}</h3>
                  <div className="flex gap-2 mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded">{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <button 
                className="ml-4 flex-shrink-0 p-2 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 cursor-pointer"
                onClick={() => alert(`Downloading ${doc.name}`)}
              >
                <Download className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Major Tracks Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-black dark:text-white font-bold text-xl">
          <GraduationCap className="w-6 h-6 text-green-500" />
          <h2>{t('majorTracks', { defaultValue: 'Major Tracks' })}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {majors.map((major, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white dark:bg-slate-800 p-8 rounded-[12px] border border-gray-200 dark:border-slate-700 h-[280px] flex flex-col shadow-sm dark:shadow-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-2xl mx-auto mb-6 text-green-500">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h3 className="text-center font-bold text-xl text-black dark:text-white mb-4 leading-tight line-clamp-2 px-2 mx-auto max-w-xs">{major.title}</h3>
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-8">{major.faculty} | {major.years} {t('years', { defaultValue: 'Years' })} | {major.credits} {t('creditHours', { defaultValue: 'Credit Hours' })}</p>
              <button 
                className="mt-auto mx-auto w-full max-w-[200px] bg-white dark:bg-slate-700 border-2 border-green-500 text-green-500 dark:text-green-400 font-bold py-3 px-6 rounded-xl hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all"
                onClick={() => alert(`Downloading ${major.title} curriculum`)}
              >
                {t('downloadCurriculum', { defaultValue: 'Download Curriculum' })}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Full Timetable Section */}
      <section className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[12px] border border-gray-200 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center lg:gap-8 shadow-sm dark:shadow-lg">
          <div className="flex items-start lg:flex-row lg:items-center gap-6 mb-6 lg:mb-0 flex-1">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500 mt-1">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{t('fullTimetableTitle', { defaultValue: 'Fall 2025 – Full Timetable' })}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{t('fullTimetableDesc', { defaultValue: 'Complete weekly schedule with all your registered courses and exam dates' })}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:flex-shrink-0">
            <button 
              className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:border-black hover:bg-gray-100 dark:hover:border-white dark:hover:bg-slate-800 transition-all w-full sm:w-auto text-sm"
              onClick={() => alert('Opening Fall 2025 Timetable')}
            >
              <ExternalLink className="w-4 h-4" /> {t('viewTimetableBtn', { defaultValue: 'View Timetable' })}
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all w-full sm:w-auto text-sm shadow-lg hover:shadow-xl"
              onClick={() => alert('Downloading Fall 2025 Full Timetable PDF')}
            >
              <Download className="w-4 h-4" /> {t('downloadPdfBtn', { defaultValue: 'Download PDF' })}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

