import { toast, ToastOptions } from 'react-toastify';
import { appConfig } from '../config/app';

const getTranslation = (message: string): string => {
  return appConfig.translations[message] || message;
};

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  rtl: false
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(getTranslation(message), {
      ...defaultOptions,
      ...options
    });
  },
  error: (message: string, error?: any) => {
    console.error('Error:', error);
    toast.error(getTranslation(message), {
      ...defaultOptions,
      autoClose: 5000
    });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(getTranslation(message), {
      ...defaultOptions,
      ...options
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(getTranslation(message), {
      ...defaultOptions,
      ...options
    });
  }
};