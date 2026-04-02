import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from 'lucide-react';
import { SectionHeading } from "../SectionHeading.tsx";

const faqData = [
    {
        categoryKey: 'admissionCategory',
        questions: [
            {
                qKey: 'faqQ1',
                aKey: 'faqA1'
            },
            {
                qKey: 'faqQ2',
                aKey: 'faqA2'
            },
            {
                qKey: 'faqQ3',
                aKey: 'faqA3'
            }]

    },
    {
        categoryKey: 'feesCategory',
        questions: [
            {
                qKey: 'faqQ4',
                aKey: 'faqA4'
            },
            {
                qKey: 'faqQ5',
                aKey: 'faqA5'
            }]

    },
    {
        categoryKey: 'visaCategory',
        questions: [
            {
                qKey: 'faqQ6',
                aKey: 'faqA6'
            },
            {
                qKey: 'faqQ7',
                aKey: 'faqA7'
            }]

    },
    {
        categoryKey: 'housingCategory',
        questions: [
            {
                qKey: 'faqQ8',
                aKey: 'faqA8'
            },
            {
                qKey: 'faqQ9',
                aKey: 'faqA9'
            }]

    }];

export function FAQ() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('admission');
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    
    const currentQuestions =
        faqData.find((c) => c.categoryKey === activeCategory)?.questions || [];

    return (
        <section
            id="faq"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('faqTitle')}
                    subtitle={t('faqSubtitle')} />


                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {faqData.map((cat) =>
                        <button
                            key={cat.categoryKey}
                            onClick={() => {
                                setActiveCategory(cat.categoryKey);
                                setOpenIndex(0);
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.categoryKey ? 'bg-accent text-white shadow-md' : 'bg-white dark:bg-navy-500 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-400'}`}>

                            {t(cat.categoryKey)}
                        </button>
                    )}
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {currentQuestions.map((item, index) =>
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="bg-white dark:bg-navy-500 rounded-xl shadow-sm border border-gray-100 dark:border-navy-500 overflow-hidden">

                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none">

                <span className="font-bold text-navy-600 dark:text-white pr-8">
                  {t(item.qKey)}
                </span>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-navy-600 text-gray-500 dark:text-gray-400'}`}>

                                    <ChevronDownIcon
                                        className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />

                                </div>
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

                                        <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-navy-600 pt-4 mt-2">
                                            {t(item.aKey)}
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