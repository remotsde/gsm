import { useCallback } from 'react';
import { format, formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { appConfig } from '../config/app';

export function useTranslation() {
  const t = useCallback((key: string): string => {
    return appConfig.translations[key] || key;
  }, []);

  const formatDate = useCallback((date: Date | string, pattern: string = 'PP'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, pattern, { locale: de });
  }, []);

  const formatRelativeTime = useCallback((date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), {
      addSuffix: true,
      locale: de
    });
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }, []);

  const formatNumber = useCallback((number: number): string => {
    return new Intl.NumberFormat('de-DE').format(number);
  }, []);

  return {
    t,
    formatDate,
    formatRelativeTime,
    formatCurrency,
    formatNumber
  };
}