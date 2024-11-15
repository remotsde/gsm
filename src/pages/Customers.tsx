import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, Printer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../utils/notifications';
import AddCustomerModal from '../components/modals/AddCustomerModal';
import { exportToCSV } from '../utils/export';
import { usePrint } from '../hooks/usePrint';
import { addCustomer } from '../store/slices/customersSlice';
import { RootState } from '../store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../hooks/useTranslation';
import type { Customer } from '../types';

export default function Customers() {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.items);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [storedCustomers, setStoredCustomers] = useLocalStorage<Customer[]>('customers', []);
  const { printElement } = usePrint();
  const { t, formatDate } = useTranslation();

  useEffect(() => {
    setStoredCustomers(customers);
  }, [customers, setStoredCustomers]);

  const handleAddCustomer = (data: Customer) => {
    try {
      dispatch(addCustomer({ ...data, id: Date.now().toString() }));
      setIsAddModalOpen(false);
      notify.success(t('Customer added successfully'));
    } catch (error) {
      notify.error(t('Failed to add customer'));
    }
  };

  const handleExport = () => {
    try {
      if (customers.length === 0) {
        notify.error(t('No data to export'));
        return;
      }
      exportToCSV(customers, 'customers-list');
      notify.success(t('Export successful'));
    } catch (error) {
      notify.error(t('Export failed'));
    }
  };

  const handlePrint = () => {
    try {
      if (customers.length === 0) {
        notify.error(t('No data to print'));
        return;
      }
      printElement('customers-table', t('Customers List'));
    } catch (error) {
      notify.error(t('Print failed'));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('Customers')}</h1>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={customers.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5 mr-2" />
            {t('Export')}
          </button>
          <button
            onClick={handlePrint}
            disabled={customers.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="h-5 w-5 mr-2" />
            {t('Print')}
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('Add Customer')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('Search customers...')}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table id="customers-table" className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Contact')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Devices')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Last Visit')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.devices?.map(device => t(device)).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.lastVisit ? formatDate(customer.lastVisit) : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">
                      {t('View Details')}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    {t('No customers found')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
}