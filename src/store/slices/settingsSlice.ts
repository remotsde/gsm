import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appConfig } from '../../config/app';

interface SettingsState {
  language: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  company: {
    name: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    terms: string;
  };
}

const initialState: SettingsState = {
  language: 'de',
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  company: {
    name: appConfig.company.name,
    logo: appConfig.logo,
    email: appConfig.company.email,
    phone: appConfig.company.phone,
    address: appConfig.company.address,
    terms: appConfig.company.terms,
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    updateCompanySettings: (state, action: PayloadAction<Partial<SettingsState['company']>>) => {
      state.company = { ...state.company, ...action.payload };
    },
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
});

export const { setTheme, updateCompanySettings, updateNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;