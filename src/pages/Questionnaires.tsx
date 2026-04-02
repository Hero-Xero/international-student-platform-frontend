import React from 'react';
import type { PageType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

interface Questionnaire {
  id: number;
  title: string;
  type: string;
  status: 'Pending' | 'Submitted';
  date: string;
  description: string;
}

const questionnaires: Questionnaire[] = [
  { id: 1, title: "Course Evaluation – Software Engineering (CS301)", type: "Course Evaluation", status: "Pending", date: "Nov 15, 2025", description: "Rate your experience with the course content, instructor, and teaching methods." },
  { id: 2, title: "Course Evaluation – Database Systems (CS305)", type: "Course Evaluation", status: "Pending", date: "Nov 15, 2025", description: "Provide feedback on lectures, lab sessions, and course materials." },
  { id: 3, title: "International Student Satisfaction Survey", type: "General Survey", status: "Pending", date: "Nov 20, 2025", description: "Help us improve services for international students by sharing your experience." },
  { id: 4, title: "Campus Facilities Feedback", type: "Facilities", status: "Submitted", date: "Completed", description: "Rate the quality of campus facilities including library, labs, and common areas." },
  { id: 5, title: "Course Evaluation – Web Development (IT202)", type: "Course Evaluation", status: "Submitted", date: "Completed", description: "Share your feedback on the practical projects and course delivery." },
  { id: 6, title: "Housing Services Satisfaction", type: "Services", status: "Submitted", date: "Completed", description: "Evaluate your experience with university housing, maintenance, and support." },
];

const QuestionnaireCard = ({ item, onStart }: { item: Questionnaire; onStart?: () => void }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between h-full transition-all hover:shadow-md dark:hover:shadow-gray-700">
    <div>
      <div className="flex justify-between items-start mb-4">
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          {item.type}
        </span>
        <span className={`text-[11px] font-bold flex items-center gap-1 ${item.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>
          {item.status === 'Pending' ? (
            <><span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> {((window as any)._t || ((s:string)=>s))('pendingFilter', { defaultValue: 'Pending' })}</>
          ) : (
            <>✔️ {((window as any)._t || ((s:string)=>s))('submittedFilter', { defaultValue: 'Submitted' })}</>
          )}
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-gray-800 dark:text-white mb-3 leading-snug">{item.title}</h3>
      <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed mb-6">{item.description}</p>
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-700">
      <div className="text-gray-400 dark:text-gray-500 text-[11px] flex items-center gap-1">
        {item.status === 'Pending' && <span>🕒 {((window as any)._t || ((s:string)=>s))('due', { defaultValue: 'Due:' })}</span>}
        {item.date}
      </div>
      {item.status === 'Pending' ? (
        <button onClick={onStart} className="text-[#00AC5C] font-bold text-sm flex items-center gap-1 hover:underline transition-all cursor-pointer">
          {((window as any)._t || ((s:string)=>s))('startQuestionnaire', { defaultValue: 'Start' })} <span className="text-[10px]">↗</span>
        </button>
      ) : (
        <span className="text-gray-300 dark:text-gray-500 text-xs italic">{((window as any)._t || ((s:string)=>s))('completedStatus', { defaultValue: 'Completed' })}</span>
      )}
    </div>
  </div>
);

interface QuestionnairesProps {
  onNavigate?: (page: PageType) => void;
  darkMode?: boolean;
}

const Questionnaires: React.FC<QuestionnairesProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'submitted'>('all');
  (window as any)._t = t; 

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const filteredQuestionnaires = questionnaires.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return item.status === 'Pending';
    return item.status === 'Submitted';
  });



  const handleStart = (id: number) => {
    // Simulate starting questionnaire
    alert(`Starting questionnaire ${id}`);
    onNavigate?.('submit-request');
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-[80vh] bg-gray-50 dark:bg-comfortDark-bg text-left font-sans">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-comfortDark-text mb-2">{t('questionnairesTitle' as any) || 'Questionnaires'}</h2>
            <p className="text-gray-500 dark:text-comfortDark-text-sec text-sm">{t('questionnairesPageDesc' as any) || 'Complete surveys and course evaluations'}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 px-4 py-2 rounded-xl text-sm font-bold border border-orange-100 dark:border-orange-800">
              ⚠️ 3 Pending
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 dark:border-emerald-800">
              ✔️ 3 Submitted
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-10">
          <button 
            onClick={() => setFilter('all')}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all ${filter === 'all' ? 'bg-[#00AC5C] text-white shadow-lg' : 'bg-white dark:bg-comfortDark-card text-gray-500 dark:text-comfortDark-text-sec hover:bg-gray-100 dark:hover:bg-comfortDark-card-hover border border-gray-200 dark:border-comfortDark-border'}`}>
            {t('allFilter' as any) || 'All'}
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all ${filter === 'pending' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white dark:bg-comfortDark-card text-gray-500 dark:text-comfortDark-text-sec hover:bg-gray-100 dark:hover:bg-comfortDark-card-hover border border-gray-200 dark:border-comfortDark-border'}`}>
            {t('pendingFilter' as any) || 'Pending'}
          </button>
          <button 
            onClick={() => setFilter('submitted')}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all ${filter === 'submitted' ? 'bg-green-500 text-white shadow-lg' : 'bg-white dark:bg-comfortDark-card text-gray-500 dark:text-comfortDark-text-sec hover:bg-gray-100 dark:hover:bg-comfortDark-card-hover border border-gray-200 dark:border-comfortDark-border'}`}>
            {t('submittedFilter' as any) || 'Submitted'}
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuestionnaires.map((item) => (
            <QuestionnaireCard key={item.id} item={item} onStart={() => handleStart(item.id)} />
          ))}
        </div>
      </main>

        </main>
  );
};

export default Questionnaires;

