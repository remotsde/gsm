import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addDevice } from '../store/slices/devicesSlice';
import { useModal } from '../hooks/useModal';
import AddDeviceModal from '../components/modals/AddDeviceModal';
import { notify } from '../utils/notifications';

export default function Devices() {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices.items);
  const [searchTerm, setSearchTerm] = useState('');
  const addDeviceModal = useModal();

  const handleAddDevice = (data: any) => {
    try {
      dispatch(addDevice({ ...data, id: Date.now().toString() }));
      addDeviceModal.close();
      notify.success('Device added successfully');
    } catch (error) {
      notify.error('Failed to add device');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Devices</h1>
        <button 
          onClick={addDeviceModal.open}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Device
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Rest of the existing table code */}
      </div>

      <AddDeviceModal
        isOpen={addDeviceModal.isOpen}
        onClose={addDeviceModal.close}
        onSubmit={handleAddDevice}
      />
    </div>
  );
}