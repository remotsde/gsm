import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';
import type { Invoice, InvoiceItem, LaborCharge } from '../../types';

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function AddInvoiceModal({ isOpen, onClose, onSubmit }: AddInvoiceModalProps) {
  const { t, formatCurrency } = useTranslation();
  const parts = useSelector((state: RootState) => state.parts.items);
  const [formData, setFormData] = useState({
    ticketId: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      taxId: '',
    },
    items: [] as InvoiceItem[],
    labor: [] as LaborCharge[],
    subtotal: 0,
    tax: 0,
    total: 0,
    status: 'draft' as Invoice['status'],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    notes: '',
  });

  if (!isOpen) return null;

  const calculateTotals = (items: InvoiceItem[], labor: LaborCharge[]) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.total, 0);
    const laborTotal = labor.reduce((sum, charge) => sum + charge.total, 0);
    const subtotal = itemsTotal + laborTotal;
    const tax = subtotal * 0.19; // 19% MwSt.
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleAddItem = () => {
    const newItems = [...formData.items, {
      partId: '',
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }];
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const totals = calculateTotals(newItems, formData.labor);
    setFormData({ ...formData, items: newItems, ...totals });
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...formData.items];
    const item = newItems[index];
    
    if (field === 'partId' && value) {
      const selectedPart = parts.find(p => p.id === value);
      if (selectedPart) {
        item.name = selectedPart.name;
        item.unitPrice = selectedPart.price;
      }
    }

    item[field] = value;
    item.total = item.quantity * item.unitPrice;

    const totals = calculateTotals(newItems, formData.labor);
    setFormData({ ...formData, items: newItems, ...totals });
  };

  const handleAddLabor = () => {
    const newLabor = [...formData.labor, {
      description: '',
      hours: 1,
      ratePerHour: 60,
      total: 60,
    }];
    setFormData({ ...formData, labor: newLabor });
  };

  const handleRemoveLabor = (index: number) => {
    const newLabor = formData.labor.filter((_, i) => i !== index);
    const totals = calculateTotals(formData.items, newLabor);
    setFormData({ ...formData, labor: newLabor, ...totals });
  };

  const handleLaborChange = (index: number, field: keyof LaborCharge, value: any) => {
    const newLabor = [...formData.labor];
    const charge = newLabor[index];
    charge[field] = value;
    
    if (field === 'hours' || field === 'ratePerHour') {
      charge.total = charge.hours * charge.ratePerHour;
    }

    const totals = calculateTotals(formData.items, newLabor);
    setFormData({ ...formData, labor: newLabor, ...totals });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Neue Rechnung erstellen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Kundeninformationen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
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
                <label className="block text-sm font-medium text-gray-700">E-Mail</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  value={formData.customerInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    customerInfo: { ...formData.customerInfo, address: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Artikel</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Artikel hinzufügen
              </button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Artikel</label>
                    <select
                      value={item.partId}
                      onChange={(e) => handleItemChange(index, 'partId', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Artikel auswählen</option>
                      {parts.map(part => (
                        <option key={part.id} value={part.id}>
                          {part.name} ({formatCurrency(part.price)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Menge</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Einzelpreis</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gesamt</label>
                    <div className="mt-2 text-sm text-gray-900">
                      {formatCurrency(item.total)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="mt-6 text-red-600 hover:text-red-800"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Labor Charges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Arbeitsleistungen</h3>
              <button
                type="button"
                onClick={handleAddLabor}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Arbeitsleistung hinzufügen
              </button>
            </div>
            
            {formData.labor.map((charge, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
                    <input
                      type="text"
                      value={charge.description}
                      onChange={(e) => handleLaborChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stunden</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      value={charge.hours}
                      onChange={(e) => handleLaborChange(index, 'hours', parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stundensatz</label>
                    <input
                      type="number"
                      step="0.01"
                      value={charge.ratePerHour}
                      onChange={(e) => handleLaborChange(index, 'ratePerHour', parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLabor(index)}
                  className="mt-6 text-red-600 hover:text-red-800"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Zwischensumme:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(formData.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">MwSt. (19%):</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(formData.tax)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-900">Gesamtbetrag:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(formData.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fälligkeitsdatum</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Invoice['status'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="draft">Entwurf</option>
                <option value="issued">Ausgestellt</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Anmerkungen</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Zusätzliche Informationen oder Anmerkungen..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Rechnung erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}