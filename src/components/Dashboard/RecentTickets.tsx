import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';

const statusStyles = {
  new: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-yellow-50 text-yellow-700',
  ready: 'bg-green-50 text-green-700',
  closed: 'bg-gray-50 text-gray-700',
};

export default function RecentTickets() {
  const navigate = useNavigate();
  const { t, formatDate } = useTranslation();
  const tickets = useSelector((state: RootState) => 
    state.tickets.items.slice(0, 3)
  );

  const handleViewAll = () => {
    navigate('/tickets');
  };

  const handleViewDetails = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{t('Recent Tickets')}</h2>
          <button 
            onClick={handleViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t('View all')}
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              onClick={() => handleViewDetails(ticket.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {ticket.customerInfo.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {ticket.deviceInfo.brand} {ticket.deviceInfo.model}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusStyles[ticket.status as keyof typeof statusStyles]
                    }`}
                  >
                    {t(ticket.status.replace('_', ' '))}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            {t('No recent tickets')}
          </div>
        )}
      </div>
    </div>
  );
}