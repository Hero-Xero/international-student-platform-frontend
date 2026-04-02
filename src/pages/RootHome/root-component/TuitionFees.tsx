import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {SectionHeading} from "../SectionHeading.tsx";

const feesData = [
    {
        facultyKey: 'medicine',
        local: '150,000',
        intl: '8,000'
    },
    {
        facultyKey: 'dentistry',
        local: '120,000',
        intl: '7,000'
    },
    {
        facultyKey: 'pharmacy',
        local: '100,000',
        intl: '6,000'
    },
    {
        facultyKey: 'engineering',
        local: '70,000',
        intl: '4,500'
    },
    {
        facultyKey: 'computerScience',
        local: '60,000',
        intl: '4,000'
    },
    {
        facultyKey: 'business',
        local: '50,000',
        intl: '3,500'
    },
    {
        facultyKey: 'massComm',
        local: '45,000',
        intl: '3,000'
    },
    {
        facultyKey: 'languages',
        local: '40,000',
        intl: '2,500'
    }];

export function TuitionFees() {
    const { t } = useTranslation();
    const [isInternational, setIsInternational] = useState(true);
    return (
        <section
            id="fees"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('tuitionFees')}
                    subtitle={t('feesSubtitle')} />


                <div className="flex justify-center mb-10">
                    <div className="bg-white dark:bg-navy-500 p-1 rounded-full inline-flex shadow-sm border border-gray-100 dark:border-navy-600">
                        <button
                            onClick={() => setIsInternational(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${!isInternational ? 'bg-accent text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-navy-600 dark:hover:text-white'}`}>

                            {t('egyptianStudents')}
                        </button>
                        <button
                            onClick={() => setIsInternational(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${isInternational ? 'bg-accent text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-navy-600 dark:hover:text-white'}`}>

                            {t('intlStudents')}
                        </button>
                    </div>
                </div>

                <motion.div
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
                    className="bg-white dark:bg-navy-500 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-navy-600">

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-navy-600 text-white">
                                <th className="py-4 px-6 font-semibold">{t('facultiesTitle')}</th>
                                <th className="py-4 px-6 font-semibold">{t('annualFees')}</th>
                                <th className="py-4 px-6 font-semibold">{t('currency')}</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-navy-600">
                            {feesData.map((row, index) =>
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-navy-600/50 transition-colors">

                                    <td className="py-4 px-6 text-navy-600 dark:text-white font-medium">
                                        {t(row.facultyKey)}
                                    </td>
                                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-lg">
                                        {isInternational ? row.intl : row.local}
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                                        {isInternational ? t('currencyUSD') : t('currencyEGP')}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 dark:bg-navy-600 p-4 text-sm text-gray-500 dark:text-gray-400 text-center border-t border-gray-100 dark:border-navy-500">
                        {t('feesDisclaimer') || t('feesNote')}
                    </div>
                </motion.div>
            </div>
        </section>);
}