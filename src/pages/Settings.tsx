import { motion } from 'framer-motion';
import { Lock, Globe, Bell, Shield, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export function Settings() {
  const { language, dispatch } = useLanguage();
  const { t } = useTranslation();
  return (
    <div className="page-container max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white">
          {t('accountSettings', { defaultValue: 'Account Settings' })}
        </h1>
        <p className="text-navy-400 dark:text-navy-300 mt-1">
          {t('accountSettingsDesc', { defaultValue: 'Manage your preferences and security' })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation (Desktop) */}
        <div className="hidden md:block space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-navy-800 text-navy-900 dark:text-white font-semibold rounded-lg shadow-sm border border-surface-200 dark:border-navy-700">
            <Lock className="w-5 h-5 text-navy-500 dark:text-navy-300" /> {t('security', { defaultValue: 'Security' })}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-navy-500 dark:text-navy-300 font-medium rounded-lg hover:bg-surface-200 dark:hover:bg-navy-700 transition-colors">
            <Globe className="w-5 h-5" /> {t('preferences', { defaultValue: 'Preferences' })}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-navy-500 dark:text-navy-300 font-medium rounded-lg hover:bg-surface-200 dark:hover:bg-navy-700 transition-colors">
            <Bell className="w-5 h-5" /> {t('notificationsTab', { defaultValue: 'Notifications' })}
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Password Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="card p-6 md:p-8">
            
            <div className="flex items-center gap-3 mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <div className="p-2 bg-navy-50 dark:bg-navy-800 rounded-lg text-navy-500 dark:text-navy-300">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('changePasswordTitle', { defaultValue: 'Change Password' })}
              </h2>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-navy-900 dark:text-white mb-2">
                  {t('currentPassword', { defaultValue: 'Current Password' })}
                </label>
                <input
                  type="password"
                  className="w-full bg-surface-50 dark:bg-navy-800 border border-surface-200 dark:border-navy-700 text-navy-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-shadow" />
                
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 dark:text-white mb-2">
                  {t('newPassword', { defaultValue: 'New Password' })}
                </label>
                <input
                  type="password"
                  className="w-full bg-surface-50 dark:bg-navy-800 border border-surface-200 dark:border-navy-700 text-navy-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-shadow" />
                
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 dark:text-white mb-2">
                  {t('confirmNewPassword', { defaultValue: 'Confirm New Password' })}
                </label>
                <input
                  type="password"
                  className="w-full bg-surface-50 dark:bg-navy-800 border border-surface-200 dark:border-navy-700 text-navy-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-shadow" />
                
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  className="btn-primary flex items-center gap-2">
                  
                  {t('updatePasswordBtn', { defaultValue: 'Update Password' })}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1
            }}
            className="card p-6 md:p-8">
            
            <div className="flex items-center gap-3 mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <div className="p-2 bg-navy-50 dark:bg-navy-800 rounded-lg text-navy-500 dark:text-navy-300">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('languagePreference', { defaultValue: 'Language Preference' })}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${language === 'en' ? 'border-navy-500 bg-navy-50 dark:bg-navy-800' : 'border-surface-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-500'}`}>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-navy-900 dark:text-white">English</span>
                  <input
                    type="radio"
                    name="lang"
                    value="en"
                    checked={language === 'en'}
                    onChange={() => dispatch({ type: 'SET_LANGUAGE', payload: 'en' })}
                    className="w-4 h-4 text-navy-600 focus:ring-navy-500" />
                  
                </div>
                <p className="text-xs text-navy-500 dark:text-navy-300">
                  {t('englishDesc', { defaultValue: 'Interface will be displayed in English (LTR)' })}
                </p>
              </label>

              <label
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${language === 'ar' ? 'border-navy-500 bg-navy-50 dark:bg-navy-800' : 'border-surface-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-500'}`}>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-navy-900 dark:text-white font-['Cairo']">
                    العربية
                  </span>
                  <input
                    type="radio"
                    name="lang"
                    value="ar"
                    checked={language === 'ar'}
                    onChange={() => dispatch({ type: 'SET_LANGUAGE', payload: 'ar' })}
                    className="w-4 h-4 text-navy-600 focus:ring-navy-500" />
                  
                </div>
                <p className="text-xs text-navy-500 dark:text-navy-300">
                  {t('arabicDesc', { defaultValue: 'Interface will be displayed in Arabic (RTL)' })}
                </p>
              </label>
            </div>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="card p-6 md:p-8">
            
            <div className="flex items-center gap-3 mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <div className="p-2 bg-navy-50 dark:bg-navy-800 rounded-lg text-navy-500 dark:text-navy-300">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('notificationsTab', { defaultValue: 'Notifications' })} Preferences
              </h2>
            </div>

            <div className="space-y-6">
              {[
              {
                title: t('emailNotifsTitle', { defaultValue: 'Email Notifications' }),
                desc: t('emailNotifsDesc', { defaultValue: 'Receive updates about your requests and academic standing via email.' })
              },
              {
                title: t('smsAlertsTitle', { defaultValue: 'SMS Alerts' }),
                desc: t('smsAlertsDesc', { defaultValue: 'Get text messages for urgent announcements and schedule changes.' })
              },
              {
                title: t('portalNotifsTitle', { defaultValue: 'Portal Notifications' }),
                desc: t('portalNotifsDesc', { defaultValue: 'Show in-app notification badges when you are logged in.' })
              }].
              map((item, idx) =>
              <div key={idx} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-navy-500 dark:text-navy-400 mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={idx !== 1} />
                  
                    <div className="w-11 h-6 bg-surface-300 dark:bg-navy-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-300 dark:peer-focus:ring-navy-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-academic-500"></div>
                  </label>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex justify-end pt-4">
            <button className="btn-accent flex items-center gap-2 px-8 text-white bg-green-500 hover:bg-green-600 py-3 rounded-xl shadow-md">
              <Save className="w-4 h-4" /> {t('saveAllSettings', { defaultValue: 'Save All Settings' })}
            </button>
          </div>
        </div>
      </div>
    </div>);

}