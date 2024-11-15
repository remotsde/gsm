import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types';

interface DevicesState {
  items: Device[];
  loading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  items: [],
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      state.items.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.items.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteDevice: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(device => device.id !== action.payload);
    },
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addDevice, updateDevice, deleteDevice, setDevices } = devicesSlice.actions;
export default devicesSlice.reducer;