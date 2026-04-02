import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  GraduationCapIcon,
  BookOpenIcon,
  ClipboardListIcon,
  DollarSignIcon,
  FileTextIcon,
  GlobeIcon } from
'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

const cards = [
{
  titleKey: 'facultiesTitle',
  descKey: 'qaFacultiesDesc',
  icon: GraduationCapIcon,
  href: '#university'
},
{
  titleKey: 'academicPrograms',
  descKey: 'qaProgramsDesc',
  icon: BookOpenIcon,
  href: '#academics'
},
{
  titleKey: 'admission',
  descKey: 'qaAdmissionDesc',
  icon: ClipboardListIcon,
  href: '#admission'
},
{
  titleKey: 'tuitionFees',
  descKey: 'qaFeesDesc',
  icon: DollarSignIcon,
  href: '#fees'
},
{
  titleKey: 'regulationsTitle',
  descKey: 'qaRegulationsDesc',
  icon: FileTextIcon,
  href: '#regulations'
},
{
  titleKey: 'international',
  descKey: 'qaInternationalDesc',
  icon: GlobeIcon,
  href: '#international'
}];

export function QuickAccess() {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          title={t('quickAccessTitle')}
          subtitle={t('quickAccessSubtitle')} />


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) =>
          <motion.button
            onClick={() => scrollToSection(card.href)}
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
              delay: index * 0.1
            }}
            className="group block bg-white dark:bg-navy-500 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-transparent hover:border-accent relative overflow-hidden w-full">

              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

              <div className="w-14 h-14 rounded-lg bg-navy-50 dark:bg-navy-600 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <card.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-navy-600 dark:text-white mb-3 group-hover:text-accent transition-colors">
                {t(card.titleKey)}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(card.descKey)}
              </p>
            </motion.button>
          )}
        </div>
      </div>
    </section>);

}