import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part } from '../../types';

interface PartsState {
  items: Part[];
  loading: boolean;
  error: string | null;
}

const initialState: PartsState = {
  items: [],
  loading: false,
  error: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    addPart: (state, action: PayloadAction<Part>) => {
      state.items.push(action.payload);
    },
    updatePart: (state, action: PayloadAction<Part>) => {
      const index = state.items.findIndex(part => part.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deletePart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(part => part.id !== action.payload);
    },
    updatePartQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const part = state.items.find(p => p.id === action.payload.id);
      if (part) {
        part.quantity = action.payload.quantity;
      }
    },
    setParts: (state, action: PayloadAction<Part[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addPart, updatePart, deletePart, updatePartQuantity, setParts } = partsSlice.actions;
export default partsSlice.reducer;