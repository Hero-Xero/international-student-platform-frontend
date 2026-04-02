import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    StethoscopeIcon,
    LaptopIcon,
    PillIcon,
    BriefcaseIcon,
    MicIcon,
    LanguagesIcon,
    DnaIcon,
    LandmarkIcon,
    WrenchIcon } from
        'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";

const faculties = [
    {
        nameKey: 'medicine',
        icon: StethoscopeIcon,
        color: 'from-blue-500 to-blue-700',
        descKey: 'medicineDesc'
    },
    {
        nameKey: 'engineering',
        icon: WrenchIcon,
        color: 'from-orange-500 to-orange-700',
        descKey: 'engineeringDesc'
    },
    {
        nameKey: 'computerScience',
        icon: LaptopIcon,
        color: 'from-indigo-500 to-indigo-700',
        descKey: 'csDesc'
    },
    {
        nameKey: 'pharmacy',
        icon: PillIcon,
        color: 'from-emerald-500 to-emerald-700',
        descKey: 'pharmacyDesc'
    },
    {
        nameKey: 'business',
        icon: BriefcaseIcon,
        color: 'from-amber-500 to-amber-700',
        descKey: 'businessDesc'
    },
    {
        nameKey: 'massComm',
        icon: MicIcon,
        color: 'from-rose-500 to-rose-700',
        descKey: 'massCommDesc'
    },
    {
        nameKey: 'languages',
        icon: LanguagesIcon,
        color: 'from-violet-500 to-violet-700',
        descKey: 'languagesDesc'
    },
    {
        nameKey: 'biotechnology',
        icon: DnaIcon,
        color: 'from-cyan-500 to-cyan-700',
        descKey: 'biotechDesc'
    },
    {
        nameKey: 'archaeology',
        icon: LandmarkIcon,
        color: 'from-stone-500 to-stone-700',
        descKey: 'archaeologyDesc'
    }];

export function FacultiesSection() {
    const { t } = useTranslation();
    return (
        <section
            id="university"
            className="py-20 bg-white dark:bg-navy-500 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('facultiesTitle')}
                    subtitle={t('facultiesSubtitle')} />


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {faculties.map((faculty, index) =>
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05
                            }}
                            className="group rounded-xl overflow-hidden bg-gray-50 dark:bg-navy-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

                            <div
                                className={`h-24 bg-gradient-to-r ${faculty.color} p-6 flex items-end justify-between relative overflow-hidden`}>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                                <faculty.icon className="w-10 h-10 text-white/90 relative z-10" />
                                <h3 className="text-xl font-bold text-white relative z-10">
                                    {t(faculty.nameKey)}
                                </h3>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                                    {t(faculty.descKey)}
                                </p>
                                <button className="text-accent font-medium flex items-center gap-2 group-hover:gap-3 transition-all w-fit">
                                    {t('viewPrograms')}
                                    <span className="text-lg">→</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>);

}