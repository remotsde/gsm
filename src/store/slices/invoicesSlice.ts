import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../types';

interface InvoicesState {
  items: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  items: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.items.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.items.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(invoice => invoice.id !== action.payload);
    },
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.items = action.payload;
    },
    updateInvoiceStatus: (state, action: PayloadAction<{ id: string; status: Invoice['status'] }>) => {
      const invoice = state.items.find(i => i.id === action.payload.id);
      if (invoice) {
        invoice.status = action.payload.status;
        invoice.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  addInvoice,
  updateInvoice,
  deleteInvoice,
  setInvoices,
  updateInvoiceStatus,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;