import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import Stats from '../components/Dashboard/Stats';
import RecentTickets from '../components/Dashboard/RecentTickets';
import { useModal } from '../hooks/useModal';
import AddTicketModal from '../components/modals/AddTicketModal';
import { addTicket } from '../store/slices/ticketsSlice';
import { notify } from '../utils/notifications';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addTicketModal = useModal();

  const handleAddTicket = (data: any) => {
    try {
      const newTicket = {
        ...data,
        id: `T-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'new'
      };
      dispatch(addTicket(newTicket));
      addTicketModal.close();
      notify.success('Repair ticket created successfully');
      navigate('/tickets'); // Navigate to tickets page after creation
    } catch (error) {
      notify.error('Failed to create repair ticket');
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addCustomer':
        navigate('/customers');
        break;
      case 'addDevice':
        navigate('/devices');
        break;
      case 'checkInventory':
        navigate('/inventory');
        break;
      case 'generateReport':
        navigate('/reports');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button 
          onClick={addTicketModal.open}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Repair Ticket
        </button>
      </div>

      <Stats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTickets />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleQuickAction('addCustomer')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium">Add Customer</span>
            </button>
            <button 
              onClick={() => handleQuickAction('addDevice')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium">Add Device</span>
            </button>
            <button 
              onClick={() => handleQuickAction('checkInventory')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium">Check Inventory</span>
            </button>
            <button 
              onClick={() => handleQuickAction('generateReport')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm font-medium">Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      <AddTicketModal
        isOpen={addTicketModal.isOpen}
        onClose={addTicketModal.close}
        onSubmit={handleAddTicket}
      />
    </div>
  );
}