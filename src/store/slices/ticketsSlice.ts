import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepairTicket } from '../../types';

interface TicketsState {
  items: RepairTicket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  items: [
    {
      id: 'T-1234',
      customerId: '1',
      deviceId: '1',
      status: 'in_progress',
      issueDescription: 'Screen replacement needed',
      estimatedCost: 150,
      estimatedTime: '2-3 days',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
      customerInfo: {
        name: 'John Smith',
        phone: '+1234567890',
        email: 'john@example.com'
      },
      deviceInfo: {
        type: 'phone',
        brand: 'iPhone',
        model: '13 Pro',
        serialNumber: '123456789',
        condition: 'Used, minor scratches'
      },
      repairInfo: {
        problemDescription: 'Cracked screen, touch not working',
        requiredParts: 'iPhone 13 Pro Screen Assembly',
        technicalNotes: 'Original parts requested',
        warranty: true,
        warrantyPeriod: '90 days'
      }
    }
  ],
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<RepairTicket>) => {
      state.items.unshift(action.payload);
      // Save to localStorage
      localStorage.setItem('repairTickets', JSON.stringify(state.items));
    },
    updateTicket: (state, action: PayloadAction<RepairTicket>) => {
      const index = state.items.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('repairTickets', JSON.stringify(state.items));
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(ticket => ticket.id !== action.payload);
      localStorage.setItem('repairTickets', JSON.stringify(state.items));
    },
    setTickets: (state, action: PayloadAction<RepairTicket[]>) => {
      state.items = action.payload;
      localStorage.setItem('repairTickets', JSON.stringify(action.payload));
    },
    loadTickets: (state) => {
      const savedTickets = localStorage.getItem('repairTickets');
      if (savedTickets) {
        state.items = JSON.parse(savedTickets);
      }
    },
  },
});

export const { addTicket, updateTicket, deleteTicket, setTickets, loadTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;