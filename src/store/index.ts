import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customersReducer from './slices/customersSlice';
import devicesReducer from './slices/devicesSlice';
import ticketsReducer from './slices/ticketsSlice';
import inventoryReducer from './slices/inventorySlice';
import settingsReducer from './slices/settingsSlice';
import partsReducer from './slices/partsSlice';
import invoicesReducer from './slices/invoicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    devices: devicesReducer,
    tickets: ticketsReducer,
    inventory: inventoryReducer,
    settings: settingsReducer,
    parts: partsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;