import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SearchIcon, ClockIcon, BookOpenIcon } from 'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";

const programs = [
    {
        id: 1,
        nameKey: 'bscCS',
        facultyKey: 'computerScience',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 144
    },
    {
        id: 2,
        nameKey: 'bscAI',
        facultyKey: 'computerScience',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 144
    },
    {
        id: 3,
        nameKey: 'bachelorMed',
        facultyKey: 'medicine',
        degreeKey: 'bachelor',
        duration: '5+2',
        credits: 230
    },
    {
        id: 4,
        nameKey: 'bscCivil',
        facultyKey: 'engineering',
        degreeKey: 'bachelor',
        duration: '5',
        credits: 165
    },
    {
        id: 5,
        nameKey: 'bscMech',
        facultyKey: 'engineering',
        degreeKey: 'bachelor',
        duration: '5',
        credits: 165
    },
    {
        id: 6,
        nameKey: 'bachelorPharm',
        facultyKey: 'pharmacy',
        degreeKey: 'bachelor',
        duration: '5+1',
        credits: 175
    },
    {
        id: 7,
        nameKey: 'bbaMarketing',
        facultyKey: 'business',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 132
    },
    {
        id: 8,
        nameKey: 'bbaFinance',
        facultyKey: 'business',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 132
    },
    {
        id: 9,
        nameKey: 'baMassComm',
        facultyKey: 'massComm',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 132
    },
    {
        id: 10,
        nameKey: 'baEnglish',
        facultyKey: 'languages',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 132
    },
    {
        id: 11,
        nameKey: 'bscBiotech',
        facultyKey: 'biotechnology',
        degreeKey: 'bachelor',
        duration: '4',
        credits: 140
    },
    {
        id: 12,
        nameKey: 'mba',
        facultyKey: 'business',
        degreeKey: 'master',
        duration: '2',
        credits: 48
    }];

export function ProgramsSection() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [facultyFilter, setFacultyFilter] = useState('All');
    const [degreeFilter, setDegreeFilter] = useState('All');

    const uniqueFaculties = ['All', ...Array.from(new Set(programs.map((p) => p.facultyKey)))];
    const uniqueDegrees = ['All', ...Array.from(new Set(programs.map((p) => p.degreeKey)))];

    const filteredPrograms = programs.filter((p) => {
        const matchesSearch = t(p.nameKey).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFaculty = facultyFilter === 'All' || p.facultyKey === facultyFilter;
        const matchesDegree = degreeFilter === 'All' || p.degreeKey === degreeFilter;
        return matchesSearch && matchesFaculty && matchesDegree;
    });

    return (
        <section
            id="academics"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('academicPrograms')}
                    subtitle={t('programsSubtitle')} />


                {/* Filters */}
                <div className="bg-white dark:bg-navy-500 p-6 rounded-xl shadow-sm mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t('searchPrograms')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all" />

                        </div>
                        <div className="md:col-span-3">
                            <select
                                value={facultyFilter}
                                onChange={(e) => setFacultyFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">

                                {uniqueFaculties.map((f) =>
                                    <option key={f} value={f}>
                                        {f === 'All' ? t('allFaculties') : t(f)}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <select
                                value={degreeFilter}
                                onChange={(e) => setDegreeFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">

                                {uniqueDegrees.map((d) =>
                                    <option key={d} value={d}>
                                        {d === 'All' ? t('allDegrees') : t(d)}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrograms.length > 0 ?
                        filteredPrograms.map((program, index) =>
                                <motion.div
                                    key={program.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05
                                    }}
                                    className="bg-white dark:bg-navy-500 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-600 flex flex-col">

                                    <div className="mb-4 flex justify-between items-start">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {t(program.facultyKey)}
                  </span>
                                        <span className="inline-block px-3 py-1 bg-navy-100 dark:bg-navy-600 text-navy-600 dark:text-gray-300 text-xs font-semibold rounded-full">
                    {t(program.degreeKey)}
                  </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-600 dark:text-white mb-4 flex-1">
                                        {t(program.nameKey)}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>{program.duration} {t('statYears')}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpenIcon className="w-4 h-4" />
                                            <span>{program.credits} {t('creditsLabel') || 'Credits'}</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-navy-600 text-navy-600 dark:text-white font-medium hover:bg-accent hover:text-white hover:border-accent transition-colors duration-300">
                                        {t('viewDetails')}
                                    </button>
                                </motion.div>
                        ) :

                        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                            {t('noProgramsFound')}
                        </div>
                    }
                </div>
            </div>
        </section>);
}