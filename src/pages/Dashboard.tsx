import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  ClipboardList,
  Megaphone,
  Building2,
  MessageSquare,
  Clock,
  ChevronRight,
  BookOpen,
  GraduationCap,
  MapPin,
  CalendarDays
} from 'lucide-react';

interface DashboardProps {
  darkMode?: boolean;
}

export function Dashboard({ darkMode = false }: DashboardProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeEventsTab, setActiveEventsTab] = React.useState<'events' | 'news'>('events');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const quickActions = [
    {
      id: 'schedule',
      icon: Calendar,
      title: t('viewSchedule', { defaultValue: 'View Schedule' }),
      desc: t('viewScheduleDesc', { defaultValue: 'Check your weekly classes and exams' }),
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      darkBg: 'bg-blue-500/10'
    },
    {
      id: 'submit-request',
      icon: FileText,
      title: t('submitRequest', { defaultValue: 'Submit Request' }),
      desc: t('submitRequestDesc', { defaultValue: 'Apply for letters, transcripts, or visas' }),
      color: 'text-[#00AC5C]',
      bg: 'bg-academic-50',
      darkBg: 'bg-[#00AC5C]/10'
    },
    {
      id: 'my-requests',
      icon: ClipboardList,
      title: t('myRequests', { defaultValue: 'My Requests' }),
      desc: t('myRequestsDesc', { defaultValue: 'Track your submitted applications' }),
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      darkBg: 'bg-orange-500/10'
    },
    {
      id: 'announcements',
      icon: Megaphone,
      title: t('announcements', { defaultValue: 'Announcements' }),
      desc: t('announcementsDesc', { defaultValue: 'Official news and important updates' }),
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      darkBg: 'bg-purple-500/10'
    },
    {
      id: 'studentServices',
      icon: Building2,
      title: t('studentServices', { defaultValue: 'Student Services' }),
      desc: t('studentServicesDesc', { defaultValue: 'Housing, medical, and library access' }),
      color: 'text-teal-500',
      bg: 'bg-teal-50',
      darkBg: 'bg-teal-500/10'
    },
    {
      id: 'contactAdvisor',
      icon: MessageSquare,
      title: t('contactAdvisor', { defaultValue: 'Contact Advisor' }),
      desc: t('contactAdvisorDesc', { defaultValue: 'Message your international advisor' }),
      color: 'text-pink-500',
      bg: 'bg-pink-50',
      darkBg: 'bg-pink-500/10'
    }
  ];

  const stats = [
    {
      label: t('currentGPA', { defaultValue: 'Current GPA' }),
      value: '3.45',
      icon: GraduationCap,
      color: 'text-[#00AC5C]'
    },
    {
      label: t('credits', { defaultValue: 'Credits' }),
      value: '78/140',
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      label: t('semester', { defaultValue: 'Semester' }),
      value: 'Fall 2025',
      icon: Calendar,
      color: 'text-purple-500'
    },
    {
      label: t('pendingRequests', { defaultValue: 'Pending Requests' }),
      value: '2',
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  const events = [
    {
      title: t('welcomeCeremony', { defaultValue: 'International Students Welcome Ceremony' }),
      location: 'Conference Hall A',
      time: '9:00 am – 11:00 am',
      date: '04 Feb 2026'
    },
    // Add more...
  ];

  const handleQuickAction = (id: string) => {
    if (id === 'schedule') {
      navigate('/schedule');
    } else if (id === 'submit-request') {
      navigate('/submit-request');
    } else if (id === 'my-requests') {
      navigate('/my-requests');
    } else if (id === 'announcements') {
      navigate('/announcements');
    }
    // Add other navigations as needed
  };

  return (
    <div className="page-container space-y-8 pt-6 md:pt-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl p-8 text-white relative overflow-hidden shadow-lg ${darkMode ? 'bg-dark-card' : 'bg-navy-500'}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 right-32 w-40 h-40 bg-[#00AC5C] opacity-20 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t('welcome', { defaultValue: 'Welcome back, Ahmed!' })}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
            {t('portal', { defaultValue: 'International Students Affairs Portal' })}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color} ${darkMode ? 'bg-white/5' : 'bg-surface-100'}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-navy-300'}`}>
                {stat.label}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-navy-900'}`}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-navy-900'}`}>
            {t('quickActions', { defaultValue: 'Quick Actions' })}
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {quickActions.map((action, idx) => (
              <motion.div
                key={action.id}
                variants={itemVariants}
                onClick={() => handleQuickAction(action.id)}
                className="card p-6 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${action.color} ${darkMode ? action.darkBg : action.bg}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-navy-900'}`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-navy-400'}`}>
                      {action.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Sidebar content - preserve existing */}
      </div>
    </div>
  );
}

