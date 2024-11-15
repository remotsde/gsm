import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateCompanySettings } from '../../store/slices/settingsSlice';
import { useTranslation } from '../../hooks/useTranslation';

export default function RepairTerms() {
  const dispatch = useDispatch();
  const { company } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();

  const handleTermsChange = (value: string) => {
    dispatch(updateCompanySettings({ terms: value }));
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {t('Repair Terms & Conditions')}
      </h4>
      <textarea
        value={company.terms}
        onChange={(e) => handleTermsChange(e.target.value)}
        rows={6}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        placeholder={t('Enter your repair terms and conditions...')}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {t('These terms will appear on repair tickets and customer agreements')}
      </div>
    </div>
  );
}