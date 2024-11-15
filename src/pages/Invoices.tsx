import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Printer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addInvoice } from '../store/slices/invoicesSlice';
import { useModal } from '../hooks/useModal';
import { notify } from '../utils/notifications';
import { useTranslation } from '../hooks/useTranslation';
import { Invoice } from '../types';
import AddInvoiceModal from '../components/modals/AddInvoiceModal';
import { exportToCSV } from '../utils/export';
import { printInvoice } from '../utils/printInvoice';

export default function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const addInvoiceModal = useModal();
  const { t, formatCurrency } = useTranslation();

  const handleAddInvoice = (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newInvoice = {
        ...data,
        id: `INV-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addInvoice(newInvoice as Invoice));
      addInvoiceModal.close();
      notify.success('Rechnung erfolgreich erstellt');
    } catch (error) {
      notify.error('Fehler beim Erstellen der Rechnung');
    }
  };

  const handleExport = () => {
    try {
      exportToCSV(invoices, 'rechnungen-liste');
      notify.success('Export erfolgreich');
    } catch (error) {
      notify.error('Export fehlgeschlagen');
    }
  };

  const handlePrint = async (invoice: Invoice) => {
    try {
      await printInvoice(invoice);
      notify.success('Druckauftrag gesendet');
    } catch (error) {
      notify.error('Drucken fehlgeschlagen');
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusBadgeClass = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'issued':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Rechnungen</h1>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportieren
          </button>
          <button 
            onClick={addInvoiceModal.open}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Neue Rechnung
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
                placeholder="Rechnungen suchen..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">Alle Status</option>
              <option value="draft">Entwurf</option>
              <option value="issued">Ausgestellt</option>
              <option value="paid">Bezahlt</option>
              <option value="cancelled">Storniert</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rechnungsnr.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kunde
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fällig
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Betrag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.customerInfo.name}</div>
                    <div className="text-sm text-gray-500">{invoice.customerInfo.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.createdAt).toLocaleDateString('de-DE')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString('de-DE')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusBadgeClass(invoice.status)
                    }`}>
                      {invoice.status === 'draft' && 'Entwurf'}
                      {invoice.status === 'issued' && 'Ausgestellt'}
                      {invoice.status === 'paid' && 'Bezahlt'}
                      {invoice.status === 'cancelled' && 'Storniert'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePrint(invoice)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Printer className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddInvoiceModal
        isOpen={addInvoiceModal.isOpen}
        onClose={addInvoiceModal.close}
        onSubmit={handleAddInvoice}
      />
    </div>
  );
}