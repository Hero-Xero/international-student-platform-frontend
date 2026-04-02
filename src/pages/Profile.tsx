import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../contexts/ProfileContext';
import {
  Camera,
  Edit2,
  FileText,
  Download,
  Eye,
  CheckCircle2,
  UploadCloud
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const { state, dispatch } = useProfile();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    dispatch({ type: 'TOGGLE_EDIT' });
  };

  const handleSave = () => {
    dispatch({ type: 'SAVE_PROFILE' });
    dispatch({ type: 'TOGGLE_EDIT' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({ 
          type: 'ADD_DOCUMENT', 
          payload: {
            name: file.name,
            date: new Date().toLocaleDateString(),
            status: 'Pending',
            file,
            preview: e.target?.result as string
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (doc: any) => {
    const link = document.createElement('a');
    link.href = doc.preview || '#';
    link.download = doc.name;
    link.click();
  };

  return (
    <div className="page-container max-w-5xl space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden">
        
        <div className="h-32 bg-navy-500 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12 mb-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" />
              <button className="absolute bottom-0 right-0 p-2 bg-navy-500 text-white rounded-full shadow-lg hover:bg-academic-500 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-grow">
              <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{state.profile.name}</h1>
              <p className="text-navy-500 dark:text-navy-300 font-medium">
                {state.profile.department} • ID: 20230145
              </p>
            </div>
            <div className="bg-status-approved/10 text-status-approved px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {t('activeStudent')}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6">
            
            <div className="flex justify-between items-center mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('personalInfo')}
              </h2>
              <button 
                onClick={handleEditToggle}
                className="text-academic-500 hover:text-academic-600 flex items-center gap-1 text-sm font-semibold">
                <Edit2 className="w-4 h-4" /> {state.isEditing ? t('cancel') : t('edit')}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('fullName')}
                </p>
                {state.isEditing ? (
                  <input 
                    value={state.profile.name}
                    onChange={(e) => dispatch({ type: 'UPDATE_PROFILE', payload: { name: e.target.value } })}
                    className="w-full p-2 border border-surface-200 dark:border-navy-700 dark:bg-navy-800 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-academic-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">
                    {state.profile.name}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('dob')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.dob}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('nationality')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">{state.profile.nationality}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">{t('gender')}</p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">{state.profile.gender}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('email')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('phone')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.phone}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('address')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.address}
                </p>
              </div>
            </div>
            {state.isEditing && (
              <div className="flex gap-3 mt-6 pt-4 border-t border-surface-200">
                <button
                  onClick={handleSave}
                  className="btn-primary px-6 flex-1">
                  {t('save')}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="btn-secondary px-6 flex-1">
                  {t('cancel')}
                </button>
              </div>
            )}
          </motion.div>

          {/* Academic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6">
            
            <div className="mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('academicInfo')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('faculty')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.faculty}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('department')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('enrollment')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {state.profile.enrollmentDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('graduation')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">{state.profile.expectedGraduation}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-navy-400 dark:text-navy-300 font-medium mb-1">
                  {t('advisor')}
                </p>
                <p className="text-sm font-semibold text-navy-900 dark:text-white flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="w-6 h-6 rounded-full"
                    alt="Advisor" />
                  
                  Ms. Sarah Ahmed
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Documents */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6">
            
            <div className="mb-6 border-b border-surface-200 dark:border-navy-700 pb-4">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                {t('documents')}
              </h2>
            </div>
            <div className="space-y-4">
              {state.documents.map((doc, idx) =>
              <div
                key={idx}
                className="p-4 border border-surface-200 dark:border-navy-700 rounded-xl hover:border-navy-300 dark:hover:border-navy-500 transition-colors group">
                
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-surface-100 dark:bg-navy-800 rounded-lg text-navy-500 dark:text-navy-300 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900 dark:text-white">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-navy-400 dark:text-navy-300">
                        {t('uploaded')} {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-md ${doc.status === 'Valid' || doc.status === 'Verified' ? 'text-status-approved bg-status-approved/10' : 'text-status-pending bg-status-pending/10'}`}>
                    
                      {doc.status}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 text-navy-400 dark:text-navy-300 hover:text-navy-600 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-navy-800 rounded"
                        title={t('viewDoc')}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 text-navy-400 dark:text-navy-300 hover:text-navy-600 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-navy-800 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {doc.preview && (
                    <img src={doc.preview} alt={doc.name} className="mt-2 w-full h-32 object-cover rounded-lg hidden group-hover:block" />
                  )}
                </div>
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-6 py-2 border-2 border-dashed border-surface-300 dark:border-navy-600 rounded-lg text-sm font-semibold text-navy-500 dark:text-navy-300 hover:bg-surface-50 dark:hover:bg-navy-800 hover:border-navy-400 dark:hover:border-navy-500 transition-colors flex items-center justify-center gap-2">
              <UploadCloud className="w-4 h-4" /> {t('uploadNewDoc')}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
