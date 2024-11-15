import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTicket } from '../store/slices/ticketsSlice';
import { printTicket } from '../utils/print';
import { notify } from '../utils/notifications';
import { useTranslation } from '../hooks/useTranslation';

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();
  
  const ticket = useSelector((state: RootState) => 
    state.tickets.items.find(t => t.id === id)
  );

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-500">{t('Ticket not found')}</p>
        <button
          onClick={() => navigate('/tickets')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('Back to Tickets')}
        </button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    try {
      dispatch(updateTicket({
        ...ticket,
        status: newStatus as 'new' | 'in_progress' | 'ready' | 'closed',
        updatedAt: new Date().toISOString()
      }));
      notify.success(t('Status updated successfully'));
    } catch (error) {
      notify.error(t('Failed to update status'));
    }
  };

  const handlePrint = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      notify.info(t('Preparing ticket for printing...'));
      await printTicket(ticket, 'print');
      notify.success(t('Print job sent successfully'));
    } catch (error) {
      notify.error(t('Failed to print ticket'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      notify.info(t('Generating PDF...'));
      await printTicket(ticket, 'pdf');
      notify.success(t('PDF downloaded successfully'));
    } catch (error) {
      notify.error(t('Failed to generate PDF'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/tickets')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t('Back')}
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('Ticket')} #{ticket.id}
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5 mr-2" />
            {isProcessing ? t('Processing...') : t('Download PDF')}
          </button>
          <button
            onClick={handlePrint}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="h-5 w-5 mr-2" />
            {isProcessing ? t('Processing...') : t('Print Ticket')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('Status Management')}</h2>
        <div className="flex flex-wrap gap-3">
          {['new', 'in_progress', 'ready', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-4 py-2 rounded-lg border ${
                ticket.status === status
                  ? statusColors[status as keyof typeof statusColors] + ' font-medium'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === ticket.status && (
                <Clock className="inline-block h-4 w-4 mr-2" />
              )}
              {t(status)}
              {status === ticket.status && (
                <CheckCircle className="inline-block h-4 w-4 ml-2" />
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {t('Last updated')}: {new Date(ticket.updatedAt).toLocaleString('de-DE')}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('Customer Information')}</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Name')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.customerInfo.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Phone')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.customerInfo.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Email')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.customerInfo.email}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('Device Information')}</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Type')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{t(ticket.deviceInfo.type)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Brand')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.deviceInfo.brand}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Model')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.deviceInfo.model}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Serial Number')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.deviceInfo.serialNumber}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">{t('Condition')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.deviceInfo.condition}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('Repair Information')}</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Problem Description')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.repairInfo.problemDescription}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('Required Parts')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{ticket.repairInfo.requiredParts}</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('Estimated Cost')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{ticket.estimatedCost} €</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('Estimated Time')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{ticket.estimatedTime}</dd>
                </div>
              </div>
              {ticket.repairInfo.warranty && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('Warranty')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{ticket.repairInfo.warrantyPeriod}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}