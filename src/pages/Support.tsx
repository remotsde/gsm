import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { notify } from '../utils/notifications';
import { appConfig } from '../config/app';
import { useTranslation } from '../hooks/useTranslation';

export default function Support() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [ticket, setTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notify.success(t('Support ticket created successfully'));
    setTicket({ subject: '', description: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('Support')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('Create Support Ticket')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Subject')}</label>
                <input
                  type="text"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Priority')}</label>
                <select
                  value={ticket.priority}
                  onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">{t('Low')}</option>
                  <option value="medium">{t('Medium')}</option>
                  <option value="high">{t('High')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Description')}</label>
                <textarea
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('Submit Ticket')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('Contact Information')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Support Email')}</label>
                <p className="mt-1 text-sm text-gray-900">{appConfig.supportEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Company Phone')}</label>
                <p className="mt-1 text-sm text-gray-900">{appConfig.company.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Business Hours')}</label>
                <p className="mt-1 text-sm text-gray-900">
                  {t('Monday - Friday')}: 9:00 - 18:00
                </p>
                <p className="text-sm text-gray-900">
                  {t('Saturday')}: 10:00 - 16:00
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-medium text-blue-900">{t('Need immediate help?')}</h3>
            </div>
            <p className="mt-2 text-sm text-blue-700">
              {t('Our support team typically responds within 2 hours during business hours.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}