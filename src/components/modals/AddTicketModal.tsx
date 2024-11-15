import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { CustomerInfo, DeviceInfo, RepairInfo } from '../../types';

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    customerInfo: CustomerInfo;
    deviceInfo: DeviceInfo;
    repairInfo: RepairInfo;
  }) => void;
}

export default function AddTicketModal({ isOpen, onClose, onSubmit }: AddTicketModalProps) {
  const { t } = useTranslation();
  const [selectedDeviceType, setSelectedDeviceType] = useState<'phone' | 'computer' | 'tablet'>('phone');
  const [formData, setFormData] = useState({
    customerInfo: {
      name: '',
      phone: '',
      email: '',
    },
    deviceInfo: {
      type: 'phone' as const,
      brand: '',
      model: '',
      serialNumber: '',
      condition: '',
    },
    repairInfo: {
      problemDescription: '',
      requiredParts: '',
      technicalNotes: '',
      warranty: false,
      warrantyPeriod: '30 days',
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      deviceInfo: {
        ...formData.deviceInfo,
        type: selectedDeviceType,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('Create New Repair Ticket')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">{t('Customer Information')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Name')}</label>
                <input
                  type="text"
                  required
                  value={formData.customerInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerInfo: { ...formData.customerInfo, name: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Phone')}</label>
                <input
                  type="tel"
                  required
                  value={formData.customerInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerInfo: { ...formData.customerInfo, phone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t('Email')}</label>
                <input
                  type="email"
                  required
                  value={formData.customerInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerInfo: { ...formData.customerInfo, email: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">{t('Device Information')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Device Type')}</label>
                <select
                  value={selectedDeviceType}
                  onChange={(e) => setSelectedDeviceType(e.target.value as 'phone' | 'computer' | 'tablet')}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="phone">{t('Phone')}</option>
                  <option value="computer">{t('Computer')}</option>
                  <option value="tablet">{t('Tablet')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Brand')}</label>
                <input
                  type="text"
                  required
                  value={formData.deviceInfo.brand}
                  onChange={(e) => setFormData({
                    ...formData,
                    deviceInfo: { ...formData.deviceInfo, brand: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Model')}</label>
                <input
                  type="text"
                  required
                  value={formData.deviceInfo.model}
                  onChange={(e) => setFormData({
                    ...formData,
                    deviceInfo: { ...formData.deviceInfo, model: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Serial Number')}</label>
                <input
                  type="text"
                  required
                  value={formData.deviceInfo.serialNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    deviceInfo: { ...formData.deviceInfo, serialNumber: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t('Condition')}</label>
                <textarea
                  required
                  value={formData.deviceInfo.condition}
                  onChange={(e) => setFormData({
                    ...formData,
                    deviceInfo: { ...formData.deviceInfo, condition: e.target.value }
                  })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('Describe the current condition of the device...')}
                />
              </div>
            </div>
          </div>

          {/* Repair Information */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">{t('Repair Information')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Problem Description')}</label>
                <textarea
                  required
                  value={formData.repairInfo.problemDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    repairInfo: { ...formData.repairInfo, problemDescription: e.target.value }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('Describe the issue...')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Required Parts')}</label>
                <input
                  type="text"
                  value={formData.repairInfo.requiredParts}
                  onChange={(e) => setFormData({
                    ...formData,
                    repairInfo: { ...formData.repairInfo, requiredParts: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('Technical Notes')}</label>
                <textarea
                  value={formData.repairInfo.technicalNotes}
                  onChange={(e) => setFormData({
                    ...formData,
                    repairInfo: { ...formData.repairInfo, technicalNotes: e.target.value }
                  })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="warranty"
                    checked={formData.repairInfo.warranty}
                    onChange={(e) => setFormData({
                      ...formData,
                      repairInfo: { ...formData.repairInfo, warranty: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="warranty" className="ml-2 block text-sm text-gray-700">
                    {t('Warranty')}
                  </label>
                </div>
                {formData.repairInfo.warranty && (
                  <div>
                    <select
                      value={formData.repairInfo.warrantyPeriod}
                      onChange={(e) => setFormData({
                        ...formData,
                        repairInfo: { ...formData.repairInfo, warrantyPeriod: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="30 days">30 {t('Days')}</option>
                      <option value="60 days">60 {t('Days')}</option>
                      <option value="90 days">90 {t('Days')}</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t('Cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {t('Create Ticket')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}