import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileDownIcon, ChevronDownIcon } from 'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";

const regulationsData = [
    {
        facultyKey: 'genUniRegs',
        items: [
            {
                titleKey: 'studentConduct',
                size: '2.4 MB'
            },
            {
                titleKey: 'academicIntegrity',
                size: '1.1 MB'
            },
            {
                titleKey: 'intlGuidelines',
                size: '3.5 MB'
            }]

    },
    {
        facultyKey: 'engineering',
        items: [
            {
                titleKey: 'engBylaws',
                size: '4.2 MB'
            },
            {
                titleKey: 'gradProjectReq',
                size: '1.8 MB'
            }]

    },
    {
        facultyKey: 'medicine',
        items: [
            {
                titleKey: 'clinicalTraining',
                size: '5.1 MB'
            },
            {
                titleKey: 'medStudentHandbook',
                size: '8.4 MB'
            }]

    },
    {
        facultyKey: 'business',
        items: [
            {
                titleKey: 'busAdminBylaws',
                size: '2.9 MB'
            },
            {
                titleKey: 'internshipReq',
                size: '1.2 MB'
            }]

    }];

export function RegulationsSection() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <section
            id="regulations"
            className="py-20 bg-white dark:bg-navy-500 transition-colors duration-300">

            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('regulationsTitle')}
                    subtitle={t('regulationsSubtitle')} />


                <div className="space-y-4">
                    {regulationsData.map((section, index) =>
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 10
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="border border-gray-200 dark:border-navy-600 rounded-xl overflow-hidden bg-gray-50 dark:bg-navy-600/50">

                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-navy-500 hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors">

                                <h3 className="text-lg font-bold text-navy-600 dark:text-white text-left">
                                    {t(section.facultyKey)}
                                </h3>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />

                            </button>

                            <AnimatePresence>
                                {openIndex === index &&
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            height: 'auto',
                                            opacity: 1
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0
                                        }}
                                        transition={{
                                            duration: 0.3
                                        }}
                                        className="overflow-hidden">

                                        <div className="p-2">
                                            {section.items.map((item, i) =>
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-navy-500 rounded-lg transition-colors group">

                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                            <FileDownIcon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-navy-600 dark:text-gray-200 group-hover:text-accent transition-colors">
                                                                {t(item.titleKey)}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {t('pdfDocument')} • {item.size}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="text-sm font-medium text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors px-4 py-2 rounded-md border border-gray-200 dark:border-navy-500 hover:border-accent dark:hover:border-accent">
                                                        {t('download')}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>);
}