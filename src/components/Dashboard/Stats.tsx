import React from 'react';
import { Smartphone, Monitor, Clock, CheckCircle, FileText, Wrench } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';

export default function Stats() {
  const { formatCurrency } = useTranslation();
  const invoices = useSelector((state: RootState) => state.invoices.items);
  const tickets = useSelector((state: RootState) => state.tickets.items);
  const parts = useSelector((state: RootState) => state.parts.items);

  const stats = [
    {
      label: 'Aktive Reparaturen',
      value: tickets.filter(t => t.status === 'in_progress').length.toString(),
      icon: Clock,
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Heute abgeschlossen',
      value: tickets.filter(t => t.status === 'ready').length.toString(),
      icon: CheckCircle,
      trend: '+3',
      trendUp: true,
    },
    {
      label: 'Offene Rechnungen',
      value: formatCurrency(invoices.filter(i => i.status === 'issued').reduce((sum, inv) => sum + inv.total, 0)),
      icon: FileText,
      trend: '75%',
      trendUp: true,
    },
    {
      label: 'Ersatzteile (Niedrig)',
      value: parts.filter(p => p.quantity <= p.minQuantity).length.toString(),
      icon: Wrench,
      trend: '25%',
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trend}
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-4xl font-semibold text-gray-900">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}