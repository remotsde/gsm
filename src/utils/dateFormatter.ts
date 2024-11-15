import { format, formatDistance, formatRelative, Locale } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

const locales: { [key: string]: Locale } = {
  de,
  en: enUS,
};

export function formatDate(date: Date | string, pattern: string, language: string = 'de'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, pattern, { locale: locales[language] });
}

export function formatDistanceToNow(date: Date | string, language: string = 'de'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: locales[language],
  });
}

export function formatRelativeDate(date: Date | string, language: string = 'de'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatRelative(dateObj, new Date(), { locale: locales[language] });
}

export function formatCurrency(amount: number, language: string = 'de'): string {
  return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: language === 'de' ? 'EUR' : 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatNumber(number: number, language: string = 'de'): string {
  return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US').format(number);
}