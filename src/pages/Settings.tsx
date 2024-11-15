import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateCompanySettings, updateNotifications } from '../store/slices/settingsSlice';
import { useTranslation } from '../hooks/useTranslation';
import { Globe, Bell, Building, Shield, Smartphone } from 'lucide-react';
import DarkModeToggle from '../components/settings/DarkModeToggle';
import RepairTerms from '../components/settings/RepairTerms';

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const [activeTab, setActiveTab] = useState('general');
  const { t } = useTranslation();

  const handleNotificationChange = (type: string, value: boolean) => {
    dispatch(updateNotifications({ [type]: value }));
  };

  const handleCompanySettingChange = (field: string, value: string) => {
    dispatch(updateCompanySettings({ [field]: value }));
  };

  const tabs = [
    { id: 'general', icon: Globe, label: t('General') },
    { id: 'notifications', icon: Bell, label: t('Notifications') },
    { id: 'company', icon: Building, label: t('Company') },
    { id: 'devices', icon: Smartphone, label: t('Devices') },
    { id: 'privacy', icon: Shield, label: t('Privacy & Security') }
  ];

  return (
    <div className="space-y-6 responsive-padding">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('Settings')}</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="flex -mb-px min-w-full">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  {t('Display Settings')}
                </h3>
                <div className="space-y-4">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {t('Company Information')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Company Name')}
                  </label>
                  <input
                    type="text"
                    value={settings.company.name}
                    onChange={(e) => handleCompanySettingChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => handleCompanySettingChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Phone')}
                  </label>
                  <input
                    type="tel"
                    value={settings.company.phone}
                    onChange={(e) => handleCompanySettingChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Address')}
                  </label>
                  <textarea
                    value={settings.company.address}
                    onChange={(e) => handleCompanySettingChange('address', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="mt-8">
                <RepairTerms />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}