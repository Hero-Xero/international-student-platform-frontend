import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    CheckCircleIcon,
    FileIcon,
    UserPlusIcon,
    UploadCloudIcon,
    CreditCardIcon,
    CheckSquareIcon } from
        'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";

const steps = [
    {
        titleKey: 'createAccount',
        descKey: 'createAccountDesc',
        icon: UserPlusIcon
    },
    {
        titleKey: 'uploadDocs',
        descKey: 'uploadDocsDesc',
        icon: UploadCloudIcon
    },
    {
        titleKey: 'payFees',
        descKey: 'payFeesDesc',
        icon: CreditCardIcon
    },
    {
        titleKey: 'awaitApproval',
        descKey: 'awaitApprovalDesc',
        icon: CheckSquareIcon
    }];

const requirements = [
    'reqCert',
    'reqGPA',
    'reqEnglish',
    'reqTest',
    'reqMedical'];

const documents = [
    'docCert',
    'docBirth',
    'docPassport',
    'docPhotos',
    'docFees'];

export function AdmissionsSection() {
    const { t } = useTranslation();
    return (
        <section
            id="admission"
            className="py-20 bg-white dark:bg-navy-500 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title={t('admissions')}
                    subtitle={t('admissionsSubtitle')} />


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Application Steps */}
                    <motion.div
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
                        className="lg:col-span-1">

                        <h3 className="text-2xl font-bold text-navy-600 dark:text-white mb-8 flex items-center gap-2">
                            {t('appSteps')}
                        </h3>
                        <div className="relative border-l-2 border-gray-200 dark:border-navy-600 ml-4 space-y-8">
                            {steps.map((step, index) =>
                                <div key={index} className="relative pl-8">
                                    <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white shadow-md">
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-lg font-bold text-navy-600 dark:text-white mb-1">
                                        {t('stepN')} {index + 1}: {t(step.titleKey)}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {t(step.descKey)}
                                    </p>
                                </div>
                            )}
                        </div>
                        <button className="mt-10 w-full py-4 rounded-lg bg-accent hover:bg-accent-600 text-white font-bold shadow-lg shadow-accent/30 transition-all hover:-translate-y-1">
                            {t('startApp')}
                        </button>
                    </motion.div>

                    {/* Requirements & Documents */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            transition={{
                                delay: 0.2
                            }}
                            className="bg-gray-50 dark:bg-navy-600 rounded-xl p-8 border border-gray-100 dark:border-navy-600">

                            <h3 className="text-xl font-bold text-navy-600 dark:text-white mb-6 border-b border-gray-200 dark:border-navy-500 pb-4">
                                {t('genReqs')}
                            </h3>
                            <ul className="space-y-4">
                                {requirements.map((req, index) =>
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                              {t(req)}
                                            </span>
                                        </li>
                                )}
                            </ul>
                        </motion.div>

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
                            transition={{
                                delay: 0.4
                            }}
                            className="bg-gray-50 dark:bg-navy-600 rounded-xl p-8 border border-gray-100 dark:border-navy-600">

                            <h3 className="text-xl font-bold text-navy-600 dark:text-white mb-6 border-b border-gray-200 dark:border-navy-500 pb-4">
                                {t('reqDocs')}
                            </h3>
                            <ul className="space-y-4">
                                {documents.map((doc, index) =>
                                        <li key={index} className="flex items-start gap-3">
                                            <FileIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                              {t(doc)}
                                            </span>
                                        </li>
                                )}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>);

}