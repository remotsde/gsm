import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Device } from '../../types';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Device, 'id'>) => void;
}

export default function AddDeviceModal({ isOpen, onClose, onSubmit }: AddDeviceModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('Add New Device')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onSubmit({
            type: formData.get('type') as 'phone' | 'computer',
            brand: formData.get('brand') as string,
            model: formData.get('model') as string,
            serialNumber: formData.get('serialNumber') as string,
            condition: formData.get('condition') as string,
          });
        }} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('Device Type')}</label>
            <select
              name="type"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="phone">{t('Phone')}</option>
              <option value="computer">{t('Computer')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('Brand')}</label>
            <input
              type="text"
              name="brand"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('Model')}</label>
            <input
              type="text"
              name="model"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('Serial Number')}</label>
            <input
              type="text"
              name="serialNumber"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('Condition')}</label>
            <textarea
              name="condition"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
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
              {t('Add Device')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}