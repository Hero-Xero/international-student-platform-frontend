import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
export function RootHeroSection() {
    const { t } = useTranslation();
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-navy-600 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-navy-500 to-accent/20 opacity-80 mix-blend-multiply"></div>
                {/* Abstract campus representation */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 20% 30%, rgba(0, 172, 92, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 38, 68, 0.8) 0%, transparent 50%)'
                    }}>
                </div>
            </div>

            {/* Floating decorative elements */}
            <div
                className="absolute top-1/4 left-10 w-20 h-20 rounded-full border border-accent/30 animate-float z-0"
                style={{
                    animationDelay: '0s'
                }}>
            </div>
            <div
                className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border border-white/10 animate-float z-0"
                style={{
                    animationDelay: '1s'
                }}>
            </div>
            <div
                className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent/50 rounded-full animate-float z-0"
                style={{
                    animationDelay: '2s'
                }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8
                        }}>

            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6 border border-accent/30 backdrop-blur-sm">
                {t('heroSubtitle')}
            </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            {t('heroMainTitle')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                            {t('heroDescription')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => scrollToSection('#academics')}
                                className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-600 text-white font-medium text-center transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1">

                                {t('explorePrograms')}
                            </button>
                            <button
                                onClick={() => scrollToSection('#admission')}
                                className="px-8 py-4 rounded-lg border-2 border-white/80 text-white hover:bg-white hover:text-navy-600 font-medium text-center transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">

                                {t('applyNow')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 50
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.8,
                    delay: 0.4
                }}
                className="absolute bottom-0 left-0 right-0 bg-navy-600/80 backdrop-blur-md border-t border-white/10">

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
                        {[
                            {
                                label: 'statFaculties',
                                value: '15+'
                            },
                            {
                                label: 'statPrograms',
                                value: '100+'
                            },
                            {
                                label: 'statNationalities',
                                value: '50+'
                            },
                            {
                                label: 'statYears',
                                value: '25+'
                            }].
                        map((stat, i) =>
                            <div key={i} className={`text-center ${i !== 0 ? 'pl-8' : ''}`}>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                                    {t(stat.label)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>);

}