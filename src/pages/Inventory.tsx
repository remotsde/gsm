import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addItem } from '../store/slices/inventorySlice';
import { useModal } from '../hooks/useModal';
import AddInventoryModal from '../components/modals/AddInventoryModal';
import { notify } from '../utils/notifications';

export default function Inventory() {
  const dispatch = useDispatch();
  const inventory = useSelector((state: RootState) => state.inventory.items);
  const [searchTerm, setSearchTerm] = useState('');
  const addItemModal = useModal();

  const handleAddItem = (data: any) => {
    try {
      dispatch(addItem({ ...data, id: Date.now().toString() }));
      addItemModal.close();
      notify.success('Item added successfully');
    } catch (error) {
      notify.error('Failed to add item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        <button 
          onClick={addItemModal.open}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      {/* Rest of the existing inventory UI code */}

      <AddInventoryModal
        isOpen={addItemModal.isOpen}
        onClose={addItemModal.close}
        onSubmit={handleAddItem}
      />
    </div>
  );
}